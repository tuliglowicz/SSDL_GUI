function nodeVisualizator(view){
		var outputObject = {
			getBlankNode : function getBlankNode(x, y){
				var blankNode = {
					id : "", //inputNode.nodeId,
					label : "", //inputNode.label,
					type : "", //inputNode.nodeType,
					description: "",
					mainShape: undefined,
					inputs : [],
					outputs : [],
					connectors : [],
					x : x || rozmieszczenie[2*c] || 10+55*c,
					y : y || rozmieszczenie[2*c+1] || 10+35*c,
					r : 15,
					width : 145,
					height : 35,
					scale : 100,
					highlighted : false,
					highlightColor : "orange",
					normalColor : "black",
					menu : null,
					removeView : function(){
						function remove(){
							if(this.remove)
								this.remove();
							else
								this.node.remove();
						}
						$.each(this.inputs, remove);
						$.each(this.outputs, remove);
						$.each(this.connectors, remove);
						$.each(this.set, remove);
					},
					show : function show(i, v){
						if(v && v.node){
							var objToAnimate = (v.node.animate ? v.node : v);
							objToAnimate.stop().myShow(250);
						}

						return this;
					},
					hide : function hide(i, v){
						if(v && v.node){
							var objToAnimate = (v.node.animate ? v.node : v);
							objToAnimate.stop().myHide(250);
						}
						return this;
					},
					switchMode : function switchMode(newMode){
						switch(newMode){
							case "CF" : this.switchToCFMode(); break;
							case "DF" : this.switchToDFMode(); break;
							case "H" : this.switchToHybrydMode(); break;
						}
						return this;
					},
					switchToCFMode : function switchToCFMode(){
						$.each(this.inputs, this.hide);
						$.each(this.outputs, this.hide);
						$.each(this.connectors, this.show);
						return this;
					},
					switchToDFMode : function switchToDFMode(){
						$.each(this.inputs, this.show);
						$.each(this.outputs, this.show);
						$.each(this.connectors, this.hide);

						return this;
					},
					switchToHybrydMode : function switchToHybrydMode(){
					},
					prepareNodeDescription : function prepareNodeDescription(){
						var data = gui.controler.getNodeById(this.id),
							result
							;

						if(data){
							if(data.physicalDescription){
								result = "<b>Service description:</b><br/> serviceName: " + data.physicalDescription.serviceName + 
									"<br/>serviceGlobalId: " +  data.physicalDescription.serviceGlobalId + 
									"<br/>address: " + data.physicalDescription.address + 
									"<br/>operation: " + data.physicalDescription.operation +
									"<br/><b>Non functional properties:</b><br/>"; 
							}
							if(data.nonFunctionalDescription){
								for(var i = 0; i < data.nonFunctionalDescription.length; i++) 
									result += "non functional property #" + i +
										":<br/>weight: " + data.nonFunctionalDescription[i].weight + 
										"<br/>name: " +  data.nonFunctionalDescription[i].name + 
										"<br/>relation: " + data.nonFunctionalDescription[i].relation + 
										"<br/>unit: " + data.nonFunctionalDescription[i].unit + 
										"<br/>value: " + data.nonFunctionalDescription[i].value;
							}
						}

						this.description = result;
						return this;
					},
					prepareDescriptionForInput : function prepareDescriptionForInput(inputId){
						var inputToDescribe = (typeof inputId === "string") ? this.getInputById(inputId) : inputId;
						var result = "";
						if(inputToDescribe){
							result = 
							"class: " + inputToDescribe.class + 
							"<br/>id: " + inputToDescribe.id + 
							"<br/>label: " + inputToDescribe.label + 
							"<br/>dataType: " + inputToDescribe.dataType + 
							"<br/>properties: " + inputToDescribe.properties;
							if(inputToDescribe.source && inputToDescribe.source.length === 2){
								result += "<br/>sources: "+inputToDescribe.source[0]+"-"+inputToDescribe.source[1];
							}
						}
						return result;
					},
					prepareDescriptionForOutput : function prepareDescriptionForOutput(outputId){
						var outputToDescribe = (typeof outputId === "string") ? this.getOutputById(outputId) : outputId;
						var result = "";
						if(outputToDescribe){
							result = 
								"class: " + outputToDescribe.class + 
								"<br/>id: " + outputToDescribe.id + 
								"<br/>label: " + outputToDescribe.label + 
								"<br/>dataType: " + outputToDescribe.dataType + 
								"<br/>properties: " + outputToDescribe.properties;
						}
						return result;
					},
					getInputById : function getInputById(id){
						var result;
						$.each(this.inputs, function(){
							if(this.id === id){
								result = this;
								return false;
							}
						});

						return result;
					},
					getOutputById : function getOutputById(id){
						var result;

						$.each(this.outputs, function(){
							if(this.id === id){
								result = this;
								return false;
							}
						});

						return result;
					},
					addInput : function addInput(input){
						this.clearIO();
						this.inputs.push( $.extend(true, {}, input) );
						// console.log(jsonFormatter(input,true,true));
						this.drawIO(view.paper);
						gui.view.updateEdges();
					},
					addOutput : function addOutput(output){
						this.clearIO();
						this.outputs.push( $.extend(true, {}, output) );
						this.drawIO(view.paper);
						gui.view.updateEdges();
					},
					drawIO : function drawIO(paper, forRepo){
						//paper = kanwa, na której rysuje się danego node'a
						//forRepo = opcjonalny parametr, przyjmuje true, jeżeli nie mają być rysowane strzałki
						var length = this.inputs.length, x, y, that = this, nx,
							start = function(){
								gui.view.hideEdges();
								this.ox = this.getBBox.x;
							},
							move = function(dx, dy){
								// nx = this.getBBox().x + dx - this.ox;
								// if(nx > that.x && nx < that.x + that.width - 10)
									this.translate(dx - this.ox, 0);
								// else 
								// 	this.translate(0,0);
								this.ox = dx;
							},
							end = function(){
								gui.view.updateEdges();
							};
						if(this.type.toLowerCase() === "control"){ 									//TODO: modyfikacja warunku, tak żeby nie sypał się node condition
							var mult = 1/1.41,
								nx = this.x-5, ny = this.y-5, nr = this.r, //nx, ny = współrzędne node'a, nr = promień
								coordsList = [
								[nx-nr, ny], [nx+nr, ny], [nx, ny+nr], [nx, ny-nr],
								[nx+nr*mult, ny+nr*mult], [nx+nr*mult, ny-nr*mult],
								[nx-nr*mult, ny+nr*mult], [nx-nr*mult, ny-nr*mult]];
							for(var i = 0; i < length; i++){
								if(i<8){ x = coordsList[i][0]; y = coordsList[i][1]; }
								else{ x = coordsList[i%8][0]; y = coordsList[i%8][1]; } //TODO: działający algorytm rozmieszczenia tutaj
								this.inputs[i].node = paper.path(this.inputPathString(x, y)).attr({'fill': this.color});
								this.inputs[i].node.node.setAttribute("class", this.id + " input " + this.inputs[i].id);
							}
							length = this.outputs.length;
							for(var i = 0; i < length; i++){
								if(i<8){ x = coordsList[i][0]; y = coordsList[i][1]; }
								else{ x = coordsList[i%8][0]; y = coordsList[i%8][1]; } //TODO: działający algorytm rozmieszczenia tutaj
								this.outputs[i].node = paper.path(this.outputPathString(x, y)).attr({'fill': this.color});
								this.outputs[i].node.node.setAttribute("class", this.id + " output " + this.outputs[i].id);
							}
						}
						else {
							var spacing = this.width/(length+1);
							for(var i = 0; i < length; i++){
								x = this.x + (i+1)*spacing; y = this.y-10;
								this.inputs[i].node = paper.path(this.inputPathString(x, y)).attr({'fill': this.color});
								this.inputs[i].node.drag(move, start, end);
								this.inputs[i].node.node.setAttribute("class", this.id+" input " + this.inputs[i].id);
							}
							length = this.outputs.length; spacing = this.width/(length+1);
							for(var i = 0; i < length; i++){
								x = this.x + (i+1)*spacing; y = this.y+this.height;
								this.outputs[i].node = paper.path(this.outputPathString(x, y)).attr({'fill': this.color});
								// this.outputs[i].node.drag(move, start, end); //HELP NEEDED - co zrobić, żeby się nie rysowały te cholerne strzałki?!?!?!
								this.outputs[i].node.node.setAttribute("class", this.id+" input " + this.outputs[i].id);
							}
						}
						if(!forRepo) view.dragDFArrow(this.outputs.map(function(o){ return o.node; }), this);
						this.addInputTooltips();
						this.addOutputTooltips();
					},
					// wywala WIZUALIZACJĘ wszystkich IO; żeby znowu się pokazały, konieczne drawIO();
					// pozwala przerysować IO bez przerysowywania całego node'a
					clearIO: function clearIO(){
						for(var i in this.inputs)
							this.inputs[i].node.remove();
						for(var o in this.outputs)
							this.outputs[o].node.remove();
					},
					inputPathString: function inputPathString(x, y){
						return("M " + x + " " + y + " l 0 10 l 10 0 l 0 -10 l -5 5 z");
					},
					outputPathString: function outputPathString(x, y){
						return("M " + x + " " + y + " l 0 5 l 5 5 l 5 -5 l 0 -5 z");
					},
					addInputTooltips: function addInputTooltips(){
						var that = this;
						$.each(this.inputs, function(){
							this.description = that.prepareDescriptionForInput(this.id);
							this.node.mouseover(
								(function(something){
									return function(evt, x, y){
										view.tooltip.open(that.label+": "+something.id, something.description, x, y, evt);
									};
								})(this)
							).mouseout(function(){view.tooltip.close()});
						});
					},
					addOutputTooltips: function addOutputTooltips(){
						var that = this;
						$.each(this.outputs, function(){
							this.description = that.prepareDescriptionForOutput(this.id);
							this.node.mouseover(
								(function(something){
									return function(evt, x, y){
										view.tooltip.open(that.label+": "+something.id, something.description, x, y, evt);
									};
								})(this)
							).mouseout(function(){view.tooltip.close()});
						});
					},
					getBBox : function getBBox(){
						var result = { x: this.x, y: this.y, width: this.width, height: this.height};
						if(this.inputs.length > 0) result.height+=10;
						if(this.outputs.length > 0) result.height+=10;
						return result;
					},
					setBold : function setBold(flag){
						if(flag)
							this.set[0].attr("stroke-width", "2px");
						else
							this.set[0].attr("stroke-width", "1px");
					},
					highlight : function highlight(ctrl){
						// console.trace();
						if(ctrl){
							this.highlighted ? this.removeHighlight() : this.highlight2();
						} else {
							this.highlighted ? null : this.highlight2();
						}
					},
					highlight2: function highlight(){
						var that = this;
						this.mainShape.attr("stroke", that.highlightColor);
						$.each(this.inputs, function(i, v){
							v.node.attr("stroke", that.highlightColor);
						});
						$.each(this.outputs, function(i, v){
							v.node.attr("stroke", that.highlightColor);
						});
						$.each(this.connectors, function(i, v){
							v.attr("stroke", that.highlightColor);
						});
						this.highlighted = true;
					},
					removeHighlight : function removeHighlight(){
						var that = this;
						this.mainShape.attr("stroke", that.normalColor);
						$.each(this.inputs, function(i, v){
							v.node.attr("stroke", that.normalColor);
						});
						$.each(this.outputs, function(i, v){
							v.node.attr("stroke", that.normalColor);
						});
						$.each(this.connectors, function(i, v){
							v.attr("stroke", that.normalColor);
						});
						this.highlighted = false;
					},
					isInside : function isInside(x1,y1,x2,y2){
						return this.x+this.width > x1 &&
								this.y+this.height > y1 &&
								this.x < x2 &&
								this.y < y2
					},
					removeNode : function remove(){
						$.each(this.set, function(){
							this.remove();	
						});
						$.each(this.inputs, function(){
							this.node.remove();	
						});
						$.each(this.outputs, function(){
							this.node.remove();	
						});
						$.each(this.connectors, function(){
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
						return "SSDL_Node object";
					},
					translate : function translate(transX, transY){
						$.each(this.set, function(i, v){
								v.translate(transX, transY);
						});
						$.each(this.inputs, function(i, v){
							v.node.translate(transX, transY);
						});
						$.each(this.outputs, function(i, v){
							v.node.translate(transX, transY);
						});
						$.each(this.connectors, function(i, v){
							v.attr("cx", v.attr("cx") + transX);
							v.attr("cy", v.attr("cy") + transY);
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
					},
					hideNode : function hideNode(){
						$.each(this.set, function(){
							this.hide();
						});
						$.each(this.inputs, function(){
							this.node.hide();
						});
						$.each(this.outputs, function(){
							this.node.hide();
						});
						$.each(this.connectors, function(){
							this.hide();
						});
					},
					showNode : function showNode(){
						this.buildMenu();
						$.each(this.set, function(){
							this.show();
						});
						$.each(this.inputs, function(){
							this.node.show();
						});
						$.each(this.outputs, function(){
							this.node.show();
						});
						$.each(this.connectors, function(){
							this.show();
						});
					},
					buildMenu : function buildMenu(){
						if(!this.menu){
							this.menu = view.contextMenu(this.set, view);
							this.menu.addOption('Properties');
							this.menu.addOption('Edit subgraph');
							this.menu.addOption('Test');
							this.menu.addSeparator();
							this.menu.addOption('Cut');
							this.menu.addOption('Copy');
							this.menu.addOption('Copy with reference');
							this.menu.addOption('Paste');
							this.menu.addOption('Delete',"DELETE");
						}
					}
				}
				
				return blankNode;
			},
			extendVisualisation : function extendVisualisation(type, fun){
				this["draw_"+type.toLowerCase()+"Node"] = fun;
			},
			draw_unknownNode : function draw_unknownNode(node){
			},
			visualiseNode : function visualiseNode(node, x, y){
				++c;
				var that = this,
					newNode = this.getBlankNode(x, y),
					nodeType = node.nodeType.toLowerCase(),
					visualizedNode
				;

				newNode.id = node.nodeId;
				newNode.label = node.nodeLabel || newNode.id;
				newNode.type = node.nodeType;
				newNode.controlType = node.controlType;
				if(node.physicalDescription) newNode.serviceName = node.physicalDescription.serviceName;
				newNode.set = view.paper.set();
				newNode.hasSubgraph = !isEmpty(node.subgraph);
				newNode.inputs = [];
				if(node.functionalDescription) 
					$.each(node.functionalDescription.inputs, function(){
						newNode.inputs.push( $.extend(true, {}, this) );
					});
				newNode.outputs = [];
				if(node.functionalDescription)
					$.each(node.functionalDescription.outputs, function(){
						newNode.outputs.push( $.extend(true, {}, this) );
					});
				// console.log(newNode.id, newNode.inputs, newNode.outputs);

				visualizedNode = ( this["draw_"+nodeType+"Node"] || this.draw_unknownNode )(newNode) ;

				this.addTooltips(visualizedNode);

				return visualizedNode;
			},
			draw_controlNode : function draw_controlNode(node){
				node.x = node.x+130/2+node.r/2;
				node.y = node.y+node.r;
				node.color = CFG.colors.startstop;
				var c = view.paper.circle(node.x, node.y, node.r).attr({fill: node.color}),
					label = view.paper.text(node.x, node.y-20, node.id).attr("fill", "#333")
					;
				node.mainShape = c;
				if(node.controlType.toLowerCase() == "#start")
					node.mainShape.attr({cursor: "crosshair"});
				node.raph_label = label;
				node.raph_label.dblclick(function(){
					gui.controler.reactOnEvent("EditNode", {nodeId: node.id});
				})

				c.node.setAttribute("class", node.id);
						
				label.node.removeAttribute("style");
				label.node.removeAttribute("text");
				label.node.setAttribute("class", node.id + " label");

				node.drawIO(view.paper);

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

				node.switchToCFMode = function switchToCFMode(){
					$.each(this.inputs, this.hide);
					$.each(this.outputs, this.hide);
					$.each(this.connectors, this.show);
					this.mainShape.attr({cursor: "crosshair"})
				},
				node.switchToDFMode = function switchToDFMode(){
					$.each(this.inputs, this.show);
					$.each(this.outputs, this.show);
					$.each(this.connectors, this.hide);
					if(node.controlType.toLowerCase() != "#start")
						this.mainShape.attr({cursor: "default"})
				}
				;

				node.set.push(c, label);

				view.dragNodes(label, node);
				
				var isStartNode;
				if(node.controlType && node.controlType.toLowerCase() == "#start")
					isStartNode = true;

				view.dragCFArrow(c, node, isStartNode);

				// view.dragDFArrow(node.inputs.map(function(i){ return i.node; }), node);
				// view.dragDFArrow(node.outputs.map(function(o){ return o.node; }), node);

				return node;
			},
			draw_serviceNode : function draw_serviceNode(node, paper, drawNotForRepo){
				// if(!drawNotForRepo)
					// a(node.id)
				var nodeType =  node.type.toLowerCase()
				var id = node.id,
					radius = 4,
					color = ( nodeType == "mediator" ? CFG.colors.mediator : ( nodeType == "emulationservice" ? CFG.colors.emulationService : CFG.colors.service) ),
					paper = paper || view.paper,
					rect = paper.rect(node.x, node.y, node.width, node.height, 5).attr("fill", color),
					label = paper.text(node.x + node.width/2, node.y + 10, node.label),
					img_gear = paper.image("images/img.png", node.x + node.width-17, node.y+2, 15, 15),
					i, j,
					serviceName = node.serviceName,
					shortenServiceName,
					serviceNameShown,
					maxLength = 25
				;
				node.color = color;
				node.mainShape = rect;
				node.raph_label = label;

				img_gear.node.setAttribute("class", id+" clickable");
				img_gear.click(function(){
					gui.controler.reactOnEvent("EditNode", {nodeId: id});
				});
				
				node.mainShape.node.setAttribute("class", id);
				
				label.node.removeAttribute("style");
				label.node.removeAttribute("text");
				label.node.setAttribute("class", id+" label");

				node.drawIO(paper, drawNotForRepo);

				if(!drawNotForRepo){

					if( node.hasSubgraph ){
						var img_subgraph = paper.image("images/subgraph.png", node.x + 3, node.y+5, 20, 20).attr("title", "subgraph");
						img_subgraph.node.setAttribute("class", id+" subgraph");
						img_subgraph.dblclick(function(){
							// a("subgraph");
							gui.controler.reactOnEvent("SwitchCurrentGraph", {nodeId: id});
						});
					}

					var c1 = paper.circle(node.x+node.width/2, node.y, radius),
						c2 = paper.circle(node.x+node.width, node.y + node.height/2, radius),
						c3 = paper.circle(node.x+node.width/2, node.y + node.height, radius),
						c4 = paper.circle(node.x, node.y + node.height/2, radius)
					;


					if(serviceName){
						shortenServiceName = serviceName.length > maxLength ? serviceName.substring(0, maxLength-3)+"..." : serviceName,
						serviceNameShown = paper.text(node.x+node.width/2, node.y + 25, shortenServiceName);
						serviceNameShown.node.setAttribute("class", name);
						serviceNameShown.attr({title: serviceName, cursor: "default"});
					}
					node.connectors.push(c1, c2, c3, c4);
					for(i=0, j=node.connectors.length; i<j; i++)
						node.connectors[i].node.setAttribute("class", id+" connector");
					
					view.dragNodes(label, node);
					view.dragCFArrow(node.connectors, node);

					// view.dragDFArrow(node.inputs.map(function(i){ return i.node; }), node);
					// view.dragDFArrow(node.outputs.map(function(o){ return o.node; }), node);
				}

				node.set.push(rect, label, img_gear, img_subgraph, serviceNameShown);
				
				return node;
			},
			draw_functionalityNode : function draw_functionalityNode(node){
				node.color = CFG.colors.functionality;
				var id = node.id,
					rect = view.paper.rect(node.x, node.y, node.width, node.height, 5).attr("fill", node.color),
					label = view.paper.text(node.x + node.width/2, node.y + 10, node.label),
					img_gear = view.paper.image("images/img.png", node.x + node.width-17, node.y+2, 15, 15),
					c1 = view.paper.circle(node.x+node.width/2, node.y, 4),
					c2 = view.paper.circle(node.x+node.width, node.y + node.height/2, 4),
					c3 = view.paper.circle(node.x+node.width/2, node.y + node.height, 4),
					c4 = view.paper.circle(node.x, node.y + node.height/2, 4),
					i, j=0
					;
				node.mainShape = rect;
				node.raph_label = label;

				img_gear.node.setAttribute("class", id+" clickable");
				img_gear.click(function(){
					gui.controler.reactOnEvent("EditNode", {nodeId: id});
				})
				
				node.mainShape.node.setAttribute("class", id);

				node.drawIO(view.paper);
				
				label.node.removeAttribute("style");
				label.node.removeAttribute("text");
				label.node.setAttribute("class", id+" label");				
			
				node.connectors.push(c1, c2, c3, c4);
				for(i=0, j=node.connectors.length; i<j; i++)
					node.connectors[i].node.setAttribute("class", id+" connector");
				
				node.set.push(rect, label, img_gear);

				view.dragNodes(label, node);
				view.dragCFArrow(node.connectors, node);

				// view.dragDFArrow(node.inputs.map(function(i){ return i.node; }), node);
				// view.dragDFArrow(node.outputs.map(function(o){ return o.node; }), node);

				return node;
			},
			drawEdge : function drawEdge(c){
				// c - coords
				// console.log(c)
				var size = 4;
				return view.paper.arrow(c.x1, c.y1, c.x2, c.y2, size);
			},
			addTooltips : function addTooltips(visualizedNode){
				function close(){
					view.tooltip.close();
				}
				//te funkcje wywołują się podczas dodawania IO, nie ma ich tutaj sensu powtarzać
				// visualizedNode.addInputTooltips();
				// visualizedNode.addOutputTooltips();
				visualizedNode
				.prepareNodeDescription()
				.mainShape.mouseover(
					(function(that){
						return function(evt, x, y){
							view.tooltip.open(that.type+":"+that.label, that.description, x, y, evt);
						};
					})(visualizedNode)
				).mouseout(close)
				;
			}
		};
		outputObject.extendVisualisation("StreamingWorkflowEngine", outputObject.draw_serviceNode);
		outputObject.extendVisualisation("Mediator", outputObject.draw_serviceNode);
		outputObject.extendVisualisation("JavaService", outputObject.draw_serviceNode);
		outputObject.extendVisualisation("EmulationService", outputObject.draw_serviceNode);

		return outputObject;
	};