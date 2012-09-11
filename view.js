//toDo
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
	// suppported by Matka Boska Partyzantcka 
	function menu(x, y, addToDiv) {
	
		var mainMenu = {
			przesuwne: 0,
			clicked: false,
			menuContener: $("<div id='menuContener' class=mMenuMainContener style='top:" + y + "px; left:" + x + "px; '> </div>").appendTo('#'+addToDiv),

			addGroup: function addGroup(label) {
				$("<div id=" + label + " class=mMenuGroup style='  left:" + mainMenu.przesuwne + "'>" + ( language[gui.language].mainMenu[camelize(label)] || "") + "</div>").appendTo('#menuContener').mouseenter(function() {

					if (mainMenu.clicked) {
						
						$('div.mMenuContener').hide();
						$('div.mMenuSubcontener').hide();
						$('#' + label + '_contener').show();
						$('div.mMenuGroup').css('background-image', 'url("images/dropdown-bg.gif")');

					}
					$('#' + label).css('background-image', 'url("images/dropdown-bg-hover.gif")');
				}).mouseleave(function() {
					if (mainMenu.clicked == false) $('#' + label).css('background-image', 'url("images/dropdown-bg.gif")')
				}).click(function() {
					if (mainMenu.clicked) {
						$('div.mMenuContener').hide();
						mainMenu.clicked = !mainMenu.clicked;
					} else {
						outputView.menuList.getInstance().secure();
						$('#' + label).css('background-image', 'url("images/dropdown-bg-hover.gif")');
						$('div.mMenuContener').hide();
						$('#' + label + '_contener').show();
						mainMenu.clicked = !mainMenu.clicked;
					}


				});

				$("<div id=" + label + "_contener" + " class=mMenuContener style='left:" + mainMenu.przesuwne + "px'></div>").appendTo('#menuContener').hide();
				mainMenu.przesuwne = mainMenu.przesuwne + $('#' + label).width();
			},

			addOption: function addOption(groupLabel, optionLabel, functionOnClick, shortcutString) {

				$("<div id=" + groupLabel + "_" + optionLabel.replace(/ /g, "_") + " class=mMenuGroupOption +  style='  left=" + $('#' + groupLabel).position().left + "'>" + ( language[gui.language].mainMenu[camelize(optionLabel)] || "") + " </div>").appendTo('#' + groupLabel + '_contener').mouseenter(function() {
					$('div.mMenuSubcontener').hide();
					var y = $('#'+ groupLabel + "_" + optionLabel.replace(/ /g, "_")).offset().top-$('#menuContener').offset().top;
					$('#' + groupLabel + '_' + optionLabel.replace(/ /g, "_") + '_subcontener').css("top", y);
					var x = parseInt($('#'+ groupLabel + "_" + optionLabel.replace(/ /g, "_")).offset().left) - parseInt($('#menuContener').offset().left) + parseInt($('#'+ groupLabel + "_" + optionLabel.replace(/ /g, "_")).css("width")) +10  ;
					$('#' + groupLabel + '_' + optionLabel.replace(/ /g, "_") + '_subcontener').css("left", x);
					$('#' + groupLabel + '_' + optionLabel.replace(/ /g, "_")+ '_subcontener').show();
					$(this).css('background-image', 'url("images/dropdown-bg-hover.gif")');
				}).mouseleave(function() {
					$(this).css('background-image', "none");
				}).click(function() {
					$('div.mMenuContener').hide();
					$('div.mMenuGroup').css('background-image', 'url("images/dropdown-bg.gif")');
					mainMenu.clicked = false;
				}).click(functionOnClick);

				jQuery('<span/>', {
					class: 'mMenuShortcutDiv',
					html: "&nbsp;&nbsp;&nbsp;&nbsp" + shortcutString,
				}).appendTo($('#' + groupLabel + '_' + optionLabel.replace(/ /g, "_")));
			},

			addSubOption: function addSubOption(groupLabel, optionLabel, subOptionLabel, functionOnClick, shortcutString) {

				if ($('#' + groupLabel + '_' + optionLabel.replace(/ /g, "_") + "_subcontener").length == 0) {
					$("<div id=" + groupLabel + "_" + optionLabel.replace(/ /g, "_") + "_subcontener" + "  class=mMenuSubcontener></div>").appendTo('#menuContener').hide();

				jQuery('<div/>', {
					html: "&nbsp;&nbsp;&nbsp;&nbsp;" +'<img src="images/gtk-media-play-ltr.png" width="10"/> ' ,
					css: {
						float: 'right',
						padding: "3px 0px 0px 0px"
					},

				}).appendTo($('#'+groupLabel + "_" + optionLabel.replace(/ /g, "_")));
				}
				$("<div id=" + groupLabel + "_" + optionLabel.replace(/ /g, "_") + "_" + subOptionLabel.replace(/ /g, "_") + " class=mMenuSubOption  style='   left=" + $('#' + groupLabel).position().left + "'>" + "" + " </div>").appendTo($('#' + groupLabel + '_' + optionLabel.replace(/ /g, "_") + "_subcontener")).mouseenter(function() {
					$(this).css('background-image', 'url("images/dropdown-bg-hover.gif")');
				}).mouseleave(function() {
					$(this).css('background-image', "none");
				}).click(function() {
					$('div.mMenuContener').hide();
					$('div.mMenuSubcontener').hide();
					$('div.mMenuGroup').css('background-image', 'url("images/dropdown-bg.gif")');
					mainMenu.clicked = false;
				}).click(functionOnClick);

				$('#'+groupLabel + "_" + optionLabel.replace(/ /g, "_") + "_" + subOptionLabel.replace(/ /g, "_")).html(( language[gui.language].mainMenu[camelize(subOptionLabel)] || ""));
				
				jQuery('<div/>', {
					html: "<td>&nbsp;&nbsp;&nbsp;" +shortcutString +'</td> </tr>',
					class: 'mMenuShortcutDiv'

				}).appendTo($('#' + groupLabel + '_' + optionLabel.replace(/ /g, "_") + "_" + subOptionLabel.replace(/ /g, "_")));
			},
			addSeparator: function addSeparator(groupLabel) {
				$("<hr id=" + groupLabel + "_sep"  + " class = mMenuSeparator ></hr>").appendTo('#' + groupLabel + '_contener');
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
				$('div.mMenuContener').hide();
				$('div.mMenuSubcontener').hide();
				$('div.mMenuGroup').css('background-image', 'url("images/dropdown-bg.gif")');
			},

			init: function init(){


				outputView.mainMenu.addGroup("File");
				outputView.mainMenu.addGroup("Edit");
				outputView.mainMenu.addGroup("Graph");
				outputView.mainMenu.addGroup("View");
				outputView.mainMenu.addGroup("Help");
				outputView.mainMenu.addOption("File", "New Node" , function(){}, "");
				outputView.mainMenu.addSeparator("File");
				outputView.mainMenu.addOption("File", "Load", function(){}, "");
				outputView.mainMenu.addSubOption("File","Load","From DB", function(){alert("Not implemented yet!");},"" );
				outputView.mainMenu.addSubOption("File","Load","From File", function(){alert("Not implemented yet!");},"" );
				outputView.mainMenu.addOption("File", "Save", function(){}, "");
				outputView.mainMenu.addSubOption("File","Save","To DB", function(){alert("Not implemented yet!");},"" );
				outputView.mainMenu.addSubOption("File","Save","To File", function(){alert("Not implemented yet!");},"" );
				outputView.mainMenu.addSubOption("File","Save","To DB and Deploy", function(){alert("Not implemented yet!");},"" );
				outputView.mainMenu.addSubOption("File", "New Node", "Service node", function(){
					var nodeType="Service";
					var label = prompt("Enter a label for the new node:");
					if(label) gui.controler.reactOnEvent("AddBlankNode", {label:label, nodeType:nodeType});
						}, "CTRL+N+S");
				outputView.mainMenu.addSubOption("File", "New Node", "Functionality node", function(){ 		var nodeType="Functionality";
					var label = prompt("Enter a label for the new node:");
					if(label) gui.controler.reactOnEvent("AddBlankNode", {label:label, nodeType:nodeType}); }, "CTRL+N+F");
				outputView.mainMenu.addSubOption("File","New Node","Start Stop",function(){gui.controler.reactOnEvent("ADDSTARTSTOPAUTOMATICALLY");},"CTRL+S+A");
				outputView.mainMenu.addOption("Graph", "Validate", function(){alert("Not implemented yet!");}, "");
				outputView.mainMenu.addOption("Graph", "Test", function(){alert("Not implemented yet!");}, "");
				outputView.mainMenu.addOption("View", "Control Flow", function(){gui.controler.reactOnEvent("SwitchMode", {mode: "CF"});}, "");
				outputView.mainMenu.addOption("View", "Data Flow" , function(){gui.controler.reactOnEvent("SwitchMode", {mode: "DF"});}, "");
				outputView.mainMenu.addSeparator("View");
				outputView.mainMenu.addOption("View", "Console" , function(){gui.logger.open()}, "");
				outputView.mainMenu.addOption("Edit","Undo",function(){},"");
				outputView.mainMenu.addSubOption("Edit", "Undo", "One step", function(){alert("Not implemented yet!");}, "CTRL+Z");
				outputView.mainMenu.addSubOption("Edit", "Undo", "All", function(){alert("Not implemented yet!");}, "CTRL+Z+A");
				outputView.mainMenu.addOption("Edit","Redo",function(){},"");
				outputView.mainMenu.addSubOption("Edit", "Redo", "One step", function(){alert("Not implemented yet!");}, "CTRL+Z");
				outputView.mainMenu.addSubOption("Edit", "Redo", "All", function(){alert("Not implemented yet!");}, "CTRL+Z+A");
				outputView.mainMenu.addSeparator("Edit");
				outputView.mainMenu.addOption("Edit","Input Variables",function(){gui.view.form.editInputVariables();},"");
				outputView.mainMenu.addOption("Edit","Non functional parameters",function(){gui.view.form.editGlobalNonFunctionalParameters();},"");
				outputView.mainMenu.addSeparator("Edit")
				outputView.mainMenu.addOption("Edit","Clear",function(){var clearer = confirm("Czy na pewno?" ); if(clearer)gui.controler.reactOnEvent("CLEARGRAPH");},"");
				outputView.mainMenu.addOption("Help","Documentation",function(){alert("In this platel no one will help you, even Volodia.")},"");
				outputView.mainMenu.addSeparator("Help");
				outputView.mainMenu.addOption("Help","About",function(){alert(" Nothing to say about this.")},"");
				outputView.menuList.getInstance().push(outputView.mainMenu);


			}
		};

		return mainMenu;	
	};
	function contextMenu(listenedObjId, guiView){
		/* ContextMenu 2.2 (Błażej)
			* SUBMITTED: 06.09.2012
			* REQUIRED PARAMS: 
			* - listenedObjId (id of object to witch we attach menu)
			* - guiView (GUI View object)
			* OUTPUT:
			* - object
			* -> open (function([mouse event]) displaying menu)
			* -> close (function() hiding menu)
			* -> isOpen (function() returning if menu is visible)
			* -> addOption (function(label, invoked event name, if display title in submenu) creating menu option)
			* -> addSeparator (function() adding separator to current level of menu)
			* -> getOption (function(label) returning option with specified label at currrent level of option tree)
			* -> refresh(function(listenedObject) changing listened object)
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
		var caller,
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
					padding: '6px',
					cursor: 'pointer',
					'box-shadow': '2px 2px 3px rgba(0, 0, 0, 0.2)'
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
		};
		var attachListeners = function(div, subDiv, opt){
			$(subDiv).mousedown(function(){
				// console.log(typeof opt.invokedEvent);
				if(opt.invokedEvent){
					if(typeof opt.invokedEvent == 'function'){
						opt.invokedEvent(opt.eventObject);
					}else if(typeof opt.invokedEvent == 'string'){
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
		};
		var refresh = function(listenedObjId){
			//event listeners for id or raphael set
			if(typeof listenedObjId == 'string'){
				var caller = document.getElementById(listenedObjId);
				caller.oncontextmenu = function(event){
					return checkNOpen(event);
				}
			}else{
				var caller = listenedObjId;
				if(!caller.items){
					$(caller.node).bind("contextmenu", function(event){
						return checkNOpen(event);
					});
				}else{
					$.each(caller.items, function(){
						$(this.node).bind("contextmenu", function(event){
							return checkNOpen(event);
						});
					});
				}
			}
		};
		var that = this;
		var menu = {
			//public functions
			addOption: function(label, invokedEvent, eventObject){
				return root.addOption(label, invokedEvent, eventObject);
			},
			getOption: function(label){
				return root.getOption(label);
			},
			addSeparator: function(){
				root.addSeparator();
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
			},
			refresh: refresh
		}
		//universal open with event
		var checkNOpen = function(event){
			event = event || window.event;
			if(event.button == 2){
				menu.open(event);
			}
			return false;
		};
		//setting listeners and callerObj
		refresh(listenedObjId);
		//pushing into menu list
		guiView.menuList.getInstance().push(menu);
		//object return
		return menu;
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
							var label = prompt(language[gui.language].alerts.addLabelNewNode);
							if(label) gui.controler.reactOnEvent("AddBlankNode", {label:label, nodeType:nodeType});
					}
				}

				var text_service = this.paper.text(textHorizontalPosition,10, language[gui.language].nodes.service);
				text_service.node.setAttribute("class","repository_text");
				this.dataSet.push(text_service);
				var repo_service = this.paper.rect(nodeHorizontalPosition,20,nodeLength,nodeHeight,5)
					.attr({fill:"#fbec88"})
					.dblclick(onDblClick("Service"));
				repo_service.node.setAttribute("class","repository_element");
				this.dataSet.push(repo_service);
				var text_functionality = this.paper.text(textHorizontalPosition,70,language[gui.language].nodes.functionality);
				text_functionality.node.setAttribute("class","repository_text");
				this.dataSet.push(text_functionality);
				var repo_functionality = this.paper.rect(nodeHorizontalPosition,80,nodeLength,nodeHeight,5)
					.attr({fill:"#a6c9e2"})
					.dblclick(onDblClick("Functionality"));
				repo_functionality.node.setAttribute("class","repository_element");
				this.dataSet.push(repo_functionality);
				var text_mediator = this.paper.text(textHorizontalPosition,130,language[gui.language].nodes.mediator);
					// .hide();
					text_mediator.node.setAttribute("class","repository_text");
				this.dataSet.push(text_mediator);
				var repo_mediator = this.paper.rect(nodeHorizontalPosition,140,nodeLength,nodeHeight,5)
					.attr({fill:"#ffffff"})
					.dblclick(onDblClick("Mediator"));
					// .hide();
				repo_mediator.node.setAttribute("class","repository_element");	
				this.dataSet.push(repo_mediator);
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
								temp = paper.text(0, this.y+5, language[gui.language].bottombar.group[camelize(this.label)])
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
							temp1 = paper.text(0, 0, language[gui.language].bottombar.options[camelize(this.label)])
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
		
		var switchMode = function switchMode(arg){
			return (function(){
				gui.controler.reactOnEvent("SwitchMode", {mode: arg})
			});
		};
		var startStop = function startStop(){
			gui.controler.reactOnEvent("AddStartStopAutomatically");
		};
		var editInputVariables = function editInputVariables(){
			gui.view.form.editInputVariables();
		};
		var editNonFunctionalParameters = function editNonFunctionalParameters(){
			gui.view.form.editGlobalNonFunctionalParameters();
		};
		var save = function save(){
			gui.controler.reactOnEvent("SAVE");
		}

		result.invisibleBar = result.createBar(left, top, width, height);
		result.addGroup("Views");
		result.addOption("Views", "CF", switchMode("CF"), "ControlFlow");
		result.addOption("Views", "DF", switchMode("DF"), "DataFlow");
		result.addGroup("Edit");
		result.addOption("Edit", "Save", save, "SaveGraph");
		result.addOption("Edit", "StartStop", startStop, "Insert Start/Stop");
		result.addGroup("Graph Options");
		result.addOption("Graph Options", "Input Variables", editInputVariables, "editInputVariables");
		result.addOption("Graph Options", "NonFunctionalParameters", editNonFunctionalParameters, "editNonFunctionalParameters");

		result.set.push(result.invisibleBar, result.triangle1, result.triangle2);

		return result;
	};
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
					values:["", "#start", "#end"]
				},
				{
					label: "serviceClass",
					id: "f_mainTab_serviceClass",
					inputType: "textBox",
					validation: function(){},
					values:[],
					button: true
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
				// {
				// 	label: "id",
				// 	id: "f_inputsTab_id",
				// 	inputType: "textBox",
				// 	validation: function(){},
				// 	values:[]
				// },
				{
					label: "label",
					id: "f_inputsTab_label",
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
				// {
				// 	label: "id",
				// 	id: "f_outputsTab_id",
				// 	inputType: "textBox",
				// 	validation: function(){},
				// 	values:[]
				// },
				{
					label: "label",
					id: "f_outputsTab_label",
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
					inputType: "select",
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
					inputType: "select",
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
		
		formAppender(gui.language,pf);
		$("#tabs-1_" + pf).prepend(formGenerator(gui.language, pf, formJSON[0]));	
		$("#tabs-2_" + pf).prepend(formGenerator(gui.language, pf, formJSON[1]));	
		$("#f_addInputForm_" + pf).prepend(formGenerator(gui.language, pf, formJSON[2]));	
		$("#f_addOutputForm_" + pf).prepend(formGenerator(gui.language, pf, formJSON[3]));	
		$("#f_addNFPropertyForm_" + pf).prepend(formGenerator(gui.language, pf, formJSON[4]));
		$("#f_addGlobalNFPropertyForm_" + pf).prepend(formGenerator(gui.language, pf, formJSON[5]));
		$("#f_addInputVariableForm_" + pf).prepend(formGenerator(gui.language, pf, formJSON[6]));
		// alert(graphSaveParamsJSON);
		$("#f_graphSaveParamsForm_" + pf).prepend(formGenerator(gui.language, pf, graphSaveParamsJSON));

		$("#form_" + pf).dialog({
			autoOpen: false,
			modal: true,
			height: 400,
			width: 700
		});

		var maxL = 18;
		var $tabs = $( "#tabs_" + pf ).tabs();
		
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

			initToEdit: function initToEdit(node){
				var titleText = language[gui.language].forms.viewing + node.nodeType + language[gui.language].forms.typeNode;
				this.clearErrors();
				this.cleanForm(true);
				$('#ui-dialog-title-form_'+pf).text(titleText);
				$( "#f_mainTab_label_" + pf ).val(node.nodeLabel);
				$( "#f_mainTab_controlType_" + pf ).val(node.controlType);
				this.adjustForm(node.nodeType);
				$( "#f_mainTab_description_" + pf ).val(node.functionalDescription.description);
				$( "#f_physicalDescriptionTab_serviceName_" + pf ).val(node.physicalDescription.serviceName).addClass("longTextfield");
				$( "#f_physicalDescriptionTab_serviceGlobalId_" + pf ).val(node.physicalDescription.serviceGlobalId).addClass("longTextfield");
				$( "#f_physicalDescriptionTab_address_" + pf ).val(node.physicalDescription.address).addClass("longTextfield");
				$( "#f_physicalDescriptionTab_operation_" + pf ).val(node.physicalDescription.operation).addClass("longTextfield");
				
				this.appendList(node.functionalDescription.serviceClasses, "serviceClasses");
				this.appendList(node.functionalDescription.metaKeywords, "metaKeywords");
				this.appendIO(node.functionalDescription.inputs, "inputs");
				this.appendIO(node.functionalDescription.outputs, "outputs");
				this.appendNonFuncDesc(node.nonFunctionalDescription);
				this.resultJSON.nodeId = node.nodeId;
				this.resultJSON.nodeType = node.nodeType;
				$( "#form_" + pf ).dialog( "open" );
				
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
			},
			initBlank: function initBlank(nodeData){
				var titleText =  language[gui.language].forms.createA + nodeData.nodeType + language[gui.language].forms.typeNode ; 
				this.clearErrors();
				this.cleanForm(true);
				this.resultJSON.nodeLabel = nodeData.label;
				this.resultJSON.nodeType = nodeData.nodeType;
				$('#ui-dialog-title-form_' + pf).text(titleText);
				this.adjustForm(nodeData.nodeType);
				$( "#f_mainTab_label_" + pf ).val(nodeData.label);
				$( "#form_" + pf ).dialog( "open" );
			},
			adjustForm: function adjustForm(nodeType){
				switch(nodeType.toLowerCase()){
					case "control" : 
						$( 'label[for="f_mainTab_controlType_' + pf + '"], #f_mainTab_controlType_' + pf + ', #f_mainTab_controlType_validation_' + pf ).show();
						$('#physicalDescriptionTab_' + pf).addClass("ui-tabs-hide");
						$('label[for="f_mainTab_serviceClass_' + pf + '"], #f_mainTab_serviceClass_' + pf).hide();
						$('#f_mainTab_serviceClass_addButton_' + pf).hide();
						$('#tabs-2_' + pf).hide();
						break;
					case "functionality" : 
						$( 'label[for="f_mainTab_controlType_' + pf + '"], #f_mainTab_controlType_' + pf + ', #f_mainTab_controlType_validation_' + pf ).hide();
						$('#physicalDescriptionTab_' + pf).addClass("ui-tabs-hide");
						$('label[for="f_mainTab_serviceClass_' + pf + '"], #f_mainTab_serviceClass_' + pf).show();
						$('#f_mainTab_serviceClass_addButton_' + pf).show();
						$('#tabs-2_' + pf).hide();
						break;
					default: 
						$( 'label[for="f_mainTab_controlType_' + pf + '"], #f_mainTab_controlType_' + pf + ', #f_mainTab_controlType_validation_' + pf ).hide();
						$('#physicalDescriptionTab_' + pf).removeClass("ui-tabs-hide");
						$('label[for="f_mainTab_serviceClass_' + pf + '"], #f_mainTab_serviceClass_' + pf).show();
						$('#f_mainTab_serviceClass_addButton_' + pf).show();
						$('#tabs-2_' + pf).show();				
						break;
					}
			},
		//funkcje czyszczące elementy formularza
			clearNF: function clearNF(){
				$( "#f_nonFunctionalDescriptionTab_NFProps_" + pf + " tbody" ).empty();
				$( "#nonFuncDescForm_" + pf )[0].reset();
				this.resetSelectedNFPropertyIndex();
			},
			clearInputs: function clearInputs(){
				$( "#inputForm_" + pf )[0].reset();
				$( "#f_inputsTab_inputs_" + pf + " tbody" ).empty();
				this.resetSelectedInputIndex();
			},
			clearOutputs: function clearOutputs(){
				$( "#outputForm_" + pf )[0].reset(); 	
				$( "#f_outputsTab_outputs_" + pf + " tbody" ).empty();
				this.resetSelectedOutputIndex();
			},
		//obsługa błędów walidacji i czyszczenie
			handleErrors: function handleErrors(array){
				$.each(array, function(){						
					var splitty = this.split("_"), 
						id,
						tabId = splitty[1].split("x")[0] + "_" + pf,
						inputId;
					$("#" + tabId).addClass("ui-state-error");
					if(tabId==="inputsTab_"+pf || tabId==="outputsTab_"+pf || tabId==="nonFunctionalDescriptionTab_"+pf){
						id = "#" + splitty[0] + "_" + splitty[1] + "_" + splitty[2];
						$( id ).addClass( "ui-state-error" );
						inputId = "#" + splitty[0] + "_" + tabId.split("_")[0] + "_" + splitty[2];
						$(inputId+"_"+pf).addClass("ui-state-error-B");
						$(inputId+"_validation_" +pf ).text(splitty[3]);
					}
					else{
						id = "#" + splitty[0] + "_" + splitty[1] + "_" + splitty[2];
						$( id+"_validation_" + pf ).text(splitty[3]);
						id = id +"_"+pf;
						$( id ).addClass( "ui-state-error-B" );
					}	
				});
			},
			clearErrors: function clearErrors(){
				$("*").removeClass("ui-state-error");
				$('td[id$="_validation_' + pf + '"]').text("");
			},
			//argument total decyduje, czy ma być skasowane id bloczka (nie chcemy tego przy resecie formularza, ale przy ponownym otwarciu tak)
			cleanForm: function cleanForm(total){
				if( !total ) var temp = this.resultJSON.nodeId;
				this.resultJSON = {"nodeId":"","nodeLabel":"","nodeType":"","physicalDescription":[],"functionalDescription":[],"nonFunctionalDescription":[],"alternatives":"","subgraph":{},"controlType":"","condition":"","sources":[]};
				this.physDescJSON = {"serviceName":"","serviceGlobalId":"","address":"","operation":""};
				this.funcDescJSON = {"description":"","serviceClasses":[],"metaKeywords":[],"inputs":[],"outputs":[],"preconditions":"","effects":""};
				this.clearInputs();
				this.clearOutputs();
				this.clearNF();
				if( !total ) this.resultJSON.nodeId = temp;
				// $( "#f_mainTab_source" ).val("");
				// $( "#f_mainTab_sources" ).empty();
				$( "#f_mainTab_sClasses_" + pf ).empty();
				// $( "#f_functionalDescription_mKeywords" ).empty();
				$( "#mainForm_" + pf )[0].reset();
				$( "#physDescForm_" + pf )[0].reset();
				$( "#f_mainTab_controlType_" + pf ).val("");
				$("#f_mainTab_serviceClass_list_" + pf).html("");
				$tabs.tabs('select', 0);
			},
		//dodawanie elementów
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
						
						this.inputAndOutputAppender(inputJSON, "f_inputsTab_inputs_" + pf + " tbody", no);
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
						
						this.inputAndOutputAppender(outputJSON, "f_outputsTab_outputs_" + pf + " tbody", no);
					}
				}
			},
			appendList: function appendList(array, type){
				var that = this, index;
				// if(type === "sources"){
				// 	$.each(array, function(){
				// 		input = this;
				// 		that.resultJSON.sources.push(input); 	
				// 		$( "#f_mainTab_sources" ).append("<span id=\"src_"+ input + "\">" + input + ", </span>");
				// 	});
				// } else 
				if(type === "serviceClasses"){
					$.each(array, function(){
						index = that.funcDescJSON.serviceClasses.length;
						that.funcDescJSON.serviceClasses.push(this);
						$( "#f_mainTab_serviceClass_list_" + pf ).append("<span id=\"f_sc_"+ index + "_" + pf + "\" class=\"clickable\">" + this + ", </span>"); 	
					});
				}
				// else if(type === "metaKeywords"){
				// 	$.each(array, function(){
				// 		input = this;	
				// 		that.funcDescJSON.metaKeywords.push(input);
				// 		// $( "#f_inputOutputTab_mKeywords" ).append("<span id=\"mk_"+ input + "\">" + input + ", </span>"); 	
				// });
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
			appendInpVar : function appendInpVar(inpVar){
				// console.log(arguments)
				for( var v in inpVar ){
					inpVars.push(inpVar[v]);
					this.inputVariablesAppender(inpVar[v], v);
				}
			},
			appendGlobalNonFuncDesc : function appendGlobalNonFuncDesc(globNonFuncDesc){
				console.log(globNonFuncDesc);
				for( var prop in globNonFuncDesc ){
					globalNonFuncDesc.push(globNonFuncDesc[prop]);
					// alert(jsonFormatter(globalNonFuncDesc, true, true)); //Włodku, tu było inpVars, to CHYBA ŹLE
					this.globalNonFunPropsAppender(globNonFuncDesc[prop], prop);
				}				
			},
		//Poniższe funkcje "przyklejają" nowo dodane inputy/outputy/non functional properties
		//do tabeli w formularzu
			inputAndOutputAppender: function inputAndOutputAppender(input, id, number){
				//id = "f_outputsTab_outputs tbody" || id = "f_inputsTab_inputs tbody"
				var temp = id.split(" ")[0].split("_"); 
				var tempId = temp[0] +  "_" + temp[1] + "x" + temp[2] + "-" + number;
				$( "#" + id ).append( 
					"<tr id=\"" + tempId + "\" class=\"clickable\">" +
						// "<td id=\"" + tempId + "_id\">" + input.id + "</td>" + 
						"<td id=\"" + tempId + "_label\" class='tabField'>" + cutString(input.label, maxL) + "</td>" + 
						"<td id=\"" + tempId + "_class\" class='tabField'>" + cutString(input.class, maxL) + "</td>" +
						"<td id=\"" + tempId + "_dataType\" class='tabField'>" + cutString(input.dataType, maxL) + "</td>" + 
					"</tr>" 
				);
			},
			NFPropsAppender: function NFPropsAppender(input, number){
				var tempId = "f_nonFunctionalDescriptionTabxNFProps-" + number;
				$( "#f_nonFunctionalDescriptionTab_NFProps_" + pf + " tbody").append( 
					"<tr id=\"" + tempId + "\" class=\"clickable\">" +
						"<td id=\"" + tempId + "_weight\" class='tabField'>" + cutString(input.weight, maxL) + "</td>" + 
						"<td id=\"" + tempId + "_name\" class='tabField'>" + cutString(input.name, maxL) + "</td>" + 
						"<td id=\"" + tempId + "_relation\" class='tabField'>" + cutString(input.relation, maxL) + "</td>" +
						"<td id=\"" + tempId + "_unit\" class='tabField'>" + cutString(input.unit, maxL) + "</td>" + 
						"<td id=\"" + tempId + "_value\" class='tabField'>" + cutString(input.value, maxL) + "</td>" +
					"</tr>" );
			},
			inputVariablesAppender: function inputVariablesAppender(input, index){
				// console.log(arguments);
				var tempId = "f_inputVariables-" + index;
				$( "#f_inputVariables_" + pf + " tbody").append( 
					"<tr id=\"" + tempId + "\" class=\"clickable\">" +
						"<td id=\"" + tempId + "_name\" class='tabField'>" + cutString(input.name, maxL) + "</td>" + 
						"<td id=\"" + tempId + "_value\" class='tabField'>" + cutString(input.value, maxL) + "</td>" + 
						"<td id=\"" + tempId + "_type\" class='tabField'>" + cutString(input.type, maxL) + "</td>" +
					"</tr>"
				);
			},
			globalNonFunPropsAppender: function globalNFPropsAppender(input, index){
				// console.log("input", input)
				var tempId = "f_globalNFProps-" + index;
				$( "#f_globalNFProps_" + pf + " tbody").append( 
					"<tr id=\"" + tempId + "\" class=\"clickable\">" +
						"<td id=\"" + tempId + "_weight\" class='tabField'>" + cutString(input.weight, maxL) + "</td>" + 
						"<td id=\"" + tempId + "_name\" class='tabField'>" + cutString(input.name, maxL) + "</td>" + 
						"<td id=\"" + tempId + "_relation\" class='tabField'>" + cutString(input.relation, maxL) + "</td>" +
						"<td id=\"" + tempId + "_unit\" class='tabField'>" + cutString(input.unit, maxL) + "</td>" + 
						"<td id=\"" + tempId + "_value\" class='tabField'>" + cutString(input.value, maxL) + "</td>" +
					"</tr>" );
			},
		//Poniższe funkcje sprawdzają, czy string/input/output/non functional property istnieje na zadanej liście
			stringExists: function stringExists(obj, array){
				var result = false;
				$.each(array, function(){
					if (obj === this) result = true;
				});
				return result;
			},
			ioExists: function ioExists(obj, array){
				var result = false;
				$.each(array, function(){
					if (this && this.id == obj.id) result = true;
				});
				return result;
			},
			nonFuncExists: function nonFuncExists(obj, array){
				var result = false;
				$.each(array, function(){
					if (this && this.name == obj.name) result = true;
				});
				return result;
			},
		//obsługa zaznaczenia w tabeli
			clearInputSelectionInTable: function clearInputSelectionInTable(){
				$.each($("#f_inputsTab_inputs_" + pf + " tbody").children(), function(){
					$(this).removeClass("ui-state-active");
				});
			},
			clearOutputSelectionInTable: function clearOutputSelectionInTable(){
				$.each($("#f_outputsTab_outputs_" + pf + " tbody").children(), function(){
					$(this).removeClass("ui-state-active");
				});
			},
			clearInputVariableSelectionInTable: function clearInputVariableSelectionInTable(){
				$.each($("#f_inputVariables_" + pf + " tbody").children(), function(){
					$(this).removeClass("ui-state-active");
				});
			},
			clearNFPropertySelectionInTable: function clearNFPropertySelectionInTable(){
				$.each($("#f_nonFunctionalDescriptionTab_NFProps_" + pf + " tbody").children(), function(){
					$(this).removeClass("ui-state-active");
				});
			},
			clearGlobalNFPropertySelectionInTable: function clearGlobalNFPropertySelectionInTable(){
				$.each($("#f_globalNFProps_" + pf + " tbody").children(), function(){
					$(this).removeClass("ui-state-active");
				});
			},
		//usuwanie undefinedów z tablic i/o/nfp
			removeUndefinedElements: function removeUndefinedElements(){
				for(var i in this.funcDescJSON.inputs)
					if(!this.funcDescJSON.inputs[i])
						this.funcDescJSON.inputs.splice(i, 1);
				for(var i in this.funcDescJSON.outputs)
					if(!this.funcDescJSON.outputs[i])
						this.funcDescJSON.outputs.splice(i, 1);
				for(var i in this.resultJSON.nonFunctionalDescription)
					if(!this.resultJSON.nonFunctionalDescription[i]) 
						this.resultJSON.nonFunctionalDescription.splice(i, 1);
				for(var i in this.funcDescJSON.serviceClasses)
					if(!this.funcDescJSON.serviceClasses[i]) 
						this.funcDescJSON.serviceClasses.splice(i, 1);
			},
		//obsługa zmiennych określających zaznaczone elementy w tabelach
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
		/*
		*	EVENT HANDLERS START HERE
		*/
			submitAll: function submitAll(){
				// var condition;

				this.clearErrors();
				
				this.resultJSON.nodeLabel = $( "#f_mainTab_label_" + pf ).val();
				console.log(this.resultJSON.nodeLabel);
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
				// alert(jsonFormatter(this.resultJSON, true, true));
				
				gui.controler.reactOnEvent("TryToSaveNodeAfterEdit", this.resultJSON);
			},
		// Addy
			addServiceClass: function addServiceClass(){
				var input = $("#f_mainTab_serviceClass_" + pf ).val(), index;
				if(input!=="" && !this.stringExists(input, this.funcDescJSON.serviceClasses)){
					index = this.funcDescJSON.serviceClasses.length;
					this.funcDescJSON.serviceClasses.push(input);
					$( "#f_mainTab_serviceClass_list_" + pf ).append("<span id=\"f_sc_"+ index + "_" + pf + "\" class=\"clickable\">" + input + ", </span>"); 	
				}
				$("#f_mainTab_serviceClass_" + pf ).val("");
			},
			addInput: function addInput(){
				var inputJSON = {"class":"","id":"","label":"","dataType":"","properties":"","source":[]},
					index = this.getSelectedInputIndex();
				inputJSON.class = $( "#f_inputsTab_class_" + pf ).val();
				// inputJSON.id = $( "#f_inputsTab_id_" + pf ).val();
				inputJSON.label = $( "#f_inputsTab_label_" + pf ).val();
				inputJSON.dataType = $( "#f_inputsTab_dataType_" + pf ).val();
				// inputJSON.properties = $( "#f_inputsTab_properties" ).val();

				if(index==-1){	//Index = -1 => dodajemy nowy input
					if(!this.ioExists(inputJSON, this.funcDescJSON.inputs)){
						inputJSON.id = gui.controler.generateIOId(inputJSON.label);
						this.inputAndOutputAppender(inputJSON, "f_inputsTab_inputs_" + pf + " tbody", this.funcDescJSON.inputs.length);
						this.funcDescJSON.inputs.push(inputJSON);
						$("#f_addInputForm_" + pf).dialog("close");	
					}
					else alert(language[gui.language].alerts.errors.inputExists);		
				}
				else{	//edytujemy istniejÄ…cy input
					var destinationId = "f_inputsTabxinputs-" + index;
					inputJSON.id = this.funcDescJSON.inputs[index].id;
					this.funcDescJSON.inputs[index] = inputJSON;
					// $("#" + destinationId + "_id").text(inputJSON.id);
					$("#" + destinationId + "_class").text(inputJSON.class);
					$("#" + destinationId + "_label").text(inputJSON.label);
					$("#" + destinationId + "_dataType").text(inputJSON.dataType);
					$("#f_addInputForm_" + pf).dialog("close");	
				}
			},
			addOutput: function addOutput(){
				var outputJSON = {"class":"","id":"","label":"","dataType":"","properties":""},
					index = this.getSelectedOutputIndex();
				outputJSON.class = $( "#f_outputsTab_class_" + pf ).val();
				// outputJSON.id = $( "#f_outputsTab_id_" + pf ).val();
				outputJSON.label = $( "#f_outputsTab_label_" + pf ).val();
				outputJSON.id = gui.controler.generateIOId(outputJSON.label);
				outputJSON.dataType = $( "#f_outputsTab_dataType_" + pf ).val();
				// outputJSON.properties = $( "#f_outputsTab_outputProperties" ).val();

				if(index==-1){	//Index = -1 => dodajemy nowy output
				if(!this.ioExists(outputJSON, this.funcDescJSON.outputs)){
						this.inputAndOutputAppender(outputJSON, "f_outputsTab_outputs_" + pf + " tbody", this.funcDescJSON.outputs.length);
						this.funcDescJSON.outputs.push(outputJSON);
						$("#f_addOutputForm_" + pf).dialog("close");	
					}
					else alert(language[gui.language].alerts.errors.outputExists); //TODO: te alerciątka jako modal dialogs
				}
				else{	//edytujemy istniejący output
					var destinationId = "f_outputsTabxoutputs-" + index;
					outputJSON.id = this.funcDescJSON.outputs[index].id;
					this.funcDescJSON.outputs[index] = outputJSON;
					// $("#" + destinationId + "_id").text(outputJSON.id);
					$("#" + destinationId + "_class").text(outputJSON.class);
					$("#" + destinationId + "_label").text(outputJSON.label);
					$("#" + destinationId + "_dataType").text(outputJSON.dataType);
					$("#f_addOutputForm_" + pf).dialog("close");	
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
					else alert(language[gui.language].alerts.errors.nFPropExists);
				}
				else{	//edytujemy istniejący NFProperty
					var destinationId = "f_nonFunctionalDescriptionTabxNFProps-" + index;
					this.resultJSON.nonFunctionalDescription[index] = nonFuncDescJSON;
					$("#" + destinationId + "_weight").text(nonFuncDescJSON.weight);
					$("#" + destinationId + "_name").text(nonFuncDescJSON.name);
					$("#" + destinationId + "_relation").text(nonFuncDescJSON.relation);
					$("#" + destinationId + "_unit").text(nonFuncDescJSON.unit);
					$("#" + destinationId + "_value").text(nonFuncDescJSON.value);
					$("#f_addNFPropertyForm_" + pf ).dialog("close");	
				}
			},
			addInputVariable: function addInputVariable(){
				var inputVariableJSON = {"name":"","value":"","type":""},
					index = this.getSelectedInputVariableIndex();
				inputVariableJSON.name = $( "#f_inputVariable_name_" + pf ).val();
				inputVariableJSON.value = $( "#f_inputVariable_value_" + pf ).val();
				inputVariableJSON.type = $("#f_inputVariable_type_" + pf).val();
				
				if(index==-1){
					this.inputVariablesAppender(inputVariableJSON, inpVars.length);

					inpVars[ inpVars.length ] = inputVariableJSON;

					$("#f_addInputVariableForm_" + pf).dialog("close");
				}
				else{	//edytujemy istniejący inputVariable
					var destinationId = "f_inputVariables-" + index;
					$("#" + destinationId + "_name").text(inputVariableJSON.name);
					$("#" + destinationId + "_value").text(inputVariableJSON.value);
					$("#" + destinationId + "_type").text(inputVariableJSON.type);

					inpVars[index] = inputVariableJSON;

					$("#f_addInputVariableForm_" + pf).dialog("close");	
				}
			},
			addGlobalNonFunctional: function addGlobalNonFunctionalVariable(){
				var nonFuncDescJSON = {"weight":"","name":"","relation":"","unit":"","value":""},
					index = this.getSelectedGlobalNFPropertyIndex();
					nonFuncDescJSON.weight = $( "#f_globalNonFunctionalDescription_weight_" + pf ).val();
					nonFuncDescJSON.name = $( "#f_globalNonFunctionalDescription_name_" + pf ).val();
					nonFuncDescJSON.relation = $( "#f_globalNonFunctionalDescription_relation_" + pf ).val();
					nonFuncDescJSON.unit = $( "#f_globalNonFunctionalDescription_unit_" + pf ).val();
					nonFuncDescJSON.value = $( "#f_globalNonFunctionalDescription_value_" + pf ).val();
				
				if(index==-1){	//Index = -1 => dodajemy nowy NFProperty
					this.globalNonFunPropsAppender(nonFuncDescJSON, globalNonFuncDesc.length);

					globalNonFuncDesc[ globalNonFuncDesc.length ] = nonFuncDescJSON;
					$("#f_addGlobalNFPropertyForm_" + pf).dialog("close");
				}
				else{	//edytujemy istniejący globalNFProperty
					globalNonFuncDesc[ index ] = nonFuncDescJSON;

					var destinationId = "f_globalNFProps-" + index;
					$("#" + destinationId + "_weight" ).text(nonFuncDescJSON.weight);
					$("#" + destinationId + "_name" ).text(nonFuncDescJSON.name);
					$("#" + destinationId + "_relation" ).text(nonFuncDescJSON.relation);
					$("#" + destinationId + "_unit" ).text(nonFuncDescJSON.unit);
					$("#" + destinationId + "_value" ).text(nonFuncDescJSON.value);
					$("#f_addGlobalNFPropertyForm_" + pf).dialog("close");	
				}
			},
			//coś Włodkowatego
			collectGraphSaveParams : function collectGraphSaveParams(){
				var name = $("#f_graphSaveParams_name_"+pf).val();
				var description = $("#f_graphSaveParams_description_"+pf).val();

				console.log(name, description)

				if(! ( name && description ) ){
					return false;
				} else {
					return {
						name : name,
						description : description
					}
				}
			},
		// Edity
			openEditInput: function openEditInput(index){
				// $("#f_inputsTab_id_" + pf ).val(this.funcDescJSON.inputs[index].id);
				$("#f_inputsTab_label_" + pf ).val(this.funcDescJSON.inputs[index].label);
				$("#f_inputsTab_class_" + pf ).val(this.funcDescJSON.inputs[index].class);
				$("#f_inputsTab_dataType_" + pf ).val(this.funcDescJSON.inputs[index].dataType);
				$('#ui-dialog-title-f_addInputForm_' + pf).text(language[gui.language].forms.editExistingInput);
				$("#f_addInputForm_" + pf).dialog("open");
			},
			openEditOutput: function openEditOutput(index){
				// $("#f_outputsTab_id_" + pf ).val($("#" + sourceId + "_id").text());
				$("#f_outputsTab_label_" + pf ).val(this.funcDescJSON.outputs[index].label);
				$("#f_outputsTab_class_" + pf ).val(this.funcDescJSON.outputs[index].class);
				$("#f_outputsTab_dataType_" + pf ).val(this.funcDescJSON.outputs[index].dataType);
				$('#ui-dialog-title-f_addOutputForm_' + pf).text(language[gui.language].forms.editExistingOutput);	
				$("#f_addOutputForm_" + pf).dialog("open");
			},
			openEditNonFunc: function openEditNonFunc(index){
				$("#f_nonFunctionalDescriptionTab_weight_" + pf ).val(this.resultJSON.nonFunctionalDescription[index].weight);
				$("#f_nonFunctionalDescriptionTab_name_" + pf ).val(this.resultJSON.nonFunctionalDescription[index].name);
				$("#f_nonFunctionalDescriptionTab_relation_" + pf ).val(this.resultJSON.nonFunctionalDescription[index].relation);
				$("#f_nonFunctionalDescriptionTab_unit_" + pf ).val(this.resultJSON.nonFunctionalDescription[index].unit);
				$("#f_nonFunctionalDescriptionTab_value_" + pf ).val(this.resultJSON.nonFunctionalDescription[index].value);
				$('#ui-dialog-title-f_addNFPropertyForm_' + pf).text(language[gui.language].forms.editExistingNonFunctionalProperty);
				$("#f_addNFPropertyForm_" + pf).dialog("open");
			},
			openEditInputVariable: function openEditInputVariable(index){
				var sourceId = "f_inputVariables-" + index;
				$("#f_inputVariable_name_" + pf ).val( $("#" + sourceId + "_name").text() );
				$("#f_inputVariable_value_" + pf ).val( $("#" + sourceId + "_value").text() );
				$("#f_inputVariable_type_" + pf ).val( $("#" + sourceId + "_type").text() );
				$('#ui-dialog-title-f_addInputVariableForm_' + pf).text(language[gui.language].forms.editExistingInputVariable);
				this.clearInputVariableSelectionInTable();
				$("#f_addInputVariableForm_" + pf).dialog("open");
			},
			openEditGlobalNonFunc: function openEditGlobalNonFunc(index){
				var sourceId = "f_globalNFProps-" + index;
				// console.log("asdasda", $("#f_globalNonFunctionalDescriptionTab_weight_" + pf ).length )
				// console.log("#f_globalNonFunctionalDescriptionTab_weight_" + pf, "#" + sourceId + "_weight")
				$("#f_globalNonFunctionalDescription_weight_" + pf ).val($("#" + sourceId + "_weight").text());
				$("#f_globalNonFunctionalDescription_name_" + pf ).val($("#" + sourceId + "_name").text());
				$("#f_globalNonFunctionalDescription_relation_" + pf ).val($("#" + sourceId + "_relation").text());
				$("#f_globalNonFunctionalDescription_unit_" + pf ).val($("#" + sourceId + "_unit").text());
				$("#f_globalNonFunctionalDescription_value_" + pf ).val($("#" + sourceId + "_value").text());
				$('#ui-dialog-title-f_addGlobalNFPropertyForm_' + pf).text(language[gui.language].forms.editExistingGraphNonFunctionalProperty);
				this.clearGlobalNFPropertySelectionInTable();
				$("#f_addGlobalNFPropertyForm_" + pf).dialog("open");
			},
			editInputVariables : function editInputVariables(){
				this.resetInpVars();
				this.appendInpVar(gui.controler.current_graphData.inputVariables);
				$("#f_inputVariablesForm_" + pf).dialog("open");
			},
			editGlobalNonFunctionalParameters : function editNonFunctionalParameters(){
				this.resetGlobalNonFunDesc();
				this.appendGlobalNonFuncDesc(gui.controler.current_graphData.nonFunctionalParameters);
				$("#f_globalNFPropertiesForm_" + pf).dialog("open");
			},
			editGraphSaveParams : function editGraphSaveParams(){
				$("#f_graphSaveParamsForm_" + pf).dialog( "open" );
			},
		// Resety
			resetInpVars : function resetInpVars(){
				inpVars = [];
				$( "#f_inputVariables_" + pf + " tbody").html("");
			},
			resetGlobalNonFunDesc : function resetGlobalNonFunDesc(){
				globalNonFuncDesc = [];
				$( "#f_globalNFProps_" + pf + " tbody").html("");
			},
			resetAll: function resetAll(){
				this.cleanForm();
			},
		// Delety
			removeInput: function removeInput(){
				var index = this.getSelectedInputIndex();
				this.funcDescJSON.inputs[index] = undefined;
				$("#f_inputsTabxinputs-"+index).remove();
				this.resetSelectedInputIndex();
			},
			removeOutput: function removeOutput(){
				var index = this.getSelectedOutputIndex();
				this.funcDescJSON.outputs[index] = undefined; 
				$("#f_outputsTabxoutputs-"+index).remove();
				this.resetSelectedOutputIndex();
			},
			removeNonFunc: function removeNonFunc(nfProp){
				var index = this.getSelectedNFPropertyIndex();
				this.resultJSON.nonFunctionalDescription[index] = undefined;
				$("#f_nonFunctionalDescriptionTabxNFProps-"+index).remove();
				this.resetSelectedNFPropertyIndex();
			},
			removeInputVariable: function removeInputVariable(){
				var index = this.getSelectedInputVariableIndex();
				if(inpVars[index]){
					inpVars[index] = undefined;
					$( "#f_inputVariables-" + index).remove();
				}
				this.resetSelectedInputVariableIndex();
			},
			removeGlobalNonFunc: function removeNonFunc(nfProp){
				var index = this.getSelectedGlobalNFPropertyIndex();
				if(inpVars[index]){
					globalNonFuncDesc[index] = undefined;
					$( "#f_globalNFProps-" + index).remove();
				}

				this.resetSelectedGlobalNFPropertyIndex();
			},
			removeServiceClass: function removeServiceClass(serviceClass){
				var index = serviceClass.attr("id").split("_")[2];
				this.funcDescJSON.serviceClasses[index] = undefined; // :)
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

			//TODO: PORZĄDNIE zrealizować pomijanie ukrytych tabów
			nextTab: function nextTab(){
				var selected = $tabs.tabs('option', 'selected');
				if(selected==0 && $('#physicalDescriptionTab_' + pf).hasClass("ui-tabs-hide")) selected++;
				if(selected < 4) $tabs.tabs('select', selected+1);
			},
			previousTab: function previousTab(){
				var selected = $tabs.tabs('option', 'selected');
				if(selected==2 && $('#physicalDescriptionTab_' + pf).hasClass("ui-tabs-hide")) selected--;
				if(selected > 0) $tabs.tabs('select', selected-1);
			},
			closeForm: function closeForm(){
				$("#form_" + pf).dialog("close");
			}
		/*
		* EVENT HANDLERS END HERE
		*/
		};
		
		//Obsługa przycisków, kliknięć, etc. 		
		$("#f_button_sumbitAllButton_" + pf).button().click(function() {
			result.submitAll();
		});
		//Addy
		$("#f_mainTab_serviceClass_addButton_" + pf).button().click(
			function(event) {
				result.addServiceClass();
			}
		);
		$("#f_inputsTab_openAddInputForm_" + pf).button().click(
			function(event) {
				$( "#inputForm_" + pf )[0].reset();
				result.resetSelectedInputIndex();
				result.clearInputSelectionInTable();
				$('#ui-dialog-title-f_addInputForm_' + pf).text(language[gui.language].forms.newInput);
				$("#f_addInputForm_" + pf).dialog("open");
			}
		);
		$("#f_outputsTab_openAddOutputForm_" + pf).button().click(
			function(event) {
				$( "#outputForm_" + pf  )[0].reset();
				result.resetSelectedOutputIndex();
				result.clearOutputSelectionInTable();
				$('#ui-dialog-title-f_addOutputForm_' + pf).text(language[gui.language].forms.newOutput);
				$("#f_addOutputForm_" + pf).dialog("open");	
			}
		);
		$("#f_openAddInputVariableForm_" + pf).button().click(
			function(event) {
				$( "#inputVariableForm_" + pf )[0].reset();
				result.resetSelectedInputVariableIndex();
				result.clearInputVariableSelectionInTable();
				$('#ui-dialog-title-f_addInputVariableForm_' + pf).text(language[gui.language].forms.newInputVariable);
				$("#f_addInputVariableForm_" + pf).dialog("open");
			}
		);
		$("#f_nonFunctionalDescriptionTab_openAddNFPropertyForm_" + pf).button().click(
			function(event) {
				$( "#nonFuncDescForm_" + pf  )[0].reset();
				result.resetSelectedNFPropertyIndex();
				result.clearNFPropertySelectionInTable();
				$('#ui-dialog-title-f_addNFPropertyForm_' + pf).text(language[gui.language].forms.newNonFunctionalProperty);
				$("#f_addNFPropertyForm_" + pf).dialog("open");	
			}
		);
		$("#f_openAddGlobalNFPropertyForm_" + pf).button().click(
			function(event) {
				$( "#globalNonFuncDescForm_" + pf  )[0].reset();
				result.resetSelectedGlobalNFPropertyIndex();
				result.clearGlobalNFPropertySelectionInTable();
				$('#ui-dialog-title-f_addGlobalNFPropertyForm_' + pf).text(language[gui.language].forms.newGraphNonFunctionalProperty);
				$("#f_addGlobalNFPropertyForm_" + pf).dialog("open");	
			}
		);
		//Edity
		$("#f_inputsTab_openEditInputForm_" + pf).button().click(
			function(event) {
				var index = result.getSelectedInputIndex();
				if(index == -1)
					alert(language[gui.language].alerts.errors.noInputSelected);
				else{
					result.openEditInput(index);
				}
			}
		);
		$("#f_outputsTab_openEditOutputForm_" + pf).button().click(
			function(event) {
				var index = result.getSelectedOutputIndex();
				if(index == -1)
					alert(language[gui.language].alerts.errors.noOutputSelected);
				else{
					result.openEditOutput(index);
				}
			}
		);
		$("#f_openEditInputVariableForm_" + pf).button().click(
			function(event) {
				var index = result.getSelectedInputVariableIndex();
				if(index == -1)
					alert(language[gui.language].alerts.errors.noInputVariableSelected);
				else{
					result.openEditInputVariable(index);
				}
			}
		);
		$("#f_openEditGlobalNFPropertyForm_" + pf).button().click(
			function(event) {
				var index = result.getSelectedGlobalNFPropertyIndex();
				if(index == -1)
					alert(language[gui.language].alerts.errors.noGraphNonFunctionalPropertySelected);
				else{
					result.openEditGlobalNonFunc(index);
				}
			}
		);
		$("#f_nonFunctionalDescriptionTab_openEditNFPropertyForm_" + pf).button().click(
			function(event) {
				var index = result.getSelectedNFPropertyIndex();
				if(index == -1)
					alert(language[gui.language].alerts.errors.noNonFunctionalPropertySelected);
				else{
					result.openEditNonFunc(index);
				}
			}
		);
		//Delety
		$("#f_inputsTab_deleteThisInput_" + pf).button().click(
			function(event) {
				var index = result.getSelectedInputIndex();
				if(index == -1)
					alert(language[gui.language].alerts.errors.noInputSelected);
				else{
					result.removeInput();
				}
			}
		);
		$("#f_outputsTab_deleteThisOutput_" + pf).button().click(
			function(event) {
				var index = result.getSelectedOutputIndex();
				if(index == -1)
					alert(language[gui.language].alerts.errors.noOutputSelected);
				else{
					result.removeOutput();
				}
			}
		);
		$("#f_deleteThisInputVariable_" + pf).button().click(
			function(event) {
				var index = result.getSelectedInputVariableIndex();
				if(index == -1)
					alert(language[gui.language].alerts.errors.noInputVariableSelected);
				else{
					result.clearInputVariableSelectionInTable();
					result.removeInputVariable();
				}
			}
		);
		$("#f_nonFunctionalDescriptionTab_deleteThisNFProperty_" + pf).button().click(
			function(event) {
				var index = result.getSelectedNFPropertyIndex();
				if(index == -1)
					alert(language[gui.language].alerts.errors.noEntrySelected);
				else{
					result.removeNonFunc();
				}
			}
		);
		$("#f_deleteThisGlobalNFProperty_" + pf).button().click(
			function(event) {
				var index = result.getSelectedGlobalNFPropertyIndex();
				if(index == -1)
					alert(language[gui.language].alerts.errors.noEntrySelected);
				else{
					result.clearGlobalNFPropertySelectionInTable();
					result.removeGlobalNonFunc();
				}
			}
		);

		//RESETY
		$("#f_button_resetAllButton_" + pf).button().click(
			function(event) {
				event.preventDefault();
				$( "#f_dialog_confirm1_" + pf ).dialog("open");
			}
		);
		$("#f_button_clearNonFunctional_" + pf).button().click(
			function(event) {
				event.preventDefault();
				result.clearNF();
			}
		);
		//Next/Back
		$('button[id$="Tab_nextButton_' + pf + '"]').button().click(function() {
				result.nextTab();
			}
		);
		$('button[id$="Tab_backButton_' + pf + '"]').button().click(function() {
				result.previousTab();
			}
		);
		//Zaznaczanie wybranego I/O/NFProperty w tabelce; dblclick -> edit selected
		$('tr[id^="f_inputsTabxinputs"]').live("click", function(event){
			var index = event.target.id.split("_")[1].split("-")[1];
			result.clearInputSelectionInTable();
			if(result.getSelectedInputIndex() == index)
				result.resetSelectedInputIndex();
			else{
				result.setSelectedInputIndex(index);
				$(this).addClass("ui-state-active");
			}
		});
		$('tr[id^="f_inputsTabxinputs"]').live("dblclick", function(event){
			var index = event.target.id.split("_")[1].split("-")[1];
			setTimeout(function(){result.setSelectedInputIndex(index);},1000);
			result.openEditInput(index);
		});
		$('tr[id^="f_outputsTabxoutputs"]').live("click", function(event){
			var index = event.target.id.split("_")[1].split("-")[1];
			result.clearOutputSelectionInTable();
			if(result.getSelectedOutputIndex() == index)
				result.resetSelectedOutputIndex();
			else{
				result.setSelectedOutputIndex(index);
				$(this).toggleClass("ui-state-active");
			}
		});
		$('tr[id^="f_outputsTabxoutputs"]').live("dblclick", function(event){
			var index = event.target.id.split("_")[1].split("-")[1];
			setTimeout(function(){result.setSelectedOutputIndex(index);},1000);
			result.openEditOutput(index);
		});
		$('tr[id^="f_inputVariables"]').live("click", function(event){
			var index = event.target.id.split("_")[1].split("-")[1];
			result.clearInputVariableSelectionInTable();
			if(result.getSelectedInputVariableIndex() == index)
				result.resetSelectedInputVariableIndex();
			else{
				result.setSelectedInputVariableIndex(index);
				$(this).addClass("ui-state-active");
			}
		});
		$('tr[id^="f_inputVariables"]').live("dblclick", function(event){
			var index = event.target.id.split("_")[1].split("-")[1];
			setTimeout(function(){result.setSelectedInputVariableIndex(index);},1000);
			result.openEditInputVariable(index);
		});
		$('tr[id^="f_globalNFProps"]').live("click", function(event){
			var index = event.target.id.split("_")[1].split("-")[1];
			result.clearGlobalNFPropertySelectionInTable();
			if(result.getSelectedGlobalNFPropertyIndex() == index)
				result.resetSelectedGlobalNFPropertyIndex();
			else{
				result.setSelectedGlobalNFPropertyIndex(index);
				$(this).toggleClass("ui-state-active");
			}
		});
		$('tr[id^="f_globalNFProps"]').live("dblclick", function(event){
			var index = event.target.id.split("_")[1].split("-")[1];
			setTimeout(function(){result.setSelectedGlobalNFPropertyIndex(index);},1000);
			result.openEditGlobalNonFunc(index);
		});
		$('tr[id^="f_nonFunctionalDescriptionTabxNFProps"]').live("click", function(event){
			var index = event.target.id.split("_")[1].split("-")[1];
			result.clearNFPropertySelectionInTable();
			if(result.getSelectedNFPropertyIndex() == index)
				result.resetSelectedNFPropertyIndex();
			else{
				result.setSelectedNFPropertyIndex(index);
				$(this).toggleClass("ui-state-active");
			}
		});
		$('tr[id^="f_nonFunctionalDescriptionTabxNFProps"]').live("dblclick", function(event){
			var index = event.target.id.split("_")[1].split("-")[1];
			setTimeout(function(){result.setSelectedNFPropertyIndex(index);},1000);
			result.openEditNonFunc(index);
		});
		//usuwanie SC via kliknięce na niej; TODO: małe iksiki zamiast klikania na span
		$('span[id^="f_sc_"]').live("click", function(form){
			return (function(){
				form.removeServiceClass($(this));
			});
		}(result));

		//przyciski w oknach modalnych nie związane bezpośrednio z CRUD: confirmy i cancele
		$("#f_button_resetConfirm1_" + pf).button().click(
			function(event) {
				$( "#f_dialog_confirm1_" + pf ).dialog("close");
				$( "#f_dialog_confirm2_" + pf ).dialog("open");
			}
		);
		$("#f_button_resetConfirm2_" + pf).button().click(
			function(event) {
				$( "#f_dialog_fine_" + pf ).dialog("open");
				$( "#f_dialog_confirm2_" + pf ).dialog("close");
				result.resetAll();
			}
		);
		$("#f_button_resetCancel1_"+pf).button().click(
			function(event) {
				$( "#f_dialog_confirm1_" + pf ).dialog("close");
				return false;
			}
		);
		$("#f_button_resetCancel2_"+pf).button().click(
			function(event) {
				$( "#f_dialog_confirm2_" + pf ).dialog("close");
				return false;
			}
		);
		$("#f_addInputForm_changesConfirm_" + pf).button().click(
			function(event) {
				result.addInput();
			}			
		);
		$("#f_addOutputForm_changesConfirm_" + pf).button().click(
			function(event) {
				result.addOutput();
			}			
		);
		$("#f_addNFPropertyForm_changesConfirm_" + pf).button().click(
			function(event) {
				result.addNonFunctional();
			}		
		);
		$("#f_addGlobalNFPropertyForm_changesConfirm_" + pf).button().click(
			function(event) {
				result.addGlobalNonFunctional();
			}
		);
		$("#f_addInputVariableForm_changesConfirm_" + pf).button().click(
			function(event) {
				result.addInputVariable();
			}	
		);
		$("#f_inputVariablesForm_changesConfirm_" + pf).button().click(
			function(event) {
				for(var i in inpVars)
					if(!inpVars[i])
						inpVars.splice(i, 1);
				gui.controler.current_graphData.inputVariables = inpVars;
				$( "#f_inputVariablesForm_" + pf ).dialog( "close" );
			}		
		);
		$("#f_globalNFPropertiesForm_changesConfirm_" + pf).button().click(
			function(event) {
				for(var i in globalNonFuncDesc)
					if(!globalNonFuncDesc[i])
						globalNonFuncDesc.splice(i, 1);
				gui.controler.current_graphData.nonFunctionalParameters = globalNonFuncDesc;
				$( "#f_globalNFPropertiesForm_" + pf ).dialog( "close" );
			}	
		);
		$("#f_graphSaveParamsForm_changesConfirm_" + pf).button().click(
			function(event) {
				var result = gui.view.form.collectGraphSaveParams();
				if(result){
					$( "#f_graphSaveParamsForm_" + pf ).dialog( "close" );
					gui.controler.reactOnEvent("save", result)
				} else {
					alert(language[gui.language].alerts.inputData);
				}
			}	
		);
		$('button[id$="Form_changesCancel_' + pf + '"]').button().click(function(event) {
				$( "#f_" + event.target.id.split("_")[1] + "_" + pf ).dialog( "close" );
			}
		);

		//OBSŁUGA OKIEN MODALNYCH		
		$( "#f_dialog_confirm1_" + pf ).dialog({
			autoOpen: false,
			resizable: false,
			height: 200,
			width: 320,
			modal: true
		});
		$( "#f_dialog_confirm2_" + pf ).dialog({
			autoOpen: false,
			resizable: false,
			height: 200,
			width: 320,
			modal: true
		});
		$( "#f_dialog_fine_" + pf ).dialog({
			autoOpen: false,
			resizable: false,
			modal: true,
			buttons: {
				OK: function() {
					$( this ).dialog( "close" );
				}
			}
		});
		$("#f_addInputForm_" + pf).dialog({
			autoOpen: false,
			modal: true,
			height: 250,
			width: 450
		});
		$("#f_addOutputForm_" + pf).dialog({
			autoOpen: false,
			modal: true,
			height: 250,
			width: 450
		});
		$("#f_addNFPropertyForm_" + pf).dialog({
			autoOpen: false,
			modal: true,
			height: 300,
			width: 500
		});
		$("#f_addGlobalNFPropertyForm_" + pf).dialog({
			autoOpen: false,
			modal: true,
			height: 300,
			width: 350
		});
		$("#f_addInputVariableForm_" + pf).dialog({
			autoOpen: false,
			modal: true,
			height: 300,
			width: 350
		});
		$("#f_inputVariablesForm_" + pf).dialog({
			autoOpen: false,
			modal: true,
			height: 350,
			width: 500
		});
		$("#f_globalNFPropertiesForm_" + pf).dialog({
			autoOpen: false,
			modal: true,
			height: 350,
			width: 500
		});
		$("#f_graphSaveParamsForm_" + pf).dialog({
			autoOpen: false,
			modal: true,
			height: 200,
			width: 300
		});

		return result;
	};
	function nodeVisualizator(view){
		var outputObject = {
			// color : {
			// 	service : "#fbec88",
			// 	functionality: "#fbec88"
			// },
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
					drawIO : function drawIO(paper){
						var length = this.inputs.length, x, y, that = this,
							start = function(){
								gui.view.hideEdges();
								this.ox = 0;
							},
							//HELP NEEDED - co zrobić, żeby się nie rysowały te cholerne strzałki?!?!?!
							move = function(dx){
								var nx = this.getBBox().x + dx; //WTF this is SO broken
								if(nx > that.x && nx < (that.x + that.width)){
									this.translate(dx - this.ox);
									this.dist1 += (dx - this.ox); this.dist2 -= (dx - this.ox); this.ox = dx; 
								}
							},
							end = function(){
								gui.view.updateEdges();
							};
						if(this.type.toLowerCase() === "control"){
							var mult = 1/1.41,	//odwrotność pierwiastka z 2
								nx = this.x-5, ny = this.y-5, nr = this.r, //nx, ny = współrzędne node'a, nr = promień
								coordsList = [
								[nx-nr, ny], [nx+nr, ny], [nx, ny+nr], [nx, ny-nr],
								[nx+nr*mult, ny+nr*mult], [nx+nr*mult, ny-nr*mult],
								[nx-nr*mult, ny+nr*mult], [nx-nr*mult, ny-nr*mult]];
							for(var i = 0; i < length; i++){
								if(i<8){ x = coordsList[i][0]; y = coordsList[i][1]; }
								else{ x = coordsList[i%8][0] * (1 + 0.1*(i/8)); y = coordsList[i%8][1] * (1 + 0.1*(i/8)); } //to nie za bardzo działa...
								this.inputs[i].node = paper.path(this.inputPathString(x, y)).attr({'fill': this.color});
								this.inputs[i].node.node.setAttribute("class", this.id + " input " + this.inputs[i].id);
							}
							length = this.outputs.length;
							for(var i = 0; i < length; i++){
								if(i<8){ x = coordsList[i][0]; y = coordsList[i][1]; }
								else{ x = coordsList[i%8][0] * (1 + 0.1*(i/8)); y = coordsList[i%8][1] * (1 + 0.1*(i/8)); } //to nie za bardzo działa...
								this.outputs[i].node = paper.path(this.outputPathString(x, y)).attr({'fill': this.color});
								this.outputs[i].node.node.setAttribute("class", this.id + " output " + this.outputs[i].id);
							}
						}
						else {
							var spacing = this.width/(length+1);
							for(var i = 0; i < length; i++){
								x = this.x + (i+1)*spacing; y = this.y-10;
								this.inputs[i].node = paper.path(this.inputPathString(x, y)).attr({'fill': this.color});
								// this.inputs[i].node.drag(move, start, end);
								this.inputs[i].node.node.setAttribute("class", this.id+" input " + this.inputs[i].id);
							}
							length = this.outputs.length; spacing = this.width/(length+1);
							for(var i = 0; i < length; i++){
								x = this.x + (i+1)*spacing; y = this.y+this.height;
								this.outputs[i].node = paper.path(this.outputPathString(x, y)).attr({'fill': this.color});
								// this.outputs[i].node.drag(move, start, end);
								this.outputs[i].node.node.setAttribute("class", this.id+" input " + this.outputs[i].id);
							}
						}
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
				newNode.serviceName = node.physicalDescription.serviceName;
				newNode.set = view.paper.set();
				newNode.hasSubgraph = !isEmpty(node.subgraph);
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
				node.color = "white";
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
				view.dragDFArrow(node.outputs.map(function(o){ return o.node; }), node);

				return node;
			},
			draw_serviceNode : function draw_serviceNode(node, paper, drawNotForRepo){
				// if(!drawNotForRepo)
				// 	a(node.id)
				var id = node.id,
					radius = 4,
					color = ( node.type.toLowerCase() == "mediator" ? "white" : "#fbec88" ),
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

				node.drawIO(paper);

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
					view.dragDFArrow(node.outputs.map(function(o){ return o.node; }), node);
				}

				node.set.push(rect, label, img_gear, img_subgraph, serviceNameShown);
				
				return node;
			},
			draw_functionalityNode : function draw_functionalityNode(node){
				node.color = "#a6c9e2";
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
		outputObject.extendVisualisation("Mediator", outputObject.draw_serviceNode);

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
					x -= (oldNode.r / 2 + 130 / 2); //130 to szerokość node-a
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
			this.form.initToEdit(node);
		},

		deleteNode : function deleteNode(node){
			gui.controler.reactOnEvent("NodeDeleted");
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
				stop = function stop(evt){
					ready2move = false;
					gui.controler.reactOnEvent("NODESELECTED");
					if(itWasJustAClick){
						if(ctrl){
							if(!flag) {
								node.highlight(ctrl);
							}
						}
						else {
							gui.controler.reactOnEvent("DESELECT");
							node.highlight2();
						}
						that.showEdges();
						// gui.controler.reactOnEvent("ESCAPE");
					}
					else {
						// gui.controler.reactOnEvent("NodeMoved");
					}
					that.updateEdges();
				}

				if(getType(element) === "array"){
					$.each(element, function(){
						this.drag(move, start, stop);
					});
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

							if(confirm(language[gui.language].alerts.addOutputS+sourceNode.label+language[gui.language].alerts.addOutputE)){
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
							gui.logger.error(language[gui.language].alerts.errors.error, language[gui.language].alerts.errors.ioDiffType)
						}
					}
					else {
						var targetNode = gui.view.getNodesInsideRect(event.clientX-offsetX + window.scrollX, event.clientY - offsetY + window.scrollY);
						if(targetNode && sourceNode && targetNode.id !== sourceNode.id && ( targetNode.type.toLowerCase() == "functionality" || targetNode.type.toLowerCase() == "control" ) ){
							if(confirm(language[gui.language].alerts.addInputS +  targetNode.label+ language[gui.language].alerts.addInputE)){
								gui.controler.reactOnEvent("addInput", {
									sourceId : sourceNode.id,
									targetId : targetNode.id,
									output : output
								});
							}
						}

						// $("#f_addInputForm")
						// wyrmularz, z uzupełnionymi polami
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
					gui.controler.reactOnEvent("ESCAPE");
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
			// console.log(data)
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
				gui.controler.reactOnEvent(""); //err msg
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
					var deployerOutput = gui.controler.deploy(graph_json, paper.width);
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
	outputView.bottomBar = drawBottomBar(outputView.paper);
	outputView.form = form();
	outputView.blankNodes = blankNode();
	outputView.mainMenu = menu(189, 0, "top_menu_"+pf, "polish");
	outputView.mainMenu.init(); 

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