
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
		* - info(information string [, title string])
		* - warning(warning string [, title string])
		* - error(error string [, title string])
		*/
		console.log(paper);
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
			imgNames = ['info', 'warning', 'error'],
			menu;

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
						"fill-opacity": 0.75
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
				menu.close();
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
				if (animation) clearInterval(animation);
				alertbg.animate({"fill-opacity": 0});
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

		//context menu options
		menu = gui.view.contextMenu("console_" + pf, gui.view);
		menu.addOption(language[gui.language].logger.close, close);
		//object return
		return obj;
	};