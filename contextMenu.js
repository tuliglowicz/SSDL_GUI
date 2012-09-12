
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