function nodeVisualizator(view){
		var c = -1;
		var outputObject = {
			getBlankNode : function getBlankNode(x, y){
				c++;
				// alert(c);
				// a(x || 10+55*c);
				// a(y || 10+35*c);
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
					x : x || 10+55*c, //
					y : y || 10+35*c, //
					r : CFG.nodeDefaults.defaultRarius,
					width : CFG.nodeDefaults.defaultWidth,
					height : CFG.nodeDefaults.defaultHeight,
					scale : CFG.nodeDefaults.defaultScale,
					highlighted : false,
					menu : null,
					prepareToDrag : function prepareToDrag(){
						this.hideNode();
						this.mainShape.show().toFront();
						if(CFG.actions.showLabelDuringNodeDrag)
							this.raph_label.show().toFront();
					},
					returnFromDragging : function returnFromDragging(transX, transY){
						transX = transX || 0;
						transY = transY || 0;

						// if(transX != 0 || transY != 0){
							this.x += transX;
							this.y += transY;

							this.clearIO();
							this.drawIO(view.paper); // 

							$.each(this.set, function(i, v){
								if(i>1 || i==1 && !CFG.actions.showLabelDuringNodeDrag)
									v.translate(transX, transY).toFront();
									if(v._.transform && v._.transform.length > 1){
										v._.transform[0][1] += transX;
										v._.transform[0][2] += transY;
										v._.transform.pop();
									}
							});
							$.each(this.connectors, function(i, v){
								v.translate(transX, transY).toFront();
								// v.attr("cx", v.attr("cx") + transX).toFront();
								// v.attr("cy", v.attr("cy") + transY).toFront();
								if(v._.transform && v._.transform.length > 1){
									v._.transform[0][1] += transX;
									v._.transform[0][2] += transY;
									v._.transform.pop();
								}
							});
						// }
						
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
						var strokeColor = (this.highlighted ? CFG.colors.highlightStroke : CFG.colors.normalStroke),
							isCFMode = ( gui.view.mode === "CF" ),
							length = this.inputs.length, x, y, that = this, nx, move;

						// alert(isCFMode);
						if(this.mainShape.node.nodeName === "circle"){
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
								move = gui.view.dragDFArrow(this.outputs[i].node, this).map();
							}
						} else if(this.mainShape.node.nodeName === "path"){
							var mult = 1/1.41,
								j = 0;
								s = CFG.nodeDefaults.conditionSize, 
								nx = this.x-5,
								ny = this.y+15,
								coordsList = [
								[nx-s, ny], [nx+s, ny], [nx, ny+s], [nx, ny-s],
								[nx+s, ny+s], [nx+s, ny-s],
								[nx-s, ny+s], [nx-s, ny-s]];
							length = this.inputs.length;
							for(var i = 0; i < length; i++){
								if(i<8){ x = coordsList[i][0]; y = coordsList[i][1]; }
								else{ x = coordsList[i%8][0]; y = coordsList[i%8][1]; } 
								move = this.dragIO(i, "in");
								this.inputs[i].node = paper.path(this.inputPathString(x, y)).attr({'fill': this.color, stroke: strokeColor});
								this.inputs[i].node.drag(move.move, move.start, move.end);
								j = i+1;
							}
							length = this.outputs.length;
							for(var i = 0; i < length; i++){
								if(j<8){ x = coordsList[j][0]; y = coordsList[j][1]; }
								else{ x = coordsList[j%8][0]; y = coordsList[j%8][1]; } 
								this.outputs[i].node = paper.path(this.outputPathString(x, y)).attr({'fill': this.color, stroke: strokeColor});
								j+=i;
							}
						} else {
							var spacing = this.width/(length+1);
							for(var i = 0; i < length; i++){
								x = this.x + (i+1)*spacing; y = this.y-10;
								this.inputs[i].node = paper.path(this.inputPathString(x, y)).attr({'fill': this.color, stroke: strokeColor});
								if(!forRepo){
									move = this.dragIO(i, "in");
									this.inputs[i].node.drag(move.move, move.start, move.end);
									this.inputs[i].node.node.setAttribute("class", this.id+" input " + this.inputs[i].id);
								}
							}
							length = this.outputs.length; spacing = this.width/(length+1);
							for(var i = 0; i < length; i++){
								x = this.x + (i+1)*spacing; y = this.y+this.height;
								this.outputs[i].node = paper.path(this.outputPathString(x, y)).attr({'fill': this.color, stroke: strokeColor});
								if(!forRepo){
									move = this.dragIO(i, "out");
									this.outputs[i].node.drag(move.move, move.start, move.end);
									this.outputs[i].node.node.setAttribute("class", this.id+" output " + this.outputs[i].id);
								}
							}
						}
						this.addInputTooltips();
						this.addOutputTooltips();
						// if(!forRepo)
						// 	$.each(this.set, function(){this.toFront()});
						if(isCFMode) {
							$.each(this.outputs, function(){this.node.hide()});
							$.each(this.inputs, function(){this.node.hide()});
						}
					},
					dragIO: function dragIO(i, flag, paper){
						var index = i,
							kunwa = paper || gui.view.paper,
							obj = (flag==="in") ? this.inputs[i].node : this.outputs[i].node,
							mov = this.moveIO(i, flag),
							arrDrag = gui.view.dragDFArrow(obj, this),
							funM, funS, funE,
							ctrlPressed = false;
							result = {
								start: function start(x, y, evt){
									if(evt.ctrlKey){
										ctrlPressed = true;
										funS = mov.start.bind(this, kunwa);
									}
									else {
										funS = arrDrag.start.bind(this, x, y, evt);
									}
									funS();
								},
								move: function move(dx, dy, x, y, event){
									if(ctrlPressed){
										funM = mov.move.bind(this, dx);
									}
									else{
										funM = arrDrag.move.bind(this, dx, dy, x, y, event);
									}
									funM();
								},
								end: function end(event){
									if(ctrlPressed){
										funE = mov.end.bind(this, event);
									}
									else{
										funE = arrDrag.stop.bind(this, event);
									}
									funE();
									ctrlPressed = false;
								}
						};
						return result;
					},
					moveIO: function moveIO(i, flag){
						var index = i,
							that = this,
							kunwa,
							array, otherObject, otherIndex,
							img, x1, y1, x2, dist, center, glow1, glow2,
							obj1, obj2,
							result = {
								start: function start(paper){
									if(flag=="in") array = that.inputs;
									else array = that.outputs;
									kunwa = paper;
									var bbox = this.getBBox();
									x1 = bbox.x; y1 = bbox.y;
								},
								move: function move(dx){
									if(glow2) glow2.remove();
									if(img) img.remove();
									if(array[index-1] || array[index+1]){
										if(!glow1) glow1 = this.glow({'color': CFG.io.highlightColor});
										if(dx < 0){
											if(array[index-1]){ 	
												otherIndex = index-1;
												x2 = array[otherIndex].node.getBBox().x;	
												dist = x2 - x1;			
												if(dx < dist/3){	
													otherObject = array[otherIndex];	
													if(flag==="in") center = x2+((x1-x2)/2)-4; 
													else center = x2+((x1-x2)/2)-4;
													img = kunwa.image(CFG.io.swapImg, center, y1-15, 16, 16);
													glow2 = otherObject.node.glow({'color': CFG.io.highlightColor});
												}
											}
											else{
												otherObject = undefined;
												if(glow2) glow2.remove();
											}
										}
										if(dx >=0){
											if(array[index+1]){
												otherIndex = index + 1;
												x2 = array[otherIndex].node.getBBox().x;
												dist = x2 - x1;
												if(dx > dist/3){
													otherObject = array[otherIndex];
													if(flag==="in") center = x2+((x1-x2)/2)-4;
													else center = x2+((x1-x2)/2)-4;
													img = kunwa.image(CFG.io.swapImg, center, y1-15, 16, 16);
													glow2 = otherObject.node.glow({'color': CFG.io.highlightColor});
												}
											}
											else{
												otherObject = undefined;
												if(glow2) glow2.remove();
											}
										}
									}
								},
								end: function end(){
									if(glow1) glow1.remove(); 
									if(otherObject){
										gui.view.hideEdges();
										if(flag==="in"){
											obj1 = kunwa.path(that.inputPathString(x1, y1)).attr({'fill': that.color});
											obj2 = kunwa.path(that.inputPathString(x2, y1)).attr({'fill': that.color});
										}
										else{
											obj1 = kunwa.path(that.outputPathString(x1, y1)).attr({'fill': that.color});
											obj2 = kunwa.path(that.outputPathString(x2, y1)).attr({'fill': that.color});	
										}
										array[index].node.remove();
										array[otherIndex].node.remove();
										obj1.animate({transform:"t"+(x2-x1)+",0"}, 250);
										obj2.animate({transform:"t"+(x1-x2)+",0"}, 250);
										setTimeout(function(){
											obj1.remove(); obj2.remove();
											array[otherIndex] = array[index];
											array[index] = otherObject;
											that.clearIO(); that.drawIO(kunwa);
											gui.view.updateEdges();										
										}, 250);
										img.remove(); glow2.remove();
									}
								}
						};
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
						// this.buildMenu();
						// console.log(this.set.length, "set");
						// console.log(this.inputs.length, "inputs");
						// console.log(this.outputs.length, "outputs");
						// console.log(this.connectors.length, "connectors");

						$.each(this.set, function(){
							this.show();
							// console.log(this.getBBox().x, this.getBBox().y);
						});

						if( gui.view.mode === "CF" ){
							$.each(this.connectors, function(){
								this.show();
							});
						} else {
							$.each(this.inputs, function(){
								this.node.show();
							});
							$.each(this.outputs, function(){
								this.node.show();
							});
						}
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

				// console.log(x, y, blankNode.x, blankNode.y)
				return blankNode;
			},
			resetCounter : function resetCounter(){
				c = -1;
			},
			extendVisualisation : function extendVisualisation(type, fun){
				this["draw_"+type.toLowerCase()+"Node"] = fun;
			},
			draw_unknownNode : function draw_unknownNode(node){
			},
			prepareData : function prepareData(dataNode, viewNode){
				// console.log("-----", dataNode.nodeId, dataNode, viewNode);
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
			assumeColor : function assumeColor(nodeType, viewNode, controlType){
				console.log(controlType, nodeType, "--------------")
				if(nodeType == "control"){
					if(controlType == "#conditionstart")
						viewNode.color = CFG.colors.conditionStart;
					else if(controlType == "#conditionend")
						viewNode.color = CFG.colors.conditionEnd;
					else if(controlType == "#start")
						viewNode.color = CFG.colors.start;
					else if(controlType == "#end")
						viewNode.color = CFG.colors.stop;
				}
				else if ( nodeType == "emulationservice")
					viewNode.color = CFG.colors.emulationService;
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
				// console.log(dataNode);
				var viewNode = this.getBlankNode(x, y);
				var nodeType = dataNode.nodeType.toLowerCase();
				var controlType = dataNode.controlType ? dataNode.controlType.toLowerCase() : "";

				this.prepareData( dataNode, viewNode );
				this.assumeColor(nodeType, viewNode, controlType);
				// console.log(viewNode.id, viewNode.color, nodeType);
				if ( nodeType == "control" ){
					this.draw_controlNode(viewNode);

					// if(viewNode.isStart)
					// 	view.dragCFArrow( viewNode.mainShape, viewNode );

				} else {
					this.draw_rectNode(viewNode);
					viewNode.drawConnectors();
					view.dragCFArrow( viewNode.connectors, viewNode );
					var fun = ( this["draw_"+nodeType+"Node"] || this.draw_unknownNode );
					// console.log("draw_"+nodeType+"Node", this["draw_"+nodeType+"Node"], fun);
					fun(viewNode); // tutaj rysowane są atrybuty do danego typu
				}

				viewNode.drawIO(view.paper);
				this.addTooltips( viewNode );
				view.dragNodes( viewNode.raph_label, viewNode );

				return viewNode;
			},
			draw_controlNode : function draw_controlNode(node){
				var size = CFG.nodeDefaults.conditionSize,
					offsetY = 5,
					isCondition = (node.controlType.toLowerCase() === "#conditionstart" || node.controlType.toLowerCase() === "#conditionend"),
					mainShape,
					label
				;
				if( isCondition ){
					node.x = node.x + CFG.nodeDefaults.defaultWidth / 2 + size/2;
					node.width = node.height = size;
					if( node.controlType === "#conditionStart" ) {
						mainShape = view.paper.path("M "+node.x+" "+node.y+" l "+size+" "+size+" l -"+size+" "+size+" l -"+size+" -"+size+" z").attr({"fill": CFG.colors.conditionStart});
					} else if( node.controlType == "#conditionEnd" ) {
						mainShape = view.paper.path("M "+node.x+" "+node.y+" l "+size+" "+size+" l -"+size+" "+size+" l -"+size+" -"+size+" l "+size+" -"+size+" M "+(node.x - size*.5)+" "+(node.y + size*1.5)+" l "+(size)+" -"+size).attr({"fill": CFG.colors.conditionEnd});
					}
				} else {
					node.x = node.x + CFG.nodeDefaults.defaultWidth / 2 + node.r/2;
					node.width = node.height = CFG.nodeDefaults.defaultRarius;
					node.isStart = ( node.controlType && node.controlType.toLowerCase() == "#start" );
					node.y = node.y + CFG.nodeDefaults.defaultRarius;
					offsetY = 20;
					node.width = node.height = node.r;
					mainShape = view.paper.circle(node.x, node.y, node.r).attr({fill: node.color, stroke: CFG.colors.normalStroke});
				} 

				node.getPossiblePositionsOfConnectors = function getPossiblePositionsOfConnectors(){

					return [[this.x, ( isCondition ? this.y + CFG.nodeDefaults.conditionSize : this.y )]];
				},

				label = view.paper.text(node.x, node.y-offsetY, node.label);

				mainShape.node.setAttribute("class", node.id);
				if( node.isStartNode )
					mainShape.attr({cursor: "crosshair"});
				
				label.node.removeAttribute("style");
				label.node.removeAttribute("text");
				label.node.setAttribute("class", node.id + " label");

				node.mainShape = mainShape;
				node.raph_label = label;
				node.raph_label.dblclick(function(){
					gui.controller.reactOnEvent("EditNode", {nodeId: node.id});
				});

				node.set.push(mainShape, label);
				
				// node.isInside = function(x1,y1,x2,y2){
				// 	return this.x+this.r > x1 &&
				// 			this.y+this.r > y1 &&
				// 			this.x-this.r < x2 &&
				// 			this.y-this.r < y2
				// 			;
				// }
				// node.getPossiblePositionsOfConnectors = function(){
				// 	return [[this.x, this.y]];
				// }
				// node.switchToCFMode = function switchToCFMode(){
				// 	$.each(this.inputs, this.hide);
				// 	$.each(this.outputs, this.hide);
				// 	// $.each(this.connectors, this.show);
				// 	if(node.isStart)
				// 		this.mainShape.attr({cursor: "crosshair"})
				// },
				// node.switchToDFMode = function switchToDFMode(){
				// 	$.each(this.inputs, this.show);
				// 	$.each(this.outputs, this.show);
				// 	// $.each(this.connectors, this.hide);
				// 	if(node.isStart)
				// 		this.mainShape.attr({cursor: "default"})
				// }
				// ;

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
				var paper = paper || view.paper;

				var img_db = paper.image("images/db.jpg", viewNode.x + 5, viewNode.y+8, 20, 20).attr("title", "Data Base");
				img_db.node.setAttribute("class", viewNode.id+" database");

				viewNode.set.push( img_db );
			},
			drawEdge : function drawEdge(c){ // c - coords
				var size = 4;
				return view.paper.arrow(c.x1, c.y1, c.x2, c.y2, size);
			},
			addTooltips : function addTooltips(visualizedNode){
				function close(){
				}
				// te funkcje wywołują się podczas dodawania IO, nie ma ich tutaj sensu powtarzać
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

		// outputObject.extendVisualisation("Mediator", outputObject.draw_serviceNode);
		outputObject.extendVisualisation("StreamingWorkflowEngine", outputObject.draw_serviceNode);
		outputObject.extendVisualisation("JavaService", outputObject.draw_serviceNode);
		outputObject.extendVisualisation("EmulationService", outputObject.draw_serviceNode);

		return outputObject;
	};