"use strict";

var relationTab = ["eq", "lt", "gt", "ge", "le"]; // czy te relacje sa poprawne?
var controlTypeTab = ["#start", "#end"]; // co tutaj wiecej może być ?


// =========================================// =========================================// =========================================
// ======================================================= tested AND approved =====================================================
// =========================================// =========================================// =========================================
function isService(nodeType){
	var acceptedTypes = ["service", "javaservice", "streamingworkflowengine"]
	return typeof nodeType == "string" && !!~acceptedTypes.indexOf(nodeType);
}
function validateControlNode(node, extend){
	// controlType exists i zawiera się w skończonym, zbiorze controlTypeTab
	//

	// jeśli #Start, to: 
	// 		nie ma inputów
	// 		sources undefined, albo [].length == 0
	// jeśli #End, to:
	// 		nie ma outputów

	var err = 0;

	if( getType(extend) != "object" ){
		extend = {};
	}

	if(node){
		// controlType
		if( validateAttr(node.controlType, "string", "") ){
			extend.controlType = {
				present: false,
				acceptableValue: false				
			};
			err += 2;
		}
		else if( validateAttr(node.controlType, "string", "", controlTypeTab, true) ) {
			extend.controlType = {
				present: true,
				acceptableValue: false				
			};
			err++;
		}

		//sources and inputs
		var funDesc = node.functionalDescription;
		if(node.controlType == "#start"){
			if( getType(node.sources) == "array" && node.sources.length > 0 ){
				extend.sources = {
					present : true,
					existenceAccepted: false
				}
				err++;
			}
			if(getType(funDesc) == "object" && getType(funDesc.inputs) == "array" && funDesc.inputs.length > 0){
				if( getType(extend.functionalDescription) != "object" )
					extend.functionalDescription = {};
				extend.functionalDescription.inputs = {
					present : true,
					existenceAccepted: false
				}
				err++;
			}
		} else if(node.controlType == "#end"){
			if( getType(funDesc) == "object" && getType(funDesc.outputs) == "array" && funDesc.outputs.length > 0 ){
				if( getType(extend.functionalDescription) != "object" )
					extend.functionalDescription = {};

				extend.functionalDescription.outputs = {
					present : true,
					existenceAccepted: false
				}
				err++;
			}
		}
	}

	//		// hasNoOutputs: initialValue,
	// 		// acceptableInputs: initialValue
	// 		// hasNoSources: initialValue,
	// 		// acceptableId: initialValue,
	// 		// hasNoInputs: initialValue,
	// 		// acceptableOutputs: initialValue

	return {
		numberOfErrors: err,
		validationObject: extend
	}
};
	// testy validateControlNode
		// var ctrlNode = {
		// 	controlType: "#end",
		// 	sources: [""],
		// 	functionalDescription: {
		// 		outputs : [
		// 			{}
		// 		]
		// 	}
		// }

		// console.clear();
		// var out1 = validateControlNode(ctrlNode, {test: "testuję działanie 'extend'"});
		// var out1 = validateControlNode(ctrlNode);
		// console.log("===================================================");
		// jsonFormatter(out1, true, true);
		// jsonFormatter(ctrlNode, true, true);
	// koniec testów validateControlNode
