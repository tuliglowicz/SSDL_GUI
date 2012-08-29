"use strict";

var supportedNodeTypes = ["functionality", "service", "streamingworkflowengine", "control", "javaservice"
//	"mediator"
],
	serviceTypes = ["service", "streamingworkflowengine", "javaservice", "mediator"];
var validatorObject = {

	validateNode: function validateNode(node, tab) {
		var that = this,
			inputIdTab = [],
			outputIdTab = [],
			validationNode, err = 0;

		if (getType(node) != "object" || isEmpty(node)) {
			validationNode = getBlankValidationNode(false);
			err = 1;
		} else {
			validationNode = getBlankValidationNode();
			// nodeId
			// unique sprawdzany poziom wyżej
			if (validateAttr(node.nodeId, "string", "")) {
				validationNode.nodeId.present = false;
				validationNode.nodeId.unique = false;
				validationNode.nodeId.acceptableValue = false;
				err += 2;
			} else {
				validationNode.id = node.nodeId;
			}
			// nodeLabel
			if (validateAttr(node.nodeLabel, "string", "")) {
				validationNode.nodeLabel.present = false;
				// to nie bedzie zaliczane do errorów
				// err++;
			}
			// else {
			// 	if( typeof node.nodeType == "string" ){
			// 		var controlType = node.controlType.toLowerCase();
			// 		if(controlType == "#start")
			// 			if(node.nodeLabel == "")
			// 	}
			// }
			//nodeType
			if (validateAttr(node.nodeType, "string", "")) {
				validationNode.nodeType.present = false;
				validationNode.nodeType.acceptableValue = false;
				err += 2;
			} else if (validateAttr(node.nodeType.toLowerCase(), "string", supportedNodeTypes, true)) {
				validationNode.nodeType.acceptableValue = false;
				err++;
			}

			var nodeType = (typeof node.nodeType == "string" ? node.nodeType.toLowerCase() : ""),
				tmpObj;

			validationNode.typeofNode = nodeType;

			// physicalDescription
			tmpObj = validatePhysicalDescription(node.physicalDescription);
			if ( !! ~serviceTypes.indexOf(nodeType)) {
				validationNode.physicalDescription = tmpObj.validationObject;
				validationNode.physicalDescription.existenceAccepted = true;
				err += tmpObj.numberOfErrors;
			} else if (!isEmpty(node.physicalDescription) && (tmpObj.numberOfErrors < 4)) {
				validationNode.physicalDescription = {
					existenceAccepted: false
				}
				err++;
			} else {
				validationNode.physicalDescription = {}
			}

			// nonFunctionalDescription
			// czy node dowolnego typu może mieć nonFunctionalDescription ??
			tmpObj = validateNonFunctionalParameters(node.nonFunctionalDescription);

			validationNode.nonFunctionalDescription = tmpObj.validationObject;
			validationNode.nonFunctionalDescription.existenceAccepted = true;
			err += tmpObj.numberOfErrors;
			// functionalDescription
			tmpObj = validateFunctionalDescription(node.functionalDescription);

			validationNode.functionalDescription = tmpObj.validationObject;
			validationNode.functionalDescription.existenceAccepted = true;
			err += tmpObj.numberOfErrors;

			// sources
			if (node.sources) {
				validationNode.sources = {
					present: (getType(node.sources) == "array" && node.sources.length > 0),
					existenceAccepted: true,
					content: [],
				}
			} else {

				validationNode.sources = {
					present: false,
					existenceAccepted: false,
					content: [],

				}
			}
			// controlNode
			if (nodeType == "control") {
				validateControlNode(node, validationNode);
			} else if (validateAttr(node.controlType, "string", "")) {
				validationNode.controlType = {
					present: false,
					existenceAccepted: false
				}
			} else {
				validationNode.controlType = {
					present: true,
					existenceAccepted: false
				}
				err++;
			}

			// SUBGRAPH
			var present = false,
				existenceAccepted = false,
				content = {};
			if (isService(nodeType)) {
				if (getType(node.subgraph) == "object" && !isEmpty(node.subgraph)) {
					tmpObj = this.validateGraph(node.subgraph, undefined, node.nodeId, node.nodeLabel);
					present = true;
					existenceAccepted = true;
					content = tmpObj.validationObject
					err += tmpObj.numberOfErrors;
				} else {
					present = false;
					existenceAccepted = true;
				}
			}
			validationNode.subgraph = {
				present: present,
				existenceAccepted: existenceAccepted,
				content: content
			}
		}

		// validationNode.numberOfErrors = err;
		// raport(jsonFormatter(validationNode, true), "");
		return {
			numberOfErrors: err,
			validationObject: validationNode
		};
	},
	validateGraph: function validateGraph(graph, tab, id, label) {
		function firstValidationLoop(key, node) {
			tmpObj = that.validateNode(node);
			validationNode = tmpObj.validationObject;
			err += tmpObj.numberOfErrors;

			if (validationNode.present) {
				var obj = {};
				if (validationNode.nodeId.present) obj.nodeId = node.nodeId;
				if (validationNode.nodeLabel.present) obj.nodeLabel = node.nodeLabel;
				if (validationNode.functionalDescription.present) {
					var funDesc = node.functionalDescription;
					obj.functionalDescription = {};
					if (getType(funDesc.outputs) == "array") obj.functionalDescription.outputs = funDesc.outputs;
				}
				obj.validationNode = validationNode;

				if (validationNode.controlType.present) {
					if (node.controlType.toLowerCase() == "#start") startCount++;
					if (node.controlType.toLowerCase() == "#end") endCount++;
				}

				$.each(idsTab, function(i, val) {
					if (i < key && node.nodeId.toLowerCase() == val) {
						validationNode.nodeId.unique = false;
						validationGraph.nodes.content[i].unique = false;
						validationNode.nodeId.acceptableValue = false;
						err++;
					}
				});
				idsTab.push(node.nodeId);
				memory.push(obj);
			}
		};

		function output_exists(nodeId, ioId) {
			var result = false,
				nodeId = nodeId ? nodeId.toLowerCase() : "",
				ioId = ioId ? ioId.toLowerCase() : "",
				brakLoop = true;

			$.each(memory, function() {
				if (typeof this.nodeId == "string" && this.nodeId.toLowerCase() == nodeId && getType(this.functionalDescription) == "object" && getType(this.functionalDescription.outputs) == "array") {
					$.each(this.functionalDescription.outputs, function(i, v) {
						if (v.id.toLowerCase() == ioId) {
							result = true;
							brakLoop = false;
							return false;
						}
					})
				}
				return brakLoop;
			});

			return result;
		};

		function node_exists(nodeId) {
			var result = false,
				nodeId = nodeId ? nodeId.toLowerCase() : "";;
			$.each(memory, function() {
				if (typeof this.nodeId == "string" && this.nodeId.toLowerCase() == nodeId) {
					result = true;
					return false;
				}
			});

			return result;
		}
		var that = this,
			memory = [],
			idsTab = [],
			validationGraph, validationNode, startCount = 0,
			endCount = 0,
			err = 0,
			tmpObj;

		if (getType(graph) != "object" || isEmpty(graph)) {
			validationGraph = getBlankValidationGraph(false);
			err++;
		} else {
			validationGraph = getBlankValidationGraph();

			// -------------------------------------------------------------------------------- N O D E S
			if (getType(graph.nodes) != "array" || graph.nodes.length == 0) {
				validationGraph.nodes.present = false;
				err++;
			} else {
				// console.clear();
				// zbieranie informacji o node i validacja parametrów nodeów na poziomię wewnętrzym
				$.each(graph.nodes, firstValidationLoop);

				// validacja parametrów nodeów na poziomię grafu
				// unikatowość nodeId, odpowienie wartości w sources i w sources
				$.each(graph.nodes, function(key, node) {
					validationNode = memory[key].validationNode;
					// console.log(validationNode)
					if (validationNode && validationNode.present) {

						//validacja poprawności wpisów w node.sources
						if (validationNode.sources && validationNode.sources.existenceAccepted) {
							$.each(node.sources, function() {
								if (this) {
									var present = validateAttr(this, "string", "", true);
									var acceptableValue = (present ? !! ~idsTab.indexOf(this) : false)
									validationNode.sources.content.push({
										present: present,
										acceptableValue: acceptableValue
									});
								}
								if (!present) err++;
								if (!acceptableValue) err++;
							});
						}
						//validacja poprawności wpisów w node.functionalDescription.inputs.sources
						var funDesc = validationNode.functionalDescription;
						// console.log( "==========================" );
						// console.log( funDesc.inputs );
						// console.log(funDesc, funDesc.present, funDesc.inputs.present, getType(funDesc.inputs.content) == "array" )
						if (funDesc && funDesc.present && funDesc.inputs && funDesc.inputs.present && getType(funDesc.inputs.content) == "array") {
							var valInpTab = funDesc.inputs.content;
							$.each(node.functionalDescription.inputs, function(i, v) {
								// console.log("------------------------");
								// console.log(v);
								// console.log("------------------------");
								var valNodeId = valInpTab[i].source.nodeId;
								var valOutpId = valInpTab[i].source.outputId;
								if (v.source) {
									if (!valNodeId.present || !node_exists(v.source[0])) {
										// a(1);
										valInpTab[i].source.nodeId.acceptableValue = false;
										valInpTab[i].source.outputId.acceptableValue = false;
										err += 2;
									}
									if (!valNodeId.present || !output_exists(v.source[0], v.source[1])) {
										// a(2);
										valInpTab[i].source.outputId.acceptableValue = false;
										err++;
									}
								} else {
									valInpTab[i].source.nodeId.present = false;
									valInpTab[i].source.outputId.present = false;
									valInpTab[i].source.nodeId.acceptableValue = false;
									valInpTab[i].source.outputId.acceptableValue = false;
									err += 2;
								}
							});
						}
					}
					validationGraph.nodes.content.push(validationNode);
					err += validationNode.numberOfErrors
				});
			}
			// -------------------------------------------------------------------------------- endof N O D E S
			// -------------------------------------------------------------------------------- i n p u t V a r i a b l e s
			tmpObj = validateInputVariables(graph.inputVariables);
			err += tmpObj.numberOfErrors;
			validationGraph.inputVariables.present = tmpObj.present;
			validationGraph.inputVariables.content = tmpObj.validationObject;

			// -------------------------------------------------------------------------------- n o n F u n c t i o n a l P a r a m e t e r s
			tmpObj = validateNonFunctionalParameters(graph.nonFunctionalParameters);
			err += tmpObj.numberOfErrors;
			validationGraph.nonFunctionalParameters.present = tmpObj.present;
			validationGraph.nonFunctionalParameters.content = tmpObj.validationObject;


			validationGraph.start.present = (startCount > 0);
			validationGraph.start.unique = (startCount == 1);
			validationGraph.end.present = (endCount > 0);
			validationGraph.end.unique = (endCount == 1);

			// start : { 
			// 	present: initialValue,
			// 	unique: initialValue,
			//	// hasNoSources: initialValue,
			// 	// acceptableId: initialValue,
			// 	hasNoInputs: initialValue,
			// 	acceptableOutputs: initialValue // tutaj chodzi o relację outputów #Start-a i inputów #End-a do inputów i outputów parenta
			// },
			// end : {
			// 	present: initialValue,
			// 	unique: initialValue,
			// 	hasNoOutputs: initialValue,
			// 	acceptableInputs: initialValue
			// }
		}

		// ocb z condition ???
		// ocb z alternatives ???
		// obc z preconditions w funDesc
		// obc z effects w funDesc
		return {
			numberOfErrors: err,
			validationObject: validationGraph
		};
	}
};

