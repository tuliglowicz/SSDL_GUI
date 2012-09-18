//Poczatek pliku menu.js
	// suppported by Matka Boska Partyzantcka 
	function menu(x, y, addToDiv){
		var view = gui.view; //tymczasowo na potrzeby rozszczepienia pluginĂłw po plikach
		var lang = language[gui.language];
		var mainMenu = {
			przesuwne: 0,
			clicked: false,
			menuContener: $("<div id='menuContener' class=\"mMenuMainContener\"> </div>").appendTo("#top_menu_"+pf),
			addGroup: function addGroup(label) {
				var that = this;
				$("<div id=" + label + " class=mMenuGroup style='  left:" + this.przesuwne + "'>" + ( lang.mainMenu[camelize(label)] || "") + "</div>")
				.appendTo('#menuContener')
				.mouseenter(function() {
					if (that.clicked) {						
						$('div.mMenuContener').hide();
						$('div.mMenuSubcontener').hide();
						$('#' + label + '_contener').show();
						$('div.mMenuGroup').css('background-image', 'url("images/dropdown-bg.gif")');

					}
					$('#' + label).css('background-image', 'url("images/dropdown-bg-hover.gif")');
				}).mouseleave(function() {
					if (that.clicked == false) $('#' + label).css('background-image', 'url("images/dropdown-bg.gif")')
				}).click(function() {
					if (that.clicked) {
						$('div.mMenuContener').hide();
						that.clicked = !that.clicked;
					} else {
						gui.view.menuList.getInstance().secure();
						$('#' + label).css('background-image', 'url("images/dropdown-bg-hover.gif")');
						$('div.mMenuContener').hide();
						$('#' + label + '_contener').show();
						that.clicked = !that.clicked;
					}
				});

				$("<div id=" + label + "_contener" + " class=mMenuContener style='left:" + that.przesuwne + "px'></div>").appendTo('#menuContener').hide();
				that.przesuwne = that.przesuwne + $('#' + label).width();
			},
			addOption: function addOption(groupLabel, optionLabel, functionOnClick, shortcutString) {

				$("<div id=" + groupLabel + "_" + optionLabel.replace(/ /g, "_") + " class=mMenuGroupOption +  style='  left=" + $('#' + groupLabel).position().left + "'>" + ( lang.mainMenu[camelize(optionLabel)] || "") + " </div>").appendTo('#' + groupLabel + '_contener').mouseenter(function() {
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
					this.clicked = false;
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
						}
					})
					.appendTo($('#'+groupLabel + "_" + optionLabel.replace(/ /g, "_")));
				}
				$("<div id=" + groupLabel + "_" + optionLabel.replace(/ /g, "_") + "_" + subOptionLabel.replace(/ /g, "_") + " class=mMenuSubOption  style='   left=" + $('#' + groupLabel).position().left + "'>" + "" + " </div>")
				.appendTo($('#' + groupLabel + '_' + optionLabel.replace(/ /g, "_") + "_subcontener"))
				.mouseenter(function() {
					$(this).css('background-image', 'url("images/dropdown-bg-hover.gif")');
				}).mouseleave(function() {
					$(this).css('background-image', "none");
				}).click(function() {
					$('div.mMenuContener').hide();
					$('div.mMenuSubcontener').hide();
					$('div.mMenuGroup').css('background-image', 'url("images/dropdown-bg.gif")');
					this.clicked = false;
				}).click(functionOnClick);

				$('#'+groupLabel + "_" + optionLabel.replace(/ /g, "_") + "_" + subOptionLabel.replace(/ /g, "_")).html(( lang.mainMenu[camelize(subOptionLabel)] || ""));
				
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
			showsubOption: function showsubOption(groupLabel, optionLabel, subOptionLabel) {
				$('#' + groupLabel + '_' + optionLabel.replace(/ /g, "_") + "_" + subOptionLabel.replace(/ /g, "_")).show();
			},
			showOption: function showOption(groupLabel, optionLabel) {
				$('#' + groupLabel + '_' + optionLabel.replace(/ /g, "_")).show();
			},
			close: function close(){
				this.clicked = false;
				$('div.mMenuContener').hide();
				$('div.mMenuSubcontener').hide();
				$('div.mMenuGroup').css('background-image', 'url("images/dropdown-bg.gif")');
			},
			init: function init(){
				// var outputView = gui.view;

				var x = gui.view.columnParams.leftCol.width;
				var width = gui.view.columnParams.top_menu.width - x;

				$("#menuContener").css({
					top : 0,
					left : x,
					width : width
				});

				this.addGroup("File");
				this.addGroup("Edit");
				this.addGroup("Graph");
				this.addGroup("View");
				this.addGroup("Help");
				this.addOption("File", "New Node" , function(){}, "");
				this.addSeparator("File");
				this.addOption("File", "Load", function(){}, "");
				this.addSubOption("File","Load","From DB", function(){alert("Not implemented yet!");},"" );
				this.addSubOption("File","Load","From File", function(){alert("Not implemented yet!");},"" );
				this.addOption("File", "Save", function(){}, "");
				this.addSubOption("File","Save","To DB", function(){alert("Not implemented yet!");},"" );
				this.addSubOption("File","Save","To File", function(){alert("Not implemented yet!");},"" );
				this.addSubOption("File","Save","To DB and Deploy", function(){alert("Not implemented yet!");},"" );
				this.addSubOption("File", "New Node", "Service node", function(){
					var nodeType="Service";
				var label = prompt(language[gui.language].alerts.addLabelNewNode);
							if(label) gui.controler.reactOnEvent("AddBlankNode", {nodeLabel:label, nodeType:nodeType}); }, "CTRL+N+S");
				this.addSubOption("File", "New Node", "Functionality node", function(){ 		var nodeType="Functionality";
					var label = prompt(language[gui.language].alerts.addLabelNewNode);
							if(label) gui.controler.reactOnEvent("AddBlankNode", {nodeLabel:label, nodeType:nodeType}); }, "CTRL+N+F");
				this.addSubOption("File", "New Node", "Mediator node", function(){ 		var nodeType="Mediator";
					var label = prompt(language[gui.language].alerts.addLabelNewNode);
							if(label) gui.controler.reactOnEvent("AddBlankNode", {nodeLabel:label, nodeType:nodeType}); }, "CTRL+N+F");
				
				this.addSubOption("File","New Node","Start Stop",function(){gui.controler.reactOnEvent("ADDSTARTSTOPAUTOMATICALLY");},"CTRL+S+A");
				this.addOption("Graph", "Validate", function(){alert("Not implemented yet!");}, "");
				this.addOption("Graph", "Test", function(){alert("Not implemented yet!");}, "");
				this.addOption("View", "Control Flow", function(){gui.controler.reactOnEvent("SwitchMode", {mode: "CF"});}, "");
				this.addOption("View", "Data Flow" , function(){gui.controler.reactOnEvent("SwitchMode", {mode: "DF"});}, "");
				this.addSeparator("View");
				this.addOption("View", "Console" , function(){gui.logger.open()}, "");
				this.addOption("Edit","Undo",function(){},"");
				this.addSubOption("Edit", "Undo", "One step", function(){alert("Not implemented yet!");}, "CTRL+Z");
				this.addSubOption("Edit", "Undo", "All", function(){alert("Not implemented yet!");}, "CTRL+Z+A");
				this.addOption("Edit","Redo",function(){},"");
				this.addSubOption("Edit", "Redo", "One step", function(){alert("Not implemented yet!");}, "CTRL+Z");
				this.addSubOption("Edit", "Redo", "All", function(){alert("Not implemented yet!");}, "CTRL+Z+A");
				this.addSeparator("Edit");
				this.addOption("Edit","Input Variables",function(){gui.view.form.editInputVariables();},"");
				this.addOption("Edit","Non functional parameters",function(){gui.view.form.editGlobalNonFunctionalParameters();},"");
				this.addSeparator("Edit")
				this.addOption("Edit","Clear",function(){var clearer = confirm("Czy na pewno?" ); if(clearer)gui.controler.reactOnEvent("CLEARGRAPH");},"");
				this.addOption("Help","Documentation",function(){alert("In this platel no one will help you, even Volodia.")},"");
				this.addSeparator("Help");
				this.addOption("Help","About",function(){alert(" Nothing to say about this.")},"");

				// jsonFormatter(gui, 1, 1);
				gui.view.menuList.getInstance().push(this);
			}
		};

		return mainMenu;	
	};
//Koniec pliku menu.js
//Poczatek pliku contextMenu.js

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
//Koniec pliku contextMenu.js
//Poczatek pliku tooltipper.js
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
//Koniec pliku tooltipper.js
//Poczatek pliku preloader.js
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
//Koniec pliku preloader.js
//Poczatek pliku blankNode.js
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
							if(nodeType==="EmulationService"){
								$("#f_dialog_emulationService_" + pf).dialog('open');
							}
							else{
							var label = prompt(language[gui.language].alerts.addLabelNewNode);
							if(label) gui.controler.reactOnEvent("AddBlankNode", {nodeLabel:label, nodeType:nodeType});
						}
					}
				}

				var text_service = this.paper.text(textHorizontalPosition,10, language[gui.language].nodes.service);
				text_service.node.setAttribute("class","repository_text");
				this.dataSet.push(text_service);
				var repo_service = this.paper.rect(nodeHorizontalPosition,20,nodeLength,nodeHeight,5)
					.attr({fill: CFG.colors.service})
					.dblclick(onDblClick("Service"));
				repo_service.node.setAttribute("class","repository_element");
				this.dataSet.push(repo_service);
				var text_functionality = this.paper.text(textHorizontalPosition,70,language[gui.language].nodes.functionality);
				text_functionality.node.setAttribute("class","repository_text");
				this.dataSet.push(text_functionality);
				var repo_functionality = this.paper.rect(nodeHorizontalPosition,80,nodeLength,nodeHeight,5)
					.attr({fill: CFG.colors.functionality})
					.dblclick(onDblClick("Functionality"));
				repo_functionality.node.setAttribute("class","repository_element");
				this.dataSet.push(repo_functionality);
				var text_mediator = this.paper.text(textHorizontalPosition,130,language[gui.language].nodes.mediator);
					// .hide();
					text_mediator.node.setAttribute("class","repository_text");
				this.dataSet.push(text_mediator);
				var repo_mediator = this.paper.rect(nodeHorizontalPosition,140,nodeLength,nodeHeight,5)
					.attr({fill: CFG.colors.mediator })
					.dblclick(onDblClick("Mediator"));
					// .hide();
				repo_mediator.node.setAttribute("class","repository_element");	
				this.dataSet.push(repo_mediator);

				var text_emulationService = this.paper.text(textHorizontalPosition,190,language[gui.language].nodes.emulationService);
					// .hide();
					text_emulationService.node.setAttribute("class","repository_text");
				this.dataSet.push(text_emulationService);
				var repo_emulationService = this.paper.rect(nodeHorizontalPosition,200,nodeLength,nodeHeight,5)
					.attr({fill: CFG.colors.emulationService})
					.dblclick(onDblClick("EmulationService"));
					// .hide();
				repo_emulationService.node.setAttribute("class","repository_element");	
				this.dataSet.push(repo_emulationService);
			}
		};
		return tmp;
	};