function validateInputVariables(inpVars){
	var outputTab = [],
		err = 0,
		validationInpVar,
		present = true,
		acceptableTypes = ["string", "double"]; // jakieś jeszcze ?
	;
	if( getType( inpVars ) != "array"){
		err++;
		present: false;
	} else {
		$.each(inpVars, function(key, inpVar){
			if( getType(inpVar) != "object" || isEmpty(inpVar) ){
				validationInpVar = getBlankValidationInputVariable(false);
				err += 3;
			} else {
				validationInpVar = getBlankValidationInputVariable();

				// name
				if( validateAttr(inpVar.name, "string", "" ) ){
					validationInpVar.name.present = false;
					validationInpVar.name.unique = false;
				} else {
					$.each(inpVars, function(i, val){
						if( i < key && val.name.toLowerCase() === inpVar.name.toLowerCase() ){
							// console.log(key, inpVar, i, val)
							validationInpVar.name.unique = false;
							outputTab[i].name.unique = false;

							err += 2;
							return false;
						}
					});
				}
				// type
				if( validateAttr(inpVar.type, "string", "" ) ){
					validationInpVar.type.present = false;
					validationInpVar.type.acceptableValue = false;
					err += 2;
				} else if ( validateAttr(inpVar.type.toUpperCase(), "string", acceptableTypes, true) ){
					validationInpVar.type.acceptableValue = false;
					err++;					
				}
				// value
				if( validateAttr(inpVar.value, "string", "" ) ){
					validationInpVar.value.present = false;
					validationInpVar.value.acceptableValue = false;
					err += 2;
				} else if ( false ){		 // !!!!!!!!!!!!!!!!		
				}
			}

			outputTab.push( validationInpVar );
		});
	}

	return {
		present: present,
		numberOfErrors : err,
		validationObject : outputTab
	}
};
	// // testy validationInputVariables
		// 	var inpVars = [
		// 		{
		// 			name : "Jan",
		// 			value : "a",
		// 			type : "string"
		// 		},
		// 		{
		// 			name : "jan",
		// 			value : "a",
		// 			type : ""
		// 		},
		// 		{
		// 			name : "Grzegorz",
		// 			value : "a",
		// 			type : ""
		// 		}
		// 	];
		// 	console.clear();
		// 	var out1 = validateInputVariables(inpVars);
		// 	console.log("===================================================");
		// 	jsonFormatter(inpVars, true, true);
		// 	jsonFormatter(out1, true, true);
		// 	for(var i in inpVars){
		// 		console.log( validateAttr(inpVars[i].name, "string", "") );
		// 		console.log( validateAttr(inpVars[i].value, "string", "") );
		// 		console.log( validateAttr(inpVars[i].type, "string", "") );
		// 		console.log("===================================================");
		// 	}
	// koniec testów validationInputVariables

function validatePhysicalDescription(physicalDescription){
	var validationPhysicalDescription = {},
		err = 0
	;
	// czy operation przyjmuje wartości z ograniczonego zbioru ??
	if( getType(physicalDescription) != "object" || isEmpty(physicalDescription) ){
		validationPhysicalDescription = getBlankValidationPhysicalDescription(false);
		err = 4;
	}
	else {
		validationPhysicalDescription = getBlankValidationPhysicalDescription();

		if( validateAttr(physicalDescription.serviceName, "string", "") ){
			validationPhysicalDescription.serviceName.present = false;
			err++;
		}
		if( validateAttr(physicalDescription.serviceGlobalId, "string", "") ){
			validationPhysicalDescription.serviceGlobalId.present = false;
			err++;
		}
		if( validateAttr(physicalDescription.address, "string", "") ){
			validationPhysicalDescription.address.present = false;
			err++;
		}
		if( validateAttr(physicalDescription.operation, "string", "") ){
			validationPhysicalDescription.operation.present = false;
			err++;
		}
	}

	return {
		numberOfErrors : err,
		validationObject : validationPhysicalDescription
	};
};
	// testy validationPhysicalDescription
	// var PhDesc = {
	// 	serviceName: "a",
	// 	serviceGlobalId: "w",
	// 	address: "w",
	// 	operation: "q"
	// };

	// console.clear();
	// var out1 = validatePhysicalDescription(PhDesc);
	// console.log("===================================================");
	// jsonFormatter(PhDesc, true, true);
	// jsonFormatter(out1, true, true);
	// koniec testów validationPhysicalDescription