// var json = {
// 	"id":"root",
// 	"nodes":[{"nodeId":"#Start","nodeType":"999Control","physicalDescription":{"serviceName":"","serviceGlobalId":"","address":"","operation":""},"functionalDescription":{"description":"Start node","serviceClasses":[],"metaKeywords":[],"inputs":[],"outputs":[{"class":"Message","id":"BuildingMonitoringStarted","label":"BuildingMonitoringStarted","dataType":"Message","properties":""},{"class":"Object","id":"MonitoredObject","label":"MonitoredObject","dataType":"Object","properties":""}],"preconditions":"","effects":""},
// 	"nonFunctionalDescription":[{"weight":"-1","name":"location","relation":"eqq","unit":"district","value":"srodmiescie"}],"alternatives":"","subgraph":{},"controlType":"#start","condition":"","sources":[]},{"nodeId":"#End","nodeType":"Control","physicalDescription":{"serviceName":"","serviceGlobalId":"","address":"","operation":""},"functionalDescription":{"description":"End node","serviceClasses":[],"metaKeywords":[],"inputs":[{"class":"Video","id":"InputVideo","label":"InputVideo","dataType":"VideoData","properties":"","source":["CCTVSendStart","OutputVideo"]}],"outputs":[],"preconditions":"","effects":""},"nonFunctionalDescription":[{"weight":"1","name":"location","relation":"eq","unit":"district","value":"srodmiescie"}],"alternatives":"","subgraph":{},"controlType":"#end","condition":"","sources":["CCTVSendStart"]},{"nodeId":"CCTVStartMonitoring","nodeType":"Functionality","physicalDescription":{"serviceName":"","serviceGlobalId":"","address":"","operation":""},"functionalDescription":{"description":"Service starting the monitoring process","serviceClasses":["Monitoring"],"metaKeywords":["Monitoring"],"inputs":[{"class":"Message","id":"InputBuildingMonitoringStarted","label":"InputBuildingMonitoringStarted","dataType":"Message","properties":"","source":["#Start","BuildingMonitoringStarted"]},{"class":"Object","id":"InputMonitoredObject","label":"InputMonitoredObject","dataType":"Object","properties":"","source":["#Start","MonitoredObject"]}],"outputs":[{"class":"VideoSensor","id":"VideoSensor","label":"VideoSensor","dataType":"Sensor","properties":""},{"class":"MotionSensor","id":"MotionSensor","label":"MotionSensor","dataType":"Sensor","properties":""},{"class":"Message","id":"CCTVMonitoringStarted","label":"CCTVMonitoringStarted","dataType":"Message","properties":""}],"preconditions":"","effects":""},"nonFunctionalDescription":[{"weight":"1","name":"location","relation":"eq","unit":"district","value":"srodmiescie"}],"alternatives":"","subgraph":{},"controlType":"","condition":"","sources":["#Start"]},{"nodeId":"CCTVSendStart","nodeType":"StreamingWorkflowEngine","physicalDescription":{"serviceName":"StreamingWorkflowEnigne","serviceGlobalId":"www.platel.pl/streamingworkflowengine","address":"www.platel.pl/streamingworkflowengine","operation":"execute"},"functionalDescription":{"description":"Service for sending the video from CCTV monitoring","serviceClasses":["Process"],"metaKeywords":["Send"],"inputs":[{"class":"VideoSensor","id":"VideoSensor","label":"VideoSensor","dataType":"Sensor","properties":"","source":["CCTVStartMonitoring","VideoSensor"]},{"class":"MotionSensor","id":"MotionSensor","label":"MotionSensor","dataType":"Sensor","properties":"","source":["CCTVStartMonitoring","MotionSensor"]}],"outputs":[{"class":"Video","id":"OutputVideo","label":"OutputVideo","dataType":"VideoData","properties":""}],"preconditions":"","effects":""},"nonFunctionalDescription":[{"weight":"1","name":"location","relation":"eq","unit":"district","value":"srodmiescie"}],"alternatives":"","subgraph":{"nodes":[{"nodeId":"#Start","nodeType":"Control","physicalDescription":{"serviceName":"","serviceGlobalId":"","address":"","operation":""},"functionalDescription":{"description":"Start node","serviceClasses":[],"metaKeywords":[],"inputs":[{"class":"VideoSensor","id":"VideoSensor","label":"VideoSensor","dataType":"Sensor","properties":"","source":["CCTVStartMonitoring","VideoSensor"]},{"class":"MotionSensor","id":"MotionSensor","label":"MotionSensor","dataType":"Sensor","properties":"","source":["CCTVStartMonitoring","MotionSensor"]}],"outputs":[{"class":"VideoSensor","id":"VideoSensor","label":"VideoSensor","dataType":"Sensor","properties":""},{"class":"MotionSensor","id":"MotionSensor","label":"MotionSensor","dataType":"Sensor","properties":""}],"preconditions":"","effects":""},"nonFunctionalDescription":[{"weight":"1","name":"location","relation":"eq","unit":"district","value":"srodmiescie"}],"alternatives":"","subgraph":{},"controlType":"#start","condition":"","sources":[]},{"nodeId":"#End","nodeType":"Control","physicalDescription":{"serviceName":"","serviceGlobalId":"","address":"","operation":""},"functionalDescription":{"description":"End node","serviceClasses":[],"metaKeywords":[],"inputs":[{"class":"Video","id":"InputVideo","label":"InputVideo","dataType":"VideoData","properties":"","source":["DecryptionStart","OutputVideo"]}],"outputs":[{"class":"Video","id":"OutputVideo","label":"OutputVideo","dataType":"VideoData","properties":""}],"preconditions":"","effects":""},"nonFunctionalDescription":[{"weight":"1","name":"location","relation":"eq","unit":"district","value":"srodmiescie"}],"alternatives":"","subgraph":{},"controlType":"#end","condition":"","sources":["DecryptionStart"]},{"nodeId":"CodingStart","nodeType":"Service","physicalDescription":{"serviceName":"PAL to MPEG-1 (25fps 1.5 Mb/s BW) Video coding","serviceGlobalId":"http://www.monitoring.pwr.wroc.pl/computation/video_coding_srodmiescie_1_mpeg1_bw","address":"http://www.monitoring.pwr.wroc.pl/computation/video_coding_srodmiescie_1_mpeg1_bw.wsdl","operation":"codingWithMPEG1bw"},"functionalDescription":{"description":"Video stream coding in CCTV monitoring","serviceClasses":["StartVideoCodingService"],"metaKeywords":["Video","Coding"],"inputs":[{"class":"VideoSensor","id":"VideoSensor","label":"VideoSensor","dataType":"Sensor","properties":"","source":["#Start","VideoSensor"]},{"class":"MotionSensor","id":"MotionSensor","label":"MotionSensor","dataType":"Sensor","properties":"","source":["#Start","MotionSensor"]}],"outputs":[{"class":"Video","id":"OutputVideo","label":"OutputVideo","dataType":"VideoData","properties":""}],"preconditions":"","effects":""},"nonFunctionalDescription":[{"weight":"11","name":"location","relation":"eq","unit":"district","value":"srodmiescie"},{"weight":"1","name":"cost","relation":"eq","unit":"$","value":"1"}],"alternatives":"","subgraph":{},"controlType":"","condition":"","sources":["#Start"]},{"nodeId":"EncryptionStart","nodeType":"Service","physicalDescription":{"serviceName":"RSA Encryption Service","serviceGlobalId":"http://www.monitoring.pwr.wroc.pl/computation/encryption_srodmiescie_1","address":"http://www.monitoring.pwr.wroc.pl/computation/encryption_srodmiescie_1.wsdl","operation":"encryptWithRSA"},"functionalDescription":{"description":"Video stream encryption","serviceClasses":["StartEncryptionService"],"metaKeywords":["Video","Encryption"],"inputs":[{"class":"Video","id":"InputVideo","label":"InputVideo","dataType":"VideoData","properties":"","source":["CodingStart","OutputVideo"]}],"outputs":[{"class":"Video","id":"OutputVideo","label":"OutputVideo","dataType":"VideoData","properties":""}],"preconditions":"","effects":""},"nonFunctionalDescription":[{"weight":"11","name":"location","relation":"eq","unit":"district","value":"srodmiescie"},{"weight":"1","name":"cost","relation":"eq","unit":"$","value":"1"}],"alternatives":"","subgraph":{},"controlType":"","condition":"","sources":["CodingStart"]},{"nodeId":"TransmissionStart","nodeType":"Service","physicalDescription":{"serviceName":"Transmission Ethernet 100Mb","serviceGlobalId":"http://www.monitoring.pwr.wroc.pl/computation/transmission_srodmiescie_1_ethernet","address":"http://www.monitoring.pwr.wroc.pl/computation/transmission_srodmiescie_1_ethernet.wsdl","operation":"Transmission"},"functionalDescription":{"description":"Video stream transmission","serviceClasses":["StartTransmissionService"],"metaKeywords":["Video","Transmission"],"inputs":[{"class":"Video","id":"InputVideo","label":"InputVideo","dataType":"VideoData","properties":"","source":["EncryptionStart","OutputVideo"]}],"outputs":[{"class":"Video","id":"OutputVideo","label":"OutputVideo","dataType":"VideoData","properties":""}],"preconditions":"","effects":""},"nonFunctionalDescription":[{"weight":"1","name":"location","relation":"eq","unit":"district","value":"srodmiescie"},{"weight":"1","name":"cost","relation":"eq","unit":"$","value":"1"}],"alternatives":"","subgraph":{},"controlType":"","condition":"","sources":["EncryptionStart"]},{"nodeId":"DecryptionStart","nodeType":"Service","physicalDescription":{"serviceName":"RSA decryption","serviceGlobalId":"http://www.monitoring.pwr.wroc.pl/computation/decryption_srodmiescie_1","address":"http://www.monitoring.pwr.wroc.pl/computation/decryption_srodmiescie_1.wsdl","operation":"dencryptWithRSA"},"functionalDescription":{"description":"Video stream decryption","serviceClasses":["StartDecryptionService"],"metaKeywords":["Video","Decryption"],"inputs":[{"class":"Video","id":"InputVideo","label":"InputVideo","dataType":"VideoData","properties":"","source":["TransmissionStart","OutputVideo"]}],"outputs":[{"class":"Video","id":"OutputVideo","label":"OutputVideo","dataType":"VideoData","properties":""}],"preconditions":"","effects":""},"nonFunctionalDescription":[{"weight":"11","name":"location","relation":"eq","unit":"district","value":"srodmiescie"},{"weight":-1,"name":"cost","relation":"Xeq","unit":"$","value":"1"}],"alternatives":"","subgraph":{},"controlType":"","condition":"","sources":["TransmissionStart"]}],"inputVariables":[],"nonFunctionalParameters":[{"weight":"1","unit":"$","value":"6","relation":"lt","name":"cost"}],"parameters":"","exceptions":""},"controlType":"","condition":"","sources":["CCTVStartMonitoring"]}],
// 	"inputVariables":[{"name":"user_firstname","value":"Jan","type":"String"},{"name":"user_surname","value":"Kowalski","type":"String"}],
// 	"nonFunctionalParameters":[{"weight":"1","unit":"$","value":"10","relation":"lt","name":"cost"}]
// },
//  json2 = {
// 	"id":"root",
// 	"nodes":[{"nodeId":"#Start","nodeType":"Control","physicalDescription":{"serviceName":"","serviceGlobalId":"","address":"","operation":""},"functionalDescription":{"description": null,"serviceClasses":{},"metaKeywords":{},"inputs":[{}, {}],"outputs":[{"class":"Message","id":"BuildingMonitoringStarted","label":"BuildingMonitoringStarted","dataType":"Message","properties":""},{"class":"Object","id":"MonitoredObject","label":"MonitoredObject","dataType":"Object","properties":""}],"preconditions":"","effects":""},
// 	"nonFunctionalDescription":[{"weight":"-1","name":"location","relation":"eqq","unit":"district","value":"srodmiescie"}],"alternatives":"","subgraph":{},"controlType":"#start","condition":"","sources":[]},{"nodeId":"#End","nodeType":"Control","physicalDescription":{"serviceName":"","serviceGlobalId":"","address":"","operation":""},"functionalDescription":{"description":"End node","serviceClasses":[],"metaKeywords":[],"inputs":[{"class":"Video","id":"InputVideo","label":"InputVideo","dataType":"VideoData","properties":"","source":["CCTVSendStart","OutputVideo"]}],"outputs":[],"preconditions":"","effects":""},"nonFunctionalDescription":[{"weight":"1","name":"location","relation":"eq","unit":"district","value":"srodmiescie"}],"alternatives":"","subgraph":{},"controlType":"#end","condition":"","sources":["CCTVSendStart"]},{"nodeId":"CCTVStartMonitoring","nodeType":"Functionality","physicalDescription":{"serviceName":"","serviceGlobalId":"","address":"","operation":""},"functionalDescription":{"description":"Service starting the monitoring process","serviceClasses":["Monitoring"],"metaKeywords":["Monitoring"],"inputs":[{"class":"Message","id":"InputBuildingMonitoringStarted","label":"InputBuildingMonitoringStarted","dataType":"Message","properties":"","source":["#Start","BuildingMonitoringStarted"]},{"class":"Object","id":"InputMonitoredObject","label":"InputMonitoredObject","dataType":"Object","properties":"","source":["#Start","MonitoredObject"]}],"outputs":[{"class":"VideoSensor","id":"VideoSensor","label":"VideoSensor","dataType":"Sensor","properties":""},{"class":"MotionSensor","id":"MotionSensor","label":"MotionSensor","dataType":"Sensor","properties":""},{"class":"Message","id":"CCTVMonitoringStarted","label":"CCTVMonitoringStarted","dataType":"Message","properties":""}],"preconditions":"","effects":""},"nonFunctionalDescription":[{"weight":"1","name":"location","relation":"eq","unit":"district","value":"srodmiescie"}],"alternatives":"","subgraph":{},"controlType":"","condition":"","sources":["#Start"]},{"nodeId":"CCTVSendStart","nodeType":"StreamingWorkflowEngine","physicalDescription":{"serviceName":"StreamingWorkflowEnigne","serviceGlobalId":"www.platel.pl/streamingworkflowengine","address":"www.platel.pl/streamingworkflowengine","operation":"execute"},"functionalDescription":{"description":"Service for sending the video from CCTV monitoring","serviceClasses":["Process"],"metaKeywords":["Send"],"inputs":[{"class":"VideoSensor","id":"VideoSensor","label":"VideoSensor","dataType":"Sensor","properties":"","source":["CCTVStartMonitoring","VideoSensor"]},{"class":"MotionSensor","id":"MotionSensor","label":"MotionSensor","dataType":"Sensor","properties":"","source":["CCTVStartMonitoring","MotionSensor"]}],"outputs":[{"class":"Video","id":"OutputVideo","label":"OutputVideo","dataType":"VideoData","properties":""}],"preconditions":"","effects":""},"nonFunctionalDescription":[{"weight":"1","name":"location","relation":"eq","unit":"district","value":"srodmiescie"}],"alternatives":"","subgraph":{"nodes":[{"nodeId":"#Start","nodeType":"Control","physicalDescription":{"serviceName":"","serviceGlobalId":"","address":"","operation":""},"functionalDescription":{"description":"Start node","serviceClasses":[],"metaKeywords":[],"inputs":[{"class":"VideoSensor","id":"VideoSensor","label":"VideoSensor","dataType":"Sensor","properties":"","source":["CCTVStartMonitoring","VideoSensor"]},{"class":"MotionSensor","id":"MotionSensor","label":"MotionSensor","dataType":"Sensor","properties":"","source":["CCTVStartMonitoring","MotionSensor"]}],"outputs":[{"class":"VideoSensor","id":"VideoSensor","label":"VideoSensor","dataType":"Sensor","properties":""},{"class":"MotionSensor","id":"MotionSensor","label":"MotionSensor","dataType":"Sensor","properties":""}],"preconditions":"","effects":""},"nonFunctionalDescription":[{"weight":"1","name":"location","relation":"eq","unit":"district","value":"srodmiescie"}],"alternatives":"","subgraph":{},"controlType":"#start","condition":"","sources":[]},{"nodeId":"#End","nodeType":"Control","physicalDescription":{"serviceName":"","serviceGlobalId":"","address":"","operation":""},"functionalDescription":{"description":"End node","serviceClasses":[],"metaKeywords":[],"inputs":[{"class":"Video","id":"InputVideo","label":"InputVideo","dataType":"VideoData","properties":"","source":["DecryptionStart","OutputVideo"]}],"outputs":[{"class":"Video","id":"OutputVideo","label":"OutputVideo","dataType":"VideoData","properties":""}],"preconditions":"","effects":""},"nonFunctionalDescription":[{"weight":"1","name":"location","relation":"eq","unit":"district","value":"srodmiescie"}],"alternatives":"","subgraph":{},"controlType":"#end","condition":"","sources":["DecryptionStart"]},{"nodeId":"CodingStart","nodeType":"Service","physicalDescription":{"serviceName":"PAL to MPEG-1 (25fps 1.5 Mb/s BW) Video coding","serviceGlobalId":"http://www.monitoring.pwr.wroc.pl/computation/video_coding_srodmiescie_1_mpeg1_bw","address":"http://www.monitoring.pwr.wroc.pl/computation/video_coding_srodmiescie_1_mpeg1_bw.wsdl","operation":"codingWithMPEG1bw"},"functionalDescription":{"description":"Video stream coding in CCTV monitoring","serviceClasses":["StartVideoCodingService"],"metaKeywords":["Video","Coding"],"inputs":[{"class":"VideoSensor","id":"VideoSensor","label":"VideoSensor","dataType":"Sensor","properties":"","source":["#Start","VideoSensor"]},{"class":"MotionSensor","id":"MotionSensor","label":"MotionSensor","dataType":"Sensor","properties":"","source":["#Start","MotionSensor"]}],"outputs":[{"class":"Video","id":"OutputVideo","label":"OutputVideo","dataType":"VideoData","properties":""}],"preconditions":"","effects":""},"nonFunctionalDescription":[{"weight":"11","name":"location","relation":"eq","unit":"district","value":"srodmiescie"},{"weight":"1","name":"cost","relation":"eq","unit":"$","value":"1"}],"alternatives":"","subgraph":{},"controlType":"","condition":"","sources":["#Start"]},{"nodeId":"EncryptionStart","nodeType":"Service","physicalDescription":{"serviceName":"RSA Encryption Service","serviceGlobalId":"http://www.monitoring.pwr.wroc.pl/computation/encryption_srodmiescie_1","address":"http://www.monitoring.pwr.wroc.pl/computation/encryption_srodmiescie_1.wsdl","operation":"encryptWithRSA"},"functionalDescription":{"description":"Video stream encryption","serviceClasses":["StartEncryptionService"],"metaKeywords":["Video","Encryption"],"inputs":[{"class":"Video","id":"InputVideo","label":"InputVideo","dataType":"VideoData","properties":"","source":["CodingStart","OutputVideo"]}],"outputs":[{"class":"Video","id":"OutputVideo","label":"OutputVideo","dataType":"VideoData","properties":""}],"preconditions":"","effects":""},"nonFunctionalDescription":[{"weight":"11","name":"location","relation":"eq","unit":"district","value":"srodmiescie"},{"weight":"1","name":"cost","relation":"eq","unit":"$","value":"1"}],"alternatives":"","subgraph":{},"controlType":"","condition":"","sources":["CodingStart"]},{"nodeId":"TransmissionStart","nodeType":"Service","physicalDescription":{"serviceName":"Transmission Ethernet 100Mb","serviceGlobalId":"http://www.monitoring.pwr.wroc.pl/computation/transmission_srodmiescie_1_ethernet","address":"http://www.monitoring.pwr.wroc.pl/computation/transmission_srodmiescie_1_ethernet.wsdl","operation":"Transmission"},"functionalDescription":{"description":"Video stream transmission","serviceClasses":["StartTransmissionService"],"metaKeywords":["Video","Transmission"],"inputs":[{"class":"Video","id":"InputVideo","label":"InputVideo","dataType":"VideoData","properties":"","source":["EncryptionStart","OutputVideo"]}],"outputs":[{"class":"Video","id":"OutputVideo","label":"OutputVideo","dataType":"VideoData","properties":""}],"preconditions":"","effects":""},"nonFunctionalDescription":[{"weight":"1","name":"location","relation":"eq","unit":"district","value":"srodmiescie"},{"weight":"1","name":"cost","relation":"eq","unit":"$","value":"1"}],"alternatives":"","subgraph":{},"controlType":"","condition":"","sources":["EncryptionStart"]},{"nodeId":"DecryptionStart","nodeType":"Service","physicalDescription":{"serviceName":"RSA decryption","serviceGlobalId":"http://www.monitoring.pwr.wroc.pl/computation/decryption_srodmiescie_1","address":"http://www.monitoring.pwr.wroc.pl/computation/decryption_srodmiescie_1.wsdl","operation":"dencryptWithRSA"},"functionalDescription":{"description":"Video stream decryption","serviceClasses":["StartDecryptionService"],"metaKeywords":["Video","Decryption"],"inputs":[{"class":"Video","id":"InputVideo","label":"InputVideo","dataType":"VideoData","properties":"","source":["TransmissionStart","OutputVideo"]}],"outputs":[{"class":"Video","id":"OutputVideo","label":"OutputVideo","dataType":"VideoData","properties":""}],"preconditions":"","effects":""},"nonFunctionalDescription":[{"weight":"11","name":"location","relation":"eq","unit":"district","value":"srodmiescie"},{"weight":-1,"name":"cost","relation":"Xeq","unit":"$","value":"1"}],"alternatives":"","subgraph":{},"controlType":"","condition":"","sources":["TransmissionStart"]}],"inputVariables":[],"nonFunctionalParameters":[{"weight":"1","unit":"$","value":"6","relation":"lt","name":"cost"}],"parameters":"","exceptions":""},"controlType":"","condition":"","sources":["CCTVStartMonitoring"]}],
// 	"inputVariables":[{"name":"user_firstname","value":"Jan","type":"String"},{"name":"user_surname","value":"Kowalski","type":"String"}],
// 	"nonFunctionalParameters":[{"weight":"1","unit":"$","value":"10","relation":"lt","name":"cost"}]
// };
// var output = validatorObject.validateGraph(json2);
// validatorObject.validateNode(json2.nodes[0]);
// jsonFormatter(json2, true, true);
// var output = validatorObject.validateNode({
// 	nonFunctionalDescription: [{}, {}],
// 	nodeId: "CCTV",
// 	nodeType: "Functionality",
// 	physicalDescription: {a:5, operation: "add"},
// });
// raport(output, "");
// };
// test_json
// test_json2
// json2

