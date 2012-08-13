//toDo
// done // walidacja, edycja, json2ssdl, startstop

// toDo globalParams:
// szerokość node-a,
// wysokość node-a,

"use strict";
var c = -1;
var rozmieszczenie = [247, 33, 247, 234, 174, 77, 175, 147];
function View(id, width, height, gui){
	var pf = gui.id_postfix;
	
	// suppported by Matka Boska Partyzantcka 
function menu(x, y, addToDiv) {
	var mainMenu = {
		przesuwne: 0,
		clicked: false,
		menuContener: $("<div id='menuContener' style='top:" + y + "px; left:" + x + "px; position:absolute; z-index:1000; text-align:center;  width:100%;font-weight:bold; height:30px;'> </div>").appendTo('#'+addToDiv),

		addGroup: function addGroup(label) {

			$("<div id=" + label + " class=menuGroup style=' background-repeat:repeat-x; background-image: url(images/dropdown-bg.gif); cursor:default; top:0px; color:white; padding: 5px 0px 0px 0px; text-align:center; font-family:Sans-serif; float:left; font-size:11px; height:16px; width:90px; left:" + mainMenu.przesuwne + "'>" + label + "</div>").appendTo('#menuContener').mouseenter(function() {

				if (mainMenu.clicked) {
					
					$('div.contener').hide();
					$('div.subcontener').hide();
					$('#' + label + '_contener').show();
					$('div.menuGroup').css('background-image', 'url("images/dropdown-bg.gif")');

				}
				$('#' + label).css('background-image', 'url("images/dropdown-bg-hover.gif")');
			}).mouseleave(function() {
				if (mainMenu.clicked == false) $('#' + label).css('background-image', 'url("images/dropdown-bg.gif")')
			}).click(function() {
				if (mainMenu.clicked) {
					$('div.contener').hide();
					mainMenu.clicked = !mainMenu.clicked;
				} else {
					outputView.menuList.getInstance().secure();
					$('#' + label).css('background-image', 'url("images/dropdown-bg-hover.gif")');
					$('div.contener').hide();
					$('#' + label + '_contener').show();
					mainMenu.clicked = !mainMenu.clicked;
				}


			});

			$("<div id=" + label + "_contener" + " class=contener style='box-shadow: inset 0 0 2px #ffffff; top:21px; position:absolute; width:auto;height:auto;cursor:default; background-image :url(images/dropdown-list-bg.gif); background-repeat:repeat-x; left:" + mainMenu.przesuwne + "px'></div>").appendTo('#menuContener').hide();
			mainMenu.przesuwne = mainMenu.przesuwne + $('#' + label).width();
		},

		addOption: function addOption(groupLabel, optionLabel, functionOnClick, shortcutString) {


			$("<div id=" + groupLabel + "_" + optionLabel.replace(/ /g, "_") + " class=" + groupLabel + 'Option' + " style=' cursor=default; color:white; top:0px; padding:5px 0px 5px 10px; text-align:left; font-size:11px; width:auto; font-family:Sans-serif; height:14px; left=" + $('#' + groupLabel).position().left + "'>" + optionLabel + " </div>").appendTo('#' + groupLabel + '_contener').mouseenter(function() {
				$('div.subcontener').hide();
				var y = $('#'+ groupLabel + "_" + optionLabel.replace(/ /g, "_")).offset().top-$('#menuContener').offset().top;
				$('#' + groupLabel + '_' + optionLabel.replace(/ /g, "_") + '_subcontener').css("top", y);
				var x = parseInt($('#'+ groupLabel + "_" + optionLabel.replace(/ /g, "_")).offset().left) - parseInt($('#menuContener').offset().left) + parseInt($('#'+ groupLabel + "_" + optionLabel.replace(/ /g, "_")).css("width")) +10  ;
				$('#' + groupLabel + '_' + optionLabel.replace(/ /g, "_") + '_subcontener').css("left", x);
				$('#' + groupLabel + '_' + optionLabel.replace(/ /g, "_")+ '_subcontener').show();
				$(this).css('background-image', 'url("images/dropdown-bg-hover.gif")');
			}).mouseleave(function() {
				$(this).css('background-image', "none");
			}).click(function() {
				$('div.contener').hide();
				$('div.menuGroup').css('background-image', 'url("images/dropdown-bg.gif")');
				mainMenu.clicked = false;
			}).click(functionOnClick);

			jQuery('<span/>', {
				html: "&nbsp &nbsp &nbsp &nbsp" + shortcutString,
				css: {
					fontSize : '9px',
					color: 'rgba(255,255,255,0.7)',
					float: 'right',
					textAlign: "right",
					padding: "3px 10px 0px 0px"
				},

			}).appendTo($('#' + groupLabel + '_' + optionLabel.replace(/ /g, "_")));
		},

		addSubOption: function addSubOption(groupLabel, optionLabel, subOptionLabel, functionOnClick, shortcutString) {
			/*
				wejdź do grupy
				wejdź do opcji
				jeżeli nie ma kontenera - stwórz go
				wstaw podopcję do opcji
			*/

			//var x = $('#' + groupLabel + "_" + optionLabel.replace(/ /g, "_")).position().left + parseInt($('#' + groupLabel + "_" + optionLabel.replace(/ /g, "_")).css("width"));
			// var y = $('#' + groupLabel + "_" + optionLabel.replace(/ /g, "_")).position().top;

			if ($('#' + groupLabel + '_' + optionLabel.replace(/ /g, "_") + "_subcontener").length == 0) {
				$("<div id=" + groupLabel + "_" + optionLabel.replace(/ /g, "_") + "_subcontener" + " class=subcontener style='box-shadow: inset 0 0 2px #ffffff;position:absolute;width:auto;height:auto;cursor:default; background-image :url(images/dropdown-list-bg.gif); background-repeat:repeat-x;left:150'></div>").appendTo('#menuContener').hide();

			jQuery('<span/>', {
				html: "&nbsp &nbsp &nbsp &nbsp" +'<img src="images/gtk-media-play-ltr.png" width="10"/> ' ,
				css: {
					float: 'right',
					padding: "3px 0px 0px 0px"
				},

			}).appendTo($('#'+groupLabel + "_" + optionLabel.replace(/ /g, "_")));
			}
			$("<div id=" + groupLabel + "_" + optionLabel.replace(/ /g, "_") + "_" + subOptionLabel.replace(/ /g, "_") + " class=" + groupLabel + 'Option' + " style=' cursor:default; color:white; padding:5px 0px 5px 10px; text-align:left; font-size:11px; width:auto; font-family:Sans-serif; height:14px; left=" + $('#' + groupLabel).position().left + "'>" + subOptionLabel + " </div>").appendTo($('#' + groupLabel + '_' + optionLabel.replace(/ /g, "_") + "_subcontener")).mouseenter(function() {
				$(this).css('background-image', 'url("images/dropdown-bg-hover.gif")');
			}).mouseleave(function() {
				$(this).css('background-image', "none");
			}).click(function() {
				$('div.contener').hide();
				$('div.subcontener').hide();
				$('div.menuGroup').css('background-image', 'url("images/dropdown-bg.gif")');
				mainMenu.clicked = false;
			}).click(functionOnClick);

			jQuery('<span/>', {
				html: "&nbsp &nbsp &nbsp &nbsp" + shortcutString,
				css: {
					fontSize:'9px',
					color: 'rgba(255,255,255,0.7)',
					float: 'right',
					textAlign: "right",
					padding: "2px 10px 0px 0px"
				},

			}).appendTo($('#' + groupLabel + '_' + optionLabel.replace(/ /g, "_") + "_" + subOptionLabel.replace(/ /g, "_")));
		},


		addSeparator: function addSeparator(groupLabel) {
			$("<hr id=" + groupLabel + "_sep" + "style='height:1px; color:gray; box-shadow:1px 1px 1px #888'></hr>").appendTo('#' + groupLabel + '_contener');
		},
		hideGroup: function hideGroup(groupLabel) {
			$('#' + groupLabel).hide();
		},

		showGroup: function showGroup(groupLabel) {
			$('#' + groupLabel).show();
		},


		hideOption: function hideOption(groupLabel, optionLabel) {
			$('#' + groupLabel + '_' + optionLabel.replace(/ /g, "_")).hide();

		},

		hidesubOption: function hidesubOption(groupLabel, optionLabel, subOptionLabel) {
			$('#' + groupLabel + '_' + optionLabel.replace(/ /g, "_") + "_" + subOptionLabel.replace(/ /g, "_")).hide();
		},

		showOption: function showOption(groupLabel, optionLabel) {
			$('#' + groupLabel + '_' + optionLabel.replace(/ /g, "_")).show();

		},
		close: function close(){
			mainMenu.clicked = false;
			$('div.contener').hide();
			$('div.subcontener').hide();
			$('div.menuGroup').css('background-image', 'url("images/dropdown-bg.gif")');

		}

	};

	return mainMenu;	
};
	function tooltipper() {
		var opacity = .95,
			tooltip = {
				tipContener : undefined,
				tipTitle : undefined,
				tipText : undefined,
				visible: false,
				init: function init() {
					var x = 10,
						y = 10,
						win = $(window)
					;

					x = ( x + this.width > win.width() ? win.width() - 1.1 * this.width : x );
					y = ( y + this.height > win.height() ? win.height() - 1.1 * this.height : y );
					
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
		//UÅ»YCIE WTYCZKI:
		//ma defaultowo zdefiniowane buttony CF, DF i SS
		//addGroup(label) dodaje grupÄ™ o zadanym labelu
		//addOption(groupLabel, label, function, description) dodaje button o zadanym labelu do 
		//grupy o zadanym groupLabel. Function zostaje przypisane na click(), description tak sobie jest.
		//Po dodaniu czegokolwiek nastÄ™puje automatyczne rozmieszczenie element�?³w na pasku.
		//Ukrywanie: getGroup(groupLabel).hideButton(label) albo getGroup(label).hideGroup()
		//Analogicznie pokazywanie elementu, PRZY CZYM:
		//- showGroup() pokazuje grupÄ™ wraz ze wszystkimi opcjami
		//- showOnlyGroup() pokazuje tylko grafikÄ™ grupy - uÅ¼ywane, gdy grupa znikÅ‚a w wyniku usuniÄ™cia
		//	ostatniego przycisku
		//UÅ¼yta technologia: Javascript, Raphael ^^
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
								//przesuniÄ™cie do punktu (x, y), nie o wektor [x, y], y = const.
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
							//arg nieobowiÄ…zkowy, jeÅ›li nie zostanie podany, czcionka zmniejszy siÄ™ o 2px 
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
					//fix dla buga powodujÄ…cego powstawanie niezniszczalnych separator�?³w, jeÅ¼eli
					//uÅ¼ytkownik ma otwarty pasek podczas hide'owania czegoÅ›
					//pytanie, czy ten fix jest potrzebny - czy ten bug ma szanse wystÄ…piÄ‡?
					$.each(this.separators, function(){
						this.hide();
					});

					this.separators = [];
					$.each(this.groups, function(){
						if(this.isVisible){
							this.moveGroupToX(sum);
							//to jest ciut partyzanckie, ale jak inaczej ominÄ…Ä‡ pierwszy separator?
							//czy teÅ¼ moÅ¼e chcemy pierwszy lub ostatni separator? ale po co?
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
					//arg: o ile pikseli zwiÄ™kszyÄ‡/zmniejszyÄ‡ czcionkÄ™ w label button�?³w, non-obligatory
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

		var editInputVariables = function editInputVariables(){
			gui.view.form.editInputVariables();
		}
		var editNonFunctionalParameters = function editNonFunctionalParameters(){
			gui.view.form.editGlobalNonFunctionalParameters();
		}

		result.invisibleBar = result.createBar(left, top, width, height);
		result.addGroup("Views");
		result.addOption("Views", "CF", switchMode("CF"), "ControlFlow");
		result.addOption("Views", "DF", switchMode("DF"), "DataFlow");
		result.addGroup("Edit");
		result.addOption("Edit", "StartStop", startStop, "Insert Start/Stop");
		result.addGroup("Graph Options");
		result.addOption("Graph Options", "Input Variables", editInputVariables, "editInputVariables");
		result.addOption("Graph Options", "NonFunctionalParameters", editNonFunctionalParameters, "editNonFunctionalParameters");

		result.set.push(result.invisibleBar, result.triangle1, result.triangle2);

		return result;
	};
	//sidescroller -> moved to library.js
	function form() {
		var formJSON = [
			{
				tabLabel:"main",
				tabId: "mainTab",
				formId: "mainForm",
				fields: [
				{
					label: "label",
					id: "f_mainTab_label",
					inputType: "textBox",
					validation: function(){},
					values:[]
				},
				{
					label: "description",
					id: "f_mainTab_description",
					inputType: "textArea",
					validation: function(){},
					values:[]
				},
				{
					label: "controlType",
					id: "f_mainTab_controlType",
					inputType: "select",
					validation: function(){},
					values:["#start", "#end"]
				},
				{
					label: "serviceClass",
					id: "f_mainTab_serviceClass",
					inputType: "textBox",
					validation: function(){},
					values:[]
				}
			]},
			{
				tabLabel:"service description",
				tabId: "physicalDescriptionTab",
				formId: "physDescForm",
				fields: [
				{
					label: "address",
					id: "f_physicalDescriptionTab_address",
					inputType: "textBox",
					validation: function(){},
					values:[]
				},
				{
					label: "serviceName",
					id: "f_physicalDescriptionTab_serviceName",
					inputType: "textBox",
					validation: function(){},
					values:[]
				},
				{
					label: "serviceGlobalId",
					id: "f_physicalDescriptionTab_serviceGlobalId",
					inputType: "textBox",
					validation: function(){},
					values:[]
				},
				{
					label: "operation",
					id: "f_physicalDescriptionTab_operation",
					inputType: "textBox",
					validation: function(){},
					values:[]
				}
			]},
			{
				tabLabel:"inputs",
				tabId: "inputsTab",
				formId: "inputForm",
				fields: [
				{
					label: "id",
					id: "f_inputsTab_id",
					inputType: "textBox",
					validation: function(){},
					values:[]
				},
				{
					label: "class",
					id: "f_inputsTab_class",
					inputType: "textBox",
					validation: function(){},
					values:[]
				},
				{
					label: "dataType",
					id: "f_inputsTab_dataType",
					inputType: "textBox",
					validation: function(){},
					values:[]
				}
				//,
				// {
				// 	label: "properties",
				// 	id: "f_inputsTab_properties",
				// 	inputType: "textBox",
				// 	validation: function(){},
				// 	values:[]
				// },
				// {
				// 	label: "source",
				// 	id: "f_inputsTab_source",
				// 	inputType: "textBox",
				// 	validation: function(){},
				// 	values:[]
				// }
			]},
			{
				tabLabel:"outputs",
				tabId: "outputsTab",
				formId: "outputForm",
				fields: [
				{
					label: "id",
					id: "f_outputsTab_id",
					inputType: "textBox",
					validation: function(){},
					values:[]
				},
				{
					label: "class",
					id: "f_outputsTab_class",
					inputType: "textBox",
					validation: function(){},
					values:[]
				},
				{
					label: "dataType",
					id: "f_outputsTab_dataType",
					inputType: "textBox",
					validation: function(){},
					values:[]
				}//,
				// {
				// 	label: "properties",
				// 	id: "f_outputsTab_properties",
				// 	inputType: "textBox",
				// 	validation: function(){},
				// 	values:[]
				// }
			]},
			{
				tabLabel:"non functional description",
				tabId: "nonFunctionalDescriptionTab",
				formId: "nonFuncDescForm",
				fields: [{
					label: "weight",
					id: "f_nonFunctionalDescriptionTab_weight",
					inputType: "textBox",
					validation: function(){},
					values:[]
				},
				{
					label: "name",
					id: "f_nonFunctionalDescriptionTab_name",
					inputType: "textBox",
					validation: function(){},
					values:[]
				},
				{
					label: "relation",
					id: "f_nonFunctionalDescriptionTab_relation",
					inputType: "textBox",
					validation: function(){},
					values:["eq", "gt", "le", "leq", "geq"]
				},
				{
					label: "unit",
					id: "f_nonFunctionalDescriptionTab_unit",
					inputType: "textBox",
					validation: function(){},
					values:[]
				},
				{
					label: "value",
					id: "f_nonFunctionalDescriptionTab_value",
					inputType: "textBox",
					validation: function(){},
					values:[]
				}
			]},
			{
				tabLabel:"",
				tabId: "",
				formId: "globalNonFuncDescForm",
				fields: [{
					label: "weight",
					id: "f_globalNonFunctionalDescription_weight",
					inputType: "textBox",
					validation: function(){},
					values:[]
				},
				{
					label: "name",
					id: "f_globalNonFunctionalDescription_name",
					inputType: "textBox",
					validation: function(){},
					values:[]
				},
				{
					label: "relation",
					id: "f_globalNonFunctionalDescription_relation",
					inputType: "textBox",
					validation: function(){},
					values:["eq", "gt", "le", "leq", "geq"]
				},
				{
					label: "unit",
					id: "f_globalNonFunctionalDescription_unit",
					inputType: "textBox",
					validation: function(){},
					values:[]
				},
				{
					label: "value",
					id: "f_globalNonFunctionalDescription_value",
					inputType: "textBox",
					validation: function(){},
					values:[]
				}
			]},
			{
				tabLabel:"",
				tabId: "",
				formId: "inputVariableForm",
				fields: [{
					label: "name",
					id: "f_inputVariable_name",
					inputType: "textBox",
					validation: function(){},
					values:[]
				},
				{
					label: "value",
					id: "f_inputVariable_value",
					inputType: "textBox",
					validation: function(){},
					values:[]
				},
				{
					label: "type",
					id: "f_inputVariable_type",
					inputType: "textBox",
					validation: function(){},
					values:[]
				}
			]},
		];		
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
		
		formAppender();
		$("#tabs-1").prepend(formGenerator("english", pf, formJSON[0]));	
		$("#tabs-2").prepend(formGenerator("english", pf, formJSON[1]));	
		$("#f_addInputForm").prepend(formGenerator("english", pf, formJSON[2]));	
		$("#f_addOutputForm").prepend(formGenerator("english", pf, formJSON[3]));	
		$("#f_addNFPropertyForm").prepend(formGenerator("english", pf, formJSON[4]));
		$("#f_addGlobalNFPropertyForm").prepend(formGenerator("english", pf, formJSON[5]));
		$("#f_addInputVariableForm").prepend(formGenerator("english", pf, formJSON[6]));
		$("#form").dialog({
			autoOpen: false,
			modal: true,
			height: 500,
			width: 700
		});
		var $tabs = $( "#tabs" ).tabs();

		// edit Włodek
		var inpVars = [],
			globalNonFuncDesc = []
		;

		var result = {
			resultJSON: resultJSON,
			physDescJSON: physDescJSON,
			funcDescJSON: funcDescJSON,
			selectedInputIndex: -1,
			selectedOutputIndex: -1,
			selectedNFPropertyIndex: -1,
			selectedInputVariableIndex: -1,
			selectedGlobalNFPropertyIndex: -1,

			// ============================================================================================================-    edit by Włodek

			// inpVar
			editInputVariables : function editInputVariables(){
				this.resetInpVars();
				this.appendInpVar(gui.controler.current_graphData.inputVariables);
				$("#f_inputVariablesForm").dialog("open");
			},
			resetInpVars : function resetInpVars(){
				inpVars = [];
				$( "#f_inputVariables tbody").html("");
			},
			appendInpVar : function appendInpVar(inpVar){
				// console.log(arguments)
				for( var v in inpVar ){
					inpVars.push(inpVar[v]);
					this.inputVariablesAppender(inpVar[v], v);
				}
			},
			inputVariablesAppender: function inputVariablesAppender(input, index){
				// console.log(arguments);
				var tempId = "f_inputVariables-" + index;
				$( "#f_inputVariables tbody").append( 
					"<tr id=\"" + tempId + "\" class=\"clickable\">" +
						"<td id=\"" + tempId + "_name\">" + input.name + "</td>" + 
						"<td id=\"" + tempId + "_value\">" + input.value + "</td>" + 
						"<td id=\"" + tempId + "_type\">" + input.type + "</td>" +
					"</tr>"
				);
			},
			removeInputVariable: function removeInputVariable(){
				var index = this.getSelectedInputVariableIndex();
				if(inpVars[index]){
					inpVars[index] = undefined;
					$( "#f_inputVariables-" + index).remove();
				}
				this.resetSelectedInputVariableIndex();
			},
			addInputVariable: function addInputVariable(){
				var inputVariableJSON = {"name":"","value":"","type":""},
					index = this.getSelectedInputVariableIndex();
				;

				// console.log("adasdas", index);

				inputVariableJSON.name = $( "#f_inputVariable_name_" + pf ).val();
				inputVariableJSON.value = $( "#f_inputVariable_value_" + pf ).val();
				inputVariableJSON.type = $("#f_inputVariable_type_" + pf).val();
				

				//TODO: checkIfExists(), ZAPISYWANIE JSONA GADEMYF
				if(index==-1){	//Index = -1 => dodajemy nowy inputVariable
					//TU jEST STAÅ?A 5 JAKO INDEKS I TO BEDZIE SYPAÄ† BÅ?Ä?DY
					this.inputVariablesAppender(inputVariableJSON, inpVars.length);//this.COKOLWIEK.inputVariables.length);

					inpVars[ inpVars.length ] = inputVariableJSON;

					$("#f_addInputVariableForm").dialog("close");
				}
				else{	//edytujemy istniejÄ…cy inputVariable
					var destinationId = "f_inputVariables-" + index;
					$("#" + destinationId + "_name").text(inputVariableJSON.name);
					$("#" + destinationId + "_value").text(inputVariableJSON.value);
					$("#" + destinationId + "_type").text(inputVariableJSON.type);

					inpVars[index] = inputVariableJSON;

					$("#f_addInputVariableForm").dialog("close");	
				}
			},
			// =====================================================
			// editNonFunctionalParameters
			editGlobalNonFunctionalParameters : function editNonFunctionalParameters(){
				this.resetGlobalNonFunDesc();
				this.appendGlobalNonFuncDesc(gui.controler.current_graphData.nonFunctionalParameters);
				$("#f_globalNFPropertiesForm").dialog("open");
			},
			resetGlobalNonFunDesc : function resetGlobalNonFunDesc(){
				inpVars = [];
				$( "#f_globalNFProps tbody").html("");
			},
			appendGlobalNonFuncDesc : function appendGlobalNonFuncDesc(globNonFuncDesc){
				console.log(globNonFuncDesc)
				for( var prop in globNonFuncDesc ){
					inpVars.push(globNonFuncDesc[prop]);
					this.globalNonFunPropsAppender(globNonFuncDesc[prop], prop);
				}				
			},
			globalNonFunPropsAppender: function globalNFPropsAppender(input, index){
				// console.log("input", input)
				var tempId = "f_globalNFProps-" + index;
				$( "#f_globalNFProps tbody").append( 
					"<tr id=\"" + tempId + "\" class=\"clickable\">" +
						"<td id=\"" + tempId + "_weight\">" + input.weight + "</td>" + 
						"<td id=\"" + tempId + "_name\">" + input.name + "</td>" + 
						"<td id=\"" + tempId + "_relation\">" + input.relation + "</td>" +
						"<td id=\"" + tempId + "_unit\">" + input.unit + "</td>" + 
						"<td id=\"" + tempId + "_value\">" + input.value + "</td>" +
					"</tr>" );
			},
			removeGlobalNonFunc: function removeNonFunc(nfProp){
				var index = this.getSelectedGlobalNFPropertyIndex();
				if(inpVars[index]){
					globalNonFuncDesc[index] = undefined;
					$( "#f_globalNFProps-" + index).remove();
				}

				this.resetSelectedGlobalNFPropertyIndex();
			},
			addGlobalNonFunctional: function addGlobalNonFunctionalVariable(){
				var nonFuncDescJSON = {"weight":"","name":"","relation":"","unit":"","value":""},
					index = this.getSelectedGlobalNFPropertyIndex();
					nonFuncDescJSON.weight = $( "#f_globalNonFunctionalDescription_weight_" + pf ).val();
					nonFuncDescJSON.name = $( "#f_globalNonFunctionalDescription_name_" + pf ).val();
					nonFuncDescJSON.relation = $( "#f_globalNonFunctionalDescription_relation_" + pf ).val();
					nonFuncDescJSON.unit = $( "#f_globalNonFunctionalDescription_unit_" + pf ).val();
					nonFuncDescJSON.value = $( "#f_globalNonFunctionalDescription_value_" + pf ).val();
				
				//TODO: checkIfExists(), ZAPISYWANIE JSONA GADEMYF
				if(index==-1){	//Index = -1 => dodajemy nowy NFProperty
					//TU jEST STAÅ?A 5 JAKO INDEKS I TO BEDZIE SYPAÄ† BÅ?Ä?DY
					this.globalNonFunPropsAppender(nonFuncDescJSON, globalNonFuncDesc.length);//this.COKOLWIEK.inputVariables.length);

					globalNonFuncDesc[ globalNonFuncDesc.length ] = nonFuncDescJSON;
					$("#f_addGlobalNFPropertyForm").dialog("close");
				}
				else{	//edytujemy istniejÄ…cy globalNFProperty
					globalNonFuncDesc[ index ] = nonFuncDescJSON;

					var destinationId = "f_globalNFProps-" + index;
					$("#" + destinationId + "_weight" ).text(nonFuncDescJSON.weight);
					$("#" + destinationId + "_name" ).text(nonFuncDescJSON.name);
					$("#" + destinationId + "_relation" ).text(nonFuncDescJSON.relation);
					$("#" + destinationId + "_unit" ).text(nonFuncDescJSON.unit);
					$("#" + destinationId + "_value" ).text(nonFuncDescJSON.value);
					$("#f_addGlobalNFPropertyForm").dialog("close");	
				}
			},
// ============================================================================================================-    ond of edit by Włodek
			
			initToEdit: function initToEdit(node){
				var titleText = 'Viewing a ' + node.nodeType + ' type node';
				this.clearErrors();
				this.cleanForm(true);
				$('#ui-dialog-title-form').text(titleText);
				$( "#f_mainTab_label_" + pf ).val(node.nodeLabel);
				$( "#f_mainTab_controlType_" + pf ).val(node.controlType);
				this.adjustForm(node.nodeType);
				$( "#f_mainTab_description" ).val(node.functionalDescription.description);
				$( "#f_physicalDescriptionTab_serviceName_" + pf ).val(node.physicalDescription.serviceName);
				$( "#f_physicalDescriptionTab_serviceGlobalId_" + pf ).val(node.physicalDescription.serviceGlobalId);
				$( "#f_physicalDescriptionTab_address_" + pf ).val(node.physicalDescription.address);
				$( "#f_physicalDescriptionTab_operation_" + pf ).val(node.physicalDescription.operation);
				
				this.appendList(node.functionalDescription.serviceClasses, "serviceClasses");
				this.appendList(node.functionalDescription.metaKeywords, "metaKeywords");
				this.appendIO(node.functionalDescription.inputs, "inputs");
				this.appendIO(node.functionalDescription.outputs, "outputs");
				this.appendNonFuncDesc(node.nonFunctionalDescription);
				this.resultJSON.nodeId = node.nodeId;
				this.resultJSON.nodeType = node.nodeType;
				$( "#form" ).dialog( "open" );
				
				//  pola obecnie nieuÅ¼ywane:
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
			},
			initBlank: function initBlank(nodeData){
				var titleText = "Create a " + nodeData.nodeType + " type node";
				this.clearErrors();
				this.cleanForm(true);
				this.resultJSON.nodeLabel = nodeData.label;
				this.resultJSON.nodeType = nodeData.nodeType;
				$('#ui-dialog-title-form').text(titleText);
				this.adjustForm(nodeData.nodeType);
				$( "#f_mainTab_label_" + pf ).val(nodeData.label);
				$( "#f_mainTab_nodeType_" + pf ).val(nodeData.nodeType);
				$( "#form" ).dialog( "open" );
			},
			adjustForm: function adjustForm(nodeType){
				switch(nodeType.toLowerCase()){
					case "control" : 
						$( 'label[for="f_mainTab_controlType_' + pf + '"], #f_mainTab_controlType_' + pf + ', #f_mainTab_controlType_validation_' + pf ).show();
						$('#physicalDescriptionTab').addClass("ui-tabs-hide");
						$('label[for="f_mainTab_serviceClass_' + pf + '"], #f_mainTab_serviceClass_' + pf).hide();
						$('#f_button_addServiceClass').hide();
						$('#f_mainTab_scInfo').hide();
						$('#tabs-2').hide();
						break;
					case "functionality" : 
						$( 'label[for="f_mainTab_controlType_' + pf + '"], #f_mainTab_controlType_' + pf + ', #f_mainTab_controlType_validation_' + pf ).hide();
						$('#physicalDescriptionTab').addClass("ui-tabs-hide");
						$('label[for="f_mainTab_serviceClass_' + pf + '"], #f_mainTab_serviceClass_' + pf).show();
						$('#f_button_addServiceClass').show();
						$('#f_mainTab_scInfo').show();
						$('#tabs-2').hide();
						break;
					default: 
						$( 'label[for="f_mainTab_controlType_' + pf + '"], #f_mainTab_controlType_' + pf + ', #f_mainTab_controlType_validation_' + pf ).hide();
						$('#physicalDescriptionTab').removeClass("ui-tabs-hide");
						$('label[for="f_mainTab_serviceClass_' + pf + '"], #f_mainTab_serviceClass_' + pf).show();
						$('#f_button_addServiceClass').show();
						$('#f_mainTab_scInfo').show();
						$('#tabs-2').show();				
						break;
					}
			},
			//funkcje czyszczÄ…ce elementy formularza
			clearNF: function clearNF(){
				$( "#f_nonFunctionalDescriptionTab_NFProps tbody" ).empty();
				$( "#nonFuncDescForm_" + pf )[0].reset();
				this.resetSelectedNFPropertyIndex();
			},
			clearInputs: function clearInputs(){
				$( "#inputForm_" + pf )[0].reset();
				$( "#f_inputsTab_inputs tbody" ).empty();
				this.resetSelectedInputIndex();
			},
			clearOutputs: function clearOutputs(){
				$( "#outputForm_" + pf )[0].reset(); 	
				$( "#f_outputsTab_outputs tbody" ).empty();
				this.resetSelectedOutputIndex();
			},
			handleErrors: function handleErrors(array){
				$.each(array, function(){						
					var splitty = this.split("_"), 
						id,
						tabId = splitty[1].split("x")[0],
						inputId;
					$("#" + tabId).addClass("ui-state-error");
					if(tabId==="inputsTab" || tabId==="outputsTab" || tabId==="nonFunctionalDescriptionTab"){
						id = "#" + splitty[0] + "_" + splitty[1];
						inputId = "#" + splitty[0] + "_" + tabId + "_" + splitty[2];
						$(inputId).addClass("ui-state-error");
						$(inputId+"_validation_" +pf ).text(splitty[3]);
					}
					else{
						id = "#" + splitty[0] + "_" + splitty[1] + "_" + splitty[2];
						$( id+"_validation_" + pf ).text(splitty[3]);
					}	
					$( id + "_" + pf ).addClass( "ui-state-error" );
				});
			},
			clearErrors: function clearErrors(){
				$("*").removeClass("ui-state-error");
				$('td[id$="_validation_' + pf + '"]').text("");
			},
			//argument total decyduje, czy ma byÄ‡ skasowane id bloczka (nie chcemy tego przy resecie formularza, ale przy ponownym otwarciu tak)
			cleanForm: function cleanForm(total){
				if( !total )
					var temp = this.resultJSON.nodeId;
				this.resultJSON = {"nodeId":"","nodeLabel":"","nodeType":"","physicalDescription":[],"functionalDescription":[],"nonFunctionalDescription":[],"alternatives":"","subgraph":{},"controlType":"","condition":"","sources":[]};
				this.physDescJSON = {"serviceName":"","serviceGlobalId":"","address":"","operation":""};
				this.funcDescJSON = {"description":"","serviceClasses":[],"metaKeywords":[],"inputs":[],"outputs":[],"preconditions":"","effects":""};
				this.clearInputs();
				this.clearOutputs();
				this.clearNF();
				if( !total )
					this.resultJSON.nodeId = temp;
				// $( "#f_mainTab_source" ).val("");
				// $( "#f_mainTab_sources" ).empty();
				$( "#f_mainTab_sClasses" ).empty();
				// $( "#f_functionalDescription_mKeywords" ).empty();
				$( "#mainForm_" + pf )[0].reset();
				$( "#physDescForm_" + pf )[0].reset();
				$tabs.tabs('select', 0);
			},
			appendIO: function appendIO(array, type){
				var input;
				if(type==="inputs"){
					for(var no in array){
						input = array[no];
						var inputJSON = {"class":"","id":"","label":"","dataType":"","properties":"","source":[]};
						inputJSON.class = input.class;
						inputJSON.id = input.id;
						inputJSON.label = input.label;
						inputJSON.dataType = input.dataType;
						// inputJSON.properties = input.properties;
						this.funcDescJSON.inputs.push(inputJSON);
						
						this.inputAndOutputAppender(inputJSON, "f_inputsTab_inputs tbody", no);
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
						// outputJSON.properties = input.properties;
						this.funcDescJSON.outputs.push(outputJSON);
						
						this.inputAndOutputAppender(outputJSON, "f_outputsTab_outputs tbody", no);
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
				else if(type === "metaKeywords"){
					$.each(array, function(){
						input = this;	
						that.funcDescJSON.metaKeywords.push(input);
						// $( "#f_inputOutputTab_mKeywords" ).append("<span id=\"mk_"+ input + "\">" + input + ", </span>"); 	
					});
				}
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
			//PoniÅ¼sze funkcje "przyklejajÄ…" nowo dodane inputy/outputy/non functional properties
			//do tabeli w formularzu
			inputAndOutputAppender: function inputAndOutputAppender(input, id, number){
				//id = "f_outputsTab_outputs tbody" || id = "f_inputsTab_inputs tbody"
				var temp = id.split(" ")[0].split("_"); 
				var tempId = temp[0] +  "_" + temp[1] + "x" + temp[2] + number;
				$( "#" + id ).append( 
					"<tr id=\"" + tempId + "\" class=\"clickable\">" +
						"<td id=\"" + tempId + "_id\">" + input.id + "</td>" + 
						"<td id=\"" + tempId + "_label\">" + input.label + "</td>" + 
						"<td id=\"" + tempId + "_class\">" + input.class + "</td>" +
						"<td id=\"" + tempId + "_dataType\">" + input.dataType + "</td>" + 
					"</tr>" 
				);
			},
			NFPropsAppender: function NFPropsAppender(input, number){
				var tempId = "f_nonFunctionalDescriptionTabxNFProps" + number;
				$( "#f_nonFunctionalDescriptionTab_NFProps tbody").append( 
					"<tr id=\"" + tempId + "\" class=\"clickable\">" +
						"<td id=\"" + tempId + "_weight\">" + input.weight + "</td>" + 
						"<td id=\"" + tempId + "_name\">" + input.name + "</td>" + 
						"<td id=\"" + tempId + "_relation\">" + input.relation + "</td>" +
						"<td id=\"" + tempId + "_unit\">" + input.unit + "</td>" + 
						"<td id=\"" + tempId + "_value\">" + input.value + "</td>" +
					"</tr>" );
			},
			// rowRemover: function rowRemover(tabId, index){
			// 	$( "#" + tabId + " tr:eq(" + index + ")").remove();
			// },
			//PoniÅ¼sze funkcje sprawdzajÅ¼, czy string/input/output/non functional property istnieje na zadanej liÅ›cie
			stringExists: function stringExists(obj, array){
				$.each(array, function(){
					if (this === obj) return true;
				});
				return false;
			},
			ioExists: function ioExists(obj, array){
				$.each(array, function(){
					if (this.id === obj.id) return true;
				});
				return false;
			},
			nonFuncExists: function nonFuncExists(obj, array){
				$.each(array, function(){
					if (this.name === obj.name) return true;
				});
				return false;
			},
			//poniÅ¼sze funkcje zwracajÄ… indeks elementu o zadanym id/name na liÅ›cie
			stringExistsIndex: function stringExistsIndex(obj, array){
				var namey;
				for(namey in array){
					if (array[namey] === obj) return namey;
				}
				return -1;
			},
			getSelectedInputIndex: function getSelectedInputIndex(){
				return this.selectedInputIndex;
			},
			getSelectedOutputIndex: function getSelectedOutputIndex(){
				return this.selectedOutputIndex;
			},
			getSelectedInputVariableIndex: function getSelectedInputVariableIndex(){
				return this.selectedInputVariableIndex;
			},
			getSelectedNFPropertyIndex: function getSelectedNFPropertyIndex(){
				return this.selectedNFPropertyIndex;
			},
			getSelectedGlobalNFPropertyIndex: function getSelectedGlobalNFPropertyIndex(){
				return this.selectedGlobalNFPropertyIndex;
			},
			setSelectedInputIndex: function setSelectedInputIndex(index){
				this.selectedInputIndex = index;
			},
			setSelectedOutputIndex: function setSelectedOutputIndex(index){
				this.selectedOutputIndex = index;
			},
			setSelectedInputVariableIndex: function setSelectedInputVariableIndex(index){
				this.selectedInputVariableIndex = index;
			},
			setSelectedNFPropertyIndex: function setSelectedNFPropertyIndex(index){
				this.selectedNFPropertyIndex = index;
			},
			setSelectedGlobalNFPropertyIndex: function setSelectedGlobalNFPropertyIndex(index){
				this.selectedGlobalNFPropertyIndex = index;
			},
			resetSelectedInputIndex: function resetSelectedInputIndex(){
				this.selectedInputIndex = -1;
			},
			resetSelectedOutputIndex: function resetSelectedOutputIndex(){
				this.selectedOutputIndex = -1;
			},
			resetSelectedInputVariableIndex: function resetSelectedInputVariableIndex(){
				this.selectedInputVariableIndex = -1;
			},
			resetSelectedNFPropertyIndex: function resetSelectedNFPropertyIndex(){
				this.selectedNFPropertyIndex = -1;
			},
			resetSelectedGlobalNFPropertyIndex: function resetSelectedGlobalNFPropertyIndex(){
				this.selectedGlobalNFPropertyIndex = -1;
			},
			clearInputSelectionInTable: function clearInputSelectionInTable(){
				$.each($("#f_inputsTab_inputs tbody").children(), function(){
					$(this).removeClass("ui-state-active");
				});
			},
			clearOutputSelectionInTable: function clearOutputSelectionInTable(){
				$.each($("#f_outputsTab_outputs tbody").children(), function(){
					$(this).removeClass("ui-state-active");
				});
			},
			clearInputVariableSelectionInTable: function clearInputVariableSelectionInTable(){
				$.each($("#f_inputVariables tbody").children(), function(){
					$(this).removeClass("ui-state-active");
				});
			},
			clearNFPropertySelectionInTable: function clearNFPropertySelectionInTable(){
				$.each($("#f_nonFunctionalDescriptionTab_NFProps tbody").children(), function(){
					$(this).removeClass("ui-state-active");
				});
			},
			clearGlobalNFPropertySelectionInTable: function clearGlobalNFPropertySelectionInTable(){
				$.each($("#f_globalNFProps tbody").children(), function(){
					$(this).removeClass("ui-state-active");
				});
			},
			removeUndefinedElements: function removeUndefinedElements(){
				for(var i = 0; i < this.funcDescJSON.inputs.length; i++){
					if(this.funcDescJSON.inputs[i] === undefined){ 
						this.funcDescJSON.inputs.splice(i, 1);
						i--;
					}
				}
				for(var i = 0; i < this.funcDescJSON.outputs.length; i++){
					if(this.funcDescJSON.outputs[i] === undefined) {
						this.funcDescJSON.outputs.splice(i, 1);
						i--;
					}
				}
				for(var i = 0; i < this.resultJSON.nonFunctionalDescription.length; i++){
					if(this.resultJSON.nonFunctionalDescription[i] === undefined){ 
						this.resultJSON.nonFunctionalDescription.splice(i, 1);
						i--;
					}
				}
			},
			/*
			*	EVENT HANDLERS START HERE
			*/
			submitAll: function submitAll(){
				// var condition;

				this.clearErrors();
				
				this.resultJSON.nodeLabel = $( "#f_mainTab_label_" + pf ).val();
				this.resultJSON.controlType = $( "#f_mainTab_controlType_" + pf ).val();
				// this.resultJSON.alternatives = $( "#f_mainTab_alternatives" ).val();
				
				// condition = $( "#f_mainTab_condition" ).val();
				// if(condition)
				// 	this.resultJSON.condition = "if " + $( "#f_mainTab_condition" ).val() + " then " + $( "#f_mainTab_conditionTRUE" ).val() + " else " + $( "#f_mainTab_conditionFALSE" ).val();
				// else this.resultJSON.condition = "";

				this.physDescJSON.serviceName = $( "#f_physicalDescriptionTab_serviceName_" + pf ).val();
				this.physDescJSON.serviceGlobalId = $( "#f_physicalDescriptionTab_serviceGlobalId_" + pf ).val();
				this.physDescJSON.address = $( "#f_physicalDescriptionTab_address_" + pf ).val();
				this.physDescJSON.operation = $( "#f_physicalDescriptionTab_operation_" + pf ).val();
				this.resultJSON.physicalDescription = this.physDescJSON;
					
				this.funcDescJSON.description = $( "#f_mainTab_description_" + pf ).val();
				this.removeUndefinedElements();
				// this.funcDescJSON.preconditions = $( "#f_inputOutputTab_preconditions" ).val();
				// this.funcDescJSON.effects = $( "#f_inputOutputTab_effects" ).val();
				this.resultJSON.functionalDescription = this.funcDescJSON;
			
				
				gui.controler.reactOnEvent("TryToSaveNodeAfterEdit", this.resultJSON);
			},
			addServiceClass: function addServiceClass(){
				var input = $("#f_mainTab_serviceClass_" + pf ).val();
				if(input!=="" && !this.stringExists(input, this.funcDescJSON.serviceClasses)){
					this.funcDescJSON.serviceClasses.push(input);
					$( "#f_mainTab_sClasses" ).append("<span id=\"sc_"+ input + "\" class=\"clickable\">" + input + ", </span>"); 	
				}
				$("#f_mainTab_serviceClass_" + pf ).val("");
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
				var inputJSON = {"class":"","id":"","label":"","dataType":"","properties":"","source":[]},
					index = this.getSelectedInputIndex();
				inputJSON.class = $( "#f_inputsTab_class_" + pf ).val();
				inputJSON.id = $( "#f_inputsTab_id_" + pf ).val();
				inputJSON.label = $( "#f_inputsTab_label_" + pf ).val();
				inputJSON.dataType = $( "#f_inputsTab_dataType_" + pf ).val();
				// inputJSON.properties = $( "#f_inputsTab_properties" ).val();
		
				if(index==-1){	//Index = -1 => dodajemy nowy input
					if(!this.ioExists(inputJSON, this.funcDescJSON.inputs)){
						this.inputAndOutputAppender(inputJSON, "f_inputsTab_inputs tbody", this.funcDescJSON.inputs.length);
						this.funcDescJSON.inputs.push(inputJSON);
						$("#f_addInputForm_" + pf ).dialog("close");	
					}
					else alert("This input already exists!");	
				}
				else{	//edytujemy istniejÄ…cy input
					var destinationId = "f_inputsTabxinputs" + index;
					this.funcDescJSON.inputs[index] = inputJSON;
					$("#" + destinationId + "_id_" + pf ).text(inputJSON.id);
					$("#" + destinationId + "_class_" + pf ).text(inputJSON.class);
					$("#" + destinationId + "_label_" + pf ).text(inputJSON.label);
					$("#" + destinationId + "_dataType_" + pf ).text(inputJSON.dataType);
					$("#f_addInputForm_" + pf ).dialog("close");	
				}
			},
			addOutput: function addOutput(){
				var outputJSON = {"class":"","id":"","label":"","dataType":"","properties":""},
					index = this.getSelectedOutputIndex();
				outputJSON.class = $( "#f_outputsTab_class_" + pf ).val();
				outputJSON.id = $( "#f_outputsTab_id_" + pf ).val();
				outputJSON.label = $( "#f_outputsTab_label_" + pf ).val();
				outputJSON.dataType = $( "#f_outputsTab_dataType_" + pf ).val();
				// outputJSON.properties = $( "#f_outputsTab_outputProperties" ).val();
				
				if(index==-1){	//Index = -1 => dodajemy nowy output
					if(!this.ioExists(outputJSON, this.funcDescJSON.outputs)){
						this.inputAndOutputAppender(outputJSON, "f_outputsTab_outputs tbody", this.funcDescJSON.outputs.length);
						this.funcDescJSON.outputs.push(outputJSON);
						$("#f_addOutputForm_" + pf ).dialog("close");	
					}
					else alert("This output already exists!"); //TODO: te alerciÄ…tka jako modal dialogs
				}
				else{	//edytujemy istniejÄ…cy output
					var destinationId = "f_outputsTabxoutputs" + index;
					this.funcDescJSON.outputs[index] = outputJSON;
					$("#" + destinationId + "_id_" + pf ).text(outputJSON.id);
					$("#" + destinationId + "_class_" + pf ).text(outputJSON.class);
					$("#" + destinationId + "_label_" + pf ).text(outputJSON.label);
					$("#" + destinationId + "_dataType_" + pf ).text(outputJSON.dataType);
					$("#f_addOutputForm_" + pf ).dialog("close");	
				}
			},
			addNonFunctional: function addNonFunctional(){
				var nonFuncDescJSON = {"weight":"","name":"","relation":"","unit":"","value":""},
					index = this.getSelectedNFPropertyIndex();
				nonFuncDescJSON.weight = $( "#f_nonFunctionalDescriptionTab_weight_" + pf ).val();
				nonFuncDescJSON.name = $( "#f_nonFunctionalDescriptionTab_name_" + pf ).val();
				nonFuncDescJSON.relation = $( "#f_nonFunctionalDescriptionTab_relation_" + pf ).val();
				nonFuncDescJSON.unit = $( "#f_nonFunctionalDescriptionTab_unit_" + pf ).val();
				nonFuncDescJSON.value = $( "#f_nonFunctionalDescriptionTab_value_" + pf ).val();
				
				if(index==-1){	//Index = -1 => dodajemy nowy NFProperty
					if(!this.nonFuncExists(nonFuncDescJSON, this.resultJSON.nonFunctionalDescription)){
						this.NFPropsAppender(nonFuncDescJSON, this.resultJSON.nonFunctionalDescription.length);
						this.resultJSON.nonFunctionalDescription.push(nonFuncDescJSON);
						$("#f_addNFPropertyForm_" + pf ).dialog("close");
					}
					else alert("This non functional property already exists!");
				}
				else{	//edytujemy istniejÄ…cy NFProperty
					var destinationId = "f_nonFunctionalDescriptionTabxNFProps" + index;
					this.resultJSON.nonFunctionalDescription[index] = nonFuncDescJSON;
					$("#" + destinationId + "_weight_" + pf ).text(nonFuncDescJSON.weight);
					$("#" + destinationId + "_name_" + pf ).text(nonFuncDescJSON.name);
					$("#" + destinationId + "_relation_" + pf ).text(nonFuncDescJSON.relation);
					$("#" + destinationId + "_unit_" + pf ).text(nonFuncDescJSON.unit);
					$("#" + destinationId + "_value_" + pf ).text(nonFuncDescJSON.value);
					$("#f_addNFPropertyForm_" + pf ).dialog("close");	
				}
			},
			resetAll: function resetAll(){
				this.cleanForm();
			},
			removeInput: function removeInput(){
				var index = this.getSelectedInputIndex();
				this.funcDescJSON.inputs[index] = undefined;
				$("#f_inputsTabxinputs"+index).remove();
				this.resetSelectedInputIndex();
			},
			removeOutput: function removeOutput(){
				var index = this.getSelectedOutputIndex();
				this.funcDescJSON.outputs[index] = undefined; 
				$("#f_outputsTabxoutputs"+index).remove();
				this.resetSelectedOutputIndex();
			},
			removeNonFunc: function removeNonFunc(nfProp){
				var index = this.getSelectedNFPropertyIndex();
				this.resultJSON.nonFunctionalDescription[index] = undefined;
				$("#f_nonFunctionalDescriptionTabxNFProps"+index).remove();
				this.resetSelectedNFPropertyIndex();
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

			//w tym jest bezczelna partyzantka - dop�?³ki nie znajdÄ™ sposobu na uzyskanie referencji do 
			//$('#physicalDescriptionTab'), majÄ…c tylko id taba
			//var index = jQuery('#tabs').data('tabs').options.selected; 
			//
			nextTab: function nextTab(){
				var selected = $tabs.tabs('option', 'selected');
				if(selected==0 && $('#physicalDescriptionTab').hasClass("ui-tabs-hide")) selected++;
				if(selected < 4) $tabs.tabs('select', selected+1);
			},
			previousTab: function previousTab(){
				var selected = $tabs.tabs('option', 'selected');
				if(selected==2 && $('#physicalDescriptionTab').hasClass("ui-tabs-hide")) selected--;
				if(selected > 0) $tabs.tabs('select', selected-1);
			},
			closeForm: function closeForm(){
				$("#form").dialog("close");
			}
			/*
			* EVENT HANDLERS END HERE
			*/
		};
		
		//SUBMITY			
		$("#f_button_sumbitAllButton").button().click(function() {
			result.submitAll();
		});
		//preventDefault() w tych submitach zapobiega zamkniÄ™ciu caÅ‚ego formularza po submitnieciu czegokolwiek
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
		//openAddInputVariableForm
		$("#f_inputsTab_openAddInputForm").button().click(
			function(event) {
				$( "#inputForm_" + pf )[0].reset();
				result.resetSelectedInputIndex();
				result.clearInputSelectionInTable();
				$('#ui-dialog-title-f_addInputForm').text("New input");
				$("#f_addInputForm").dialog("open");
			}
		);
		$("#f_outputsTab_openAddOutputForm").button().click(
			function(event) {
				$( "#outputForm_" + pf  )[0].reset();
				result.resetSelectedOutputIndex();
				result.clearOutputSelectionInTable();
				$('#ui-dialog-title-f_addOutputForm').text("New output");
				$("#f_addOutputForm").dialog("open");	
			}
		);
		$("#f_openAddInputVariableForm").button().click(
			function(event) {
				$( "#inputVariableForm_" + pf )[0].reset();
				result.resetSelectedInputVariableIndex();
				result.clearInputVariableSelectionInTable();
				$('#ui-dialog-title-f_addInputVariableForm').text("New input variable");
				$("#f_addInputVariableForm").dialog("open");
			}
		);
		$("#f_nonFunctionalDescriptionTab_openAddNFPropertyForm").button().click(
			function(event) {
				$( "#nonFuncDescForm_" + pf  )[0].reset();
				result.resetSelectedNFPropertyIndex();
				result.clearNFPropertySelectionInTable();
				$('#ui-dialog-title-f_addNFPropertyForm').text("New non functional property");
				$("#f_addNFPropertyForm").dialog("open");	
			}
		);
		$("#f_openAddGlobalNFPropertyForm").button().click(
			function(event) {
				$( "#globalNonFuncDescForm_" + pf  )[0].reset();
				result.resetSelectedGlobalNFPropertyIndex();
				result.clearGlobalNFPropertySelectionInTable();
				$('#ui-dialog-title-f_addGlobalNFPropertyForm').text("New graph non functional property");
				$("#f_addGlobalNFPropertyForm").dialog("open");	
			}
		);
		$("#f_inputsTab_openEditInputForm").button().click(
			function(event) {
				var index = result.getSelectedInputIndex();
				if(index == -1)
					alert("No input selected!");
				else{
					var sourceId = "f_inputsTabxinputs" + index;
					$("#f_inputsTab_id_" + pf ).val($("#" + sourceId + "_id").text());
					$("#f_inputsTab_label_" + pf ).val($("#" + sourceId + "_label").text());
					$("#f_inputsTab_class_" + pf ).val($("#" + sourceId + "_class").text());
					$("#f_inputsTab_dataType_" + pf ).val($("#" + sourceId + "_dataType").text());
					$('#ui-dialog-title-f_addInputForm').text("Edit existing input");
					$("#f_addInputForm").dialog("open");
				}
			}
		);
		$("#f_outputsTab_openEditOutputForm").button().click(
			function(event) {
				var index = result.getSelectedOutputIndex();
				if(index == -1)
					alert("No output selected!");
				else{
					var sourceId = "f_outputsTabxoutputs" + index;
					$("#f_outputsTab_id_" + pf ).val($("#" + sourceId + "_id").text());
					$("#f_outputsTab_label_" + pf ).val($("#" + sourceId + "_label").text());
					$("#f_outputsTab_class_" + pf ).val($("#" + sourceId + "_class").text());
					$("#f_outputsTab_dataType_" + pf ).val($("#" + sourceId + "_dataType").text());
					$('#ui-dialog-title-f_addOutputForm').text("Edit existing output");
					$("#f_addOutputForm").dialog("open");
				}
			}
		);
		$("#f_openEditInputVariableForm").button().click(
			function(event) {
				var index = result.getSelectedInputVariableIndex();
				if(index == -1)
					alert("No input variable selected!");
				else{
					var sourceId = "f_inputVariables-" + index;
					$("#f_inputVariable_name_" + pf ).val( $("#" + sourceId + "_name").text() );
					$("#f_inputVariable_value_" + pf ).val( $("#" + sourceId + "_value").text() );
					$("#f_inputVariable_type_" + pf ).val( $("#" + sourceId + "_type").text() );
					$('#ui-dialog-title-f_addInputVariableForm').text("Edit existing input variable");
					result.clearInputVariableSelectionInTable();
					$("#f_addInputVariableForm").dialog("open");
				}
			}
		);
		$("#f_openEditGlobalNFPropertyForm").button().click(
			function(event) {
				var index = result.getSelectedGlobalNFPropertyIndex();
				if(index == -1)
					alert("No graph non functional property selected!");
				else{
					var sourceId = "f_globalNFProps-" + index;
					// console.log("asdasda", $("#f_globalNonFunctionalDescriptionTab_weight_" + pf ).length )
					// console.log("#f_globalNonFunctionalDescriptionTab_weight_" + pf, "#" + sourceId + "_weight")
					$("#f_globalNonFunctionalDescription_weight_" + pf ).val($("#" + sourceId + "_weight").text());
					$("#f_globalNonFunctionalDescription_name_" + pf ).val($("#" + sourceId + "_name").text());
					$("#f_globalNonFunctionalDescription_relation_" + pf ).val($("#" + sourceId + "_relation").text());
					$("#f_globalNonFunctionalDescription_unit_" + pf ).val($("#" + sourceId + "_unit").text());
					$("#f_globalNonFunctionalDescription_value_" + pf ).val($("#" + sourceId + "_value").text());
					$('#ui-dialog-title-f_addGlobalNFPropertyForm').text("Edit existing graph non functional property");
					result.clearGlobalNFPropertySelectionInTable();
					$("#f_addGlobalNFPropertyForm").dialog("open");
				}
			}
		);
		$("#f_nonFunctionalDescriptionTab_openEditNFPropertyForm").button().click(
			function(event) {
				var index = result.getSelectedNFPropertyIndex();
				if(index == -1)
					alert("No entry selected!");
				else{
					var sourceId = "f_globalNFPropsxglobalNFProps" + index;
					$("#f_nonFunctionalDescriptionTab_weight_" + pf ).val($("#" + sourceId + "_weight").text());
					$("#f_nonFunctionalDescriptionTab_name_" + pf ).val($("#" + sourceId + "_name").text());
					$("#f_nonFunctionalDescriptionTab_relation_" + pf ).val($("#" + sourceId + "_relation").text());
					$("#f_nonFunctionalDescriptionTab_unit_" + pf ).val($("#" + sourceId + "_unit").text());
					$("#f_nonFunctionalDescriptionTab_value_" + pf ).val($("#" + sourceId + "_value").text());
					$('#ui-dialog-title-f_addNFPropertyForm').text("Edit existing non functional property");
					$("#f_addNFPropertyForm").dialog("open");
				}
			}
		);
		$("#f_inputsTab_deleteThisInput").button().click(
			function(event) {
				var index = result.getSelectedInputIndex();
				if(index == -1)
					alert("No input selected!");
				else{
					result.removeInput();
				}
			}
		);
		$("#f_outputsTab_deleteThisOutput").button().click(
			function(event) {
				var index = result.getSelectedOutputIndex();
				if(index == -1)
					alert("No output selected!");
				else{
					result.removeOutput();
				}
			}
		);
		$("#f_deleteThisInputVariable").button().click(
			function(event) {
				var index = result.getSelectedInputVariableIndex();
				if(index == -1)
					alert("No input variable selected!");
				else{
					result.clearInputVariableSelectionInTable();
					result.removeInputVariable();
				}
			}
		);
		$("#f_nonFunctionalDescriptionTab_deleteThisNFProperty").button().click(
			function(event) {
				var index = result.getSelectedNFPropertyIndex();
				if(index == -1)
					alert("No entry selected!");
				else{
					result.removeNonFunc();
				}
			}
		);
		$("#f_deleteThisGlobalNFProperty").button().click(
			function(event) {
				var index = result.getSelectedGlobalNFPropertyIndex();
				if(index == -1)
					alert("No entry selected!");
				else{
					result.clearGlobalNFPropertySelectionInTable();
					result.removeGlobalNonFunc();
				}
			}
		);

		//RESETY
		$("#f_button_resetAllButton").button().click(
			function(event) {
				event.preventDefault();
				$( "#f_dialog_confirm1" ).dialog("open");
			}
		);
		$("#f_button_clearNonFunctional").button().click(
			function(event) {
				event.preventDefault();
				result.clearNF();
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
		//Zaznaczanie wybranego I/O/NFProperty w tabelce
		//TODO: dblclick odpala edit!!!!!!!!!!!1
		$('tr[id^="f_inputsTabxinputs"]').live("click", function(event){
			var index = event.target.id.split("_")[1].split("").pop();
			result.clearInputSelectionInTable();
			if(result.getSelectedInputIndex() == index)
				result.resetSelectedInputIndex();
			else{
				result.setSelectedInputIndex(index);
				$(this).addClass("ui-state-active");
			}
		});
		$('tr[id^="f_outputsTabxoutputs"]').live("click", function(event){
			var index = event.target.id.split("_")[1].split("").pop();
			result.clearOutputSelectionInTable();
			if(result.getSelectedOutputIndex() == index)
				result.resetSelectedOutputIndex();
			else{
				result.setSelectedOutputIndex(index);
				$(this).toggleClass("ui-state-active");
			}
		});
		$('tr[id^="f_inputVariables"]').live("click", function(event){
			var index = event.target.id.split("_")[1].split("").pop();
			console.log(index);
			result.clearInputVariableSelectionInTable();
			if(result.getSelectedInputVariableIndex() == index)
				result.resetSelectedInputVariableIndex();
			else{
				result.setSelectedInputVariableIndex(index);
				$(this).addClass("ui-state-active");
			}
		});
		$('tr[id^="f_globalNFProps"]').live("click", function(event){
			var index = event.target.id.split("_")[1].split("").pop();
			result.clearGlobalNFPropertySelectionInTable();
			if(result.getSelectedGlobalNFPropertyIndex() == index)
				result.resetSelectedGlobalNFPropertyIndex();
			else{
				result.setSelectedGlobalNFPropertyIndex(index);
				$(this).toggleClass("ui-state-active");
			}
		});
		$('tr[id^="f_nonFunctionalDescriptionTabxNFProps"]').live("click", function(event){
			var index = event.target.id.split("_")[1].split("").pop();
			result.clearNFPropertySelectionInTable();
			if(result.getSelectedNFPropertyIndex() == index)
				result.resetSelectedNFPropertyIndex();
			else{
				result.setSelectedNFPropertyIndex(index);
				$(this).toggleClass("ui-state-active");
			}
		});
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
		$( "#f_dialog_confirm1" ).dialog({
			autoOpen: false,
			resizable: false,
			height: 200,
			width: 320,
			modal: true,
			buttons: {
				"Yes, clear the form": function() {
					$(this).dialog("close");
					$( "#f_dialog_confirm2" ).dialog("open");

				},
				Cancel: function() {
					$(this).dialog("close");
					return false;
				}
			}
		});
		$( "#f_dialog_confirm2" ).dialog({
			autoOpen: false,
			resizable: false,
			height: 200,
			width: 320,
			modal: true,
			buttons: {
				"Yes, I'm 100% sure": function() {
					$( "#f_dialog_fine" ).dialog("open");
					$(this).dialog("close");
					result.resetAll();
				},
				Cancel: function() {
					return false;
					$(this).dialog("close");
				}
			}
		});
		$( "#f_dialog_fine" ).dialog({
			autoOpen: false,
			resizable: false,
			modal: true,
			buttons: {
				OK: function() {
					$( this ).dialog( "close" );
				}
			}
		});
		$("#f_addInputForm").dialog({
			autoOpen: false,
			modal: true,
			height: 300,
			width: 350,
			buttons: {
				"Confirm": function() {
					result.addInput();
				},
				Cancel: function() {
					$( this ).dialog( "close" );
				}
			}
		});
		$("#f_addOutputForm").dialog({
			autoOpen: false,
			modal: true,
			height: 300,
			width: 350,
			buttons: {
				"Confirm": function() {
					result.addOutput();
				},
				Cancel: function() {
					$( this ).dialog( "close" );
				}
			}
		});
		$("#f_addNFPropertyForm").dialog({
			autoOpen: false,
			modal: true,
			height: 300,
			width: 350,
			buttons: {
				"Confirm": function() {
					result.addNonFunctional();
				},
				Cancel: function() {
					$( this ).dialog( "close" );
				}
			}
		});
		$("#f_addGlobalNFPropertyForm").dialog({
			autoOpen: false,
			modal: true,
			height: 300,
			width: 350,
			buttons: {
				"Confirm": function() {
					result.addGlobalNonFunctional();
				},
				Cancel: function() {
					$( this ).dialog( "close" );
				}
			}
		});
		$("#f_addInputVariableForm").dialog({
			autoOpen: false,
			modal: true,
			height: 300,
			width: 350,
			buttons: {
				"Confirm": function() {
					result.addInputVariable();
				},
				Cancel: function() {
					$( this ).dialog( "close" );
				}
			}
		});
		$("#f_inputVariablesForm").dialog({
			autoOpen: false,
			modal: true,
			height: 350,
			width: 500,
			buttons: {
				"Save changes": function() {
					// gui.controler.current_graphData.
					for(var i in inpVars)
						if(!inpVars[i])
							inpVars.splice(i, 1);
					console.log(inpVars)
					gui.controler.current_graphData.inputVariables = inpVars;
					$( this ).dialog( "close" );
				},
				Cancel: function() {
					$( this ).dialog( "close" );
				}
			}
		});
		$("#f_globalNFPropertiesForm").dialog({
			autoOpen: false,
			modal: true,
			height: 350,
			width: 500,
			buttons: {
				"Save changes": function() {
					for(var i in globalNonFuncDesc)
						if(!globalNonFuncDesc[i])
							globalNonFuncDesc.splice(i, 1);
					gui.controler.current_graphData.nonFunctionalParameters = globalNonFuncDesc;
					$( this ).dialog( "close" );
				},
				Cancel: function() {
					$( this ).dialog( "close" );
				}
			}
		});

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
				newNode.serviceName = node.physicalDescription.serviceName;
				newNode.set = view.paper.set();
				//TU BYDEM DZIABAÅ? [BÅ‚aÅ¼ej] (PorzÄ…dkowanie wyÅ›wietlania data flow)
				newNode.inputs = [];
				$.each(node.functionalDescription.inputs, function(){
					newNode.inputs.push( $.extend(true, {}, this) );
				});
				newNode.outputs = [];
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
				var c = view.paper.circle(node.x, node.y, node.r).attr({fill: "white"}),
					label = view.paper.text(node.x, node.y-20, node.id).attr("fill", "#333"),
					input_length, output_length, i_tab = [], o_tab = [],
					multX = 1, multY = 1, x1, y1, x2, y2
					;
				node.mainShape = c;
				if(node.controlType.toLowerCase() == "#start")
					node.mainShape.attr({cursor: "crosshair"});
				node.raph_label = label;


				node.raph_label.dblclick(function(){
					gui.controler.reactOnEvent("EditNode", {nodeId: node.id});
				})

				input_length = node.inputs.length;
				output_length = node.outputs.length;

				//obliczanie punkt�?³w na okrÄ™gu
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
								
				img_gear.node.setAttribute("class", id+" clickable");
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

				img_gear.node.setAttribute("class", id+" clickable");
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
				// c - coords
				// console.log(c)
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
					x -= (oldNode.r / 2 + 130 / 2); //130 to szerokoÅ›Ä‡ node-a
				}
				oldNode.removeView();
				
				newNode = this.visualiser.visualiseNode(node, x, y);
				console.log(newNode, "666")
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
						console.log("bbb", io_tmp);
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
				node.update();  //WÅ?ODKU WTF?!
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
			//dodaÄ‡ lepiej dobierane parametry x, y
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
		dragNodes : function dragNodes(element, node){
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

							//gui.controler.reactOnEvent("NodeMoved");
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

					that.hideEdges();

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
						that.showEdges();
					}
					else {
						gui.controler.reactOnEvent("NodeMoved");
					}
				}

				if(getType(element) === "array"){
					$.each(element, function(){
						this.drag(move, start, stop);
					})
				} else
					element.drag(move, start, stop);
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
					if(gui.view.mode === "CF" || isStartNode){
						var canvas = $(gui.view.paper.canvas);
						offsetX = parseInt(canvas.offset().left) + parseInt(canvas.css("border-top-width"));
						offsetY = parseInt(canvas.offset().top) + parseInt(canvas.css("border-left-width"));
						bbox = this.getBBox();
						cx = (bbox.x + bbox.x2) / 2;
						cy = (bbox.y + bbox.y2) / 2;
						sourceNode = gui.view.getNodeById(this.node.classList[0]);

						arrow = gui.view.paper.arrow(cx, cy, cx, cy, 4);

						if( isStartNode ){
							$.each(gui.view.current_graph_view.nodes, function(i, v){
								$.each(v.inputs, function(){
									// console.log(v.id, this.id);
									// if(output && this.dataType === output.dataType && !gui.view.isInputConnected(v.id, this.id)){
										glows.push( this.node.glow({color: "purple"}) );
									// }
								});
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
						// to  to jest dopuki bÅ‚aÅ¼ej nie poprawi czegoÅ›tam u siebie
						arrow = gui.view.paper.arrow(cx, cy, event.clientX-offsetX + window.scrollX, event.clientY - offsetY + window.scrollY , 4);
						arrow[0].attr({"stroke-dasharray": ["--"]});
					}
				},
				stop = function(event){
					try {
						arrow[0].remove();
						arrow[1].remove();
					} catch(e){
						console.log(e);
					}

					if(gui.view.mode === "CF"){
						var targetNode = gui.view.getNodesInsideRect(event.clientX-offsetX + window.scrollX, event.clientY - offsetY + window.scrollY);
						if(targetNode && sourceNode && targetNode.id !== sourceNode.id){
							gui.controler.reactOnEvent("AddCFEdge", {
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

							if(confirm("Czy chcesz dodaÄ‡ nowe wyjÅ›cie w wierzchoÅ‚ku o etykiecie "+sourceNode.label+" ?")){
								gui.controler.reactOnEvent("addOutput", {
									sourceId : sourceNode.id,
									targetId : resultObj.targetId,
									input : resultObj.input
								});
							}
							// $("#f_addInputForm")
							// wyrmularz, z uzupeÅ‚nionymi polami
							// confirm -> controler i update node
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
				start = function start(){
					offsetX = parseInt(canvas.offset().left) + parseInt(canvas.css("border-top-width"));
					offsetY = parseInt(canvas.offset().top) + parseInt(canvas.css("border-left-width"));
					bbox = this.getBBox();
					cx = (bbox.x + bbox.x2) / 2;
					cy = (bbox.y + bbox.y2) / 2;
					sourceNode = outputView.getNodeById(this.node.classList[0]);
					output = sourceNode.getOutputById(this.node.classList[2]);

					$.each(gui.view.current_graph_view.nodes, function(i, v){
						if(v.id != sourceNode.id)
							glows.push( v.mainShape.glow({width: "1", color: "purple"}) );
						$.each(v.inputs, function(){
							if(output && this.dataType === output.dataType && !gui.view.isInputConnected(v.id, this.id)){
								glows.push( this.node.glow({color: "green"}) );
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
					// jsonFormatter(resultObj, true, true)
					if( output && sourceNode && resultObj && !gui.view.isInputConnected(resultObj.targetId, resultObj.input.id) ){
						if(resultObj.input.dataType === output.dataType){
							gui.controler.reactOnEvent("AddDFEdge", {
							 	sourceId: sourceNode.id,
							 	targetId: resultObj.targetId,
							 	input: resultObj.input,
							 	output: output,
							 	CF_or_DF: "DF"
							});
						} else {
							gui.logger.error("Error", "You tried to make connection between input and output od different data types")
						}
					}
					else {
						var targetNode = gui.view.getNodesInsideRect(event.clientX-offsetX + window.scrollX, event.clientY - offsetY + window.scrollY);
						if(targetNode && sourceNode && targetNode.id !== sourceNode.id){
							if(confirm("Czy chcesz dodaÄ‡ nowe wejÅ›cie w wierzchoÅ‚ku o etykiecie "+targetNode.label+" ?")){
								gui.controler.reactOnEvent("addInput", {
									sourceId : sourceNode.id,
									targetId : targetNode.id,
									output : output
								});
							}
						}

						// $("#f_addInputForm")
						// wyrmularz, z uzupeÅ‚nionymi polami
						// confirm -> controler i update node
						// addConnectionDF
					}

					$.each(glows, function(){
						this.remove();
					});
					glows = [];
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
				gui.controler.reactOnEvent("error", "Prubujesz dodaÄ‡ krawÄ™dÅº, kr�?³ta juÅ¼ istnieje.");
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

						var extraTime = 0;
						try {
							this.arrow[0].remove();	this.arrow[1].remove();
						} catch(e){	

							extraTime += 750;
							// console.log(e);
						}

						this.arrow = this.view.visualiser.drawEdge( bestConnectors )

						this.arrow[0].attr("opacity", "0").animate({"opacity": "1"}, 250+extraTime);
						this.arrow[1].attr("opacity", "0").animate({"opacity": "1"}, 250+extraTime);
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
							return "SSDL_DFEdge object";
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
							var extraTime = 0;
							try {
								this.arrow[0].remove();	this.arrow[1].remove();
							 } catch(e){
								extraTime += 750;
							 	//console.log(e);	
							 }

							// console.log(this);

							// try{
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

							this.arrow[0].attr("opacity", "0").animate({"opacity": "1"}, 250+extraTime);
							this.arrow[1].attr("opacity", "0").animate({"opacity": "1"}, 250+extraTime);
							// }
							// catch(e){
							// 	console.log(this.output.node, bboxOutput, bboxInput, coords)
							// }
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
			html.push("<div id='top_menu_"+pf+"' style='width: "+(this.width-2)+"px; height:"+heightOfTopBar+"; border:1px solid black;'>&nbsp; <span> </span></div>");
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
		},
<<<<<<< HEAD
		MenuList : (function MenuList(){
			//menu holder singleton (Menu BÅ‚aÅ¼eja i Jacka)
=======
		menuList : (function menuList(){
			//menu holder singleton (Menu Błażeja i Jacka)
>>>>>>> origin/master
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
		contextMenu : function contextMenu(listenedObjId){
			/* ContextMenu v2.0
				* by BÅ‚aÅ¼ej WolaÅ„czyk (blazejwolanczyk@gmail.com)
				* "Lasciate ogni speranza, voi ch'entrate"
				* SUBMITTED: 02.08.2012
				* REQUIRED PARAMS: 
				* - listenedObjId (id of object to witch we attach menu)
				* OUTPUT:
				* - object
				* -> open (function([mouse event]) displaying menu)
				* -> close (function() hiding menu)
				* -> isOpen (function() returning if menu is visible)
				* -> addOption (function(label, invoked event name, if display title in submenu) creating menu option)
				* -> addSeparator (function() adding separator to current level of menu)
				* -> getOption (function(label) returning option with specified label at currrent level of option tree)
				*/

			//structure holder object
			function option(id, label, invokedEvent, eventObject, display, level){
				this.id = id;
				this.label = label;
				this.invokedEvent = invokedEvent;
				this.eventObject = eventObject;
				this.suboptions = [];
				this.display = display || false;
				this.level = level || 0;
				this.addOption = function(label, invokedEvent, eventObject, display){
					var l = label || 'hr'+Math.floor(Math.random()*1000000);
					label = label || '<hr style="color: #000; background-color: #000; height: 1px; border: 0px; margin: 2px 0px 2px 0px;"/>';
					var nO = new option(this.id+'_'+l, label, invokedEvent, eventObject, display, this.level+1);
					this.suboptions.push(nO);
					return nO;
				}
				this.addSeparator = function(){
					this.addOption();
				}
				this.getOption = function(label){
					for(i in this.suboptions){
						var option = this.suboptions[i];
						if(option.label == label){
							return option;
						}
					}
				}
			}

			//private variables
			var caller = document.getElementById(listenedObjId),
				root = new option(listenedObjId+'CM', 'menuRoot', null, null, false, 0),
				width = $('body').width(),
				margin = 10,
				opened = [];

			//private functions
			var createMenu = function(option, x, y){
				var txt = '';
				if(option.display){
					txt += option.label;
				}
				var div = jQuery('<div/>', {
					id: option.id,
					visible: true,
					css: {
						border: "1px solid #000",	
						position: 'absolute',
						display: 'block',
						'background-color': 'rgba(255, 255, 255, 0.95)',
						top: y,
						left: x,
						'text-align': 'left',
						padding: '3px',
						cursor: 'pointer',
						'box-shadow': '2px 2px 3px black'
					}				
				});
				div.append(txt);
				div.level = option.level;
				opened.push(div);
				for(var i in option.suboptions){
					var opt = option.suboptions[i];
					var subDiv = document.createElement('div');
					subDiv.id = opt.id;
					subDiv.innerHTML = opt.label;
					subDiv.visible = true;		
					subDiv.level = opt.level;
					if(opt.suboptions.length>0){
						subDiv.innerHTML += '&nbsp;<img src="arrow.gif" style="margin-bottom: -2px;"/>';
					}
					div.append(subDiv);
					attachListeners(div, subDiv, opt);
				}
				$('body').append(div);
				if($(div).offset().left+$(div).width()>width){
					$(div).css('display', 'none');
					$(div).css('left', '0px');
					$(div).css('left', (width-$(div).width()-margin)+'px');
					$(div).css('display', 'block');
				}
				return div;
			}
			var attachListeners = function(div, subDiv, opt){
				$(subDiv).mousedown(function(){
					// console.log(typeof opt.invokedEvent);
					if(opt.invokedEvent){
						if(typeof opt.invokedEvent == 'function'){
							opt.invokedEvent(opt.eventObject);
						}else{
							gui.controler.reactOnEvent(opt.invokedEvent, opt.eventObject);
						}
					}
					menu.close();		
				});
				$(subDiv).mouseover(function(){
					if(opened.length>1){
						while(opened.length>subDiv.level){
							opened.pop().remove();
						}
					}
					if(opt.suboptions.length>0){
						var x = $(div).offset().left+$(div).width()+margin;
						var newMenu = createMenu(opt, x, $(subDiv).offset().top-3);
						$(newMenu).css('display', 'none');
						$(newMenu).css('left', '0px');
						if(width<$(div).offset().left+$(div).width()+margin+$(newMenu).width()){
							x = $(div).offset().left-margin-$(newMenu).width();
						}
						$(newMenu).css('left', x+'px');
						$(newMenu).css('display', 'block');
					}
				});
				$(subDiv).hover(
					function () {
					    $(this).css("color","red");
					},
					function () {
					    $(this).css("color","black");
					});
			}

			var that = this;
			var menu = {
				//public functions
				addOption: function(label, invokedEvent){
					return root.addOption(label, invokedEvent);
				},
				getOption: function(label){
					return root.getOption(label);
				},
				open: function(event){
					if(!that.menuList.getInstance().isOpen() && opened.length == 0){
						event = event || window.event;
						createMenu(root, event.clientX, event.clientY);
						that.menuList.getInstance().signalOpened();
					}
				},
				close: function(){
					while(opened.length!=0){
						opened.pop().remove();
					}
					that.menuList.getInstance().signalClosed();
				},
				isOpen: function(){
					if(document.getElementById(root.id)){
						return true;
					}
					return false;
				}
			}

			//event listeners
			caller.onClick = function(event){
				event = event || window.event;
				if(event.button == 0){
					menu.close();
				}
				return false;
			}
			caller.oncontextmenu = function(event){
				event = event || window.event;
				if(event.button == 2){
					menu.open(event);
				}
				return false;
			}

			//pushing into menu list
			this.menuList.getInstance().push(menu);
			//object return
			return menu;
		}
	}
	outputView.init();
	outputView.tooltip = tooltipper();
	outputView.visualiser = nodeVisualizator(outputView);
	outputView.bottomBar = drawBottomBar(outputView.paper);
	outputView.form = form();
	outputView.blankNodes = blankNode();
	outputView.mainMenu = menu(190,9,"top_menu_"+pf);
	outputView.mainMenu.addGroup("New");
	outputView.mainMenu.addGroup("Open");
	outputView.mainMenu.addGroup("Edit");								
	outputView.mainMenu.addOption("New", "Node ", function(){}, "");
	outputView.mainMenu.addSubOption("New", "Node ", "Service node", function(){alert("New service node added!")}, "CTRL+N+S");
	outputView.mainMenu.addSubOption("New", "Node ", "Functionality node", function(){alert("New functional node added!")}, "CTRL+N+F");
	outputView.mainMenu.addSubOption("New", "Node ", "Testowanie czy moÅ¼e byÄ‡ odpowienio dÅ‚uga nazwa dodawanego node", function(){alert("New functional node added!")}, "CTRL+N+F");
	outputView.mainMenu.addOption("Open", "Graph", function(){alert("Graph loaded!")}, "CTRL+G");
	outputView.mainMenu.addSubOption("Open", "Graph", "Testing", function(){alert("Graph loaded!")}, "CTRL+G");
	outputView.mainMenu.addOption("New","Start - Stop",function(){alert("Start and Stop added!")},"CTRL+S+A");
	outputView.mainMenu.addOption("Edit","Undo",function(){alert("programuje hardo!")},"");
	outputView.mainMenu.addSubOption("Edit", "Undo", "One step", function(){alert("One step behind...")}, "CTRL+Z");
	outputView.mainMenu.addSubOption("Edit", "Undo", "All", function(){alert("Back to the begining...")}, "CTRL+Z+A");									
	outputView.mainMenu.addOption("Edit","Redo",function(){alert("programuje hardo!")},"");
	outputView.mainMenu.addSubOption("Edit", "Redo", "One step", function(){alert("One step closer...")}, "CTRL+Z");
	outputView.mainMenu.addSubOption("Edit", "Redo", "All", function(){alert("The end...")}, "CTRL+Z+A");
	outputView.menuList.getInstance().push(outputView.mainMenu);

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
				gui.controler.reactOnEvent("ESCAPE");
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