function validateNonFunctionalParameters(nonFunctionalParameters){
	// czy aby na pewno każdy typ musi mieć nonFunctionalDescription ?? control ??
	var unitsTab = ["$", "district", "zł", "pln"], // ???
		validationNonFunctionalProperty,
		weight,
		weightString,
		err = 0,
		outputTab = []
	;
	// co jeśli 
	if( getType(nonFunctionalParameters) == "array" ){
		$.each(nonFunctionalParameters, function(key, nonFunctionalProperty){
			if( getType(nonFunctionalProperty) != "object" || isEmpty(nonFunctionalProperty) ){
				validationNonFunctionalProperty = getBlankValidationNonFunctionalPproperty(false);
				err += 9;
			} else {
				validationNonFunctionalProperty = getBlankValidationNonFunctionalProperty();

				// weight
				weight = parseFloat(nonFunctionalProperty.weight)
				weightString = weight.toString();
				if(weightString == "NaN"){
					validationNonFunctionalProperty.weight.present = false;
					validationNonFunctionalProperty.weight.acceptableValue = false;
					err += 2;
				} else if(weightString == "Infinity"){
					nonFunctionalProperty.weight = 1e20;
				} else if( weight < 0 ){
					validationNonFunctionalProperty.weight.acceptableValue = false;
					err++;
				}
				//name
				if( validateAttr(nonFunctionalProperty.name, "string", "") ){
					validationNonFunctionalProperty.name.present = false;
					err++;
				}
				//relation
				// console.log(validateAttr(nonFunctionalProperty.relation, "string", relationTab, true))
				if( typeof nonFunctionalProperty.relation != "string" ){
					validationNonFunctionalProperty.relation.present = false;
					validationNonFunctionalProperty.relation.acceptableValue = false;
					err += 2;
				} else if( validateAttr(nonFunctionalProperty.relation, "string", relationTab, true)){
					validationNonFunctionalProperty.relation.acceptableValue = false;
					err++;
				}
				//unit
				if( validateAttr(nonFunctionalProperty.unit, "string", "")){
					validationNonFunctionalProperty.unit.present = false;
					validationNonFunctionalProperty.unit.acceptableValue = false;
					err += 2;
				} else if( validateAttr(nonFunctionalProperty.unit, "string", unitsTab, true) ){
					validationNonFunctionalProperty.unit.acceptableValue = false;
					err++;
				}
				// need more INFO HERE on how to test
				if( validateAttr(nonFunctionalProperty.value, "string", "") && typeof nonFunctionalProperty.value != "number" ){
					validationNonFunctionalProperty.value.present = false;
					validationNonFunctionalProperty.value.acceptableValue = false;
					err+= 2;
				}
			}

			outputTab.push(validationNonFunctionalProperty); 
		});
	}

	return {
		numberOfErrors: err,
		validationObject: outputTab
	};
};
	// testy validationPhysicalDescription
		// var nonFunDesc = [
		// 	{
		// 		weight : "1",
		// 		name : "location",
		// 		relation : "eq",
		// 		unit : "district",
		// 		value : "srodmiescie"
		// 	},
		// 	{
		// 		weight : "1",
		// 		name : "location",
		// 		relation : "eq",
		// 		unit : "district",
		// 		value : "srodmiescie"			
		// 	}
		// ];

		// console.clear();
		// var out1 = validateNonFunctionalParameters(nonFunDesc);
		// console.log("===================================================");
		// jsonFormatter(nonFunDesc, true, true);
		// jsonFormatter(out1, true, true);
	// koniec testów validationPhysicalDescription