function getErrorMessages() {

	var object = {
		present: "Wartosc jest pusta!",
		unique: "Wartosc powinna byc unikalna!",
		hasNoSources: "Wierzcholek nie powinien posiadac zrodel",
		acceptableId: "Id wierzcholka nie jest akceptowalny",
		hasNoInputs: "Wierzcholek nie powinien posiadac wejśc",
		acceptableValue: "Wpisana wartosc nie reprezentuje poprawnego typu danych.",
		acceptableOutputs: "Outputy powinny byc takie jak rodzica",
		acceptableType: "Wpisana wartosc typu nie reprezentuje poprawnego typu danych.",
		acceptableTypesOfValues: "Wpisana wartosc  nie reprezentuje poprawnego typu danych.",
		hasNoOutputs: "Nie powininen posiadac outputów.",
		acceptableInputs: "Inputy powinny byc takie jak rodzica",
		existenceAccepted: "Ten atrybut powinien byc niezdefiniowany.",
	}
	return object;
};

function getFormLabels() {
	var objt = {

		nodeLabel: "label",
		nodeType: "nodeType",
		physicalDescription: {
			serviceName: "serviceName",
			serviceGlobalId: "serviceGlobalId",
			address: "address",
			operation: "operation"
		},
		functionalDescription: {
			description: "description",
			serviceClasses: "serviceClasses",
			// metaKeywords: "metaKeywords",
			inputs: [{
				class: "class",
				id: "id",
				label: "label",
				dataType: "dataType",
				properties: "properties"
			}],
			outputs: [{
				class: "class",
				id: "id",
				label: "label",
				dataType: "dataType",
				properties: "properties"
			}],
			// preconditions: "preconditions",
			// effects: "effects"
		},
		nonFunctionalDescription: [{
			weight: "weight",
			name: "name",
			relation: "relation",
			unit: "unit",
			value: "value"
		}],
		// alternatives: "alternatives",
		controlType: "controlType",
		// condition: "condition",
		// sources: "sources"
	}
	return objt;
}

