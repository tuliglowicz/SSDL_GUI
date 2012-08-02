//toDo
// done // walidacja, edycja, json2ssdl, startstop

"use strict";
var c = -1;
var rozmieszczenie = [247, 33, 247, 234, 174, 77, 175, 147];
function View(id, width, height, gui){
	var pf = gui.id_postfix;
	
	function tooltipper() {
		var opacity = .95,
			tooltip = {
				tipContener : undefined,
				tipTitle : undefined,
				tipText : undefined,
				visible: false,
				init: function init() {
					var x = 10,
						y = 10
					;

					x = ( x + this.width > $(window).width() ? $(window).width() - 1.1 * this.width : x );
					y = ( y + this.height > $(window).height() ? $(window).height() - 1.1 * this.height : y );
					
					$("<div id='tipContener' style='opacity:"+opacity+";position: absolute; top:" + y + "px; left:"+ x +"px; width:auto;height:auto; background-color: #666; color: black; '> </div>").appendTo("body");
					$("<div id='tipTitle' style='font-size: 14px;padding:5px 5px 5px 5px;opacity:"+opacity+";border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:gray;border-radius: 5px 5px 0px 0px; text-align: center; background-color: #666; color: #fff; font-weight: bold;'> </div>").appendTo("#tipContener");
					$("<div id='tipText' style='font-size: 12px;opacity:"+opacity+";border-radius: 0px 0px 5px 5px; padding: 5px 5px 15px 5px; background-color: #666; font-weight: normal; text-align: left; color: white;'> </div>").appendTo("#tipContener");

					this.tipContener = $("#tipContener");
					this.tipTitle = $("#tipTitle");
					this.tipText = $("#tipText");

					this.tipContener.hide();
				},
				isOpen: function isOpen() {
					return this.visible;
				},
				openHelper: function openHelper(title, text, x, y) {
					this.tipContener.show();
					this.visible = true;
				},
				open: function open(title, text, x, y, evt) {
					// console.log(title, text, x, y, evt)
					// console.log("open")
					if (title && text) {
						this.tipTitle.html(title);
						this.tipText.html(text);

						if (x) this.tipContener.css("left", x);
						if (y) this.tipContener.css("top", y);

						this.tipContener.css("height", (this.tipTitle.height() + this.tipText.height()) + "px");

						if (evt.shiftKey)
							this.openHelper(this.title, this.text, this.x, this.y);
						else 
							this.tOut = setTimeout((function() { this.openHelper(this.title, this.text, this.x, this.y); }).bind(this), 500);
					}
				},
				close: function close() {
					clearTimeout(this.tOut);
					this.tipContener.hide();
					this.visible = false;
				}
			}
		;

		tooltip.init();
		tooltip.init = undefined;

		return tooltip;
	};
	//UWAGA, PARTYZANTKA PRZY TWORZENIU NODE'A (DESCRIPTION, I/O)
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
	};
	function blankNode(){
		var tmp = {
			name: "blankNode",
			version: "1.0",
			author: "Author",
			dataType: 'json',
			dataSet: [],
			globalEvents: ["load"],
			localEvents: ["select"],

			init: function init(){
				var left, top, that;
				if( $("#blankNodes_"+pf).length === 0 ){
					$("#left_plugins_"+pf).append("<div id='blankNodes_"+pf+"' class='plugin_"+pf+"'> </div>");
					this.paper = Raphael("blankNodes_"+pf, gui.view.columnParams.leftCol.width-1, 500);
				}
			},
			draw: function draw(){
				var nodeLength = 135,
					nodeHeight = 35,
					nodeHorizontalPosition = this.paper.width/2 - nodeLength/2, 
					textHorizontalPosition = this.paper.width/2;
				
				var onDblClick = function onDblClick(nodeType){
					return function(){
						if(gui.controler)
							var label = prompt("Enter a label for the new node:");
							if(label) gui.controler.reactOnEvent("AddBlankNode", {label:label, nodeType:nodeType});
					}
				}

				var text_service = this.paper.text(textHorizontalPosition,10,"Service");
				text_service.node.setAttribute("class","repository_text");
				this.dataSet.push(text_service);
				var repo_service = this.paper.rect(nodeHorizontalPosition,20,nodeLength,nodeHeight,5)
					.attr({fill:"#fbec88"})
					.dblclick(onDblClick("Service"));
				repo_service.node.setAttribute("class","repository_element");
				this.dataSet.push(repo_service);
				var text_functionality = this.paper.text(textHorizontalPosition,80,"Functionality");
				text_functionality.node.setAttribute("class","repository_text");
				this.dataSet.push(text_functionality);
				var repo_functionality = this.paper.rect(nodeHorizontalPosition,90,nodeLength,nodeHeight,5)
					.attr({fill:"#a6c9e2"})
					.dblclick(onDblClick("Functionality"));
				repo_functionality.node.setAttribute("class","repository_element");
				this.dataSet.push(repo_functionality);

				var text_mediator = this.paper.text(textHorizontalPosition,150,"Mediator")
					.hide();
					// text_mediator.node.setAttribute("class","repository_text"));
				var repo_mediator = this.paper.rect(nodeHorizontalPosition,600,nodeLength,nodeHeight,5)
					.attr({fill:"white"})
					.dblclick(onDblClick("Mediator"))
					.hide();
				repo_mediator.node.setAttribute("class","repository_element");	
				// this.dataSet.push(repo_mediator);
			}
		};
		return tmp;
	};
	function drawBottomBar(paper){
		
		//UŻYCIE WTYCZKI:
		//ma defaultowo zdefiniowane buttony CF, DF i SS
		//addGroup(label) dodaje grupę o zadanym labelu
		//addOption(groupLabel, label, function, description) dodaje button o zadanym labelu do 
		//grupy o zadanym groupLabel. Function zostaje przypisane na click(), description tak sobie jest.
		//Po dodaniu czegokolwiek następuje automatyczne rozmieszczenie elementów na pasku.
		//Ukrywanie: getGroup(groupLabel).hideButton(label) albo getGroup(label).hideGroup()
		//Analogicznie pokazywanie elementu, PRZY CZYM:
		//- showGroup() pokazuje grupę wraz ze wszystkimi opcjami
		//- showOnlyGroup() pokazuje tylko grafikę grupy - używane, gdy grupa znikła w wyniku usunięcia
		//	ostatniego przycisku
		//Użyta technologia: Javascript, Raphael ^^
		
		var top = (paper.height*.95 >= 250) ? paper.height*.95 : 250,
			left = 0,
			width = paper.width,
			height = paper.height*.15,
			canvas = $(paper.canvas),
			offsetX = parseInt(canvas.offset().left) + parseInt(canvas.css("border-top-width")),
			offsetY = parseInt(canvas.offset().top) + parseInt(canvas.css("border-left-width")),

			offset = 20,
			visible = .2,
			invisible = 0,
			result = {
				top: top,
				left: left,
				width: width,
				height: height,

				offset: offset,
				visible: visible,
				invisible: invisible,
				isVisible: false,
				animationTime: 200,
				groups: [],
				separators: [],
				set: [],
				pathString: function pathString(x, y){
					return("M " + x + " " + y + " l 20 0 l -10 -10 z");
				},
				createBar: function createBar(x, y, width, height){
					var that = this;
					
					this.bar = paper.rect(x, y, width, height)
						.attr({fill:"grey", opacity: this.invisible})
						.mouseover(function(){
							that.isVisible = true;

							that.bar.animate({y: paper.height*.85, opacity: visible},that.animationTime);
							that.triangle1.animate({opacity: invisible}, that.animationTime);
							that.triangle2.animate({opacity: invisible}, that.animationTime);
							$.each(that.groups, function(){
								if(this.isVisible){
									this.graphic.show().animate({opacity: visible}, that.animationTime);
									$.each(this.buttons, function(){
										if(this.isVisible){
											this.graphic[0].show().animate({opacity: visible}, that.animationTime);
											this.graphic[1].show().animate({opacity: visible}, that.animationTime);
											this.graphic[2].show();
										}
									});
								}
							});
							$.each(that.separators, function(){
								this.show().animate({opacity: visible}, that.animationTime);
							});
							return this;
						})
						.mouseout(function(evt,x,y){
							var b = that.bar.getBBox();

							if(! that.bar.isPointInside(x-offsetX, y - offsetY)){

								that.isVisible = true;

								if(! that.bar.isPointInside(x-offsetX, y - offsetY)){

									that.bar.animate({y: paper.height*.95, opacity: invisible}, that.animationTime);
									that.triangle1.animate({opacity: visible}, that.animationTime);
									that.triangle2.animate({opacity: visible}, that.animationTime);
									$.each(that.groups, function(){
										this.graphic.animate({opacity: that.invisible}, that.animationTime).hide();
										$.each(this.buttons, function(){
											this.graphic[0].animate({opacity: invisible}, that.animationTime).hide();
											this.graphic[1].animate({opacity: invisible}, that.animationTime).hide();
											this.graphic[2].hide();
										});
									});
									$.each(that.separators, function(){
										this.animate({opacity: invisible}, that.animationTime).hide();
									});
								}
								return this;
							}
						});

				},
				createTriangle: function createTriangle(path){
					var tr = paper.path(path);
					tr.attr({fill:"grey", opacity: visible});
					return tr;
				},
				addGroup: function addGroup(label){
					var that = this,
						margin = 10,
						result = {
							label: label,
							buttons: [],
							margin: margin,
							x: 10, y: paper.height*.85 + margin,
							width: 25, 
							height: this.height - 2*margin,
							isVisible: true,
							addButton: function addButton(button){
								this.buttons.push(button);
								this.resizeAndRelocate();
								that.relocate();
							},
							toString: function toString(){
								return "bottomBar_Group object";
							},
							hideButton: function hideButton(label){
								$.each(this.buttons, function(){
									if(this.label.toUpperCase()===label.toUpperCase()) 
										this.hideThisButton();
								});
								if(this.areSomeButtonsVisible()){
									that.generalFontReset();
									this.resizeAndRelocate();
									that.relocate();
								}
								else
									this.hideGroup();
							},
							showButton: function showButton(label){
								$.each(this.buttons, function(){
									if(this.label.toUpperCase()===label.toUpperCase()) 
										this.showThisButton();
								});
								if(this.isVisible===false) this.showOnlyGroup();
								this.resizeAndRelocate();
								that.relocate();
							},
							areSomeButtonsVisible: function areSomeButtonsVisible(){
								return 
									this.buttons.some(function(elem){
										return elem.isVisible != false;
									});
							},
							hideGroup: function hideGroup(){
								this.isVisible = false;
								this.graphic.hide();
								$.each(this.buttons, function(){
									this.hideThisButton();
								});
								that.generalFontReset();
							},
							showGroup: function showGroup(){
								this.isVisible = true;
								this.graphic.show();
								$.each(this.buttons, function(){
									this.showThisButton();
								});
								that.generalFontReset();
							},
							showOnlyGroup: function showOnlyGroup(){
								this.isVisible = true;
								this.graphic.show();
								that.generalFontReset();
							},
							createGraphic: function createGraphic(){
								var temp, bbox;
								temp = paper.text(0, this.y+5, this.label)
								.attr({"font-size":10, fill:"black", opacity: 0});
								bbox = temp.getBBox();
								temp.attr("x", this.x+bbox.width/2+this.margin);
								return temp;
							},
							moveGroupToX: function moveGroupToX(x){
								//przesunięcie do punktu (x, y), nie o wektor [x, y], y = const.
								var dx = x - this.x, ox;
								this.x = x;
								ox = this.graphic.attr("x");
								this.graphic.attr({"x": ox+dx});
								$.each(this.buttons, function(){
									this.moveButtonByX(dx);
								});
							},
							resizeAndRelocate: function resizeAndRelocate(){
								var sum = margin, groupX = this.x;
								$.each(this.buttons, function(){
									if(this.isVisible===true){
										this.moveButtonToX(sum + groupX);
										sum += this.width + margin;
									}
								});
								this.width = sum;
							}
						};

					result.graphic = result.createGraphic();
					this.groups.push(result);
					this.addSeparator(result.x+result.width, result.y, result.height);
					this.relocate();
					return result;
				},
				getGroup: function getGroup(groupLabel){
					var result = false;
					$.each(this.groups, function(){
						if(this.label.toUpperCase()===groupLabel.toUpperCase()) {
							result = this;
						}
					});
					return result;
				},
				addOption: function addOption(groupLabel, label, click, description){
					var result = {
						label: label,
						groupLabel: groupLabel,
						description: description,
						fontsize: 25,
						x: 0, y: paper.height*.85 + 15,
						width: 0, height: 0,
						isVisible: true,
						moveButtonToX: function moveButtonToX(x){
							var ox, dx = x - this.x;
							this.x = x;
							$.each(this.graphic, function(){
								ox = this.attr("x");
								this.attr({"x": ox+dx});
							});
						},
						toString: function toString(){
							return "bottomBar_Option object";
						},
						moveButtonByX: function moveButtonByX(x){
							var ox;
							this.x += x;
							$.each(this.graphic, function(){
								ox = this.attr("x");
								this.attr({"x": ox+x});
							});
						},
						moveButtonByY: function moveButtonByY(y){
							var oy;
							this.y += y;
							$.each(this.graphic, function(){
								oy = this.attr("y");
								this.attr({"y": oy+y});
							});
						},
						hideThisButton: function hideThisButton(){
							this.isVisible = false;
							$.each(this.graphic, function(){
								this.hide();
							});
						},
						showThisButton: function showThisButton(){
							this.isVisible = true;
							$.each(this.graphic, function(){
								this.show();
							});
						},
						resize: function resize(w, h){
							this.width = w;
							this.height = h;
							this.graphic[0].attr({"width": w, "height": h});
							this.graphic[2].attr({"width": w, "height": h});
						},
						fontsizeChange: function fontsizeChange(arg){
							//arg nieobowiązkowy, jeśli nie zostanie podany, czcionka zmniejszy się o 2px 
							this.fontsize += (arg) ? arg : -2;
							this.recreateGraphic();
						},
						fontsizeReset: function fontsizeReset(){
							this.fontsize = 25;
							this.recreateGraphic();
						},
						createGraphic: function createGraphic(){
							var temp1, temp2, cover, bbox, set, labelX, labelY;
							temp1 = paper.text(0, 0, this.label)
							.attr({
								"font-size" : this.fontsize+"px",
								"font-weight" : "bold",
								"stroke-width" : "1px",
								"stroke-linejoin" : "round",
								"stroke-linecap" : "butt",
								stroke : "grey",
								fill : "black",
								opacity : invisible
							});
							bbox = temp1.getBBox();
							this.width = bbox.width + 10;
							this.height = bbox.height + 10;
							temp2 = paper.rect(this.x, this.y, this.width, this.height, 3).attr({fill:"ivory", opacity:invisible});
							labelX = this.x + this.width/2; labelY = this.y + this.height/2;
							temp1.attr({"x": labelX, "y": labelY});
							cover = paper.rect(this.x, this.y, this.width, this.height, 3)
								.attr({"cursor": "pointer", fill: "red", opacity: 0.0})
								.mouseover(function(txt){
									return (function(){
										txt.attr("stroke", "blue");
									});
								}(temp1))
								.mouseout(function(txt){
									return (function(){
										txt.attr("stroke", "gray");
									});
								}(temp1))
								.toFront()
								.hide();
							set = [];
							set.push(temp2, temp1, cover);
							return set;
						},
						recreateGraphic: function recreateGraphic(){
							var bbox, labelX, labelY;
							this.graphic[1].attr({"font-size": this.fontsize+"px"});
							bbox = this.graphic[1].getBBox();
							this.width = bbox.width + 10;
							this.height = bbox.height + 10;
							this.graphic[0].attr({"width": this.width, "height": this.height});
							this.graphic[2].attr({"width": this.width, "height": this.height});
							labelX = this.x + this.width/2; labelY = this.y + this.height/2;
							this.graphic[1].attr({"x": labelX, "y": labelY});
						}
					};
					result.graphic = result.createGraphic();
					result.graphic[2].click(click);
					var group = this.getGroup(result.groupLabel);
					result.moveButtonByY(result.height/4);
					group.addButton(result);
					return result;
				},
				addSeparator: function addSeparator(x, y, h){
					var sep = paper.rect(x, y, 1, h).attr({"stroke-width":"0", fill:"gray", opacity:invisible});
					this.separators.push(sep);
					return sep;
				},
				relocate: function relocate(){
					var sum = 10, that = this;
					//fix dla buga powodującego powstawanie niezniszczalnych separatorów, jeżeli
					//użytkownik ma otwarty pasek podczas hide'owania czegoś
					//pytanie, czy ten fix jest potrzebny - czy ten bug ma szanse wystąpić?
					$.each(this.separators, function(){
						this.hide();
					});

					this.separators = [];
					$.each(this.groups, function(){
						if(this.isVisible){
							this.moveGroupToX(sum);
							//to jest ciut partyzanckie, ale jak inaczej ominąć pierwszy separator?
							//czy też może chcemy pierwszy lub ostatni separator? ale po co?
							if(sum>10)
								that.addSeparator(this.x, this.y, this.height);
							sum += this.width;
						}
					});

					if(sum >= paper.width){
						this.generalResize();
					}

					if(this.isVisible)
						$.each(this.separators, function(){
							this.show().animate({opacity: visible}, that.animationTime);
						});
				},
				generalResize: function generalResize(arg){
					//arg: o ile pikseli zwiększyć/zmniejszyć czcionkę w label buttonów, non-obligatory
					$.each(this.groups, function(){
						$.each(this.buttons, function(){
							this.fontsizeChange(arg);
						});
						this.resizeAndRelocate();
					});
					this.relocate();
				},
				generalFontReset: function generalFontReset(){
					$.each(this.groups, function(){
						$.each(this.buttons, function(){
							this.fontsizeReset();
						});
						this.resizeAndRelocate();
					});
					this.relocate();
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
		
		var switchMode = function(arg){
			return (function(){
				gui.controler.reactOnEvent("SwitchMode", {mode: arg})
			});
		};
		var startStop = function(){
			gui.controler.reactOnEvent("AddStartStopAutomatically");
		};
		var f3 = function(){alert("this is just for debugging")};

		result.invisibleBar = result.createBar(left, top, width, height);
		result.addGroup("Views");
		result.addOption("Views", "CF", switchMode("CF"), "ControlFlow");
		result.addOption("Views", "DF", switchMode("DF"), "DataFlow");
		result.addGroup("Edit");
		result.addOption("Edit", "StartStop", startStop, "Insert Start/Stop");
		// result.addGroup("Tester group");
		// result.addOption("Tester group", "Test1", f3, "Test if works");
		// result.addOption("Tester group", "TestTWO", f3, "Test if works");
		// result.addOption("Tester group", "AnotherTest", f3, "Test if works");
		// result.addOption("Tester group", "Test4", f3, "Test if works");
		// result.addOption("Views", "SS", f3, "Test if works");
		// result.addOption("Views", "Test", f3, "Test if works");

		result.set.push(result.invisibleBar, result.triangle1, result.triangle2);

		return result;
	};
	function addSideScroller(paper){
		var invisible = 0,
			visible = .4,
			animationTime = 100,
			visibleHeight = paper.height,
			checkHeight = function(set){	//określa wysokość przekazanej tablicy obiektów
				if(!set[0]) return 0;
				var min = set[0].getBBox().y, max = 0, bbox;
				$.each(set, function(){
					bbox = this.getBBox();
					if(bbox.y < min) min = bbox.y;
					if(bbox.y + bbox.height > max) max = bbox.y + bbox.height;
				});
				return max - min + 10; //10 dodaję jako margines
			},
			isValid = function(set){	//sprawdza, czy tablica obiektów może zostać użyta
				return
					set.some(function(elem){
						return (getType(elem.getBBox) != "function" || getType(elem.translate) != "function")
					});
			},
			scroll = {
				move: function move(set, mult){
					return function(dx, dy){
						var newY = this.oy + dy, altDy; 
						if(newY >= 0 && newY + this.attr("height") <= visibleHeight){
							this.transform("t0,"+dy);
							$.each(set, function(){
								this.translate(0, (-1*dy/mult)); //this.transform("t0,"+(-1*dy/mult))
							});
						}
						else{ 
							if(newY < 0)
								altDy = this.oy;
							else
								altDy = visibleHeight - this.oy - this.attr("height");
							this.transform("t0,"+altDy);
							$.each(set, function(){
								this.translate(0, (-1*(altDy/mult+5))); //this.transform("t0,"+(-1*(altDy/mult+5)))
							});
						}
					}
				},
				start: function start(){
					this.oy = this.attr("y");
				},
				stop: function stop(){},
				init: function init(){
					this.slider = paper.rect(paper.width-5, 0, 5, visibleHeight*.75, 5)
						.attr({"stroke-width":0, fill:"black", opacity: visible})
						.hide();
					this.set = [];
				},
				//update musi być wywoływany przy każdorazowej zmianie zawartości kanwy, na której siedzi sobie scroll
				update: function update(set){
					var result = false;
					if(isValid(set)){
						this.set = set;
						var setHeight = checkHeight(set);
						this.multiplier = (visibleHeight / setHeight < 1) ? visibleHeight/setHeight : 1;
						this.slider.attr({height: visibleHeight*this.multiplier});
						this.slider.drag(this.move(this.set, this.multiplier), this.start, this.stop);
						result = true;
					}
					else
						console.log("Invalid object array passed to the addSideScroller() function. There will be NO side scroller for you! :[");
					return result;
				},
				showYourself: function showYourself(){
					if(this.multiplier !== 1)
						this.slider.show();
				},
				goHide: function goHide(){
					this.slider.hide();
				}
			};
		scroll.init();
		return scroll;
	};
	function form() {
		var resultJSON = {
			"nodeId":"",
			"nodeLabel":"",
			"nodeType":"",
			"physicalDescription":{},
			"functionalDescription":{},
			"nonFunctionalDescription":[],
			"alternatives":"",
			"subgraph":{},
			"controlType":"",
			"condition":"",
			"sources":[]
		};
		var physDescJSON = {
			"serviceName":"",
			"serviceGlobalId":"",
			"address":"",
			"operation":""
		};
		var funcDescJSON = {
			"description":"",
			"serviceClasses":[],
			"metaKeywords":[],
			"inputs":[],
			"outputs":[],
			"preconditions":"",
			"effects":""
		};
		var $tabs = $( "#tabs" ).tabs();

		var result = {
			resultJSON: resultJSON,
			physDescJSON: physDescJSON,
			funcDescJSON: funcDescJSON,
			inputEdit: false,
			outputEdit: false,
			NFedit: false,
			inputNumber: -1,
			outputNumber: -1, 
			NFnumber: -1,
			inputRow: -1,
			outputRow: -1, 
			NFrow: -1,

			initToEdit: function initToEdit(node){
				var titleText = 'Viewing a ' + node.nodeType + ' type node';
				this.clearErrors();
				this.cleanForm();
				$('#ui-dialog-title-form').text(titleText);
				$( "#f_mainTab_label" ).val(node.nodeLabel);
				$("#f_mainTab_controlType").val(node.controlType);
				this.adjustForm(node.nodeType);
				$( "#f_mainTab_description" ).val(node.functionalDescription.description);
				$( "#f_physicalDescriptionTab_serviceName" ).val(node.physicalDescription.serviceName);
				$( "#f_physicalDescriptionTab_serviceGlobalId" ).val(node.physicalDescription.serviceGlobalId);
				$( "#f_physicalDescriptionTab_address" ).val(node.physicalDescription.address);
				$( "#f_physicalDescriptionTab_operation" ).val(node.physicalDescription.operation);
				
				this.appendList(node.functionalDescription.serviceClasses, "serviceClasses");
				this.appendIO(node.functionalDescription.inputs, "inputs");
				this.appendIO(node.functionalDescription.outputs, "outputs");
				this.appendNonFuncDesc(node.nonFunctionalDescription);
				this.resultJSON.nodeId = node.nodeId;
				$( "#form" ).dialog( "open" );
				
				//  pola obecnie nieużywane:
				//
				// var condition = [];
				//$( "#f_mainTab_nodeType" ).val(node.nodeType);
				// $( "#f_mainTab_alternatives" ).val(node.alternatives);
				// if(node.condition){
				// 	condition = node.condition.split(" ");
				// 	$( "#f_mainTab_condition" ).val((condition[1]) ? condition[1] : "");
				// 	$( "#f_mainTab_conditionTRUE" ).val((condition[3]) ? condition[3] : "");
				// 	$( "#f_mainTab_conditionFALSE" ).val((condition[5]) ? condition[5] : "");
				// }
				// $( "#f_mainTab_subgraph" ).val(node.subgraph);				

				// $( "#f_inputOutputTab_preconditions" ).val(node.functionalDescription.preconditions);
				// $( "#f_inputOutputTab_effects" ).val(node.functionalDescription.effects);
				// this.appendList(node.sources, "sources");

				// this.appendList(node.functionalDescription.metaKeywords, "metaKeywords");
			},
			initBlank: function initBlank(nodeData){
				var titleText = "Create a " + nodeData.nodeType + " type node";
				this.clearErrors();
				this.cleanForm();
				this.resultJSON.label = nodeData.label;
				this.resultJSON.nodeType = nodeData.nodeType;
				$('#ui-dialog-title-form').text(titleText);
				this.adjustForm(nodeData.nodeType);
				$( "#f_mainTab_label" ).val(nodeData.label);
				$( "#f_mainTab_nodeType" ).val(nodeData.nodeType);
				$( "#form" ).dialog( "open" );
			},
			adjustForm: function adjustForm(nodeType){
				switch(nodeType.toLowerCase()){
					case "control" : 
						$( 'label[for="f_mainTab_controlType"], #f_mainTab_controlType' ).show();
						$('#physicalDescriptionTab').addClass("ui-tabs-hide");
						$('label[for="f_mainTab_serviceClass"], #f_mainTab_serviceClass').hide();
						$('#f_button_addServiceClass').hide();
						$('#f_mainTab_scInfo').hide();
						$('#tabs-2').hide();
						break;
					case "functionality" : 
						$( 'label[for="f_mainTab_controlType"], #f_mainTab_controlType' ).hide();
						$('#physicalDescriptionTab').addClass("ui-tabs-hide");
						$('label[for="f_mainTab_serviceClass"], #f_mainTab_serviceClass').show();
						$('#f_button_addServiceClass').show();
						$('#f_mainTab_scInfo').show();
						$('#tabs-2').hide();
						break;
					default: 
						$( 'label[for="f_mainTab_controlType"], #f_mainTab_controlType' ).hide();
						$('#physicalDescriptionTab').removeClass("ui-tabs-hide");
						$('label[for="f_mainTab_serviceClass"], #f_mainTab_serviceClass').show();
						$('#f_button_addServiceClass').show();
						$('#f_mainTab_scInfo').show();
						$('#tabs-2').show();				
						break;
					}
			},
			//funkcje czyszczące elementy formularza
			clearNF: function clearNF(){
				$( "#nonFuncDescForm" )[0].reset();
				this.NFedit = false;
				this.NFnumber = -1;	
				this.NFrow = -1;
			},
			clearInputs: function clearInputs(){
				$( "#inputForm" )[0].reset(); 
				this.inputEdit = false;	
				this.inputNumber = -1;
				this.inputRow = -1;
			},
			clearOutputs: function clearOutputs(){
				$( "#outputForm" )[0].reset(); 	
				this.outputEdit = false;	
				this.outputNumber = -1;
				this.outputRow = -1;
			},
			//@handleErrors: to trzeba przepisać od zera dla nowej walidacji + usunąć buglist
			//na rzecz czegoś bardziej pro
			handleErrors: function handleErrors(array){
				var input;
				$.each(array, function(){
						input = this;
					var splitty = input.split("_");
						$( "#" + splitty[0] ).addClass( "ui-state-error" );
						$( "#" + splitty[1] ).addClass( "ui-state-error" );
						$( "#buglist" ).append(splitty[2] + " ");
				});
				$( "#buglist" ).append('<span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span>');
				$( "#buglist" ).addClass( "ui-state-error ui-corner-all" );
			},
			clearErrors: function clearErrors(){
				$( "#buglist" ).empty();
				$( "#buglist" ).removeClass( "ui-state-error" );
				$( "#f_physicalDescriptionTab_serviceName" ).removeClass( "ui-state-error" ); 
				$( "#f_physicalDescriptionTab_serviceGlobalId" ).removeClass( "ui-state-error" ); 
				$( "#f_physicalDescriptionTab_address" ).removeClass( "ui-state-error" ); 
				$( "#f_physicalDescriptionTab_operation" ).removeClass( "ui-state-error" ); 
				$( "#f_mainTab_nodeType" ).removeClass( "ui-state-error" ); 
				// $( "#f_mainTab_source" ).removeClass( "ui-state-error" ); 
				// $( "#f_mainTab_sources" ).removeClass( "ui-state-error" ); 
				$( "#f_nonFunctionalDescriptionTab_weight" ).removeClass( "ui-state-error" ); 
				$( "#f_nonFunctionalDescriptionTab_name" ).removeClass( "ui-state-error" ); 
				$( "#f_nonFunctionalDescriptionTab_relation" ).removeClass( "ui-state-error" ); 
				$( "#f_nonFunctionalDescriptionTab_unit" ).removeClass( "ui-state-error" );
				$( "#f_nonFunctionalDescriptionTab_value" ).removeClass( "ui-state-error" ); 
				for(var i = 1; i < 5; i++){ $( "#t" + i ).removeClass( "ui-state-error" );  }
			},
			cleanForm: function cleanForm(){
				this.resultJSON = {"nodeId":"","nodeLabel":"","nodeType":"","physicalDescription":[],"functionalDescription":[],"nonFunctionalDescription":[],"alternatives":"","subgraph":{},"controlType":"","condition":"","sources":[]};
				this.physDescJSON = {"serviceName":"","serviceGlobalId":"","address":"","operation":""};
				this.funcDescJSON = {"description":"","serviceClasses":[],"metaKeywords":[],"inputs":[],"outputs":[],"preconditions":"","effects":""};
				$( "#f_inputOutputTab_inputs tbody" ).empty();
				$( "#f_inputOutputTab_outputs tbody" ).empty();
				$( "#f_nonFunctionalDescriptionTab_NFProps tbody" ).empty();
				// $( "#f_mainTab_source" ).val("");
				// $( "#f_mainTab_sources" ).empty();
				$( "#f_mainTab_sClasses" ).empty();
				// $( "#f_functionalDescription_mKeywords" ).empty();
				$( "#mainForm" )[0].reset();
				$( "#physDescForm" )[0].reset(); 
				$( "#funcDescForm" )[0].reset(); 
				$( "#inputForm" )[0].reset(); 
				$( "#outputForm" )[0].reset(); 
				$( "#nonFuncDescForm" )[0].reset(); 

				$tabs.tabs('select', 0);
			},
			appendIO: function appendIO(array, type){
				var input;
				if(type==="inputs"){
					var no;
					for(no in array){
						input = array[no];
						var inputJSON = {"class":"","id":"","label":"","dataType":"","properties":"","source":[]};
						inputJSON.class = input.class;
						inputJSON.id = input.id;
						inputJSON.label = input.label;
						inputJSON.dataType = input.dataType;
						inputJSON.properties = input.properties;
						this.funcDescJSON.inputs.push(inputJSON);
						
						this.inputAndOutputAppender(inputJSON, "f_inputOutputTab_inputs tbody", no);
					}
				}
				else if(type==="outputs"){
					var no;
					for(no in array){
						input = array[no];
						var outputJSON = {"class":"","id":"","label":"","dataType":"","properties":"","source":[]};
						outputJSON.class = input.class;
						outputJSON.id = input.id;
						outputJSON.label = input.label;
						outputJSON.dataType = input.dataType;
						outputJSON.properties = input.properties;
						this.funcDescJSON.outputs.push(outputJSON);
						
						this.inputAndOutputAppender(outputJSON, "f_inputOutputTab_outputs tbody", no);
					}
				}
			},
			appendList: function appendList(array, type){
				var input, that = this;
				// if(type === "sources"){
				// 	$.each(array, function(){
				// 		input = this;
				// 		that.resultJSON.sources.push(input); 	
				// 		$( "#f_mainTab_sources" ).append("<span id=\"src_"+ input + "\">" + input + ", </span>");
				// 	});
				// } else 
				if(type === "serviceClasses"){
					$.each(array, function(){
						input = this;
						that.funcDescJSON.serviceClasses.push(input);
						$( "#f_mainTab_sClasses" ).append("<span id=\"sc_"+ input + "\" class=\"clickable\">" + input + ", </span>"); 	
					});
				}
				// else if(type === "metaKeywords"){
				// 	$.each(array, function(){
				// 		input = this;	
				// 		that.funcDescJSON.metaKeywords.push(input);
				// 		$( "#f_inputOutputTab_mKeywords" ).append("<span id=\"mk_"+ input + "\">" + input + ", </span>"); 	
				// 	});
				// }
			},		
			appendNonFuncDesc: function appendNonFuncDesc(array){
				var input, no;
				for(no in array){
					input = array[no];
					var nonFuncDescJSON = {"weight":"","name":"","relation":"","unit":"","value":""};
					nonFuncDescJSON.weight = input.weight;
					nonFuncDescJSON.name = input.name;
					nonFuncDescJSON.relation = input.relation;
					nonFuncDescJSON.unit = input.unit;
					nonFuncDescJSON.value = input.value;
					this.resultJSON.nonFunctionalDescription.push(nonFuncDescJSON);
					
					this.NFPropsAppender(nonFuncDescJSON, no);
				}
			},
			//Poniższe funkcje "przyklejają" nowo dodane inputy/outputy/non functional properties
			//do tabeli w formularzu
			inputAndOutputAppender: function inputAndOutputAppender(input, id, number){
				//id = "outputs tbody" || id = "inputs tbody"
				var tempId = id.split(" ")[0]; // => tempId = "inputs" || tempId = "outputs"
				$( "#" + id ).append( "<tr>" +
							"<td>" + input.id + "</td>" + 
							"<td>" + input.label + "</td>" + 
							"<td>" + input.class + "</td>" +
							"<td>" + input.dataType + "</td>" + 
							"<td>" + input.properties + "</td>" +
							"<td><button id=\"" + tempId + "edit" + number + "\" class=\"ui-state-default ui-corner-all\">edit</button>" +
							" <button id=\"" + tempId + "del" + number + "\" class=\"ui-state-default ui-corner-all\">delete</button></td>" +
						"</tr>" );
			},
			NFPropsAppender: function NFPropsAppender(input, number){
				$( "#f_nonFunctionalDescriptionTab_NFProps tbody").append( "<tr>" +
						"<td>" + input.weight + "</td>" + 
						"<td>" + input.name + "</td>" + 
						"<td>" + input.relation + "</td>" +
						"<td>" + input.unit + "</td>" + 
						"<td>" + input.value + "</td>" +
						"<td><button id=\"NFedit" + number + "\" class=\"ui-state-default ui-corner-all\">edit</button>" +
						" <button id=\"NFdel" + number + "\" class=\"ui-state-default ui-corner-all\">delete</button></td>" +
				"</tr>" );
			},
			rowRemover: function rowRemover(tabId, index){
				$( "#" + tabId + " tr:eq(" + index + ")").remove();
			},
			//Poniższe funkcje sprawdzajż, czy string/input/output/non functional property istnieje na zadanej liście
			stringExists: function stringExists(obj, array){
				var namey;
				$.each(array, function(){
					if (this === obj) return true;
				});
				return false;
			},
			ioExists: function ioExists(obj, array){
				var namey;
				$.each(array, function(){
					var ob = this;
					if (ob.id === obj.id) return true;
				});
				return false;
			},
			nonFuncExists: function nonFuncExists(obj, array){
				var namey;
				$.each(array, function(){
					var ob = this;
					if (ob.name === obj.name) return true;
				});
				return false;
			},
			//poniższe funkcje zwracają indeks elementu o zadanym id/name na liście
			stringExistsIndex: function stringExistsIndex(obj, array){
				var namey;
				for(namey in array){
					if (array[namey] === obj) return namey;
				}
				return -1;
			},
			ioExistsIndex: function ioExistsIndex(id, array){
				var namey;
				for(namey in array){
					var ob = array[namey];
					if (id === ob.id) return namey;
				}
				return -1;
			},
			nonFuncExistsIndex: function nonFuncExists(name, array){
				var namey;
				for(namey in array){
					var ob = array[namey];
					if (name === ob.name) return namey;
				}
				return -1;
			},
			/*
			*	EVENT HANDLERS START HERE
			*/
			submitAll: function submitAll(){
				// var condition;

				this.clearErrors();
				
				this.resultJSON.nodeLabel = $( "#f_mainTab_label" ).val();
				this.resultJSON.nodeType = $( "#f_mainTab_nodeType" ).val();
				// this.resultJSON.controlType = $( "#f_mainTab_controlType" ).val();
				// this.resultJSON.alternatives = $( "#f_mainTab_alternatives" ).val();
				
				// condition = $( "#f_mainTab_condition" ).val();
				// if(condition)
				// 	this.resultJSON.condition = "if " + $( "#f_mainTab_condition" ).val() + " then " + $( "#f_mainTab_conditionTRUE" ).val() + " else " + $( "#f_mainTab_conditionFALSE" ).val();
				// else this.resultJSON.condition = "";

				this.physDescJSON.serviceName = $( "#f_physicalDescriptionTab_serviceName" ).val();
				this.physDescJSON.serviceGlobalId = $( "#f_physicalDescriptionTab_serviceGlobalId" ).val();
				this.physDescJSON.address = $( "#f_physicalDescriptionTab_address" ).val();
				this.physDescJSON.operation = $( "#f_physicalDescriptionTab_operation" ).val();
				this.resultJSON.physicalDescription = this.physDescJSON;
					
				this.funcDescJSON.description = $( "#f_mainTab_description" ).val();
				this.funcDescJSON.preconditions = $( "#f_inputOutputTab_preconditions" ).val();
				this.funcDescJSON.effects = $( "#f_inputOutputTab_effects" ).val();
				this.resultJSON.functionalDescription = this.funcDescJSON;
			
				alert(JSON.stringify(this.resultJSON));

				gui.controler.reactOnEvent("TryToSaveNodeAfterEdit", this.resultJSON);
				
				//TO MOŻE NASTĄPIĆ TYLKO, KIEDY WALIDACJA JEST OK; ale ona jest w kontrolerze, więc have fun
				$( "#form" ).dialog( "close" );
			},
			addServiceClass: function addServiceClass(){
				var input = $("#f_mainTab_serviceClass").val();
				if(input!=="" && !this.stringExists(input, this.funcDescJSON.serviceClasses)){
					this.funcDescJSON.serviceClasses.push(input);
					$( "#f_mainTab_sClasses" ).append("<span id=\"sc_"+ input + "\" class=\"clickable\">" + input + ", </span>"); 	
				}
				$("#f_mainTab_serviceClass").val("");
			},
			// addMetaKeyword: function addMetaKeyword(){
			// 	var input = $("#f_inputOutputTab_metaKeyword").val();
			// 	if(!this.stringExists(input, this.funcDescJSON.metaKeywords)){
			// 		this.funcDescJSON.metaKeywords.push(input);
			// 		$( "#f_inputOutputTab_mKeywords" ).append("<span id=\"mk_"+ input + "\">" + input + ", </span>"); 	
			// 	}
			// 	$("#f_inputOutputTab_metaKeyword").val("");
			// },
			// addSource: function addSource(){
			// 	$( "#f_mainTab_source" ).removeClass( "ui-state-error" ); 
			// 	var input = $("#f_mainTab_source").val();
			// 	if(!this.stringExists(input, this.resultJSON.sources)){
			// 		this.resultJSON.sources.push(input);
			// 		$( "#f_mainTab_sources" ).append("<span id=\"src_"+ input + "\">" + input + ", </span>"); 	
			// 	}
			// 	$( "#f_mainTab_source" ).val(""); 
			// },
			addInput: function addInput(){
				if(this.inputEdit){
					this.funcDescJSON.inputs[this.inputNumber].class = $( "#f_inputOutputTab_inputClass" ).val();
					this.funcDescJSON.inputs[this.inputNumber].id = $( "#f_inputOutputTab_inputId" ).val();
					this.funcDescJSON.inputs[this.inputNumber].label = $( "#f_inputOutputTab_inputLabel" ).val();
					this.funcDescJSON.inputs[this.inputNumber].dataType = $( "#f_inputOutputTab_inputDataType" ).val();
					// this.funcDescJSON.inputs[this.inputNumber].properties = $( "#f_inputOutputTab_inputProperties" ).val();
					alert("Changes to input " + this.inputNumber + " were saved successfully.");
					
					this.rowRemover("f_inputOutputTab_inputs", this.inputRow+1);
					this.inputAndOutputAppender(this.funcDescJSON.inputs[this.inputNumber], "f_inputOutputTab_inputs tbody", this.inputNumber);
				}
				else{
					var inputJSON = {"class":"","id":"","label":"","dataType":"","properties":"","source":[]};
					inputJSON.class = $( "#f_inputOutputTab_inputClass" ).val();
					inputJSON.id = $( "#f_inputOutputTab_inputId" ).val();
					inputJSON.label = $( "#f_inputOutputTab_inputLabel" ).val();
					inputJSON.dataType = $( "#f_inputOutputTab_inputDataType" ).val();
					// inputJSON.properties = $( "#f_inputOutputTab_inputProperties" ).val();
			
					if(!this.ioExists(inputJSON, this.funcDescJSON.inputs)){
						this.funcDescJSON.inputs.push(inputJSON);
						this.inputAndOutputAppender(inputJSON, "f_inputOutputTab_inputs tbody", this.funcDescJSON.inputs.length);
					}
				}
				this.clearInputs();
			},
			addOutput: function addOutput(){
				if(this.outputEdit){
					this.funcDescJSON.outputs[this.outputNumber].class = $( "#f_inputOutputTab_outputClass" ).val();
					this.funcDescJSON.outputs[this.outputNumber].id = $( "#f_inputOutputTab_outputId" ).val();
					this.funcDescJSON.outputs[this.outputNumber].label = $( "#f_inputOutputTab_outputLabel" ).val();
					this.funcDescJSON.outputs[this.outputNumber].dataType = $( "#f_inputOutputTab_outputDataType" ).val();
					// this.funcDescJSON.outputs[this.outputNumber].properties = $( "#f_inputOutputTab_outputProperties" ).val();
					alert("Changes to output " + this.outputNumber + " were saved successfully.");
					
					this.rowRemover("f_inputOutputTab_outputs", this.outputRow+1);
					this.inputAndOutputAppender(this.funcDescJSON.outputs[this.outputNumber], "f_inputOutputTab_outputs tbody", this.outputNumber);
				}
				else{
					var outputJSON = {"class":"","id":"","label":"","dataType":"","properties":"","source":[]};
					outputJSON.class = $( "#f_inputOutputTab_outputClass" ).val();
					outputJSON.id = $( "#f_inputOutputTab_outputId" ).val();
					outputJSON.label = $( "#f_inputOutputTab_outputLabel" ).val();
					outputJSON.dataType = $( "#f_inputOutputTab_outputDataType" ).val();
					// outputJSON.properties = $( "#f_inputOutputTab_outputProperties" ).val();
					
					if(!this.ioExists(outputJSON, this.funcDescJSON.outputs)){
						this.funcDescJSON.outputs.push(outputJSON);
						this.inputAndOutputAppender(outputJSON, "f_inputOutputTab_outputs tbody", this.funcDescJSON.outputs.length);
					}
				}
				this.clearOutputs();
			},
			addNonFunctional: function addNonFunctional(){
				if(this.NFedit){
					this.resultJSON.nonFunctionalDescription[this.NFnumber].weight = $( "#f_nonFunctionalDescriptionTab_weight" ).val();
					this.resultJSON.nonFunctionalDescription[this.NFnumber].name = $( "#f_nonFunctionalDescriptionTab_name" ).val();
					this.resultJSON.nonFunctionalDescription[this.NFnumber].relation = $( "#f_nonFunctionalDescriptionTab_relation" ).val();
					this.resultJSON.nonFunctionalDescription[this.NFnumber].unit = $( "#f_nonFunctionalDescriptionTab_unit" ).val();
					this.resultJSON.nonFunctionalDescription[this.NFnumber].value = $( "#f_nonFunctionalDescriptionTab_value" ).val();
					alert("Changes to nonfunctional property " + this.NFnumber + " were saved successfully.");
					
					this.rowRemover("f_nonFunctionalDescriptionTab_NFProps", this.NFrow+1);
					this.NFPropsAppender(this.resultJSON.nonFunctionalDescription[this.NFnumber], this.NFnumber);
				}
				else{
					var nonFuncDescJSON = {"weight":"","name":"","relation":"","unit":"","value":""};
					nonFuncDescJSON.weight = $( "#f_nonFunctionalDescriptionTab_weight" ).val();
					nonFuncDescJSON.name = $( "#f_nonFunctionalDescriptionTab_name" ).val();
					nonFuncDescJSON.relation = $( "#f_nonFunctionalDescriptionTab_relation" ).val();
					nonFuncDescJSON.unit = $( "#f_nonFunctionalDescriptionTab_unit" ).val();
					nonFuncDescJSON.value = $( "#f_nonFunctionalDescriptionTab_value" ).val();
					
					if(!this.nonFuncExists(nonFuncDescJSON, this.resultJSON.nonFunctionalDescription)){
						this.resultJSON.nonFunctionalDescription.push(nonFuncDescJSON);
						this.NFPropsAppender(nonFuncDescJSON, this.resultJSON.nonFunctionalDescription.length);
					}
				}
				this.clearNF();
			},
			resetAll: function resetAll(){
				this.cleanForm();
				this.clearNF();
				this.clearInputs();
				this.clearOutputs();
			},
			//TO NIE PARTYZANTKA, TO PARTYZANA!
			editInput: function editInput(input){
				// $( "#f_inputOutputTab_inputProperties" ).val(input.parent().prev().text());
				$( "#f_inputOutputTab_inputDataType" ).val(input.parent().prev().prev().text());
				$( "#f_inputOutputTab_inputClass" ).val(input.parent().prev().prev().prev().text());
				$( "#f_inputOutputTab_inputLabel" ).val(input.parent().prev().prev().prev().prev().text());
				$( "#f_inputOutputTab_inputId" ).val(input.parent().prev().prev().prev().prev().prev().text());
				this.inputNumber = this.ioExistsIndex($( "#f_inputOutputTab_inputId" ).val(), this.funcDescJSON.inputs);
				this.inputEdit = true;
				this.inputRow = input.parent().parent().parent().children().index(input.parent().parent());
			},
			editOutput: function editOutput(output){
				// $( "#f_inputOutputTab_outputProperties" ).val(output.parent().prev().text());
				$( "#f_inputOutputTab_outputDataType" ).val(output.parent().prev().prev().text());
				$( "#f_inputOutputTab_outputClass" ).val(output.parent().prev().prev().prev().text());
				$( "#f_inputOutputTab_outputLabel" ).val(output.parent().prev().prev().prev().prev().text());
				$( "#f_inputOutputTab_outputId" ).val(output.parent().prev().prev().prev().prev().prev().text());
				this.outputNumber = this.ioExistsIndex($( "#f_inputOutputTab_outputId" ).val(), this.funcDescJSON.outputs);
				this.outputEdit = true;
				this.outputRow = output.parent().parent().parent().children().index(output.parent().parent());
			},
			editNonFunc: function editNonFunc(nfProp){
				$( "#f_nonFunctionalDescriptionTab_weight" ).val(nfProp.parent().prev().prev().prev().prev().prev().text());
				$( "#f_nonFunctionalDescriptionTab_name" ).val(nfProp.parent().prev().prev().prev().prev().text());
				$( "#f_nonFunctionalDescriptionTab_relation" ).val(nfProp.parent().prev().prev().prev().text());
				$( "#f_nonFunctionalDescriptionTab_unit" ).val(nfProp.parent().prev().prev().text());
				$( "#f_nonFunctionalDescriptionTab_value" ).val(nfProp.parent().prev().text());
				this.NFnumber = this.nonFuncExistsIndex($( "#f_nonFunctionalDescriptionTab_name" ).val(), this.resultJSON.nonFunctionalDescription);
				this.NFedit = true;
				this.NFrow = nfProp.parent().parent().parent().children().index(nfProp.parent().parent());
			},
			removeInput: function removeInput(input){
				var index = this.ioExistsIndex(input.parent().prev().prev().prev().prev().prev().text(), this.funcDescJSON.inputs);
				this.funcDescJSON.inputs.splice(index, 1);
				input.parent().parent().remove();
			},
			removeOutput: function removeOutput(output){
				var index = this.ioExistsIndex(output.parent().prev().prev().prev().prev().prev().text(), this.funcDescJSON.outputs);
				this.funcDescJSON.outputs.splice(index, 1);
				output.parent().parent().remove();
			},
			removeNonFunc: function removeNonFunc(nfProp){
				var index = this.nonFuncExistsIndex(nfProp.parent().prev().prev().prev().prev().text(), this.resultJSON.nonFunctionalDescription);
				this.resultJSON.nonFunctionalDescription.splice(index, 1);
				nfProp.parent().parent().remove();
			},
			removeServiceClass: function removeServiceClass(serviceClass){
				var id = serviceClass.attr("id").split("_").pop();
				var index = this.stringExistsIndex(id, this.funcDescJSON.serviceClasses);
				this.funcDescJSON.serviceClasses.splice(index, 1);
				serviceClass.remove();
			},
			// removeMetaKeyword: function removeMetaKeyword(metaKeyword){
			// 	var id = metaKeyword.attr("id").split("_").pop();
			// 	var index = this.stringExistsIndex(id, funcDescJSON.metaKeywords);
			// 	funcDescJSON.metaKeywords.splice(index, 1);
			// 	metaKeyword.remove();
			// },
			// removeSource: function removeSource(source){
			// 	var id = source.attr("id").split("_").pop();
			// 	var index = this.stringExistsIndex(id, this.resultJSON.sources);
			// 	this.resultJSON.sources.splice(index, 1);
			// 	source.remove();
			// },

			//w tym jest bezczelna partyzantka - dopóki nie znajdę sposobu na uzyskanie referencji do 
			//$('#physicalDescriptionTab'), mając tylko id taba
			//var index = jQuery('#tabs').data('tabs').options.selected; 
			//
			nextTab: function nextTab(){
				var selected = $tabs.tabs('option', 'selected');
				if(selected==0 && $('#physicalDescriptionTab').hasClass("ui-tabs-hide")) selected++;
				if(selected < 3) $tabs.tabs('select', selected+1);
			},
			previousTab: function previousTab(){
				var selected = $tabs.tabs('option', 'selected');
				if(selected==2 && $('#physicalDescriptionTab').hasClass("ui-tabs-hide")) selected--;
				if(selected > 0) $tabs.tabs('select', selected-1);
			}
			/*
			* EVENT HANDLERS END HERE
			*/
		};

		//SUBMITY			
		$("#f_button_sumbitAllButton").button().click(function() {
			result.submitAll();
		});
		//preventDefault() w tych submitach zapobiega zamknięciu całego formularza po submitnieciu czegokolwiek
		$("#f_button_addServiceClass").button().click(
			function(event) {
				event.preventDefault();
				result.addServiceClass();
			}
		);
		$("#f_button_addMetaKeyword").button().click(
			function(event) {
				event.preventDefault();
				result.addMetaKeyword();
			}
		);
		$("#f_button_addSource").button().click(
			function(event) {
				event.preventDefault();
				result.addSource();
			}
		);
		$("#f_button_addInputButton").button().click(
			function(event) {
				event.preventDefault();
				result.addInput();
			}
		);
		$("#f_button_addOutputButton").button().click(
			function(event) {
				event.preventDefault();
				result.addOutput();		
			}
		);
		$("#f_button_addNonFunctional").button().click(
			function(event) {
				event.preventDefault();
				result.addNonFunctional();
			}
		);
		//RESETY
		$("#f_button_resetAllButton").button().click(
			function(event) {
				event.preventDefault();
				if(confirm("You are about to clear the entire form. Are you sure?"))
					if(confirm("You will lose all data and this action cannot be cancelled. Do you really want to do this?")){
						alert("FINE.");
						result.resetAll();
					}
			}
		);
		$("#f_button_clearNonFunctional").button().click(
			function(event) {
				event.preventDefault();
				result.clearNF();
			}
		);		
		$("#f_button_clearInputButton").button().click(
			function(event) {
				event.preventDefault();
				result.clearInputs();
			}
		);		
		$("#f_button_clearOutputButton").button().click(
			function(event) {
				event.preventDefault();
				result.clearOutputs();
			}
		);
		$("#f_mainTab_moar").click(
			function(event) {
				var input = $("#f_mainTab_description");
				if(this.innerHTML=="more..."){
					input.attr({'rows': 2, 'cols': '40'}).css({'width': '270px', 'height': '40px'}).parent().attr("colspan", 2);
					this.innerHTML = "less...";
				}
				else{
					input.attr({'rows': '1', 'cols': '20'}).css({'width': '135px', 'height': '20px'}).parent().attr("colspan", 1);
					this.innerHTML = "more...";					
				}
			}
		);
		//Next/Back
		$('button[id$="Tab_nextButton"]').button().click(function() {
				result.nextTab();
			}
		);
		$('button[id$="Tab_backButton"]').button().click(function() {
				result.previousTab();
			}
		);
		//EDITY i DELETY w tabelkach z i/o oraz non func
		$('button[id^="NFedit"]').live("click", function(form){
			return (function(){
				form.editNonFunc($(this));
			});
		}(result));
		$('button[id^="NFdel"]').live("click", function(form){
			return (function(){
				form.removeNonFunc($(this));
			});
		}(result));
		$('button[id^="f_inputOutputTab_inputsedit"]').live("click", function(form){
			return (function(){
				form.editInput($(this));
			});
		}(result));
		$('button[id^="f_inputOutputTab_inputsdel"]').live("click", function(form){
			return (function(){
				form.removeInput($(this));
			});
		}(result));
		$('button[id^="f_inputOutputTab_outputsedit"]').live("click", function(form){
			return (function(){
				form.editOutput($(this));
			});
		}(result));
		$('button[id^="f_inputOutputTab_outputsdel"]').live("click", function(form){
			return (function(){
				form.removeOutput($(this));
			});
		}(result));
		//spany z source'ami, service classes i meta keywords
		// $('span[id^="src_"]').live("click", function(form){
		// 	return (function(){
		// 		form.removeSource($(this));
		// 	});
		// }(result));
		$('span[id^="sc_"]').live("click", function(form){
			return (function(){
				form.removeServiceClass($(this));
			});
		}(result));
		// $('span[id^="mk_"]').live("click", function(form){
		// 	return (function(){
		// 		form.removeMetaKeyword($(this));
		// 	});
		// }(result));

		return result;
	};
	function nodeVisualizator(view){
		var outputObject = {
			color : {
				service : "#fbec88",
				functionality: "#fbec88"
			},
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
					updateNode : function updateNode(){
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
				newNode.serviceName = node.physicalDescription.serviceName;
				newNode.set = view.paper.set();
				//TU BYDEM DZIABAŁ [Błażej] (Porządkowanie wyświetlania data flow)
				newNode.inputs = [];
				$.each(node.functionalDescription.inputs, function(){
					newNode.inputs.push( $.extend(true, {}, this) );
				});
				newNode.outputs = [];
				$.each(node.functionalDescription.outputs, function(){
					newNode.outputs.push( $.extend(true, {}, this) );
				});
				console.log(newNode.id, newNode.inputs, newNode.outputs);

				visualizedNode = ( this["draw_"+nodeType+"Node"] || this.draw_unknownNode )(newNode) ;

				this.addTooltips(visualizedNode);

				return visualizedNode;
			},
			draw_controlNode : function draw_controlNode(node){
				node.x = node.x+130/2+node.r/2;
				node.y = node.y+node.r;
				var c = view.paper.circle(node.x, node.y, node.r).attr({fill: "white"}),
					label = view.paper.text(node.x, node.y-20, node.id).attr("fill", "#333"),
					input_length, output_length, i_tab = [], o_tab = [],
					multX = 1, multY = 1, x1, y1, x2, y2
					;
				node.mainShape = c;
				node.raph_label = label;


				node.raph_label.dblclick(function(){
					gui.controler.reactOnEvent("EditNode", {nodeId: node.id});
				})

				input_length = node.inputs.length;
				output_length = node.outputs.length;

				//obliczanie punktów na okręgu
				x1 = (node.x+node.r) - 10;
				y1 = Math.sqrt(Math.abs(node.r*node.r - (x1 - node.x)*(x1 - node.x) - (node.y*node.y - 2*node.y)));
				x2 = Math.abs(x1-node.x); y2 = Math.abs(y1-node.y);
				// alert(node.x + ":" + node.y + ":" + x1 + ":" + y1 + ":" + x2 + ":" + y2)

				var currIO;
				for(var k = 0; k < input_length; k++){
					currIO = node.inputs[k];
					if(k < 4){
						multX = ((k % 2) === 0) ? -1 : 1;
						multY = (k < 2) ? 1 : -1;
						currIO.node = view.paper.path("M " + parseInt(node.x+(x2*multX)+((multX>0) ? 7+k : -15-k)) + " " + parseInt(node.y+(y2*multY)) + " l 0 10 l 10 0 l 0 -10 l -5 5 z").attr({'fill':"white"});
						currIO.node.node.setAttribute("class", node.id+" input "+currIO.id);
					}
					else{
						multX = ((k % 2) === 0) ? -1 : 1;
						multY = (k < 6) ? 1 : -1;
						currIO.node = view.paper.path("M " + parseInt(node.x+(y2*multX)+((multX>0) ? 7+k : -15-k)) + " " + parseInt(node.y+(x2*multY)) + " l 0 10 l 10 0 l 0 -10 l -5 5 z").attr({'fill':"white"});
						currIO.node.node.setAttribute("class", node.id+" input "+currIO.id);
					}
				}
				multX = 1; multY = 1;
				for(var l = 0; l < output_length; l++){
					currIO = node.outputs[l];
					if(l < 4){
						multX = ((l % 2) === 0) ? -1 : 1;
						multY = (l < 2) ? 1 : -1;
						currIO.node = view.paper.path("M " + parseInt(node.x+(x2*multX)+((multX>0) ? 7+l : -15-l)) + " " + parseInt(node.y+(y2*multY)) + " l 10 0 l 0 -5 l -5 -5 l -5 5 z").attr({'fill':"white"});
						currIO.node.node.setAttribute("class", node.id+" output "+currIO.id);
					}
					else{
						multX = ((l % 2) === 0) ? -1 : 1;
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
			draw_serviceNode : function draw_serviceNode(node, paper, drawNotForRepo){
				// if(!drawNotForRepo)
				// 	a(node.id)
				var id = node.id,
					radius = 4,
					paper = paper || view.paper,
					rect = paper.rect(node.x, node.y, node.width, node.height, 5).attr("fill", "#fbec88"),
					label = paper.text(node.x + node.width/2, node.y + 10, node.label),
					img_gear = paper.image("images/img.png", node.x + node.width-17, node.y+2, 15, 15),
					i, j, k, l,
					input_length, output_length,
					iDist, oDist,
					serviceName = node.serviceName,
					shortenServiceName,
					serviceNameShown,
					maxLength = 25
				;
				node.mainShape = rect;
				node.raph_label = label;
								
				img_gear.node.setAttribute("class", id+" gear");
				img_gear.click(function(){
					gui.controler.reactOnEvent("EditNode", {nodeId: id});
				});
				
				node.mainShape.node.setAttribute("class", id);
				
				label.node.removeAttribute("style");
				label.node.removeAttribute("text");
				label.node.setAttribute("class", id+" label");				
			
				input_length = node.inputs.length;
				output_length = node.outputs.length;

				iDist = node.width/(input_length+1);
				oDist = node.width/(output_length+1);

				for(var k = 0; k < input_length; k++){
					node.inputs[k].node = paper.path("M " + parseInt(node.x+(k+1)*iDist) + " " + parseInt(node.y-10) + " l 0 10 l 10 0 l 0 -10 l -5 5 z").attr({'fill':"#fbec88"});
					node.inputs[k].node.node.setAttribute("class", node.id+" input " + node.inputs[k].id);
				}
				for(var l = 0; l < output_length; l++){
					node.outputs[l].node = paper.path("M " + parseInt(node.x+(l+1)*oDist) + " " + parseInt(node.y+node.height) + " l 0 5 l 5 5 l 5 -5 l 0 -5 z").attr({'fill':"#fbec88"});
					node.outputs[l].node.node.setAttribute("class", node.id+" output " + node.outputs[l].id);
				}

				if(!drawNotForRepo){
					var img_subgraph = paper.image("images/subgraph.png", node.x + 3, node.y+5, 20, 20).attr("title", "subgraph");
					img_subgraph.node.setAttribute("class", id+" subgraph");
					img_subgraph.dblclick(function(){
						// a("subgraph");
						gui.controler.reactOnEvent("SwitchCurrentGraph", {nodeId: id});
					});

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
					view.dragDFArrow(node.outputs.map(function(o){ return o.node; }), node);
				}

				node.set.push(rect, label, img_gear, img_subgraph, serviceNameShown);
				
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
				node.raph_label = label;

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
				img_gear.click(function(){
					gui.controler.reactOnEvent("EditNode", {nodeId: id});
				})
				
				node.mainShape.node.setAttribute("class", id);
				
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
			},
			addTooltips : function addTooltips(visualizedNode){
				function close(){
					view.tooltip.close();
				}
				$.each(visualizedNode.inputs, function(){
					this.description = visualizedNode.prepareDescriptionForInput(this.id);
					this.node.mouseover(
						(function(that){
							return function(evt, x, y){
								view.tooltip.open(visualizedNode.label+": "+that.id, that.description, x, y, evt);
							};
						})(this)
					).mouseout(close)
					;
				});
				$.each(visualizedNode.outputs, function(){
					this.description = visualizedNode.prepareDescriptionForOutput(this.id);
					this.node.mouseover(
						(function(that){
							return function(evt, x, y){
								view.tooltip.open(visualizedNode.label+": "+that.id, that.description, x, y, evt);
							};
						})(this)
					).mouseout(close)
					;
				});

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

		return outputObject;
	};
	
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
			this.form.initToEdit(node);
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
		addBlankNode : function addBlankNode(nodeInfo){
			this.form.initBlank(nodeInfo);
		},
		addNodeFromRepo : function addNodeFromRepo(node){
			//dodać lepiej dobierane parametry x, y
			var visualizedNode = this.visualiser.visualiseNode( node );
			if(visualizedNode)
				this.current_graph_view.nodes.push( visualizedNode.switchMode(this.mode) );
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

							gui.controler.reactOnEvent("NodeMoved");
						}
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

				if(getType(element) === "array"){
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
				offsetX,
				offsetY,
				sourceNode,
				bbox,
				start = function start(){
					if(gui.view.mode === "CF"){
						var canvas = $(gui.view.paper.canvas);
						offsetX = parseInt(canvas.offset().left) + parseInt(canvas.css("border-top-width"));
						offsetY = parseInt(canvas.offset().top) + parseInt(canvas.css("border-left-width"));
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
						// to  to jest dopuki błażej nie poprawi czegośtam u siebie
						arrow = gui.view.paper.arrow(cx, cy, event.clientX-offsetX + window.scrollX, event.clientY - offsetY + window.scrollY , 4);
						arrow[0].attr({"stroke-dasharray": ["--"]});
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

						var targetNode = gui.view.getNodesInsideRect(event.clientX-offsetX + window.scrollX, event.clientY - offsetY + window.scrollY);
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
				start = function start(){
					offsetX = parseInt(canvas.offset().left) + parseInt(canvas.css("border-top-width"));
					offsetY = parseInt(canvas.offset().top) + parseInt(canvas.css("border-left-width"));
					bbox = this.getBBox();
					cx = (bbox.x + bbox.x2) / 2;
					cy = (bbox.y + bbox.y2) / 2;
					sourceNode = outputView.getNodeById(this.node.classList[0]);
					output = sourceNode.getOutputById(this.node.classList[2]);

					$.each(gui.view.current_graph_view.nodes, function(i, v){
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
					// console.clear()
					// console.log(event.clientX, event.clientY);
					// paper.rect(event.clientX-offsetX, event.clientY-offsetY, 1, 1);
					// to  to jest dopuki błażej nie poprawi czegośtam u siebie
					arrow = paper.arrow(cx, cy, event.clientX-offsetX + window.scrollX, event.clientY - offsetY + window.scrollY , 4);
					arrow[0].attr({"stroke-dasharray": ["--"]});
				},
				stop = function stop(event){
					try {
						arrow[0].remove();
						arrow[1].remove();
					} catch(e){
						// console.log(e);
					}

					var resultObj = gui.view.getInputByPosition(event.clientX-offsetX + window.scrollX, event.clientY - offsetY + window.scrollY );
					// alert(resultObj)
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
			if(getType(element) === "array"){
				$.each(element, function(){
					// alert(this +":"+ this.getType());
					// console.log( this );
					this.drag(move, start, stop);
				})
			} else
				element.drag(move, start, stop);
		},
		addCFEdge : function addCFEdge(data, firstLoad){
			// console.log(data)
			var foundedEdge = (firstLoad ? false : this.getCFEdge(data.source.id, data.target.id));
			if(foundedEdge){
				gui.controler.reactOnEvent("error", "Prubujesz dodać krawędź, króta już istnieje.");
			}
			else {
				var edgeObject = {
					arrow : undefined,
					source : data.source,
					target : data.target,
					view : this,
					type: "CF",
					toString : function toString(){
						return "SSDL_CFEdge object";
					},
					hide: function hide(){
						this.arrow[0].hide();
						this.arrow[1].hide();
					},
					show: function show(){
						this.arrow[0].myShow(300);
						this.arrow[1].myShow(300);
					},
					remove : function remove(){
						this.arrow[0].remove();
						this.arrow[1].remove();
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
				return edgeObject;
			}
		},
		addDFEdge : function addDFEdge(data, firstLoad){
			//source, sourceOutputId
			//target, targetInputId
			// console.log(data)
			var foundedDFEdge = (firstLoad ? false : this.getDFEdge(data.sourceId, data.targetId, data.output.id, data.input.id));
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
						toString : function toString(){
							return "SSDL_CFEdge object";
						},
						hide: function hide(){
							this.arrow[0].hide();
							this.arrow[1].hide();
						},
						show: function show(){
							this.arrow[0].myShow(300);
							this.arrow[1].myShow(300);
						},
						remove : function remove(){
							this.arrow[0].remove();
							this.arrow[1].remove();
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
			var result = false;
			$.each(this.current_graph_view.edgesDF, function(){
				if(this.targetId === nodeId && this.input.id === inputId){
					result = true;
					return false;
				}
			});

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
				gui.error("you have to run init() function first");
			}
			else {
				var paper = this.paper,
					that = this,
					type,
					visualizedNode,
					tmp
				;

				try{
					var deployerOutput = gui.controler.deploy(graph_json, paper.width);
				} catch(e){
					console.error();
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
	
			//obsługa formularza, rzeczy z JQuery UI - to tutaj??? czy w controler.js???
			$("#form").dialog({
				autoOpen: false,
				modal: true,
				height: 500,
				width: 700
			});
			$("#functionalAcc1")
				.accordion({ 
					active: false,
					collapsible: true,
					header: "h3" 
			});
			$("#functionalAcc2")
				.accordion({ 
					active: false,
					collapsible: true,
					header: "h3" 
			});
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
			$.each(this.current_graph_view.nodes, function(k, v){
				v.highlight2();
			});
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
				loopControler = true;
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
						loopControler = false;
						return false;
					}
				});

				return loopControler;
			});

			return result;
		},
		removeNode : function removeNode(id){
			$.each(this.current_graph_view.nodes, function(k, v){
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
		removeCurrentGraph : function showCurrentGraph(){
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
		removeAllGraphs : function showCurrentGraph(){
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
				edgesDF : []
			};
		},
		setBlankGraphAsCurrent : function setBlankGraphAsCurrent(){
			this.current_graph_view = this.getBlankGraph();
		}
	}
	outputView.init();
	outputView.tooltip = tooltipper();
	outputView.visualiser = nodeVisualizator(outputView);
	outputView.bottomBar = drawBottomBar(outputView.paper);
	outputView.form = form();
	outputView.blankNodes = blankNode();

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
				

			// TUTAJ POWINNO BYC WYSÅ?ANIE EVENTU DO KONTROLERA Z 4MA WSP??“Å?Å»Ä?DNYMI
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
				
				// TUTAJ POWINNO BYÄ† WYSÅ?ANIE EVENTU DO KONTROLERA Z SELEKTEM
				
				gui.controler.reactOnEvent("SELECT", {
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
