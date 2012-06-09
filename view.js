"use strict"; 
//var supportedTypes = [];
var c = 0;
function View(id, width, height, gui){
	var pf = gui.id_postfix;		
	
	function nodeVisualizator(view){
		var outputObject = {
			gradient : {
				service : "#fbec88",
				functionality: "#fbec88"
			},
			selector : {
				b:3
			},
			getBlankNode : function getBlankNode(){
				var blankNode = {
					id : "", //inputNode.nodeId,
					label : "", //inputNode.label,
					type : "", //inputNode.nodeType,
					//cx : 0,
					//cy : 0,
					x : 10+55*c,
					y : 10+35*c,
					r : 15,
					width : 145,
					height : 35,
					scale : 100,
					highlighted : false,
					highlightColor : "orange",
					normalColor : "black",
					//set : null,
					
					select : function(flag){

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
					isInside : function(x1,y1,x2,y2){
						return this.x+this.width > x1 &&
								this.y+this.height > y1 &&
								this.x < x2 &&
								this.y < y2
					},
					remove : function(){
						$.each(this.set, function(){
							this.remove();	
						})
					},
					getCoords : function(){
						return {	x : this.x,
									y : this.y	};
					},
					setCoords : function(newCoords){
						this.x = newCoords.x;
						this.y = newCoords.y;
					},
					toString : function(){ return "Włodek`s Object"; },
					translate : function(transX, transY){
						$.each(this.set, function(i, v){
							if(v.attr("cx")){
								v.attr("cx", v.attr("cx") + transX);
								v.attr("cy", v.attr("cy") + transY);
							}
							else
								v.translate(transX, transY)
						});
							
						this.x += transX;
						this.y += transY;
					}
				}
				
				return blankNode;
			},
			extendVisualisation : function(type, fun){
				this["draw_"+type.toLowerCase()+"Node"] = fun;
			},
			draw_unknownNode : function(node){
				alert("draw_unknownNode");
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
				
				return ( this["draw_"+nodeType+"Node"] || this.draw_unknownNode )(newNode);
			},
			draw_controlNode : function(node){
				var c = view.paper.circle(node.x, node.y, node.r).attr({fill: "white", cursor: "crosshair"}),
					label = view.paper.text(node.x, node.y-20, node.id).attr("fill", "#333");
					;
				
				c.node.setAttribute("class",node.id);
						
				label.node.removeAttribute("style");
				label.node.removeAttribute("text");
				label.node.setAttribute("class", node.id + " label");

				node.isInside = function(x1,y1,x2,y2){
					return this.x+this.r > x1 &&
							this.y+this.r > y1 &&
							this.x < x2 &&
							this.y < y2
				}
				
				node.set.push(c, label);
				gui.controler.drag(label, node);

				return node;
			},
			draw_serviceNode : function(node){
				var id = node.id,
					rect = view.paper.rect(node.x, node.y, node.width, node.height, 5).attr("fill", "#fbec88"),
					label = view.paper.text(node.x + node.width/2, node.y + 10, node.label),
					img_gear = view.paper.image("images/img.png", node.x + node.width-17, node.y+2, 15, 15),
					c1 = view.paper.circle(node.x+node.width/2, node.y, 4),
					c2 = view.paper.circle(node.x+node.width, node.y + node.height/2, 4),
					c3 = view.paper.circle(node.x+node.width/2, node.y + node.height, 4),
					c4 = view.paper.circle(node.x, node.y + node.height/2, 4),
					c_tab = [],
					i,
					j=0,
					serviceName = node.serviceName,
					maxLength = 25,
					shortenServiceName = serviceName.length > maxLength ? serviceName.substring(0, maxLength-3)+"..." : serviceName
					;

				var serviceNameShown = view.paper.text(node.x+node.width/2, node.y + 25, shortenServiceName);
				serviceNameShown.node.setAttribute("class", name);
				serviceNameShown.attr({title: serviceName, cursor: "default"});
								
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
				
				node.set.push(rect, label, img_gear, c1, c2, c3, c4, serviceNameShown);
				
				for(i=0, j=node.set.length; i<j; i++)
					node.set[i].mouseover(msoverc).mouseout(msoutc);

				gui.controler.drag(label, node);
				
				return node;
			},
			draw_functionalityNode : function(node){
				var id = node.id,
					rect = view.paper.rect(node.x, node.y, node.width, node.height, 5).attr("fill", "#a6c9e2"),
					label = view.paper.text(node.x + node.width/2, node.y + 10, node.label),
					img_gear = view.paper.image("images/img.png", node.x + node.width-17, node.y+2, 15, 15),
					c1 = view.paper.circle(node.x+node.width/2, node.y, 4),
					c2 = view.paper.circle(node.x+node.width, node.y + node.height/2, 4),
					c3 = view.paper.circle(node.x+node.width/2, node.y + node.height, 4),
					c4 = view.paper.circle(node.x, node.y + node.height/2, 4),
					c_tab = [],
					i,
					j=0;
								
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
				
				for(i=0, j=node.set.length; i<j; i++)
					node.set[i].mouseover(msoverc).mouseout(msoutc);

				gui.controler.drag(label, node);
				
				return node;
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
		graph_view: {
			nodes : [],
			edges : []
		},
		init : function init(){
			var $elem = $("#"+this.id),
				that = this;
			
			if(!(this.width && this.height)){
				this.width = parseInt($elem.css("width"), 10) || 950;
				this.height = parseInt($elem.css("height"), 10) || 650;
			}
			var heightOfTopBar = 20;

			var html = [];
			var h = (this.height-2-heightOfTopBar);
			var canvas_width = (Math.floor(this.width * .7));
			var left_plugins_width = (Math.floor(this.width * .15));
			html.push("<div id='top_nav_"+pf+"' style='width: "+(this.width-2)+"px; height:"+heightOfTopBar+"; border:1px solid black;'>&nbsp;&gt;</div>");
			html.push("<div id='left_plugins_"+pf+"' style='width:"+left_plugins_width+"px; height:" + h + "px; float:left;border:1px solid black;'></div>");
			html.push("<div id='canvas_holder_"+pf+"' style='width:"+canvas_width+"px; height:" + h + "px; float:left;border:1px solid black; '> </div>");
			html.push("<div id='right_plugins_"+pf+"' style='width:"+(this.width-6-canvas_width-left_plugins_width)+"px; height:" + h + "px; float:left;border:1px solid black; '></div>");

			$elem.html(html.join(""));

			this.paper = Raphael("canvas_holder_"+pf, canvas_width, h);
			this.bgSelectionHelper = this.paper.rect(0,0,width,height).attr({fill : "#DEDEDE", stroke: "none"}).toBack();
	
			$elem.css("width", this.width);
			$elem.css("height", this.height);
		},
		drawGraph : function drawGraph(){
			var that = this;
			if(!this.paper){
				console.error("you have to run init() function first");
			}
			var graph_json = gui.controler.data,
				p = this.paper,
				that = this,
				type, tmp;
				
			$.each(graph_json.nodes, function(k, v){
				tmp = that.visualiser.visualiseNode(v);
				if(tmp)
					that.graph_view.nodes.push( tmp );
			});
		},
		setBold : function(x1, y1, x2, y2){
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
		removeNode : function removeNode(id){
			$.each(this.graph_view.nodes, function(k, v){
				if(v.id = id){
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
				gui.controler.reactOnEvent("DESELECT")
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
				})
				
				$.each(outputView.graph_view.nodes, function(i, val){
					val.setBold(false);
				});
			}
		}
	
	outputView.bgSelectionHelper.drag(bgMove, bgStart, bgStop);
	
	return outputView;
}