function prepareFormMessages(validationNode) {


	/*

Zakładki:
-mainTab - ok
	-label
	-description
	-controlType  
	-serviceClasses 
-physicalDescriptionTab - ok
	-address
	-serviceName
	-serviceGlobalId
	-operation	
-inputOutputTab ok
	-input
	-output
-nonFunctionalDescriptionTab -  ok
	-weight
	-name
	-relation
	-unit
	-value	
*/

	/*
To Do:

	- Nie pokazać błędów wynikających z poprzednich - tj presence i wrongType - done :D
	- Postfix  - Later

*/
	var idObject = getFormLabels();
	var errMsg = getErrorMessages();
	var errTab = [];
	var postfix = "endofF";
	var boolTestObj;
	var tabId;
	var innerBoolTestObj;
	var indexer;
	var validatedNodeType = validationNode.validationObject.typeofNode;
	console.log(validatedNodeType);
	for (var i in validationNode.validationObject) {
		if (validationNode.validationObject.hasOwnProperty(i)) {
			if (i == "physicalDescription") {
				tabId = "physicalDescriptionTab";
				for (var j in validationNode.validationObject[i]) {
					for (var k in validationNode.validationObject[i][j]) {
						boolTestObj = validationNode.validationObject[i][j][k];
						if (!boolTestObj && idObject[i][j]) {
							errTab.push("f_" + tabId + "_" + idObject[i][j] + "_" + errMsg[k] + "_" + postfix);
							if (k == "present") break;
						}
					}
				}
			} else if (i == "functionalDescription") {
				for (var j in validationNode.validationObject[i]) {
					indexer = -1;
					for (var k in validationNode.validationObject[i][j]) {
						boolTestObj = validationNode.validationObject[i][j][k];
						if (getType(boolTestObj) != "array" && getType(boolTestObj) != "boolean") {
							if (!boolTestObj && idObject[i][j]) {
								errTab.push("f_mainTab_" + idObject[i][j] + "_" + errMsg[k] + "_" + postfix);
								if (k == "acceptableValue") break;
							}
						} else {
							for (var l in boolTestObj) {
								indexer++;
								for (var m in boolTestObj[l]) {
									for (var n in boolTestObj[l][m]) {
										innerBoolTestObj = boolTestObj[l][m][n]
										if (!innerBoolTestObj && idObject[i][j][0][m]) {
											if (typeof(idObject[i][j][0][m]) == "string") {
												errTab.push("f_" + j + "Tab" + "x" + j + "-" + indexer + "_" + idObject[i][j][0][m] + "_" + errMsg[n] + "_" + postfix);
												if (n == "present") break;
											}
										}
									}
								}
							}

						}
					}

				}
			} else if (i == "nonFunctionalDescription") {
				tabId = "nonFunctionalDescriptionTab";
				indexer = -1;
				for (var j in validationNode.validationObject[i]) {
					indexer++;
					for (var k in validationNode.validationObject[i][j]) {
						for (var l in validationNode.validationObject[i][j][k]) {
							boolTestObj = validationNode.validationObject[i][j][k][l];
							if (!boolTestObj && idObject[i][0][k]) {
								errTab.push("f_" + tabId + "xNFProps-" + indexer + "_" + idObject[i][0][k] + "_" + errMsg[l] + "_" + postfix);
								if (l == "present") break;
							}

						}
					}
				}
			} else {
				tabId = "mainTab";
				for (var j in validationNode.validationObject[i]) {
					boolTestObj = validationNode.validationObject[i][j];
					if (!boolTestObj && idObject[i]) {
						
						if ( j == "present" && validatedNodeType == "control") {
							errTab.push("f_" + tabId + "_" + idObject[i] + "_" + errMsg[j] + "_" + postfix);
							if (j == "present") break;
						} 
					}
				}
			}
		}
	}
	return errTab;
};