//Koniec pliku blankNode.js
//Poczatek pliku bottomBar.js
	function bottomBar(paper){
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
								that.generalFontReset();
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
					//arg: o ile pikseli zwiększyć/zmniejszyć czcionkę w labelach buttonów, non-obligatory
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
//Koniec pliku bottomBar.js
//Poczatek pliku form.js

	function form() {
	// tutaj ustawiam LANG na forms
		var langForms = language[gui.language].forms;
		var langAlerts = language[gui.language].alerts
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
					button: true,
					list: true
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
				tabLabel: "emulation",
				tabId: "emulationTab",
				formId: "emulationForm",
				fields: [{
					label: "id",
					id: "f_emulationTab_id",
					inputType: "textBox",
					validation: function(){},
					values:[]
				},
				{
					label: langForms.xmlIOFile,
					id: "f_emulationTab_vectors",
					inputType: "textArea",
					validation: function(){},
					values:[],
					button: true
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
			],
		resultJSON = {
			nodeId:"",
			nodeLabel:"",
			nodeType:"",
			physicalDescription:{},
			functionalDescription:{},
			nonFunctionalDescription:[],
			alternatives:"",
			subgraph:{},
			controlType:"",
			condition:"",
			sources:[]
		},
		physDescJSON = {
			serviceName:"",
			serviceGlobalId:"",
			address:"",
			operation:""
		},
		funcDescJSON = {
			description:"",
			serviceClasses:[],
			metaKeywords:[],
			inputs:[],
			outputs:[],
			preconditions:"",
			effects:""
		},
		emulationJSON = {
			id:"",
			// name:"",
			// xmlIOfile:""
			vectors:""
		};

		var tabsTab = [
			"#mainTab_"+pf,
			"#physicalDescriptionTab_"+pf,
			"#inputsTab_"+pf,
			"#outputsTab_"+pf,
			"#nonFunctionalDescriptionTab_"+pf,
			"#emulationTab_"+pf
		];
		
		formAppender(gui.language,pf);
		$("#tabs-1_" + pf).prepend(formGenerator(gui.language, pf, formJSON[0]));	
		$("#tabs-2_" + pf).prepend(formGenerator(gui.language, pf, formJSON[1]));	
		$("#f_addInputForm_" + pf).prepend(formGenerator(gui.language, pf, formJSON[2]));	
		$("#f_addOutputForm_" + pf).prepend(formGenerator(gui.language, pf, formJSON[3]));	
		$("#f_addNFPropertyForm_" + pf).prepend(formGenerator(gui.language, pf, formJSON[4]));
		$("#tabs-6_" + pf).prepend(formGenerator(gui.language, pf, formJSON[5]));	
		$("#f_addGlobalNFPropertyForm_" + pf).prepend(formGenerator(gui.language, pf, formJSON[6]));
		$("#f_addInputVariableForm_" + pf).prepend(formGenerator(gui.language, pf, formJSON[7]));
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
			globalNonFuncDesc = [],
			lastEditedNode;

		var result = {
			resultJSON: resultJSON,
			physDescJSON: physDescJSON,
			funcDescJSON: funcDescJSON,
			emulationJSON: emulationJSON,
			selectedInputIndex: -1,
			selectedOutputIndex: -1,
			selectedNFPropertyIndex: -1,
			selectedInputVariableIndex: -1,
			selectedGlobalNFPropertyIndex: -1,

			init: function init(node){
				var titleText;
				if(!node.isBlank) titleText = langForms.viewing + node.nodeType + langForms.typeNode +  langForms.labeled + node.nodeLabel;
				else titleText = langForms.createA + node.nodeType + langForms.typeNode + langForms.labeled + node.nodeLabel; 
				this.clearErrors();
				this.cleanForm(true);
				$('#ui-dialog-title-form_'+pf).text(titleText);
				$( "#f_mainTab_label_" + pf ).val(node.nodeLabel);
				$( "#f_mainTab_controlType_" + pf ).val(node.controlType);
				if(node.nodeType.toLowerCase() == "emulationservice" && node.emulation){
					$( "#f_emulationTab_id_" + pf ).val(node.emulation.id || "")
					$( "#f_emulationTab_vectors_" + pf ).val(node.emulation.vectors || "")
				}
				if(!node.isBlank) {
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
				} else {
					$( "#f_physicalDescriptionTab_serviceName_" + pf ).val("").addClass("longTextfield");
					$( "#f_physicalDescriptionTab_serviceGlobalId_" + pf ).val("").addClass("longTextfield");
					$( "#f_physicalDescriptionTab_address_" + pf ).val("").addClass("longTextfield");
					$( "#f_physicalDescriptionTab_operation_" + pf ).val("").addClass("longTextfield");
				}
				this.adjustForm(node.nodeType);
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
			adjustForm: function adjustForm(nodeType){
				//żeby nie powtarzały się fragmenty kodu - przyjmujemy "functionality" za default i ew. edytujemy od tego miejsca
				$( 'label[for="f_mainTab_controlType_' + pf + '"], #f_mainTab_controlType_' + pf + ', #f_mainTab_controlType_validation_' + pf ).hide();
				$('#physicalDescriptionTab_' + pf).addClass("ui-tabs-hide");
				$('#tabs-2_' + pf).hide();
				$('#emulationTab_' + pf).addClass("ui-tabs-hide");
				$('#tabs-6_' + pf).hide();
				$('#f_nonFunctionalDescriptionTab_nextButton_' + pf).hide();
				$('label[for="f_mainTab_serviceClass_' + pf + '"], #f_mainTab_serviceClass_' + pf).show();
				$('#f_mainTab_serviceClass_addButton_' + pf).show();
				switch(nodeType.toLowerCase()){
					case "control" : 
						$( 'label[for="f_mainTab_controlType_' + pf + '"], #f_mainTab_controlType_' + pf + ', #f_mainTab_controlType_validation_' + pf ).show();
						$('label[for="f_mainTab_serviceClass_' + pf + '"], #f_mainTab_serviceClass_' + pf).hide();
						$('#f_mainTab_serviceClass_addButton_' + pf).hide();
						break;
					case "functionality" :
						break;	//bez zmian
					case "emulationservice" : 
						$('#emulationTab_' + pf).removeClass("ui-tabs-hide");
						$('#tabs-6_' + pf).show();
						$tabs.tabs('select', 5);
						$('#f_nonFunctionalDescriptionTab_nextButton_' + pf).show();
						$('#f_emulationTab_id_' + pf).prop('disabled', 'true').addClass('ui-state-disabled');
						break;
					default : 
						$('#physicalDescriptionTab_' + pf).removeClass("ui-tabs-hide");
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
				if( !total ){ 
					var temp = this.resultJSON.nodeId,
					temp2 = this.resultJSON.nodeType;}
				this.resultJSON = {"nodeId":"","nodeLabel":"","nodeType":"","physicalDescription":[],"functionalDescription":[],"nonFunctionalDescription":[],"alternatives":"","subgraph":{},"controlType":"","condition":"","sources":[]};
				this.physDescJSON = {"serviceName":"","serviceGlobalId":"","address":"","operation":""};
				this.funcDescJSON = {"description":"","serviceClasses":[],"metaKeywords":[],"inputs":[],"outputs":[],"preconditions":"","effects":""};
				this.emulationJSON = {id:"",vectors:""};
				this.clearInputs();
				this.clearOutputs();
				this.clearNF();
				if( !total ){ 
					this.resultJSON.nodeId = temp;
					this.resultJSON.nodeType = temp2;
				}
				// $( "#f_mainTab_source" ).val("");
				// $( "#f_mainTab_sources" ).empty();
				$( "#f_mainTab_sClasses_" + pf ).empty();
				// $( "#f_functionalDescription_mKeywords" ).empty();
				$( "#mainForm_" + pf )[0].reset();
				$( "#physDescForm_" + pf )[0].reset();
				$( "#emulationForm_" + pf )[0].reset();				
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
				// console.log(this.resultJSON.nodeLabel);
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

				this.emulationJSON.id = $("#f_emulationTab_id_" + pf).val();
				this.emulationJSON.vectors = $("#f_emulationTab_vectors_" + pf).val();
				// this.emulationJSON.name = $("#f_emulationTab_name_" + pf).val();
				this.resultJSON.emulation = this.emulationJSON;
				// alert(this.emulationJSON.vectors+":"+this.emulationJSON.id)
				// alert(this.resultJSON.emulation.id+":"+this.resultJSON.emulation.vectors)

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
					else alert(langAlerts.errors.inputExists);		
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
					else alert(langAlerts.errors.outputExists); //TODO: te alerciątka jako modal dialogs
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
					else alert(langAlerts.errors.nFPropExists);
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
				$('#ui-dialog-title-f_addInputForm_' + pf).text(langForms.editExistingInput);
				$("#f_addInputForm_" + pf).dialog("open");
			},
			openEditOutput: function openEditOutput(index){
				// $("#f_outputsTab_id_" + pf ).val($("#" + sourceId + "_id").text());
				$("#f_outputsTab_label_" + pf ).val(this.funcDescJSON.outputs[index].label);
				$("#f_outputsTab_class_" + pf ).val(this.funcDescJSON.outputs[index].class);
				$("#f_outputsTab_dataType_" + pf ).val(this.funcDescJSON.outputs[index].dataType);
				$('#ui-dialog-title-f_addOutputForm_' + pf).text(langForms.editExistingOutput);	
				$("#f_addOutputForm_" + pf).dialog("open");
			},
			openEditNonFunc: function openEditNonFunc(index){
				$("#f_nonFunctionalDescriptionTab_weight_" + pf ).val(this.resultJSON.nonFunctionalDescription[index].weight);
				$("#f_nonFunctionalDescriptionTab_name_" + pf ).val(this.resultJSON.nonFunctionalDescription[index].name);
				$("#f_nonFunctionalDescriptionTab_relation_" + pf ).val(this.resultJSON.nonFunctionalDescription[index].relation);
				$("#f_nonFunctionalDescriptionTab_unit_" + pf ).val(this.resultJSON.nonFunctionalDescription[index].unit);
				$("#f_nonFunctionalDescriptionTab_value_" + pf ).val(this.resultJSON.nonFunctionalDescription[index].value);
				$('#ui-dialog-title-f_addNFPropertyForm_' + pf).text(langForms.editExistingNonFunctionalProperty);
				$("#f_addNFPropertyForm_" + pf).dialog("open");
			},
			openEditInputVariable: function openEditInputVariable(index){
				var sourceId = "f_inputVariables-" + index;
				$("#f_inputVariable_name_" + pf ).val( $("#" + sourceId + "_name").text() );
				$("#f_inputVariable_value_" + pf ).val( $("#" + sourceId + "_value").text() );
				$("#f_inputVariable_type_" + pf ).val( $("#" + sourceId + "_type").text() );
				$('#ui-dialog-title-f_addInputVariableForm_' + pf).text(langForms.editExistingInputVariable);
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
				$('#ui-dialog-title-f_addGlobalNFPropertyForm_' + pf).text(langForms.editExistingGraphNonFunctionalProperty);
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
		// Next/Previous/Close
			nextTab: function nextTab(){
				var selected = $tabs.tabs('option', 'selected');
				while($(tabsTab[selected+1]).hasClass("ui-tabs-hide")) selected++;
				if(selected < 5) $tabs.tabs('select', selected+1);
			},
			previousTab: function previousTab(){
				var selected = $tabs.tabs('option', 'selected');
				while($(tabsTab[selected-1]).hasClass("ui-tabs-hide")) selected--;
				if(selected > 0) $tabs.tabs('select', selected-1);
			},
			closeForm: function closeForm(){
				$("#form_" + pf).dialog("close");
			},
			openForm: function openForm(){
				$("#form_" + pf).dialog("open");
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
		$("#f_emulationTab_vectors_addButton_" + pf).button().click(
			function(event) {
				var $uploader = $("#uploader_"+pf);

				$uploader.change(function(e){
					var file = this.files[0],
					reader = new FileReader();

						reader.onload = function (event) {
							var xml = event.target.result;
							result.openForm();
							$("#f_emulationTab_vectors_"+pf).val(xml);
						};

					if(file.type == "text/xml")
						reader.readAsText(this.files[0]);
					else {
						alert(langAlerts.onlyXML);
						// $("#uploader_"+pf).click();
						// $("#f_emulationTab_vectors_addButton_" + pf).dialog("open")
						result.openForm();
					}
				})
				result.closeForm();



				$("#uploader_"+pf).click();

				return false;
			}
		);
		$("#f_inputsTab_openAddInputForm_" + pf).button().click(
			function(event) {
				$( "#inputForm_" + pf )[0].reset();
				result.resetSelectedInputIndex();
				result.clearInputSelectionInTable();
				$('#ui-dialog-title-f_addInputForm_' + pf).text(langForms.newInput);
				$("#f_addInputForm_" + pf).dialog("open");
			}
		);
		$("#f_outputsTab_openAddOutputForm_" + pf).button().click(
			function(event) {
				$( "#outputForm_" + pf  )[0].reset();
				result.resetSelectedOutputIndex();
				result.clearOutputSelectionInTable();
				$('#ui-dialog-title-f_addOutputForm_' + pf).text(langForms.newOutput);
				$("#f_addOutputForm_" + pf).dialog("open");	
			}
		);
		// $("#f_emulationTab_openAddVectorForm_" + pf).button().click(
		// 	function(event) {
		// 		$( "#emulationForm_" + pf  )[0].reset();
		// 		result.resetSelectedVectorIndex();
		// 		result.clearVectorSelectionInTable();
		// 		$('#ui-dialog-title-f_addVectorForm_' + pf).text("[JACKU_TUTAJ!!!]");
		// 		$("#f_addVectorForm_" + pf).dialog("open");	
		// 	}
		// );
		$("#f_openAddInputVariableForm_" + pf).button().click(
			function(event) {
				$( "#inputVariableForm_" + pf )[0].reset();
				result.resetSelectedInputVariableIndex();
				result.clearInputVariableSelectionInTable();
				$('#ui-dialog-title-f_addInputVariableForm_' + pf).text(langForms.newInputVariable);
				$("#f_addInputVariableForm_" + pf).dialog("open");
			}
		);
		$("#f_nonFunctionalDescriptionTab_openAddNFPropertyForm_" + pf).button().click(
			function(event) {
				$( "#nonFuncDescForm_" + pf  )[0].reset();
				result.resetSelectedNFPropertyIndex();
				result.clearNFPropertySelectionInTable();
				$('#ui-dialog-title-f_addNFPropertyForm_' + pf).text(langForms.newNonFunctionalProperty);
				$("#f_addNFPropertyForm_" + pf).dialog("open");	
			}
		);
		$("#f_openAddGlobalNFPropertyForm_" + pf).button().click(
			function(event) {
				$( "#globalNonFuncDescForm_" + pf  )[0].reset();
				result.resetSelectedGlobalNFPropertyIndex();
				result.clearGlobalNFPropertySelectionInTable();
				$('#ui-dialog-title-f_addGlobalNFPropertyForm_' + pf).text(langForms.newGraphNonFunctionalProperty);
				$("#f_addGlobalNFPropertyForm_" + pf).dialog("open");	
			}
		);
		//Edity
		$("#f_inputsTab_openEditInputForm_" + pf).button().click(
			function(event) {
				var index = result.getSelectedInputIndex();
				if(index == -1)
					alert(langAlerts.errors.noInputSelected);
				else{
					result.openEditInput(index);
				}
			}
		);
		$("#f_outputsTab_openEditOutputForm_" + pf).button().click(
			function(event) {
				var index = result.getSelectedOutputIndex();
				if(index == -1)
					alert(langAlerts.errors.noOutputSelected);
				else{
					result.openEditOutput(index);
				}
			}
		);
		// $("#f_emulationTab_openEditVectorForm_" + pf).button().click(
		// 	function(event) {
		// 		var index = result.getSelectedVectorIndex();
		// 		if(index == -1)
		// 			alert("[JACKU_TUTAJ!!!]");
		// 		else{
		// 			result.openEditVector(index);
		// 		}
		// 	}
		// );
		$("#f_openEditInputVariableForm_" + pf).button().click(
			function(event) {
				var index = result.getSelectedInputVariableIndex();
				if(index == -1)
					alert(langAlerts.errors.noInputVariableSelected);
				else{
					result.openEditInputVariable(index);
				}
			}
		);
		$("#f_openEditGlobalNFPropertyForm_" + pf).button().click(
			function(event) {
				var index = result.getSelectedGlobalNFPropertyIndex();
				if(index == -1)
					alert(langAlerts.errors.noGraphNonFunctionalPropertySelected);
				else{
					result.openEditGlobalNonFunc(index);
				}
			}
		);
		$("#f_nonFunctionalDescriptionTab_openEditNFPropertyForm_" + pf).button().click(
			function(event) {
				var index = result.getSelectedNFPropertyIndex();
				if(index == -1)
					alert(langAlerts.errors.noNonFunctionalPropertySelected);
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
					alert(langAlerts.errors.noInputSelected);
				else{
					result.removeInput();
				}
			}
		);
		$("#f_outputsTab_deleteThisOutput_" + pf).button().click(
			function(event) {
				var index = result.getSelectedOutputIndex();
				if(index == -1)
					alert(langAlerts.errors.noOutputSelected);
				else{
					result.removeOutput();
				}
			}
		);
		// $("#f_emulationTab_deleteThisVector_" + pf).button().click(
		// 	function(event) {
		// 		function(event) {
		// 		var index = result.getSelectedVectorIndex();
		// 		if(index == -1)
		// 			alert("[JACKU_TUTAJ!!!]");
		// 		else{
		// 			result.removeVector();
		// 		}
		// 	}
		// 	}
		// );
		$("#f_deleteThisInputVariable_" + pf).button().click(
			function(event) {
				var index = result.getSelectedInputVariableIndex();
				if(index == -1)
					alert(langAlerts.errors.noInputVariableSelected);
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
					alert(langAlerts.errors.noEntrySelected);
				else{
					result.removeNonFunc();
				}
			}
		);
		$("#f_deleteThisGlobalNFProperty_" + pf).button().click(
			function(event) {
				var index = result.getSelectedGlobalNFPropertyIndex();
				if(index == -1)
					alert(langAlerts.errors.noEntrySelected);
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
		$('tr[id^="f_inputVariables"]').live("click", function(event){
			var index = event.target.id.split("_")[1].split("-")[1];
			result.clearVectorSelectionInTable();
			if(result.getSelectedVectorIndex() == index)
				result.resetSelectedVectorIndex();
			else{
				result.setSelectedVectorIndex(index);
				$(this).addClass("ui-state-active");
			}
		});
		$('tr[id^="f_inputVariables"]').live("dblclick", function(event){
			var index = event.target.id.split("_")[1].split("-")[1];
			setTimeout(function(){result.setSelectedVectorIndex(index);},1000);
			result.openEditVector(index);
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
		$("#f_button_newEmulationService_" + pf).button().click(
			function(event) {
				gui.controler.reactOnEvent("AskDamianForId", {
					onsuccess : function(xml){
						$("#f_dialog_emulationService_" + pf).dialog('close');
						var id = $(xml).find("id").text();

						if(id){
							var label = prompt(langAlerts.addLabelNewNode, "");
							if(label)
								gui.controler.reactOnEvent("AddBlankNode", {
									nodeLabel : label,
									nodeType : "emulationService",
									emulation : {
										id : id
									}
								});
						} else {
							alert(langAlerts.idnewemuservice);
						}
					},
					onerror : function(){
						$("#f_dialog_emulationService_" + pf).dialog('close');
						alert(langAlerts.idnewemuservice); //to samo co wyżej
					}
				})
			}
		);
		$("#f_button_importEmulationService_" + pf).button().click(
			function(event) {
				// alert("America fuck yeah, Włodku daj mi event!");
			}
		);
		$("#f_button_importEmulationService_" + pf).addClass('ui-state-disabled');
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
		$("#f_addVectorForm_changesConfirm_" + pf).button().click(
			function(event) {
				result.addVector();
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
					alert(langAlerts.inputData);
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
		$( "#f_dialog_emulationService_" + pf ).dialog({
			autoOpen: false,
			resizable: false,
			height: 150,
			width: 250,
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
		$("#f_addVectorForm_" + pf).dialog({
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
//Koniec pliku form.js
//Poczatek pliku nodeVisualizator.js
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
								move = this.moveInput(i);
								this.inputs[i].node.drag(move.move, move.start, move.end);
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
					moveInput: function moveInput(i){
						var index = i,
							that = this,
							otherInput, otherIndex,
							img, x, y, glow1, glow2,
							result = {
								start: function start(){
									gui.view.hideEdges();
									var bbox = this.getBBox();
									x = bbox.x; y = bbox.y;
									glow1 = this.glow({'color': 'blue'});
								},
								move: function move(dx){
									if(img) img.remove();
									if(glow2) glow2.remove();
									if(dx < 10)
										if (that.inputs[index-1]){
											img = gui.view.paper.image('images/arrowL.png', x-21, y-5, 16, 16);
											otherIndex = index - 1;
											otherInput = that.inputs[otherIndex];
											glow2 = otherInput.node.glow({'color': 'blue'});
										}
									if(dx > 10)
										if (that.inputs[index+1]){
											img = gui.view.paper.image('images/arrowR.png', x+15, y-5, 16, 16);
											otherIndex = index+1;
											otherInput = that.inputs[otherIndex];
											glow2 = otherInput.node.glow({'color': 'blue'});
										}
								},
								end: function end(){
									if(otherInput){
										img.remove(); glow1.remove(); glow2.remove();
										that.inputs[otherIndex] = that.inputs[index];
										that.inputs[index] = otherInput;
										that.clearIO(); that.drawIO(gui.view.paper);
										gui.view.updateEdges();
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
//Koniec pliku nodeVisualizator.js
//Poczatek pliku view.js
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
//Koniec pliku view.js
//Poczatek pliku repoNodes.js
	function repoNodes(visualiser) {
		var resultObject = {
			currNodes: [],
			paper: undefined,
			data: undefined,
			require: "sdb_json_array div raphael_x_500".split(" "),
			init: function init() {
				if ($("#repoNodes_" + pf).length === 0) {
					$("#right_plugins_" + pf).append("<div id='repoNodes_" + pf + "' class='plugin_" + pf + "'> </div>");
					this.paper = Raphael("repoNodes_" + pf, gui.view.columnParams.rightCol.width - 1, 500);
					this.scroller = addSideScroller(this.paper);
					this.createCover();					
				}
			},
			createCover: function createCover(){
				var that, left, top;
				left = $("#repoNodes_" + pf).position().left;
				that = this;
				this.cover = this.paper.rect(0, 0, this.paper.width, this.paper.height).attr({
					opacity: 0,
					fill: "ivory"
				}).mouseover(function() {
					that.scroller.showYourself();
				}).mouseout(function(evt, x, y) {
					top = $("#navigator_" + pf).position().top + $("#navigator_" + pf).height();
					if (!that.cover.isPointInside(x - left, y - top)) that.scroller.goHide();
				}).toFront();
			},
			convertData: function generateData(node, n) {
				var result = visualiser.getBlankNode();
				result.id = node.nodeId;
				result.label = node.nodeLabel;
				result.type = node.nodeType;
				result.x = 10;
				result.y = 15 + (45 * n);
				result.height = 20;
				result.serviceName = node.physicalDescription.serviceName;
				result.set = this.paper.set();

				result.inputs = node.functionalDescription.inputs;
				result.outputs = node.functionalDescription.outputs;

				return result;
			},
			setData: function setData(data) {
				if (data) {
					this.data = data;
				}

				return this;
			},
			draw: function draw() {
				var tempNode, that = this,
					tmp, n = -1;

				this.clear();

				$.each(this.data, function(k, v) {
					tempNode = that.convertData(v, ++n);
					tmp = visualiser.draw_serviceNode(tempNode, that.paper, true).switchToDFMode();
					tmp.raph_label.attr({
						cursor: "pointer"
					}).dblclick(function() {
						gui.controler.reactOnEvent("AddServiceFromRepoToCanvas", v);
					});
					$.each(tmp.outputs, function() {
						this.node.attr({
							cursor: "default"
						});
					});

					gui.view.visualiser.addTooltips(tmp);

					that.currNodes.push(tmp);
				});

				this.scroller.init();
				this.scroller.update(this.currNodes);

				return this;
			},
			clear: function clear() {
				if (this.paper) {
					this.paper.clear();
					this.currNodes.length = 0;
					this.createCover();
				}
				return this;
			}
		}

		return resultObject;
	}
//Koniec pliku repoNodes.js
//Poczatek pliku initLogger.js

	function initLogger(paper) {
		/* Logger 2.0 (Błażej)
		* SUBMITTED: 23.08.2012
		* REQUIRED PARAMS: 
		* - paper (on which we will draw button opening the console)
		* REQUIRED VARIABLES SET BY HIGHER LEVEL:
		* - pf (number for id randomization)
		* REQUIRED DOM ELEMENTS:
		* - div with id 'console_'+pf
		* AVIABLE FUNCTIONS:
		* - info(in`ation string [, title string])
		* - warning(warning string [, title string])
		* - error(error string [, title string])
		*/
		var h = paper.height,
			lId = "#console_" + pf,
			eId = "#console_entries_" + pf,
			bPath = 'M' + (paper.width - 170) + ' 0 Q' + (paper.width - 170) + ' 25 ' + (paper.width - 145) + ' 25 L' + (paper.width - 45) + ' 25 Q' + (paper.width - 20) + ' 25 ' + (paper.width - 20) + ' 0 Z',
			alertbg = paper.path(bPath).attr({
				fill: "#FF0",
				"fill-opacity": 0.0
			}),
			buttonBG = paper.path(bPath).attr({
				fill: "#222",
				"fill-opacity": .75
			});
		//images
		var iImg = paper.image('images/info.png', paper.width - 152, 4, 15, 15),
			wImg = paper.image('images/warning.png', paper.width - 112, 4, 15, 15),
			eImg = paper.image('images/error.png', paper.width - 72, 4, 15, 15);
		//counters
		var iCounter = paper.text(paper.width - 125, 11, "0").attr({
			fill: "white"
		}),
			wCounter = paper.text(paper.width - 85, 11, "0").attr({
				fill: "yellow"
			}),
			eCounter = paper.text(paper.width - 45, 11, "0").attr({
				fill: "orange"
			});
		//button mask
		var mask = paper.path(bPath).attr({
			fill: "#222",
			"fill-opacity": 0.0
		});
		//private variables
		var counter = [0, 0, 0],
			state = [true, true, true],
			cCId = "#console_controller_" + pf,
			bImgs = [iImg, wImg, eImg],
			bCount = [iCounter, wCounter, eCounter],
			buttonBG = buttonBG,
			animation = null,
			curElCount = 0,
			colors = ['#FAFAFF', '#FFFFE0', '#FFFAFA'],
			txtColors = ['white', 'yellow', 'orange'],
			imgNames = ['info', 'warning', 'error'];

		//private functions
		var addMessage = function(message, priority) {
				curElCount++;
				var divId = "console_row_" + curElCount;
				var divString = [];
				divString.push("<div id='");
				divString.push(divId);
				divString.push("' class='console_row priority");
				divString.push(priority);
				divString.push("' style='border-bottom: dashed #222; border-bottom-width: 1px; background-color:");
				divString.push(colors[priority]);
				if (!state[priority]) {
					divString.push("; display: none")
				}
				divString.push(";'><table width='100%' style='table-layout: fixed;'><tr><td valign='top' style='width: 20px;'><img src='images/");
				divString.push(imgNames[priority]);
				divString.push(".png' style='padding-left: 2px; padding-top: 3px;'/></td><td valign='top' style='float: left;'>");
				divString.push(message);
				divString.push("</td><td valign='top' style='width: 20px;'><div id='cCheck_");
				divString.push(curElCount);
				divString.push("'><form><input type='checkbox' class='cCheck'/></form></div></td><td valign='top' style='width: 20px;'><div id='cCancel_");
				divString.push(curElCount);
				divString.push("' style='cursor: pointer;'><img src='images/cancel.png' title='");
				divString.push(language[gui.language].logger.delComm);
				divString.push("' style='padding-left: 2px; padding-top: 3px;'/></div></td></tr></table></div>");
				divString = divString.join("");
				$(divString).prependTo($(eId));
				var delId = "#cCancel_" + curElCount;
				var checkId = "#cCheck_" + curElCount;
				var nr = curElCount;
				$(delId).click(function() {
					counter[priority]--;
					redrawCounter(priority);
					delId = "#console_row_" + nr;
					$(delId).remove();
				});
			},
			redrawCounter = function(priority) {
				bCount[priority].remove();
				bCount[priority] = paper.text(paper.width - (125 - (priority * 40)), 11, counter[priority]).attr({
					fill: txtColors[priority]
				});
				mask.toFront();
			},
			refreshLogger = function(priority) {
				var visible;
				if (state[priority]) {
					visible = 'block';
				} else {
					visible = 'none';
				}
				var prClass = '.priority' + priority;
				$.each($(eId).find(prClass), function() {
					$(this).css('display', visible);
				});
			},
			refreshCounter = function() {
				var prClass, num;
				for (var i = 0; i < 3; i++) {
					prClass = '.priority' + i;
					num = 0;
					$.each($(eId).find(prClass), function() {
						num++;
					});
					counter[i] = num;
					redrawCounter(i);
				}
			},
			fade = function() {
				if (buttonBG.attr("fill-opacity") == 1) {
					buttonBG.animate({
						"fill-opacity": 0.5
					}, 700);
				} else {
					buttonBG.animate({
						"fill-opacity": 1
					}, 700);
				}
			},
			getScrollBarWidth = function() {
				var w = 0,
					testDiv = "<div id='scrollTest' style='overflow: scroll;'></div>";
				$('body').append(testDiv);
				var el = document.getElementById('scrollTest');
				w = el.offsetWidth - el.scrollWidth;
				$('#scrollTest').remove();
				return w;
			},
			close = function() {
				$(eId).css('overflow-y: hidden;');
				$(lId).animate({
					'height': 0
				});
			};
		//console object
		var obj = {
			info: function info(title, text) {
				text = text || "(an empty string)";
				if (title) text = "<b>" + title + "</b><br/>" + text;
				counter[0]++;
				redrawCounter(0);
				//here adding to div and dTabs
				addMessage(text, 0);
			},
			warning: function warn(title, text) {
				text = text || "(an empty string)";
				if (title) text = "<b>" + title + "</b><br/>" + text;
				counter[1]++;
				redrawCounter(1);
				alertbg.animate({
					"fill-opacity": 1.0
				});
				//here adding to div and dTabs
				addMessage(text, 1);
			},
			error: function err(title, text) {
				text = text || "(an empty string)";
				if (title) text = "<b>" + title + "</b><br/>" + text;
				counter[2]++;
				redrawCounter(2);
				alertbg.animate({
					"fill-opacity": 1.0
				});
				//here adding to div and dTabs
				addMessage(text, 2);
				//pulse
				if (animation) clearInterval(animation);
				animation = setInterval(fade, 750);
			},
			open: function open() {
				$(lId).animate({
					'height': h
				}, 400, function() {
					$(eId).css('overflow-y: scroll;');
				});
			},
			close: close
		};
		//adding console HTML structure
		var divString = [];
		divString.push("<div id='");
		divString.push("console_controller_" + pf);
		divString.push("' style='border-bottom: solid #222; border-bottom-width: 1px; background-color: white");
		divString.push("; height: 25px;'><table style='table-layout: fixed; width:");
		var w = $(lId).css('width');
		w = w.slice(0, w.length - 2);
		w = w - getScrollBarWidth();
		divString.push(w);
		divString.push("px;'><tr><td valign='top' style='float: left;'><div id='console_CL' class='logButton' style='margin-left: 5px; background-color: #FF7400; color: white;'>");
		divString.push(language[gui.language].logger.console_CL);
		divString.push("</div></td><td valign='top' style='width: 400px; text-align: right;'><div id='console_SA' class='logButton'>");
		divString.push(language[gui.language].logger.console_SA);
		divString.push("</div><div id='console_DA' class='logButton' style='margin-left: 10px;'>");
		divString.push(language[gui.language].logger.console_DA);
		divString.push("</div><div id='console_D' class='logButton' style='margin-left: 10px;'>")
		divString.push(language[gui.language].logger.console_D);
		divString.push("</div></td><td valign='top' style='width: 50px; text-align: right; cursor: default;'>");
		divString.push(language[gui.language].logger.show);
		divString.push("</td><td valign='top' style='width: 20px;'><div id='console_I' style='cursor: pointer;'><img src='images/info.png' title='");
		divString.push(language[gui.language].logger.shInfo);
		divString.push("' style='padding-left: 2px; padding-top: 3px;'/></div></td>");
		divString.push("<td valign='top' style='width: 20px;'><div id='console_W' style='cursor: pointer;'><img src='images/warning.png' title='");
		divString.push(language[gui.language].logger.shWarning);
		divString.push("' style='padding-left: 2px; padding-top: 3px;'/></div></td>");
		divString.push("<td valign='top' style='width: 20px;'><div id='console_E' style='cursor: pointer;'><img src='images/error.png' title='");
		divString.push(language[gui.language].logger.shError);
		divString.push("' style='padding-left: 2px; padding-top: 3px;'/></div></td>");
		divString.push("</tr></table></div><div id='console_entries_" + pf + "' style='overflow-y:scroll; height:" + (h - 25) + "px;'></div>");
		divString = divString.join("");
		$(divString).prependTo($(lId));
		//event handling for console controller
		$('#console_I').click(function() {
			if (state[0]) {
				$('#console_I').css('opacity', 0.4);
				state[0] = false;
			} else {
				$('#console_I').css('opacity', 1);
				state[0] = true;
			}
			refreshLogger(0);
		});
		$('#console_W').click(function() {
			if (state[1]) {
				$('#console_W').css('opacity', 0.4);
				state[1] = false;
			} else {
				$('#console_W').css('opacity', 1);
				state[1] = true;
			}
			refreshLogger(1);
		});
		$('#console_E').click(function() {
			if (state[2]) {
				$('#console_E').css('opacity', 0.4);
				state[2] = false;
			} else {
				$('#console_E').css('opacity', 1);
				state[2] = true;
			}
			refreshLogger(2);
		});
		$('#console_SA').click(function() {
			$.each($(eId).find('.cCheck'), function() {
				if ($(this).parents('.console_row').css('display') != 'none') {
					$(this).prop('checked', true);
				} else {
					$(this).prop('checked', false);
				}
			});
		});
		$('#console_DA').click(function() {
			$.each($(eId).find('.cCheck'), function() {
				$(this).prop('checked', false);
			});
		});
		$('#console_D').click(function() {
			$.each($(eId).find('.cCheck'), function() {
				if ($(this).prop('checked') == true && $(this).parents('.console_row').css('display') != 'none') {
					$(this).parents('.console_row').remove();
				}
			});
			refreshCounter();
		});
		//unselect for text buttons
		document.getElementById('console_CL').onselectstart = function() {
			return (false);
		};
		document.getElementById('console_SA').onselectstart = function() {
			return (false);
		};
		document.getElementById('console_DA').onselectstart = function() {
			return (false);
		};
		document.getElementById('console_D').onselectstart = function() {
			return (false);
		};
		//main event handling
		$('#console_CL').click(function() {
			$(eId).css('overflow-y: hidden;');
			$(lId).animate({
				'height': 0
			});
		});
		mask.click(function() {
			obj.open();
		});
		
		$(mask.node).css('cursor', 'pointer');

		//context menu
		var menu = gui.view.contextMenu("console_" + pf, gui.view);
		menu.addOption(language[gui.language].logger.close, close);
		//object return
		return obj;
	};
//Koniec pliku initLogger.js
//Poczatek pliku deploy.js

	function deploy(ssdlJson, canvasW, nodeW, nodeH, nodeHSpacing, nodeVSpacing, startY) {
		/* DEPLOYER 2.0 (Błażej)
		 * REQUIRED PARAMS:
		 * - ssdlJson (jSon form of SSDL XML)
		 * - canvasW (width of canvas we will be drawing on)
		 * OPTIONAL PARAMS:
		 * - nodeW (width of nodes)
		 * - nodeH (height of nodes)
		 * - nodeHSpacing (minimum horizontal spacing between nodes)
		 * - nodeVSpacing (vertical spacing between nodes)
		 * - startY (height on canvas from which we start to draw graph)
		 * OUTPUT:
		 * - object
		 * -> coords (array{nodeID, nodeX, nodeY})
		 * -> getCoords (function(id) returning array{nodeX, nodeY} for specified ID)
		 */

		//-MAIN-FUNCTION--------------------->>>
		function run() { //deploying main ssdl graph
			var jnodes = ssdlJson.nodes,
				nodeArr = getNodes(jnodes);
			processNodes(nodeArr);
			var graphMat = postProcessNodes(nodeArr);
			// console.time("Deploying Time");
			// console.group("DEPLOYMENT RESULTS:");
			if (nodeArr.length > 18) { //CHOICE TIME
				// console.info("Genetic Alghoritm in use");
				var bestI = genetic(graphMat, 200, 250, 20, 25, 50);
			} else {
				// console.info("BruteForce Alghoritm in use");
				var bestI = bruteForce(graphMat);
			}
			var out = generateCoords(graphMat, bestI);
			// console.log("ALGHORITM PERFORMANCE: ");
			// console.timeEnd("Deploying Time");
			// console.info("Best deployment rating: " + bestI.rating);
			// console.log("GRAPH MATRIX: ");
			// console.log(graphMat);
			// console.log("DEPLOYMENT: ");
			// console.log(out);
			// console.groupEnd();
			var outObj = {
				coords: out,
				getCoords: function(id) {
					var len = this.coords.length;
					var outputCoordsTab;
					for (var i = 0; i < len; i++) {
						if (this.coords[i][0] === id) {
							outputCoordsTab = [this.coords[i][1], this.coords[i][2]];
							break;
						}
					}

					return outputCoordsTab;
				}
			}
			return outObj;
		};
		//-PARSING-FUNCTIONS----------------->>>
		function node(id, sources) { //NODE OBJECT
			this.id = id;
			this.parents = [];
			this.children = [];
			this.sources = sources;
			this.level = -1;
			this.column = -1;
		};
		function getNodes(jsonNodes) { //building nodes list basing on JSon form of SSDL
			var nodes = [];
			var i = 0;
			$.each(jsonNodes, function() {
				nodes[i] = new node(this.nodeId, this.sources);
				i++;
			});
			return nodes;
		};
		function getNodeById(nodeArray, nId) { //searching nodes list for node with specific id
			var ret = null
			$.each(nodeArray, function() {
				if (this.id == nId) {
					ret = this;
					return false;
				}
			});
			return ret;
		};
		function processNodes(nodeArray) { //setting flow for each node
			$.each(nodeArray, function() {
				var tempObj = this;
				$.each(this.sources, function() { //assigning parent/child refferences for each node
					var temp = getNodeById(nodeArray, this);
					if (temp != null) {
						tempObj.parents.push(temp);
						temp.children.push(tempObj);
					} else {
						// console.error("getNodeByID(" + this + ") returned NULL!!!");
					}
				});
			});
		};
		function postProcessNode(node) { //assigning node level to node and its parents/children
			if (node.id == "#Start") { //if in root assigning level 0
				node.level = 0;
			} else {
				$.each(node.parents, function() {
					postProcessNode(this);
				});
			}
			var lowerLevel = node.level;
			$.each(node.children, function() { //assigning  node level incremented by one to all children
				if (this.level == -1 || this.level > lowerLevel + 1) {
					this.level = lowerLevel + 1;
				}
			});
		};
		function postProcessNodes(nodeArray) { //creating graphMatrix and subgraph Matrixes
			var graphMatrix = [
				[]
			];
			postProcessNode(getNodeById(nodeArray, "#End")); //assigning node levels
			$.each(nodeArray, function() {
				if (this.id != "#End") { //for all nodes except #End
					if (!graphMatrix[this.level]) { //creating level array if not present
						graphMatrix[this.level] = [];
					}
					graphMatrix[this.level].push(this); //assigning node to graph matrix
					this.column = graphMatrix[this.level].length - 1; //assigning column nuber to node
				}
			});
			//assigning #End to graph matrix
			var stop = getNodeById(nodeArray, "#End");
			if (graphMatrix[stop.level]) {
				stop.level++;
			}
			graphMatrix[stop.level] = [stop];
			stop.column = 0;
			return graphMatrix;
		};
		//-AUXILIARY-FUNCTIONS--------------->>>
		function clone(tab) { //array shallow cloning function
			var result = [];
			$.each(tab, function(i, v) {
				result.push(v);
			});
			return result;
		};
		function cloneObj(obj) { //object deep cloning function
			var object = {};
			object.o = obj;

			// try  jQuery.extend(true, [], object);
			// roznica: {} -> [];
			var clone = jQuery.extend(true, {}, object);
			var result = clone.o;
			return result;
		};
		//-DEPLOYMENT-ALGORITHM-FUNCTIONS---->>>
		function individual(deploymentMatrix) { //INDIVIDUAL OBJECT
			this.deploymentMatrix = deploymentMatrix;
			this.rating = null;
		};
		function rate(individual, graphMatrix) { //rating individual by square criterion
			var deploymentMatrix = individual.deploymentMatrix,
				len = deploymentMatrix.length,
				rating = 0;
			for (var i = 1; i < len; i++) { //for each level
				var len2 = deploymentMatrix[i].length;
				for (var j = 0; j < len2; j++) { //for each column
					var num = deploymentMatrix[i][j],
						temp = graphMatrix[i][num].parents,
						//get parents
						len3 = temp.length,
						parentColIds = [],
						parentRowIds = [];
					for (var k = 0; k < len3; k++) { //get their IDs
						parentColIds.push(temp[k].column);
						parentRowIds.push(temp[k].level);
					}
					//sum horizontal distance to all parents for all nodes
					var len4 = parentColIds.length;
					for (var l = 0; l < len4; l++) {
						var len5 = deploymentMatrix[parentRowIds[l]].length;
						if (len2 > 1) {
							for (var o = 0; o < len5; o++) {
								if (deploymentMatrix[parentRowIds[l]][o] == parentColIds[l]) {
									var xLen = ((j + 1) / (len2 + 1)) - ((o + 1) / (deploymentMatrix[parentRowIds[l]].length + 1));
									xLen *= xLen;
									rating += Math.sqrt(xLen);
								}
							}
						}
					}
				}
			}
			individual.rating = rating;
			return rating;
		};
		//-BRUTEFORCE-VERSION---------------->>>
		function bruteForce(graphMatrix) { //searching for best deployment by bruteForce
			var len = graphMatrix.length,
				matrix = [
					[]
				],
				bruteForceMatrix = [
					[
						[]
					]
				],
				individuals = [],
				bestRating, tempRating, bestIndividual, tempIndividual;
			for (var i = 0; i < len; i++) { //for each level
				var len2 = graphMatrix[i].length,
					tab = [];
				for (var j = 0; j < len2; j++) { //create table of possible IDs
					tab.push(j);
				}
				//ZuO i mrokH i rekurencja
				bruteForceMatrix[i] = [];
				generatePossibleRows(tab, [], bruteForceMatrix[i], len2);
			}
			//here we have matrix of possible levels, now it's time to mix it to individuals
			generateDepMat(bruteForceMatrix, [], individuals, 0);
			var am = individuals.length,
				tempMat = [
					[]
				];
			for (var i = 0; i < len; i++) {
				tempMat[i] = [];
				tempMat[i] = bruteForceMatrix[i][individuals[0][i]];
			}
			bestIndividual = new individual(tempMat);
			bestRating = rate(bestIndividual, graphMatrix);
			//searching for best individual by checking all generated matrixes
			for (var i = 1; i < am; i++) {
				tempMat = [
					[]
				];
				for (var j = 0; j < len; j++) {
					tempMat[j] = [];
					tempMat[j] = bruteForceMatrix[j][individuals[i][j]];
				}
				tempIndividual = new individual(tempMat);
				tempRating = rate(tempIndividual, graphMatrix);
				if (tempRating < bestRating) {
					bestRating = tempRating;
					bestIndividual = tempIndividual;
				}
			}
			return bestIndividual;
		};
		function generatePossibleRows(possibleIds, combination, output, left) { //generating table of possible rows
			if (left == 0) { //if combination was completed
				output.push(combination); //add it to output matrix
			} else {
				for (var i = 0; i < left; i++) { //for left possible ids
					var ids = clone(possibleIds),
						newCombination = clone(combination);
					newCombination.push(ids[i]); //create new combinations
					for (var j = i; j < left - 1; j++) { //shrink support table
						ids[j] = ids[j + 1];
					}
					generatePossibleRows(ids, newCombination, output, left - 1); //send combination further
				}
			}
		};
		function generateDepMat(bfMatrix, combination, output, row) { //generating deployment matrixes for individuals
			if (row == bfMatrix.length) { //if combination was completed
				output.push(combination); //add it to output table
			} else {
				var len = bfMatrix[row].length;
				for (var i = 0; i < len; i++) { //for all possible combinations of this level
					var newCombination = clone(combination);
					newCombination.push(i); //create new deployment option based on row ids
					generateDepMat(bfMatrix, newCombination, output, row + 1); //send combination further
				}
			}
		};
		//-GENETIC-VERSION------------------->>>
		function genetic(graphMatrix, generationsAmount, individualsAmount, rivalsAmount, mutationRatio, hybridizationRatio) {
			var individuals = [];
			var oldIndividuals = null;
			//generating 1st individual and save it as best
			var deploymentMatrix = generateRandom(graphMatrix);
			var bestIndividual = new individual(deploymentMatrix);
			var bestRating = rate(bestIndividual, graphMatrix);
			var bestGen = 0;
			individuals.push(bestIndividual);
			//generating 1st generation
			for (var i = 1; i < individualsAmount; i++) {
				deploymentMatrix = generateRandom(graphMatrix); //generating random individual
				ind = new individual(deploymentMatrix);
				if (rate(ind, graphMatrix) < bestRating) { //rating random individual / if it's best then save it as best
					bestRating = ind.rating;
					bestIndividual = cloneObj(ind);
				}
				individuals.push(ind);
			}
			//generating further generations
			for (var i = 1; i < generationsAmount && bestRating > 0; i++) {
				oldIndividuals = cloneObj(individuals);
				for (var j = 0; j < individualsAmount; j++) {
					individual1 = select(oldIndividuals, individualsAmount, rivalsAmount);
					rand = Math.floor((Math.random() * 100)) + 1;
					if (rand < mutationRatio) {
						individual1 = mute(individual1);
					}
					rand = Math.floor((Math.random() * 100)) + 1;
					if (rand < hybridizationRatio) {
						individual2 = select(oldIndividuals, individualsAmount, rivalsAmount);
						hybridize(individual1, individual2);
						rand = Math.floor((Math.random() * 100)) + 1;
						if (rand < mutationRatio) {
							individual2 = mute(individual2);
						}
						individuals[j] = individual2;
						if (rate(individual2, graphMatrix) < bestRating) {
							bestRating = individual2.rating;
							bestIndividual = cloneObj(individual2);
							bestGen = i;
						}
						j++;
					}
					if (rate(individual1, graphMatrix) < bestRating) {
						bestRating = individual1.rating;
						bestIndividual = cloneObj(individual1);
						bestGen = i;
					}
					individuals[j] = individual1;
				}
			}
			// console.info("Best deployment discovered in " + bestGen + "/" + generationsAmount + " generation");
			return bestIndividual;
		};
		function select(individuals, indAm, rivalsAmount) { //selection by tournament
			rand = Math.floor((Math.random() * indAm));
			bestIndividual = individuals[rand];
			bestRating = bestIndividual.rating;
			for (var j = 1; j < rivalsAmount; j++) {
				rand = Math.floor((Math.random() * indAm));
				ind = individuals[rand];
				if (ind.rating < bestRating) {
					bestIndividual = ind;
					bestRating = ind.rating;
				}
			}
			return new individual(bestIndividual.deploymentMatrix.slice());
		};
		function mute(individual1) { //mutation by switching 2 elements of random level
			deploymentMatrix = individual1.deploymentMatrix.slice();
			individual2 = new individual(deploymentMatrix);
			rand = Math.floor((Math.random() * individual2.deploymentMatrix.length));
			rand2 = Math.floor((Math.random() * individual2.deploymentMatrix[rand].length));
			rand3 = Math.floor((Math.random() * individual2.deploymentMatrix[rand].length));
			temp = individual2.deploymentMatrix[rand][rand2];
			individual2.deploymentMatrix[rand][rand2] = individual2.deploymentMatrix[rand][rand3];
			individual2.deploymentMatrix[rand][rand3] = temp;
			return individual2;
		};
		function hybridize(individual1, individual2) { //hybridization
			len = individual2.deploymentMatrix.length;
			rand1 = Math.floor((Math.random() * len));
			rand2 = Math.floor((Math.random() * len));
			for (var i = rand1; i < rand2; i++) {
				individual2.deploymentMatrix[i] = clone(individual1.deploymentMatrix[i]);
			}
		};
		function generateRandom(graphMatrix) { //generating random deployment matrix
			len = graphMatrix.length;
			matrix = [
				[]
			];
			for (var i = 0; i < len; i++) { //for each level
				len2 = graphMatrix[i].length;
				tab = [];
				tab2 = [];
				elAmount = len2;
				for (var j = 0; j < len2; j++) { //create table of possible IDs
					tab.push(j);
				}
				for (var j = 0; j < len2; j++) { //randomly place all IDs
					rand = Math.floor((Math.random() * elAmount));
					tab2.push(tab[rand]);
					for (var k = rand; k < elAmount - 1; k++) { //shrink support table (tab)
						tab[k] = tab[k + 1];
					}
					elAmount--;
				}
				matrix[i] = tab2;
			}
			return matrix;
		};
		//-COMMON-FINISH--------------------->>>
		function generateCoords(graphMatrix, bestInd) { //generating ID's -> coordinates table
			var w = canvasW;
			var width, height, spacing, hSpacing;
			//check if node properties are defined. if not assign default
			startY = startY || 15;
			width = nodeW || 135;
			height = nodeH || 30;
			spacing = nodeVSpacing || 30;
			hSpacing = nodeHSpacing || 30;
			var dMatrix = bestInd.deploymentMatrix,
				len = dMatrix.length,
				maxWidth = 1,
				rowLength = [],
				rowElWidth = [],
				columnPadding = [];
			//searching for longest row
			for (var i = 0; i < len; i++) {
				rowLength[i] = dMatrix[i].length;
				if (rowLength[i] > maxWidth) {
					maxWidth = dMatrix[i].length;
				}
			}
			for (var i = 0; i < len; i++) {
				rowElWidth[i] = w / rowLength[i];
				if (rowElWidth[i] < width + hSpacing) {
					rowElWidth[i] = width + hSpacing;
					columnPadding[i] = (w - rowLength[i] * (width + hSpacing)) / 2;
				} else {
					columnPadding[i] = 0;
				}
			}
			var dTab = [];
			//assigning x & y to nodes
			for (var i = 0; i < len; i++) {
				var len2 = dMatrix[i].length;
				for (var j = 0; j < len2; j++) {
					var id = graphMatrix[i][dMatrix[i][j]].id,
						y = i * (height + spacing) + startY,
						x = Math.floor(columnPadding[i] + j * rowElWidth[i] + (rowElWidth[i] - width) / 2),
						tab = [];
					tab[0] = id;
					tab[1] = x;
					tab[2] = y;
					dTab.push(tab);
				}
			}
			return dTab;
		}
		//-PLUGIN-RUN------------------------>>>
		return run();
	};
//Koniec pliku deploy.js
//Poczatek pliku navigator.js
	function navigation() {
		var tmp = {
			name: "navigator",
			version: "1.0",
			author: "Author",
			dataType: 'json',
			data: null,
			tree: null,
			globalEvents: ["load"],
			localEvents: ["select"],
			require: "ssdl_JSON div".split(" "),
			currentIdsAndLabels: {},
			init: function init() {
				if ($("#navigator_" + pf).length === 0) {
					$("#left_plugins_" + pf).prepend("<div id='navigator_" + pf + "' class='plugin_" + pf + "'' style='overflow:hidden'> </div>");
				}
			},
			setData: function setData(data) {
				if (data) {
					this.data = this.convert(data)
				}
			},
			setCurrent: function setCurrent(id) {
				var $theOne = $("ul#navigator span#" + id);

				if ($theOne.length === 1) {
					$("li.navigatorElement span").removeClass("selectedLI");
					$theOne.addClass("selectedLI");
				}
			},
			draw: function draw() {
				if (this.data) {
					var that = this;
					// console.log(this.data);
					currentIdsAndLabels: {};
					// if(this.data.children.length > 0)
					// 	this.data.children[0].children.push( {id:"BUM", label: "BIMBAM"} );
					var out = (function(data) {
						var tab = [];

						tab.push("<ul id='navigator'>");
						tab.push("<li class='navigatorElement'><img id='img_navigator|" + data.id + "' src='images\\arrow_next.png' class='img_hasChildren' style='width: 10px'/><span id='" + data.id + "'>" + data.id + "</span></li>");

						that.currentIdsAndLabels[data.id] = data.label || data.id;

						(function inner(data, id) {
							tab.push("<ul id='" + id + "'>");
							$.each(data.children, function() {
								if (this.children && this.children.length > 0) {
									tab.push("<li class='navigatorElement'><img id='img|" + id + "' src='images\\arrow_next.png' class='img_hasChildren' style='width: 10px'/><span id='" + this.id + "'>" + this.label + "</span></li>");
									inner(this, id + "|" + this.id);
								} else {
									tab.push("<li class='navigatorElement'><img src='images\\white.gif' class='img_noChildren' style='visibility: hidden;height: 10px; width: 10px'/><span id='" + this.id + "'>" + this.label + "</span></li>");
								}
								that.currentIdsAndLabels[this.id] = this.label || this.id;
							});
							tab.push("</ul>");
						})(data, 'navigator|' + data.id);
						tab.push("</ul>");

						return tab.join("");
					})(this.data);

					$("#navigator_" + pf).html(out);

					$("img.img_hasChildren").click(function() {
						var $ul = $(this).parent().next();
						$ul.toggle(150);
						// dodać zmianę img
						return false;
					});

					$("li.navigatorElement").click(function() {
						var $this = $(this);
						if (!$this.find("span").hasClass("selectedLI")) {
							$("li.navigatorElement span").removeClass("selectedLI");
							$this.find("span").addClass("selectedLI");

							// console.log($(this).parent().find("img").attr("id").split("|")[1]);
							gui.controler.reactOnEvent("SwitchCurrentGraph", {
								id: $this.parent().attr("id") + "|" + $this.find("span:first").attr("id")
							})
						}
						return false;
					});

					$("li.navigatorElement:first").click();
				}
			},
			convert: function convert(json, id, str) {
				// alert(json.id)
				var n = json.nodes,
					id = json.id,
					output_json = {
						id: (id ? id : "root"),
						children: []
					};
				str = ((str ? str : "") + (id ? id : "root"))
				$.each(n, function() {
					if (this.subgraph && this.subgraph.nodes && this.subgraph.nodes.length > 0) {
						var currNode = {};
						currNode.id = this.nodeId;
						currNode.label = this.nodeLabel;
						currNode.children = convert(this.subgraph).children;
						output_json.children.push(currNode);
					}
				});
				// console.log(output_json);
				return output_json;
			}
		}
		tmp.draw();

		return tmp;
	}
//Koniec pliku navigator.js
//Poczatek pliku repository.js
	function repository() {
		var tmp = {
			name: "repository",
			version: "1.0",
			author: "Author",
			dataType: 'xml',
			data: undefined,
			globalEvents: ["load"],
			require: "div canvas".split(" "),
			localEvents: ["select"],
			init: function init() {
				if ($("#repository_" + pf).length === 0) {
					$("#right_plugins_" + pf).append("<div id='repository_" + pf + "' class='plugin_" + pf + "' style='overflow:hidden;'> </div>");
				}
			},
			setData: function setData(data) {
				//na przyszłość wymagane więcej walidacji
				if (data && data.constructor == "[object XMLDocument]") {
					this.data = data;
				}

				return this;
			},
			draw: function draw() {
				if (this.data) {
					var html = [],
						name, url, that = this;;

					$(this.data).find("list element").each(function() {
						name = $(this).find("name").text();
						url = $(this).find("url").text();
						html.push("<a href='" + url + "' class='repository_link_" + pf + "'>" + name + "</a><br/>");
					});

					$("#repository_" + pf).html(html.join(""));

					var $repository_links = $(".repository_link_" + pf);
					$repository_links.click(function() {
						$repository_links.removeClass("selectedRepoNodes")
						gui.controler.reactOnEvent("LoadAndEditCompoundService", {
							url: this.href,
							title: this.textContent
						});
						$(this).addClass("selectedRepoNodes");
						return false;
					});

					$($("a")[4]).click();
					// $("a:last").click();
				}

				return this;
			}
		}

		return tmp;
	}
//Koniec pliku repository.js
//Poczatek pliku shortcut.js
function shortcutHelper() {
		var memoryTab = [],
			validationTab = ["ctrl", "delete", "shift", "esc", "f1", "home", "alt", "backspace", "space", "enter", "home", "end"],
			// spacje
			exists = function shortcutExists(shortcut) {
				var result = false;
				$.each(memoryTab, function() {
					if (this === shortcut) {
						result = true;
						return false;
					}
				})

				return result;
			},
			validate = function isValid(argumentsTab) {
				var shortcut = argumentsTab[0].toLowerCase().replace(/ /g, ""),
					callback = argumentsTab[1],
					opt = argumentsTab[2],
					msgTab = [],
					result = {
						valid: true,
						msg: ""
					};

				if (typeof callback != "function") {
					result.valid = false;
					msgTab.push("drugi argument musi być funkcją.");
				}

				if (!(typeof shortcut == "string")) {
					result.valid = false;
					msgTab.push("\npierwszy argument musi być typu string");
				} else {
					var stringTab = shortcut.split("+");
					msgTab.push("\npodany skrót: " + shortcut)

					var numberOfAZ = 0
					$.each(stringTab, function(i) {
						var noErrors = true,
							that = this.toString();
						if (!~validationTab.indexOf(that)) {
							if (!/^[a-z]{1}$/.test(that)) {
								result.valid = false;
								msgTab.push("\nnieprawidłowa wartość: " + that);
							} else if (numberOfAZ > 0) {
								result.valid = false;
								msgTab.push("\nnieprawidłowa wartość: +" + that);
							} else {
								numberOfAZ++;
							}
						}
					});

				}
				if (!result.valid) result.msg = msgTab.join("");

				return result;
			},
			result = {
				add: function add(shortcut, fun, opt) {
					var result = true,
						validationObj = validate(arguments);
					opt = opt || {
						'type': 'keypress',
						'propagate': false,
						'target': document
					}

					shortcut = shortcut.toLowerCase().replace(/ /g, "");
					if (!validationObj.valid) {
						gui.logger.error("shortcut.add", validationObj.msg.replace(/\n/g, "<br/>"));
					} else if (exists(shortcut)) {
						gui.logger.error("shortcut.add", shortcut + language[gui.language].alerts.errors.shortcutAdded);
					} else {
						memoryTab.push(shortcut);
						// console.log(opt)
						window.shortcut.add(shortcut, fun, opt)
					}

					// console.log(memoryTab)
					return result;
				},
				remove: function remove(shortcut) {
					// transformacja shortcut
					shortcut = shortcut.toLowerCase().replace(/ /g, "");
					// console.log(shortcut);
					var index = memoryTab.indexOf(shortcut);
					var result = true;

					if (!~index) {
						gui.logger.error("shortcut.remove", language[gui.language].alerts.errors.shortcut + shortcut + "\"" + language[gui.language].alerts.errors.shorcutNotDefined);
						result = false;
					} else {
						memoryTab.splice(index, 1);
						window.shortcut.remove(shortcut);
					}

					// console.log(memoryTab)
					return result;
				}
			};

		return result;
}
//Koniec pliku shortcut.js
//Poczatek pliku controler.js
// ocb z exeptions i parameters w graphie ???
"use strict";
//url to adres do pliku albo repozytorium, które wysy³a listê dostêpnych us³ug.

function Controler(url, saveUrl, graphToEditUrl, graphToEditName, gui) {
	var pf = gui.id_postfix;
	var selectednode = false;

	var controlerObject = {
		plugins: [],
		idCounter: 0,
		graphData_tab: [],
		current_graphData: {
			id: "root",
			nodes: [],
			isRoot: true
		},
		// element modelu, ale celowo zawarty w kontrolerze
		init: function init() {
			this.initPlugins();
		},
		initPlugins: function initPlugins() {
			// this.repository = repository(gui.view.columnParams.rightCol.width);
			// this.repository.init();
			this.repoNodes = repoNodes(gui.view.visualiser);
			this.repoNodes.init();
			this.navigator = navigation();
			this.navigator.init();
			this.shortcut = shortcutHelper();

			this.shortcut.add("ctrl+a", (function() {
				this.reactOnEvent("selectAll")
			}).bind(this));
			this.shortcut.add("Esc", (function() {
				this.reactOnEvent("Escape")
			}).bind(this));

			this.shortcut.add("Delete", (function() {
				this.reactOnEvent("Delete")
			}).bind(this));

			this.shortcut.add("ctrl + X", function() {
				alert("")
			});
			this.shortcut.add("ctrl+shift+z", function() {
				alert("")
			});

			this.shortcut.add("ctrl + s", function(event) {
				alert(event);
			});

			setTimeout((function() {
				this.shortcut.remove("ctrl+x")
			}).bind(this), 2000);
		},
		getGraphById: function getGraphById(id) {
			var result;
			$.each(this.graphData_tab, function() {
				if (id === this.id) {
					result = this;
					return false;
				}
			});

			return result;
		},
		deploy: deploy,
		initLogger: initLogger,
		changeCurrentGraphData: function changeCurrentGraphData(id) {
			var result;
			$.each(this.graphData_tab, function() {
				if (this.id === id) {
					result = this;
					return false;
				}
			});
			if (result) {
				this.current_graphData = result;
			}
		},
		generateIOId: function generateIOId(seed) {
			seed = seed || "id00";
			return seed + Math.round(Math.random() * 10e5);
		},
		save: function save(sUrl, data, type, dataType, fun_success, fun_error) {
			// jsonFormatter(arguments, 1, 1);
			$.ajax({
				url: sUrl,
				type: type,
				dataType: dataType || 'text',
				data: data,
				success: fun_success ||
				function(res, status, jqXHR) {
					// alert("saved");
				},
				error: fun_error ||
				function(jqXHR, status, e) {
					// alert("error");
				}
			});
		},
		load: function load(sUrl, fun_success, dataType, fun_error) {
			$.ajax({
				url: sUrl,
				type: "GET",
				dataType: dataType || 'xml',
				success: fun_success ||
				function(res, status, jqXHR) {
					// console.group("AJAX QUERY RESULTS:");
					// console.info("Loaded data from "+sUrl+" with status: "+status);
					// console.group("Response:");
					// console.log(res);
					// console.groupEnd();
					// console.groupEnd();
				},
				error: fun_error ||
				function(jqXHR, status, e) {
					// console.group("AJAX QUERY RESULTS:");
					// console.error("Error while downloading data from "+sUrl);
					// console.log(status+": "+e);
					// console.groupEnd();
				}
			});
		},
		reactOnEvent: function reactOnEvent(evtType, evtObj) {
			//var events = ("DRAGGING SELECTION, SELECT, DESELECT, MOVE, RESIZE, SCROLL, DELETE, EDGE DETACH,"+" DELETE NODE, CREATE NODE, CREATE EDGE, GRAPH LOADED, GRAPH SAVED, GRAPH CHANGED").split(", ");			
			var that = this;

			console.log('Event: ', evtType, '  ->  ', evtObj);
			switch (evtType.toUpperCase()) {
				case "ASKDAMIANFORID" :
					(function(e){
						that.load(CFG.url_askForId, e.onsuccess, "xml", e.onerror);
					})(evtObj);
					break;
				case "EDITSERVICE":
					(function(e) {
						if (e && e.url) {
							that.loadSSDL(e.url);
						}
					})(evtObj);
					break;
				case "SAVE":
					(function(e) {
						// na szybko
						// 	$("#saveDialog").dialog("open");
						// } else {
						var savedSSDL = that.saveSSDL();
						var validation = validatorObject.validateGraph(that.getRoot());

						// e = e || {};
						// e.name = 1;
						// e.description = 1;
						if (that.current_graphData.nodes.length < 3) {
							alert(language[gui.language].alerts.emptyGraph)
						} else if (!(e && e.name && e.description) && !graphToEditUrl) {
							gui.view.form.editGraphSaveParams();
						} else {
							if (validation && validation.numberOfErrors && (validation.numberOfErrors < 1) || confirm(language[gui.language].alerts.graphNotPassedValidation)) {
								var output = !graphToEditUrl ? "name=" + e.name + "&description=" + e.description + "&" : "";
								output += "ssdl=" + savedSSDL;


								console.log(output)
								that.save(saveUrl, output, "POST", "xml", function() {
									alert(language[gui.language].alerts.saveOK);
								}, function() {
									alert(language[gui.language].alerts.saveNotOK);
								})
							}
						}

						// save(sUrl, data, type, fun_success, dataType, fun_error)
					})(evtObj);
					break;
				case "START":
					(function() {
						// that.load(url, function fun_success(list){
						// 	that.repository.setData(list).draw();
						// });
						that.load(url, function fun_success(sdb) {
							var parsedSDB = that.parseSDBetaArray(sdb);
							that.repoNodes.setData(parsedSDB).draw();
						});
						that.reactOnEvent("LoadAndEditCompoundService", {
							url: graphToEditUrl,
							title: graphToEditName
						});
					})();
					break;
				case "TRYTOSAVENODEAFTEREDIT":
					(function(e) {
						//e = zwrócony JSONek
						var wrongsList = prepareFormMessages(validatorObject.validateNode(e));
						if (wrongsList.length === 0) {
							$.each(that.current_graphData.nodes, function(i, v) {
								if (v.nodeId == e.nodeId) {
									that.current_graphData.nodes[i] = e;
									console.log(that.current_graphData.nodes);
									return false;
								}
							});
							gui.view.updateNode(e);
							gui.view.form.closeForm();
						} else {
							gui.view.form.handleErrors(wrongsList);
						}
						// Deploying
					})(evtObj);
					break;
				case "DELETE":
					(function() {
						var e;
						switch (gui.view.mode) {
						case 'DF':
							var len = gui.view.current_graph_view.edgesDF.length;
							for (var i = len; i > 0; i--) {
								e = gui.view.current_graph_view.edgesDF[i - 1];
								if (e.highlighted) {
									for (var j = 0; j < gui.view.current_graph_view.edgesDF.length; j++) {
										if (gui.view.current_graph_view.edgesDF[j] === e) {
											gui.view.current_graph_view.edgesDF[j].remove();
											gui.view.current_graph_view.edgesDF.splice(j, 1);
											j = len;
										}
									}
								}
							}
							break;
						case 'CF':
							len = gui.view.current_graph_view.edgesCF.length;
							for (i = len; i > 0; i--) {
								e = gui.view.current_graph_view.edgesCF[i - 1];
								if (e.highlighted) {
									var sId = e.source.id;
									var tId = e.target.id;
									var len = gui.controler.current_graphData.nodes.length;
									for (var j = 0; j < len; j++) {
										if (gui.controler.current_graphData.nodes[j].nodeId == tId) {
											var index = gui.controler.current_graphData.nodes[j].sources.indexOf(sId);
											gui.controler.current_graphData.nodes[j].sources.splice(index, 1);
											j = len;
										}
									}
									len = gui.view.current_graph_view.edgesCF.length;
									for (var j = 0; j < len; j++) {
										if (gui.view.current_graph_view.edgesCF[j] === e) {
											gui.view.current_graph_view.edgesCF[j].remove();
											gui.view.current_graph_view.edgesCF.splice(j, 1);
											j = len;
										}
									}
								}
							}
							break;
						}

						//część usuwająca node'y
						var index;
						gui.view.hideCurrentGraph();
						for (var q = gui.view.current_graph_view.nodes.length; q > 0; q--) {
							e = gui.view.current_graph_view.nodes[q - 1];
							if (e.highlighted) {
								$.each(gui.controler.current_graphData.nodes, function(i, v) {
									if (v.nodeId == e.id) {
										gui.controler.current_graphData.nodes.splice(i, 1);
										gui.view.current_graph_view.nodes.splice(i, 1);
										return false;
									}
								});
								$.each(gui.controler.current_graphData.nodes, function(i, v) {
									if ((index = v.sources.indexOf(e.id)) != -1) {
										gui.controler.current_graphData.nodes[i].sources.splice(index, 1);
									}
								});
								for (var i = gui.view.current_graph_view.edgesCF.length; i > 0; i--) {
									if (gui.view.current_graph_view.edgesCF[i - 1].source.id == e.id) gui.view.current_graph_view.edgesCF.splice(i - 1, 1);
									else if (gui.view.current_graph_view.edgesCF[i - 1].target.id == e.id) gui.view.current_graph_view.edgesCF.splice(i - 1, 1);
								}

								for (var i = gui.view.current_graph_view.edgesDF.length; i > 0; i--) {
									if (gui.view.current_graph_view.edgesDF[i - 1].sourceId == e.id) gui.view.current_graph_view.edgesDF.splice(i - 1, 1);
									else if (gui.view.current_graph_view.edgesDF[i - 1].targetId == e.id) gui.view.current_graph_view.edgesDF.splice(i - 1, 1);
								}
							}
						}
						gui.view.showCurrentGraph();
						gui.view.switchMode();
						selectednode = false;
					})(evtObj);
					break;
				case "SELECT":
					(function(e) {
						gui.view.selectNodesInsideRect(e.x1, e.y1, e.x2, e.y2, e.ctrl);
						gui.view.selectEdgesInsideRect(e);
					})(evtObj);
					break;
				case "CLEARGRAPH":
					(function() {
						gui.view.hideCurrentGraph();
						gui.view.current_graph_view.edgesDF = [];
						gui.view.current_graph_view.nodes = [];
						gui.view.current_graph_view.edgesCF = [];
						gui.controler.current_graphData.nodes = [];
						gui.view.showCurrentGraph();
						gui.view.switchMode();
					})(evtObj);
					break;
				case "DESELECT":
					(function() {
						gui.view.deselectAll();
					})();
					break;
				case "SELECTALL":
					(function() {
						gui.view.selectAll();
					})();
					break;
				case "ESCAPE":
					(function() {
						gui.view.updateEdges();
						gui.view.menuList.getInstance().close();
						gui.view.deselectAll();
						gui.view.tooltip.close();
						// gui.logger.close();
					})();
					break;
				case "ADDOUTPUT":
					(function(e) {
						var source = that.getNodeById(e.sourceId),
							input = e.input,
							outputTmp, output, newId, graphNode;
						if (source) {
							outputTmp = that.getOutputById(e.sourceId, input.id)
							if (outputTmp) {
								newId = that.generateIOId(input.id);
							}
							output = {
								id: newId || input.id,
								class: input.class,
								label: input.label,
								dataType: input.dataType
							};

							source.functionalDescription.outputs.push(output);
							
							graphNode = gui.view.getNodeById(e.sourceId);
							graphNode.addOutput(output);
							output = graphNode.getOutputById(output.id);

							// console.log(source)
							that.reactOnEvent("addDFEdge", {
								sourceId: source.nodeId,
								targetId: e.targetId,
								input: e.input,
								output: output,
								CF_or_DF: "DF"
							});
						}

						// console.log(e)
					})(evtObj);
					break;
				case "ADDINPUT":
					(function(e) {
						// console.log(e);
						var target = that.getNodeById(e.targetId),
							output = e.output,
							inputTmp, input, newId, graphNode;
						if (target) {
							inputTmp = that.getInputById(e.targetId, output.id)
							if (inputTmp) {
								newId = that.generateIOId(output.id);
							}
							input = {
								id: newId || output.id,
								class: output.class,
								label: output.label,
								dataType: output.dataType
							};

							target.functionalDescription.inputs.push(input);

							// gui.view.updateNode(target);
							// jedyna wada obecnego podejścia: nie sprawdza, czy dany io już istnieje,
							// ale w tym wypadku nie jest to potrzebne
							graphNode = gui.view.getNodeById(e.targetId);
							graphNode.addInput(input);
							input = graphNode.getInputById(input.id);

							that.reactOnEvent("addDFEdge", {
								sourceId: e.sourceId,
								targetId: e.targetId,
								input: input,
								output: e.output,
								CF_or_DF: "DF"
							});
						}

						// console.log(e)
					})(evtObj);
					break;
				case "ADDCFEDGE":
					(function(e) {
						var target = gui.controler.getNodeById(e.target.id);
						// alert(e.target.id)
						target.sources.push(e.source.id);
						var edge = gui.view.addCFEdge(e);
						if(edge)
							gui.view.current_graph_view.edgesCF.push(edge);
					})(evtObj);
					break;
				case "ADDDFEDGE":
					(function(e) {
						// console.log(e)
						var input = gui.controler.getInputById(e.targetId, e.input.id);
						if (input) {
							input.source = [e.sourceId, e.output.id];
						} else {
							a(e.targetId + ":" + e.input.id);
						}
						var edge = gui.view.addDFEdge(e);
						gui.view.current_graph_view.edgesDF.push(edge);
					})(evtObj);
					break;
				case "NODESELECTED":
					(function(e) {
						selectednode = true;
					})(evtObj);
					break;
				case "NODEMOVED":
					(function(e) {

					})(evtObj);
					break;
				case "SWITCHMODE":
					(function(e) {
						gui.view.switchMode(e.mode);
					})(evtObj);
					break;
				case "ADDSTARTSTOPAUTOMATICALLY":
					(function() {
						var result = that.addStartStop();
						if (result) {
							gui.view.addStartStop(result);
						}
					})();
					break;
				case "ADDSERVICEFROMREPOTOCANVAS":
					(function(e) {
						e.nodeId = gui.controler.generateId();
						// alert(e.nodeId)
						e = $.extend(true, {}, e);
						e.functionalDescription.inputs = $.extend(true, [], e.functionalDescription.inputs);
						e.functionalDescription.outputs = $.extend(true, [], e.functionalDescription.outputs);

						that.current_graphData.nodes.push(e)
						gui.view.addNodeFromRepo(e);
					})(evtObj);
					break;
				case "EDITNODE":
					(function(e) {
						if (e && e.nodeId) {
							// alert(e.nodeId)
							var node = that.getNodeById(e.nodeId);
							gui.view.editNode(node);
						}
					})(evtObj);
					break;
				case "LOADANDEDITCOMPOUNDSERVICE":
					(function(e) {
						that.load(e.url, (function(ssdl) {
							var tab = [],
								ssdl_json = this.convert(ssdl, e.title);
							// raport(this.convertJSON2XML(ssdl_json, true));
							// var afterValidation = that.validator.
							// if( true )
							// 	this.current_graphData = ssdl_json;
							// rozwal na tablice
							(function splitOnSubgraph(graph, id, isRoot) {
								$.each(graph.nodes, function() {
									if (this.subgraph.nodes) {
										splitOnSubgraph(this.subgraph, this.nodeId);
									}
								});
								graph.id = (id || graph.id);
								graph.isRoot = isRoot;
								//delete graph.subgraph;
								tab.push(graph);

							})(ssdl_json, e.title, true);

							//walidacja
							//save current data, graph_view
							//delete all graphViews
							// gui.view.
							gui.view.removeAllGraphs();
							gui.view.setBlankGraphAsCurrent()

							if(tab.length == 0){
								this.graphData_tab = [ current_graphData ];
							} else {
								this.graphData_tab = tab;
								this.current_graphData = tab[tab.length - 1];
							}

							gui.view.parseAndSetDataModelToView(this.graphData_tab);

							this.reactOnEvent("SSDLLoaded", ssdl);
						}).bind(that));
					})(evtObj);
					break;
				case "SWITCHCURRENTGRAPH":
					(function(e) {
						// --- kod dla wtyczki navigator
						if (e && e.id && (typeof e.id === "string") && e.id.substring(e.id.lastIndexOf("|") + 1 !== that.current_graphData.id)) {
							var tab_nav = e.id.split("|");
							tab_nav.splice(0, 1);
							var tab_copy = $.extend(true, [], tab_nav),
								id = tab_nav[tab_nav.length - 1],
								id_string = "",
								labels = that.navigator.currentIdsAndLabels;
							$.each(tab_nav, function(k, v) {
								id_string += "|" + v;
								tab_nav[k] = "<a href='#' class='top_nav_element' id='top_nav_elem" + id_string + "'>" + (labels[v] || v) + "</a>";
							});
							tab_nav = tab_nav.join(" \\ ");

							$("div#top_nav_" + pf + " span").html(tab_nav);

							$("a.top_nav_element").click(function() {
								var lastIndexOf = this.id.lastIndexOf("|"),
									id = this.id.substring(lastIndexOf + 1);
								that.reactOnEvent("SWITCHCURRENTGRAPH", {
									id: this.id
								});
								that.navigator.setCurrent(id)
							});

							gui.view.changeCurrentGraphView(id);
							that.changeCurrentGraphData(id);
						}
					})(evtObj);
					break;
				case "SSDLLOADED":
					(function(e) {
						that.navigator.setData(that.current_graphData)
						that.navigator.draw();
					})(evtObj);
					break;
				case "ADDBLANKNODE":
					(function(e) {
						e.nodeId = that.generateId();
						e.isBlank = true;
						var graphNode = gui.view.visualiser.visualiseNode(e);
						graphNode.switchMode( gui.view.mode );
						gui.view.current_graph_view.nodes.push(graphNode);
						that.current_graphData.nodes.push(e);
					})(evtObj);
					break;
			}
		},
		xmlToString: function xmlToString(xml) {
			console.log(xml)
			return (new XMLSerializer()).serializeToString(xml);
		},
		updateNodeData: function updateNodeData(oldNode, newNode) {
			oldNode.nodeLabel = newNode.nodeLabel;
			oldNode.physicalDescription = newNode.physicalDescription;
			oldNode.functionalDescription = newNode.functionalDescription;
			oldNode.nonFunctionalDescription = newNode.nonFunctionalDescription;
		},
		getNodeById: function getNodeById(id, graph) {
			var result;
			graph = graph || gui.controler.current_graphData;
			if (graph.nodes) {
				$.each(graph.nodes, function() {
					if (this.nodeId === id) {
						result = this;
						return false;
					}
				});
			}

			return result;
		},
		getInputById: function getInputById(nodeId, inputId) {
			var result;

			if (gui.controler.current_graphData.nodes) {
				$.each(gui.controler.current_graphData.nodes, function() {
					if (this.nodeId === nodeId) {
						$.each(this.functionalDescription.inputs, function() {
							if (this.id === inputId) {
								result = this;
								return false;
							}
						});
						return false;
					}
				});
			}

			return result;
		},
		getOutputById: function getOutputById(nodeId, inputId) {
			var result;

			if (gui.controler.current_graphData.nodes) {
				$.each(gui.controler.current_graphData.nodes, function() {
					if (this.nodeId === nodeId) {
						$.each(this.functionalDescription.outputs, function() {
							if (this.id === inputId) {
								result = this;
								return false;
							}
						});
						return false;
					}
				});
			}

			return result;
		},
		addStartStop: function addStartStop() {
			var result = false;
			if (!(this.getNodeById("#Start") || this.getNodeById("#End"))) {
				var start = {
					nodeId: "#Start",
					nodeLabel: "#Start",
					nodeType: "Control",
					controlType: "#start",
					physicalDescription: {
						address: "",
						operation: "",
						serviceGlobalId: "",
						serviceName: ""
					},
					functionalDescription: {
						description: "Start node",
						effects: "",
						inputs: [],
						outputs: [],
						metaKeywords: [],
						preconditions: "",
						serviceClasses: []
					},
					alternatives: "",
					condition: "",
					sources: [],
					subgraph: {},
					nonFunctionalDescription: []
				},
					stop = {
						nodeId: "#End",
						nodeLabel: "#End",
						nodeType: "Control",
						controlType: "#end",
						physicalDescription: {
							address: "",
							operation: "",
							serviceGlobalId: "",
							serviceName: ""
						},
						functionalDescription: {
							description: "end node",
							effects: "",
							inputs: [],
							outputs: [],
							metaKeywords: [],
							preconditions: "",
							serviceClasses: []
						},
						alternatives: "",
						condition: "",
						sources: [],
						subgraph: {},
						nonFunctionalDescription: []
					};

				this.current_graphData.nodes.unshift(start, stop);

				result = {
					start: start,
					stop: stop
				};
			}

			return result;
		},
		generateId: function generateId() {
			this.idCounter++;
			var num = this.idCounter,
				tab = ["node---"],
				digitMax = 6,
				digits = Math.ceil(Math.log(num) / Math.log(10)),
				digitMax = (digitMax - digits >= 0 ? digitMax : digits);

			for (var i = 0; i < digitMax - digits; i++)
				tab.push("0");
			tab.push(num);

			var outputId = tab.join("");

			return tab.join("");
		},
		parseSDBetaArray: function parseSDBetaArray(sdb) {
			var tab = [],
				that = this,
				node, $sdbArray, $sdb, $physicalDescription, $functionalDescription, $functionalDescriptionServiceClasses, $functionalDescriptionMetaKeywords, $functionalDescriptionInputs, $functionalDescriptionOutputs, $nonfunctionalDescription;

			$sdbArray = $(sdb).find("ServiceDescriptionArray ns2\\:serviceDescription");
			$sdbArray.each(function() {
				node = {};
				$sdb = $(this);
				$physicalDescription = $sdb.find("ns2\\:physicalDescription");
				$functionalDescription = $sdb.find("ns2\\:functionalDescription");
				$functionalDescriptionServiceClasses = $functionalDescription.find("ns2\\:serviceClasses ns2\\:serviceClass");
				$functionalDescriptionMetaKeywords = $functionalDescription.find("ns2\\:metaKeywords ns2\\:metaKeyword");
				$functionalDescriptionInputs = $functionalDescription.find("ns2\\:inputs ns2\\:input");
				$functionalDescriptionOutputs = $functionalDescription.find("ns2\\:outputs ns2\\:output");
				$nonfunctionalDescription = $sdb.find("ns2\\:nonfunctionalDescription  ns2\\:nonFunctionaleProperty");

				node.nodeLabel = $physicalDescription.find("ns2\\:serviceName").text();
				node.nodeType = "Service";
				node.physicalDescription = {
					serviceName: node.nodeLabel,
					serviceGlobalId: $physicalDescription.find("ns2\\:serviceGlobalID").text(),
					address: $physicalDescription.find("ns2\\:address").text(),
					operation: $physicalDescription.find("ns2\\:operation").text()
				};

				node.functionalDescription = {
					serviceClasses: [],
					description: $functionalDescription.find("ns2\\:description").text(),
					metaKeywords: [],
					inputs: [],
					outputs: [],
					preconditions: [],
					effects: []
				}

				node.nonfunctionalDescription = [];

				$functionalDescriptionServiceClasses.each(function() {
					node.functionalDescription.serviceClasses.push(this.textContent);
				});
				$functionalDescriptionMetaKeywords.each(function() {
					node.functionalDescription.metaKeywords.push(this.textContent);
				});
				$functionalDescriptionInputs.each(function() {
					var input = {};
					input.class = $(this).find("ns2\\:class").text();
					input.id = $(this).find("ns2\\:id").text();
					input.label = $(this).find("ns2\\:label").text();
					input.dataType = $(this).find("ns2\\:dataType").text();
					input.properties = $(this).find("ns2\\:properties").text();

					node.functionalDescription.inputs.push(input);

				});
				$functionalDescriptionOutputs.each(function() {
					var output = {};
					output.class = $(this).find("ns2\\:class").text();
					output.id = $(this).find("ns2\\:id").text();
					output.label = $(this).find("ns2\\:label").text();
					output.dataType = $(this).find("ns2\\:dataType").text();
					output.properties = $(this).find("ns2\\:properties").text();

					node.functionalDescription.outputs.push(output);

				});
				$nonfunctionalDescription.each(function() {
					var nonFunctionaleProperty = {};
					nonFunctionaleProperty.unit = $(this).find("ns2\\:unit").text();
					nonFunctionaleProperty.value = $(this).find("ns2\\:value").text();
					nonFunctionaleProperty.relation = $(this).find("ns2\\:relation").text();
					nonFunctionaleProperty.name = $(this).find("ns2\\:name").text();

					node.nonfunctionalDescription.push(nonFunctionaleProperty);
				});

				node.sources = [];

				tab.push(node);
				// console.log( jstr(node) )
				// console.log("++++++++")
			});

			// console.log(jstr(tab))
			return tab;
		},
		convertJSON2XML: function convertJSON2XML(json, humanFriendly) {
			function parseGraph(subgraph, tabulacja) {
				// alert(++i);
				tabulacja = (tabulacja && typeof tabulacja == "string" ? tabulacja : "");
				if (subgraph && subgraph.nodes && subgraph.nodes.length > 0) {
					tabOutput.push(tabulacja + "<nodes>\n");
					$.each(subgraph.nodes, function(key, node) {
						parseNode(key, node, tabulacja);
					});
					tabOutput.push(tabulacja + "</nodes>\n"); /* Koniec wierzchołków  w grafie */
				} else {
					tabOutput.push(tabulacja + "<nodes/>\n")
				}
				parseGraphAtributes(subgraph, tabulacja)
			}

			function parseGraphAtributes(graph, tabulacja) { /* Dane wejściowe  w grafie */
				if (graph.inputVariables && graph.inputVariables.length > 0) {
					tabOutput.push(tabulacja + "<inputVariables>\n");
					$.each(graph.inputVariables, function(key, inputVariable) {
						tabOutput.push(tabulacja + "\t<inputVariable>\n");
						tabOutput.push(tabulacja + "\t\t<name>" + (inputVariable.name || "") + "</name>\n");
						tabOutput.push(tabulacja + "\t\t<value>" + (inputVariable.value || "") + "</value>\n");
						tabOutput.push(tabulacja + "\t\t<type>" + (inputVariable.type || "") + "</type>\n");
						tabOutput.push(tabulacja + "\t</inputVariable>\n");
					});
					tabOutput.push(tabulacja + "</inputVariables>\n");
				} else {
					tabOutput.push(tabulacja + "<inputVariables/>\n");
				} /* Koniec danych wejściowych  w grafie */

				/* Paramertry niefunkcjonalne w grafie */
				if (graph.nonFunctionalParameters && graph.nonFunctionalParameters.length > 0) {
					tabOutput.push(tabulacja + "<nonFunctionalParameters>\n");
					$.each(graph.nonFunctionalParameters, function(key, nonFunctionalProperty) {
						tabOutput.push(tabulacja + "\t<nonFunctionalProperty>\n");
						tabOutput.push(tabulacja + "\t\t<weight>" + (nonFunctionalProperty.weight || "") + "</weight>\n");
						tabOutput.push(tabulacja + "\t\t<unit>" + (nonFunctionalProperty.unit || "") + "</unit>\n");
						tabOutput.push(tabulacja + "\t\t<value>" + (nonFunctionalProperty.value || "") + "</value>\n");
						tabOutput.push(tabulacja + "\t\t<relation>" + (nonFunctionalProperty.relation || "") + "</relation>\n");
						tabOutput.push(tabulacja + "\t\t<name>" + (nonFunctionalProperty.name || "") + "</name>\n");
						tabOutput.push(tabulacja + "\t</nonFunctionalProperty>\n");
					});
					tabOutput.push(tabulacja + "</nonFunctionalParameters>\n");
				} else {
					tabOutput.push(tabulacja + "<nonFunctionalParameters/>\n");
				} /* Koniec parametrów niefunkcjonalnych w grafie */
			}

			function parseNode(key, node, tabulacja) {
				// alert(node.nodeId)
				/* Wierzchołki  w grafie */
				tabulacja = (tabulacja && typeof tabulacja == "string" ? tabulacja : "");
				tabOutput.push(tabulacja + "\t<node>\n");
				tabOutput.push(tabulacja + "\t\t<nodeId>" + (node.nodeId || "") + "</nodeId>\n");
				tabOutput.push(tabulacja + "\t\t<nodeLabel>" + (node.nodeLabel || "") + "</nodeLabel>\n");
				tabOutput.push(tabulacja + "\t\t<nodeType>" + (node.nodeType || "") + "</nodeType>\n");
				tabOutput.push(tabulacja + "\t\t<controlType>" + (node.controlType || "") + "</controlType>\n");
				if (node.physicalDescription) {
					physicalDescription = node.physicalDescription;
					tabOutput.push(tabulacja + "\t\t<physicalDescription>\n");
					tabOutput.push(tabulacja + "\t\t\t<serviceName>" + (physicalDescription.serviceName || "") + "</serviceName>\n");
					tabOutput.push(tabulacja + "\t\t\t<serviceGlobalId>" + (physicalDescription.serviceGlobalId || "") + "</serviceGlobalId>\n");
					tabOutput.push(tabulacja + "\t\t\t<address>" + (physicalDescription.address || "") + "</address>\n");
					tabOutput.push(tabulacja + "\t\t\t<operation>" + (physicalDescription.operation || "") + "</operation>\n");
					tabOutput.push(tabulacja + "\t\t</physicalDescription>\n");
				}
				if (node.functionalDescription) {
					functionalDescription = node.functionalDescription;
					tabOutput.push(tabulacja + "\t\t<functionalDescription>\n");
					if (functionalDescription.serviceClasses && functionalDescription.serviceClasses.length > 0) {
						tabOutput.push(tabulacja + "\t\t\t<serviceClasses>\n");
						$.each(functionalDescription.serviceClasses, function(key, serviceClass) {
							tabOutput.push(tabulacja + "\t\t\t\t<serviceClass>" + (serviceClass || "") + "</serviceClass>\n");
						});
						tabOutput.push(tabulacja + "\t\t\t</serviceClasses>\n");
					} else {
						tabOutput.push(tabulacja + "\t\t\t<serviceClasses/>\n");
					}
					tabOutput.push(tabulacja + "\t\t\t<description>" + (functionalDescription.description || "") + "</description>\n");
					if (functionalDescription.metaKeywords && functionalDescription.metaKeywords.length > 0) {
						tabOutput.push(tabulacja + "\t\t\t<metaKeywords>\n");
						$.each(functionalDescription.metaKeywords, function(key, metaKeyword) {
							tabOutput.push(tabulacja + "\t\t\t\t<metaKeyword>" + (metaKeyword || "") + "</metaKeyword>\n");
						});
						tabOutput.push(tabulacja + "\t\t\t</metaKeywords>\n");
					} else {
						tabOutput.push(tabulacja + "\t\t\t<metaKeywords/>\n");
					}
					if (functionalDescription.inputs && functionalDescription.inputs.length > 0) {
						tabOutput.push(tabulacja + "\t\t\t<inputs>\n");
						$.each(functionalDescription.inputs, function(key, input) {
							tabOutput.push(tabulacja + "\t\t\t\t<input>\n");
							tabOutput.push(tabulacja + "\t\t\t\t\t<class>" + (input.class || "") + "</class>\n");
							tabOutput.push(tabulacja + "\t\t\t\t\t<id>" + (input.id || "") + "</id>\n");
							tabOutput.push(tabulacja + "\t\t\t\t\t<label>" + (input.label || "") + "</label>\n");
							tabOutput.push(tabulacja + "\t\t\t\t\t<dataType>" + (input.dataType || "") + "</dataType>\n");
							tabOutput.push(tabulacja + "\t\t\t\t\t<properties>" + (input.properties || "") + "</properties>\n");
							tabOutput.push(tabulacja + "\t\t\t\t\t<source>\n");
							tabOutput.push(tabulacja + "\t\t\t\t\t\t<nodeId>" + (input.source[0] || "") + "</nodeId>\n");
							tabOutput.push(tabulacja + "\t\t\t\t\t\t<outputId>" + (input.source[1] || "") + "</outputId>\n");
							tabOutput.push(tabulacja + "\t\t\t\t\t</source>\n");
							tabOutput.push(tabulacja + "\t\t\t\t</input>\n");
						});
						tabOutput.push(tabulacja + "\t\t\t</inputs>\n");
					} else {
						tabOutput.push(tabulacja + "\t\t\t<inputs/>\n");
					}
					if (functionalDescription.inputs && functionalDescription.outputs.length > 0) {
						tabOutput.push(tabulacja + "\t\t\t<outputs>\n");
						$.each(functionalDescription.outputs, function(key, output) {
							tabOutput.push(tabulacja + "\t\t\t\t<output>\n");
							tabOutput.push(tabulacja + "\t\t\t\t\t<class>" + (output.class || "") + "</class>\n");
							tabOutput.push(tabulacja + "\t\t\t\t\t<id>" + (output.id || "") + "</id>\n");
							tabOutput.push(tabulacja + "\t\t\t\t\t<label>" + (output.label || "") + "</label>\n");
							tabOutput.push(tabulacja + "\t\t\t\t\t<dataType>" + (output.dataType || "") + "</dataType>\n");
							tabOutput.push(tabulacja + "\t\t\t\t\t<properties>" + (output.properties || "") + "</properties>\n");
							tabOutput.push(tabulacja + "\t\t\t\t</output>\n");
						});
						tabOutput.push(tabulacja + "\t\t\t</outputs>\n");
					} else {
						tabOutput.push(tabulacja + "\t\t\t<outputs/>\n");
					}
					tabOutput.push(tabulacja + "\t\t\t<preconditions>" + (functionalDescription.preconditions || "") + "</preconditions>\n");
					tabOutput.push(tabulacja + "\t\t\t<effects>" + (functionalDescription.effects || "") + "</effects>\n");
					tabOutput.push(tabulacja + "\t\t</functionalDescription>\n");
				}
				if (node.nonFunctionalDescription) {
					nonFunctionalDescription = node.nonFunctionalDescription
					if (nonFunctionalDescription && nonFunctionalDescription.length > 0) {
						tabOutput.push(tabulacja + "\t\t<nonFunctionalDescription>\n");
						$.each(nonFunctionalDescription, function(key, nonFunctionalProperty) {
							tabOutput.push(tabulacja + "\t\t\t<nonFunctionalProperty>\n");
							tabOutput.push(tabulacja + "\t\t\t\t<weight>" + (nonFunctionalProperty.weight || "") + "</weight>\n");
							tabOutput.push(tabulacja + "\t\t\t\t<name>" + (nonFunctionalProperty.name || "") + "</name>\n");
							tabOutput.push(tabulacja + "\t\t\t\t<relation>" + (nonFunctionalProperty.relation || "") + "</relation>\n");
							tabOutput.push(tabulacja + "\t\t\t\t<unit>" + (nonFunctionalProperty.unit || "") + "</unit>\n");
							tabOutput.push(tabulacja + "\t\t\t\t<value>" + (nonFunctionalProperty.value || "") + "</value>\n");
							tabOutput.push(tabulacja + "\t\t\t</nonFunctionalProperty>\n");
						});
						tabOutput.push(tabulacja + "\t\t</nonFunctionalDescription>\n");
					} else {
						tabOutput.push(tabulacja + "\t\t<nonFunctionalDescription/>\n");
					}
				}
				tabOutput.push(tabulacja + "\t\t<alternatives>" + (node.alternatives || "") + "</alternatives>\n");

				if (node.subgraph && node.subgraph.nodes) {
					tabOutput.push(tabulacja + "\t\t<subGraph>\n");
					parseGraph(node.subgraph, tabulacja + "\t\t\t");
					tabOutput.push(tabulacja + "\t\t</subGraph>\n");
				} else tabOutput.push(tabulacja + "\t\t<subGraph>" + (false || "") + "</subGraph>\n");

				tabOutput.push(tabulacja + "\t\t<controlType>" + (false || "") + "</controlType>\n");
				tabOutput.push(tabulacja + "\t\t<condition>" + (node.condition || "") + "</condition>\n");
				if (node.sources) {
					tabOutput.push(tabulacja + "\t\t<sources>\n");
					$.each(node.sources, function(key, source) {
						tabOutput.push(tabulacja + "\t\t\t<source>" + source + "</source>\n");
					});
					tabOutput.push(tabulacja + "\t\t</sources>\n");
				}
				tabOutput.push(tabulacja + "\t</node>\n");
			}

			var tabOutput = [],
				physicalDescription, functionalDescription, nonFunctionalDescription, i = 0;;
			// console.log(jsonFormatter(json, true))
			tabOutput.push("<graph xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">\n");
			parseGraph(json, "\t");
			tabOutput.push("</graph>");

			var stringXML = tabOutput.join("");

			if (!humanFriendly) {
				stringXML = stringXML.replace(/\t/g, "").replace(/\n/g, "");
				// alert(humanFriendly)
			}

			return stringXML;
		},
		convert: function convert(ssdl, id) { // converst ssdl into json
			//alert("convert"+":"+ssdl);
			var Graph = {};
			Graph.id = id ? id : "root";
			Graph.nodes = [];

			$(ssdl).find("nodes node:first, nodes node:first ~ node").each(function() {
				var _this = $(this);
				var node = {};
				node.nodeId = _this.find("nodeId:first").text();
				node.nodeType = _this.find("nodeType:first").text();
				node.nodeLabel = _this.find("nodeLabel:first").text();
				node.physicalDescription = {};
				node.physicalDescription.serviceName = _this.find("serviceName:first").text();
				node.physicalDescription.serviceGlobalId = _this.find("serviceGlobalId:first").text();
				node.physicalDescription.address = _this.find("address:first").text();
				node.physicalDescription.operation = _this.find("operation:first").text();

				node.functionalDescription = {};
				node.functionalDescription.description = _this.find("functionalDescription description:first").text();
				node.functionalDescription.serviceClasses = [];
				_this.find("functionalDescription serviceClasses:first serviceClass").each(function() {
					node.functionalDescription.serviceClasses.push($(this).text());
				});
				node.functionalDescription.metaKeywords = []
				_this.find("functionalDescription metaKeywords:first metaKeyword").each(function() {
					node.functionalDescription.metaKeywords.push($(this).text());
				});
				node.functionalDescription.inputs = [];
				var input, tmp1, tmp2;
				_this.find("functionalDescription inputs:first input").each(function() {
					input = {}
					input.class = $(this).find("class").text();
					input.id = $(this).find("id").text();
					input.label = $(this).find("label").text();
					input.dataType = $(this).find("dataType").text();
					input.properties = $(this).find("properties").text();
					input.source = [];

					tmp1 = $(this).find("nodeId").text();
					tmp2 = $(this).find("outputId").text();
					if (tmp1.length > 0 && tmp1.length > 0) {
						input.source.push(tmp1, tmp2);
					}
					node.functionalDescription.inputs.push(input);
				});
				node.functionalDescription.outputs = [];
				var output;
				_this.find("functionalDescription outputs:first output").each(function() {
					output = {}
					output.class = $(this).find("class").text();
					output.id = $(this).find("id").text();
					output.label = $(this).find("label").text();
					output.dataType = $(this).find("dataType").text();
					output.properties = $(this).find("properties").text();

					node.functionalDescription.outputs.push(output);
				});
				node.functionalDescription.preconditions = _this.find("functionalDescription preconditions:first").text();
				node.functionalDescription.effects = _this.find("functionalDescription effects:first").text();
				node.nonFunctionalDescription = [];
				var nonFunctionalProperty;
				_this.find("nonFunctionalDescription:first nonFunctionalProperty").each(function() {
					nonFunctionalProperty = {};
					nonFunctionalProperty.weight = parseInt($(this).find("weight").text(), 10);
					nonFunctionalProperty.name = $(this).find("name").text();
					nonFunctionalProperty.relation = $(this).find("relation").text();
					nonFunctionalProperty.unit = $(this).find("unit").text();
					nonFunctionalProperty.value = $(this).find("value").text();

					node.nonFunctionalDescription.push(nonFunctionalProperty);
				});

				node.alternatives = _this.find("alternatives:first").text();

				node.subgraph = {};

				if (_this.find("subGraph:first nodes").length > 0) {
					var tmp = _this.find("subGraph:first");
					node.subgraph = {};
					var t = convert(tmp[0], node.nodeId);
					node.subgraph.nodes = t.nodes;
					node.subgraph.inputVariables = t.inputVariables;
					node.subgraph.nonFunctionalParameters = t.nonFunctionalParameters;
					node.subgraph.parameters = _this.find("subGraph parameters:last").text();
					node.subgraph.exceptions = _this.find("subGraph excptions:last").text();
				}
				node.controlType = _this.find("controlType:last").text();
				node.condition = _this.find("condition:last").text();
				node.sources = [];
				_this.find("sources:last source").each(function() {
					var txt = $(this).text();
					if (txt.length > 0 && node.nodeId) {
						node.sources.push(txt);
					}
				});

				Graph.nodes.push(node);
			});
			$(ssdl).find("nodes node:first, nodes node:first ~ node").remove();

			var inputVariables = [],
				inputVariable;
			$(ssdl).find("inputVariables:first inputVariable").each(function() {
				inputVariable = {};
				inputVariable.name = $(this).find("name:first").text();
				inputVariable.value = $(this).find("value:first").text();
				inputVariable.type = $(this).find("type:first").text();

				inputVariables.push(inputVariable);
			});
			$(ssdl).find("inputVariables:first inputVariable").remove();
			Graph.inputVariables = inputVariables;

			var nonFunctionalParameters = [],
				nonFunctionalProperty;
			$(ssdl).find("nonFunctionalParameters:first nonFunctionalProperty").each(function() {
				nonFunctionalProperty = {};
				nonFunctionalProperty.weight = parseInt($(this).find("weight:first").text(), 10);
				nonFunctionalProperty.unit = $(this).find("unit:first").text();
				nonFunctionalProperty.value = $(this).find("value:first").text();
				nonFunctionalProperty.relation = $(this).find("relation:first").text();
				nonFunctionalProperty.name = $(this).find("name:first").text();

				nonFunctionalParameters.push(nonFunctionalProperty);
			});
			$(ssdl).find("nonFunctionalParameters:first nonFunctionalProperty").remove();
			Graph.nonFunctionalParameters = nonFunctionalParameters;

			// console.log(Graph)
			return Graph;
		},
		getRoot: function getRoot() {
			var result;
			for (var i = this.graphData_tab.length - 1, j = -1; i > j; i--) {
				if (this.graphData_tab[i].isRoot) {
					result = this.graphData_tab[i];
					break;
				}
			}

			return result;
		},
		saveSSDL: function saveSSDL(humanFriendly) {
			var root = this.getRoot();
			var xml = this.convertJSON2XML(root, humanFriendly);

			return xml;
		}
	}

	$('html').click(function() {
		selectednode = selectednode || false;
		if (!selectednode) controlerObject.reactOnEvent("ESCAPE");
	});
	controlerObject.reactOnEvent("START");

	return controlerObject;
}
//Koniec pliku controler.js
