function get_xml_from_ssdl_json(){
	//TODO
}

function get_ssdl_json(ssdl, id){
	var Graph = {};
	Graph.id = id ? id : root;
	Graph.nodes = [];
	var this_function = arguments.callee;
	
	(id ? ssdl.find("nodes node:first, nodes node:first ~ node") : $(ssdl).find("nodes node:first, nodes node:first ~ node")).each(function(){
		var _this = $(this);
		var node = {};
		node.nodeId = _this.find("nodeId:first").text();
		node.nodeType = _this.find("nodeType:first").text();
		
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
		
		if(_this.find("subGraph:first nodes").length > 0 && true){
			var tmp = _this.find("subGraph:first");			
			node.subgraph = {};
			var t = this_function(tmp, node.nodeId);			
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
			txt = $(this).text();
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
			
	return Graph;
}