// ocb z exeptions i parameters w graphie ???
"use strict";
//url to adres do pliku albo repozytorium, które wysy³a listê dostêpnych us³ug.

function Controller(url, saveUrl, graphToEditUrl, graphToEditName, gui) {
	var pf = gui.id_postfix;
	var selectednode = false;

	var controllerObject = {
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

			// this.shortcut.add("ctrl + X", function() {
			// 	alert("")
			// });
			this.shortcut.add("ctrl+shift+z", function() {
				alert("")
			});

			this.shortcut.add("ctrl + s", function(event) {
				alert(event);
			});

			// setTimeout((function() {
			// 	this.shortcut.remove("ctrl+x")
			// }).bind(this), 2000);
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
						// var validation = validatorObject.validateGraph(that.getRoot());
						// jsonFormatter(validation,1,1)

						// e = e || {};
						// e.name = 1;
						// e.description = 1;
						if (that.current_graphData.nodes.length < 3) {
							alert(language[gui.language].alerts.emptyGraph)
						} else if (!(e && e.name && e.description) && !graphToEditUrl) {
							gui.view.form.editGraphSaveParams();
						} else {
							var confirmation = (validation && validation.numberOfErrors && (validation.numberOfErrors < 1))
							if (!confirmation) 
								confirmation = confirm(language[gui.language].alerts.graphNotPassedValidation); 

							if (confirmation) {
								var output = !graphToEditUrl ? "name=" + e.name + "&description=" + e.description + "&" : "";
								output += "ssdl=" + savedSSDL;

								console.log(output);
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
									// console.log(that.current_graphData.nodes);
									return false;
								}
							});
							gui.view.updateNode(e);

							// jsonFormatter(e,1,1)
							if( e.nodeType && e.nodeType.toLowerCase() == "emulationservice" ){
								gui.controller.reactOnEvent("AskDamianForId", {
									onsuccess : (function(xml){
										var nodeId = e.nodeId;
										var node = this.getNodeById(nodeId);
										var id = $(xml).find("id").text();

										if(id){
											node.physicalDescription.address += ("&id=" + id);
											alert(node.physicalDescription.address)
											node.emulation.id = id;
										} else {
											alert(langAlerts.idnewemuservice);
										}

									}).bind(that),
									onerror : function(){
										alert(langAlerts.idnewemuservice); //to samo co wyżej
									}
								});
							}

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
									var len = gui.controller.current_graphData.nodes.length;
									for (var j = 0; j < len; j++) {
										if (gui.controller.current_graphData.nodes[j].nodeId == tId) {
											var index = gui.controller.current_graphData.nodes[j].sources.indexOf(sId);
											gui.controller.current_graphData.nodes[j].sources.splice(index, 1);
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
								$.each(gui.controller.current_graphData.nodes, function(i, v) {
									if (v.nodeId == e.id) {
										gui.controller.current_graphData.nodes.splice(i, 1);
										gui.view.current_graph_view.nodes.splice(i, 1);
										return false;
									}
								});
								$.each(gui.controller.current_graphData.nodes, function(i, v) {
									if ((index = v.sources.indexOf(e.id)) != -1) {
										gui.controller.current_graphData.nodes[i].sources.splice(index, 1);
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
						gui.controller.current_graphData.nodes = [];
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
						var target = gui.controller.getNodeById(e.target.id);
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
						var input = gui.controller.getInputById(e.targetId, e.input.id);
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
						e = $.extend(true, {}, e);
						e.nodeId = gui.controller.generateId();
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

							// console.log(this.graphData_tab)
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
			graph = graph || gui.controller.current_graphData;
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

			if (gui.controller.current_graphData.nodes) {
				$.each(gui.controller.current_graphData.nodes, function() {
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

			if (gui.controller.current_graphData.nodes) {
				$.each(gui.controller.current_graphData.nodes, function() {
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

				node.nodeId = node.nodeLabel = $physicalDescription.find("ns2\\:serviceName").text();
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
					tabOutput.push(tabulacja + "\t\t\t<address>" + (physicalDescription.address || ""));
					// if(node.emulate && node.emulate.id)
					// 	tabOutput.push( "&id="+node.emulate.id);
					tabOutput.push( "</address>\n");
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
		convert: function convert(ssdl, id, version) { // converst ssdl into json
			//alert("convert"+":"+ssdl);
			var Graph = {};
			version = version || $(ssdl).find("graph").attr("version");
			Graph.id = id ? id : "root";
			Graph.nodes = [];

			$(ssdl).find("nodes:first > node").each(function() {
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

				// var 

				node.sources = [];
				_this.find("sources:last source").each(function() {
					var txt = $(this).text();
					if (txt.length > 0 && node.nodeId) {
						node.sources.push(txt);
					}
				});

				node.targets = [];
				_this.find("targets:last target").each(function() {
					var txt = $(this).text();
					if (txt && node.nodeId) {
						node.targets.push(txt);
					}
				});

				Graph.nodes.push(node);
			});
			$(ssdl).find("nodes:first > node").remove();

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
		if (!selectednode) controllerObject.reactOnEvent("ESCAPE");
	});
	controllerObject.reactOnEvent("START");

	return controllerObject;
}