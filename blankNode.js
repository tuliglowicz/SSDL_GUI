	function blankNode(){
		var tmp = {
			name: "blankNode",
			version: "1.0",
			author: "Dorota Kawalec",
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
			conditionIterator : (function(){
				var counter = Math.floor(Math.random()*1e6);

				return {
					next : function(){
						return "condition_" + (++counter);
					}
				}
			})(),
			draw: function draw(){
				var nodeLength = 135,
					nodeHeight = 35,
					nodeHorizontalPosition = this.paper.width/2 - nodeLength/2, 
					textHorizontalPosition = this.paper.width/2,
					that = this;
				
				var onDblClick = function onDblClick(nodeType, controlType){
					return function(){
						if(gui.controller){
							if(nodeType==="EmulationService") {
								$("#f_dialog_emulationService_" + pf).dialog('open');
							}
							else if(controlType === "#conditionStart"){
								var conditionId = that.conditionIterator.next();
								gui.controller.reactOnEvent("AddBlankNode", {
									nodeLabel : "If",
									nodeType : nodeType,
									controlType : controlType,
									functionalDescription:{
										description : "",
										effects : "",
										preconditions : "",
										serviceClasses : [],
										metaKeywords : [],
										inputs : [
											{
												class: "dynamic",
												dataType: "dynamic",
												id: "number1",
												label: "number1",
												properties: "",
												source: []
											},
											{
												class: "dynamic",
												dataType: "dynamic",
												id: "number2",
												label: "number2",
												properties: "",
												source: []
											}
										],
										outputs : []
									},
									condition: {
										conditionId : conditionId,
										paths : "",
										type : "",
										if : {
											path : "",
											variable : "",
											relation : "",
											value : ""	
										},
										then : "",
										else : ""
									}
								});
								gui.controller.reactOnEvent("AddBlankNode", {
									nodeLabel : "EndIf",
									nodeType : nodeType,
									controlType : "#conditionEnd",
									functionalDescription:{
										description : "",
										effects : "",
										preconditions : "",
										serviceClasses : [],
										metaKeywords : [],
										inputs : [
											{
												class: "dynamic",
												dataType: "dynamic",
												id: "return1",
												label: "return1",
												properties: "",
												source: []
											},
											{
												class: "dynamic",
												dataType: "dynamic",
												id: "return2",
												label: "return2",
												properties: "",
												source: []
											}
										],
										outputs : [
											{
												class: "dynamic",
												dataType: "dynamic",
												id: "result",
												label: "result",
												properties: "",
											}
										]
									},
									condition: {
										conditionId : conditionId,
										paths : [],
										type : "",
										if : {
											path : "",
											variable : "",
											relation : "",
											value : ""	
										},
										then : "",
										else : ""
									}
								});
							}
							else {
								var label = prompt(language[gui.language].alerts.addLabelNewNode);
								if(label)
									gui.controller.reactOnEvent("AddBlankNode", {
										nodeLabel:label,
										nodeType:nodeType,
									});
							}
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

				var text_emulationService = this.paper.text(textHorizontalPosition,250,language[gui.language].nodes.if);
					text_emulationService.node.setAttribute("class","repository_text");
				this.dataSet.push(text_emulationService);
				var size = CFG.nodeDefaults.conditionSize;
				var repo_if = this.paper.path("M "+(nodeHorizontalPosition+65)+" 260 l "+size+" "+size+" l -"+size+" "+size+" l -"+size+" -"+size+" z")
					.attr({fill: CFG.colors.conditionStart})
					.dblclick(onDblClick("Control", "#conditionStart"));
				repo_if.node.setAttribute("class","repository_element");
				this.dataSet.push(repo_if);
			}
		};
		return tmp;
	};