var CFG = {
	colors : {
		functionality: "#A6C9E2",
		service : "#FBEC88",
		mediator : "white",
		startstop : "white",
		controlIf : "green",
		emulationService : "#D1DBB5",
		highlightStroke : "orange",
		normalStroke : "black",
	},
	mode : "",
	language : "PL", // "EN"
	nodeWidth : 135, // nie podpięte
	nodeHeight : 35, // nie podpięte
	guiWidth : 1, // nie podpięte
	guiHeight : 1, // nie podpięte
	serviceTypes : [
		"service",
		"javaservice",
		"mediator",
		"streamingworkflowengine",
	],
	url_emulationService : "",
	url_askForId : "askForId.xml",
	showLabelDuringNodeDrag : true,
	//rzeczy Doroty
	forms : {		
		mainFormWidth : 700,
		mainFormHeight : 400,
		dialogWidth : 300,
		dialogHeight : 200,
		addSthFormWidth : 450,
		addSthFormHeight : 250,
		addSthFormWidthB : 350,
		addSthFormHeightB : 300,
		smallFormWidth : 500,
		smallFormHeight : 350,

		maxStringLength : 18,
	},
	bottomBar : {
		maxHeight : 350,
		animationTime : 200,
		fillColor : "grey",
		groupFontSize : 10,
		groupFontColor : "black",
		buttonFillColor : "ivory",
		buttonDefaultFontSize : 25,
		buttonFontColor : "black",
		buttonDefaultStrokeColor : "grey",
		buttonHighlightStrokeColor : "blue",
	},
	slider : {
		animationTime : 100,
		fillColor : "black"
	},
	io : {
		swapImg : 'images/dblArrow.png',
		highlightColor : 'blue'
	}
}