"use strict"; 
//url to adres do pliku albo repozytorium, które wysy³a listê dostêpnych us³ug.
function Controler(url, gui){
	var pf = gui.id_postfix;

	function subgraphTree(){
		var tmp = {
			name: "subgraphTree",
			version: "1.0",
			author: "Author",
			dataType: 'json',
			data: null,
			tree: null,
			parent: gui.controler,
			globalEvents: ["load"],
			localEvents: ["select"],
			require: "ssdl_JSON div jsTreePlugin".split(" "),
			draw: function draw(){
				var that = this;
				//raport(jstr(this.parent.data));
				if( $("#subgraphTree_"+pf).length === 0 )
						$("#left_plugins_"+pf).append("<div id='subgraphTree_"+pf+"' class='plugin_"+pf+"'> </div>");
				if(this.parent.data){
					this.data = this.convert(this.parent.graphData);
					
					this.tree = $("#subgraphTree_"+pf).jstree({
						"json_data" : {
							"data" : this.data
						},
						"ui" : {
							"select_limit" : 9
						},
						"themes" : {
							"theme" : "default",
							"dots" : true,
							"icons" : false
						},
						"plugins" : [ "themes", "json_data", "ui" ] //,  "contextmenu""crrm",
					}).delegate("a", "click", function (event, data) {
						alert("");
					});
				}
			},
			convert: function convert(json, id){
				var n = json.nodes;
				var output_json = {
					data: (id ? id : "root"), 
					attr: {id: (id ? "subgraphTree_"+pf+"_"+id : "subgraphTree_"+pf+"_root")},
					state : "open",
					children: []
				};
				$.each(n, function(){
					var currNode = {};
					currNode.data = this.nodeId;
					currNode.attr = { id: "subgraphTree_"+pf+"_"+this.nodeId};
					currNode.state = "open";
					currNode.children = [];
					if(this.subgraph.nodes && this.subgraph.nodes.length > 0){
						currNode.children = convert(this.subgraph).children;
						output_json.children.push(currNode);
					}		
				});
				
				return output_json;
			}	
		}
		tmp.draw();
		
		return tmp;
	}
	function repository(data){
		if(data.constructor != "[object XMLDocument]")
			return false;
		else {
			var tmp = {
				name: "repository",
				version: "1.0",
				author: "Author",
				dataType: 'xml',
				data: data,
				parent: gui.controler,
				paper: undefined,
				globalEvents: ["load"],
				require: "div canvas".split(" "),
				localEvents: ["select"],
				draw : function draw(){
					var html = [],
						name,
						url,
						that = this;
					
					if( $("#repository_"+pf).length === 0 ){
						$("#right_plugins_"+pf).append("<div id='repository_"+pf+"' class='plugin_"+pf+"'> </div>");
						//this.paper = Raphael("repository_"+pf, canvas_width, h);
					}

					$(data).find("list element").each(function(){
						name = $(this).find("name").text();
						url = $(this).find("url").text();
						html.push("<a href='"+url+"' class='repository_link_"+pf+"'>"+name+"</a><br/>");
					});
					
					$("#repository_"+pf).html(html.join(""));
					
					$(".repository_link_"+pf).click(function(){
						that.parent.loadSSDL(this.href);
						return false;
					});
				}
			}
			
			tmp.draw();
			
			$("a:first").click(); //od razu wczytanie pierwszego serwisu
			
			return tmp;
		}
	}
	var controlerObject = {
		plugins : [],
		graphData : {}, // element modelu, ale celowo zawarty w kontrolerze
		init: function init(){
			this.initPlugins();
		},
		load : function load(url, fun_success, dataType, fun_error){
			var that = this;
			var page = $.ajax({
				url: url,
				type: "GET",
				dataType : dataType || 'xml',
				success: fun_success || function(list){
					//to do 
				},
				error: fun_error || function(e){
					console.error("Error while downloading "+url);
				}
			});
		},
		loadSSDL : function loadSSDL(url){ 
			var that = this;
			this.load(url, function(ssdl){
				var ssdl_json = that.convert(ssdl);
				//raport(JSON.stringify(ssdl_json));
				if ( true ) //that.validate_ssdl(ssdl_json))
					that.graphData = ssdl_json;					
					gui.view.drawGraph(gui.controler.graphData);
					
				// alert(that.plugins)
				$.each(that.plugins, function(){
					this.draw();
				});
			});
		},
		initPlugins : function initPlugins(){
			var that = this,
				subGraph = subgraphTree(),
				repo
				;

			this.load(url, function fun_success(list){
				repo = repository(list, gui.view.columnParams.rightCol.width);
				that.plugins.push(repo);
			});
		},
		getNodeById : function getNodeById(id){
			var result;

			$.each(gui.controler.graphData.nodes, function(){
				if( this.nodeId === id ){
					result = this;
					return false;
				}
			});

			return result;
		},
		reactOnEvent : function reactOnEvent(evtType, evtObj){
			//var events = ("DRAGGING SELECTION, SELECT, DESELECT, MOVE, RESIZE, SCROLL, DELETE, EDGE DETACH,"+" DELETE NODE, CREATE NODE, CREATE EDGE, GRAPH LOADED, GRAPH SAVED, GRAPH CHANGED").split(", ");			
			switch(evtType.toUpperCase()){
				case "SELECT" : (function (e) {
					gui.view.selectNodesInsideRect(e.x1,e.y1,e.x2,e.y2,e.ctrl);
				})(evtObj); break;
				case "DESELECT" : (function () {
					gui.view.deselectAll();
				})(); break;
				case "ADDCFEDGE" : (function(e){
					var target = gui.controler.getNodeById(e.target.id);
					target.sources.push( e.source.id );
					gui.view.addCFEdge(e);
				})(evtObj); break;
				case "NODEMOVED" : (function(){
					gui.view.updateEdges();
				})(); break;
				case "SWITCHMODE" : (function(mode){
					gui.view.switchMode(mode);
				})(); break;
			}
		},
		convert : function convert(ssdl, id){ // converst ssdl into json
			//alert("convert"+":"+ssdl);
			var Graph = {};
			Graph.id = id ? id : "root";
			Graph.nodes = [];
			
			(id ? ssdl : $(ssdl)).
			find("nodes node:first, nodes node:first ~ node").
			each(function(){
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
					_this.find("functionalDescription serviceClasses:first serviceClass").each(function(){
						node.functionalDescription.serviceClasses.push($(this).text());
					});
				node.functionalDescription.metaKeywords = []
					_this.find("functionalDescription metaKeywords:first metaKeyword").each(function(){
						node.functionalDescription.metaKeywords.push($(this).text());
					});
				node.functionalDescription.inputs = [];
				var input;
				_this.find("functionalDescription inputs:first input").each(function(){
					input = {}
						input.class = $(this).find("class").text();
						input.id = $(this).find("id").text();
						input.label = $(this).find("label").text();
						input.dataType = $(this).find("dataType").text();
						input.properties = $(this).find("properties").text();
						input.source = [$(this).find("nodeId").text(), $(this).find("outputId").text()];
						
					node.functionalDescription.inputs.push(input);
				});
				node.functionalDescription.outputs = [];
				var output;
				_this.find("functionalDescription outputs:first output").each(function(){
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
				_this.find("nonFunctionalDescription:first nonFunctionalProperty").each(function(){
					nonFunctionalProperty = {};
					nonFunctionalProperty.weight = $(this).find("weight").text();
					nonFunctionalProperty.name = $(this).find("name").text();
					nonFunctionalProperty.relation = $(this).find("relation").text();
					nonFunctionalProperty.unit = $(this).find("unit").text();
					nonFunctionalProperty.value = $(this).find("value").text();
						
					node.nonFunctionalDescription.push(nonFunctionalProperty);
				});
				
				node.alternatives = _this.find("alternatives:first").text();
				
					node.subgraph = {};
				
				if(_this.find("subGraph:first nodes").length > 0){
					var tmp = _this.find("subGraph:first");			
					node.subgraph = {};
					var t = convert(tmp, node.nodeId);			
					node.subgraph.nodes = t.nodes;
					node.subgraph.inputVariables = t.inputVariables;
					node.subgraph.nonFunctionalParameters = t.nonFunctionalParameters;
					node.subgraph.parameters = _this.find("subGraph parameters:last").text();
					node.subgraph.exceptions = _this.find("subGraph excptions:last").text();			
				}
				node.controlType = _this.find("controlType:last").text();
				node.condition = _this.find("condition:last").text();
				node.sources = []
				_this.find("sources:last source").each(function(){
					var txt = $(this).text();
					if(txt.length > 0 && node.nodeId)
					{
						node.sources.push(txt);				
					}
				});
			
				Graph.nodes.push(node);
			});
			$(ssdl).find("nodes node:first, nodes node:first ~ node").remove();
			
			var inputVariables = [],
				inputVariable;
			$(ssdl).find("inputVariables:first inputVariable").each(function(){
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
			$(ssdl).find("nonFunctionalParameters:first nonFunctionalProperty").each(function(){
				nonFunctionalProperty = {};
				nonFunctionalProperty.weight = $(this).find("weight:first").text();
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
		}
	}	
	return controlerObject;
}