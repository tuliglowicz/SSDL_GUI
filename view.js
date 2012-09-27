// to Do
// done // walidacja, edycja, json2ssdl, startstop

"use strict";
var c = -1;
var rozmieszczenie = [247, 33, 247, 234, 174, 77, 175, 147];

function View(id, width, height, gui, graphSaveParamsJSON){
	var pf = gui.id_postfix;
	graphSaveParamsJSON = graphSaveParamsJSON || {
		tabLabel:"",
		tabId: "",
		formId: "graphSaveParams",
		fields : [
		{
			label: "name",
			id: "f_graphSaveParams_name",
			inputType: "textbox",
			validation: function(value){},
			values: []
		},
		{
			label: "description",
			id: "f_graphSaveParams_description",
			inputType: "textarea",
			validation: function(value){},
			values: []
		}
	]};
	// tymczasowo na potrzeby rozdzielenia wtyczek na wiele plików
	window.graphSaveParamsJSON = graphSaveParamsJSON;
	var outputView = {
		id : id,
		width : width,
		height : height,
		mode : "DF",
		bgSelectionHelper : null,
		scale : 100,
		xPos : 0,
		yPos : 0,
		columnParams : {
			top_nav : {},
			leftCol : {},
			centerCol : {},
			rightCol : {}
		},
		graph_views_tab : [],
		current_graph_view: {
			id : "root",
			nodes : [],
			edgesCF : [],
			edgesDF : []
		},
		updateNode : function updateNode(node){
			var id = node.nodeId,
				newNode,
				oldNode,
				index,
				that = this
			;
			$.each(this.current_graph_view.nodes, function(i){
				if(this.id === id){
					oldNode = this;
					index = i;
					return false;
				}
			})
			if(oldNode && oldNode.removeView){
				// console.log(oldNode);
				var x = oldNode.x,
					y = oldNode.y
				;

				if(oldNode.mainShape.type == "circle"){
					y -= oldNode.r;
					x -= (oldNode.r / 2 + 130 / 2); //130 to szerokość node-a
				}
				oldNode.removeView();
				
				newNode = this.visualiser.visualiseNode(node, x, y);
				// console.log(newNode, "696")
				newNode.switchMode(this.mode);
				this.current_graph_view.nodes[index] = newNode;

				//update CF edges
				$.each(this.current_graph_view.edgesCF, function(i, v){
					if(this.source.id === id){
						that.current_graph_view.edgesCF[i].source = newNode;
					}
					if(this.target.id === id){
						that.current_graph_view.edgesCF[i].target = newNode;
					}
				});

				// console.log(newNode);
				var io_tmp,				// update DF edges
					indexesToSplice = []
				;

				// console.log(newNode.getOutputById(this.output.id));
				$.each(this.current_graph_view.edgesDF, function(i, v){
					// console.log("aaa", this.output.id)
					// console.log("aaa", this.sourceId, id, i)
					if(this && this.sourceId === id){
						io_tmp = newNode.getOutputById(this.output.id)
						// console.log("bbb", io_tmp);
						if(io_tmp){
							this.output = io_tmp;
							this.update();
						}
						else {
							this.remove();
							if(!~indexesToSplice.indexOf(i))
								indexesToSplice.push(i);
						}
					}
					else if(this && this.targetId === id){
						// console.log("2")
						io_tmp = newNode.getInputById(this.input.id)
						if(io_tmp){
							this.input = io_tmp;
							this.update();
						}
						else {
							this.remove();
							if(!~indexesToSplice.indexOf(i))
								indexesToSplice.push(i);
						}
					}
					// console.log(indexesToSplice)
					// console.log(i, v, id, io_tmp)
				});

				var DF = this.current_graph_view.edgesDF;
				$.each(indexesToSplice, function(){
					DF.splice(this, 1);
				});
			}

			var o = this.current_graph_view.edgesDF.map(function(o){ return o.output.id;});
			console.log(o)
		},
		setCurrentGraph : function setCurrentGraph(id){
			var currGraph = this.getGraphById(id);
			if(currGraph){
				this.hideCurrentGraph();
				this.current_graph_view = currGraph;
				this.showCurrentGraph();
			}

			return this;
		},
		updateGraph : function updateGraph(nodeId){
			var node = this.getNodeById(nodeId);
			if(node){
				node.update();
			}
		},
		changeCurrentGraphView : function changeCurrentGraphView(id){
			var result;
			// console.log(this.graph_views_tab)
			// console.log(id, this.graph_views_tab.map(function(o){ return o.id;}))
			$.each(this.graph_views_tab, function(){
				if(this.id === id){
					// a(this.id)
					result = this;
					return false;
				}
			});
			if(result){
				this.hideCurrentGraph();
				this.current_graph_view = result;
				this.showCurrentGraph();
				this.switchMode();
			}
		},
		editNode : function editNode(node){
			this.form.init(node);
		},
		deleteNode : function deleteNode(node){
			gui.controller.reactOnEvent("NodeDeleted");
		},
		addStartStop : function addStartStop(obj){
			var start = obj.start,
				stop = obj.stop
			;

			start = this.visualiser.visualiseNode(start);
			stop = this.visualiser.visualiseNode(stop);
			if(start && stop){
				this.current_graph_view.nodes.unshift( start, stop );
			}
		},
		addNodeFromRepo : function addNodeFromRepo(node){
			//dodać lepiej dobierane parametry x, y
			var visualizedNode = this.visualiser.visualiseNode( node );
			if( visualizedNode ) {
				visualizedNode.switchMode( this.mode );
				this.current_graph_view.nodes.push( visualizedNode );
			}
		},
		getGraphById : function getGraphById(id){
			var result;
			$.each(this.graph_views_tab, function(){
				if(id === this.id){
					result = this;
					return false;
				}
			});

			return result;
		},
		switchMode : function switchMode(mode){
			if(this.mode != mode){
				mode = mode || this.mode;
				$.each(this.current_graph_view.nodes, function(){
					this.switchMode(mode);
				});

				$.each(this.current_graph_view.edgesCF, function(){
					this.switchMode(mode);
				});
				$.each(this.current_graph_view.edgesDF, function(){
					this.switchMode(mode);
				});
				this.current_graph_view.mode = mode;
				this.mode = mode;
			}
		},
		convertGraphViewToXML : function convertGraphViewToXML(humanFriendly){
			var n = this.current_graph_view.nodes,
				id = "testowe_id",
				tab_XML = [],
				stringXML
				;

			if(n && n.length > 0){
				// inner()
				tab_XML.push( "<graphView>\n" );
					tab_XML.push( "\t<graph_id>"+id+"</graph_id>\n" );
					tab_XML.push( "\t<graphView_properties>\n");
						tab_XML.push( "\t\t<scale>"+this.scale+"</scale>\n");
						tab_XML.push( "\t\t<xPos>"+this.xPos+"</xPos>\n");
						tab_XML.push( "\t\t<yPos>"+this.yPos+"</yPos>\n");
						tab_XML.push( "\t\t<view_mode>"+this.mode+"</view_mode>\n");
					tab_XML.push( "\t</graphView_properties>\n" );
					tab_XML.push( "\t<nodes>\n" );
					$.each(n, function(){
						tab_XML.push( "\t\t<node>\n" );
							tab_XML.push("\t\t\t<nodeId>"+this.id+"</nodeId>\n");
							tab_XML.push("\t\t\t<xPos>"+this.x+"</xPos>\n");
							tab_XML.push("\t\t\t<yPos>"+this.y+"</yPos>\n");
							tab_XML.push("\t\t\t<width>"+this.width+"</width>\n");
							tab_XML.push("\t\t\t<height>"+this.height+"</height>\n");
						tab_XML.push( "\t\t</node>\n" );
					});
					tab_XML.push("\t</nodes>\n")
				tab_XML.push( "<graphView>\n" );
			}

			stringXML = tab_XML.join("")
			if(!humanFriendly)
				stringXML = stringXML.replace(/\t/g, "").replace(/\n/g, "");

			return stringXML;
		},
		getNodeById : function getNodeById(id, tab){
			var result;
			var nodes = tab || this.current_graph_view.nodes;
			// console.log(id, tab);
			$.each(nodes, function(){
				if( this.id == id){
					result = this;
					return false;
				}
			});

			return result;
		},
		dragNodes : function dragNodes(element, node){
			var	lastDragX,
				lastDragY,
				ox, dx,
				oy, dy,
				accX, accY,
				width, height,
				rWidth = gui.view.paper.width,
				rHeight = gui.view.paper.height,
				bbox,
				ctrl,
				transX, transY,
				flag = true,
				ready2move = false,
				that = this,
				itWasJustAClick = false,
				move = function move(x,y){
					if(ready2move){
						itWasJustAClick = false;
						dx = x - lastDragX;	// mouse x
						dy = y - lastDragY; // mouse y
						
						transX = ox + dx > rWidth-width ? rWidth-width-ox : (ox + dx < 0 ? -ox : dx);
						transY = oy + dy > rHeight-height ? rHeight-height-oy : (oy + dy < 0 ? -oy : dy);
	
						// console.log(transX+":"+transY)
						if(transX != 0 || transY != 0){
					  		$.each(gui.view.current_graph_view.nodes, function(i, val){
								if(val.highlighted){
									val.translate(transX, transY);
								}
							});
						  	
							lastDragX = x;
							lastDragY = y;
							ox += transX;
							oy += transY;
							accX += transX;
							accY += transY;

							//gui.controller.reactOnEvent("NodeMoved");
						}
				 	}
				},
				start = function start(x,y,evt){

					itWasJustAClick = true;
					lastDragX = lastDragY = 0;
					accX = accY = 0;
					dx = dy = 0;
					bbox = node.set.getBBox();
					width = bbox.width;
					height = bbox.height;
					ox = bbox.x;
					oy = bbox.y;

					flag = false;
					if(!node.highlighted){
						if(!evt.ctrlKey)
							gui.controller.reactOnEvent("DESELECT");
						flag = true;
						node.highlight2();
					}
					ready2move = node.highlighted;
					ctrl = evt.ctrlKey;

					that.prepareNodesToDrag();
				},
				stop = function stop(evt){
					that.returnFromDraggingNodes(accX, accY);

					ready2move = false;
					gui.controller.reactOnEvent("NODESELECTED");
					if(itWasJustAClick){
						if(ctrl){
							if(!flag) {
								node.highlight(ctrl);
							}
						}
						else {
							gui.controller.reactOnEvent("DESELECT");
							node.highlight2();
						}

						// gui.controller.reactOnEvent("ESCAPE");
					}
					else {
						// gui.controller.reactOnEvent("NodeMoved");
					}
				}

				if(getType(element) === "array"){
					$.each(element, function(){
						this.drag(move, start, stop);
					});
				} else
					element.drag(move, start, stop);
		},
		returnFromDraggingNodes : function returnFromDraggingNodes(dx, dy){
			$.each(gui.view.current_graph_view.nodes, function(i, val){
				if(val.highlighted){
					val.returnFromDragging(dx, dy);
				}
			});
			this.updateEdges();
			this.showEdges();
		},
		prepareNodesToDrag : function prepareNodesToDrag(){
			this.hideEdges();
			$.each(gui.view.current_graph_view.nodes, function(i, val){
				if(val.highlighted){
					val.prepareToDrag();
				}
			});
		},
		dragCFArrow : function dragArrow(element, node, isStartNode){
			var arrow,
				cx,
				cy,
				offsetX,
				offsetY,
				sourceNode,
				glows = [],
				bbox,
				start = function start(){
					if(gui.view.mode == "CF" || isStartNode){
						var canvas = $(gui.view.paper.canvas);
						offsetX = parseInt(canvas.offset().left) + parseInt(canvas.css("border-top-width"));
						offsetY = parseInt(canvas.offset().top) + parseInt(canvas.css("border-left-width"));
						bbox = this.getBBox();
						cx = (bbox.x + bbox.x2) / 2;
						cy = (bbox.y + bbox.y2) / 2;
						sourceNode = gui.view.getNodeById(this.node.classList[0]);

						arrow = gui.view.paper.arrow(cx, cy, cx, cy, 4);

						if( isStartNode && gui.view.mode == "DF" ){
							$.each(gui.view.current_graph_view.nodes, function(i, v){
								$.each(v.inputs, function(){
									// console.log(v.id, this.id);
									// if(output && this.dataType === output.dataType && !gui.view.isInputConnected(v.id, this.id)){
										glows.push( this.node.glow({color: "purple"}) );
									// }
								});
							});
						}
						if( gui.view.mode == "CF" ){
							$.each(gui.view.current_graph_view.nodes, function(i, v){
								console.log(this.id, sourceNode.id)
								if(this != sourceNode && !gui.view.getCFEdge(sourceNode.id, this.id) && (this.type.toLowerCase() != "control" || (typeof this.controlType != "string" || this.controlType.toLowerCase() != "#start" ) ) )
								glows.push( this.mainShape.glow({color: "green"}) );
							});
						}
					}
				},
				move = function(a, b, c, d, event){
					if(gui.view.mode === "CF" || isStartNode){
						// todo awizowanie arrow po najechaniu na node
						try {
							arrow[0].remove();
							arrow[1].remove();
						} catch(e){
							console.log(e);
						}
						// to  to jest dopuki błażej nie poprawi czegośtam u siebie
						arrow = gui.view.paper.arrow(cx, cy, event.clientX-offsetX + window.scrollX, event.clientY - offsetY + window.scrollY , 4);
						arrow[0].attr({"stroke-dasharray": ["--"]});
					}
				},
				stop = function(event){
					try {
						arrow[0].remove();
						arrow[1].remove();
					} catch(e){
						// console.log(e);
					}

					if(gui.view.mode === "CF"){
						var targetNode = gui.view.getNodesInsideRect(event.clientX-offsetX + window.scrollX, event.clientY - offsetY + window.scrollY);
						if(targetNode && sourceNode && targetNode.id !== sourceNode.id){
							gui.controller.reactOnEvent("AddCFEdge", {
							 	source: sourceNode,
							 	target: targetNode,
							 	CF_or_DF: gui.view.mode
							 	// type: 
							});
						}
					}else if(isStartNode && sourceNode && !targetNode){
						var resultObj = gui.view.getInputByPosition(event.clientX-offsetX + window.scrollX, event.clientY - offsetY + window.scrollY );
						if(sourceNode && resultObj && !gui.view.isInputConnected(resultObj.targetId, resultObj.input.id)){
							// alert("HURA");

							if(confirm(language[gui.language].alerts.addOutputS+sourceNode.label+language[gui.language].alerts.addOutputE)){
								gui.controller.reactOnEvent("addOutput", {
									sourceId : sourceNode.id,
									targetId : resultObj.targetId,
									input : resultObj.input
								});
							}
							// $("#f_addInputForm")
							// wyrmularz, z uzupeÅ‚nionymi polami
							// confirm -> controller i update node
							// addConnectionDF
						}
					}

					$.each(glows, function(){
						this.remove();
					});
					glows = [];
				}
				;

			if(getType(element) === "array"){
				$.each(element, function(){
					// alert(this +":"+ this.getType());
					// console.log( this );
					this.drag(move, start, stop);
				})
			} else
				element.drag(move, start, stop);
		},
		dragDFArrow : function dragArrow(element, node){
			var arrow,
				cx,
				cy,
				offsetX,
				offsetY,
				sourceNode,
				targetId,
				output,
				bbox,
				glows = [],
				paper = gui.view.paper,
				canvas = $(paper.canvas),
				ctrlPressed = false,
				start = function start(){
					if(!ctrlPressed){
						offsetX = parseInt(canvas.offset().left) + parseInt(canvas.css("border-top-width"));
						offsetY = parseInt(canvas.offset().top) + parseInt(canvas.css("border-left-width"));
						bbox = this.getBBox();
						cx = (bbox.x + bbox.x2) / 2;
						cy = (bbox.y + bbox.y2) / 2;
						sourceNode = outputView.getNodeById(this.node.classList[0]);
						output = sourceNode.getOutputById(this.node.classList[2]);

						$.each(gui.view.current_graph_view.nodes, function(i, v){
							// if(v.id != sourceNode.id && (v.type.toLowerCase() == "functionality" || (v.type.toLowerCase() == "control" && typeof v.controlType == "string" && v.controlType.toLowerCase() != "#start")))
							if(v.id != sourceNode.id && (v.type.toLowerCase() == "functionality" || ( v.type.toLowerCase() == "control" )))
								glows.push( v.mainShape.glow({color: "purple"}) );
							$.each(v.inputs, function(){
								if(output && this.dataType === output.dataType && !gui.view.isInputConnected(v.id, this.id)){
									glows.push( this.node.glow({color: "green"}) );
								}
							});
						});

						arrow = paper.arrow(cx, cy, cx, cy, 4);
					}
				},
				move = function move(a, b, c, d, event){
					if(!ctrlPressed){
						// todo awizowanie arrow po najechaniu na node
						try {
							arrow[0].remove();
							arrow[1].remove();
						} catch(e){
							// console.log(e);
						}
						
						arrow = paper.arrow(cx, cy, event.clientX-offsetX + window.scrollX, event.clientY - offsetY + window.scrollY , 4);
						arrow[0].attr({"stroke-dasharray": ["--"]});
					}
				},
				stop = function stop(event){
					// if(!ctrlPressed){
						try {
							arrow[0].remove();
							arrow[1].remove();
						} catch(e){
							// console.log(e);
						}

						var resultObj = gui.view.getInputByPosition(event.clientX-offsetX + window.scrollX, event.clientY - offsetY + window.scrollY );
						// jsonFormatter(resultObj, true, true)
						if( output && sourceNode && resultObj && !gui.view.isInputConnected(resultObj.targetId, resultObj.input.id) ){
							if(resultObj.input.dataType === output.dataType){
								gui.controller.reactOnEvent("AddDFEdge", {
								 	sourceId: sourceNode.id,
								 	targetId: resultObj.targetId,
								 	input: resultObj.input,
								 	output: output,
								 	CF_or_DF: "DF"
								});
							} else {
								gui.logger.error(language[gui.language].alerts.errors.error, language[gui.language].alerts.errors.ioDiffType)
							}
						}
						else {
							var targetNode = gui.view.getNodesInsideRect(event.clientX-offsetX + window.scrollX, event.clientY - offsetY + window.scrollY);
							if(targetNode && sourceNode && targetNode.id !== sourceNode.id && ( targetNode.type.toLowerCase() == "functionality" || targetNode.type.toLowerCase() == "control" ) ){
								if(confirm(language[gui.language].alerts.addInputS +  targetNode.label+ language[gui.language].alerts.addInputE)){
									gui.controller.reactOnEvent("addInput", {
										sourceId : sourceNode.id,
										targetId : targetNode.id,
										output : output
									});
								}
							}

							// $("#f_addInputForm")
							// wyrmularz, z uzupełnionymi polami
							// confirm -> controller i update node
							// addConnectionDF
						}

						$.each(glows, function(){
							this.remove();
						});
						glows = [];
					// }
				}
				;
		
			$(document).keydown(function(event){
				if(event.which === 17) ctrlPressed = true;
			});
			$(document).keyup(function(event){
				if(event.which === 17) ctrlPressed = false;
			});

				// alert(element+":"+element.getType())
			if(getType(element) === "array"){
				$.each(element, function(){
					// alert(this +":"+ this.getType());
					// console.log( this );
					this.drag(move, start, stop);
				})
			} else
				element.drag(move, start, stop);
		},
		protoEdge : {
			arrow : undefined,
			arrowGlow : undefined,
			highlighted : false,
			hide: function hide(){
				this.arrow[0].hide();
				this.arrow[1].hide();
				this.arrowGlow.hide();
			},
			show: function show(){
				this.arrow[0].myShow(300);
				this.arrow[1].myShow(300);
				this.arrowGlow.show();
			},
			remove : function remove(){
				this.arrow[0].remove();
				this.arrow[1].remove();
				this.arrowGlow.remove();
			},
			selectArrow : function(e, multiselect){
				e = e || window.event;
				if(!e.ctrlKey&&!multiselect){
					gui.controller.reactOnEvent("ESCAPE");
				}
				this.arrowGlow.remove();
				this.arrowGlow = gui.view.paper.set();
				this.arrowGlow.push(this.arrow[0].glow({width:5, fill:false, opacity:0.4}));
				this.arrowGlow.push(this.arrow[1].glow({width:5, fill:false, opacity:0.4}));
				e.stopPropagation? e.stopPropagation() : e.cancelBubble = true;
				this.highlighted = true;
				return false;
			},
			update : function(keepSelected){
				try {
					this.arrow[0].remove();	this.arrow[1].remove();
				} catch(e){
				 	//console.log(e);	
				}
				this.arrow = gui.view.visualiser.drawEdge(this.getCoords());
				if(this.arrowGlow){
					this.arrowGlow.remove();
				}else{
					this.arrowGlow = gui.view.paper.set();
				}
				this.arrowGlow.push(this.arrow[0].glow({width:5, color:'rgba(0,0,0,0)'}));
				this.arrowGlow.push(this.arrow[1].glow({width:5, color:'rgba(0,0,0,0)'}));
				this.arrow[0].click(this.selectArrow.bind(this));
				this.arrow[1].click(this.selectArrow.bind(this));
				this.arrowGlow.click(this.selectArrow.bind(this));
				if(!keepSelected) this.highlighted = false;
			}
		},
		addCFEdge : function addCFEdge(data, firstLoad){
			console.log(data)
			var foundedEdge = (firstLoad ? false : this.getCFEdge(data.source.id, data.target.id));
			if(data.target.controlType && data.target.controlType.toLowerCase() == "#start"){
				gui.logger.warning(language[gui.language].alerts.errors.startCantPassControl);
			}
			else if(foundedEdge){
				gui.logger.warning(language[gui.language].alerts.errors.edgeExists);
			}
			else {
				var edgeObject = {
					source : data.source,
					target : data.target,
					type: "CF",
					toString : function toString(){
						return "SSDL_CFEdge object";
					},
					switchMode: function switchMode(mode){
						if(mode === "CF"){
							this.update();
							this.show();
						} else if(mode === "DF"){
							this.hide();
						} else if(mode === "H"){

						} else {
							// console.log('Wrong Argument');
						}
					},
					getCoords : function(){
						var bestConnectors = gui.view.getBestConnectors(
							this.source.getPossiblePositionsOfConnectors(),
							this.target.getPossiblePositionsOfConnectors()
						);
						return bestConnectors;
					}
				};
				edgeObject.extend(this.protoEdge);
				edgeObject.update();
				return edgeObject;
			}
		},
		addDFEdge : function addDFEdge(data, firstLoad){
			var foundedDFEdge = (firstLoad ? false : this.getDFEdge(data.sourceId, data.targetId, data.output.id, data.input.id));
			if(foundedDFEdge){
				gui.controller.reactOnEvent(""); //err msg
			}
			else {
				var	edgeObject = {
					sourceId: data.sourceId,
					targetId: data.targetId,
					output : data.output,
					input : data.input,
					type : "DF",
					visible : true,
					toString : function toString(){
						return "SSDL_DFEdge object";
					},
					switchMode: function switchMode(mode){
						if(mode === "CF"){
							this.hide();
						} else if(mode === "DF"){
							this.update(this.highlighted);
							this.show();
						} else if(mode === "H"){

						} else {
							// console.log('Wrong Argument');
						}
					},
					getCoords : function(){
						var bboxInput = this.input.node.getBBox(),
							bboxOutput = this.output.node.getBBox();
						return {
							x1 : bboxOutput.x + bboxOutput.width / 2,
							y1 : bboxOutput.y + bboxOutput.height / 2,
							x2 : bboxInput.x + bboxInput.width / 2,
							y2 : bboxInput.y + bboxInput.height / 2
						};
					},		
					isInside : function(e){
						var coords = this.getCoords();
						var x1 = e.x1,
							y1 = e.y1,
							x2 = e.x2,
							y2 = e.y2,
							x3 = coords.x1,
							y3 = coords.y1,
							x4 = coords.x2,
							y4 = coords.y2;
						if(this.visible&&((x3>x1&&x3<x2&&y3>y1&&y3<y2)||(x4>x1&&x4<x2&&y4>y1&&y4<y2))) return true;
					}
				};
				edgeObject.extend(this.protoEdge);
				edgeObject.update();
				return edgeObject;
			}
		},
		updateEdges : function updateEdges(){
			if(this.mode === "CF"){
				$.each(this.current_graph_view.edgesCF, function(){
					this.update();
				});
			}
			else if(this.mode === "DF"){
				$.each(this.current_graph_view.edgesDF, function(){
					this.update();
				});
			}
		},
		showEdges : function showEdges(){
			if(this.mode === "CF"){
				$.each(this.current_graph_view.edgesCF, function(){
					this.show();
				});
			}
			else if(this.mode === "DF"){
				$.each(this.current_graph_view.edgesDF, function(){
					this.show();
				});
			}
		},
		hideEdges : function hideEdges(){
			if(this.mode === "CF"){
				$.each(this.current_graph_view.edgesCF, function(){
					this.hide();
				});
			}
			else if(this.mode === "DF"){
				$.each(this.current_graph_view.edgesDF, function(){
					this.hide();
				});
			}
		},
		getCFEdge : function getEdge(sourceId, targetId){
			var foundedCFEdge;
			$.each(this.current_graph_view.edgesCF, function(){
				if(this.source.id === sourceId && this.target.id === targetId){
					foundedCFEdge = this;
					return false;
				}
			});

			return foundedCFEdge;
		},
		getDFEdge : function getEdge(sourceId, targetId, outputId, inputId){
			var foundedDFEdge;
			$.each(this.current_graph_view.edgesDF, function(){
				if( this.sourceId === sourceId && this.targetId === targetId &&
					this.input.id === inputId && this.output.id === inputId ) {

					foundedDFEdge = this;
					return false;
				}
			});

			return foundedDFEdge;
		},
		isInputConnected: function isInputConnected(nodeId, inputId){
			// alert(this.caller.callee)
			var result = false;
			$.each(this.current_graph_view.edgesDF, function(){
				if(this.targetId === nodeId && this.input.id === inputId){
					result = true;
					return false;
				}
			});
			// console.log(nodeId, inputId, result);

			return result;
		},
		parseAndSetDataModelToView : function parseAndSetDataModelToView(modelData){
			var tab = [],
				tmp,
				that = this,
				bool = true;
			;

			$.each(modelData, function(){
				tmp = that.drawGraph(this);
				if(tmp){
					tab.push( tmp );
					that.current_graph_view = tmp;
					that.hideCurrentGraph();
				}
			});

			this.graph_views_tab = tab;
			this.current_graph_view = tab[ tab.length-1 ];
			this.showCurrentGraph();
			this.switchMode();
			c = -1;
		},
		drawGraph : function drawGraph(graph_json){
			// alert(graph_json.nodes)
			var that = this,
				graph_view = this.getBlankGraph();
			;

			graph_view.id = graph_json.id;

			if(!this.paper){
				gui.error(language[gui.language].alerts.errors.noinit);
			}
			else {
				var paper = this.paper,
					that = this,
					type,
					visualizedNode,
					tmp
				;

				try{
					var deployerOutput = gui.controller.deploy(graph_json, paper.width);
				} catch(e){
					console.error(e);
				}

				var tmpCoords, x, y;

				$.each(graph_json.nodes, function(key, val){
					tmpCoords = deployerOutput.getCoords(val.nodeId);
					if(tmpCoords){
						x = tmpCoords[0];
						y = tmpCoords[1];
					}
					visualizedNode = that.visualiser.visualiseNode( val, x, y );
					if(visualizedNode)
						graph_view.nodes.push( visualizedNode );
				});

				var tmp;
				$.each(graph_json.nodes, function(key, val){
					 // alert(val.nodeId)
					 // console.log( val )
					$.each(val.sources, function(){
						// console.log(this, graph_view.nodes.map(function(o){return o.id}))
						tmp = that.addCFEdge({
							source: that.getNodeById(this, graph_view.nodes),
							target: that.getNodeById(val.nodeId, graph_view.nodes)
						});

						if(tmp)
							graph_view.edgesCF.push(tmp);
					});
					$.each(val.functionalDescription.inputs, function(){
						if(this && this.source && this.source.length == 2){
							// console.log( val.nodeId, this.source )
							var tmp = that.addDFEdge({
									sourceId : this.source[0],
									targetId : val.nodeId,
									input : that.getNodeById(val.nodeId, graph_view.nodes).getInputById(this.id),
									output : that.getNodeById(this.source[0], graph_view.nodes).getOutputById(this.source[1])
								});

							if(tmp)
								graph_view.edgesDF.push(tmp);
						}
					});
				});

				return graph_view;

			}
		},
		getBestConnectors : function getBestConnectors(sourceConnectors, targetConnectors){
			var minOdl=Infinity,
				minI,
				minJ,
				dx, dy, dz,
				i, iMax, j, jMax
				;
			for(i=0, iMax=sourceConnectors.length; i<iMax; i++){
				for(j=0, jMax=targetConnectors.length; j<jMax; j++){
					dx = sourceConnectors[i][0]-targetConnectors[j][0]; // odleglosc w poziomie
					dy = sourceConnectors[i][1]-targetConnectors[j][1];	// odleglosc w pionie
					dz = dx*dx + dy*dy;	// odleglo�?…â€º�?„â€¡
					if(dz < minOdl)
					{
						minI = i;
						minJ = j;
						minOdl = dz;
					}
				}
			}

			return {
				x1 : sourceConnectors[minI][0],
				y1 : sourceConnectors[minI][1],
				x2 : targetConnectors[minJ][0],
				y2 : targetConnectors[minJ][1]
			};
		},
		init : function init(){
			var $elem = $("#"+this.id),
				that = this;
			
			if(!(this.width && this.height)){
				this.width = parseInt($elem.css("width"), 10) || 950;
				this.height = parseInt($elem.css("height"), 10) || 650;
			}
			var heightOfTopBar = 20;

			var html = [],
				h = (this.height-2-heightOfTopBar),
				canvas_width = (Math.floor(this.width * .7)),
				left_plugins_width = (Math.floor(this.width * .15))
			;
			html.push("<div id='top_menu_"+pf+"' style='position:relative;background-repeat:repeat-x; background-image: url(images/dropdown-bg.gif); width: "+(this.width-2)+"px; height:"+heightOfTopBar+"px; border:1px solid black;'>&nbsp; <span> </span></div>");
			html.push("<div id='top_nav_"+pf+"' style='width: "+(this.width-2)+"px; height:"+heightOfTopBar+"; border:1px solid black;'>&nbsp;&gt; <span> </span></div>");
			html.push("<div id='left_plugins_"+pf+"' style='width:"+left_plugins_width+"px; height:"+h+"px; float:left;border:1px solid black;'></div>");
			html.push("<div id='canvas_holder_"+pf+"' style='width:"+canvas_width+"px; height:"+h+"px; float:left;border:1px solid black; overflow: hidden; '>");
			html.push("<div id='console_"+pf+"' style='width:"+canvas_width+"px; height: 0px; float:left;'></div>");
			html.push("<div id='canvas_"+pf+"' style='width:"+canvas_width+"px; height:"+h+"px; float:left; '></div></div>");
			html.push("<div id='right_plugins_"+pf+"' style='width:"+(this.width-6-canvas_width-left_plugins_width)+"px; height:" + h + "px; float:left;border:1px solid black; '></div>");

			$elem.html(html.join(""));

			this.paper = Raphael("canvas_"+pf, canvas_width, h);
			// this.leftPlugins = Raphael("left_plugins_"+pf, left_plugins_width, h);
			this.bgSelectionHelper = this.paper.rect(0,0,width,height).attr({fill : "#DEDEDE", stroke: "none"}).toBack();
	
			$elem.css("width", this.width);
			$elem.css("height", this.height);

			//zbieranie danych o poÅ‚oÅ¼eniu
			var $column = $("#canvas_holder_"+pf),
				position = $column.position();
			this.columnParams.centerCol = {
				top : position.top,
				left : position.left,
				width : $column.width(),
				height : $column.height(),
			};

			$column = $("#left_plugins_"+pf)
			position = $column.position();
			this.columnParams.leftCol = {
				top : position.top,
				left : position.left,
				width : $column.width(),
				height : $column.height(),
			};
			
			$column = $("#right_plugins_"+pf);
			position = $column.position();
			this.columnParams.rightCol = {
				top : position.top,
				left : position.left,
				width : $column.width(),
				height : $column.height(),
			};

			$column = $("#top_nav_"+pf)
			position = $column.position();
			this.columnParams.top_nav = {
				top : position.top,
				left : position.left,
				width : $column.width(),
				height : $column.height(),
			};

			$column = $("#top_menu_"+pf)
			position = $column.position();
			this.columnParams.top_menu = {
				top : position.top,
				left : position.left,
				width : $column.width(),
				height : $column.height(),
			};
		},
		setBold : function setBold(x1, y1, x2, y2){
			$.each(this.current_graph_view.nodes, function(k, v){
				if( v.isInside(x1, y1, x2, y2) )
					v.setBold(true);
				else 
					v.setBold(false);
			});
		},
		deselectAll : function deselectAll(){
			$.each(this.current_graph_view.nodes, function(k, v){
				v.removeHighlight();
			});
			this.tooltip.close();
		},
		selectAll : function selectAll(){
			var e = {ctrl: false};
			$.each(this.current_graph_view.nodes, function(k, v){
				v.highlight2();
			});
			if(gui.view.mode === 'DF'){
				$.each(this.current_graph_view.edgesDF, function(k, v){
					v.selectArrow(e, true);
				});
			}else{
				$.each(this.current_graph_view.edgesCF, function(k, v){
					v.selectArrow(e, true);
				});
			}
		},
		selectNodesInsideRect : function selectNodesInsideRect(x1,y1,x2,y2, ctrl){
			//alert(x1+":"+x2+":"+ctrl)
			$.each(this.current_graph_view.nodes, function(k, v){
				if( v.isInside(x1, y1, x2, y2) )
					v.highlight(ctrl);
				else if(!ctrl){
					v.removeHighlight();
				}
			});	
		},
		selectEdgesInsideRect : function selectEdgesInsideRect(e){
			if(gui.view.mode === 'DF'){
				$.each(this.current_graph_view.edgesDF, function(k, v){
					if(v.isInside(e)) v.selectArrow(e, true);
				});
			}
		},
		setBoldNodesInsideRect : function setBoldNodesInsideRect(x1,y1,x2,y2){
			$.each(this.current_graph_view.nodes, function(k, v){
				if( v.isInside(x1, y1, x2, y2) )
					v.setBold(true);
				else
					v.setBold(false);
			});
		},
		getNodesInsideRect : function getNodeById(x1, y1, x2, y2, count){
			var resultTab = [];

			if( x1 && y1 ){
				x2 = (typeof x2 === 'number' ? x2 : x1);
				y2 = (typeof y2 === 'number' ? y2 : y1);
				count = (typeof count === 'number' ? count : 1);

				$.each(this.current_graph_view.nodes, function(){
					//a(x1+":"+y1+":"+x2+":"+y2+":"+count);
					if( this.isInside(x1, y1, x2, y2) ){
						resultTab.push(this);

						if(resultTab.length >= count)
							return false;
					}
				});
				//TU BYDEM DZIABAŁ (Błażej)
			}
			else {
				// console.trace();
			}
			//alert(resultTab[0]);
			return count === 1 ? resultTab[0] : resultTab;
		},
		getInputByPosition: function getInputByPosition(x, y){
			// gui.view.paper.rect(x-1, y-1, 2, 2).attr("fill", "red");
			var result,
				bbox,
				loopcontroller = true;
			$.each(this.current_graph_view.nodes, function(k, v){
				$.each(v.inputs, function(){
					bbox = this.node.getBBox();
					if ( bbox.x+bbox.width > x &&
						bbox.y+bbox.height > y &&
						bbox.x < x &&
						bbox.y < y
						){
						result = {
							targetId : v.id,
							input : this
						};
						loopcontroller = false;
						return false;
					}
				});

				return loopcontroller;
			});

			return result;
		},
		removeNode : function removeNode(id){
			$.each(this.current_graph_view.nodes, function(i, v){
				if(v.id === id){
					v.remove();
					return false;
				}
			});
		},
		hideCurrentGraph : function hideCurrentGraph(){
			$.each(this.current_graph_view.nodes, function(){
				this.hideNode();
			});
			$.each(this.current_graph_view.edgesDF, function(){
				this.hide();
			});
			$.each(this.current_graph_view.edgesCF, function(){
				this.hide();
			});
		},
		showCurrentGraph : function showCurrentGraph(){
			$.each(this.current_graph_view.nodes, function(){
				this.showNode();
			});
			$.each(this.current_graph_view.edgesDF, function(){
				this.show();
			});
			$.each(this.current_graph_view.edgesCF, function(){
				this.show();
			});
		},
		removeCurrentGraph : function removeCurrentGraph(){
			$.each(this.current_graph_view.nodes, function(){
				this.removeNode();
			});
			if(this.mode === "DF")
				$.each(this.current_graph_view.edgesDF, function(){
					this.remove();
				});
			else if(this.mode === "CF")
				$.each(this.current_graph_view.edgesCF, function(){
					this.remove();
				});
		},
		removeAllGraphs : function removeAllGraphs(){
			var that = this;
			$.each(this.graph_views_tab, function(){
				$.each(this.nodes, function(){
					this.removeNode();
				});
				if(that.mode === "DF")
					$.each(this.edgesDF, function(){
						this.remove();
					});
				else if(that.mode === "CF")
					$.each(this.edgesCF, function(){
						this.remove();
					});
			});

			this.current_graph_view = undefined;
			this.graph_views_tab.length = [];
		},
		getBlankGraph : function getBlankGraph(){
			return {
				id : "",
				nodes : [],
				edgesCF : [],
				edgesDF : [],
				xPos : 0,
				yPos : 0,
				scale : 100,
				mode : "DF"
			};
		},
		setBlankGraphAsCurrent : function setBlankGraphAsCurrent(){
			this.current_graph_view = this.getBlankGraph();
		},
		menuList : (function menuList(){
			//menu holder singleton (Menu Błażeja i Jacka)
			var Constructor = function(){
				var list = [];
				var opened = false;
				var sec = false;
				var obj = {
					push: function(menu){
						list.push(menu);
					},
					close: function(){
						if(!sec){
							for(var i in list){
								if(list[i]) list[i].close();
							}
							opened = false;
						}else{
							sec = false;
						}
					},
					signalOpened: function(){
						opened = true;
					},
					signalClosed: function(){
						opened = false;
					},
					isOpen: function(){
						return opened;
					},
					secure: function(){
						sec = true;
					}
				};
				return obj;
			}, instance = null;
			return {
				getInstance: function(){
					return instance || (instance = new Constructor);
				}
			}
		})(),
		contextMenu : contextMenu
	}
	outputView.init();
	outputView.tooltip = tooltipper();
	outputView.visualiser = nodeVisualizator(outputView);
	outputView.bottomBar = bottomBar(outputView.paper);
	outputView.form = form();
	outputView.blankNodes = blankNode();
	outputView.mainMenu = menu();
	// outputView.mainMenu.init();

	var	lastDragX,
		lastDragY,
		ox, dx,
		oy, dy,
		width, height,
		lastRot = 0,
		itWasJustAClick = false,
		sel,
		x1, x2, y1, y2,
		bgStart = function(x, y, d){
			itWasJustAClick = true;
			ox = d.layerX;
			oy = d.layerY;
			lastDragX = 0;
			lastDragY = 0;
			sel = outputView.paper.rect(ox,oy,1,1).attr({fill: "#aaaaff", stroke: "#0000ff", opacity: .2});
		},
		bgMove = function(x, y, evt){
			itWasJustAClick = false;
			var rot = 0;	//angle of rotation
			if(x >= 0){
				if( y >= 0 ) rot = 0;
				else {
					rot = -90;
				}
			} else {
				if( y >= 0 ) rot = -270;
				else rot = -180;
			}
			
			if(rot == 0 || rot == -180)
				sel.attr("width", (x < 0 ? -x : x)+"px").attr("height", (y < 0 ? -y : y)+"px");
			else 
				sel.attr("height", (x < 0 ? -x : x)+"px").attr("width", (y < 0 ? -y : y)+"px");
				
			sel.rotate(rot-lastRot, ox, oy);	
			lastRot = rot;
			lastDragX = x;
			lastDragY = y;
			
			x1 = ox; y1 = oy;
			x2 = ox; y2 = oy;
			
			if(lastDragX >= 0)
				x2+=lastDragX;
			else
				x1+=lastDragX;
				
			if(lastDragY >= 0)
				y2+=lastDragY;
			else
				y1+=lastDragY;

			// gui.view.paper.rect(ox+x, oy+y, 2, 2).attr("fill", "red");
				

			// TUTAJ POWINNO BYC WYS�?…?ANIE EVENTU DO KONTROLERA Z 4MA WSP??â€œ�?…?�?…Â»�?„?DNYMI
			gui.view.setBoldNodesInsideRect(x1,y1,x2,y2);			
		},
		bgStop = function(evt){
			if(itWasJustAClick){
				gui.controller.reactOnEvent("ESCAPE");
			}
			else {
				x1 = ox; y1 = oy;
				x2 = ox; y2 = oy;
				
				if(lastDragX >= 0)
					x2+=lastDragX;
				else
					x1+=lastDragX;
					
				if(lastDragY >= 0)
					y2+=lastDragY;
				else
					y1+=lastDragY;
				
				// TUTAJ POWINNO BY�?„â€  WYS�?…?ANIE EVENTU DO KONTROLERA Z SELEKTEM
				
				gui.controller.reactOnEvent("SELECT", {
					x1 : x1,
					x2 : x2,
					y1 : y1,
					y2 : y2,
					ctrl : evt.ctrlKey
				});
				
				$.each(outputView.current_graph_view.nodes, function(i, val){
					val.setBold(false);
				});
			}

			sel.remove();
			sel = null;
			lastRot = 0;
		}

	outputView.bgSelectionHelper.drag(bgMove, bgStart, bgStop);

	return outputView;
};