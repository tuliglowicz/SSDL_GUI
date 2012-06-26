"use strict";
var c = -1;
var rozmieszczenie = [247, 33, 247, 234, 174, 77, 175, 147];
function View(id, width, height, gui){
	var pf = gui.id_postfix;		
	
	function preloader(divId){
		var $divElem = $("#"+divId+"_"+pf),
			position = $divElem.offset(),
			top = parseInt(position.top),
			left = parseInt(position.left),
			width = parseInt($divElem.width()+2),
			height = parseInt($divElem.height()),
			imgTop = parseInt(height/2-6),
			imgLeft = parseInt(width/2-55),
			temp = {
				top: top,
				left: left,
				width: width,
				height: height,
				imgTop: imgTop,
				imgLeft: imgLeft,
				$preloader: undefined,

				cover: function cover(){
					this.$preloader.show();
				},
				uncover: function uncover(){
					this.$preloader.hide();
				},
				init: function init(){
					var newDiv = "<div id=\"preloader_" + pf 
						+ "\" style=\" position:absolute; top:" + this.top + "px; left:" 
						+ this.left + "px; width:" + this.width + "px; height:"+ this.height 
						+ "px; background-color: black; opacity: .5; z-index: 5\">" 
						+ "<img src=\"preloader.gif\" style=\" position:relative; top:" 
						+ this.imgTop + "px; left:" + this.imgLeft + "px\"></img></div>";

					$divElem.parent().prepend(newDiv);
					this.$preloader = $("#preloader_"+pf);
				}
		};

		temp.init();
		return temp;
	}

	function blankNode(paper, mainCanvas, visualiser){
		var tmp = {
			name: "blankNode",
			version: "1.0",
			author: "Author",
			dataType: 'json',
			data: null,
			minCanvas: undefined,
			globalEvents: ["load"],
			localEvents: ["select"],
			
			draw: function draw(){
				var clone, newRect, newCirc;
				var nodeLength = 135,
					nodeHeight = 35,
					nodeHorizontalPosition = paper.width/2 - nodeLength/2, 
					textHorizontalPosition = paper.width/2,
					move, start, stop, x2, fillColor,
					nodeType, blankNode;
				
				paper.text(textHorizontalPosition,10,"Start/Stop")
					.node.setAttribute("class","repository_text");
				var repo_circle = paper.circle(textHorizontalPosition,35,15)
					.attr({"opacity": "1", "fill":"white"});
				repo_circle.node.setAttribute("class","repository_element");
				paper.text(textHorizontalPosition,70,"Service")
					.node.setAttribute("class","repository_text");
				var repo_service = paper.rect(nodeHorizontalPosition,80,nodeLength,nodeHeight,5)
					.attr({fill:"#fbec88"});
				repo_service.node.setAttribute("class","repository_element");
				paper.text(textHorizontalPosition,140,"Functionality")
					.node.setAttribute("class","repository_text");
				var repo_functionality = paper.rect(nodeHorizontalPosition,150,nodeLength,nodeHeight,5)
					.attr({fill:"#a6c9e2"});
				repo_functionality.node.setAttribute("class","repository_element");
				paper.text(textHorizontalPosition,210,"Mediator")
					.node.setAttribute("class","repository_text");
				var repo_mediator = paper.rect(nodeHorizontalPosition,220,nodeLength,nodeHeight,5)
					.attr({fill:"white"});
				repo_mediator.node.setAttribute("class","repository_element");
				
				move = function move(dx,dy){
					if(clone.attr("x")){
						clone.attr({x:this.ox + dx, y:this.oy+dy});
						newRect.attr({x:newRect.ox + dx, y:newRect.oy + dy});	
						if((clone.attr("x") + nodeLength) > paper.width) 
							newRect.attr({opacity:1});
						else newRect.attr({opacity:0});
					}
					else if(clone.attr("cx")){
						clone.attr({cx:this.ox + dx, cy:this.oy+dy});
						newCirc.attr({cx:newCirc.ox + dx, cy:newCirc.oy + dy});
						if((clone.attr("cx") + clone.attr("r")) > paper.width) 
							newCirc.attr({opacity:1});
						else newCirc.attr({opacity:0});
					}
				};
				start = function start(x,y,evt){
					clone = this.clone();
					fillColor = clone.attr("fill");
					if(this.attr("x")){
						if(this === repo_functionality) nodeType = "functionality";
						else if(this === repo_service) nodeType = "service";
						else if(this === repo_mediator) nodeType = "mediator";
						this.ox = this.attr("x");
						this.oy = this.attr("y");
						x2 = paper.width - clone.attr("x");
						newRect = mainCanvas.rect(-1*x2, clone.attr("y"), nodeLength, nodeHeight, 5).attr({fill:fillColor});
						newRect.ox = newRect.attr("x");
						newRect.oy = newRect.attr("y");
					}
					else if(this.attr("cx")){
						nodeType = "control";
						this.ox = this.attr("cx");
						this.oy = this.attr("cy");
						x2 = paper.width - clone.attr("cx");
						newCirc = mainCanvas.circle(-1*x2, clone.attr("cy"), clone.attr("r")).attr({fill:fillColor});
						newCirc.ox = newCirc.attr("cx");
						newCirc.oy = newCirc.attr("cy");
					}
				};
				stop = function stop(x,y,evt){
					clone.remove();
					if(newRect && newRect.attr("opacity")>0){
						// stworz nowy blank node
						blankNode = visualiser.getBlankNode();
						// zmien typ na odpowiedni
						blankNode.type = nodeType;
						// wywołaj funkcję draw_odpowiednityp(node)
						//(visualiser["draw_"+nodeType+"Node"] || visualiser.draw_unknownNode )(blankNode)
						// otworz formularz edycji bloczka
						// jesli walidacja puszcz, to zapisz:
						// 		widok boczka do gui.view.graph_view.nodes
						//		dane bloczka do gui.controler.graphData
						//		gui.view.graph_view.nodes.push(newRect);			
					}
				};

				repo_service.drag(move, start, stop);
				repo_functionality.drag(move, start, stop);
				repo_mediator.drag(move, start, stop);
				repo_circle.drag(move, start, stop);
			}
		}

		tmp.draw();
		
		return tmp;
	}

	function drawBottomBar(paper){
		//		addElem: function (){ ... }		// tutaj chodzi o możliwość dodania czegoś...
		//		removeElem: function (){ ... }	// 

		var top = (paper.height*.95 >= 250) ? paper.height*.95 : 250,
			left = 0,
			width = paper.width,
			height = paper.height*.15,

			offset = 20,
			visible = .2,
			invisible = .01,
			result = {
				top: top,
				left: left,
				width: width,
				height: height,

				offset: offset,
				visible: visible,
				invisible: invisible,
				animationTime: 200,
				set: [],

				pathString: function pathString(x, y){
					return("M " + x + " " + y + " l 20 0 l -10 -10 z");
				},
				createBar: function createBar(x, y, width, height){
					var that = this,
						bar = paper.rect(x, y, width, height).
					attr({fill:"grey", opacity: this.invisible}).
					mouseover(function(){
						bar.animate({y: paper.height*.85, opacity: visible},that.animationTime);
						that.triangle1.animate({opacity: invisible}, that.animationTime);
						that.triangle2.animate({opacity: invisible}, that.animationTime);
						that.button1.animate({opacity: visible}, that.animationTime);
						that.button2.animate({opacity: visible}, that.animationTime);
						that.click = true;
					}).
					mouseout(function(){
						bar.animate({y: paper.height*.95, opacity: invisible}, that.animationTime);
						that.triangle1.animate({opacity: visible}, that.animationTime);
						that.triangle2.animate({opacity: visible}, that.animationTime);
						that.button1.animate({opacity: invisible}, that.animationTime);
						that.button2.animate({opacity: invisible}, that.animationTime);
					});
					return bar;
				},
				createTriangle: function createTriangle(path){
					var tr = paper.path(path);
					tr.attr({fill:"grey", opacity: visible});
					return tr;
				},
				createButton: function createButton(text, mult){
					var temp1 = paper.rect(parseInt(width/2+(70*mult)), paper.height*.87, 60, 40, 5)
						.attr({fill:"ivory", opacity:invisible});
					temp1.mouseover(function(){
						if( true) temp1.glow({color:"#fbec88", opacity:visible, size:5});
					});
					temp1.mouseout(function(){
						temp1.glow.remove();
					});
					var temp2 = paper.text(temp1.attr("x")+30, temp1.attr("y")+20, text)
						.attr({"font-size":40, "stroke-width":"4", "stroke-linejoin":"round", "stroke-linecap":"butt", stroke:"gray", fill:"ivory", opacity:invisible});
					var set = paper.set();
					set.push(temp1, temp2);
					return set;
				},
				addElement: function addElement(element){
					// this.set.push(element);
				},
				removeElement: function removeElement(element){
					//TODO
				}
			};

		result.triangle1 = result.createTriangle(
			result.pathString(
				parseInt(left+offset),
				parseInt(top+offset)
			)
		);
		result.triangle2 = result.createTriangle(
			result.pathString(
				parseInt(width-2*offset),
				parseInt(top+offset)
			)
		);
		//chwilowa partyzantka
		result.button1 = result.createButton("CF", -1).click(function(){alert("KLIKŁEŚ CF");});
		result.button2 = result.createButton("DF", 1).click(function(){alert("KLIKŁEŚ DF");});
		result.invisibleBar = result.createBar(left, top, width, height);
		result.set.push(result.invisibleBar, result.triangle1, result.triangle2);

		return result;
	};

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
					mainShape: undefined,
					inputs : [],
					outputs : [],
					connectors : [],
					x : rozmieszczenie[2*c] || 10+55*c,
					y : rozmieszczenie[2*c+1] || 10+35*c,
					r : 15,
					width : 145,
					height : 35,
					scale : 100,
					highlighted : false,
					highlightColor : "orange",
					normalColor : "black",
					show : function show(i, v){
						(v.node.animate ? v.node : v).myShow(250);
					},
					hide : function hide(i, v){
						(v.node.animate ? v.node : v).myHide(250);
					},
					switchMode : function switchMode(newMode){
						switch(newMode){
							case "CF" : this.switchToCFMode(); break;
							case "DF" : this.switchToDFMode(); break;
							case "H" : this.switchToHybrydMode(); break;
						}
					},
					switchToCFMode : function switchToCFMode(){
						$.each(this.inputs, this.hide);
						$.each(this.outputs, this.hide);
						$.each(this.connectors, this.show);
					},
					switchToDFMode : function switchToDFMode(){
						$.each(this.inputs, this.show);
						$.each(this.outputs, this.show);
						$.each(this.connectors, this.hide);
					},
					switchToHybrydMode : function switchToHybrydMode(){
					},
					// {"class":"VideoSensor","id":"VideoSensor","label":"VideoSensor","dataType":"Sensor","properties":"","source":["CCTVStartMonitoring","VideoSensor"]}
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
					setBold : function setBold(flag){
						if(flag)
							this.set[0].attr("stroke-width", "2px");
						else
							this.set[0].attr("stroke-width", "1px");
					},
					highlight : function highlight(ctrl){
						console.trace();
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
						return "SSDLNode Object";
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
					}
				}
				
				return blankNode;
			},
			extendVisualisation : function extendVisualisation(type, fun){
				this["draw_"+type.toLowerCase()+"Node"] = fun;
			},
			draw_unknownNode : function draw_unknownNode(node){
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
				var c = view.paper.circle(node.x, node.y, node.r).attr({fill: "white"}),
					label = view.paper.text(node.x, node.y-20, node.id).attr("fill", "#333"),
					input_length, output_length, i_tab = [], o_tab = [],
					multX = 1, multY = 1, x1, y1, x2, y2
					;
				node.mainShape = c;

				input_length = node.inputs.length;
				output_length = node.outputs.length;

				//obliczanie punktÃ³w na okrÄ™gu
				x1 = (node.x+node.r) - 10;
				y1 = Math.sqrt(Math.abs(node.r*node.r - (x1 - node.x)*(x1 - node.x) - (node.y*node.y - 2*node.y)));
				x2 = Math.abs(x1-node.x); y2 = Math.abs(y1-node.y);
				// alert(node.x + ":" + node.y + ":" + x1 + ":" + y1 + ":" + x2 + ":" + y2)

				var currIO;
				for(var k = 0; k < input_length; k++){
					currIO = node.inputs[k];
					if(k < 4){
						multX = ((k % 2) === 0) ? 1 : -1;
						multY = (k < 2) ? 1 : -1;
						currIO.node = view.paper.path("M " + parseInt(node.x+(x2*multX)+((multX>0) ? 7+k : -15-k)) + " " + parseInt(node.y+(y2*multY)) + " l 0 10 l 10 0 l 0 -10 l -5 5 z").attr({'fill':"white"});
						currIO.node.node.setAttribute("class", node.id+" input "+currIO.id);
					}
					else{
						multX = ((k % 2) === 0) ? 1 : -1;
						multY = (k < 6) ? 1 : -1;
						currIO.node = view.paper.path("M " + parseInt(node.x+(y2*multX)+((multX>0) ? 7+k : -15-k)) + " " + parseInt(node.y+(x2*multY)) + " l 0 10 l 10 0 l 0 -10 l -5 5 z").attr({'fill':"white"});
						currIO.node.node.setAttribute("class", node.id+" input "+currIO.id);
					}
				}
				multX = 1; multY = 1;
				for(var l = 0; l < output_length; l++){
					currIO = node.outputs[l];
					if(l < 4){
						multX = ((l % 2) === 0) ? 1 : -1;
						multY = (l < 2) ? 1 : -1;
						currIO.node = view.paper.path("M " + parseInt(node.x+(x2*multX)+((multX>0) ? 7+l : -15-l)) + " " + parseInt(node.y+(y2*multY)) + " l 10 0 l 0 -5 l -5 -5 l -5 5 z").attr({'fill':"white"});
						currIO.node.node.setAttribute("class", node.id+" output "+currIO.id);
					}
					else{
						multX = ((l % 2) === 0) ? 1 : -1;
						multY = (l < 6) ? 1 : -1;
						currIO.node = view.paper.path("M " + parseInt(node.x+(y2*multX)+((multX>0) ? 7+l : -15-l)) + " " + parseInt(node.y+(x2*multY)) + " l 10 0 l 0 -5 l -5 -5 l -5 5 z").attr({fill: "white"});
						currIO.node.node.setAttribute("class", node.id+" output "+currIO.id);
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
					this.mainShape.attr({cursor: "default"})
				}
				;

				node.set.push(c, label);

				view.dragNodes(label, node);
				view.dragCFArrow(c, node);

				// view.dragDFArrow(node.inputs.map(function(i){ return i.node; }), node);
				view.dragDFArrow(node.outputs.map(function(o){ return o.node; }), node);

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
					i, j, k, l,
					input_length, output_length,
					iDist, oDist,
					serviceName = node.serviceName,
					maxLength = 25,
					shortenServiceName = serviceName.length > maxLength ? serviceName.substring(0, maxLength-3)+"..." : serviceName,
					serviceNameShown = view.paper.text(node.x+node.width/2, node.y + 25, shortenServiceName);
					;
				node.mainShape = rect;

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
					node.inputs[k].node = view.paper.path("M " + parseInt(node.x+(k+1)*iDist) + " " + parseInt(node.y-10) + " l 0 10 l 10 0 l 0 -10 l -5 5 z").attr({'fill':"#fbec88"});
					node.inputs[k].node.node.setAttribute("class", node.id+" input" + node.inputs[k].id);
				}
				for(var l = 0; l < output_length; l++){
					node.outputs[l].node = view.paper.path("M " + parseInt(node.x+(l+1)*oDist) + " " + parseInt(node.y+node.height) + " l 0 5 l 5 5 l 5 -5 l 0 -5 z").attr({'fill':"#fbec88"});
					node.outputs[l].node.node.setAttribute("class", node.id+" output " + node.outputs[l].id);
				}

				node.connectors.push(c1, c2, c3, c4);
				for(i=0, j=node.connectors.length; i<j; i++)
					node.connectors[i].node.setAttribute("class", id+" connector");
				
				node.set.push(rect, label, img_gear);
				node.set.push(serviceNameShown);

				view.dragNodes(label, node);
				view.dragCFArrow(node.connectors, node);

				// view.dragDFArrow(node.inputs.map(function(i){ return i.node; }), node);
				view.dragDFArrow(node.outputs.map(function(o){ return o.node; }), node);
				
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
					input_length, output_length,
					i, j=0,
					iDist, oDist
					;
				node.mainShape = rect;

				input_length = node.inputs.length;
				output_length = node.outputs.length;

				iDist = node.width/(input_length+1);
				oDist = node.width/(output_length+1);

				for(var k = 0; k < input_length; k++){
					node.inputs[k].node = view.paper.path("M " + parseInt(node.x+(k+1)*iDist) + " " + parseInt(node.y-10) + " l 0 10 l 10 0 l 0 -10 l -5 5 z").attr({'fill':"#a6c9e2"});
					node.inputs[k].node.node.setAttribute("class", node.id+" input " + node.inputs[k].id);
				}
				for(var l = 0; l < output_length; l++){
					node.outputs[l].node = view.paper.path("M " + parseInt(node.x+(l+1)*oDist) + " " + parseInt(node.y+node.height) + " l 0 5 l 5 5 l 5 -5 l 0 -5 z").attr({'fill':"#a6c9e2"});
					node.outputs[l].node.node.setAttribute("class", node.id+" output " + node.outputs[l].id);
				}

				img_gear.node.setAttribute("class", id+" gear");
				
				rect.node.setAttribute("class", name);
				
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
				view.dragDFArrow(node.outputs.map(function(o){ return o.node; }), node);

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
		mode : "CF",
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
		switchMode : function switchMode(mode){
			$.each(this.graph_view.nodes, function(){
				this.switchMode(mode);
			});

			$.each(this.graph_view.edgesCF, function(){
				this.switchMode(mode);
			});
			$.each(this.graph_view.edgesDF, function(){
				this.switchMode(mode);
			});
			this.mode = mode;
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
		dragCFArrow : function dragArrow(element, node){
			var arrow,
				cx,
				cy,
				ofsetX,
				ofsetY,
				sourceNode,
				bbox,
				start = function start(){
					if(gui.view.mode === "CF"){
						var canvas = $(gui.view.paper.canvas);
						ofsetX = parseInt(canvas.offset().left) + parseInt(canvas.css("border-top-width"));
						ofsetY = parseInt(canvas.offset().top) + parseInt(canvas.css("border-left-width"));
						bbox = this.getBBox();
						cx = (bbox.x + bbox.x2) / 2;
						cy = (bbox.y + bbox.y2) / 2;
						sourceNode = gui.view.getNodeById(this.node.classList[0]);

						arrow = gui.view.paper.arrow(cx, cy, cx, cy, 4);
					}
				},
				move = function(a, b, c, d, event){
					if(gui.view.mode === "CF"){
						// todo awizowanie arrow po najechaniu na node
						try {
							arrow[0].remove();
							arrow[1].remove();
						} catch(e){
							console.log(e);
						}
						
						arrow = gui.view.paper.arrow(cx, cy, event.clientX-ofsetX + window.scrollX, event.clientY - ofsetY + window.scrollY, 4);
					}
				},
				stop = function(event){
					if(gui.view.mode === "CF"){
						try {
							arrow[0].remove();
							arrow[1].remove();
						} catch(e){
							console.log(e);
						}

						var targetNode = gui.view.getNodesInsideRect(event.clientX-ofsetX, event.clientY-ofsetY);
						if(targetNode && sourceNode && targetNode.id !== sourceNode.id)
							gui.controler.reactOnEvent("AddCFEdge", {
							 	source: sourceNode,
							 	target: targetNode,
							 	CF_or_DF: "CF"
							 	// type: 
							})
					}
				}
				;

				// alert(element+":"+element.getType())
			if(element.getType() === "Array"){
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
				ofsetX,
				ofsetY,
				sourceNode,
				targetId,
				output,
				bbox,
				glows = [],
				paper = gui.view.paper,
				canvas = $(paper.canvas),
				start = function start(){
					ofsetX = parseInt(canvas.offset().left) + parseInt(canvas.css("border-top-width"));
					ofsetY = parseInt(canvas.offset().top) + parseInt(canvas.css("border-left-width"));
					bbox = this.getBBox();
					cx = (bbox.x + bbox.x2) / 2;
					cy = (bbox.y + bbox.y2) / 2;
					sourceNode = outputView.getNodeById(this.node.classList[0]);
					output = sourceNode.getOutputById(this.node.classList[2]);

					$.each(gui.view.graph_view.nodes, function(i, v){
						$.each(v.inputs, function(){
							if(output && this.dataType === output.dataType && !gui.view.isInputConnected(v.id, this.id)){
								glows.push( this.node.glow({color: "red"}) );
							}
						});						
					});

					arrow = paper.arrow(cx, cy, cx, cy, 4);
				},
				move = function move(a, b, c, d, event){
					// todo awizowanie arrow po najechaniu na node
					try {
						arrow[0].remove();
						arrow[1].remove();
					} catch(e){
						// console.log(e);
					}
					arrow = paper.arrow(cx, cy, event.clientX-ofsetX + window.scrollX, event.clientY - ofsetY + window.scrollY, 4);
				},
				stop = function stop(event){
					try {
						arrow[0].remove();
						arrow[1].remove();
					} catch(e){
						// console.log(e);
					}

					var resultObj = gui.view.getInputByPosition(event.clientX-ofsetX, event.clientY-ofsetY);
					if( output && sourceNode && resultObj && !gui.view.isInputConnected(resultObj.targetId, resultObj.targetId) ){
						if(resultObj.input.dataType === output.dataType){
							gui.controler.reactOnEvent("AddDFEdge", {
							 	sourceId: sourceNode.id,
							 	targetId: resultObj.targetId,
							 	input: resultObj.input,
							 	output: output,
							 	CF_or_DF: "DF"
							});
						} else {
							gui.controler.reactOnEvent("Error", {msg: "You tried to make connection between input and output od different data types"})
						}
					} else {
					}
					$.each(glows, function(){
						this.remove();
					})
				}
				;

				// alert(element+":"+element.getType())
			if(element.getType() === "Array"){
				$.each(element, function(){
					// alert(this +":"+ this.getType());
					// console.log( this );
					this.drag(move, start, stop);
				})
			} else
				element.drag(move, start, stop);
		},
		addCFEdge : function addCFEdge(data){
			var foundedEdge = this.getCFEdge(data.source.id, data.target.id);
			if(foundedEdge){
				gui.controler.reactOnEvent(""); //err msg
			}
			else {
				var edgeObject = {
					arrow : undefined,
					source : data.source,
					target : data.target,
					view : this,
					type: "CF",
					toString : function toString(){ return "ssdl_CFEdge Object";},
					hide: function hide(){
						this.arrow[0].hide();
						this.arrow[1].hide();
					},
					show: function show(){
						this.arrow[0].myShow(300);
						this.arrow[1].myShow(300);
					},
					switchMode: function switchMode(mode){
						if(mode === "CF"){
							this.update();
							this.show();
						} else if(mode === "DF"){
							this.hide();
						} else if(mode === "H"){

						} else {
							// console.log(Wrong Argument)
						}
					},
					update : function(){
						var bestConnectors = this.view.getBestConnectors(
							this.source.getPossiblePositionsOfConnectors(),
							this.target.getPossiblePositionsOfConnectors()
						);
						try {
							this.arrow[0].remove();	this.arrow[1].remove();
						} catch(e){	
							// console.log(e);
						}

						this.arrow = this.view.visualiser.drawEdge( bestConnectors )
					}
				}
				;
				edgeObject.update();
				this.graph_view.edgesCF.push( edgeObject );
			}
		},
		addDFEdge : function addCFEdge(data){
			//source, sourceOutputId
			//target, targetInputId
			// console.log(data)
			var foundedDFEdge = this.getDFEdge(data.sourceId, data.targetId, data.output.id, data.input.id);
			if(foundedDFEdge){
				gui.controler.reactOnEvent(""); //err msg
			}
			else {
				var	edgeObject = {
						arrow : undefined,
						sourceId: data.sourceId,
						targetId: data.targetId,
						output : data.output,
						input : data.input,
						view : this,
						type : "DF",
						toString : function (){ return "ssdl_DFEdge Object";},
						hide: function hide(){
							this.arrow[0].hide();
							this.arrow[1].hide();
						},
						show: function show(){
							this.arrow[0].myShow(300);
							this.arrow[1].myShow(300);
						},
						switchMode: function switchMode(mode){
							if(mode === "CF"){
								this.hide();
							} else if(mode === "DF"){
								this.update();
								this.show();
							} else if(mode === "H"){

							} else {
								// console.log(Wrong Argument)
							}
						},						
						update : function(){
							try {
								this.arrow[0].remove();	this.arrow[1].remove();
							 } catch(e){
							 	//console.log(e);	
							 }

							// console.log(this);

							var bboxInput = this.input.node.getBBox(),
								bboxOutput = this.output.node.getBBox(),
								coords = {
									x1 : bboxOutput.x + bboxOutput.width / 2,
									y1 : bboxOutput.y + bboxOutput.height / 2,
									x2 : bboxInput.x + bboxInput.width / 2,
									y2 : bboxInput.y + bboxInput.height / 2
								}
								;

							this.arrow = this.view.visualiser.drawEdge(coords);
						}
					}
				;
				edgeObject.update();
				this.graph_view.edgesDF.push( edgeObject );
			}
		},
		updateEdges : function updateEdges(){
			if(this.mode === "CF"){
				$.each(this.graph_view.edgesCF, function(){
					this.update();
				});
			}
			else if(this.mode === "DF"){
				$.each(this.graph_view.edgesDF, function(){
					this.update();
				});
			}
		},
		getCFEdge : function getEdge(sourceId, targetId){
			var foundedCFEdge;
			$.each(this.graph_view.edgesCF, function(){
				if(this.source.id === sourceId && this.target.id === targetId){
					foundedCFEdge = this;
					return false;
				}
			});

			return foundedCFEdge;
		},
		getDFEdge : function getEdge(sourceId, targetId, outputId, inputId){
			var foundedDFEdge;
			$.each(this.graph_view.edgesDF, function(){
				if( this.sourceId === sourceId && this.targetId === targetId &&
					this.input.id === inputId && this.output.id === inputId ) {

					foundedDFEdge = this;
					return false;
				}
			});

			return foundedDFEdge;
		},
		isInputConnected: function isInputConnected(nodeId, inputId){
			var result = false;
			$.each(this.graph_view.edgesDF, function(){
				if(this.targetId === nodeId && this.input.id === inputId){
					result = true;
					return false;
				}
			});

			return result;
		},
		drawGraph : function drawGraph(graph_json){
			var that = this;
			// console.log(graph_json);
			if(!this.paper){
				console.error("you have to run init() function first");
			}
			var p = this.paper,
				that = this,
				type,
				visualizedNode,
				tmp
			;
				
			$.each(graph_json.nodes, function(key, val){
				visualizedNode = that.visualiser.visualiseNode(val);
				if(visualizedNode)
					that.graph_view.nodes.push( visualizedNode );
			});

			$.each(graph_json.nodes, function(key, val){	
				$.each(val.sources, function(){
					that.addCFEdge({
						source: that.getNodeById(this),
						target: that.getNodeById(val.nodeId)
					});
				});
				$.each(val.functionalDescription.inputs, function(){
					if(this && this.source && this.source.length == 2){
						// alert(val.nodeId+":"+this.source);
						// alert(this.source[1]);
						that.addDFEdge({
							sourceId : this.source[0],
							targetId : val.nodeId,
							input : that.getNodeById(val.nodeId).getInputById(this.id),
							output : that.getNodeById(this.source[0]).getOutputById(this.source[1])
						});
					}
				});
			});

			this.switchMode("DF");
			//dataType equal
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
					dz = dx*dx + dy*dy;	// odlegloÅ›Ä‡
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
			this.leftPlugins = Raphael("left_plugins_"+pf, left_plugins_width, h);
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
				// console.trace();
			}
			//alert(resultTab[0]);
			return count === 1 ? resultTab[0] : resultTab;
		},
		getInputByPosition: function getInputByPosition(x, y){
			// gui.view.paper.rect(x-1, y-1, 2, 2).attr("fill", "red");
			var result,
				loopControler = true,
				bbox
				;
			$.each(this.graph_view.nodes, function(k, v){
				$.each(v.inputs, function(){
					bbox = this.node.getBBox();
					if ( bbox.x+bbox.width > x &&
						bbox.y+bbox.height > y &&
						bbox.x < x &&
						bbox.y < y
						)
					{
						result = {
							targetId : v.id,
							input : this
						};
						loopControler = false;
						return false;
					}
				});

				return loopControler;
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
	outputView.bottomBar = drawBottomBar(outputView.paper);
	outputView.blankNodes = blankNode(outputView.leftPlugins, outputView.paper, outputView.visualiser);

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
				

			// TUTAJ POWINNO BYC WYSÅ?ANIE EVENTU DO KONTROLERA Z 4MA WSPÃ“Å?Å»Ä?DNYMI
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
				// TUTAJ POWINNO BYÄ† WYSÅ?ANIE EVENTU DO KONTROLERA Z SELEKTEM
				
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
		}

	outputView.bgSelectionHelper.drag(bgMove, bgStart, bgStop);

	return outputView;
};

/*

function prepereDeliciousBroccoliCreamInLessThan20Minutes(){
  var timeAtStart = ( new Date() ).getTime(),
    ingredients = {
      0: {name: "brokuł", weight: "500", unit:"gram", strip: function strip(){...}},
      1: {name: "woda", amount: .5, unit:"litr", isBoiling: false},
      2: {name: "śmietana"},
      3: {name: "kostka bulionowa cielęca", quantity: 1},
      4: {name: "sól i pieprz", description: "do smaku"},
      5: {name: "migdały w płatkach", hasGoldColor: false}
    },
    tools = {
      0: {name: "blender"},
      1: {name: "garczek", capacity: "5", unit:"litr"},
      2: {name: "kuchenka gazowa", quantity: 1, lightFire: function(){...}},
      3: {name: "patelnia", quantity: 1}
    },
    place = function place(what, inOrOnWhat){...},
    blend = function blend(what, withWhat){...}
  ;

place( [
      ingredients[1],
      ingredients[3]
    ],
    tools[1]
  );
  place(tools[1], tools[2]);
  tools[2].lightFire();
  ingredients[0];

  return ;
}
*/