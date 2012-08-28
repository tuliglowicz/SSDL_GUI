// ocb z exeptions i parameters w graphie ???
// "use strict";
//url to adres do pliku albo repozytorium, które wysy³a listê dostêpnych us³ug.

function Controler(url, saveUrl, graphToEditUrl, graphToEditName, gui) {
	var pf = gui.id_postfix;
	var selectednode=false;
	function repoNodes(visualiser) {
		var resultObject = {
			currNodes: [],
			paper: undefined,
			data: undefined,
			require: "sdb_json_array div raphael_x_500".split(" "),
			init: function init() {
				if ($("#repoNodes_" + pf).length === 0) {
					var that, left, top;
					$("#right_plugins_" + pf).append("<div id='repoNodes_" + pf + "' class='plugin_" + pf + "'> </div>");
					this.paper = Raphael("repoNodes_" + pf, gui.view.columnParams.rightCol.width - 1, 500);
					this.scroller = addSideScroller(this.paper);
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
					}).toBack();
				}
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

				this.scroller.update(this.currNodes);

				return this;
			},
			clear: function clear() {
				if (this.paper) {
					this.paper.clear();
					this.currNodes.length = 0;
				}

				return this;
			}
		}

		return resultObject;
	}

	function initLogger(paper) {
		var h = paper.height,
			lId = "#console_" + pf,
			eId = "#console_entries_" + pf,
			bPath = 'M' + (paper.width - 170) + ' 0 Q' + (paper.width - 170) + ' 25 ' + (paper.width - 145) + ' 25 L' + (paper.width - 45) + ' 25 Q' + (paper.width - 20) + ' 25 ' + (paper.width - 20) + ' 0 Z',
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
			bGlow = null,
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
						"fill-opacity": 0.4
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
				if (bGlow) bGlow.remove();
				bGlow = buttonBG.glow().attr({
					fill: "#FFFF00"
				});
				//here adding to div and dTabs
				addMessage(text, 1);
			},
			error: function err(title, text) {
				text = text || "(an empty string)";
				if (title) text = "<b>" + title + "</b><br/>" + text;
				counter[2]++;
				redrawCounter(2);
				if (bGlow) bGlow.remove();
				bGlow = buttonBG.glow(10, true).attr({
					fill: "#FFFF00"
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
			}
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
		mask.mouseover(function() {
			if (bGlow) bGlow.remove();
			if (animation) clearInterval(animation);
			buttonBG.animate({
				"fill-opacity": 0.75
			}, 500);
			$(mask.node).css('cursor', 'pointer');
			bGlow = buttonBG.glow();
		});
		mask.mouseout(function() {
			$(mask.node).css('cursor', 'default');
			bGlow.remove();
		});

		//context menu
		var menu = gui.view.contextMenu("console_" + pf);
		menu.addOption(language[gui.language].logger.close, close);

		//object return
		return obj;
	}

	function deploy(ssdlJson, canvasW, nodeW, nodeH, nodeHSpacing, nodeVSpacing, startY) {
		/* 
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
		}
		//-PARSING-FUNCTIONS----------------->>>

		function node(id, sources) { //NODE OBJECT
			this.id = id;
			this.parents = [];
			this.children = [];
			this.sources = sources;
			this.level = -1;
			this.column = -1;
		}

		function getNodes(jsonNodes) { //building nodes list basing on JSon form of SSDL
			var nodes = [];
			var i = 0;
			$.each(jsonNodes, function() {
				nodes[i] = new node(this.nodeId, this.sources);
				i++;
			});
			return nodes;
		}

		function getNodeById(nodeArray, nId) { //searching nodes list for node with specific id
			var ret = null
			$.each(nodeArray, function() {
				if (this.id == nId) {
					ret = this;
					return false;
				}
			});
			return ret;
		}

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
		}

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
		}

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
		}
		//-AUXILIARY-FUNCTIONS--------------->>>

		function clone(tab) { //array shallow cloning function
			var result = [];
			$.each(tab, function(i, v) {
				result.push(v);
			});
			return result;
		}

		function cloneObj(obj) { //object deep cloning function
			var object = {};
			object.o = obj;

			// try  jQuery.extend(true, [], object);
			// roznica: {} -> [];
			var clone = jQuery.extend(true, {}, object);
			var result = clone.o;
			return result;
		}
		//-DEPLOYMENT-ALGORITHM-FUNCTIONS---->>>

		function individual(deploymentMatrix) { //INDIVIDUAL OBJECT
			this.deploymentMatrix = deploymentMatrix;
			this.rating = null;
		}

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
		}
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
		}

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
		}

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
		}
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
		}

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
		}

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
		}

		function hybridize(individual1, individual2) { //hybridization
			len = individual2.deploymentMatrix.length;
			rand1 = Math.floor((Math.random() * len));
			rand2 = Math.floor((Math.random() * len));
			for (var i = rand1; i < rand2; i++) {
				individual2.deploymentMatrix[i] = clone(individual1.deploymentMatrix[i]);
			}
		}

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
		}
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
	}

	function navigator() {
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

	function shortcut() {
		var memoryTab = [],
			validationTab = ["ctrl", "shift", "esc", "f1", "home", "alt", "backspace", "space", "enter", "home", "end"],
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
						var noErrors = true;
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
						gui.logger.error("shortcut.add", shortcut + " jest już używany");
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
						gui.logger.error("shortcut.remove", "skrót \"" + shortcut + "\" nie jest jeszcze zdefiniowany");
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
	// window.shortcut.add("ctrl+a", function(){alert("a")})
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
			this.navigator = navigator();
			this.navigator.init();
			this.shortcut = shortcut();

			this.shortcut.add("ctrl+a", (function() {
				this.reactOnEvent("selectAll")
			}).bind(this));
			this.shortcut.add("Esc", (function() {
				this.reactOnEvent("Escape")
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
		reactOnEvent: function reactOnEvent(evtType, evtObj) {
			//var events = ("DRAGGING SELECTION, SELECT, DESELECT, MOVE, RESIZE, SCROLL, DELETE, EDGE DETACH,"+" DELETE NODE, CREATE NODE, CREATE EDGE, GRAPH LOADED, GRAPH SAVED, GRAPH CHANGED").split(", ");			
			var that = this;

			console.log('Event: ', evtType, '  ->  ', evtObj); //ŻEBYŚMY WIEDZIELI WTF SI�? DZIEJE [NIE KASOWAĆ!!!]
			switch (evtType.toUpperCase()) {
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
					// 
					// 	$("#saveDialog").dialog("open");
					// } else {
					var savedSSDL = that.saveSSDL();
					var validation = validatorObject.validateGraph(that.getRoot());

					// e = e || {};
					// e.name = 1;
					// e.description = 1;
					if (that.current_graphData.nodes.length < 3) {
						alert("Cannot save empty graph!")
					} else if (!(e && e.name && e.description) && !graphToEditUrl) {
						// a("fghj")
						gui.view.form.editGraphSaveParams();
					} else {
						if (validation && validation.numberOfErrors && (validation.numberOfErrors < 1) || confirm("Validation not passed!\nAre you sure this graph is correct?\nclick OK if you're sure.")) {

							// var savedSSDL = that.saveSSDL();
							// console.log(savedSSDL)
							// savedSSDL = that.xmlToString(savedSSDL);
							var output = !graphToEditUrl ? "name=" + e.name + "&description=" + e.description + "&" : "";
							output += "ssdl=" + savedSSDL;


							console.log(output)
							that.save(saveUrl, output, "POST", "xml", function() {
								alert("Procedura zapisu przeszła poprawnie.")
							}, function() {
								alert("Procedura zapisu nie powiodła się.");
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
					// jsonFormatter(e, 1,1)
					if (!e.nodeId || e.nodeId === "") { //to jest blank
						var wrongsList = prepareFormMessages(validatorObject.validateNode(e));

						if (wrongsList.length == 0) {
							e.nodeId = that.generateId();
							var graphNode = gui.view.visualiser.visualiseNode(e, 100, 100); //x, y -> skąd?
							graphNode.switchToDFMode();
							gui.view.current_graph_view.nodes.push(graphNode);
							that.current_graphData.nodes.push(e);
							gui.view.form.closeForm();
						} else {
							gui.view.form.handleErrors(wrongsList);
						}
					} else { //to nie jest blank
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
						Deploying
					}
				})(evtObj);
				break;
			case "DELETEDNODE":
				(function(e) {
					var index;
						var e;
						gui.view.hideCurrentGraph();
						for(var q = gui.view.current_graph_view.nodes.length;q>0;q--){
							e = gui.view.current_graph_view.nodes[q-1];
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
						this.shortcut.add("delete", (function() {
							reactOnEvent("DELETEDNODE");
						}).bind(this));
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
					this.shortcut.remove("delete");
					gui.view.updateEdges();
					gui.view.menuList.getInstance().close();
					gui.view.deselectAll();
					gui.view.tooltip.close();
				})();
				break;
			case "ADDOUTPUT":
				(function(e) {
					var source = that.getNodeById(e.sourceId),
						input = e.input,
						outputTmp, output, newId;
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
							gui.view.updateNode(source);
							output = gui.view.getNodeById(e.sourceId).getOutputById(output.id);

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
						inputTmp, input, newId;
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

						gui.view.updateNode(target);

						input = gui.view.getNodeById(e.targetId).getInputById(input.id);

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
					selectednode=true;
					this.shortcut.add("delete", (function() {
						reactOnEvent("DELETEDNODE", e);
					}).bind(this));
				})(evtObj);
				break;
			case "EDGESELECTED":
				(function(e) {
					this.shortcut.add("delete", (function() {
						reactOnEvent("EDGEDELETED", e);
					}).bind(this));
				})(evtObj);
				break;
			case "EDGEDELETED":
				(function(e) {
					this.shortcut.remove("delete");
					switch(e.type){
						case 'DF':
							var len = gui.view.current_graph_view.edgesDF.length;
							for(var i = 0; i<len; i++){
								if(gui.view.current_graph_view.edgesDF[i]===e){
									gui.view.current_graph_view.edgesDF[i].remove();
									gui.view.current_graph_view.edgesDF.splice(i, 1);
									i = len;
								}
							}
							break;
						case 'CF':
							var sId = e.source.id;
							var tId = e.target.id;
							var len = gui.controler.current_graphData.nodes.length;
							for(var i = 0; i<len; i++){
								if(gui.controler.current_graphData.nodes[i].nodeId == tId){
									var index = gui.controler.current_graphData.nodes[i].sources.indexOf(sId);
									gui.controler.current_graphData.nodes[i].sources.splice(index, 1);
									i = len;
								}
							}
							len = gui.view.current_graph_view.edgesCF.length;
							for(var i = 0; i<len; i++){
								if(gui.view.current_graph_view.edgesCF[i]===e){
									gui.view.current_graph_view.edgesCF[i].remove();
									gui.view.current_graph_view.edgesCF.splice(i, 1);
									i = len;
								}
							}
							break;
					}
					e.remove();
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

						this.graphData_tab = tab;
						this.current_graphData = tab[tab.length - 1];

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
					gui.view.addBlankNode(e); //
				})(evtObj);
				break;
			}
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
			var num = this.current_graphData.nodes.length + this.idCounter,
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
				if (subgraph.nodes && subgraph.nodes.length > 0) {
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
