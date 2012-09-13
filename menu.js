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
					functionOnClick();
				})

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
					functionOnClick();
				})

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