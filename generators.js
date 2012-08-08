function getBlankValidationPhysicalDescription(initialValue) {
	initialValue = (typeof initialValue == "boolean" ? initialValue : true);

	var physicalDescription = {
		existenceAccepted: true,
		serviceName: {
			present: initialValue
		},
		serviceGlobalId: {
			present: initialValue
		},
		address: {
			present: initialValue
		},
		operation: {
			present: initialValue
		}
	};

	return physicalDescription;
};

function getBlankValidationInputVariable(initialValue) {
	initialValue = (typeof initialValue == "boolean" ? initialValue : true);

	var inputVariable = {
		present: initialValue,
		name: {
			present: initialValue,
			unique: initialValue
		},
		type: {
			present: initialValue,
			acceptableValue: initialValue
		},
		value: {
			present: initialValue,
			acceptableValue: initialValue
		}
	}

	return inputVariable;
};

function getBlankValidationNonFunctionalProperty(initialValue) {
	initialValue = (typeof initialValue == "boolean" ? initialValue : true);
	var nonFunctionalParameter = {
		present: initialValue,
		weight: {
			present: initialValue,
			acceptableValue: initialValue
		},
		name: {
			present: initialValue
		},
		relation: {
			present: initialValue,
			acceptableValue: initialValue
		},
		unit: {
			present: initialValue,
			acceptableValue: initialValue
		},
		value: {
			present: initialValue,
			acceptableValue: initialValue
		}
	}

	return nonFunctionalParameter;
};

function getBlankValidationNode(initialValue) {
	initialValue = (typeof initialValue == "boolean" ? initialValue : true);

	// domyślnie wszystko na true -> warunki są spełnione
	var node = {
		id: "",
		typeofNode: "" ,
		present: initialValue,
		nodeId: {
			present: initialValue,
			unique: initialValue,
			acceptableValue: initialValue
		},
		nodeLabel: {
			present: initialValue,
			acceptableValue: initialValue
		},
		nodeType: {
			present: initialValue,
			acceptableValue: initialValue
		},
		// alternavites : ???
		// condition : ???
		subgraph: {
			existenceAccepted: initialValue
		},
		//controlType is present only if nodeType is Control, otherwise we don't want it
		// later ckecking this field would be if(expected) -> present else { !present } which means:
		// expected == true -> we need this, present == true -> we got it, expect == false -> we don't want it, present == false ->there`s no value
		controlType: {
			existenceAccepted: initialValue,
			present: initialValue,
			acceptableValue: initialValue
		},
		sources: {},
		nonFunctionalDescription: {
			existenceAccepted: initialValue,
			content: []
		},
		numberOfErrors: 0
	}

	return node;
};

function getBlankValidationGraph(initialValue) {
	initialValue = (typeof initialValue == "boolean" ? initialValue : true);

	var graph = {
		present: initialValue,
		numberOfErrors: 0,
		start: {
			present: initialValue,
			unique: initialValue,
			// hasNoSources: initialValue,
			// acceptableId: initialValue,
			// hasNoInputs: initialValue,
			// acceptableOutputs: initialValue // tutaj chodzi o relację outputów #Start-a i inputów #End-a do inputów i outputów parenta
		},
		end: {
			present: initialValue,
			unique: initialValue,
			// hasNoOutputs: initialValue,
			// acceptableInputs: initialValue
		},
		nodes: {
			present: initialValue,
			content: []
		},
		inputVariables: {
			present: initialValue,
			content: []
		},
		nonFunctionalParameters: {
			present: initialValue,
			content: []
		}
	};

	return graph;
};
// function getBlankValidationAttribute(initialValue, required, unique, acceptableValue, existenceAccepted){
// 	var obj = {};
// 	initialValue = ( typeof initialValue == "boolean" ? initialValue : true );
// 	if(required)
// 		obj.required = initialValue;
// 	if(unique)
// 		obj.unique = initialValue;
// 	if(acceptableValue)
// 		obj.acceptableValue = initialValue;
// 	if(existenceAccepted)
// 		obj.existenceAccepted = initialValue;

// 		// hasNoOutputs: initialValue,
// 		// acceptableInputs: initialValue
// 		// hasNoSources: initialValue,
// 		// acceptableId: initialValue,
// 		// hasNoInputs: initialValue,
// 		// acceptableOutputs: initialValue
// 		},
// 	return obj;
// };


function getBlankValidationFunctionalDescription(initialValue) {
	initialValue = (typeof initialValue == "boolean" ? initialValue : true);

	var functionalDescription = {
		present: initialValue,
		description: {
			acceptableType: initialValue
		},
		serviceClasses: {
			acceptableType: initialValue,
			acceptableTypesOfValues: initialValue,
			// acceptableValues : initialValue
		},
		metaKeywords: {
			acceptableType: initialValue,
			acceptableTypesOfValues: initialValue,
			// acceptableValues : initialValue
		},
		inputs: {
			present: initialValue,
			existenceAccepted: initialValue,
			content: []
		},
		outputs: {
			present: initialValue,
			existenceAccepted: initialValue,
			content: []
		},
		// preconditions : (an empty string),
		// effects : 
	}

	return functionalDescription;
};

function getBlankValidationInput(initialValue) {
	initialValue = (typeof initialValue == "boolean" ? initialValue : true);

	var input = {
		present: initialValue,
		"class": {
			present: initialValue
		},
		id: {
			present: initialValue,
			unique: initialValue
		},
		label: {
			present: initialValue
		},
		dataType: {
			present: initialValue,
			acceptableValue: initialValue
		},
		// properties : {},
		source: {
			present: initialValue,
			existenceAccepted: initialValue,
			acceptableTypesOfValues: initialValue,
			nodeId: {
				present: initialValue,
				acceptableValue: initialValue
			},
			outputId: {
				present: initialValue,
				acceptableValue: initialValue
			}
		}
	};

	return input;
};

function getBlankValidationOutput(initialValue) {
	initialValue = (typeof initialValue == "boolean" ? initialValue : true);
	var output = {
		present: initialValue,
		"class": {
			present: initialValue
		},
		id: {
			present: initialValue,
			unique: initialValue
		},
		label: {
			present: initialValue
		},
		dataType: {
			present: initialValue,
			acceptableValue: initialValue
		},
		// properties : {},
	};

	return output;
};