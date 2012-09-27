function nodeVisualizator(view){
		var outputObject = {
			getBlankNode : function getBlankNode(x, y){
				c++;
				var blankNode = {
					id : "", //inputNode.nodeId,
					label : "", //inputNode.label,
					type : "", //inputNode.nodeType,
					description : "", // ???
					mainShape : undefined,
					raph_label : undefined,
					inputs : [],
					outputs : [],
					connectors : [],
					x : x || rozmieszczenie[2*c] || 10+55*c, //
					y : y || rozmieszczenie[2*c+1] || 10+35*c, //
					r : CFG.nodeDefaults.defaultRarius,
					width : CFG.nodeDefaults.defaultWidth,
					height : CFG.nodeDefaults.defaultHeight,
					scale : CFG.nodeDefaults.defaultScale,
					highlighted : false,
					menu : null,
					prepareToDrag : function prepareToDrag(){
						this.hideNode();
						this.mainShape.show();
						if(CFG.actions.showLabelDuringNodeDrag)
							this.raph_label.show();
					},
					returnFromDragging : function returnFromDragging(transX, transY){
						transX = transX || 0;
						transY = transY || 0;

						if(transX != 0 || transY != 0){
							this.x += transX;
							this.y += transY;

							this.clearIO();
							this.drawIO(view.paper);

							$.each(this.set, function(i, v){
								if(i>1 || i==1 && !CFG.actions.showLabelDuringNodeDrag)
									v.translate(transX, transY);
							});
							$.each(this.connectors, function(i, v){
								v.attr("cx", v.attr("cx") + transX);
								v.attr("cy", v.attr("cy") + transY);
							});
						}
						
						this.showNode();
					},
					translate : function translate(transX, transY){
						// console.log(transX, transY, "translate")
						this.mainShape.translate(transX, transY);
						if(CFG.actions.showLabelDuringNodeDrag)
							this.raph_label.translate(transX, transY);

						// $.each(this.set, function(i, v){
						// 		v.translate(transX, transY);
						// });
						// $.each(this.inputs, function(i, v){
						// 	v.node.translate(transX, transY);
						// });
						// $.each(this.outputs, function(i, v){
						// 	v.node.translate(transX, transY);
						// });
						// $.each(this.connectors, function(i, v){
						// 	v.attr("cx", v.attr("cx") + transX);
						// 	v.attr("cy", v.attr("cy") + transY);
						// });
					},
					removeView : function removeView(){
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
						var data = gui.controller.getNodeById(this.id),
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
					drawConnectors : function drawConnectors(){
						var node = this,
							paper = view.paper,
							radius = CFG.nodeDefaults.defaultConnectorRadius
						;
						var c1 = paper.circle(node.x+node.width/2, node.y, radius),
							c2 = paper.circle(node.x+node.width, node.y + node.height/2, radius),
							c3 = paper.circle(node.x+node.width/2, node.y + node.height, radius),
							c4 = paper.circle(node.x, node.y + node.height/2, radius)
						;

						node.connectors.push(c1, c2, c3, c4);
						for(i=0, j=node.connectors.length; i<j; i++)
							node.connectors[i].node.setAttribute("class", node.id+" connector");
					},
					drawIO : function drawIO(paper, forRepo){
						//paper = kanwa, na której rysuje się danego node'a
						//forRepo = opcjonalny parametr, przyjmuje true, jeżeli nie mają być rysowane strzałki

						var strokeColor = (this.highlighted ? CFG.colors.highlightStroke : CFG.colors.normalStroke);
						var isCFMode = CFG.mode == "CF";

						var length = this.inputs.length, x, y, that = this, nx, move;
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
								this.inputs[i].node = paper.path(this.inputPathString(x, y)).attr({'fill': this.color, stroke: strokeColor});
								this.inputs[i].node.node.setAttribute("class", this.id + " input " + this.inputs[i].id);
							}
							length = this.outputs.length;
							for(var i = 0; i < length; i++){
								if(i<8){ x = coordsList[i][0]; y = coordsList[i][1]; }
								else{ x = coordsList[i%8][0]; y = coordsList[i%8][1]; } //TODO: działający algorytm rozmieszczenia tutaj
								this.outputs[i].node = paper.path(this.outputPathString(x, y)).attr({'fill': this.color, stroke: strokeColor});
								this.outputs[i].node.node.setAttribute("class", this.id + " output " + this.outputs[i].id);
							}
						}
						else {
							var spacing = this.width/(length+1);
							for(var i = 0; i < length; i++){
								x = this.x + (i+1)*spacing; y = this.y-10;
								this.inputs[i].node = paper.path(this.inputPathString(x, y)).attr({'fill': this.color, stroke: strokeColor});
								move = this.moveInput(i);
								this.inputs[i].node.drag(move.move, move.start, move.end);
								this.inputs[i].node.node.setAttribute("class", this.id+" input " + this.inputs[i].id);
							}
							length = this.outputs.length; spacing = this.width/(length+1);
							for(var i = 0; i < length; i++){
								x = this.x + (i+1)*spacing; y = this.y+this.height;
								this.outputs[i].node = paper.path(this.outputPathString(x, y)).attr({'fill': this.color, stroke: strokeColor});
								move = this.moveOutput(i);
								this.outputs[i].node.drag(move.move, move.start, move.end); //HELP NEEDED - co zrobić, żeby się nie rysowały te cholerne strzałki?!?!?!
								this.outputs[i].node.node.setAttribute("class", this.id+" input " + this.outputs[i].id);
							}
						}
						if(!forRepo) view.dragDFArrow(this.outputs.map(function(o){ return o.node; }), this);
						this.addInputTooltips();
						this.addOutputTooltips();
					},
					moveInput: function moveInput(i){
						var index = i,
							that = this,
							otherInput, otherIndex,
							img, x, y, x1, dist, glow1, glow2,
							obj1, obj2,
							ctrlPressed = false;
							result = {
								start: function start(){	
								var bbox = this.getBBox();
									x = bbox.x; y = bbox.y;
								},
								move: function move(dx){
									if(glow2) glow2.remove();
									if(img) img.remove();
									if(ctrlPressed){
										if(!glow1) glow1 = this.glow({'color': 'blue'});
										if(dx < 0){
											if(that.inputs[index-1]){ 
												otherIndex = index-1;
												x1 = that.inputs[otherIndex].node.getBBox().x;
												dist = x1 - x;
												if(dx < dist/3){
													otherInput = that.inputs[otherIndex];
													img = gui.view.paper.image('images/dblArrow.png', x1+((x-x1)/2)-4, y-15, 16, 16);
													glow2 = otherInput.node.glow({'color': 'blue'});
												}
											}
											else{
												otherInput = undefined;
												glow2.remove();
											}
										}
										if(dx >=0){
											if(that.inputs[index+1]){
												otherIndex = index + 1;
												x1 = that.inputs[otherIndex].node.getBBox().x;
												dist = x1 - x;
												if(dx > dist/3){
													otherInput = that.inputs[otherIndex];
													img = gui.view.paper.image('images/dblArrow.png', x1+((x-x1)/2)-4, y-15, 16, 16);
													glow2 = otherInput.node.glow({'color': 'blue'});
												}
											}
											else{
												otherInput = undefined;
												glow2.remove();
											}
										}
									}
								},
								end: function end(){
									if(glow1) glow1.remove(); 
									if(otherInput){
										gui.view.hideEdges();
										obj1 = gui.view.paper.path(that.inputPathString(x, y)).attr({'fill': that.color});;
										obj2 = gui.view.paper.path(that.inputPathString(x1, y)).attr({'fill': that.color});;
										that.inputs[index].node.remove();
										that.inputs[otherIndex].node.remove();
										obj1.animate({transform:"t"+(x1-x)+",0"}, 250);
										obj2.animate({transform:"t"+(x-x1)+",0"}, 250);
										setTimeout(function(){
											obj1.remove(); obj2.remove();
											that.inputs[otherIndex] = that.inputs[index];
											that.inputs[index] = otherInput;
											that.clearIO(); that.drawIO(gui.view.paper);
											gui.view.updateEdges();										
										}, 250);
										img.remove(); glow2.remove();									
									}
								}
						};
						$(document).keydown(function(event){
							if(event.which === 17) ctrlPressed = true;
						});
						$(document).keyup(function(event){
							if(event.which === 17) ctrlPressed = false;
						});
						return result;
					},
					moveOutput: function moveOutput(i){
						var index = i,
							that = this,
							otherOutput, otherIndex,
							img, x, x1, y, glow1, glow2,
							obj1, obj2,
							ctrlPressed = false,
							result = {
								start: function start(x, y, evt){
									// gui.view.hideEdges();
									var bbox = this.getBBox();
									x = bbox.x; y = bbox.y;
								},
								move: function move(dx){
									if(glow2) glow2.remove();
									if(img) img.remove();
									if(ctrlPressed){
										if(!glow1) glow1 = this.glow({'color': 'blue'});
										if(dx < 0){
											if(that.outputs[index-1]){ 
												otherIndex = index-1;
												x1 = that.outputs[otherIndex].node.getBBox().x;
												dist = x1 - x;
												if(dx < dist/3){
													otherOutput = that.outputs[otherIndex];
													img = gui.view.paper.image('images/dblArrow.png', x1+((x-x1)/2)-4, y+10, 16, 16);
													glow2 = otherOutput.node.glow({'color': 'blue'});
												}
											}
											else {
												otherOutput = undefined;
												if(glow2) glow2.remove();
											}
										}
										if(dx >=0){
											if(that.outputs[index+1]){
												otherIndex = index + 1;
												x1 = that.outputs[otherIndex].node.getBBox().x;
												dist = x1 - x;
												if(dx > dist/3){
													otherOutput = that.outputs[otherIndex];
													img = gui.view.paper.image('images/dblArrow.png', x1+((x-x1)/2)-4, y+10, 16, 16);
													glow2 = otherOutput.node.glow({'color': 'blue'});
												}
											}
											else{
												otherOutput = undefined;
												if(glow2) glow2.remove();
											}
										}
									}
								},
								end: function end(){
									if(glow1) glow1.remove();
									if(otherOutput){
										gui.view.hideEdges();
										obj1 = gui.view.paper.path(that.outputPathString(x, y)).attr({'fill': that.color});;
										obj2 = gui.view.paper.path(that.outputPathString(x1, y)).attr({'fill': that.color});;
										that.outputs[otherIndex].node.remove();
										that.outputs[index].node.remove();
										obj1.animate({transform:"t"+(x1-x)+",0"}, 250);
										obj2.animate({transform:"t"+(x-x1)+",0"}, 250);
										setTimeout(function(){
											obj1.remove(); obj2.remove()
											that.outputs[otherIndex] = that.outputs[index];
											that.outputs[index] = otherOutput;
											that.clearIO(); that.drawIO(gui.view.paper);
											gui.view.updateEdges();
										}, 250);
										img.remove(); glow2.remove();
									}
								}
						};
						$(document).keydown(function(event){
							if(event.which === 17) ctrlPressed = true;
						});
						$(document).keyup(function(event){
							if(event.which === 17) ctrlPressed = false;
						});
						return result;
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
						if(this.inputs.length > 0)
							result.height += 10;
						if(this.outputs.length > 0)
							result.height += 10;

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
						var color = CFG.colors.highlightStroke;
						this.mainShape.attr("stroke", color);
						$.each(this.inputs, function(i, v){
							v.node.attr("stroke", color);
						});
						$.each(this.outputs, function(i, v){
							v.node.attr("stroke", color);
						});
						$.each(this.connectors, function(i, v){
							v.attr("stroke", color);
						});
						this.highlighted = true;
					},
					removeHighlight : function removeHighlight(){
						var that = this;
						var color = CFG.colors.normalStroke;
						this.mainShape.attr("stroke", color);
						$.each(this.inputs, function(i, v){
							v.node.attr("stroke", color);
						});
						$.each(this.outputs, function(i, v){
							v.node.attr("stroke", color);
						});
						$.each(this.connectors, function(i, v){
							v.attr("stroke", color);
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
			prepareData : function prepareData(dataNode, viewNode){
				console.log("-----", dataNode.nodeId, dataNode, viewNode);
				viewNode.id = dataNode.nodeId;
				viewNode.label = dataNode.nodeLabel || dataNode.nodeId;
				viewNode.type = dataNode.nodeType;
				viewNode.controlType = dataNode.controlType;
				viewNode.inputs = [];
				viewNode.outputs = [];
				viewNode.set = view.paper.set();
				viewNode.hasSubgraph = !isEmpty(dataNode.subgraph);
				if(dataNode.physicalDescription)
					viewNode.serviceName = dataNode.physicalDescription.serviceName;
				if(dataNode.functionalDescription) 
					$.each(dataNode.functionalDescription.inputs, function(){
						viewNode.inputs.push( $.extend(true, {}, this) );
					});
				if(dataNode.functionalDescription)
					$.each(dataNode.functionalDescription.outputs, function(){
						viewNode.outputs.push( $.extend(true, {}, this) );
					});

				return viewNode;
			},
			assumeColor : function assumeColor(nodeType, viewNode){
				if(nodeType == "control")
					viewNode.color = CFG.colors.start;
				else if(nodeType == "functionality")
					viewNode.color = CFG.colors.functionality;
				else if(nodeType == "mediator")
					viewNode.color = CFG.colors.mediator;
				else if( CFG.serviceTypes.indexOf(nodeType) > -1 )
					viewNode.color = CFG.colors.service;
			},
			draw_rectNode : function draw_nodes(viewNode, paper){
				var paper = paper || view.paper,
					rect = paper.rect(viewNode.x, viewNode.y, viewNode.width, viewNode.height, 5).attr({fill: viewNode.color, stroke: CFG.colors.normalStroke}),
					label = paper.text(viewNode.x + viewNode.width/2, viewNode.y + 10, viewNode.label),
					img_gear = paper.image("images/img.png", viewNode.x + viewNode.width-17, viewNode.y+2, 15, 15)
				;
				viewNode.mainShape = rect;
				viewNode.raph_label = label;
				viewNode.mainShape.node.setAttribute("class", viewNode.id);

				label.node.removeAttribute("style");
				label.node.removeAttribute("text");
				label.node.setAttribute("class", viewNode.id+" label");

				img_gear.node.setAttribute("class", viewNode.id+" clickable");				
				img_gear.click(function(){
					gui.controller.reactOnEvent("EditNode", {nodeId: viewNode.id});
				});

				viewNode.set.push(rect, label, img_gear);
			},
			visualiseNode : function visualiseNode(dataNode, x, y, forRepo){
				var viewNode = this.getBlankNode(x, y);
				var nodeType = dataNode.nodeType.toLowerCase();

				this.prepareData( dataNode, viewNode );
				this.assumeColor(nodeType, viewNode);
				// console.log(viewNode.id, viewNode.color, nodeType);
				if ( nodeType == "control" ){
					this.draw_controlNode(viewNode);

					if(viewNode.isStart)
						view.dragCFArrow( viewNode.mainShape, viewNode );

				} else {
					this.draw_rectNode(viewNode);
					viewNode.drawConnectors();
					view.dragCFArrow( viewNode.connectors, viewNode );
					( this["draw_"+nodeType+"Node"] || this.draw_unknownNode )(viewNode); // tutaj rysowane są atrybuty do danego typu
				}

				viewNode.drawIO(view.paper);
				this.addTooltips( viewNode );
				view.dragNodes( viewNode.raph_label, viewNode );

				return viewNode;
			},
			draw_controlNode : function draw_controlNode(node){
				node.x = node.x+130/2+node.r/2;
				node.y = node.y+node.r;
				node.isStart = ( node.controlType && node.controlType.toLowerCase() == "#start" ),
					c = view.paper.circle(node.x, node.y, node.r).attr({fill: node.color, stroke: CFG.colors.normalStroke}),
					label = view.paper.text(node.x, node.y-20, node.label)
				;
				c.node.setAttribute("class", node.id);
				if( node.isStartNode )
					c.attr({cursor: "crosshair"});
				
				label.node.removeAttribute("style");
				label.node.removeAttribute("text");
				label.node.setAttribute("class", node.id + " label");

				node.mainShape = c;
				node.raph_label = label;
				node.raph_label.dblclick(function(){
					gui.controller.reactOnEvent("EditNode", {nodeId: node.id});
				});

				node.set.push(c, label);
				
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
					// $.each(this.connectors, this.show);
					if(node.isStart)
						this.mainShape.attr({cursor: "crosshair"})
				},
				node.switchToDFMode = function switchToDFMode(){
					$.each(this.inputs, this.show);
					$.each(this.outputs, this.show);
					// $.each(this.connectors, this.hide);
					if(node.isStart)
						this.mainShape.attr({cursor: "default"})
				}
				;

				return node;
			},
			draw_serviceNode : function draw_serviceNode(viewNode, paper){
				var paper = paper || view.paper,
					maxLength = CFG.nodeDefaults.maxLengthOfShownServiceName,
					serviceName = viewNode.serviceName,
					shortenServiceName,
					serviceNameShown
				;
				// jsonFormatter(viewNode, 1, 1)
				if( viewNode.hasSubgraph ){
					var img_subgraph = paper.image("images/subgraph.png", viewNode.x + 3, viewNode.y+5, 20, 20).attr("title", "subgraph");
					img_subgraph.node.setAttribute("class", viewNode.id+" subgraph");
					img_subgraph.dblclick(function(){
						gui.controller.reactOnEvent("SwitchCurrentGraph", {nodeId: viewNode.id});
					});
					viewNode.set.push(img_subgraph)
				}

				if( serviceName ){
					shortenServiceName = serviceName.length > maxLength ? serviceName.substring(0, maxLength-3)+"..." : serviceName,
					serviceNameShown = paper.text(viewNode.x+viewNode.width/2, viewNode.y + 25, shortenServiceName);
					serviceNameShown.node.setAttribute("class", name);
					serviceNameShown.attr({title: serviceName, cursor: "default"});
					viewNode.set.push(serviceNameShown);
				}
				
				return viewNode;
			},
			draw_functionalityNode : function draw_functionalityNode(viewNode, paper){
				// nothing to add here
				return viewNode;
			},
			draw_mediatorNode : function draw_mediatorNode(viewNode, paper){

			},
			drawEdge : function drawEdge(c){ // c - coords
				var size = 4;
				return view.paper.arrow(c.x1, c.y1, c.x2, c.y2, size);
			},
			addTooltips : function addTooltips(visualizedNode){
				function close(){
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
				).mouseout(function(){
					view.tooltip.close();					
				});
			}
		};

		outputObject.extendVisualisation("StreamingWorkflowEngine", outputObject.draw_serviceNode);
		outputObject.extendVisualisation("Mediator", outputObject.draw_serviceNode);
		outputObject.extendVisualisation("JavaService", outputObject.draw_serviceNode);
		outputObject.extendVisualisation("EmulationService", outputObject.draw_serviceNode);

		return outputObject;
	};