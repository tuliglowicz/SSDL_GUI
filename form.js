
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
				var inputs = this.funcDescJSON.inputs,
					outputs = this.funcDescJSON.outputs,
					nonFunctionalDescription = this.resultJSON.nonFunctionalDescription,
					serviceClasses = this.funcDescJSON.serviceClasses,
					tmp
				;
				tmp = [];
				for(var i in inputs){
					if( inputs[ i ] )
						tmp.push(inputs[ i ]);
				}
				this.funcDescJSON.inputs = tmp;

				tmp = [];
				for(var i in outputs){
					if( outputs[ i ] )
						tmp.push(outputs[ i ]);
				}
				this.funcDescJSON.outputs = tmp;

				tmp = [];
				for(var i in nonFunctionalDescription){
					if( nonFunctionalDescription[ i ] ) 
						tmp.push( nonFunctionalDescription[ i ] );
				}
				this.resultJSON.nonFunctionalDescription = tmp;

				tmp = [];
				for(var i in serviceClasses){
					if( serviceClasses[ i ] ) 
						tmp.push( serviceClasses[ i ] );
				}
				this.funcDescJSON.serviceClasses = tmp;
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
				if(!this.physDescJSON.address){
					this.physDescJSON.address = "http://192.168.2.145:8383/Dummy/EmulateService?wsdl&name="+this.resultJSON.nodeLabel;
				}
				this.physDescJSON.operation = $( "#f_physicalDescriptionTab_operation_" + pf ).val();
				this.resultJSON.physicalDescription = this.physDescJSON;
					
				this.funcDescJSON.description = $( "#f_mainTab_description_" + pf ).val();
				this.removeUndefinedElements();
				// this.funcDescJSON.preconditions = $( "#f_inputOutputTab_preconditions" ).val();
				// this.funcDescJSON.effects = $( "#f_inputOutputTab_effects" ).val();
				this.resultJSON.functionalDescription = this.funcDescJSON;

				this.emulationJSON.id = $("#f_emulationTab_id_" + pf).val();
				this.emulationJSON.name = this.resultJSON.nodeLabel;
				this.emulationJSON.vectors = $("#f_emulationTab_vectors_" + pf).val();
				this.resultJSON.emulation = this.emulationJSON;
				// this.emulationJSON.name = $("#f_emulationTab_name_" + pf).val();
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
				//umyślnie close -> uploader -> open bo kiedy modalne jest open to uploader się nie otwiera.
				result.closeForm();
				$("#uploader_"+pf).click();
				result.openForm();

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
				$("#f_dialog_emulationService_" + pf).dialog('close');
				var label = prompt(langAlerts.addLabelNewNode, "");
				if(label)
					gui.controler.reactOnEvent("AddBlankNode", {
						nodeLabel : label,
						nodeType : "EmulationService",
						physicalDescription : {
							address : "http://192.168.2.145:8383/Dummy/EmulateService?wsdl&name="+label
						},
						emulation : {
							name : label
						}
					});
			}
		);
		$("#f_button_importEmulationService_" + pf).button().click(
			function(event) {
				// alert("IMPORTOWANIE USŁUGI EMULACYYJNEJ Z PLIKU JESZCZE NIEZAIMPLEENTOWANE.");
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