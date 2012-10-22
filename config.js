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
	menucss:{
	//styl belki menu znajduje sie w pliku CSS
	},
	mode : "",
	ssdl_version : "1.3",
	language : "PL", // "EN"
	nodeWidth : 135, // nie podpięte
	nodeHeight : 35, // nie podpięte
	guiWidth : 1, // nie podpięte
	guiHeight : 1, // nie podpięte
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