// var AAA = validatorObject.validateGraph(json2);
var output = validatorObject.validateNode({
	nodeId: "node---0000001",
	nodeLabel: "Dodawanie",
	nodeType: "Service",
	physicalDescription: {
		serviceName: "Dodawanie",
		serviceGlobalId: "http://www.math.pwr.wroc.pl/math/dodawanie",
		address: "http://156.17.130.39:10000/simpleMathAdd?wsdl",
		operation: "dodawanie"
	},
	functionalDescription: {
		description: "Usługa dodająca dwie liczby",
		serviceClasses: ["dodawanie"],
		metaKeywords: ["add"],
		inputs: [{
			class: "sadada",
			id: "skladnik1",
			label: "Skladnik",
			dataType: "Int",
			properties: "",
			source: []
		}, {
			class: "Skladnik",
			id: "skladnik2",
			label: "Skladnik",
			dataType: "Int",
			properties: "",
			source: []
		}],
		outputs: [{
			class: "Suma",
			id: "suma",
			label: "Suma",
			dataType: "Int",
			properties: "",
			source: []
		}],
		preconditions: "",
		effects: ""
	},
	nonFunctionalDescription: [],
	alternatives: "",
	subgraph: {},
	controlType: "",
	condition: "",
	sources: []
}
// {
// 	nodeId: "#kanpka",
// 	nodeLabel: "",
// 	nodeType: "control",
// 	physicalDescription: {
// 		serviceName: "eqw",
// 		serviceGlobalId: "weq",
// 		address: "qwe",
// 		operation: "ewq"
// 	},
// 	functionalDescription: {
// 		description: "kanpka node",
// 		serviceClasses: [],
// 		metaKeywords: 57465735457,
// 		inputs: [{
// 			class: "Message", 	
// 			id: "bla",{
// 			class: "Message", 	
// 			id: "bla",
// 			label: "trolz",
// 			dataType: 5654,
// 			properties: "",
// 			source: ["#Start", "BuildingMonitoringStarted"]
// 		}
// 			label: "trolz",
// 			dataType: 5654,
// 			properties: "",
// 			source: ["#Start", "BuildingMonitoringStarted"]
// 		}, {
// 			class: "Message",
// 			id: "bla",
// 			label: "trolz",
// 			dataType: 5654,
// 			properties: "",
// 			source: ["#Start", "BuildingMonitoringStarted"]
// 		}],
// 		outputs: [{
// 			class: "Video",
// 			id: "VideoSensor",
// 			label: "VideoSensor",
// 			dataType: "",
// 			properties: ""
// 		}, ],
// 		preconditions: "",
// 		effects: ""
// 	},
// 	nonFunctionalDescription: [],
// 	alternatives: "",
// 	subgraph: {
// 	},
// 	controlType: "#tdgs",
// 	condition: "",
// 	sources: []
// }
);
// prepareFormMessages(output);
// raport(jsonFormatter(prepareFormMessages(output), true), "2");
// raport(jsonFormatter(AAA,true),"");
//console.log(JSON.stringify(output));
// raport(jsonFormatter(output, true), "");
// raport( jsonFormatter(json2, true) , "2");