// walidacja IO jako jedna funkcja bazuje na tym, że oba input i output mająpodobną struktórę różniącą się jedynie tym,
// że inputy mają dodatkowo source, które musi być walidowane "wyżej"
function validateIOTab(inputArray, isInput){
	var err = 0,
		validationObject,
		outputTab = [],
		validationObjectGetter,
		present = true
	;

	if( !isInput || typeof isInput == "string" && !!~isInput.indexOf("out") ){
		validationObjectGetter = getBlankValidationOutput;
		isInput = false;
	} else {
		validationObjectGetter = getBlankValidationInput;
		isInput = true;
	}

	if( getType(inputArray) != "array" || inputArray.length == 0 ){
		present = false;
	}
	else {
		$.each(inputArray, function(key, io){
			if( getType(io) != "object" || isEmpty(io) ){
				validationObject = validationObjectGetter(false);
				err += 5;
			} else {
				validationObject = validationObjectGetter();
				// class -> ontologia ??
				if( validateAttr(io.class, "string", "") ){
					validationObject.class.present = false;
					err++;
				}
				// id // present, unique
				if( validateAttr(io.id, "string", "") ){
					validationObject.id.present = false;
					validationObject.id.unique = false;
					err++;
				} else {
					$.each(inputArray, function(i, val){
						if( i < key && typeof val.id == "string" && val.id.toLowerCase() == io.id.toLowerCase() ){
							validationObject.id.unique = false;
							outputTab[i].id.unique = false;
							err++;
						}
					});
				}
				// label bez walidacji
				// properties na razie bez walidacji. Nie wiem jak je walidować
				// dataType
				// jak walidować dataType ??
				if( validateAttr(io.dataType, "string", "") ){
					validationObject.dataType.present = false;
					validationObject.dataType.acceptableValue = false;

					err += 2;
				} else {
					// ...
				}
				// sources
				// poprawność wartości w sources są walidowane na wysokości grafu
				if(isInput){
					if( getType( io.source ) != "array" || io.source.length != 2) {
						validationObject.source.present = false;
						validationObject.source.existenceAccepted = false;
						validationObject.source.acceptableTypesOfValues = false;
						err += 3;
					} else {

						if ( typeof io.source[0] != "string" || typeof io.source[0] != "string" ){
							validationObject.source.acceptableTypesOfValues = false;
							err++;
						}
						if( validateAttr(io.source[0], "string", "") ){
							validationObject.source.nodeId.present = false;
							validationObject.source.nodeId.acceptableValue = false;
							err += 2;
						}
						if( validateAttr(io.source[1], "string", "") ){
							validationObject.source.outputId.present = false;
							validationObject.source.outputId.acceptableValue = false;
							err += 2;
						}
					}
				}

			}

			outputTab.push(validationObject);
		});
	}

	return {
		numberOfErrors: err,
		validationObject: {
			present : present,
			content: outputTab
		}
	}
};
function validateFunctionalDescription(functionalDescription){
	var validationFunctionalDescription,
		acceptableTypesTab = [
			"string",
			"undefined",
			"null"
		],
		err = 0,
		tmpBoolValue
	;

	if( getType(functionalDescription) != "object" || isEmpty(functionalDescription)){
		validationFunctionalDescription = getBlankValidationFunctionalDescription(false);
		err = 7;
	}
	else {
		validationFunctionalDescription = getBlankValidationFunctionalDescription();
		// description
		if( !~acceptableTypesTab.indexOf( getType(functionalDescription.description)) ){
			validationFunctionalDescription.description.acceptableType = false;
			err++;
		}
		//serviceClasses
		if( getType(functionalDescription.serviceClasses) != "array" ){
			validationFunctionalDescription.serviceClasses.acceptableType = false;
			validationFunctionalDescription.serviceClasses.acceptableTypesOfValues = false;
			err += 2;
		} else {
			tmpBoolValue = functionalDescription.serviceClasses.some(function(elem){
				return typeof elem != "string";
			});

			if ( tmpBoolValue ){
				validationFunctionalDescription.serviceClasses.acceptableTypesOfValues = false;
				err++;
			}
		}
		//metaKeywords
		if( getType(functionalDescription.metaKeywords) != "array" ){
			validationFunctionalDescription.metaKeywords.acceptableType = false;
			validationFunctionalDescription.metaKeywords.acceptableTypesOfValues = false;
			err += 2;
		}
		else {
			tmpBoolValue = functionalDescription.metaKeywords.some(function(elem){
				return typeof elem != "string";
			});
			if ( tmpBoolValue ){
				validationFunctionalDescription.metaKeywords.acceptableTypesOfValues = false;
				err++;
			}
		}
		// inputs
		var validationInputs = validateIOTab(functionalDescription.inputs, "inputs");
		validationFunctionalDescription.inputs = validationInputs.validationObject;
		err += validationInputs.numberOfErrors;
		// outputs
		var validationOutputs = validateIOTab(functionalDescription.outputs, "outputs");
		validationFunctionalDescription.outputs = validationOutputs.validationObject;
		err += validationOutputs.numberOfErrors;

		// preconditions : (an empty string),
		// effects : (an empty string)
	}

	return {
		numberOfErrors : err,
		validationObject : validationFunctionalDescription
	};
};
	// testy validationFunctionalDescription i validateIOTab
		// var funDesc = {
		// 	description : function(){},
		// 	serviceClasses : [7, 8],
		// 	metaKeywords : [3],
		// 	inputs : [
		// 			{
		// 					class : "Video",
		// 					id : "InputVideo",
		// 					label : "InputVideo",
		// 					dataType : "VideoData",
		// 					properties : "",
		// 					source : [
		// 							"CCTVSendStart",
		// 							"OutputVideo"
		// 					]
		// 			},
		// 			{
		// 					class : "Video",
		// 					id : "InputVideo",
		// 					label : "InputVideo",
		// 					dataType : "VideoData",
		// 					properties : "",
		// 					source : [
		// 							"CCTVSendStart",
		// 							"OutputVideo"
		// 					]
		// 			}
		// 	],
		// 	outputs : [
		// 		{
		// 			class : "Video",
		// 			id : "InputVideo",
		// 			label : "InputVideo",
		// 			dataType : "VideoData",
		// 		},
		// 		{
		// 			class : "Video",
		// 			id : "InputVideo",
		// 			label : "InputVideo",
		// 			dataType : "VideoData",

		// 		}
		// 	],
		// 	preconditions : "",
		// 	effects : ""
		// };

		// console.clear();
		// var out1 = validateFunctionalDescription(funDesc);
		// console.log("===================================================");
		// jsonFormatter(out1, true, true);
		// jsonFormatter(funDesc, true, true);
	// koniec testów validationFunctionalDescription