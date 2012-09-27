var CFG = {
	colors : {
		functionality: "#A6C9E2",
		service : "#FBEC88",
		mediator : "white",
		start : "white",
		stop : "white",
		controlIf : "green",
		controlEndIf : "green",
		emulationService : "#D1DBB5",
		highlightStroke : "orange",
		normalStroke : "black",
		arrowGlow : "red"
	},
	nodeDefaults : {
		// change default... to ...
		defaultWidth : 150, // nie podpięte
		defaultHeight : 35, // nie podpięte
		defaultRarius : 15,
		defaultScale: 100, // [%]
		defaultRepoHeight: 20,
		defaultRepoWidth: 150,
		defaultConnectorRadius: 4,
		maxLengthOfShownServiceName: 25
	},
	repoNode : {

	},
	serviceTypes : [
		"service",
		"javaservice",
		"mediator",
		"streamingworkflowengine"
	],
	actions : {
		showLabelDuringNodeDrag : true
	},
	gui : {
		mode : "", //CF, DF, H
		guiWidth : 1, // nie podpięte
		guiHeight : 1, // nie podpięte
		language : "PL" // "EN"
	},
	url_emulationService : "",
	url_askForId : "askForId.xml",

}