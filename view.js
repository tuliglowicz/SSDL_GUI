"use strict"; 
//var supportedTypes = [];
var c = 0;
function View(id, width, height, gui){
	var pf = gui.id_postfix;		
	
	function nodeVisualizator(view){
		var outputObject = {
			color : {
				service : "#fbec88",
				functionality: "#fbec88"
			},
			getBlankNode : function getBlankNode(){
				var blankNode = {
					id : "", //inputNode.nodeId,
					label : "", //inputNode.label,
					type : "", //inputNode.nodeType,
					x : 10+55*c,
					y : 10+35*c,
					r : 15,
					width : 145,
					height : 35,
					scale : 100,
					highlighted : false,
					highlightColor : "orange",
					normalColor : "black",
					switchMode : function switchMode(newMode){
						switch(newMode){
							case "CF" : switchToCFMode(); break;
							case "DF" : switchToCFMode(); break;
							case "H" : switchToCFMode(); break;
						}
					},
					switchToCFMode : function switchToMode(){

					},
					switchToDFMode : function switchToMode(){

					},
					switchToHybrydMode : function switchToMode(){

					},
					setBold : function(flag){
						if(flag)
							this.set[0].attr("stroke-width", "2px");
						else
							this.set[0].attr("stroke-width", "1px");
					},
					highlight : function(ctrl){
						console.trace();
						if(ctrl){
							this.highlighted ? this.removeHighlight() : this.highlight2();
						} else {
							this.highlighted ? null : this.highlight2();
						}
					},
					highlight2: function highlight(){
						this.set[0].attr("stroke", this.highlightColor);
						for(var i=3, j=this.set.length; i<j-1; i++)
							this.set[i].attr("stroke", this.highlightColor);
						this.highlighted = true;
					},
					removeHighlight : function(){
						this.set[0].attr("stroke", this.normalColor);
						for(var i=3, j=this.set.length; i<j-1; i++)
							this.set[i].attr("stroke", this.normalColor);
						this.highlighted = false;
					},
					isInside : function isInside(x1,y1,x2,y2){
						return this.x+this.width > x1 &&
								this.y+this.height > y1 &&
								this.x < x2 &&
								this.y < y2
					},
					remove : function remove(){
						$.each(this.set, function(){
							this.remove();	
						});
					},
					getCoords : function getCoords(){
						return {	x : this.x,
									y : this.y	};
					},
					setCoords : function setCoords(newCoords){
						this.x = newCoords.x;
						this.y = newCoords.y;
					},
					toString : function toString(){
						return "ssdlViewNode Object";
					},
					translate : function translate(transX, transY){
						$.each(this.set, function(i, v){
							if(v.attr("cx")) {
								v.attr("cx", v.attr("cx") + transX);
								v.attr("cy", v.attr("cy") + transY);
							}
							else
								v.translate(transX, transY);
						});
							
						this.x += transX;
						this.y += transY;
					},
					getPossiblePositionsOfConnectors : function getPossiblePositionsOfConnectors(){
						return [
							[this.x+this.width/2, this.y],
							[this.x+this.width, this.y + this.height/2],
							[this.x+this.width/2, this.y + this.height],
							[this.x, this.y + this.height/2]
							]
							;
					}
				}
				
				return blankNode;
			},
			extendVisualisation : function extendVisualisation(type, fun){
				this["draw_"+type.toLowerCase()+"Node"] = fun;
			},
			draw_unknownNode : function draw_unknownNode(node){
				// alert("draw_unknownNode");
			},
			visualiseNode : function visualiseNode(node){
				++c;
				var that = this,
					newNode = this.getBlankNode(),
					nodeType = node.nodeType.toLowerCase();

				newNode.id = node.nodeId;
				newNode.label = node.nodeLabel;
				newNode.type = node.nodeType;
				newNode.serviceName = node.physicalDescription.serviceName;
				newNode.set = view.paper.set();
				newNode.inputs = node.functionalDescription.inputs;
				newNode.outputs = node.functionalDescription.outputs;
				
				return ( this["draw_"+nodeType+"Node"] || this.draw_unknownNode )(newNode);
			},
			draw_controlNode : function draw_controlNode(node){
				var c = view.paper.circle(node.x, node.y, node.r).attr({fill: "white", cursor: "crosshair"}),
					label = view.paper.text(node.x, node.y-20, node.id).attr("fill", "#333"),
					input_length, output_length, i_tab = [], o_tab = [],
					multX = 1, multY = 1, x1, y1, x2, y2;

				input_length = node.inputs.length;
				output_length = node.outputs.length;

				//obliczanie punktów na okręgu
				x1 = (node.x+node.r) - 10;
				y1 = Math.sqrt(Math.abs(node.r*node.r - (x1 - node.x)*(x1 - node.x) - (node.y*node.y - 2*node.y)));
				x2 = Math.abs(x1-node.x); y2 = Math.abs(y1-node.y);
				// alert(node.x + ":" + node.y + ":" + x1 + ":" + y1 + ":" + x2 + ":" + y2)

				for(var k = 0; k < input_length; k++){
					if(k < 4){
						multX = ((k % 2) === 0) ? 1 : -1;
						multY = (k < 2) ? 1 : -1;
						i_tab.push(view.paper.path("M " + parseInt(node.x+(x2*multX)+((multX>0) ? 7+k : -15-k)) + " " + parseInt(node.y+(y2*multY)) + " l 0 10 l 10 0 l 0 -10 l -5 5 z").attr({'fill':"white"}));
					}
					else{
						multX = ((k % 2) === 0) ? 1 : -1;
						multY = (k < 6) ? 1 : -1;
						i_tab.push(view.paper.path("M " + parseInt(node.x+(y2*multX)+((multX>0) ? 7+k : -15-k)) + " " + parseInt(node.y+(x2*multY)) + " l 0 10 l 10 0 l 0 -10 l -5 5 z").attr({'fill':"white"}));
					}
				}
				multX = 1; multY = 1;
				for(var l = 0; l < output_length; l++){
					if(l < 4){
						multX = ((l % 2) === 0) ? 1 : -1;
						multY = (l < 2) ? 1 : -1;
						o_tab.push(view.paper.path("M " + parseInt(node.x+(x2*multX)+((multX>0) ? 7+l : -15-l)) + " " + parseInt(node.y+(y2*multY)) + " l 10 0 l 0 -5 l -5 -5 l -5 5 z").attr({'fill':"white"}));
					}
					else{
						multX = ((l % 2) === 0) ? 1 : -1;
						multY = (l < 6) ? 1 : -1;
						o_tab.push(view.paper.path("M " + parseInt(node.x+(y2*multX)+((multX>0) ? 7+l : -15-l)) + " " + parseInt(node.y+(x2*multY)) + " l 10 0 l 0 -5 l -5 -5 l -5 5 z").attr({fill: "white"}));
					}
				}

				c.node.setAttribute("class", node.id);
						
				label.node.removeAttribute("style");
				label.node.removeAttribute("text");
				label.node.setAttribute("class", node.id + " label");

				node.isInside = function(x1,y1,x2,y2){
					return this.x+this.r > x1 &&
							this.y+this.r > y1 &&
							this.x-this.r < x2 &&
							this.y-this.r < y2
							;
				}
				node.getPossiblePositionsOfConnectors = function(){
					return [[this.x, this.y]];
				}
				
				node.set.push(c, label);
				$.each(i_tab, function(){
					node.set.push(this);
				});
				$.each(o_tab, function(){
					node.set.push(this);
				});

				view.dragNodes(label, node);
				view.dragArrow(c, node);

				return node;
			},
			draw_serviceNode : function draw_serviceNode(node){
				var id = node.id,
					radius = 4,
					rect = view.paper.rect(node.x, node.y, node.width, node.height, 5).attr("fill", "#fbec88"),
					label = view.paper.text(node.x + node.width/2, node.y + 10, node.label),
					img_gear = view.paper.image("images/img.png", node.x + node.width-17, node.y+2, 15, 15),
					c1 = view.paper.circle(node.x+node.width/2, node.y, radius),
					c2 = view.paper.circle(node.x+node.width, node.y + node.height/2, radius),
					c3 = view.paper.circle(node.x+node.width/2, node.y + node.height, radius),
					c4 = view.paper.circle(node.x, node.y + node.height/2, radius),
					c_tab = [], i_tab = [], o_tab = [],
					i, j, k, l,
					input_length, output_length,
					iDist, oDist,
					serviceName = node.serviceName,
					maxLength = 25,
					shortenServiceName = serviceName.length > maxLength ? serviceName.substring(0, maxLength-3)+"..." : serviceName,
					serviceNameShown = view.paper.text(node.x+node.width/2, node.y + 25, shortenServiceName);
					;

				serviceNameShown.node.setAttribute("class", name);
				serviceNameShown.attr({title: serviceName, cursor: "default"});
								
				img_gear.node.setAttribute("class", id+" gear");
				
				rect.node.setAttribute("class", name);
				
				label.node.removeAttribute("style");
				label.node.removeAttribute("text");
				label.node.setAttribute("class", id+" label");				
			
				input_length = node.inputs.length;
				output_length = node.outputs.length;

				iDist = node.width/(input_length+1);
				oDist = node.width/(output_length+1);

				for(var k = 0; k < input_length; k++){
					i_tab.push(view.paper.path("M " + parseInt(node.x+(k+1)*iDist) + " " + parseInt(node.y-10) + " l 0 10 l 10 0 l 0 -10 l -5 5 z").attr({'fill':"#fbec88"}));
				}
				for(var l = 0; l < output_length; l++){
					o_tab.push(view.paper.path("M " + parseInt(node.x+(l+1)*oDist) + " " + parseInt(node.y+node.height) + " l 0 5 l 5 5 l 5 -5 l 0 -5 z").attr({'fill':"#fbec88"}));
				}

				// KÓŁKA
				c_tab.push(c1, c2, c3, c4);
				for(i=0, j=c_tab.length; i<j; i++)
					c_tab[i].node.setAttribute("class", id+" connector");
				var msoverc = (function(c_tab){
					return function(){
						for(var i=0, j=c_tab.length; i<j; i++)
							c_tab[i].animate({opacity: 1}, 150);
					}
				})(c_tab);
				var msoutc = (function(c_tab){
					return function(){
						for(var i=0, j=c_tab.length; i<j; i++)
							c_tab[i].animate({opacity: 0}, 150);
					}
				})(c_tab);
				// EOF KÓŁKA
				
				node.set.push(rect, label, img_gear, c1, c2, c3, c4);
				$.each(i_tab, function(){
					node.set.push(this);
				});
				$.each(o_tab, function(){
					node.set.push(this);
				});
				node.set.push(serviceNameShown);

				for(i=0, j=node.set.length; i<j; i++)
					node.set[i].mouseover(msoverc).mouseout(msoutc);

				view.dragNodes(label, node);
				view.dragArrow([c1, c2, c3, c4], node);
				
				return node;
			},
			draw_functionalityNode : function draw_functionalityNode(node){
				var id = node.id,
					rect = view.paper.rect(node.x, node.y, node.width, node.height, 5).attr("fill", "#a6c9e2"),
					label = view.paper.text(node.x + node.width/2, node.y + 10, node.label),
					img_gear = view.paper.image("images/img.png", node.x + node.width-17, node.y+2, 15, 15),
					c1 = view.paper.circle(node.x+node.width/2, node.y, 4),
					c2 = view.paper.circle(node.x+node.width, node.y + node.height/2, 4),
					c3 = view.paper.circle(node.x+node.width/2, node.y + node.height, 4),
					c4 = view.paper.circle(node.x, node.y + node.height/2, 4),
					c_tab = [], i_tab = [], o_tab = [],
					input_length, output_length,
					i, j=0,
					iDist, oDist
					;

				input_length = node.inputs.length;
				output_length = node.outputs.length;

				iDist = node.width/(input_length+1);
				oDist = node.width/(output_length+1);

				for(var k = 0; k < input_length; k++){
					i_tab.push(view.paper.path("M " + parseInt(node.x+(k+1)*iDist) + " " + parseInt(node.y-10) + " l 0 10 l 10 0 l 0 -10 l -5 5 z").attr({'fill':"#a6c9e2"}));
				}
				for(var l = 0; l < output_length; l++){
					o_tab.push(view.paper.path("M " + parseInt(node.x+(l+1)*oDist) + " " + parseInt(node.y+node.height) + " l 0 5 l 5 5 l 5 -5 l 0 -5 z").attr({'fill':"#a6c9e2"}));
				}

				img_gear.node.setAttribute("class", id+" gear");
				
				rect.node.setAttribute("class", name);
				
				label.node.removeAttribute("style");
				label.node.removeAttribute("text");
				label.node.setAttribute("class", id+" label");				
			
				// KÓŁKA
				c_tab.push(c1, c2, c3, c4);
				for(i=0, j=c_tab.length; i<j; i++)
					c_tab[i].node.setAttribute("class", id+" connector");
				var msoverc = (function(c_tab){
					return function(){
						for(var i=0, j=c_tab.length; i<j; i++)
							c_tab[i].animate({opacity: 1}, 150);
					}
				})(c_tab);
				var msoutc = (function(c_tab){
					return function(){
						for(var i=0, j=c_tab.length; i<j; i++)
							c_tab[i].animate({opacity: 0}, 150);
					}
				})(c_tab);
				// EOF KÓŁKA
				
				node.set.push(rect, label, img_gear, c1, c2, c3, c4);
				$.each(i_tab, function(){
					node.set.push(this);
				});
				$.each(o_tab, function(){
					node.set.push(this);
				});
				
				for(i=0, j=node.set.length; i<j; i++)
					node.set[i].mouseover(msoverc).mouseout(msoutc);

				view.dragNodes(label, node);
				view.dragArrow([c1, c2, c3, c4], node);

				return node;
			},
			drawEdge : function drawEdge(c){
				//c - coords
				var size = 4;
				return view.paper.arrow(c.x1, c.y1, c.x2, c.y2, size);
			}
		};

		outputObject.extendVisualisation("StreamingWorkflowEngine", outputObject.draw_serviceNode);
		
		return outputObject;
	}	
	
	var outputView = {
		id : id,
		width : width,
		height : height,
		controler : gui.controler,
		bgSelectionHelper : null,
		columnParams : {
			top_nav : {},
			leftCol : {},
			centerCol : {},
			rightCol : {}
		},
		graph_view: {
			nodes : [],
			edgesCF : [],
			edgesDF : []
		},
		dragNodes : function drag(element, node){
			var	lastDragX,
				lastDragY,
				ox, dx,
				oy, dy,
				width, height,
				rWidth = gui.view.paper.width,
				rHeight = gui.view.paper.height,
				bbox,
				ctrl,
				transX, transY,
				flag = true,
				ready2move = false,
				itWasJustAClick = false,
				move = function move(x,y){
					if(ready2move){
						itWasJustAClick = false;
						dx = x - lastDragX;	// mouse x
						dy = y - lastDragY; // mouse y
						
						transX = ox + dx > rWidth-width ? rWidth-width-ox : (ox + dx < 0 ? -ox : dx);
						transY = oy + dy > rHeight-height ? rHeight-height-oy : (oy + dy < 0 ? -oy : dy);
	
				  		$.each(gui.view.graph_view.nodes, function(i, val){
							if(val.highlighted){
								val.translate(transX, transY);
							}
						});
					  	
						lastDragX = x;
						lastDragY = y;
						ox += transX;
						oy += transY;

						gui.controler.reactOnEvent("NodeMoved");
				 	}
				},
				start = function start(x,y,evt){
					itWasJustAClick = true;
					lastDragX = 0;
					lastDragY = 0;
					bbox = node.set.getBBox();
					width = bbox.width;
					height = bbox.height;
					ox = bbox.x;
					oy = bbox.y;

					flag = false;
					if(!node.highlighted){
						if(!evt.ctrlKey)
							gui.controler.reactOnEvent("DESELECT");

						flag = true;
						node.highlight2();
					}
					ready2move = node.highlighted;
					ctrl = evt.ctrlKey;
				},
				stop = function stop(x,y,evt){
					ready2move = false;
					if(itWasJustAClick){
						if(ctrl){
							if(!flag) {
								node.highlight(ctrl);
								//alert("");
							}
						}
						else {
							gui.controler.reactOnEvent("DESELECT");
							node.highlight2();
						}
					}
				}

				if(element.getType() === "Array"){
					$.each(element, function(){
						this.drag(move, start, stop);
					})
				} else
					element.drag(move, start, stop);
		},
		dragArrow : function dragArrow(element, node){
			var arrow,
				cx,
				cy,
				ofsetX,
				ofsetY,
				sourceNode,
				start = function start(){
					var canvas = $(outputView.paper.canvas);
					ofsetX = parseInt(canvas.offset().left) + parseInt(canvas.css("border-top-width"));
					ofsetY = parseInt(canvas.offset().top) + parseInt(canvas.css("border-left-width"));
					cx = this.attr("cx");
					cy = this.attr("cy");
					sourceNode = outputView.getNodeById(this.node.classList[0]);

					arrow = outputView.paper.arrow(cx, cy, cx, cy, 4);
				},
				move = function(a, b, c, d, event){
					// todo awizowanie arrow po najechaniu na node
					try {
						arrow[0].remove();
						arrow[1].remove();
					} catch(e){
						console.log(e);
					}
					
					arrow = outputView.paper.arrow(cx, cy, event.clientX-ofsetX + window.scrollX, event.clientY - ofsetY + window.scrollY, 4);
				},
				stop = function(event){
					try {
						arrow[0].remove();
						arrow[1].remove();
					} catch(e){
						console.log(e);
					}

					var targetNode = outputView.getNodesInsideRect(event.clientX-ofsetX, event.clientY-ofsetY);
					if(targetNode && sourceNode && targetNode.id !== sourceNode.id)
						gui.controler.reactOnEvent("AddEdge", {
						 	source: sourceNode,
						 	target: targetNode,
						 	CF_or_DF: "CF"
						 	// type: 
						})
				}
				;

			if(element.getType() === "Array"){
				$.each(element, function(){
					this.drag(move, start, stop);
				})
			} else
				element.drag(move, start, stop);
		},
		addBlankEdge : function addBlankEdge(sourceId, targetId){
			var edgeObject = {
				validated : false,
				arrow : undefined,
				source : sourceId,
				target : targetId,
				view : this,
				toString : function (){ return "ssdlEdge Object";},
				update : function(){
					if(! (this.source.getType() === "Object" && this.target.getType() === "Object") ){
						this.source = this.view.getNodeById(this.source) || this.source;
						this.target = this.view.getNodeById(this.target) || this.target;
					}
					// alert(this.source.getType() +":"+ this.target.getType() )
					if( this.source.getType() === "Object" && this.target.getType() === "Object"){
						// a(source+":"+target+":"+source.getType());
						var bestConnectors = this.view.getBestConnectors(
						this.source.getPossiblePositionsOfConnectors(),
						this.target.getPossiblePositionsOfConnectors()
						);
						try {
							this.arrow[0].remove();	this.arrow[1].remove();
						} catch(e){	//console.log(e);	
						}

						this.arrow = this.view.visualiser.drawEdge( bestConnectors )
					}
				}
			};

			this.graph_view.edgesCF.push( edgeObject );
		},
		addEdge : function addEdge(data){
			var foundedEdge = this.getEdge(data.source.id, data.target.id);
			if(foundedEdge){
				gui.controler.reactOnEvent(""); //err msg
			} else {
				var bestConnectors = this.getBestConnectors(
						data.source.getPossiblePositionsOfConnectors(),
						data.target.getPossiblePositionsOfConnectors()
					),
					edgeObject = {
						arrow : this.visualiser.drawEdge( bestConnectors ),
						source : data.source,
						target : data.target,
						view : this,
						toString : function (){ return "ssdlEdge Object";},
						update : function(){
							var bestConnectors = this.view.getBestConnectors(
								this.source.getPossiblePositionsOfConnectors(),
								this.target.getPossiblePositionsOfConnectors()
							);
							try {
								this.arrow[0].remove();	this.arrow[1].remove();
							} catch(e){	console.log(e);	}

							this.arrow = this.view.visualiser.drawEdge( bestConnectors )
						}
					}
					;
				this.graph_view.edgesCF.push( edgeObject );
			}
		},
		updateEdges : function refreshEdges(){
			$.each(this.graph_view.edgesCF, function(){
				this.update();
				// alert(this.source.id);
			});
		},
		getEdge : function getEdge(sourceId, targetId){
			var foundedEdge;
			$.each(this.graph_view.edgesCF, function(){
				if(this.source.id === sourceId && this.target.id === targetId){
					foundedEdge = this;
					return false;
				}
			});

			return foundedEdge;
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
						dz = dx*dx + dy*dy;	// odleglość
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
			html.push("<div id='top_nav_"+pf+"' style='width: "+(this.width-2)+"px; height:"+heightOfTopBar+"; border:1px solid black;'>&nbsp;&gt;</div>");
			html.push("<div id='left_plugins_"+pf+"' style='width:"+left_plugins_width+"px; height:" + h + "px; float:left;border:1px solid black;'></div>");
			html.push("<div id='canvas_holder_"+pf+"' style='width:"+canvas_width+"px; height:" + h + "px; float:left;border:1px solid black; '> </div>");
			html.push("<div id='right_plugins_"+pf+"' style='width:"+(this.width-6-canvas_width-left_plugins_width)+"px; height:" + h + "px; float:left;border:1px solid black; '></div>");

			$elem.html(html.join(""));

			this.paper = Raphael("canvas_holder_"+pf, canvas_width, h);
			this.bgSelectionHelper = this.paper.rect(0,0,width,height).attr({fill : "#DEDEDE", stroke: "none"}).toBack();
	
			$elem.css("width", this.width);
			$elem.css("height", this.height);

			//zbieranie danych o położeniu
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
		},
		drawGraph : function drawGraph(graph_json){
			var that = this;
			if(!this.paper){
				console.error("you have to run init() function first");
			}
			var p = this.paper,
				that = this,
				type, tmp;
				
			$.each(graph_json.nodes, function(key, val){
				tmp = that.visualiser.visualiseNode(val);
				if(tmp)
					that.graph_view.nodes.push( tmp );
				$.each(val.sources, function(k, v){
					that.addBlankEdge(v, val.nodeId);
				});
			});

			this.updateEdges();
		},
		setBold : function setBold(x1, y1, x2, y2){
			$.each(this.graph_view.nodes, function(k, v){
				if( v.isInside(x1, y1, x2, y2) )
					v.setBold(true);
				else 
					v.setBold(false);
			});
		},
		deselectAll : function deselectAll(){
			$.each(this.graph_view.nodes, function(k, v){
				v.removeHighlight();
			});
		},
		selectAll : function selectAll(){
			$.each(this.graph_view.nodes, function(k, v){
				v.highlight2();
			});
		},
		selectNodesInsideRect : function selectNodesInsideRect(x1,y1,x2,y2, ctrl){
			//alert(x1+":"+x2+":"+ctrl)
			$.each(this.graph_view.nodes, function(k, v){
				if( v.isInside(x1, y1, x2, y2) )
					v.highlight(ctrl);
				else if(!ctrl){
					v.removeHighlight();
				}

			});	
		},
		setBoldNodesInsideRect : function setBoldNodesInsideRect(x1,y1,x2,y2){
			$.each(this.graph_view.nodes, function(k, v){
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

				$.each(this.graph_view.nodes, function(){
					//a(x1+":"+y1+":"+x2+":"+y2+":"+count);
					if( this.isInside(x1, y1, x2, y2) ){
						resultTab.push(this);

						if(resultTab.length >= count)
							return false;
					}
				});
			}
			else {
				console.trace()
			}
			//alert(resultTab[0]);
			return count === 1 ? resultTab[0] : resultTab;
		},
		getNodeById : function getNodeById(id){
			var result;

			$.each(this.graph_view.nodes, function(){
				if( this.id === id ){
					result = this;
					return false;
				}
			});

			return result;
		},
		removeNode : function removeNode(id){
			$.each(this.graph_view.nodes, function(k, v){
				if(v.id === id){
					v.remove();
					return false;
				}
			});
		}
	}
	outputView.init();
	outputView.visualiser = nodeVisualizator(outputView);
	
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
				

			// TUTAJ POWINNO BYC WYSŁANIE EVENTU DO KONTROLERA Z 4MA WSPÓŁŻĘDNYMI
			gui.view.setBoldNodesInsideRect(x1,y1,x2,y2);			
		},
		bgStop = function(evt){
			if(itWasJustAClick){
				gui.controler.reactOnEvent("DESELECT");
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
				
				sel.remove();
				sel = null;
				lastRot = 0;
				// TUTAJ POWINNO BYĆ WYSŁANIE EVENTU DO KONTROLERA Z SELEKTEM
				
				gui.controler.reactOnEvent("SELECT", {
					x1 : x1,
					x2 : x2,
					y1 : y1,
					y2 : y2,
					ctrl : evt.ctrlKey
				});
				
				$.each(outputView.graph_view.nodes, function(i, val){
					val.setBold(false);
				});
			}
		},
	
		drawBottomBar = function drawBottomBar(){
			var triangle1, triangle2;
			var click = false;
			var invisibleBar = gui.view.paper.rect(0, gui.view.paper.height-30, gui.view.paper.width, 30);
			invisibleBar.attr({"fill":"grey", "opacity":0.0});
			triangle1 = gui.view.paper.path("M " + parseInt(invisibleBar.attr("x")+20) + " " + parseInt(invisibleBar.attr("y")+20) + " l 20 0 l -10 -10 z").attr({"fill":"grey", "opacity": 0.0});
			triangle2 = gui.view.paper.path("M " + parseInt(gui.view.paper.width-40) + " " + parseInt(invisibleBar.attr("y")+20) + " l 20 0 l -10 -10 z").attr({"fill":"grey", "opacity": 0.0});

			invisibleBar.mouseover(function(){
				if(!click){
					invisibleBar.animate({opacity: 0.1}, 200);
					triangle1.animate({opacity: 0.2}, 200);
					triangle2.animate({opacity: 0.2}, 200);
				}
			});
			invisibleBar.mouseout(function(){
				if(!click){
					invisibleBar.animate({opacity: 0.0}, 200);
					triangle1.animate({opacity: 0.0}, 200);
					triangle2.animate({opacity: 0.0}, 200);
				}
			});
			invisibleBar.click(function(){
				if(!click){
					invisibleBar.animate({y: gui.view.paper.height-75, height: 75, opacity: 0.2},200);
					triangle1.animate({opacity: 0.0}, 200);
					triangle2.animate({opacity: 0.0}, 200);
					click = true;
				}
				else{
					invisibleBar.animate({y: gui.view.paper.height-30, height: 30, opacity: 0.0},200);
					click = false
				}
			});
			}

	outputView.bgSelectionHelper.drag(bgMove, bgStart, bgStop);

	return outputView;
}