(function(global){
	var $ = jQuery;
//Poczatek pliku language.js
var language = {
	polish: {
		bottombar:{
			group:{
				views: "Widoki",
				edit: "Edycja",
				graphOptions: "Opcje Grafu",
			},
			options:{
				cF: "Przepływ Kontroli",
				dF: "Przepływ Danych" ,
				save: "Zapisz",
				startStop: "Start Stop",
				inputVariables: "Wartości Wejść",
				nonFunctionalParameters:"Parametry Niefunkcjonalne",
			},
		},
		nodes: {
			service: "Usługa",
			functionality: "Funkcjonalność",
			mediator:	"Mediator",
			emulationService: "Usługa Markująca",
			if: "Warunek (IF)"
		},
		alerts: {
			asYouWish: "Jak sobie chcesz!",
			fine: "OSTRZEGAŁEM!",
			removeAll: "Usunąć wszystkie dane?",
			areYouSure:"Czy jesteś pewien?",
			areYouSureText:"Stracisz wprowadzone dane, tej czynności nie można przywrócić. Jesteś pewien, że chcesz to zrobić?",
			removeAllText:"Zaraz usuniesz wszystkie wprowadzone do formularza dane. Jesteś pewien, że chcesz to zrobić?",
			addLabelNewNode: "Wpisz etykietę dla nowego wierzchołka:",
			addInputS: "Czy chcesz dodać nowe wejście w wierzchołku o etykiecie ",
			addInputE: " ?",
			emptyGraph: "Nie można zapisać pustego grafu!",
			addOutputS: "Czy chcesz dodać nowe wyjście w wierzchołku o etykiecie ",
			addOutputE: " ?",
			inputData: "Wprowadź dane!",
			graphNotPassedValidation:"Graf nie przeszedł poprawnie walidacji!\nCzy jesteś pewien poprawności grafu?\nkliknij OK by potwierdzić.",
			saveOK: "Procedura zapisu przeszła poprawnie",
			saveNotOK: "Procedura zapisu nie powiodła się",
			onlyXML: "Możesz wybierać tylko pliki XML",
			errors: {
				emptyGraph: "Nie można zapisać pustego grafu!",
				noInputSelected: "Nie wybrano wejścia!",
				noOutputSelected: "Nie wybrano wyjścia!",
				noInputVariableSelected: "Nie wybrano wartości wejścia!",
				noGraphNonFunctionalPropertySelected: "Nie wybrano właściwości niefunkcjonalnej grafu!",
				noNonFunctionalPropertySelected: "Nie wybrano właściwości niefunkcjonalnej!",
				noEntrySelected: "Nie wybrano wejścia!",
				noinit: "musisz wywołać wcześniej funkcję init()",
				error: "Błąd",
				edgeExists: "Próbujesz dodać krawędź, która już istnieje.",
				ioDiffType: "Próbowałeś połączyć wyjście i wejście o innych typach danych.",
				nFPropExists: "Ta niefunkcjnalna własność już istnieje!",
				inputExists: "Wejście już istnieje!",
				outputExists: "Wyjście już istnieje!",
				shortcutAdded: " jest już używany!",
				shortcut: " skrót \" ",
				shortcutNotDefined: "nie jest jeszcze zdefiniowany",
				startCantPassControl: "Nie można przekazać kontroli do wierzchołka startowego.",
				idnewemuservice: "błąd podczas zdobywania identyfikatora dla nowej usługi emulującej"
			}
		},
		forms: {
			add: "Dodaj",
			label: "Etykieta",
			description: "Opis",
			controlType: "Typ Kontrolny",
			serviceClass: "Klasa Usługi",
			address: "Adres",
			serviceName: "Nazwa Usługi",
			serviceGlobalId: "Globalny Identyfikator Usługi",
			operation: "Operacja",
			id: "Identyfikator",
			class: "Klasa",
			dataType: "Typ Danych",
			properties: "Właściwości",
			source: "Źródło",
			weight: "Waga",
			name: "Nazwa",
			relation: "Relacja",
			number:"Numer",
			unit: "Jednostka",
			input: "Wejście",
			output: "Wyjście",
			value: "Wartość",
			type: "Typ",
			next: "DALEJ",
			back: "WRÓĆ",
			definedInputs: "Zdefiniowane wejścia:",
			definedOutputs: "Zdefiniowane wyjścia:",
			definedNonFunctionalProperties: "Zdefiniowane własności niefunkcjonalne:",
			addNew: "Dodaj",
			edit: "Edycja",
			delete: "Usuń",
			resetAll: "Zresetuj wszystko",
			submitAll: "Wyślij wszystko",
			newInput: "Nowe Wejście",
			newEmulationService: "Nowa usługa markująca",
			newInputVariable:"Nowa wartość wejścia",
			newOutput: "Nowe Wyjście",
			newNonFunctionalProperty: "Nowa własność niefukcjonalna",
			newGraphNonFunctionalProperty: "Nowa własność niefunkcjonalna grafu",
			confirm: "Zatwierdź",
			cancel: "Anuluj",
			definedGraphNonFunctionalProperties:"Zdefiniowane własności niefunkcjonalne grafu",
			definedInputVariables: "Zdefiniowane wartości wejść",
			editExistingGraphNonFunctionalProperty:"Edytuj istniejącą własność niefunkcjonalną grafu",
			editExistingInputVariable:"Edytuj istniejącą wartość wejść",
			editExistingInput:"Edytuj istniejące wejście",
			editExistingOutput:"Edytuj istniejące wyjście",
			editExistingNonFunctionalProperty:"Edytuj istniejącą własność niefunkcjonalną",
			createA:"Stwórz wierzchołek typu: ",
			typeNode: "",
			viewing: "Edycja wierzchołka typu: ",
			saveChanges: "Zapisz zmiany",
			clearAll1:"Tak, wyczyść formularz",
			clearAll2: "Jestem pewien na 100%",
			labeled: " o etykiecie: ",
			xmlIOFile: "wektory z pliku",
			chooseYourDestiny: "Wybierz akcję",
			new: "Nowy",
			import: "Importuj z pliku",
			ifVar: "JEŻELI zmienna",
			ifRel: "jest",
			ifVar2: "drugiej zmiennej",
			then: "TO",
			else: "WPP",
			placeholder1: "wprowadź stałą; pole obowiązkowe",
			placeholder2: "wprowadź stałą; puste = użycie drugiego wejścia",
			noForm: "Ten wierzchołek nie ma edytowalnych parametrów!"
		},
		formTabs: {
			main: "Ogólne",
			serviceDesc: "Opis usługi",
			inputs: "Wejścia",
			outputs: "Wyjścia",
			nonFunctionalDesc: "Opis niefunkcjonalny",
			emulation: "Emulacja",
			ifMain: "Definicja warunku",
			assignVar: "Definicje zmiennych",
		},
		logger: {
			console_CL: "Zamknij konsolę",
			console_SA: "zaznacz wszystkie",
			console_DA: "odznacz wszystkie",
			console_D: "usuń zaznaczone",
			show: "Pokaż: ",
			close: "Zamknij",
			shInfo: "pokaż/ukryj informacje",
			shWarning: "pokaż/ukryj ostrzeżenia",
			shError: "pokaż/ukryj błędy",
			delComm: "usuń komunikat"
		},
		mainMenu: {
			file: "Plik",
			edit: "Edycja",
			graph: "Graf",
			view: "Widok",
			help: "Pomoc",
			newNode: "Nowy Wierzchołek",
			load: "Ładuj",
			save: "Zapisz",
			serviceNode: "Wiechrzołek Usługi",
			functionalityNode: "Wierzchołek Funkcjonalny",
			mediatorNode: "Wierzchołek Mediatora",
			startStop: "Start Stop",
			fromDB: "z bazy danych",
			fromFile: "z pliku",
			toDB: "do bazy danych",
			toFile: "do pliku",
			toDBAndDeploy: "do bazy danych i wdróż",
			undo: "Cofnij",
			redo: "Do przodu",
			oneStep: "Jeden krok",
			all: "Do końca",
			inputVariables: "Wartości wejść",
			nonFunctionalParameters: " Parametry niefunkcjonalne",
			clear: "Wyczyść",
			validate: "Zwaliduj",
			test: "Test",
			controlFlow: "Przepływ kontroli",
			dataFlow: "Przepływ danych",
			console: "Konsola",
			documentation: "Dokumentacja",
			about: "O..",
		},
		validation: {
			present: "To pole jest wymagane!",
			unique: "Wartość musi byc unikalna!",
			hasNoSources: "Wierzchołek nie posiada źródel",
			acceptableId: "Id wierzchołka nie jest akceptowalny",
			hasNoInputs: "Wierzchołek nie powinien posiadać wejść",
			acceptableValue: "Wpisana wartość nie reprezentuje poprawnego typu danych.",
			acceptableOutputs: "Wyjścia powinny być takie jak rodzica",
			acceptableType: "Wpisana wartość typu nie reprezentuje poprawnego typu danych.",
			acceptableTypesOfValues: "Wpisana wartość nie reprezentuje poprawnego typu danych.",
			hasNoOutputs: "Nie powininen posiadać outputów.",
			acceptableInputs: "Inputy powinny być takie jak rodzica",
			existenceAccepted: "Ten atrybut powinien być niezdefiniowany."
		}
	},
	english: {

		bottombar:{
			group:{
				views:"Views",
				edit:"Edit",
				graphOptions:"Graph Options",
			},
			options:{
				cF:"CF",
				dF:"DF",
				save:"Save",
				startStop: "StartStop",
				inputVariables:"InputVariables",
				nonFunctionalParameters:"nonFunctionalParameters",
			},
		},

		nodes: {
			service: "Service",
			functionality: "Functionality",
			mediator:	"Mediator",
			emulationService: "Markup Service",
			if: "Condition (IF)"
		},
		alerts: {
			asYouWish: "As you wish",
			fine: "FINE!",
			areYouSure:"Are you sure?",
			areYouSureText:"You will lose all data and this action cannot be cancelled. Do you really want to do this?",
			removeAll: "Remove all data?",
			removeAlltext:"You are about to clear the entire form. Are you sure?",
			addLabelNewNode: "Enter a label for the new node:",
			addInputS: "Do you want to add new input to: ",
			addInputE: " node ?",
			addOutputS: "Do you want to add new output to: ",
			addOutputE: " node ?",
			inputData: "Please input data",
			emptyGraph: "Cannot save empty graph!",
			graphNotPassedValidation:"Validation not passed!\nAre you sure this graph is correct?\nclick OK if you're sure.",
			saveOK: "Save success",
			saveNotOK: "Failed to save!",
			onlyXML: "You can select only xml files",
			errors: {
				noInputSelected: "No input selected!",
				noOutputSelected: "No output selected!",
				noInputVariableSelected: "No input variable selected!",
				noGraphNonFunctionalPropertySelected: "No graph non functional property selected!",
				noNonFunctionalPropertySelected: "No non functional property selected!",
				noEntrySelected: "No entry selected!",	
				error: "Error",
				edgeExists: "You are trying to add existing edge.",
				startCantPassControl: " You can't pass control to the start node.",
				ioDiffType: "You tried to make connection between input and output of different data types",
				inputExists: "This input already exists!"  , 
				inputExists: "This output already exists!"  , 
				nFPropExists: "This non functional property already exists!",
				shortcutAdded: " is being used!",
				shortcut: "shortcut \"",
				shortcutNotDefined: "is not defined!",
				noinit: "you have to run init() function first",
				idnewemuservice: "error while accuring id for new emulationService"
			}

		},
		forms: {
			add: "Add",
			label: "label",
			description: "description",
			controlType: "controlType",
			serviceClass: "serviceClass",
			address: "address",
			serviceName: "serviceName",
			serviceGlobalId: "serviceGlobalId",
			operation: "operation",
			id: "id",
			class: "class",
			dataType: "dataType",
			properties: "properties",
			source: "source",
			weight: "weight",
			name: "name",
			number: "number",
			relation: "relation",
			unit: "unit",
			value: "value",
			type: "type",
			input: "input",
			output: "output",
			back: "BACK",
			next: "NEXT",
			definedInputs: "Defined inputs:",
			definedOutputs: "Defined outputs:",
			definedNonFunctionalProperties: "Defined Non Functional Properties:",
			addNew: "Add New",
			edit: "Edit",
			delete: "Delete",
			resetAll: "Reset All",
			submitAll: "Submit All",
			newInput: "New Input",
			newEmulationService: "New Markup service",
			newOutput: "New Output",
			newInputVariable: "New Input Variable",
			newNonFunctionalProperty: "New Non Functional Property",
			newGraphNonFunctionalProperty: "New Graph Non Functional Property",
			confirm: "Confirm",
			cancel: "Cancel",
			definedGraphNonFunctionalProperties:"Defined graph non functional properties",
			definedInputVariables: "Defined Input Variables",
			editExistingGraphNonFunctionalProperty:"Edit existing graph non functional property",
			editExistingInputVariable:"Edit existing input variable",
			editExistingInput:"Edit existing input",
			editExistingOutput:"Edit existing output",
			editExistingNonFunctionalProperty:"Edit existing non functional property",
			createA:"Create a",
			typeNode: " type node",
			viewing: "Viewing a ",
			saveChanges: "Save changes",
			clearAll1:"Yes, clear the form",
			clearAll2:"I'm 100% sure.",
			labeled: " labeled: ",
			xmlIOFile: "vectors form file",
			chooseYourDestiny: "Choose action",
			new: "New",
			import: "Import from file",
			ifVar: "IF variable ",
			ifRel: "is ",
			ifVar2: "than ",
			then: "THEN",
			else: "else",
			placeholder1: "nummeric constant must be given here",
			placeholder2: "nummeric constant; if empty uses other input",
			noForm: "This node has no editable parameters!"
		},
		formTabs: {
			main: "Main",
			serviceDesc: "Service Desciption",
			inputs: "Inputs",
			outputs: "Outputs",
			nonFunctionalDesc: "nonFunctionalDescription",
			emulation: "Emulation",
			ifMain: "Condition",
			assignVar: "Variable assignment",
		},

		logger: {
			console_CL: "Close console",
			console_DA: "deselect all",
			console_D: "delete selected",
			show: "Show: ",
			close: "Close",
			shInfo: "show/hide information",
			shWarning: "show/hide warnings",
			shError: "show/hide errors",
			delComm: "delete communicate",
		},

		mainMenu: {
			file: "File",
			edit: "Edit",
			graph: "Graph",
			view: "View",
			help: "Help",
			newNode: "New Node",
			load: "Load",
			save: "Save",
			serviceNode: "Service Node",
			functionalityNode: "Functionality Node",
			mediatorNode: "Mediator Node",
			startStop: "Start Stop",
			fromDB: "from DB",
			fromFile: "from File",
			toDB: "to DB",
			toFile: "to File",
			toDBAndDeploy: "to DB and Deploy",
			undo: "Undo",
			redo: "Redo",
			oneStep: "One Step",
			all: "All",
			inputVariables: "Input Variables",
			nonFunctionalParameters: " Non-Functional Parameters",
			clear: "Clear",
			validate: "Validate",
			test: "Test",
			controlFlow: "Control Flow",
			dataFlow: "Data Flow",
			console: "Console",
			documentation: "Documentation",
			about: "About...",
		},
		validation: {
			present: "This field is required!",
			unique: "This value must be unique!",
			hasNoSources: "Node does not have any sources!",
			acceptableId: "Node ID is not accepted!",
			hasNoInputs: "The node must not have any inputs!",
			acceptableValue: "Inputted variable is not of supported type!",
			acceptableOutputs: "Outputs shoud be those of parent node!",
			acceptableType: "Inputted data is of wrong type!",
			acceptableTypesOfValues: "Inputted data is of wrong type!",
			hasNoOutputs: "The node must not have any outputs!",
			acceptableInputs: "Inputs should be those of parent node!",
			existenceAccepted: "This attribute must not be defined!"
		}
	}
}
//Koniec pliku language.js
//Poczatek pliku config.js
var CFG = {
	colors : {
		functionality: "#A6C9E2",
		service : "#FBEC88",
		mediator : "white",
		start : "white",
		stop : "white",
		conditionStart : "green",
		conditionEnd : "green",
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
		maxLengthOfShownServiceName: 25,
		conditionSize: 20
	},
	egdeDefaults : {
		glowSize : 5
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
	flexibleTypes : [
		"functionality",
		"emulationservice"
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
	url_askForId : "XML/askForId.xml",
	showLabelDuringNodeDrag : true,
	//rzeczy Doroty
	forms : {		
		mainFormWidth : 700,
		mainFormHeight : 400,
		dialogWidth : 300,
		dialogHeight : 200,
		graphSaveParamsWidth : 450,
		graphSaveParamsHeight: 235,
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
		swapImg : '/images/dblArrow.png',
		highlightColor : 'blue'
	}
}
//Koniec pliku config.js
//Poczatek pliku library.js

// pomocnicze skróty
var a = alert;
var jstr = JSON.stringify;
// eof pomocnicze skróty

function skeletonAppender(lang,pf){
	//ENTER CONCATENATION HELL. Włodek mówił, że nie jest czytelnie, to teraz ma ^^
	var content = "<div id='form_" + pf + "'></div><div id='f_dialog_confirm1_" + pf + "' title='"+language[lang].alerts.removeAll+"'>"
			+ "<p><span class='ui-icon ui-icon-alert' style='float:left; margin:0 5px 5px 0;'></span><span style='font-size: 10px'>"+language[lang].alerts.removeAllText+"</span></p>"
				+ "<button id='f_button_resetConfirm1_"+pf+"'>"+language[lang].forms.clearAll1+"</button>"
				+ "<button id='f_button_resetCancel1_"+pf+"'>"+language[lang].forms.cancel+"</button></div>"
			+ "<div id='f_dialog_confirm2_" + pf + "' title='"+language[lang].alerts.areYouSure+"'>"
				+ "<p><span class='ui-icon ui-icon-alert' style='float:left; margin:0 5px 5px 0;'></span><span style='font-size: 10px'>"+language[lang].alerts.areYouSureText+"</span></p>"
				+ "<button id='f_button_resetConfirm2_"+pf+"'>"+language[lang].forms.clearAll2+"</button>"
				+ "<button id='f_button_resetCancel2_"+pf+"'>"+language[lang].forms.cancel+"</button></div>"
			+ "<div id='f_dialog_fine_" + pf + "' title='"+language[lang].alerts.asYouWish+"'>"
				+ "<p>"+language[lang].alerts.fine+".</p></div>"
			+ "<div id='f_addInputForm_" + pf + "' title='Add a new input'>"
				+ "<button id='f_addInputForm_changesConfirm_"+ pf +"'>"+language[lang].forms.confirm+"</button>"
				+ "<button id='f_addInputForm_changesCancel_"+ pf +"'>"+language[lang].forms.cancel+"</button></div>"
			+ "<div id='f_addOutputForm_" + pf + "' title='Add a new output'>"
				+ "<button id='f_addOutputForm_changesConfirm_"+ pf +"'>"+language[lang].forms.confirm+"</button>"
				+ "<button id='f_addOutputForm_changesCancel_"+ pf +"'>"+language[lang].forms.cancel+"</button></div>"
			+ "<div id='f_addNFPropertyForm_" + pf + "' title='Add a new non functional property'>"
				+ "<button id='f_addNFPropertyForm_changesConfirm_"+ pf +"'>"+language[lang].forms.confirm+"</button>"
				+ "<button id='f_addNFPropertyForm_changesCancel_"+ pf +"'>"+language[lang].forms.cancel+"</button></div>"
			+ "<div id='f_addGlobalNFPropertyForm_" + pf + "' title='Add a new graph non functional property'>"
				+ "<button id='f_addGlobalNFPropertyForm_changesConfirm_"+ pf +"'>"+language[lang].forms.confirm+"</button>"
				+ "<button id='f_addGlobalNFPropertyForm_changesCancel_"+ pf +"'>"+language[lang].forms.cancel+"</button></div>"
			+ "<div id='f_addInputVariableForm_" + pf + "' title='Add a new non functional property'>"
				+ "<button id='f_addInputVariableForm_changesConfirm_"+ pf +"' >"+language[lang].forms.confirm+"</button>"
				+ "<button id='f_addInputVariableForm_changesCancel_"+ pf +"'>"+language[lang].forms.cancel+"</button></div>"
			+ "<div id='f_globalNFPropertiesForm_" + pf + "' title='"+language[lang].mainMenu.nonFunctionalParameters+"'><br>"
				+ "<button id='f_globalNFPropertiesForm_changesConfirm_" + pf +"' class='formButton'>"+language[lang].forms.saveChanges+"</button>"
				+ "<button id='f_globalNFPropertiesForm_changesCancel_" + pf +"' class='formButton'>"+language[lang].forms.cancel+"</button></div>"
			+ "<div id='f_inputVariablesForm_" + pf + "' title='"+language[lang].mainMenu.inputVariables+"'><br>"
				+ "<button id='f_inputVariablesForm_changesConfirm_" + pf +"' class='formButton'>"+language[lang].forms.saveChanges+"</button>"
				+ "<button id='f_inputVariablesForm_changesCancel_" + pf +"' class='formButton'>"+language[lang].forms.cancel+"</button></div>"
			+ "<div id='f_graphSaveParamsForm_" + pf + "' title='Graph name & description'><br>"
				+ "<button id='f_graphSaveParamsForm_changesConfirm_" + pf +"' class='formButton'>"+language[lang].forms.saveChanges+"</button>"
				+ "<button id='f_graphSaveParamsForm_changesCancel_" + pf +"' class='formButton'>"+language[lang].forms.cancel+"</button></div>"
			+ "<div id='f_addVectorForm_" + pf + "' title='Add a new vector'>"
				+ "<button id='f_addVectorForm_changesConfirm_"+ pf +"'>"+language[lang].forms.confirm+"</button>"
				+ "<button id='f_addVectorForm_changesCancel_"+ pf +"'>"+language[lang].forms.cancel+"</button></div>"
			+ "<div id='f_dialog_emulationService_" + pf + "' title='"+language[lang].forms.newEmulationService+"'>"
				+ "<p><span style='font-size: 15px'>"+language[lang].forms.chooseYourDestiny+"</span></p>"
				+ "<button id='f_button_newEmulationService_"+pf+"'>"+language[lang].forms.new+"</button>"
				+ "<button id='f_button_importEmulationService_"+pf+"'>"+language[lang].forms.import+"</button></div>"
			+ "<input type=\"file\" id=\"uploader_"+pf+"\" class=\"hidden\" accept=\"text/xml\" />";
	$("body").append(content);
};
function formAppender(lang,pf){
	var mainContent = "<div id='tabs_" + pf + "' class='ui-tabs ui-widget ui-widget-content ui-corner-all'><ul class='ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all'>"
			+ "<li class='ui-state-default ui-corner-top ui-tabs-selected ui-state-active' id='mainTab_" + pf + "'><a href='#tabs-1_" + pf + "'>"+language[lang].formTabs.main+"</a></li>"
			+ "<li id='physicalDescriptionTab_" + pf + "'><a href='#tabs-2_" + pf + "'>"+language[lang].formTabs.serviceDesc+"</a></li>"
			+ "<li id='inputsTab_" + pf + "'><a href='#tabs-3_" + pf + "'>"+language[lang].formTabs.inputs+"</a></li>"
			+ "<li id='outputsTab_" + pf + "'><a href='#tabs-4_" + pf + "'>"+language[lang].formTabs.outputs+"</a></li>"
			+ "<li id='nonFunctionalDescriptionTab_" + pf + "'><a href='#tabs-5_" + pf + "'>"+language[lang].formTabs.nonFunctionalDesc+"</a></li>"
			+ "<li id='emulationTab_" + pf + "'><a href='#tabs-6_" + pf + "'>"+language[lang].formTabs.emulation+"</a></li>"
			+ "<li id='ifMainTab_" + pf + "'><a href='#tabs-7_" + pf + "'>"+language[lang].formTabs.ifMain+"</a></li>"
	 		
	 		+ "</ul><div id='tabs-1_" + pf + "' class='ui-tabs-panel ui-widget-content ui-corner-bottom'>"
		 	+ "</br><button id='f_mainTab_nextButton_" + pf + "' style='float:right'>"+language[lang].forms.next+"</button></br></div>"
	 		
	 		+ "<div id='tabs-2_" + pf + "' class='ui-tabs-panel ui-widget-content ui-corner-bottom'>"
		 	+ "</br><button id='f_physicalDescriptionTab_nextButton_" + pf + "' style='float: right'>"+language[lang].forms.next+"</button><button id='f_physicalDescriptionTab_backButton_" + pf + "' style='float: right'>"+language[lang].forms.back+"</button></br></div>"
	 		
	 		+ "<div id='tabs-3_" + pf + "' class='ui-tabs-panel ui-widget-content ui-corner-bottom'><p><div id='inputs-content_" + pf + "' class='ui-widget'>"
			+ "<p>"+language[lang].forms.definedInputs+"</p><table id='f_inputsTab_inputs_" + pf + "' class='text ui-widget-content ui-corner-all'><thead><tr class='ui-widget-header '><th class='tabField'>"+language[lang].forms.label+"</th><th class='tabField'>"+language[lang].forms.class+"</th><th class='tabField'>"+language[lang].forms.dataType+"</th></tr></thead><tbody><tr></tr></tbody></table></br>"
			+ "<button id='f_inputsTab_openAddInputForm_" + pf + "'>"+language[lang].forms.addNew+"</button><button id='f_inputsTab_openEditInputForm_" + pf + "'>"+language[lang].forms.edit+"</button><button id='f_inputsTab_deleteThisInput_" + pf + "'>"+language[lang].forms.delete+"</button>"
			+ "</div></br><button id='f_inputsTab_nextButton_" + pf + "' style='float: right'>"+language[lang].forms.next+"</button><button id='f_inputsTab_backButton_" + pf + "' style='float: right'>"+language[lang].forms.back+"</button></br>"
		 	
		 	+ "</p></div><div id='tabs-4_" + pf + "' class='ui-tabs-panel ui-widget-content ui-corner-bottom'><p>"
			+ "<div id='outputs-content_" + pf + "' class='ui-widget'><p>"+language[lang].forms.definedOutputs+"</p>"
			+ "<table id='f_outputsTab_outputs_" + pf + "' class='text ui-widget-content ui-corner-all'><thead><tr class='ui-widget-header '><th class='tabField'>"+language[lang].forms.label+"</th><th class='tabField'>"+language[lang].forms.class+"</th><th class='tabField'>"+language[lang].forms.dataType+"</th></tr></thead><tbody></tbody></table></br>" //<th>Id</th>
			+ "<button id='f_outputsTab_openAddOutputForm_" + pf + "'>"+language[lang].forms.addNew+"</button><button id='f_outputsTab_openEditOutputForm_" + pf + "'>"+language[lang].forms.edit+"</button><button id='f_outputsTab_deleteThisOutput_" + pf + "'>"+language[lang].forms.delete+"</button>"	
			+ "</div></br><button id='f_outputsTab_nextButton_" + pf + "' style='float: right'>"+language[lang].forms.next+"</button><button id='f_outputsTab_backButton_" + pf + "' style='float: right'>"+language[lang].forms.back+"</button></br>"
		 	
		 	+ "</p></div><div id='tabs-5_" + pf + "' class='ui-tabs-panel ui-widget-content ui-corner-bottom'><p>"
			+ "<div id='nonFunctionalProperties-content_" + pf + "' class='ui-widget'><p>"+language[lang].forms.definedNonFunctionalProperties+"</p>"
			+ "<table id='f_nonFunctionalDescriptionTab_NFProps_" + pf + "' class='text ui-widget-content ui-corner-all'><thead><tr class='ui-widget-header '><th class='tabField'>"+language[lang].forms.weight+"</th><th class='tabField'>"+language[lang].forms.name+"</th><th class='tabField'>"+language[lang].forms.relation+"</th><th class='tabField'>"+language[lang].forms.unit+"</th><th class='tabField'>"+language[lang].forms.value+"</th></tr></thead><tbody><tr></tr></tbody></table></br>"
			+ "<button id='f_nonFunctionalDescriptionTab_openAddNFPropertyForm_" + pf + "'>"+language[lang].forms.addNew+"</button><button id='f_nonFunctionalDescriptionTab_openEditNFPropertyForm_" + pf + "'>"+language[lang].forms.edit+"</button><button id='f_nonFunctionalDescriptionTab_deleteThisNFProperty_" + pf + "'>"+language[lang].forms.delete+"</button>"	
			+ "</div></br><button id='f_nonFunctionalDescriptionTab_nextButton_" + pf + "' style='float: right'>"+language[lang].forms.next+"</button><button id='f_nonFunctionalDescriptionTab_backButton_" + pf + "' style='float: right'>"+language[lang].forms.back+"</button></br></p></div>"

			+ "<div id='tabs-6_" + pf + "' class='ui-tabs-panel ui-widget-content ui-corner-bottom'><p><div id='emulation-content_" + pf + "' class='ui-widget'>"
			//+ "<table id='f_emulationTab_vectors_" + pf + "' class='text ui-widget-content ui-corner-all'><thead><tr class='ui-widget-header '><th class='tabField'>"+language[lang].forms.number+"</th><th class='tabField'>"+language[lang].forms.input+"</th><th class='tabField'>"+language[lang].forms.output+"</th></tr></thead><tbody><tr></tr></tbody></table></br>"
			//+ "<button id='f_emulationTab_openAddVectorForm_" + pf + "'>"+language[lang].forms.addNew+"</button><button id='f_emulationTab_openEditVectorForm_" + pf + "'>"+language[lang].forms.edit+"</button><button id='f_emulationTab_deleteThisVector_" + pf + "'>"+language[lang].forms.delete+"</button>"	
			+ "</div></br><button id='f_emulationTab_nextButton_" + pf + "' style='float: right'>"+language[lang].forms.next+"</button><button id='f_emulationTab_backButton_" + pf + "' style='float: right'>"+language[lang].forms.back+"</button></br></p></div>"

			+ "<div id='tabs-7_" + pf + "' class='ui-tabs-panel ui-widget-content ui-corner-bottom'><p><div id='ifMain-content_" + pf + "' class='ui-widget'>"
			+ "</div></br></p></div>"

			+"</div><input type='submit' name='f_button_sumbitAllButton' id='f_button_sumbitAllButton_" + pf + "' value='"+language[lang].forms.submitAll+"' style='float:right;'/><input type='reset' name='f_button_resetAllButton' id='f_button_resetAllButton_" + pf + "' value='"+language[lang].forms.resetAll+"' style='float:right;'/></br>";
	$("#form_" + pf).prepend(mainContent);

	var inputVariables = "<p>"+language[lang].forms.definedInputVariables+":</p><table id='f_inputVariables_" + pf + "' class='text ui-widget-content ui-corner-all'><thead><tr class='ui-widget-header '><th class='tabField'>"+language[lang].forms.name+"</th><th class='tabField'>"+language[lang].forms.value+"</th><th class='tabField'>"+language[lang].forms.type+"</th></tr></thead><tbody><tr></tr></tbody></table></br><button id='f_openAddInputVariableForm_" + pf + "'>"+language[lang].forms.addNew+"</button><button id='f_openEditInputVariableForm_" + pf + "'>"+language[lang].forms.edit+"</button><button id='f_deleteThisInputVariable_" + pf + "'>"+language[lang].forms.delete+"</button>";
	$("#f_inputVariablesForm_" + pf).prepend(inputVariables);

	var gNFProps = "<p>"+language[lang].forms.definedGraphNonFunctionalProperties+":</p><table id='f_globalNFProps_" + pf + "' class='text ui-widget-content ui-corner-all'><thead><tr class='ui-widget-header '><th class='tabField'>"+language[lang].forms.weight+"</th><th class='tabField'>"+language[lang].forms.name+"</th><th class='tabField'>"+language[lang].forms.relation+"</th><th class='tabField'>"+language[lang].forms.unit+"</th><th class='tabField'>"+language[lang].forms.value+"</th></tr></thead><tbody><tr></tr></tbody></table></br><button id='f_openAddGlobalNFPropertyForm_" + pf + "'>"+language[lang].forms.addNew+"</button><button id='f_openEditGlobalNFPropertyForm_" + pf + "'>"+language[lang].forms.edit+"</button><button id='f_deleteThisGlobalNFProperty_" + pf + "'>"+language[lang].forms.delete+"</button>";
	$("#f_globalNFPropertiesForm_" + pf).prepend(gNFProps);
};
function formGenerator(lang, postfix, json){	
	var html = ["<form id=\"" + json.formId + "_" + postfix + "\"><table>"];
	$.each(json.fields, function(i){
		html.push("<tr><td><label for=\"" + this.id + "_" + postfix + "\">" + ( language[lang].forms[this.label] || this.label || "") +	": </label></td><td>");
		switch(this.inputType.toLowerCase()){
			case "textbox" :
				html.push("<input type=\"text\" id=\"" + this.id + "_" + postfix + "\" class=\"text ui-widget-content ui-corner-all textfield\" />");
			break;
			case "textarea" :
			//height 60, width 360
				html.push("<textarea id=\"" + this.id + "_" + postfix + "\" class=\"text ui-widget-content ui-corner-all bigTextfield\" ></textarea>");
			break;
			case "select" :
				html.push("<select id=\"" + this.id + "_" + postfix + "\" class='select'>");
					$.each(this.values, function(){
						html.push("<option value=\""+this+"\">"+this+"</option>")
					});
				html.push("</select>");
			break;
			case "radio" :
				// html.push("ra");
			break;
		};
		if(this.button && this.list){
			html.push("<button id=\""+this.id+"_addButton_"+postfix+"\">"+language[lang].forms.add+" "+ this.label +"</button></td></tr>");
			html.push("<tr><td colspan='2'><p id=\""+this.id+"_list_"+postfix+"\"></p></td></tr><tr>");
		}
		else if(this.button){
			html.push("</td></tr><tr><td></td><td><button id=\""+this.id+"_addButton_"+postfix+"\">"+language[lang].forms.add+" "+ this.label +"</button></td></tr>");
		}
		html.push("<td><span id=\"" + this.id + "_validation_" + postfix + "\" style='color:#c0402a' ></span>");
	});
	html.push("</td></tr></table></form>")

	return html.join("");
};
function cutString( str, maxLen){
	return ( str.length > maxLen ? str.substring(0, maxLen-3)+"..." : str );
};
Raphael.fn.arrow = function (x1, y1, x2, y2, size) {
	var angle = (Math.atan2(x1-x2,y2-y1) / Math.PI) * 180,
		arrowPath = this.path("M" + x2 + " " + y2 + " L" + (x2 - size) + " " + (y2 - size) + " L" + (x2 - size) + " " + (y2 + size) + " L" + x2 + " " + y2 ).attr("fill","black").rotate((90+angle),x2,y2),
		linePath = this.path("M" + x1 + " " + y1 + " L" + x2 + " " + y2);

	return [linePath, arrowPath];
};
Raphael.el.myShow = function (time) {
	time = time || 250;
	this.show().animate({opacity: 1}, time);
	return this;
};
Raphael.el.myHide = function (time) {
	time = time || 250;
	this.animate({opacity: 0}, time, function(){
		this.hide();
	});
	return this;
};
jQuery.fn.myShow = function (time) {
	time = time || 250;
	this.animate({opacity: 1}, time);
	return this;
};
jQuery.fn.myHide = function (time) {
	time = time || 250;
	this.animate({opacity: 0}, time, function(){
		$(this).hide();
	});
	return this;
};
function raport(arg){
	arg = arg.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br/>").replace(/\t/g, "&nbsp; &nbsp;");
	document.getElementById("raport").innerHTML +=arg; //+ "----"+ typeof(arg)
}
function getType(arg){
	var tmp = Object.prototype.toString.call(arg);

	return tmp.substring(8, tmp.length-1).toLowerCase();
}
function jsonFormatter(json, humanFreiendly, wannaLog){
	if(isEmpty(json))
		console.log("Nieprawidłowy argument");

	var objSymbols = ["{","}"],
		tabSymbols = ["[","]"],
		output = ["{\n" ],
		seenObjects = [json],
		value,
		type,
		tmp,
		stringified
	;

	function hasBeenSeenBefore(obj){
		var result = false;
		for(var i = 0, j = seenObjects.length; i<j; i++){
			if(obj === seenObjects[i]){
				result = true;
				break;
			}
		}

		return result;
	}

	function inner(json, tabulacja, first){
		var symbols;
		tabulacja = tabulacja || "";
		tabulacja+="\t";

		for(var i in json){
			if(json.hasOwnProperty(i)){
				value = json[i];
				type = getType(value)
				// console.log(i, json[i])
				switch(type){
					case "object" :
					case "array" :
						symbols = (type === "object" ? objSymbols : tabSymbols);
						if( !isEmpty(value) ){
							if( first || !hasBeenSeenBefore(value) ){
								stringified = value.toString()
								if(stringified === "Rapha\xebl\u2019s object"){
									output.push(tabulacja+(i)+" : [ Rapha\xebl\u2019s object ],\n");
								}
								else if(stringified === "SSDL_Node object"){
									output.push(tabulacja+(i)+" : [ SSDL_Node object ],\n");
								}
								else if(stringified === "SSDL_CFEdge object"){
									output.push(tabulacja+(i)+" : [ SSDL_CFEdge object ],\n");
								}
								else if(stringified === "SSDL_DFEdge object"){
									output.push(tabulacja+(i)+" : [ SSDL_DFEdge object ],\n");
								}
								else if(stringified === "bottomBar_Option object"){
									output.push(tabulacja+(i)+" : [ bottomBar_Option object ],\n");
								}
								else if(stringified === "bottomBar_Group object"){
									output.push(tabulacja+(i)+" : [ bottomBar_Group object ],\n");
								}
								else {
									output.push(tabulacja+(i)+" : "+symbols[0]+"\n");
									output.push( inner(value, tabulacja+"\t") );
									output.push(tabulacja+symbols[1]+",\n");
								}
								seenObjects.push(value);
							} else {
								output.push(tabulacja+(i)+" : (objectSeenBefore),\n");
							}
						}
						else
							output.push(tabulacja+(i)+" : "+ symbols[0] + symbols[1]+",\n" );
					break;
					case "string" :
						output.push(tabulacja+(i)+" : "+(value ? ("\""+value+"\"") : "(an empty string)")+",\n");
					break;
					case "number" :
						output.push(tabulacja+(i)+" : "+value+",\n");
					break;
					case "regexp" :
						output.push(tabulacja+(i)+" : /"+value.source+"/,\n");
					break;
					case "function" :
						tmp = value.toLocaleString();
						output.push(tabulacja+(i)+" : "+tmp.substring(0, tmp.indexOf(")")+1)+"{...},\n");
					break;
					case "undefined" :
					case "null":
					case "boolean" :
						output.push(tabulacja+(i)+" : "+value+",\n");
					break;
				}

			}
				
		}

		tmp = output[ output.length-1 ];
		output[ output.length-1 ] = tmp.substring(0, tmp.length-2)+"\n"

	};
	inner(json, "", true);

	output.push("}\n");

	var outputString = output.join("");

	if(!humanFreiendly){
		outputString = outputString.replace(/\t/g, "").replace(/\n/g, "");
	}

	if(wannaLog){
		console.log(outputString);
	}

	return outputString;
}
function isEmpty(obj){
	var result = false
		type = getType(obj)
	;
	if(type == "object" || type =="array"){
		result = true;
		for(var i in obj){
			if(obj.hasOwnProperty(i)){
				result = false;
				break;
			}
		}
	}

	return result;
}
function camelize(str) {
	return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
		if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
		return index == 0 ? match.toLowerCase() : match.toUpperCase();
	});
};

var copyProps = function copyProps(from, to){
	if( typeof from !== "object" || typeof to !== "object"){
		throw {
			name : "typeError",
			message : "need 2 orgs and both type object"
		};
	} else {
		for(var i in from){
			if(from.hasOwnProperty(i)){
				// console.log(from[i], "->", to[i]);
				if(typeof from[i] != "object"){
					to[i] = from[i];
				} else {
					to[i] = from[i].clone();
				}
			}
		}
	}

	return to;
}

//object prototype extensions
Object.defineProperty(Object.prototype, "extend", { //extend object by (cloned or refferenced) attributes of passed object
	writable: false, enumerable: false, configurable: false, value: function(obj, shallowCopy){
		var names = Object.getOwnPropertyNames(obj);
		for(var i = 0; i < names.length; i++) {
			if (names[i] in this) continue;
			var desc = Object.getOwnPropertyDescriptor(obj,names[i]);
			if(!shallowCopy && typeof desc.value === 'object') desc.value = desc.value.clone();
			Object.defineProperty(this, names[i], desc);
		}
	}
});
Object.defineProperty(Object.prototype, "clone", { //clone object (return deep copy of object) !unsure about prototype value!
	writable: false, enumerable: false, configurable: false, value: function(){
		var obj;
		if(Array.isArray(this)){ obj = []; } else { obj = {}; }
		obj.extend(this);
		return obj;
	}
});
Object.defineProperty(Object.prototype, "forEach", { //execute passed function for each (enumerable) attribute of object
	writable: false, enumerable: false, configurable: false, value: function(fun){
		if(typeof fun === 'function'){
			for(var i in this){
				fun(i, this[i], this);
			}
		}
	}
});
Object.defineProperty(Object.prototype, "contains", { //checks if object contains selected value (in enumerable props)
	writable: false, enumerable: false, configurable: false, value: function(val){
		for(var i in this){
			if(this[i] == val) return true;
		}
		return false;
	}
});
//Koniec pliku library.js
//Poczatek pliku lib.js
"use strict";

	function validateAttr(variable, type, value, bool, caseSensitive){
		// first three arguments are obligatory
		// I'm not checking if those three are correct, b-coz only I am using this function as for now (and I trust myself)
		// opis: variable nie jest type lub (negacja, gdy false) jest równy value z dokładnością do caseSensitive

		value = (getType(value) == "array" ? value : [value]);
		bool = ( typeof (bool) == "boolean" ? bool : false);

		if( !caseSensitive
			&& (typeof variable == "string")
			&& (typeof value == "string"
					|| !value.some(function(o){ return typeof o != "string" }) )
		){
			variable = variable.toLowerCase();
			value = (typeof value == "string"
						? value.toLowerCase()
						 : value.map(function(o){
							 	return o.toLowerCase();
							 }) );

		}

		var isError;
		if( getType(variable) != type ){
			// console.log("different type");
			isError = true;
		}
		else if( !~value.indexOf(variable) ){
			// console.log("different value");
			isError = bool;
		} else {
			isError = !bool;
		}
		// console.log("-------------", variable, type, value, bool, value.indexOf(variable), isError);

		return isError ;
	};
// namespace

function namespace(path, obj){
	var pathTab = path.split(".");
	var currObj = obj;
	var currAttrName;

	for(var i in pathTab){
		currAttrName = pathTab[i];
		if(typeof currObj[ currAttrName] == "undefined"){
			currObj[ currAttrName ] = {};
		}

		currObj = currObj[ currAttrName ];
	}

	return obj;
}
// jsonFormatter( namespace("jan.kowalski.bingo", {jan: {attr1: 5}}) , true, true); // test

// ========================================================================================================================

var a = alert;
var jstr = JSON.stringify;
// var validator = function(){
	function validateMediatorNode(){
		//  (na razie tylko pusta funkcja)		
	};
	function validateParameters(){
		//  (na razie tylko pusta funkcja)
	};
	function validateExceptions(){
		// (na razie tylko pusta funkcja)	
	};
	function isEmpty(obj){
		var result = true,
			type = getType(obj)
		;
		if(type == "number"){
			result = false;
		}
		else if(type == "string"){
			result = ( obj === "" );
		} else if(type =="array"){
			result = (obj.length == 0);
		} else if(type == "object"){
			for(var i in obj){
				if(obj.hasOwnProperty(i)){
					result = false;
					break;
				}
			}
		}

		return result;
	};
	{
		// 	console.log( isEmpty( undefined ) );
		// 	console.log( isEmpty( null ) );
		// 	console.log( isEmpty( "" ) );
		// 	console.log( isEmpty( 0 ) );
		// 	console.log( isEmpty( .534 ) );
		// 	console.log( isEmpty( function(){} ) );
		// 	console.log( isEmpty( {} ) );
		// 	console.log( isEmpty( [] ) );
		// 	console.log( isEmpty( "asasda" ) );
		// 	console.log( isEmpty( ["dasd0", 53] ) );
		// 	console.log( isEmpty( {a: "sas", b:[43]} ) );
	};	
	function getType(arg){
		var tmp = Object.prototype.toString.call(arg);
		return tmp.substring(8, tmp.length-1).toLowerCase();
	};


// ========================================================================================================================

function raport(txt, n){
	if( typeof txt === "string"){
		// console.log("raport");
		// console.log("text: "+txt);
		txt = txt.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br/>").replace(/\t/g, "&nbsp; &nbsp; ");
		document.getElementById("raport"+n).innerHTML += txt+"<br/><br/>"
	} else {
		console.log("accepts only string input");
	}
}
	// var konwerter = convert();
	// var test = konwerter.convertJson(json, true);
	// raport(test, 2);
	// console.log(test)
	// raport(json);
	// raport(konwerter.convert(test));	

// function getType(input){
// 	var s = Object.prototype.toString.call( input );
// 	return s.substring(8, s.length-1).toLowerCase();
// }
// function isEmpty(obj){
// 	var result = false
// 		type = getType(obj)
// 	;
// 	if(type == "object" || type =="array"){
// 		result = true;
// 		for(var i in obj){
// 			if(obj.hasOwnProperty(i)){
// 				result = false;
// 				break;
// 			}
// 		}
// 	}

// 	return result;
// }
function jsonFormatter(json, humanFreiendly, wannaLog){
	if(typeof json != "object")
		console.log("Nieprawidłowy argument");

	var isArray = getType( json ) == "array",
		firstSymbol = (isArray ? "[" : "{"),
		lastSymbol = (isArray ? "]" : "}"),
		objSymbols = ["{","}"],
		tabSymbols = ["[","]"],
		output = [firstSymbol + "\n"],
		seenObjects = [json],
		value,
		type,
		tmp,
		stringified
	;

	function hasBeenSeenBefore(obj){
		var result = false;
		for(var i = 0, j = seenObjects.length; i<j; i++){
			if(obj === seenObjects[i]){
				result = true;
				break;
			}
		}

		return result;
	}

	function inner(json, tabulacja, first){
		var symbols;
		tabulacja = tabulacja || "";
		tabulacja+="\t";

		for(var i in json){
			if(json.hasOwnProperty(i)){
				value = json[i];
				type = getType(value)
				// console.log(i, json[i])
				switch(type){
					case "object" :
					case "array" :
						symbols = (type === "object" ? objSymbols : tabSymbols);
						if( !isEmpty(value) ){
							if( first || !hasBeenSeenBefore(value) ){
								stringified = value.toString()
								if(stringified === "Rapha\xebl\u2019s object"){
									output.push(tabulacja+(i)+" : [ Rapha\xebl\u2019s object ],\n");
								}
								else if(stringified === "SSDL_Node object"){
									output.push(tabulacja+(i)+" : [ SSDL_Node object ],\n");
								}
								else if(stringified === "SSDL_CFEdge object"){
									output.push(tabulacja+(i)+" : [ SSDL_CFEdge object ],\n");
								}
								else if(stringified === "SSDL_DFEdge object"){
									output.push(tabulacja+(i)+" : [ SSDL_DFEdge object ],\n");
								}
								else if(stringified === "bottomBar_Option object"){
									output.push(tabulacja+(i)+" : [ bottomBar_Option object ],\n");
								}
								else if(stringified === "bottomBar_Group object"){
									output.push(tabulacja+(i)+" : [ bottomBar_Group object ],\n");
								}
								else {
									output.push(tabulacja+(i)+" : "+symbols[0]+"\n");
									output.push( inner(value, tabulacja+"\t") );
									output.push(tabulacja+symbols[1]+",\n");
								}
								seenObjects.push(value);
							} else {
								output.push(tabulacja+(i)+" : (objectSeenBefore),\n");
							}
						}
						else
							output.push(tabulacja+(i)+" : "+ symbols[0] + symbols[1]+",\n" );
					break;
					case "string" :
						output.push(tabulacja+(i)+" : "+(value ? ("\""+value+"\"") : "\"\"")+",\n");
					break;
					case "number" :
						output.push(tabulacja+(i)+" : "+value+",\n");
					break;
					case "regexp" :
						output.push(tabulacja+(i)+" : /"+value.source+"/,\n");
					break;
					case "function" :
						tmp = value.toLocaleString();
						output.push(tabulacja+(i)+" : "+tmp.substring(0, tmp.indexOf(")")+1)+"{...},\n");
					break;
					case "boolean" :

					case "undefined" :
					case "null":
						output.push(tabulacja+(i)+" : "+value+",\n");
					break;
				}

			}
				
		}

		tmp = output[ output.length-1 ];
		if(tmp)
			output[ output.length-1 ] = tmp.substring(0, tmp.length-2)+"\n"

	};
	inner(json, "", true);

	output.push(lastSymbol + "\n");

	var outputString = output.join("");

	if(!humanFreiendly){
		outputString = outputString.replace(/\t/g, "").replace(/\n/g, "");
	}

	if(wannaLog){
		console.log(outputString);
	}

	return outputString;
}
//Koniec pliku lib.js
//Poczatek pliku generators.js
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
//Koniec pliku generators.js
//Poczatek pliku validators.js
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
//Koniec pliku validators.js
//Poczatek pliku myValidator.js
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
//Koniec pliku myValidator.js
//Poczatek pliku dragNodes.js
function nodeDragger(){
	var	lastDragX,
		lastDragY,
		ox, dx,
		oy, dy,
		accX, accY,
		width, height,
		rWidth = gui.view.paper.width,
		rHeight = gui.view.paper.height,
		bbox,
		ctrl,
		transX, transY,
		flag = true,
		ready2move = false,
		that = gui.view, // wczesniej było this
		itWasJustAClick = false,
		id, node,
		result = {
			start : function start( x, y, evt ){
				id = $(evt.target).parent().attr("class").split(" ")[0];
				node = that.getNodeById(id);
				itWasJustAClick = true;
				lastDragX = lastDragY = 0;
				accX = accY = 0;
				dx = dy = 0;
				bbox = node.set.getBBox();
				width = bbox.width;
				height = bbox.height;
				ox = bbox.x;
				oy = bbox.y;

				flag = false;
				if(!node.highlighted){
					if(!evt.ctrlKey)
						gui.controller.reactOnEvent("DESELECT");
					flag = true;
					node.highlight2();
				}
				ready2move = node.highlighted;
				ctrl = evt.ctrlKey;

				that.prepareNodesToDrag();
			},
			move : function move( x, y ){
				if(ready2move){
					itWasJustAClick = false;
					dx = x - lastDragX;	// mouse x
					dy = y - lastDragY; // mouse y
					
					transX = ox + dx > rWidth-width ? rWidth-width-ox : (ox + dx < 0 ? -ox : dx);
					transY = oy + dy > rHeight-height ? rHeight-height-oy : (oy + dy < 0 ? -oy : dy);

					// console.log(transX+":"+transY)
					if(transX != 0 || transY != 0){
				  		$.each(gui.view.current_graph_view.nodes, function(i, val){
							if(val.highlighted){
								val.translate(transX, transY);

								// optymalizacja raphaelowego transforma w celu przyspieszenia operacji przy przesuwaniu 
								if( val.mainShape._.transform && val.mainShape._.transform.length > 1 ){
									var thisTransform = val.mainShape._.transform,
										deltaX = thisTransform[0][1] + thisTransform[1][1],
										deltaY = thisTransform[0][2] + thisTransform[1][2]
									;
									thisTransform[0][1] = deltaX;
									thisTransform[0][2] = deltaY;

									thisTransform.pop();
								}
							}
						});


						lastDragX = x;
						lastDragY = y;
						ox += transX;
						oy += transY;
						accX += transX;
						accY += transY;

						//gui.controller.reactOnEvent("NodeMoved");
					}
			 	}
			},
			stop : function stop( evt ){
				that.returnFromDraggingNodes(accX, accY);

				ready2move = false;
				gui.controller.reactOnEvent("NODESELECTED");
				if(itWasJustAClick){
					if(ctrl){
						if(!flag) {
							node.highlight(ctrl);
						}
					}
					else {
						gui.controller.reactOnEvent("DESELECT");
						node.highlight2();
					}

					// gui.controller.reactOnEvent("ESCAPE");
				}
				else {
					// gui.controller.reactOnEvent("NodeMoved");
				}
			}
		};
		
		return result;
}
//Koniec pliku dragNodes.js
//Poczatek pliku sideScroller.js
function sideScroller(paper){
	// TODO: dobrze byłoby upgrade'ować to jakoś tak, żeby wywołanie nie miało 20 linijek...
	var multiplier = 0,
		visible = .4,
		animationTime = CFG.slider.animationTime,
		visibleHeight = paper.height,
		checkHeight = function(set){	//określa wysokość przekazanej tablicy obiektów
			if(!set[0]) return 0;
			var min = set[0].getBBox().y, max = 0, bbox;
			$.each(set, function(){
				bbox = this.getBBox();
				if(bbox.y < min) min = bbox.y;
				if(bbox.y + bbox.height > max) max = bbox.y + bbox.height;
			});
			return max - min + 10; //10 dodaję jako margines
		},
		isInvalid = function(set){	//sprawdza, czy tablica obiektów może zostać użyta
			return
				set.some(function(elem){
					return (getType(elem.getBBox) != "function" || getType(elem.translate) != "function")
				});
		},
		scroll = {
			move: function move(set, mult){
				return function(dx, dy){
					var newY = this.oy + dy, altDy, blockDy;
					if(newY >= 0 && newY + this.attr("height") <= visibleHeight){
						this.attr({'y': newY});;
						blockDy = newY - this.lastPos;
						$.each(set, function(){
							this.translate(0, (-1*blockDy/mult));
						});
						this.lastPos = newY;
					}
					else{
						if(newY < 0)
							altDy = this.oy;
						else
							altDy = visibleHeight - this.attr("height");
						// console.log('altDy: '+altDy);
						this.attr({'y': altDy});
						blockDy = altDy - this.lastPos;
						$.each(set, function(){
							this.translate(0, (-1*(blockDy/mult)));
						});
						this.lastPos = altDy;
					}
				}
			},
			start: function start(set){
				return function(){
					this.oy = this.attr("y");
					this.lastPos = this.attr("y");
					$.each(set, function(){
						if(getType(this.prepareToDrag) === "function") this.prepareToDrag();
					});
				}
			},
			stop: function stop(set, mult){
				return function(){
					var dx = this.attr('x') - this.ox,
						dy = this.attr('y') - this.oy;
					$.each(set, function(){
						if(getType(this.returnFromDragging) === "function") this.returnFromDragging(dx/mult, dy/mult);	
					});
				}
			},
			init: function init(){
				this.slider = paper.rect(paper.width-5, 0, 5, visibleHeight*.75, 5)
					.attr({"stroke-width":0, fill:CFG.slider.fillColor, opacity: visible})
					.hide();
				this.set = [];
			},
			//update musi być wywoływany przy każdorazowej zmianie zawartości kanwy, na której siedzi sobie scroll
			update: function update(set){
				var result = false;
				if(!isInvalid(set)){
					this.set = set;
					var setHeight = checkHeight(set);
					multiplier = (visibleHeight / setHeight < 1) ? visibleHeight/setHeight : 1;
					this.slider.attr({height: visibleHeight*multiplier});
					this.slider.drag(this.move(this.set, multiplier), this.start(this.set), this.stop(this.set, multiplier));
					result = true;
				}
				else
					console.log("Invalid object array passed to the addSideScroller() function. There will be NO side scroller for you! :[");
				return result;
			},
			showYourself: function showYourself(){
				if(multiplier !== 1)
					this.slider.show();
			},
			goHide: function goHide(){
				this.slider.hide();
			}
		};
	scroll.init();
	return scroll;
};
//Koniec pliku sideScroller.js
//Poczatek pliku menu.js
	// suppported by Matka Boska Partyzantcka 
	function menu(x, y, addToDiv){
		var view = gui.view; //tymczasowo na potrzeby rozszczepienia pluginĂłw po plikach
		var lang = language[gui.language];
		var mainMenu = {
			przesuwne: 0,
			clicked: false,
			menuContener: $("<div id='menuContener_"+pf+"'  class=mMenuMainContener> </div>").appendTo("#top_menu_"+pf),
			addGroup: function addGroup(label) {
				var that = this;
				$("<div id=" + label +"_"+ pf + " class=mMenuGroup style='  left:" + this.przesuwne + "'>" + ( lang.mainMenu[camelize(label)] || "") + "</div>")
				.appendTo('#menuContener_'+pf)
				.mouseenter(function() {
					if (that.clicked) {						
						$('div.mMenuContener').hide();
						$('div.mMenuSubcontener').hide();
						$('#' + label + '_contener_'+pf).show();
						$('div.mMenuGroup').css('background-image', 'url("/images/dropdown-bg.gif")');
					}
					$('div.mMenuGroup').css('background-image', 'url("/images/dropdown-bg.gif")');
					$('#' + label + "_" + pf).css('background-image', 'url("/images/dropdown-bg-hover.gif")');
				}).mouseleave(function() {
					if (that.clicked == false) $('#' + label).css('background-image', 'url("/images/dropdown-bg.gif")')
				}).click(function() {
					if (that.clicked) {
						$('div.mMenuContener').hide();
						that.clicked = !that.clicked;
					} else {
						gui.view.menuList.getInstance().secure();
						$('#' + label + "_" + pf).css('background-image', 'url("/images/dropdown-bg-hover.gif")');
						$('div.mMenuContener').hide();
						$('#' + label + '_contener_' + pf).show();
						that.clicked = !that.clicked;
					}
				});

				$("<div id=" + label + "_contener_" +pf + " class=mMenuContener style='left:" + that.przesuwne + "px'></div>").appendTo('#menuContener_' +pf).hide();
				that.przesuwne = that.przesuwne + $('#' + label + "_" + pf).width();
			},
			addOption: function addOption(groupLabel, optionLabel, functionOnClick, shortcutString) {

				$("<div id=" + groupLabel + "_" + optionLabel.replace(/ /g, "_") +"_" + pf + " class=mMenuGroupOption style='  left=" + $('#' + groupLabel + "_" + pf).position().left + "'>" + ( lang.mainMenu[camelize(optionLabel)] || "") + " </div>").appendTo('#' + groupLabel + '_contener_' +pf).mouseenter(function() {
					$('div.mMenuSubcontener').hide();
					var y = $('#'+ groupLabel + "_" + optionLabel.replace(/ /g, "_")+"_"+pf).offset().top-$('#menuContener_'+pf).offset().top;
					$('#' + groupLabel + '_' + optionLabel.replace(/ /g, "_") + '_subcontener_' +pf).css("top", y);
					var x = parseInt($('#'+ groupLabel + "_" + optionLabel.replace(/ /g, "_")+"_"+pf).offset().left) - parseInt($('#menuContener_'+pf).offset().left) + parseInt($('#'+ groupLabel + "_" + optionLabel.replace(/ /g, "_")+"_"+pf).css("width")) +10  ;
					$('#' + groupLabel + '_' + optionLabel.replace(/ /g, "_") + '_subcontener_'+pf).css("left", x);
					$('#' + groupLabel + '_' + optionLabel.replace(/ /g, "_")+ '_subcontener_'+pf).show();
					$(this).css('background-image', 'url("/images/dropdown-bg-hover.gif")');
				}).mouseleave(function() {
					$(this).css('background-image', "none");
				}).click(function() {
					$('div.mMenuContener').hide();
					$('div.mMenuGroup').css('background-image', 'url("/images/dropdown-bg.gif")');
					this.clicked = false;
				}).click(functionOnClick);

				jQuery('<span/>', {
					class: 'mMenuShortcutDiv',
					html: "&nbsp;&nbsp;&nbsp;&nbsp" + shortcutString,
				}).appendTo($('#' + groupLabel + '_' + optionLabel.replace(/ /g, "_")+'_'+pf));
			},
			addSubOption: function addSubOption(groupLabel, optionLabel, subOptionLabel, functionOnClick, shortcutString) {
				if ($('#' + groupLabel + '_' + optionLabel.replace(/ /g, "_") + "_subcontener_"+pf).length == 0) {
					$("<div id=" + groupLabel + "_" + optionLabel.replace(/ /g, "_") + "_subcontener_"+pf + "  class=mMenuSubcontener></div>").appendTo('#menuContener_'+pf).hide();

					jQuery('<div/>', {
						html: "&nbsp;&nbsp;&nbsp;&nbsp;" +'<img src="/images/gtk-media-play-ltr.png" width="10"/> ' ,
						css: {
							float: 'right',
							padding: "3px 0px 0px 0px"
						}
					})
					.appendTo($('#'+groupLabel + "_" + optionLabel.replace(/ /g, "_")+"_"+pf));
				}
				$("<div id=" + groupLabel + "_" + optionLabel.replace(/ /g, "_") + "_" + subOptionLabel.replace(/ /g, "_")+"_"+pf + " class=mMenuSubOption  style='   left=" + $('#' + groupLabel+"_"+pf).position().left + "'>" + "" + " </div>")
				.appendTo($('#' + groupLabel + '_' + optionLabel.replace(/ /g, "_") + "_subcontener_"+pf))
				.mouseenter(function() {
					$(this).css('background-image', 'url("/images/dropdown-bg-hover.gif")');
				}).mouseleave(function() {
					$(this).css('background-image', "none");
				}).click(function() {
					$('div.mMenuContener').hide();
					$('div.mMenuSubcontener').hide();
					$('div.mMenuGroup').css('background-image', 'url("/images/dropdown-bg.gif")');
					this.clicked = false;
				}).click(functionOnClick);

				$('#'+groupLabel + "_" + optionLabel.replace(/ /g, "_") + "_" + subOptionLabel.replace(/ /g, "_")+"_"+pf).html(( lang.mainMenu[camelize(subOptionLabel)] || ""));
				
				jQuery('<div/>', {
					html: "<td>&nbsp;&nbsp;&nbsp;" +shortcutString +'</td> </tr>',
					class: 'mMenuShortcutDiv'
				}).appendTo($('#' + groupLabel + '_' + optionLabel.replace(/ /g, "_") + "_" + subOptionLabel.replace(/ /g, "_") + "_" + pf));
			},
			addSeparator: function addSeparator(groupLabel) {
				$("<hr id=" + groupLabel + "_sep_" +pf  + " class = mMenuSeparator ></hr>").appendTo('#' + groupLabel + '_contener_'+pf);
			},
			hideGroup: function hideGroup(groupLabel) {
				$('#' + groupLabel+"_"+pf).hide();
			},
			showGroup: function showGroup(groupLabel) {
				$('#' + groupLabel+"_"+pf).show();
			},
			hideOption: function hideOption(groupLabel, optionLabel) {
				$('#' + groupLabel + '_' + optionLabel.replace(/ /g, "_")+"_"+pf).hide();
			},
			hidesubOption: function hidesubOption(groupLabel, optionLabel, subOptionLabel) {
				$('#' + groupLabel + '_' + optionLabel.replace(/ /g, "_") + "_" + subOptionLabel.replace(/ /g, "_")+"_"+pf).hide();
			},
			showsubOption: function showsubOption(groupLabel, optionLabel, subOptionLabel) {
				$('#' + groupLabel + '_' + optionLabel.replace(/ /g, "_") + "_" + subOptionLabel.replace(/ /g, "_")+"_"+pf).show();
			},
			showOption: function showOption(groupLabel, optionLabel) {
				$('#' + groupLabel + '_' + optionLabel.replace(/ /g, "_")+"_"+pf).show();
			},
			close: function close(){
				this.clicked = false;
				$('div.mMenuContener').hide();
				$('div.mMenuSubcontener').hide();
				$('div.mMenuGroup').css('background-image', 'url("/images/dropdown-bg.gif")');
			},
			init: function init(){
				// var outputView = gui.view;

				var x = gui.view.columnParams.leftCol.width;
				var width = gui.view.columnParams.top_menu.width - x;

				$("#menuContener_"+pf).css({
					top : 0,
					left : x,
					width : width
				});

				this.addGroup("File");
				this.addGroup("Edit");
				this.addGroup("Graph");
				this.addGroup("View");
				this.addGroup("Help");
				this.addOption("File", "New Node" , function(){}, "");
				this.addSeparator("File");
				this.addOption("File", "Load", function(){}, "");
				this.addSubOption("File","Load","From DB", function(){alert("Not implemented yet!");},"" );
				this.addSubOption("File","Load","From File", function(){alert("Not implemented yet!");},"" );
				this.addOption("File", "Save", function(){}, "");
				this.addSubOption("File","Save","To DB", function(){alert("Not implemented yet!");},"" );
				this.addSubOption("File","Save","To File", function(){alert("Not implemented yet!");},"" );
				this.addSubOption("File","Save","To DB and Deploy", function(){alert("Not implemented yet!");},"" );
				this.addSubOption("File", "New Node", "Service node", function(){
					var nodeType="Service";
				var label = prompt(language[gui.language].alerts.addLabelNewNode);
							if(label) gui.controller.reactOnEvent("AddBlankNode", {nodeLabel:label, nodeType:nodeType}); }, "CTRL+N+S");
				this.addSubOption("File", "New Node", "Functionality node", function(){ 		var nodeType="Functionality";
					var label = prompt(language[gui.language].alerts.addLabelNewNode);
							if(label) gui.controller.reactOnEvent("AddBlankNode", {nodeLabel:label, nodeType:nodeType}); }, "CTRL+N+F");
				this.addSubOption("File", "New Node", "Mediator node", function(){ 		var nodeType="Mediator";
					var label = prompt(language[gui.language].alerts.addLabelNewNode);
							if(label) gui.controller.reactOnEvent("AddBlankNode", {nodeLabel:label, nodeType:nodeType}); }, "CTRL+N+F");
				
				this.addSubOption("File","New Node","Start Stop",function(){gui.controller.reactOnEvent("ADDSTARTSTOPAUTOMATICALLY");},"CTRL+S+A");
				this.addOption("Graph", "Validate", function(){alert("Not implemented yet!");}, "");
				this.addOption("Graph", "Test", function(){alert("Not implemented yet!");}, "");
				this.addOption("View", "Control Flow", function(){gui.controller.reactOnEvent("SwitchMode", {mode: "CF"});}, "");
				this.addOption("View", "Data Flow" , function(){gui.controller.reactOnEvent("SwitchMode", {mode: "DF"});}, "");
				this.addSeparator("View");
				this.addOption("View", "Console" , function(){gui.logger.open()}, "");
				this.addOption("Edit","Undo",function(){},"");
				this.addSubOption("Edit", "Undo", "One step", function(){alert("Not implemented yet!");}, "CTRL+Z");
				this.addSubOption("Edit", "Undo", "All", function(){alert("Not implemented yet!");}, "CTRL+Z+A");
				this.addOption("Edit","Redo",function(){},"");
				this.addSubOption("Edit", "Redo", "One step", function(){alert("Not implemented yet!");}, "CTRL+Z");
				this.addSubOption("Edit", "Redo", "All", function(){alert("Not implemented yet!");}, "CTRL+Z+A");
				this.addSeparator("Edit");
				this.addOption("Edit","Input Variables",function(){gui.view.form.editInputVariables();},"");
				this.addOption("Edit","Non functional parameters",function(){gui.view.form.editGlobalNonFunctionalParameters();},"");
				this.addSeparator("Edit")
				this.addOption("Edit","Clear",function(){var clearer = confirm("Czy na pewno?" ); if(clearer)gui.controller.reactOnEvent("CLEARGRAPH");},"");
				this.addOption("Help","Documentation",function(){alert("In this platel no one will help you, even Volodia.")},"");
				this.addSeparator("Help");
				this.addOption("Help","About",function(){alert(" Nothing to say about this.")},"");

				// jsonFormatter(gui, 1, 1);
				gui.view.menuList.getInstance().push(this);
			}
		};

		return mainMenu;	
	};
//Koniec pliku menu.js
//Poczatek pliku contextMenu.js

	function contextMenu(listenedObjId, guiView){
		/* ContextMenu 2.2 (Błażej)
			* SUBMITTED: 06.09.2012
			* REQUIRED PARAMS: 
			* - listenedObjId (id of object to witch we attach menu)
			* - guiView (GUI View object)
			* OUTPUT:
			* - object
			* -> open (function([mouse event]) displaying menu)
			* -> close (function() hiding menu)
			* -> isOpen (function() returning if menu is visible)
			* -> addOption (function(label, invoked event name, if display title in submenu) creating menu option)
			* -> addSeparator (function() adding separator to current level of menu)
			* -> getOption (function(label) returning option with specified label at currrent level of option tree)
			* -> refresh(function(listenedObject) changing listened object)
		*/

		//structure holder object
		function option(id, label, invokedEvent, eventObject, display, level){
			this.id = id;
			this.label = label;
			this.invokedEvent = invokedEvent;
			this.eventObject = eventObject;
			this.suboptions = [];
			this.display = display || false;
			this.level = level || 0;
			this.addOption = function(label, invokedEvent, eventObject, display){
				var l = label || 'hr'+Math.floor(Math.random()*1000000);
				label = label || '<hr style="color: #000; background-color: #000; height: 1px; border: 0px; margin: 2px 0px 2px 0px;"/>';
				var nO = new option(this.id+'_'+l, label, invokedEvent, eventObject, display, this.level+1);
				this.suboptions.push(nO);
				return nO;
			}
			this.addSeparator = function(){
				this.addOption();
			}
			this.getOption = function(label){
				for(i in this.suboptions){
					var option = this.suboptions[i];
					if(option.label == label){
						return option;
					}
				}
			}
		}
		//private variables
		var caller,
			root = new option(listenedObjId+'CM', 'menuRoot', null, null, false, 0),
			width = $('body').width(),
			margin = 10,
			opened = [];
		//private functions
		var createMenu = function(option, x, y){
			var txt = '';
			if(option.display){
				txt += option.label;
			}
			var div = jQuery('<div/>', {
				id: option.id,
				visible: true,
				css: {
					border: "1px solid #000",	
					position: 'absolute',
					display: 'block',
					'background-color': 'rgba(255, 255, 255, 0.95)',
					top: y,
					left: x,
					'text-align': 'left',
					padding: '6px',
					cursor: 'pointer',
					'box-shadow': '2px 2px 3px rgba(0, 0, 0, 0.2)'
				}				
			});
			div.append(txt);
			div.level = option.level;
			opened.push(div);
			for(var i in option.suboptions){
				var opt = option.suboptions[i];
				var subDiv = document.createElement('div');
				subDiv.id = opt.id;
				subDiv.innerHTML = opt.label;
				subDiv.visible = true;		
				subDiv.level = opt.level;
				if(opt.suboptions.length>0){
					subDiv.innerHTML += '&nbsp;<img src="arrow.gif" style="margin-bottom: -2px;"/>';
				}
				div.append(subDiv);
				attachListeners(div, subDiv, opt);
			}
			$('body').append(div);
			if($(div).offset().left+$(div).width()>width){
				$(div).css('display', 'none');
				$(div).css('left', '0px');
				$(div).css('left', (width-$(div).width()-margin)+'px');
				$(div).css('display', 'block');
			}
			return div;
		};
		var attachListeners = function(div, subDiv, opt){
			$(subDiv).mousedown(function(){
				// console.log(typeof opt.invokedEvent);
				if(opt.invokedEvent){
					if(typeof opt.invokedEvent == 'function'){
						opt.invokedEvent(opt.eventObject);
					}else if(typeof opt.invokedEvent == 'string'){
						gui.controller.reactOnEvent(opt.invokedEvent, opt.eventObject);
					}
				}
				menu.close();		
			});
			$(subDiv).mouseover(function(){
				if(opened.length>1){
					while(opened.length>subDiv.level){
						opened.pop().remove();
					}
				}
				if(opt.suboptions.length>0){
					var x = $(div).offset().left+$(div).width()+margin;
					var newMenu = createMenu(opt, x, $(subDiv).offset().top-3);
					$(newMenu).css('display', 'none');
					$(newMenu).css('left', '0px');
					if(width<$(div).offset().left+$(div).width()+margin+$(newMenu).width()){
						x = $(div).offset().left-margin-$(newMenu).width();
					}
					$(newMenu).css('left', x+'px');
					$(newMenu).css('display', 'block');
				}
			});
			$(subDiv).hover(
				function () {
					$(this).css("color","red");
				},
				function () {
					$(this).css("color","black");
				});
		};
		var refresh = function(listenedObjId){
			//event listeners for id or raphael set
			if(typeof listenedObjId == 'string'){
				var caller = document.getElementById(listenedObjId);
				caller.oncontextmenu = function(event){
					return checkNOpen(event);
				}
			}else{
				var caller = listenedObjId;
				if(!caller.items){
					$(caller.node).bind("contextmenu", function(event){
						return checkNOpen(event);
					});
				}else{
					$.each(caller.items, function(){
						$(this.node).bind("contextmenu", function(event){
							return checkNOpen(event);
						});
					});
				}
			}
		};
		var that = this;
		var menu = {
			//public functions
			addOption: function(label, invokedEvent, eventObject){
				return root.addOption(label, invokedEvent, eventObject);
			},
			getOption: function(label){
				return root.getOption(label);
			},
			addSeparator: function(){
				root.addSeparator();
			},
			open: function(event){
				if(!that.menuList.getInstance().isOpen() && opened.length == 0){
					event = event || window.event;
					createMenu(root, event.clientX, event.clientY);
					that.menuList.getInstance().signalOpened();
				}
			},
			close: function(){
				while(opened.length!=0){
					opened.pop().remove();
				}
				that.menuList.getInstance().signalClosed();
			},
			isOpen: function(){
				if(document.getElementById(root.id)){
					return true;
				}
				return false;
			},
			refresh: refresh
		}
		//universal open with event
		var checkNOpen = function(event){
			event = event || window.event;
			if(event.button == 2){
				menu.open(event);
			}
			return false;
		};
		//setting listeners and callerObj
		refresh(listenedObjId);
		//pushing into menu list
		guiView.menuList.getInstance().push(menu);
		//object return
		return menu;
	};
//Koniec pliku contextMenu.js
//Poczatek pliku tooltipper.js
	function tooltipper() {
		var opacity = .95,
			tooltip = {
				tipContener : undefined,
				tipTitle : undefined,
				tipText : undefined,
				visible: false,
				init: function init() {
					var x = 10,
						y = 10,
						win = $(window)
					;

					x = ( x + this.width > win.width() ? win.width() - 1.1 * this.width : x );
					y = ( y + this.height > win.height() ? win.height() - 1.1 * this.height : y );
					
					$("<div id='tipContener' style='opacity:"+opacity+";position: absolute; top:" + y + "px; left:"+ x +"px; width:auto;height:auto; background-color: #666; color: black; '> </div>").appendTo("body");
					$("<div id='tipTitle' style='font-size: 14px;padding:5px 5px 5px 5px;opacity:"+opacity+";border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:gray;border-radius: 5px 5px 0px 0px; text-align: center; background-color: #666; color: #fff; font-weight: bold;'> </div>").appendTo("#tipContener");
					$("<div id='tipText' style='font-size: 12px;opacity:"+opacity+";border-radius: 0px 0px 5px 5px; padding: 5px 5px 15px 5px; background-color: #666; font-weight: normal; text-align: left; color: white;'> </div>").appendTo("#tipContener");

					this.tipContener = $("#tipContener");
					this.tipTitle = $("#tipTitle");
					this.tipText = $("#tipText");

					this.tipContener.hide();
				},
				isOpen: function isOpen() {
					return this.visible;
				},
				openHelper: function openHelper(title, text, x, y) {
					this.tipContener.show();
					this.visible = true;
				},
				open: function open(title, text, x, y, evt) {
					// console.log(title, text, x, y, evt)
					// console.log("open")
					if (title && text) {
						this.tipTitle.html(title);
						this.tipText.html(text);

						if (x) this.tipContener.css("left", x);
						if (y) this.tipContener.css("top", y);

						this.tipContener.css("height", (this.tipTitle.height() + this.tipText.height()) + "px");

						if (evt.shiftKey)
							this.openHelper(this.title, this.text, this.x, this.y);
						else 
							this.tOut = setTimeout((function() { this.openHelper(this.title, this.text, this.x, this.y); }).bind(this), 500);
					}
				},
				close: function close() {
					clearTimeout(this.tOut);
					this.tipContener.hide();
					this.visible = false;
				}
			}
		;

		tooltip.init();
		tooltip.init = undefined;

		return tooltip;
	};
//Koniec pliku tooltipper.js
//Poczatek pliku preloader.js
	function preloader(divId){
		var $divElem = $("#"+divId+"_"+pf),
			position = $divElem.offset(),
			top = parseInt(position.top),
			left = parseInt(position.left),
			width = parseInt($divElem.width()+2),
			height = parseInt($divElem.height()),
			imgTop = parseInt(height/2-6),
			imgLeft = parseInt(width/2-55),
			temp = {
				top: top,
				left: left,
				width: width,
				height: height,
				imgTop: imgTop,
				imgLeft: imgLeft,
				$preloader: undefined,

				cover: function cover(){
					this.$preloader.show();
				},
				uncover: function uncover(){
					this.$preloader.hide();
				},
				init: function init(){
					var newDiv = "<div id=\"preloader_" + pf 
						+ "\" style=\"position:absolute; top:" + this.top + "px; left:" 
						+ this.left + "px; width:" + this.width + "px; height:"+ this.height 
						+ "px; background-color: black; opacity: .5; z-index: 5\">" 
						+ "<img src=\"/images/preloader.gif\" style=\" position:relative; top:" 
						+ this.imgTop + "px; left:" + this.imgLeft + "px\"></img></div>";

					$divElem.parent().prepend(newDiv);
					this.$preloader = $("#preloader_"+pf);
					this.init = undefined;
				}
		};

		temp.init();
		return temp;
	};
//Koniec pliku preloader.js
//Poczatek pliku blankNode.js
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
//Koniec pliku blankNode.js
//Poczatek pliku bottomBar.js
	function bottomBar(paper){
		var top = (paper.height*.95 >= 250) ? paper.height*.95 : 250,
			left = 0,
			width = paper.width,
			height = paper.height*.15,
			canvas = $(paper.canvas),
			offsetX = parseInt(canvas.offset().left) + parseInt(canvas.css("border-top-width")),
			offsetY = parseInt(canvas.offset().top) + parseInt(canvas.css("border-left-width")),

			offset = 20,
			visible = .2,
			invisible = 0,
			result = {
				top: (top < CFG.bottomBar.maxHeight) ? top : CFG.bottomBar.maxHeight, 
				left: left,
				width: width,
				height: height,

				offset: offset,
				visible: visible,
				invisible: invisible,
				isVisible: false,
				animationTime: CFG.bottomBar.animationTime,
				groups: [],
				separators: [],
				set: [],
				pathString: function pathString(x, y){
					return("M " + x + " " + y + " l 20 0 l -10 -10 z");
				},
				createBar: function createBar(x, y, width, height){
					var that = this;
					
					this.bar = paper.rect(x, y, width, height)
						.attr({fill:CFG.bottomBar.fillColor, opacity: this.invisible})
						.mouseover(function(){
							that.isVisible = true;

							that.bar.animate({y: paper.height*.85, opacity: visible},that.animationTime);
							that.triangle1.animate({opacity: invisible}, that.animationTime);
							that.triangle2.animate({opacity: invisible}, that.animationTime);
							$.each(that.groups, function(){
								if(this.isVisible){
									this.graphic.show().animate({opacity: visible}, that.animationTime);
									$.each(this.buttons, function(){
										if(this.isVisible){
											this.graphic[0].show().animate({opacity: visible}, that.animationTime);
											this.graphic[1].show().animate({opacity: visible}, that.animationTime);
											this.graphic[2].show();
										}
									});
								}
							});
							$.each(that.separators, function(){
								this.show().animate({opacity: visible}, that.animationTime);
							});
							return this;
						})
						.mouseout(function(evt,x,y){
							var b = that.bar.getBBox();

							if(! that.bar.isPointInside(x-offsetX, y - offsetY)){

								that.isVisible = true;

								if(! that.bar.isPointInside(x-offsetX, y - offsetY)){

									that.bar.animate({y: paper.height*.95, opacity: invisible}, that.animationTime);
									that.triangle1.animate({opacity: visible}, that.animationTime);
									that.triangle2.animate({opacity: visible}, that.animationTime);
									$.each(that.groups, function(){
										this.graphic.animate({opacity: that.invisible}, that.animationTime).hide();
										$.each(this.buttons, function(){
											this.graphic[0].animate({opacity: invisible}, that.animationTime).hide();
											this.graphic[1].animate({opacity: invisible}, that.animationTime).hide();
											this.graphic[2].hide();
										});
									});
									$.each(that.separators, function(){
										this.animate({opacity: invisible}, that.animationTime).hide();
									});
								}
								return this;
							}
						});
				},
				createTriangle: function createTriangle(path){
					var tr = paper.path(path);
					tr.attr({fill:CFG.bottomBar.fillColor, opacity: visible});
					return tr;
				},
				addGroup: function addGroup(label){
					var that = this,
						margin = 10,
						result = {
							label: label,
							buttons: [],
							margin: margin,
							x: 10, y: paper.height*.85 + margin,
							width: 25, 
							height: this.height - 2*margin,
							isVisible: true,
							addButton: function addButton(button){
								this.buttons.push(button);
								this.resizeAndRelocate();
								that.generalFontReset();
								that.relocate();
							},
							toString: function toString(){
								return "bottomBar_Group object";
							},
							hideButton: function hideButton(label){
								$.each(this.buttons, function(){
									if(this.label.toUpperCase()===label.toUpperCase()) 
										this.hideThisButton();
								});
								if(this.areSomeButtonsVisible()){
									that.generalFontReset();
									this.resizeAndRelocate();
									that.relocate();
								}
								else
									this.hideGroup();
							},
							showButton: function showButton(label){
								$.each(this.buttons, function(){
									if(this.label.toUpperCase()===label.toUpperCase()) 
										this.showThisButton();
								});
								if(this.isVisible===false) this.showOnlyGroup();
								this.resizeAndRelocate();
								that.relocate();
							},
							areSomeButtonsVisible: function areSomeButtonsVisible(){
								return 
									this.buttons.some(function(elem){
										return elem.isVisible != false;
									});
							},
							hideGroup: function hideGroup(){
								this.isVisible = false;
								this.graphic.hide();
								$.each(this.buttons, function(){
									this.hideThisButton();
								});
								that.generalFontReset();
							},
							showGroup: function showGroup(){
								this.isVisible = true;
								this.graphic.show();
								$.each(this.buttons, function(){
									this.showThisButton();
								});
								that.generalFontReset();
							},
							showOnlyGroup: function showOnlyGroup(){
								this.isVisible = true;
								this.graphic.show();
								that.generalFontReset();
							},
							createGraphic: function createGraphic(){
								var temp, bbox;
								temp = paper.text(0, this.y+5, language[gui.language].bottombar.group[camelize(this.label)])
								.attr({"font-size":CFG.bottomBar.groupFontSize, fill:CFG.bottomBar.groupFontColor, opacity: 0});
								bbox = temp.getBBox();
								temp.attr("x", this.x+bbox.width/2+this.margin);
								return temp;
							},
							moveGroupToX: function moveGroupToX(x){
								//przesunięcie do punktu (x, y), nie o wektor [x, y], y = const.
								var dx = x - this.x, ox;
								this.x = x;
								ox = this.graphic.attr("x");
								this.graphic.attr({"x": ox+dx});
								$.each(this.buttons, function(){
									this.moveButtonByX(dx);
								});
							},
							resizeAndRelocate: function resizeAndRelocate(){
								var sum = margin, groupX = this.x;
								$.each(this.buttons, function(){
									if(this.isVisible===true){
										this.moveButtonToX(sum + groupX);
										sum += this.width + margin;
									}
								});
								this.width = sum;
							}
						};

					result.graphic = result.createGraphic();
					this.groups.push(result);
					this.addSeparator(result.x+result.width, result.y, result.height);
					this.relocate();
					return result;
				},
				getGroup: function getGroup(groupLabel){
					var result = false;
					$.each(this.groups, function(){
						if(this.label.toUpperCase()===groupLabel.toUpperCase()) {
							result = this;
						}
					});
					return result;
				},
				addOption: function addOption(groupLabel, label, click, description){
					var result = {
						label: label,
						groupLabel: groupLabel,
						description: description,
						fontsize: CFG.bottomBar.buttonDefaultFontSize,
						x: 0, y: paper.height*.85 + 15,
						width: 0, height: 0,
						isVisible: true,
						moveButtonToX: function moveButtonToX(x){
							var ox, dx = x - this.x;
							this.x = x;
							$.each(this.graphic, function(){
								ox = this.attr("x");
								this.attr({"x": ox+dx});
							});
						},
						toString: function toString(){
							return "bottomBar_Option object";
						},
						moveButtonByX: function moveButtonByX(x){
							var ox;
							this.x += x;
							$.each(this.graphic, function(){
								ox = this.attr("x");
								this.attr({"x": ox+x});
							});
						},
						moveButtonByY: function moveButtonByY(y){
							var oy;
							this.y += y;
							$.each(this.graphic, function(){
								oy = this.attr("y");
								this.attr({"y": oy+y});
							});
						},
						hideThisButton: function hideThisButton(){
							this.isVisible = false;
							$.each(this.graphic, function(){
								this.hide();
							});
						},
						showThisButton: function showThisButton(){
							this.isVisible = true;
							$.each(this.graphic, function(){
								this.show();
							});
						},
						resize: function resize(w, h){
							this.width = w;
							this.height = h;
							this.graphic[0].attr({"width": w, "height": h});
							this.graphic[2].attr({"width": w, "height": h});
						},
						fontsizeChange: function fontsizeChange(arg){
							//arg nieobowiÄ…zkowy, jeÅ›li nie zostanie podany, czcionka zmniejszy siÄ™ o 2px 
							this.fontsize += (arg) ? arg : -2;
							this.recreateGraphic();
						},
						fontsizeReset: function fontsizeReset(){
							this.fontsize = 25;
							this.recreateGraphic();
						},
						createGraphic: function createGraphic(){
							var temp1, temp2, cover, bbox, set, labelX, labelY;
							temp1 = paper.text(0, 0, language[gui.language].bottombar.options[camelize(this.label)])
							.attr({
								"font-size" : this.fontsize+"px",
								"font-weight" : "bold",
								"stroke-width" : "1px",
								"stroke-linejoin" : "round",
								"stroke-linecap" : "butt",
								stroke : CFG.bottomBar.buttonDefaultStrokeColor,
								fill : CFG.bottomBar.buttonFontColor,
								opacity : invisible
							});
							bbox = temp1.getBBox();
							this.width = bbox.width + 10;
							this.height = bbox.height + 10;
							temp2 = paper.rect(this.x, this.y, this.width, this.height, 3).attr({fill:CFG.bottomBar.buttonFillColor, opacity:invisible});
							labelX = this.x + this.width/2; labelY = this.y + this.height/2;
							temp1.attr({"x": labelX, "y": labelY});
							cover = paper.rect(this.x, this.y, this.width, this.height, 3)
								.attr({"cursor": "pointer", fill: "red", opacity: 0.0})
								.mouseover(function(txt){
									return (function(){
										txt.attr("stroke", CFG.bottomBar.buttonHighlightStrokeColor);
									});
								}(temp1))
								.mouseout(function(txt){
									return (function(){
										txt.attr("stroke", CFG.bottomBar.buttonDefaultStrokeColor);
									});
								}(temp1))
								.toFront()
								.hide();
							set = [];
							set.push(temp2, temp1, cover);
							return set;
						},
						recreateGraphic: function recreateGraphic(){
							var bbox, labelX, labelY;
							this.graphic[1].attr({"font-size": this.fontsize+"px"});
							bbox = this.graphic[1].getBBox();
							this.width = bbox.width + 10;
							this.height = bbox.height + 10;
							this.graphic[0].attr({"width": this.width, "height": this.height});
							this.graphic[2].attr({"width": this.width, "height": this.height});
							labelX = this.x + this.width/2; labelY = this.y + this.height/2;
							this.graphic[1].attr({"x": labelX, "y": labelY});
						}
					};
					result.graphic = result.createGraphic();
					result.graphic[2].click(click);
					var group = this.getGroup(result.groupLabel);
					result.moveButtonByY(result.height/4);
					group.addButton(result);
					return result;
				},
				addSeparator: function addSeparator(x, y, h){
					var sep = paper.rect(x, y, 1, h).attr({"stroke-width":"0", fill:CFG.bottomBar.fillColor, opacity:invisible});
					this.separators.push(sep);
					return sep;
				},
				relocate: function relocate(){
					var sum = 10, that = this;
					//fix dla buga powodującego powstawanie niezniszczalnych separatorów, jeżeli
					//użytkownik ma otwarty pasek podczas hide'owania czegoś
					//pytanie, czy ten fix jest potrzebny - czy ten bug ma szanse wystąpić?
					$.each(this.separators, function(){
						this.hide();
					});

					this.separators = [];
					$.each(this.groups, function(){
						if(this.isVisible){
							this.moveGroupToX(sum);
							//to jest ciut partyzanckie, ale jak inaczej ominąć pierwszy separator?
							//czy też może chcemy pierwszy lub ostatni separator? ale po co?
							if(sum>10)
								that.addSeparator(this.x, this.y, this.height);
							sum += this.width;
						}
					});

					if(sum >= paper.width){
						this.generalResize();
					}

					if(this.isVisible)
						$.each(this.separators, function(){
							this.show().animate({opacity: visible}, that.animationTime);
						});
				},
				generalResize: function generalResize(arg){
					//arg: o ile pikseli zwiększyć/zmniejszyć czcionkę w labelach buttonów, non-obligatory
					$.each(this.groups, function(){
						$.each(this.buttons, function(){
							this.fontsizeChange(arg);
						});
						this.resizeAndRelocate();
					});
					this.relocate();
				},
				generalFontReset: function generalFontReset(){
					$.each(this.groups, function(){
						$.each(this.buttons, function(){
							this.fontsizeReset();
						});
						this.resizeAndRelocate();
					});
					this.relocate();
				}
			};

		result.triangle1 = result.createTriangle(
			result.pathString(
				parseInt(left+offset),
				parseInt(top+offset)
			)
		);
		result.triangle2 = result.createTriangle(
			result.pathString(
				parseInt(width-2*offset),
				parseInt(top+offset)
			)
		);
		
		var switchMode = function switchMode(arg){
			return (function(){
				gui.controller.reactOnEvent("SwitchMode", {mode: arg})
			});
		};
		var startStop = function startStop(){
			gui.controller.reactOnEvent("AddStartStopAutomatically");
		};
		var editInputVariables = function editInputVariables(){
			gui.view.form.editInputVariables();
		};
		var editNonFunctionalParameters = function editNonFunctionalParameters(){
			gui.view.form.editGlobalNonFunctionalParameters();
		};
		var save = function save(){
			gui.controller.reactOnEvent("SAVE");
		}

		result.invisibleBar = result.createBar(left, top, width, height);
		result.addGroup("Views");
		result.addOption("Views", "CF", switchMode("CF"), "ControlFlow");
		result.addOption("Views", "DF", switchMode("DF"), "DataFlow");
		result.addGroup("Edit");
		// if(CFG.saveUrl)
			result.addOption("Edit", "Save", save, "SaveGraph");
		result.addOption("Edit", "StartStop", startStop, "Insert Start/Stop");
		result.addGroup("Graph Options");
		result.addOption("Graph Options", "Input Variables", editInputVariables, "editInputVariables");
		result.addOption("Graph Options", "NonFunctionalParameters", editNonFunctionalParameters, "editNonFunctionalParameters");

		result.set.push(result.invisibleBar, result.triangle1, result.triangle2);

		return result;
	};
//Koniec pliku bottomBar.js
//Poczatek pliku form.js
function form() {
// tutaj ustawiam LANG na forms
	var langForms = language[gui.language].forms;
	var langAlerts = language[gui.language].alerts;
	// isPresent, unique, isNumber, isString, isUrl
	// jeśli coś jest typu enum (np.: controlType = #start|#end|#sonditionStart|#conditionEnd), to tylko walidacja isPresent
	// co jeśli coś ma być prezent pod warunkiem, że coś inne = np. "service"? - na razie bez takich walidacji
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
				values:["eq", "gt", "less", "leq", "geq"]
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
				values:["eq", "gt", "less", "leq", "geq"]
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
		{
			tabLabel:"condition main",
			tabId: "ifMainTab",
			formId: "ifMainForm",
			fields: [{
				label: "ifVar",
				id: "f_ifMainTab_ifVar",
				inputType: "select",
				validation: function(){},
				values:[]
			},
			{
				label: "ifRel",
				id: "f_ifMainTab_ifRel",
				inputType: "select",
				validation: function(){},
				values:["eq", "gt", "leq", "less", "geq"]
			},
			{
				label: "ifVar2",
				id: "f_ifMainTab_ifVar2",
				inputType: "textBox",
				validation: function(){},
				values:[]
			},
			{
				label: "then",
				id: "f_ifMainTab_then",
				inputType: "select",
				validation: function(){},
				values:[]	
				// zawartość tych selectów będzie generowana dynamicznie
				//w oparciu o bieżącą zawartość grafu
			},
			{
				label: "else",
				id: "f_ifMainTab_else",
				inputType: "select",
				validation: function(){},
				values:[]	
				// zawartość tych selectów będzie generowana dynamicznie
				//w oparciu o bieżącą zawartość grafu
			}
		]}
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
		condition:{
			if:{},
			then:"",
			else:""
		},
		sources:[],
		targets:[]
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
		"#emulationTab_"+pf,
		"#ifMainTab_"+pf
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
	$("#tabs-7_" + pf).prepend(formGenerator(gui.language, pf, formJSON[8]));	

	$("#form_" + pf).dialog({
		autoOpen: false,
		modal: true,
		height: CFG.forms.mainFormHeight,
		width: CFG.forms.mainFormWidth
	});
	
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
			console.log(node)
			if(node.nodeType.toLowerCase()==='control'&&node.controlType.toLowerCase()==='#conditionend')
				alert(langForms.noForm);
			else {
				var titleText;
				//CO Z TYMI LABELAMI?!
				if(!node.isBlank) titleText = langForms.viewing + node.nodeType + langForms.typeNode;// +  langForms.labeled + node.nodeLabel;
				else titleText = langForms.createA + node.nodeType + langForms.typeNode + langForms.labeled + node.nodeLabel; 
				this.clearErrors();
				this.cleanForm(true);
				$('#ui-dialog-title-form_'+pf).text(titleText);
				$( "#f_mainTab_label_" + pf ).val(node.nodeLabel);
				$( "#f_mainTab_controlType_" + pf ).val(node.controlType).attr({disabled : "disable"});
				this.resultJSON.controlType = node.controlType;
				if(node.nodeType.toLowerCase() == "emulationservice" && node.emulation){
					$( "#f_emulationTab_id_" + pf ).val(node.emulation.id || "");
					$( "#f_emulationTab_vectors_" + pf ).val(node.emulation.vectors || "");
				}
				this.resultJSON.nodeId = node.nodeId;
				$( "#f_mainTab_description_" + pf ).val(node.functionalDescription.description);
				$( "#f_physicalDescriptionTab_serviceName_" + pf ).val(node.physicalDescription.serviceName).addClass("longTextfield");
				$( "#f_physicalDescriptionTab_serviceGlobalId_" + pf ).val(node.physicalDescription.serviceGlobalId).addClass("longTextfield");
				$( "#f_physicalDescriptionTab_address_" + pf ).val(node.physicalDescription.address).addClass("longTextfield");
				$( "#f_physicalDescriptionTab_operation_" + pf ).val(node.physicalDescription.operation).addClass("longTextfield");

				this.resultJSON.condition.conditionId = node.condition.conditionId;
				this.resultJSON.condition.if.value = node.condition.if.value;
				this.resultJSON.condition.if.variable = node.condition.if.variable;
				this.resultJSON.condition.if.relation = node.condition.if.relation;
				this.resultJSON.condition.then = node.condition.then;
				this.resultJSON.condition.else = node.condition.else;
				this.resultJSON.sources = node.sources;
				this.resultJSON.targets = node.targets;

				this.appendList(node.functionalDescription.serviceClasses, "serviceClasses");
				this.appendList(node.functionalDescription.metaKeywords, "metaKeywords");
				console.log(node.functionalDescription.inputs)
				this.appendIO(node.functionalDescription.inputs, "inputs");
				this.appendIO(node.functionalDescription.outputs, "outputs");
				this.appendNonFuncDesc(node.nonFunctionalDescription);

				this.adjustForm(node.nodeType, node.controlType);
				this.resultJSON.nodeId = node.nodeId;
				this.resultJSON.nodeType = node.nodeType;
				$( "#form_" + pf ).dialog( "open" );
			}
		},
		adjustForm: function adjustForm(nodeType, controlType){
			//żeby nie powtarzały się fragmenty kodu - przyjmujemy "functionality" za default i ew. edytujemy od tego miejsca
			$( 'label[for="f_mainTab_controlType_' + pf + '"], #f_mainTab_controlType_' + pf + ', #f_mainTab_controlType_validation_' + pf ).hide();
			$('#tabs-1_' + pf).show(); $('#mainTab_' + pf).removeClass("ui-tabs-hide");
			$('#tabs-2_' + pf).hide(); $('#physicalDescriptionTab_' + pf).addClass("ui-tabs-hide");
			$('#tabs-3_' + pf).show(); $('#inputsTab_' + pf).removeClass("ui-tabs-hide");
			$('#tabs-4_' + pf).show(); $('#outputsTab_' + pf).removeClass("ui-tabs-hide");
			$('#tabs-5_' + pf).show(); $('#nonFunctionalDescriptionTab_' + pf).removeClass("ui-tabs-hide");
			$('#tabs-6_' + pf).hide(); $('#emulationTab_' + pf).addClass("ui-tabs-hide");
			$('#tabs-7_' + pf).hide(); $('#ifMainTab_' + pf).addClass("ui-tabs-hide");
			$('#f_inputsTab_nextButton_' + pf).show();
			$('#f_outputsTab_nextButton_' + pf).show();
			$('#f_nonFunctionalDescriptionTab_nextButton_' + pf).hide();
			$('label[for="f_mainTab_serviceClass_' + pf + '"], #f_mainTab_serviceClass_' + pf).show();
			$('#f_mainTab_serviceClass_addButton_' + pf).show();
			switch(nodeType.toLowerCase()){
				case "control" : 
					$('#tabs-5_' + pf).hide(); $('#nonFunctionalDescriptionTab_' + pf).addClass("ui-tabs-hide");
					if(controlType.toLowerCase()=='#conditionstart'){
						$('#tabs-1_' + pf).hide(); $('#mainTab_' + pf).addClass("ui-tabs-hide");
						$('#tabs-3_' + pf).hide(); $('#inputsTab_' + pf).addClass("ui-tabs-hide");
						$('#tabs-4_' + pf).hide(); $('#outputsTab_' + pf).addClass("ui-tabs-hide");
						$('#tabs-7_' + pf).show(); $('#ifMainTab_' + pf).removeClass("ui-tabs-hide");
						$tabs.tabs('select', 6);
						this.fillSelects();
					}else{
						if(controlType.toLowerCase()=='#start'){
							$('#tabs-3_' + pf).hide(); $('#inputsTab_' + pf).addClass("ui-tabs-hide");
							$('#f_outputsTab_nextButton_' + pf).hide();
						}else{
							$('#tabs-4_' + pf).hide(); $('#outputsTab_' + pf).addClass("ui-tabs-hide");
							$('#f_inputsTab_nextButton_' + pf).hide();
						}
						$( 'label[for="f_mainTab_controlType_' + pf + '"], #f_mainTab_controlType_' + pf + ', #f_mainTab_controlType_validation_' + pf ).show();
						$('label[for="f_mainTab_serviceClass_' + pf + '"], #f_mainTab_serviceClass_' + pf).hide();
						$('#f_mainTab_serviceClass_addButton_' + pf).hide();
					}
					break;
				case "functionality" :
					break;	//bez zmian
				case "emulationservice" : 
					$('#emulationTab_' + pf).removeClass("ui-tabs-hide"); $('#tabs-6_' + pf).show();
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
		fillSelects: function fillSelects(){
			var inputCount = 0, id = this.resultJSON.nodeId, that = this;
			
			$("#f_ifMainTab_then_" + pf).append("<option value=''></option>");
			$("#f_ifMainTab_else_" + pf).append("<option value=''></option>");
			$.each(gui.controller.current_graphData.nodes, function(){
				if(this.nodeId && this.nodeType.toLowerCase()!=='control'){
					$("#f_ifMainTab_then_" + pf).append("<option value='" + this.nodeId + "'>"+this.nodeLabel+"</option>");
					$("#f_ifMainTab_else_" + pf).append("<option value='" + this.nodeId + "'>"+this.nodeLabel+"</option>");
				} else if(this.controlType.toLowerCase() === "#conditionend" && that.resultJSON.condition.conditionId == this.condition.conditionId){
					$("#f_ifMainTab_then_" + pf).append("<option value='" + this.nodeId + "'>"+this.nodeLabel+"</option>");
					$("#f_ifMainTab_else_" + pf).append("<option value='" + this.nodeId + "'>"+this.nodeLabel+"</option>");
				}
			});
			$("#f_ifMainTab_then_" + pf).val(this.resultJSON.condition.then);
			$("#f_ifMainTab_else_" + pf).val(this.resultJSON.condition.else);
			$.each(this.funcDescJSON.inputs, function(){
				if(this.source[0]){ 
					inputCount++;
					$("#f_ifMainTab_ifVar_" + pf).append("<option value='" + this.id + "'>"+this.id+"</option>");
			}});
			$("#f_ifMainTab_ifVar_" + pf).val(this.resultJSON.condition.if.variable);
			if(inputCount < 2){
				$("#f_ifMainTab_ifVar_" + pf).attr('disabled', true);
				$("#f_ifMainTab_ifVar2_" + pf).attr('placeholder', langForms.placeholder1);
				$("#f_ifMainTab_ifVar2_" + pf).attr('obligatory', 'true');
			} else {
				$("#f_ifMainTab_ifVar_" + pf).attr('disabled', false);
				$("#f_ifMainTab_ifVar2_" + pf).attr('placeholder', langForms.placeholder2);
				$("#f_ifMainTab_ifVar2_" + pf).attr('obligatory', 'false');
			}
			$( "#f_ifMainTab_ifVar2_" + pf ).addClass("longTextfield");
			$( "#f_ifMainTab_ifVar2_" + pf ).val(this.resultJSON.condition.if.value);
			$( "#f_ifMainTab_ifRel_" + pf ).val(this.resultJSON.condition.if.relation);
			$( "#f_ifMainTab_ifVar_" + pf ).change(function(){
				var temp1 = $( "#f_ifMainTab_ifVar_" + pf ).val(),
					temp2 = $( "#f_ifMainTab_ifVar2_" + pf ).val();
				if(temp1==temp2) $( "#f_ifMainTab_ifVar2_" + pf ).val(that.getInputThatIsNot(temp1));
			});
			$("#f_ifMainTab_then_" + pf +", #f_ifMainTab_else_" + pf).change(function(){
				$("#f_ifMainTab_else_" + pf).removeClass('ui-state-error');
				$("#f_ifMainTab_then_" + pf).removeClass('ui-state-error');
				$("#f_button_sumbitAllButton_" + pf).attr('disabled', false);
				var temp1 = $("#f_ifMainTab_else_" + pf).val(),
					temp2 = $("#f_ifMainTab_then_" + pf).val();
				if( (temp1 || temp2) && temp1===temp2) {
					$("#f_ifMainTab_then_" + pf).addClass('ui-state-error');
					$("#f_ifMainTab_else_" + pf).addClass('ui-state-error');
					$("#f_button_sumbitAllButton_" + pf).attr('disabled', true);
				}
			});
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
			$("*").removeClass("ui-state-error-B");
			$('span[id$="_validation_' + pf + '"]').text("");
		},
		//argument total decyduje, czy ma być skasowane id bloczka (nie chcemy tego przy resecie formularza, ale przy ponownym otwarciu tak)
		cleanForm: function cleanForm(total){
			if( !total ){ 
				var temp = this.resultJSON.nodeId,
				temp2 = this.resultJSON.nodeType;}
			this.resultJSON = {"nodeId":"","nodeLabel":"","nodeType":"","physicalDescription":[],"functionalDescription":[],"nonFunctionalDescription":[],"alternatives":"","subgraph":{},"controlType":"","condition":{"if":{}},"targets":[]};
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

			$("#f_ifMainTab_then_" + pf).html('');
			$("#f_ifMainTab_else_" + pf).html('');
			$("#f_ifMainTab_ifVar_" + pf).html('');
			$("#f_ifMainTab_ifVar2_" + pf).val('');
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
					inputJSON.source = input.source;
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
		getInputThatIsNot: function getInputThatIsNot(inpId){
			for (var x in this.funcDescJSON.inputs){
				if(this.funcDescJSON.inputs[x].id != inpId) return this.funcDescJSON.inputs[x].id;
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
					"<td id=\"" + tempId + "_label\" class='tabField'>" + cutString(input.label, CFG.forms.maxStringLength) + "</td>" + 
					"<td id=\"" + tempId + "_class\" class='tabField'>" + cutString(input.class, CFG.forms.maxStringLength) + "</td>" +
					"<td id=\"" + tempId + "_dataType\" class='tabField'>" + cutString(input.dataType, CFG.forms.maxStringLength) + "</td>" + 
				"</tr>" 
			);
		},
		NFPropsAppender: function NFPropsAppender(input, number){
			var tempId = "f_nonFunctionalDescriptionTabxNFProps-" + number;
			$( "#f_nonFunctionalDescriptionTab_NFProps_" + pf + " tbody").append( 
				"<tr id=\"" + tempId + "\" class=\"clickable\">" +
					"<td id=\"" + tempId + "_weight\" class='tabField'>" + cutString(input.weight, CFG.forms.maxStringLength) + "</td>" + 
					"<td id=\"" + tempId + "_name\" class='tabField'>" + cutString(input.name, CFG.forms.maxStringLength) + "</td>" + 
					"<td id=\"" + tempId + "_relation\" class='tabField'>" + cutString(input.relation, CFG.forms.maxStringLength) + "</td>" +
					"<td id=\"" + tempId + "_unit\" class='tabField'>" + cutString(input.unit, CFG.forms.maxStringLength) + "</td>" + 
					"<td id=\"" + tempId + "_value\" class='tabField'>" + cutString(input.value, CFG.forms.maxStringLength) + "</td>" +
				"</tr>" );
		},
		inputVariablesAppender: function inputVariablesAppender(input, index){
			// console.log(arguments);
			var tempId = "f_inputVariables-" + index;
			$( "#f_inputVariables_" + pf + " tbody").append( 
				"<tr id=\"" + tempId + "\" class=\"clickable\">" +
					"<td id=\"" + tempId + "_name\" class='tabField'>" + cutString(input.name, CFG.forms.maxStringLength) + "</td>" + 
					"<td id=\"" + tempId + "_value\" class='tabField'>" + cutString(input.value, CFG.forms.maxStringLength) + "</td>" + 
					"<td id=\"" + tempId + "_type\" class='tabField'>" + cutString(input.type, CFG.forms.maxStringLength) + "</td>" +
				"</tr>"
			);
		},
		globalNonFunPropsAppender: function globalNFPropsAppender(input, index){
			// console.log("input", input)
			var tempId = "f_globalNFProps-" + index;
			$( "#f_globalNFProps_" + pf + " tbody").append( 
				"<tr id=\"" + tempId + "\" class=\"clickable\">" +
					"<td id=\"" + tempId + "_weight\" class='tabField'>" + cutString(input.weight, CFG.forms.maxStringLength) + "</td>" + 
					"<td id=\"" + tempId + "_name\" class='tabField'>" + cutString(input.name, CFG.forms.maxStringLength) + "</td>" + 
					"<td id=\"" + tempId + "_relation\" class='tabField'>" + cutString(input.relation, CFG.forms.maxStringLength) + "</td>" +
					"<td id=\"" + tempId + "_unit\" class='tabField'>" + cutString(input.unit, CFG.forms.maxStringLength) + "</td>" + 
					"<td id=\"" + tempId + "_value\" class='tabField'>" + cutString(input.value, CFG.forms.maxStringLength) + "</td>" +
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
			var tempVar;

			this.clearErrors();
			console.log(this.resultJSON)
			
			this.resultJSON.nodeLabel = $( "#f_mainTab_label_" + pf ).val();
			// console.log(this.resultJSON.nodeLabel);
			// this.resultJSON.controlType = $( "#f_mainTab_controlType_" + pf ).val();
			// this.resultJSON.alternatives = $( "#f_mainTab_alternatives" ).val();
			
			this.physDescJSON.serviceName = $( "#f_physicalDescriptionTab_serviceName_" + pf ).val();
			this.physDescJSON.serviceGlobalId = $( "#f_physicalDescriptionTab_serviceGlobalId_" + pf ).val();
			this.physDescJSON.address = $( "#f_physicalDescriptionTab_address_" + pf ).val();
			this.physDescJSON.operation = $( "#f_physicalDescriptionTab_operation_" + pf ).val();
			this.resultJSON.physicalDescription = this.physDescJSON;			

			this.resultJSON.condition.if.relation = (this.resultJSON.controlType.toLowerCase()=='#conditionstart') ? $("#f_ifMainTab_ifRel_" + pf).val() : "";
			this.resultJSON.condition.if.variable = $("#f_ifMainTab_ifVar_" + pf).val() || "";
			tempVar = $("#f_ifMainTab_ifVar2_" + pf).val();
			this.resultJSON.condition.if.value = tempVar ? (isNaN(tempVar) ? tempVar : parseFloat(tempVar)) : "";
			this.resultJSON.condition.then = $("#f_ifMainTab_then_" + pf).val() || "";
			this.resultJSON.condition.else = $("#f_ifMainTab_else_" + pf).val() || "";

			this.funcDescJSON.description = $( "#f_mainTab_description_" + pf ).val();
			this.removeUndefinedElements();
			// this.funcDescJSON.preconditions = $( "#f_inputOutputTab_preconditions" ).val();
			// this.funcDescJSON.effects = $( "#f_inputOutputTab_effects" ).val();
			this.resultJSON.functionalDescription = this.funcDescJSON;

			this.emulationJSON.id = $("#f_emulationTab_id_" + pf).val();
			this.emulationJSON.name = this.resultJSON.nodeLabel;
			this.emulationJSON.vectors = $("#f_emulationTab_vectors_" + pf).val();
			this.resultJSON.emulation = this.emulationJSON;

			// alert(jsonFormatter(this.resultJSON, true, true));
			// this.emulationJSON.name = $("#f_emulationTab_name_" + pf).val();
			// alert(this.emulationJSON.vectors+":"+this.emulationJSON.id)
			// alert(this.resultJSON.emulation.id+":"+this.resultJSON.emulation.vectors)

			gui.controller.reactOnEvent("TryToSaveNodeAfterEdit", this.resultJSON);
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
					inputJSON.id = gui.controller.generateIOId(inputJSON.label);
					this.inputAndOutputAppender(inputJSON, "f_inputsTab_inputs_" + pf + " tbody", this.funcDescJSON.inputs.length);
					this.funcDescJSON.inputs.push(inputJSON);
					$("#f_addInputForm_" + pf).dialog("close");	
				}
				else alert(langAlerts.errors.inputExists);		
			}
			else{	//edytujemy istniejący input
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
			outputJSON.id = gui.controller.generateIOId(outputJSON.label);
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
			this.appendInpVar(gui.controller.current_graphData.inputVariables);
			$("#f_inputVariablesForm_" + pf).dialog("open");
		},
		editGlobalNonFunctionalParameters : function editNonFunctionalParameters(){
			this.resetGlobalNonFunDesc();
			this.appendGlobalNonFuncDesc(gui.controller.current_graphData.nonFunctionalParameters);
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
				gui.controller.reactOnEvent("AddBlankNode", {
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
			gui.controller.current_graphData.inputVariables = inpVars;
			$( "#f_inputVariablesForm_" + pf ).dialog( "close" );
		}		
	);
	$("#f_globalNFPropertiesForm_changesConfirm_" + pf).button().click(
		function(event) {
			for(var i in globalNonFuncDesc)
				if(!globalNonFuncDesc[i])
					globalNonFuncDesc.splice(i, 1);
			gui.controller.current_graphData.nonFunctionalParameters = globalNonFuncDesc;
			$( "#f_globalNFPropertiesForm_" + pf ).dialog( "close" );
		}	
	);
	$("#f_graphSaveParamsForm_changesConfirm_" + pf).button().click(
		function(event) {
			var result = gui.view.form.collectGraphSaveParams();
			if(result){
				$( "#f_graphSaveParamsForm_" + pf ).dialog( "close" );
				gui.controller.reactOnEvent("save", result)
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
		height: CFG.forms.dialogHeight,
		width: CFG.forms.dialogWidth,
		modal: true
	});
	$( "#f_dialog_confirm2_" + pf ).dialog({
		autoOpen: false,
		resizable: false,
		height: CFG.forms.dialogHeight,
		width: CFG.forms.dialogWidth,
		modal: true
	});
	$( "#f_dialog_emulationService_" + pf ).dialog({
		autoOpen: false,
		resizable: false,
		height: CFG.forms.dialogHeight,
		width: CFG.forms.dialogWidth,
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
		height: CFG.forms.addSthFormHeight,
		width: CFG.forms.addSthFormWidth
	});
	$("#f_addOutputForm_" + pf).dialog({
		autoOpen: false,
		modal: true,
		height: CFG.forms.addSthFormHeight,
		width: CFG.forms.addSthFormWidth
	});
	$("#f_addNFPropertyForm_" + pf).dialog({
		autoOpen: false,
		modal: true,
		height: CFG.forms.addSthFormHeight,
		width: CFG.forms.addSthFormWidth
	});
	$("#f_addGlobalNFPropertyForm_" + pf).dialog({
		autoOpen: false,
		modal: true,
		height: CFG.forms.addSthFormHeightB,
		width: CFG.forms.addSthFormWidthB
	});
	$("#f_addInputVariableForm_" + pf).dialog({
		autoOpen: false,
		modal: true,
		height: CFG.forms.addSthFormHeightB,
		width: CFG.forms.addSthFormWidthB
	});
	$("#f_addVectorForm_" + pf).dialog({
		autoOpen: false,
		modal: true,
		height: CFG.forms.addSthFormHeightB,
		width: CFG.forms.addSthFormWidthB
	});
	$("#f_inputVariablesForm_" + pf).dialog({
		autoOpen: false,
		modal: true,
		height: CFG.forms.smallFormHeight,
		width: CFG.forms.smallFormWidth
	});
	$("#f_globalNFPropertiesForm_" + pf).dialog({
		autoOpen: false,
		modal: true,
		height: CFG.forms.smallFormHeight,
		width: CFG.forms.smallFormWidth
	});
	$("#f_graphSaveParamsForm_" + pf).dialog({
		autoOpen: false,
		modal: true,
		height: CFG.forms.graphSaveParamsHeight,
		width: CFG.forms.graphSaveParamsWidth
	});

	return result;
};
//Koniec pliku form.js
//Poczatek pliku nodeVisualizator.js
function nodeVisualizator(view){
		var c = -1;
		var outputObject = {
			getBlankNode : function getBlankNode(x, y){
				c++;
				// alert(c);
				// a(x || 10+55*c);
				// a(y || 10+35*c);
				var blankNode = {
					id : "", //inputNode.nodeId,
					label : "", //inputNode.label,
					type : "", //inputNode.nodeType,
					description : "", // ???
					mainShape : undefined,
					raph_label : undefined,
					inputs : [],
					outputs : [],
					connectors : [],
					x : x || 10+55*c, //
					y : y || 10+35*c, //
					r : CFG.nodeDefaults.defaultRarius,
					width : CFG.nodeDefaults.defaultWidth,
					height : CFG.nodeDefaults.defaultHeight,
					scale : CFG.nodeDefaults.defaultScale,
					highlighted : false,
					menu : null,
					prepareToDrag : function prepareToDrag(){
						this.hideNode();
						this.mainShape.show().toFront();
						if(CFG.actions.showLabelDuringNodeDrag)
							this.raph_label.show().toFront();
					},
					returnFromDragging : function returnFromDragging(transX, transY){
						transX = transX || 0;
						transY = transY || 0;

						// if(transX != 0 || transY != 0){
							this.x += transX;
							this.y += transY;

							this.clearIO();
							this.drawIO(view.paper); // 

							$.each(this.set, function(i, v){
								if(i>1 || i==1 && !CFG.actions.showLabelDuringNodeDrag)
									v.translate(transX, transY).toFront();
									if(v._.transform && v._.transform.length > 1){
										v._.transform[0][1] += transX;
										v._.transform[0][2] += transY;
										v._.transform.pop();
									}
							});
							$.each(this.connectors, function(i, v){
								v.translate(transX, transY).toFront();
								// v.attr("cx", v.attr("cx") + transX).toFront();
								// v.attr("cy", v.attr("cy") + transY).toFront();
								if(v._.transform && v._.transform.length > 1){
									v._.transform[0][1] += transX;
									v._.transform[0][2] += transY;
									v._.transform.pop();
								}
							});
						// }
						
						this.showNode();
					},
					translate : function translate(transX, transY){
						// console.log(transX, transY, "translate")
						this.mainShape.translate(transX, transY);
						if(CFG.actions.showLabelDuringNodeDrag)
							this.raph_label.translate(transX, transY);

						// $.each(this.set, function(i, v){
						// 		v.translate(transX, transY);
						// });
						// $.each(this.inputs, function(i, v){
						// 	v.node.translate(transX, transY);
						// });
						// $.each(this.outputs, function(i, v){
						// 	v.node.translate(transX, transY);
						// });
						// $.each(this.connectors, function(i, v){
						// 	v.attr("cx", v.attr("cx") + transX);
						// 	v.attr("cy", v.attr("cy") + transY);
						// });
					},
					removeView : function removeView(){
						function remove(){
							if(this.remove)
								this.remove();
							else
								this.node.remove();
						}
						$.each(this.inputs, remove);
						$.each(this.outputs, remove);
						$.each(this.connectors, remove);
						$.each(this.set, remove);
					},
					show : function show(i, v){
						if(v && v.node){
							var objToAnimate = (v.node.animate ? v.node : v);
							objToAnimate.stop().myShow(250);
						}

						return this;
					},
					hide : function hide(i, v){
						if(v && v.node){
							var objToAnimate = (v.node.animate ? v.node : v);
							objToAnimate.stop().myHide(250);
						}
						return this;
					},
					switchMode : function switchMode(newMode){
						switch(newMode){
							case "CF" : this.switchToCFMode(); break;
							case "DF" : this.switchToDFMode(); break;
							case "H" : this.switchToHybrydMode(); break;
						}
						return this;
					},
					switchToCFMode : function switchToCFMode(){
						$.each(this.inputs, this.hide);
						$.each(this.outputs, this.hide);
						$.each(this.connectors, this.show);
						return this;
					},
					switchToDFMode : function switchToDFMode(){
						$.each(this.inputs, this.show);
						$.each(this.outputs, this.show);
						$.each(this.connectors, this.hide);

						return this;
					},
					switchToHybrydMode : function switchToHybrydMode(){
					},
					prepareNodeDescription : function prepareNodeDescription(){
						var data = gui.controller.getNodeById(this.id),
							result
							;

						if(data){
							if(data.physicalDescription){
								result = "<b>Service description:</b><br/> serviceName: " + data.physicalDescription.serviceName + 
									"<br/>serviceGlobalId: " +  data.physicalDescription.serviceGlobalId + 
									"<br/>address: " + data.physicalDescription.address + 
									"<br/>operation: " + data.physicalDescription.operation +
									"<br/><b>Non functional properties:</b><br/>"; 
							}
							if(data.nonFunctionalDescription){
								for(var i = 0; i < data.nonFunctionalDescription.length; i++) 
									result += "non functional property #" + i +
										":<br/>weight: " + data.nonFunctionalDescription[i].weight + 
										"<br/>name: " +  data.nonFunctionalDescription[i].name + 
										"<br/>relation: " + data.nonFunctionalDescription[i].relation + 
										"<br/>unit: " + data.nonFunctionalDescription[i].unit + 
										"<br/>value: " + data.nonFunctionalDescription[i].value;
							}
						}

						this.description = result;
						return this;
					},
					prepareDescriptionForInput : function prepareDescriptionForInput(inputId){
						var inputToDescribe = (typeof inputId === "string") ? this.getInputById(inputId) : inputId;
						var result = "";
						if(inputToDescribe){
							result = 
							"class: " + inputToDescribe.class + 
							"<br/>id: " + inputToDescribe.id + 
							"<br/>label: " + inputToDescribe.label + 
							"<br/>dataType: " + inputToDescribe.dataType + 
							"<br/>properties: " + inputToDescribe.properties;
							if(inputToDescribe.source && inputToDescribe.source.length === 2){
								result += "<br/>sources: "+inputToDescribe.source[0]+"-"+inputToDescribe.source[1];
							}
						}
						return result;
					},
					prepareDescriptionForOutput : function prepareDescriptionForOutput(outputId){
						var outputToDescribe = (typeof outputId === "string") ? this.getOutputById(outputId) : outputId;
						var result = "";
						if(outputToDescribe){
							result = 
								"class: " + outputToDescribe.class + 
								"<br/>id: " + outputToDescribe.id + 
								"<br/>label: " + outputToDescribe.label + 
								"<br/>dataType: " + outputToDescribe.dataType + 
								"<br/>properties: " + outputToDescribe.properties;
						}
						return result;
					},
					getInputById : function getInputById(id){
						var result;
						$.each(this.inputs, function(){
							if(this.id === id){
								result = this;
								return false;
							}
						});

						return result;
					},
					getOutputById : function getOutputById(id){
						var result;

						$.each(this.outputs, function(){
							if(this.id === id){
								result = this;
								return false;
							}
						});

						return result;
					},
					addInput : function addInput(input){
						this.clearIO();
						this.inputs.push( $.extend(true, {}, input) );
						this.drawIO(view.paper);
						gui.view.updateEdges();
					},
					addOutput : function addOutput(output){
						this.clearIO();
						this.outputs.push( $.extend(true, {}, output) );
						this.drawIO(view.paper);
						gui.view.updateEdges();
					},
					drawConnectors : function drawConnectors(){
						var node = this,
							paper = view.paper,
							radius = CFG.nodeDefaults.defaultConnectorRadius
						;
						var c1 = paper.circle(node.x+node.width/2, node.y, radius),
							c2 = paper.circle(node.x+node.width, node.y + node.height/2, radius),
							c3 = paper.circle(node.x+node.width/2, node.y + node.height, radius),
							c4 = paper.circle(node.x, node.y + node.height/2, radius)
						;

						node.connectors.push(c1, c2, c3, c4);
						for(i=0, j=node.connectors.length; i<j; i++)
							node.connectors[i].node.setAttribute("class", node.id+" connector");
					},
					drawIO : function drawIO(paper, forRepo){
						if(!paper){
							throw {
								name: "object missing",
								message: "argument \"paper\" is obligatory!\nnodeVisualizator::drawIO"
							}
						}
						//paper = kanwa, na której rysuje się danego node'a
						//forRepo = opcjonalny parametr, przyjmuje true, jeżeli nie mają być rysowane strzałki
						var strokeColor = (this.highlighted ? CFG.colors.highlightStroke : CFG.colors.normalStroke),
							isCFMode = ( gui.view.mode === "CF" ),
							length = this.inputs.length, x, y, that = this, nx, move;

						// alert(isCFMode);
						if(this.mainShape.node.nodeName === "circle"){
							var mult = 1/1.41,
								nx = this.x-5, ny = this.y-5, nr = this.r, //nx, ny = współrzędne node'a, nr = promień
								coordsList = [
								[nx-nr, ny], [nx+nr, ny], [nx, ny+nr], [nx, ny-nr],
								[nx+nr*mult, ny+nr*mult], [nx+nr*mult, ny-nr*mult],
								[nx-nr*mult, ny+nr*mult], [nx-nr*mult, ny-nr*mult]];
							for(var i = 0; i < length; i++){
								if(i<8){ x = coordsList[i][0]; y = coordsList[i][1]; }
								else{ x = coordsList[i%8][0]; y = coordsList[i%8][1]; } //TODO: działający algorytm rozmieszczenia tutaj
								this.inputs[i].node = paper.path(this.inputPathString(x, y)).attr({'fill': this.color, stroke: strokeColor});
								this.inputs[i].node.node.setAttribute("class", this.id + " input " + this.inputs[i].id);
							}
							length = this.outputs.length;
							for(var i = 0; i < length; i++){
								if(i<8){ x = coordsList[i][0]; y = coordsList[i][1]; }
								else{ x = coordsList[i%8][0]; y = coordsList[i%8][1]; } //TODO: działający algorytm rozmieszczenia tutaj
								this.outputs[i].node = paper.path(this.outputPathString(x, y)).attr({'fill': this.color, stroke: strokeColor});
								this.outputs[i].node.node.setAttribute("class", this.id + " output " + this.outputs[i].id);
								move = gui.view.dragDFArrow(this.outputs[i].node, this).map();
							}
						} else if(this.mainShape.node.nodeName === "path"){
							var mult = 1/1.41,
								j = 0;
								s = CFG.nodeDefaults.conditionSize, 
								nx = this.x-5,
								ny = this.y+15,
								coordsList = [
								[nx-s, ny], [nx+s, ny], [nx, ny+s], [nx, ny-s],
								[nx+s, ny+s], [nx+s, ny-s],
								[nx-s, ny+s], [nx-s, ny-s]];
							length = this.inputs.length;
							for(var i = 0; i < length; i++){
								if(i<8){ x = coordsList[i][0]; y = coordsList[i][1]; }
								else{ x = coordsList[i%8][0]; y = coordsList[i%8][1]; } 
								this.inputs[i].node = paper.path(this.inputPathString(x, y)).attr({'fill': this.color, stroke: strokeColor});
								this.inputs[i].node.node.setAttribute("class", this.id + " input " + this.inputs[i].id);
								j = i+1;
							}
							length = this.outputs.length;
							for(var i = 0; i < length; i++){
								if(j<8){ x = coordsList[j][0]; y = coordsList[j][1]; }
								else{ x = coordsList[j%8][0]; y = coordsList[j%8][1]; } 
								this.outputs[i].node = paper.path(this.outputPathString(x, y)).attr({'fill': this.color, stroke: strokeColor});
								this.outputs[i].node.node.setAttribute("class", this.id + " output " + this.outputs[i].id);
								var move = this.dragIO(i, "out");
								this.outputs[i].node.drag(move.move, move.start, move.end);
								j+=i;
							}
						} else {
							var spacing = this.width/(length+1);
							for(var i = 0; i < length; i++){
								x = this.x + (i+1)*spacing; y = this.y-10;
								this.inputs[i].node = paper.path(this.inputPathString(x, y)).attr({'fill': this.color, stroke: strokeColor});
								if(!forRepo){
									move = this.dragIO(i, "in");
									this.inputs[i].node.drag(move.move, move.start, move.end);
									this.inputs[i].node.node.setAttribute("class", this.id+" input " + this.inputs[i].id);
								}
							}
							length = this.outputs.length; spacing = this.width/(length+1);
							for(var i = 0; i < length; i++){
								x = this.x + (i+1)*spacing; y = this.y+this.height;
								this.outputs[i].node = paper.path(this.outputPathString(x, y)).attr({'fill': this.color, stroke: strokeColor});
								if(!forRepo){
									move = this.dragIO(i, "out");
									this.outputs[i].node.drag(move.move, move.start, move.end);
									this.outputs[i].node.node.setAttribute("class", this.id+" output " + this.outputs[i].id);
								}
							}
						}
						this.addInputTooltips();
						this.addOutputTooltips();
						// if(!forRepo)
						// 	$.each(this.set, function(){this.toFront()});
						if(isCFMode) {
							$.each(this.outputs, function(){this.node.hide()});
							$.each(this.inputs, function(){this.node.hide()});
						}
					},
					dragIO: function dragIO(i, flag, paper){
						// console.log(this, arguments)
						if(arguments.length < 2){
							throw {
								name: "object missing",
								message: "argument \"index\" and \"flag\" are obligatory!\nnodeVisualizator::dragIO"
							}
						}
						var index = i,
							kunwa = paper || gui.view.paper,
							obj = (flag==="in") ? this.inputs[i].node : this.outputs[i].node,
							mov = this.moveIO(i, flag),
							arrDrag = gui.view.dragDFArrow(obj, this),
							funM, funS, funE,
							ctrlPressed = false;
							result = {
								start: function start(x, y, evt){
									if(evt.ctrlKey){
										ctrlPressed = true;
										funS = mov.start.bind(this, kunwa);
									}
									else {
										funS = arrDrag.start.bind(this, x, y, evt);
									}
									funS();
								},
								move: function move(dx, dy, x, y, event){
									if(ctrlPressed){
										funM = mov.move.bind(this, dx);
									}
									else{
										funM = arrDrag.move.bind(this, dx, dy, x, y, event);
									}
									funM();
								},
								end: function end(event){
									if(ctrlPressed){
										funE = mov.end.bind(this, event);
									}
									else{
										funE = arrDrag.stop.bind(this, event);
									}
									funE();
									ctrlPressed = false;
								}
							}
						;
						return result;
					},
					moveIO: function moveIO(i, flag){
						var index = i,
							that = this,
							kunwa,
							array, otherObject, otherIndex,
							img, x1, y1, x2, dist, center, glow1, glow2,
							obj1, obj2,
							result = {
								start: function start(paper){
									if(flag=="in") array = that.inputs;
									else array = that.outputs;
									kunwa = paper;
									var bbox = this.getBBox();
									x1 = bbox.x; y1 = bbox.y;
								},
								move: function move(dx){
									if(glow2) glow2.remove();
									if(img) img.remove();
									if(array[index-1] || array[index+1]){
										if(!glow1) glow1 = this.glow({'color': CFG.io.highlightColor});
										if(dx < 0){
											if(array[index-1]){ 	
												otherIndex = index-1;
												x2 = array[otherIndex].node.getBBox().x;	
												dist = x2 - x1;			
												if(dx < dist/3){	
													otherObject = array[otherIndex];	
													if(flag==="in") center = x2+((x1-x2)/2)-4; 
													else center = x2+((x1-x2)/2)-4;
													img = kunwa.image(CFG.io.swapImg, center, y1-15, 16, 16);
													glow2 = otherObject.node.glow({'color': CFG.io.highlightColor});
												}
											}
											else{
												otherObject = undefined;
												if(glow2) glow2.remove();
											}
										}
										if(dx >=0){
											if(array[index+1]){
												otherIndex = index + 1;
												x2 = array[otherIndex].node.getBBox().x;
												dist = x2 - x1;
												if(dx > dist/3){
													otherObject = array[otherIndex];
													if(flag==="in") center = x2+((x1-x2)/2)-4;
													else center = x2+((x1-x2)/2)-4;
													img = kunwa.image(CFG.io.swapImg, center, y1-15, 16, 16);
													glow2 = otherObject.node.glow({'color': CFG.io.highlightColor});
												}
											}
											else{
												otherObject = undefined;
												if(glow2) glow2.remove();
											}
										}
									}
								},
								end: function end(){
									if(glow1) glow1.remove(); 
									if(otherObject){
										gui.view.hideEdges();
										if(flag==="in"){
											obj1 = kunwa.path(that.inputPathString(x1, y1)).attr({'fill': that.color});
											obj2 = kunwa.path(that.inputPathString(x2, y1)).attr({'fill': that.color});
										}
										else{
											obj1 = kunwa.path(that.outputPathString(x1, y1)).attr({'fill': that.color});
											obj2 = kunwa.path(that.outputPathString(x2, y1)).attr({'fill': that.color});	
										}
										array[index].node.remove();
										array[otherIndex].node.remove();
										obj1.animate({transform:"t"+(x2-x1)+",0"}, 250);
										obj2.animate({transform:"t"+(x1-x2)+",0"}, 250);
										setTimeout(function(){
											obj1.remove(); obj2.remove();
											array[otherIndex] = array[index];
											array[index] = otherObject;
											that.clearIO(); that.drawIO(kunwa);
											gui.view.updateEdges();										
										}, 250);
										img.remove(); glow2.remove();
									}
								}
						};
						return result;
					},
					// wywala WIZUALIZACJĘ wszystkich IO; żeby znowu się pokazały, konieczne drawIO();
					// pozwala przerysować IO bez przerysowywania całego node'a
					clearIO: function clearIO(){
						for(var i in this.inputs)
							this.inputs[i].node.remove();
						for(var o in this.outputs)
							this.outputs[o].node.remove();
					},
					inputPathString: function inputPathString(x, y){
						return("M " + x + " " + y + " l 0 10 l 10 0 l 0 -10 l -5 5 z");
					},
					outputPathString: function outputPathString(x, y){
						return("M " + x + " " + y + " l 0 5 l 5 5 l 5 -5 l 0 -5 z");
					},
					addInputTooltips: function addInputTooltips(){
						var that = this;
						$.each(this.inputs, function(){
							this.description = that.prepareDescriptionForInput(this.id);
							this.node.mouseover(
								(function(something){
									return function(evt, x, y){
										view.tooltip.open(that.label+": "+something.id, something.description, x, y, evt);
									};
								})(this)
							).mouseout(function(){view.tooltip.close()});
						});
					},
					addOutputTooltips: function addOutputTooltips(){
						var that = this;
						$.each(this.outputs, function(){
							this.description = that.prepareDescriptionForOutput(this.id);
							this.node.mouseover(
								(function(something){
									return function(evt, x, y){
										view.tooltip.open(that.label+": "+something.id, something.description, x, y, evt);
									};
								})(this)
							).mouseout(function(){view.tooltip.close()});
						});
					},
					getBBox : function getBBox(){
						var result = { x: this.x, y: this.y, width: this.width, height: this.height};
						if(this.inputs.length > 0)
							result.height += 10;
						if(this.outputs.length > 0)
							result.height += 10;

						return result;
					},
					setBold : function setBold(flag){
						if(flag)
							this.set[0].attr("stroke-width", "2px");
						else
							this.set[0].attr("stroke-width", "1px");
					},
					highlight : function highlight(ctrl){
						// console.trace();
						if(ctrl){
							this.highlighted ? this.removeHighlight() : this.highlight2();
						} else {
							this.highlighted ? null : this.highlight2();
						}
					},
					highlight2: function highlight(){
						var that = this;
						var color = CFG.colors.highlightStroke;
						this.mainShape.attr("stroke", color);
						$.each(this.inputs, function(i, v){
							v.node.attr("stroke", color);
						});
						$.each(this.outputs, function(i, v){
							v.node.attr("stroke", color);
						});
						$.each(this.connectors, function(i, v){
							v.attr("stroke", color);
						});
						this.highlighted = true;
					},
					removeHighlight : function removeHighlight(){
						var that = this;
						var color = CFG.colors.normalStroke;
						this.mainShape.attr("stroke", color);
						$.each(this.inputs, function(i, v){
							v.node.attr("stroke", color);
						});
						$.each(this.outputs, function(i, v){
							v.node.attr("stroke", color);
						});
						$.each(this.connectors, function(i, v){
							v.attr("stroke", color);
						});
						this.highlighted = false;
					},
					isInside : function isInside(x1,y1,x2,y2){
						return this.x+this.width > x1 &&
								this.y+this.height > y1 &&
								this.x < x2 &&
								this.y < y2
					},
					removeNode : function remove(){
						$.each(this.set, function(){
							this.remove();	
						});
						$.each(this.inputs, function(){
							this.node.remove();	
						});
						$.each(this.outputs, function(){
							this.node.remove();	
						});
						$.each(this.connectors, function(){
							this.remove();	
						});
					},
					getCoords : function getCoords(){
						return {	x : this.x,
									y : this.y	};
					},
					setCoords : function setCoords(newCoords){
						this.x = newCoords.x;
						this.y = newCoords.y;
					},
					toString : function toString(){
						return "SSDL_Node object";
					},
					getPossiblePositionsOfConnectors : function getPossiblePositionsOfConnectors(){
						return [
							[this.x+this.width/2, this.y],
							[this.x+this.width, this.y + this.height/2],
							[this.x+this.width/2, this.y + this.height],
							[this.x, this.y + this.height/2]
							]
							;
					},
					hideNode : function hideNode(){
						$.each(this.set, function(){
							this.hide();
						});
						$.each(this.inputs, function(){
							this.node.hide();
						});
						$.each(this.outputs, function(){
							this.node.hide();
						});
						$.each(this.connectors, function(){
							this.hide();
						});
					},
					showNode : function showNode(){
						// this.buildMenu();
						// console.log(this.set.length, "set");
						// console.log(this.inputs.length, "inputs");
						// console.log(this.outputs.length, "outputs");
						// console.log(this.connectors.length, "connectors");

						$.each(this.set, function(){
							this.show();
							// console.log(this.getBBox().x, this.getBBox().y);
						});

						if( gui.view.mode === "CF" ){
							$.each(this.connectors, function(){
								this.show();
							});
						} else {
							$.each(this.inputs, function(){
								this.node.show();
							});
							$.each(this.outputs, function(){
								this.node.show();
							});
						}
					},
					buildMenu : function buildMenu(){
						if(!this.menu){
							this.menu = view.contextMenu(this.set, view);
							this.menu.addOption('Properties');
							this.menu.addOption('Edit subgraph');
							this.menu.addOption('Test');
							this.menu.addSeparator();
							this.menu.addOption('Cut');
							this.menu.addOption('Copy');
							this.menu.addOption('Copy with reference');
							this.menu.addOption('Paste');
							this.menu.addOption('Delete',"DELETE");
						}
					}
				}

				// console.log(x, y, blankNode.x, blankNode.y)
				return blankNode;
			},
			resetCounter : function resetCounter(){
				c = -1;
			},
			extendVisualisation : function extendVisualisation(type, fun){
				this["draw_"+type.toLowerCase()+"Node"] = fun;
			},
			draw_unknownNode : function draw_unknownNode(node){
			},
			prepareData : function prepareData(dataNode, viewNode){
				// console.log("-----", dataNode.nodeId, dataNode, viewNode);
				viewNode.id = dataNode.nodeId;
				viewNode.label = dataNode.nodeLabel || dataNode.nodeId;
				viewNode.type = dataNode.nodeType;
				viewNode.controlType = dataNode.controlType;
				viewNode.inputs = [];
				viewNode.outputs = [];
				viewNode.set = view.paper.set();
				viewNode.hasSubgraph = !isEmpty(dataNode.subgraph);
				if(dataNode.physicalDescription)
					viewNode.serviceName = dataNode.physicalDescription.serviceName;
				if(dataNode.functionalDescription) 
					$.each(dataNode.functionalDescription.inputs, function(){
						viewNode.inputs.push( $.extend(true, {}, this) );
					});
				if(dataNode.functionalDescription)
					$.each(dataNode.functionalDescription.outputs, function(){
						viewNode.outputs.push( $.extend(true, {}, this) );
					});

				return viewNode;
			},
			assumeColor : function assumeColor(nodeType, viewNode, controlType){
				// console.log(controlType, nodeType, "--------------")
				if(nodeType == "control"){
					if(controlType == "#conditionstart")
						viewNode.color = CFG.colors.conditionStart;
					else if(controlType == "#conditionend")
						viewNode.color = CFG.colors.conditionEnd;
					else if(controlType == "#start")
						viewNode.color = CFG.colors.start;
					else if(controlType == "#end")
						viewNode.color = CFG.colors.stop;
				}
				else if ( nodeType == "emulationservice")
					viewNode.color = CFG.colors.emulationService;
				else if(nodeType == "functionality")
					viewNode.color = CFG.colors.functionality;
				else if(nodeType == "mediator")
					viewNode.color = CFG.colors.mediator;
				else if( CFG.serviceTypes.indexOf(nodeType) > -1 )
					viewNode.color = CFG.colors.service;
			},
			draw_rectNode : function draw_nodes(viewNode, paper){
				var paper = paper || view.paper,
					rect = paper.rect(viewNode.x, viewNode.y, viewNode.width, viewNode.height, 5).attr({fill: viewNode.color, stroke: CFG.colors.normalStroke}),
					label = paper.text(viewNode.x + viewNode.width/2, viewNode.y + 10, viewNode.label),
					img_gear = paper.image("/images/img.png", viewNode.x + viewNode.width-17, viewNode.y+2, 15, 15)
				;
				viewNode.mainShape = rect;
				viewNode.raph_label = label;
				viewNode.mainShape.node.setAttribute("class", viewNode.id);

				label.node.removeAttribute("style");
				label.node.removeAttribute("text");
				label.node.setAttribute("class", viewNode.id+" label");

				img_gear.node.setAttribute("class", viewNode.id+" clickable");				
				img_gear.click(function(){
					gui.controller.reactOnEvent("EditNode", {nodeId: viewNode.id});
				});

				viewNode.set.push(rect, label, img_gear);
			},
			visualiseNode : function visualiseNode(dataNode, x, y, forRepo){
				// console.log(dataNode);
				var viewNode = this.getBlankNode(x, y);
				var nodeType = dataNode.nodeType.toLowerCase();
				var controlType = dataNode.controlType ? dataNode.controlType.toLowerCase() : "";

				this.prepareData( dataNode, viewNode );
				this.assumeColor(nodeType, viewNode, controlType);
				// console.log(viewNode.id, viewNode.color, nodeType);
				if ( nodeType == "control" ){
					this.draw_controlNode(viewNode);

					if(viewNode.isStart)
						view.dragCFArrow( viewNode.mainShape, viewNode, true );

				} else {
					this.draw_rectNode(viewNode);
					viewNode.drawConnectors();
					view.dragCFArrow( viewNode.connectors, viewNode );
					var fun = ( this["draw_"+nodeType+"Node"] || this.draw_unknownNode );
					// console.log("draw_"+nodeType+"Node", this["draw_"+nodeType+"Node"], fun);
					fun(viewNode); // tutaj rysowane są atrybuty do danego typu
				}

				viewNode.drawIO(view.paper);
				this.addTooltips( viewNode );
				view.dragNodes( viewNode.raph_label, viewNode );

				return viewNode;
			},
			draw_controlNode : function draw_controlNode(node){
				var size = CFG.nodeDefaults.conditionSize,
					offsetY = 5,
					isCondition = (node.controlType.toLowerCase() === "#conditionstart" || node.controlType.toLowerCase() === "#conditionend"),
					mainShape,
					label
				;
				if( isCondition ){
					node.x = node.x + CFG.nodeDefaults.defaultWidth / 2 + size/2;
					node.width = node.height = size;
					if( node.controlType === "#conditionStart" ) {
						mainShape = view.paper.path("M "+node.x+" "+node.y+" l "+size+" "+size+" l -"+size+" "+size+" l -"+size+" -"+size+" z").attr({"fill": CFG.colors.conditionStart});
					} else if( node.controlType == "#conditionEnd" ) {
						mainShape = view.paper.path("M "+node.x+" "+node.y+" l "+size+" "+size+" l -"+size+" "+size+" l -"+size+" -"+size+" l "+size+" -"+size+" M "+(node.x - size*.5)+" "+(node.y + size*1.5)+" l "+(size)+" -"+size).attr({"fill": CFG.colors.conditionEnd});
					}
				} else {
					node.x = node.x + CFG.nodeDefaults.defaultWidth / 2 + node.r/2;
					node.width = node.height = CFG.nodeDefaults.defaultRarius;
					node.isStart = ( node.controlType && node.controlType.toLowerCase() == "#start" );
					node.y = node.y + CFG.nodeDefaults.defaultRarius;
					offsetY = 20;
					node.width = node.height = node.r;
					mainShape = view.paper.circle(node.x, node.y, node.r).attr({fill: node.color, stroke: CFG.colors.normalStroke});
				} 

				node.getPossiblePositionsOfConnectors = function getPossiblePositionsOfConnectors(){

					return [[this.x, ( isCondition ? this.y + CFG.nodeDefaults.conditionSize : this.y )]];
				},

				label = view.paper.text(node.x, node.y-offsetY, node.label);

				mainShape.node.setAttribute("class", node.id);
				if( node.isStartNode )
					mainShape.attr({cursor: "crosshair"});
				
				label.node.removeAttribute("style");
				label.node.removeAttribute("text");
				label.node.setAttribute("class", node.id + " label");

				node.mainShape = mainShape;
				node.raph_label = label;
				node.raph_label.dblclick(function(){
					gui.controller.reactOnEvent("EditNode", {nodeId: node.id});
				});

				node.set.push(mainShape, label);
				
				// node.isInside = function(x1,y1,x2,y2){
				// 	return this.x+this.r > x1 &&
				// 			this.y+this.r > y1 &&
				// 			this.x-this.r < x2 &&
				// 			this.y-this.r < y2
				// 			;
				// }
				// node.getPossiblePositionsOfConnectors = function(){
				// 	return [[this.x, this.y]];
				// }
				// node.switchToCFMode = function switchToCFMode(){
				// 	$.each(this.inputs, this.hide);
				// 	$.each(this.outputs, this.hide);
				// 	// $.each(this.connectors, this.show);
				// 	if(node.isStart)
				// 		this.mainShape.attr({cursor: "crosshair"})
				// },
				// node.switchToDFMode = function switchToDFMode(){
				// 	$.each(this.inputs, this.show);
				// 	$.each(this.outputs, this.show);
				// 	// $.each(this.connectors, this.hide);
				// 	if(node.isStart)
				// 		this.mainShape.attr({cursor: "default"})
				// }
				// ;

				return node;
			},
			draw_serviceNode : function draw_serviceNode(viewNode, paper){
				var paper = paper || view.paper,
					maxLength = CFG.nodeDefaults.maxLengthOfShownServiceName,
					serviceName = viewNode.serviceName,
					shortenServiceName,
					serviceNameShown
				;
				// jsonFormatter(viewNode, 1, 1)
				if( viewNode.hasSubgraph ){
					var img_subgraph = paper.image("/images/subgraph.png", viewNode.x + 3, viewNode.y+5, 20, 20).attr("title", "subgraph");
					img_subgraph.node.setAttribute("class", viewNode.id+" subgraph");
					img_subgraph.dblclick(function(){
						gui.controller.reactOnEvent("SwitchCurrentGraph", {nodeId: viewNode.id});
					});
					viewNode.set.push(img_subgraph)
				}

				if( serviceName ){
					shortenServiceName = serviceName.length > maxLength ? serviceName.substring(0, maxLength-3)+"..." : serviceName,
					serviceNameShown = paper.text(viewNode.x+viewNode.width/2, viewNode.y + 25, shortenServiceName);
					serviceNameShown.node.setAttribute("class", name);
					serviceNameShown.attr({title: serviceName, cursor: "default"});
					viewNode.set.push(serviceNameShown);
				}
				
				return viewNode;
			},
			draw_functionalityNode : function draw_functionalityNode(viewNode, paper){
				// nothing to add here
				return viewNode;
			},
			draw_mediatorNode : function draw_mediatorNode(viewNode, paper){
				var paper = paper || view.paper;

				var img_db = paper.image("/images/db.jpg", viewNode.x + 5, viewNode.y+8, 20, 20).attr("title", "Data Base");
				img_db.node.setAttribute("class", viewNode.id+" database");

				viewNode.set.push( img_db );
			},
			drawEdge : function drawEdge(c){ // c - coords
				var size = 4;
				return view.paper.arrow(c.x1, c.y1, c.x2, c.y2, size);
			},
			addTooltips : function addTooltips(visualizedNode){
				function close(){
				}
				// te funkcje wywołują się podczas dodawania IO, nie ma ich tutaj sensu powtarzać
				// visualizedNode.addInputTooltips();
				// visualizedNode.addOutputTooltips();
				visualizedNode
				.prepareNodeDescription()
				.mainShape.mouseover(
					(function(that){
						return function(evt, x, y){
							view.tooltip.open(that.type+":"+that.label, that.description, x, y, evt);
						};
					})(visualizedNode)
				).mouseout(function(){
					view.tooltip.close();					
				});
			}
		};

		// outputObject.extendVisualisation("Mediator", outputObject.draw_serviceNode);
		outputObject.extendVisualisation("StreamingWorkflowEngine", outputObject.draw_serviceNode);
		outputObject.extendVisualisation("JavaService", outputObject.draw_serviceNode);
		outputObject.extendVisualisation("EmulationService", outputObject.draw_serviceNode);

		return outputObject;
	};
//Koniec pliku nodeVisualizator.js
//Poczatek pliku view.js
// to Do
// done // walidacja, edycja, json2ssdl, startstop

"use strict";
// var rozmieszczenie = [247, 33, 247, 234, 174, 77, 175, 147,247, 33, 247, 234, 174, 77, 175, 147];

function View(id, width, height, gui, graphSaveParamsJSON){
	var pf = gui.id_postfix;
	graphSaveParamsJSON = graphSaveParamsJSON || {
		tabLabel:"",
		tabId: "",
		formId: "graphSaveParams",
		fields : [
		{
			label: "name",
			id: "f_graphSaveParams_name",
			inputType: "textbox",
			validation: function(value){},
			values: []
		},
		{
			label: "description",
			id: "f_graphSaveParams_description",
			inputType: "textarea",
			validation: function(value){},
			values: []
		}
	]};
	// tymczasowo na potrzeby rozdzielenia wtyczek na wiele plików
	window.graphSaveParamsJSON = graphSaveParamsJSON;
	var outputView = {
		id : id,
		width : width,
		height : height,
		mode : "DF",
		bgSelectionHelper : null,
		scale : 100,
		xPos : 0,
		yPos : 0,
		columnParams : {
			top_nav : {},
			leftCol : {},
			centerCol : {},
			rightCol : {}
		},
		graph_views_tab : [],
		current_graph_view: {
			id : "root",
			nodes : [],
			edgesCF : [],
			edgesDF : []
		},
		updateNode : function updateNode(node){
			var id = node.nodeId,
				newNode,
				oldNode,
				index,
				that = this
			;
			$.each(this.current_graph_view.nodes, function(i){
				if(this.id === id){
					oldNode = this;
					index = i;
					return false;
				}
			})
			if(oldNode && oldNode.removeView){
				// console.log(oldNode);
				var x = oldNode.x,
					y = oldNode.y
				;

				if( oldNode.mainShape.type === "circle" ){
					y -= CFG.nodeDefaults.defaultRarius;
					x -= (CFG.nodeDefaults.defaultRarius / 2 + CFG.nodeDefaults.defaultWidth / 2);
				} else if( oldNode.mainShape.type === "path" ){
					x -= (CFG.nodeDefaults.conditionSize / 2 + CFG.nodeDefaults.defaultWidth / 2);					
				}
				oldNode.removeView();
				
				newNode = this.visualiser.visualiseNode(node, x, y);
				// console.log(newNode, "696")
				newNode.switchMode(this.mode);
				this.current_graph_view.nodes[index] = newNode;

				//update CF edges
				$.each(this.current_graph_view.edgesCF, function(i, v){
					if(this.source && this.source.id === id){
						that.current_graph_view.edgesCF[i].source = newNode;
					}
					if(this.target && this.target.id === id){
						that.current_graph_view.edgesCF[i].target = newNode;
					}
				});

				// console.log(newNode);
				var io_tmp,				// update DF edges
					indexesToSplice = []
				;

				// console.log(newNode.getOutputById(this.output.id));
				$.each(this.current_graph_view.edgesDF, function(i, v){
					// console.log("aaa", this.output.id)
					// console.log("aaa", this.sourceId, id, i)
					if(this && this.sourceId === id){
						io_tmp = newNode.getOutputById(this.output.id)
						// console.log("bbb", io_tmp);
						if(io_tmp){
							this.output = io_tmp;
							if(this.mode === "DF")
								this.update();
						}
						else {
							this.remove();
							if(!~indexesToSplice.indexOf(i))
								indexesToSplice.push(i);
						}
					}
					else if(this && this.targetId === id){
						// console.log("2")
						io_tmp = newNode.getInputById(this.input.id)
						if(io_tmp){
							this.input = io_tmp;
							if(this.mode === "DF")
								this.update();
						}
						else {
							this.remove();
							if(!~indexesToSplice.indexOf(i))
								indexesToSplice.push(i);
						}
					}
					// console.log(indexesToSplice)
					// console.log(i, v, id, io_tmp)
				});

				var DF = this.current_graph_view.edgesDF;
				$.each(indexesToSplice, function(){
					DF.splice(this, 1);
				});
			}

			var o = this.current_graph_view.edgesDF.map(function(o){ return o.output.id;});
			// console.log(o)
		},
		setCurrentGraph : function setCurrentGraph(id){
			var currGraph = this.getGraphById(id);
			if(currGraph){
				this.hideCurrentGraph();
				this.current_graph_view = currGraph;
				this.showCurrentGraph();
			}

			return this;
		},
		updateGraph : function updateGraph(nodeId){
			var node = this.getNodeById(nodeId);
			if(node){
				node.update();
			}
		},
		hideAllUnwantedEdges : function hideAllUnwantedEdges(){
			var edges = ( this.mode === "DF" ? this.current_graph_view.edgesCF : this.current_graph_view.edgesDF );
			$.each(edges, function(){
				this.hide();
			});
		},
		changeCurrentGraphView : function changeCurrentGraphView(id){
			var result;
			// console.log(this.graph_views_tab)
			// console.log(id, this.graph_views_tab.map(function(o){ return o.id;}))
			$.each(this.graph_views_tab, function(){
				if(this.id === id){
					// a(this.id)
					result = this;
					return false;
				}
			});
			if(result){
				this.hideCurrentGraph();
				this.current_graph_view = result;
				this.showCurrentGraph();
				this.switchMode();
			}
		},
		editNode : function editNode(node){
			this.form.init(node);
		},
		deleteNode : function deleteNode(node){
			gui.controller.reactOnEvent("NodeDeleted");
		},
		addStartStop : function addStartStop(obj){
			var start = obj.start,
				stop = obj.stop
			;

			start = this.visualiser.visualiseNode(start);
			stop = this.visualiser.visualiseNode(stop);
			if(start && stop){
				this.current_graph_view.nodes.unshift( start, stop );
			}
		},
		addNodeFromRepo : function addNodeFromRepo(node){
			//dodać lepiej dobierane parametry x, y
			var visualizedNode = this.visualiser.visualiseNode( node );
			if( visualizedNode ) {
				visualizedNode.switchMode( this.mode );
				this.current_graph_view.nodes.push( visualizedNode );
			}
		},
		getGraphById : function getGraphById(id){
			var result;
			$.each(this.graph_views_tab, function(){
				if(id === this.id){
					result = this;
					return false;
				}
			});

			return result;
		},
		switchMode : function switchMode(mode){
			if(this.mode != mode){
				mode = mode || this.mode;
				$.each(this.current_graph_view.nodes, function(){
					this.switchMode(mode);
				});

				$.each(this.current_graph_view.edgesCF, function(){
					this.switchMode(mode);
				});
				$.each(this.current_graph_view.edgesDF, function(){
					this.switchMode(mode);
				});
				this.current_graph_view.mode = mode;
				this.mode = mode;
			}
		},
		convertGraphViewToXML : function convertGraphViewToXML(humanFriendly){
			var n = this.current_graph_view.nodes,
				id = "testowe_id",
				tab_XML = [],
				stringXML
				;

			if(n && n.length > 0){
				// inner()
				tab_XML.push( "<graphView>\n" );
					tab_XML.push( "\t<graph_id>"+id+"</graph_id>\n" );
					tab_XML.push( "\t<graphView_properties>\n");
						tab_XML.push( "\t\t<scale>"+this.scale+"</scale>\n");
						tab_XML.push( "\t\t<xPos>"+this.xPos+"</xPos>\n");
						tab_XML.push( "\t\t<yPos>"+this.yPos+"</yPos>\n");
						tab_XML.push( "\t\t<view_mode>"+this.mode+"</view_mode>\n");
					tab_XML.push( "\t</graphView_properties>\n" );
					tab_XML.push( "\t<nodes>\n" );
					$.each(n, function(){
						tab_XML.push( "\t\t<node>\n" );
							tab_XML.push("\t\t\t<nodeId>"+this.id+"</nodeId>\n");
							tab_XML.push("\t\t\t<xPos>"+this.x+"</xPos>\n");
							tab_XML.push("\t\t\t<yPos>"+this.y+"</yPos>\n");
							tab_XML.push("\t\t\t<width>"+this.width+"</width>\n");
							tab_XML.push("\t\t\t<height>"+this.height+"</height>\n");
						tab_XML.push( "\t\t</node>\n" );
					});
					tab_XML.push("\t</nodes>\n")
				tab_XML.push( "<graphView>\n" );
			}

			stringXML = tab_XML.join("")
			if(!humanFriendly)
				stringXML = stringXML.replace(/\t/g, "").replace(/\n/g, "");

			return stringXML;
		},
		getNodeById : function getNodeById(id, tab){
			var result;
			var nodes = tab || this.current_graph_view.nodes;
			// console.log(id, tab);
			$.each(nodes, function(){
				if( this.id == id){
					result = this;
					return false;
				}
			});

			return result;
		},
		dragNodes : function dragNodes(element, node){
			var that = this;
			if(getType(element) === "array"){
				$.each(element, function(){
					this.drag( that.nodeDragger.move, that.nodeDragger.start, that.nodeDragger.stop );
				});
			} else
				element.drag( that.nodeDragger.move, that.nodeDragger.start, that.nodeDragger.stop );
		},
		returnFromDraggingNodes : function returnFromDraggingNodes(dx, dy){
			$.each(gui.view.current_graph_view.nodes, function(i, val){
				if(val.highlighted){
					val.returnFromDragging(dx, dy);
				}
			});
			this.updateEdges();
			this.showEdges();
		},
		prepareNodesToDrag : function prepareNodesToDrag(){
			this.hideEdges();
			$.each(gui.view.current_graph_view.nodes, function(i, val){
				if(val.highlighted){
					val.prepareToDrag();
				}
			});
		},
		dragCFArrow : function dragArrow(element, node, isStartNode){
			var arrow,
				cx,
				cy,
				offsetX,
				offsetY,
				sourceNode,
				glows = [],
				paper = gui.view.paper,
				canvas = $(paper.canvas),
				bbox,
				tmp,
				start = function start(){
					if(gui.view.mode == "CF" || isStartNode){
						tmp = paper.canvas.getBBox();
						offsetX = canvas.offset().left + parseInt(canvas.css("border-top-width"), 10) - 2*tmp.x;
						offsetY = canvas.offset().top + parseInt(canvas.css("border-left-width"), 10) - 2*tmp.y;
						bbox = this.getBBox();
						cx = (bbox.x + bbox.x2) / 2;
						cy = (bbox.y + bbox.y2) / 2;
						sourceNode = gui.view.getNodeById(this.node.classList[0]);

						arrow = gui.view.paper.arrow(cx, cy, cx, cy, 4);

						if( isStartNode && gui.view.mode == "DF" ){
							$.each(gui.view.current_graph_view.nodes, function(i, v){
								$.each(v.inputs, function(){
									// console.log(v.id, this.id);
									// if(output && this.dataType === output.dataType && !gui.view.isInputConnected(v.id, this.id)){
										glows.push( this.node.glow({color: "purple"}) );
									// }
								});
							});
						}
						if( gui.view.mode == "CF" ){
							$.each(gui.view.current_graph_view.nodes, function(i, v){
								console.log(this.id, sourceNode.id)
								if(this != sourceNode && !gui.view.getCFEdge(sourceNode.id, this.id) && (this.type.toLowerCase() != "control" || (typeof this.controlType != "string" || this.controlType.toLowerCase() != "#start" ) ) )
								glows.push( this.mainShape.glow({color: "green"}) );
							});
						}
					}
				},
				move = function(a, b, c, d, event){
					if(gui.view.mode === "CF" || isStartNode){
						// todo awizowanie arrow po najechaniu na node
						try {
							arrow[0].remove();
							arrow[1].remove();
						} catch(e){
							console.log(e);
						}
						// to  to jest dopuki błażej nie poprawi czegośtam u siebie
						arrow = gui.view.paper.arrow(cx, cy, event.clientX-offsetX + window.scrollX, event.clientY - offsetY + window.scrollY , 4);
						arrow[0].attr({"stroke-dasharray": ["--"]});
					}
				},
				stop = function(event){
					try {
						arrow[0].remove();
						arrow[1].remove();
					} catch(e){
						// console.log(e);
					}

					if(gui.view.mode === "CF"){
						var targetNode = gui.view.getNodesInsideRect(event.clientX-offsetX + window.scrollX, event.clientY - offsetY + window.scrollY);
						if(targetNode && sourceNode && targetNode.id !== sourceNode.id){
							gui.controller.reactOnEvent("AddCFEdge", {
							 	source: sourceNode,
							 	target: targetNode,
							 	CF_or_DF: "CF"
							 	// type: 
							});
						}
					} else if(isStartNode && sourceNode && !targetNode){
						var resultObj = gui.view.getInputByPosition(event.clientX-offsetX + window.scrollX, event.clientY - offsetY + window.scrollY );
						if(sourceNode && resultObj && !gui.view.isInputConnected(resultObj.targetId, resultObj.input.id)){
							// alert("HURA");

							if(confirm(language[gui.language].alerts.addOutputS+sourceNode.label+language[gui.language].alerts.addOutputE)){
								gui.controller.reactOnEvent("addOutput", {
									sourceId : sourceNode.id,
									targetId : resultObj.targetId,
									input : resultObj.input
								});
							}
							// $("#f_addInputForm")
							// wyrmularz, z uzupeÅ‚nionymi polami
							// confirm -> controller i update node
							// addConnectionDF
						}
					}

					$.each(glows, function(){
						this.remove();
					});
					glows = [];
				}
				;

			if(getType(element) === "array"){
				$.each(element, function(){
					// alert(this +":"+ this.getType());
					// console.log( this );
					this.drag(move, start, stop);
				})
			} else
				element.drag(move, start, stop);
		},
		dragDFArrow : function dragArrow(element, node){
			//WŁODKU, na razie na szybko przerobiłam to tak, żeby mi działało (tj. żeby zwracało obiekt +
				// funkcja map() przypisuje ten obiekt jako drag handler do elementu). Jeżeli będziesz coś 
				//przerabiał, to w miarę możliwości zachowaj tą konstrukcję :) -- Dorota
			var arrow,
				cx,
				cy,
				offsetX,
				offsetY,
				sourceNode,
				targetId,
				output,
				bbox,
				glows = [],
				paper = gui.view.paper,
				canvas = $(paper.canvas),
				ctrlPressed = true,
				tmp, isStartNode,
				result = {
					start: function start(x, y, evt){
						if(!evt.ctrlKey){
							// console.log('arrow draw start');
							tmp = paper.canvas.getBBox();
							offsetX = canvas.offset().left + parseInt(canvas.css("border-top-width"), 10) - tmp.x;
							offsetY = canvas.offset().top + parseInt(canvas.css("border-left-width"), 10) - tmp.y;
							bbox = this.getBBox();
							cx = (bbox.x + bbox.x2) / 2;
							cy = (bbox.y + bbox.y2) / 2;
							sourceNode = outputView.getNodeById(this.node.classList[0]);
							if(sourceNode){
								output = sourceNode.getOutputById(this.node.classList[2]);

								if(output && output.dataType != "dynamic"){
									$.each(gui.view.current_graph_view.nodes, function(i, v){
										if( v.id != sourceNode.id && sourceNode.controlType.toLowerCase() != "#conditionend" && !!~CFG.flexibleTypes.indexOf( v.type.toLowerCase() ) )
											glows.push( v.mainShape.glow({color: "purple"}) );
										$.each(v.inputs, function(){
											if((this.dataType === output.dataType || this.dataType === "dynamic") && !gui.view.isInputConnected(v.id, this.id)){ // ERROR? powinno być gui.controller
												glows.push( this.node.glow({color: "green"}) );
											}
										});
									});

									arrow = paper.arrow(cx, cy, cx, cy, 4);
									ctrlPressed = false;
								} else {
									throw {
										name: "object missing",
										message: "output not found nodeId: "+this.node.classList[0]+", outputId: "+this.node.classList[2]
									}
								}
							} else {
								throw {
									name: "object missing",
									message: "sourceNode not found by id: "+this.node.classList[0]
								};
							}
						}
					},
					move: function move(a, b, c, d, event){
						if(!ctrlPressed){
							// todo awizowanie arrow po najechaniu na node
							try {
								arrow[0].remove();
								arrow[1].remove();
							} catch(e){
								// console.log(e);
							}
							
							arrow = paper.arrow(cx, cy, event.clientX-offsetX + window.scrollX, event.clientY - offsetY + window.scrollY , 4);
							arrow[0].attr({"stroke-dasharray": ["--"]});
						}
					},
					stop: function stop(event){
						if(!ctrlPressed){
							// console.log('arrow drawing done');
							try {
								arrow[0].remove();
								arrow[1].remove();
							} catch(e){
								// console.log(e);
							}

							var resultObj = gui.view.getInputByPosition(event.clientX-offsetX + window.scrollX, event.clientY - offsetY + window.scrollY );
							// jsonFormatter(resultObj, true, true)
							// console.log(resultObj, "resultObj");
							if( sourceNode && output && output.dataType != "dynamic" && resultObj && !gui.view.isInputConnected(resultObj.targetId, resultObj.input.id) ){
								if(resultObj.input.dataType.toLowerCase() === output.dataType.toLowerCase() || resultObj.input.dataType.toLowerCase() === "dynamic"){
									gui.controller.reactOnEvent("AddDFEdge", {
									 	sourceId: sourceNode.id,
									 	targetId: resultObj.targetId,
									 	input: resultObj.input,
									 	output: output,
									 	CF_or_DF: "DF"
									});

									if(resultObj.input.dataType === "dynamic")
										gui.controller.assignTypeToOnceDynamicIO( resultObj.targetId, output.dataType );

								} else {
									gui.logger.error(language[gui.language].alerts.errors.error, language[gui.language].alerts.errors.ioDiffType)
								}
							}
							else {
								var targetNode = gui.view.getNodesInsideRect(event.clientX-offsetX + window.scrollX, event.clientY - offsetY + window.scrollY);
								if(targetNode && sourceNode && targetNode.id !== sourceNode.id && ( targetNode.type.toLowerCase() === "functionality" || targetNode.type.toLowerCase() === "control" && (targetNode.controlType && targetNode.controlType.toLowerCase() != "#conditionstart" &&  targetNode.controlType.toLowerCase() != "#conditionend")) ){
									if(confirm(language[gui.language].alerts.addInputS +  targetNode.label+ language[gui.language].alerts.addInputE)){
										gui.controller.reactOnEvent("addInput", {
											sourceId : sourceNode.id,
											targetId : targetNode.id,
											output : output
										});
									}
								}

								// $("#f_addInputForm")
								// wyrmularz, z uzupełnionymi polami
								// confirm -> controller i update node
								// addConnectionDF
							}

							$.each(glows, function(){
								this.remove();
							});
							glows = [];

							ctrlPressed = true;
						}
					},
					map: function map(){
						var that = this;
							// alert(element+":"+element.getType())
						if(getType(element) === "array"){
						$.each(element, function(){
							// alert(this +":"+ this.getType());
							// console.log( this );
							this.drag(that.move, that.start, that.stop);
						})
						} else
							element.drag(that.move, that.start, that.stop);
					}
				}
				;
		return result;
			
		},
		protoEdge : {
			arrow : undefined,
			arrowGlow : undefined,
			highlighted : false,
			labelPath : undefined,
			hide: function hide(){
				this.arrow[0].hide();
				this.arrow[1].hide();
				this.arrowGlow.hide();
				if(this.labelPath)
					this.labelPath.hide();
			},
			show: function show(){
				this.arrow[0].myShow(300);
				this.arrow[1].myShow(300);
				this.arrowGlow.show();
				if( this.labelPath )
					this.labelPath.show();
			},
			remove : function remove(){
				this.arrow[0].remove();
				this.arrow[1].remove();
				this.arrowGlow.remove();
			},
			selectArrow : function(e, multiselect){
				e = e || window.event;
				if( !e.ctrlKey  && !multiselect ){
					gui.controller.reactOnEvent("ESCAPE");
				}
				this.arrowGlow.remove();
				this.arrowGlow = gui.view.paper.set();
				this.arrowGlow.push(this.arrow[0].glow({width: CFG.egdeDefaults.glowSize, fill:false, opacity:0.4}));
				this.arrowGlow.push(this.arrow[1].glow({width: CFG.egdeDefaults.glowSize, fill:false, opacity:0.4}));
				e.stopPropagation? e.stopPropagation() : e.cancelBubble = true;
				this.highlighted = true;

				console.log(this)

				return false;
			},
			init : function init(){
				// this.fitLabel();
				this.update();
				this.init = undefined;
			},
			fitLabel: function fitLabel(){

				var p1, p2, p3, x1, x2, x3, y1, y2, y3, len, angle, label, offsetX = 10, offsetY = 8;
				var path = this.arrow[0];
				len = path.getTotalLength();
				p1 = path.getPointAtLength( 0 );
				p2 = path.getPointAtLength( len );
				p3 = path.getPointAtLength( len / 2 );
				x1 = p1.x;
				y1 = p1.y;
				x2 = p2.x;
				y2 = p2.y;
				x3 = p3.x;
				y3 = p3.y;

				angle = (Math.atan2(x1-x2,y2-y1) / Math.PI) * 180;
				if(angle>0)
					angle -= 180;
				else if(angle==0) { 
					angle-=90;
					offsetX = -20;
					offsetY = 0;
				}
				this.labelPath = gui.view.paper.text(x3-offsetX, y3-offsetY, this.label).toFront().attr({'stroke': 'black', 'stroke-width': '.5px'}).rotate(90+angle,x3,y3);


				// return label;
			},
			update : function(keepSelected){
				try	{
					if(this.labelPath)
						this.labelPath.remove();
					this.arrow[0].remove();
					this.arrow[1].remove();
				} catch(e){
				 	// console.log(e);	
				}
				// console.log(this.source, this.target);
				if( this.type!="CF" || this.source && this.target){
					this.arrow = gui.view.visualiser.drawEdge(this.getCoords());
					if(this.arrowGlow){
						this.arrowGlow.remove();
					} else{
						this.arrowGlow = gui.view.paper.set();
					}
					this.arrowGlow.push(this.arrow[0].glow({width: CFG.egdeDefaults.glowSize, color:'rgba(0,0,0,0)'}));
					this.arrowGlow.push(this.arrow[1].glow({width: CFG.egdeDefaults.glowSize, color:'rgba(0,0,0,0)'}));
					this.arrow[0].click(this.selectArrow.bind(this));
					this.arrow[1].click(this.selectArrow.bind(this));
					this.arrowGlow.click(this.selectArrow.bind(this));
					if(this.label){
						// remove() jako sposób "na szybko". Zamiast tego można zmienić wartości atrybutów na nowe
						this.fitLabel();
					}
					if(!keepSelected)
						this.highlighted = false;
				}
			}
		},
		addCFEdge : function addCFEdge(data, firstLoad){
			// console.log("addCFNode", data);
			var foundedEdge = (firstLoad ? false : this.getCFEdge(data.source.id, data.target.id));
			if(data.target.controlType && data.target.controlType.toLowerCase() == "#start"){
				gui.logger.warning(language[gui.language].alerts.errors.startCantPassControl);
			}
			else if(foundedEdge){
				gui.logger.warning(language[gui.language].alerts.errors.edgeExists);
			}
			else {
				var edgeObject = {
					source : data.source,
					target : data.target,
					label : data.label || "",
					type: "CF",
					toString : function toString(){
						return "SSDL_CFEdge object";
					},
					switchMode: function switchMode(mode){
						if(mode === "CF"){
							this.update();
							this.show();
						} else if(mode === "DF"){
							this.hide();
						} else if(mode === "H"){

						} else {
							// console.log('Wrong Argument');
						}
					},
					getCoords : function(){
						if(this.source && this.target){
							var bestConnectors = gui.view.getBestConnectors(
								this.source.getPossiblePositionsOfConnectors(),
								this.target.getPossiblePositionsOfConnectors()
							);
						}

						return bestConnectors;
					}
				};
				edgeObject.extend(this.protoEdge);
				edgeObject.init();

				return edgeObject;
			}
		},
		addDFEdge : function addDFEdge(data, firstLoad){
			var foundedDFEdge = (firstLoad ? false : this.getDFEdge(data.sourceId, data.targetId, data.output.id, data.input.id));
			if(foundedDFEdge){
				gui.controller.reactOnEvent(""); //err msg
			}
			else {
				var	edgeObject = {
					sourceId: data.sourceId,
					targetId: data.targetId,
					output : data.output,
					input : data.input,
					type : "DF",
					visible : true,
					toString : function toString(){
						return "SSDL_DFEdge object";
					},
					switchMode: function switchMode(mode){
						if(mode === "CF"){
							this.hide();
						} else if(mode === "DF"){
							this.update(this.highlighted);
							this.show();
						} else if(mode === "H"){

						} else {
							// console.log('Wrong Argument');
						}
					},
					getCoords : function(){
						var bboxInput = this.input.node.getBBox(),
							bboxOutput = this.output.node.getBBox();
						return {
							x1 : bboxOutput.x + bboxOutput.width / 2,
							y1 : bboxOutput.y + bboxOutput.height / 2,
							x2 : bboxInput.x + bboxInput.width / 2,
							y2 : bboxInput.y + bboxInput.height / 2
						};
					},		
					isInside : function(e){
						var coords = this.getCoords();
						var x1 = e.x1,
							y1 = e.y1,
							x2 = e.x2,
							y2 = e.y2,
							x3 = coords.x1,
							y3 = coords.y1,
							x4 = coords.x2,
							y4 = coords.y2;
						if(this.visible&&((x3>x1&&x3<x2&&y3>y1&&y3<y2)||(x4>x1&&x4<x2&&y4>y1&&y4<y2))) return true;
					}
				};
				edgeObject.extend(this.protoEdge);
				edgeObject.update();
				return edgeObject;
			}
		},
		updateEdges : function updateEdges(){
			if(this.mode === "CF"){
				$.each(this.current_graph_view.edgesCF, function(){
					this.update();
				});
			}
			else if(this.mode === "DF"){
				$.each(this.current_graph_view.edgesDF, function(){
					this.update();
				});
			}
		},
		showEdges : function showEdges(){
			if(this.mode === "CF"){
				$.each(this.current_graph_view.edgesCF, function(){
					this.show();
				});
			}
			else if(this.mode === "DF"){
				$.each(this.current_graph_view.edgesDF, function(){
					this.show();
				});
			}
		},
		hideEdges : function hideEdges(){
			if(this.mode === "CF"){
				$.each(this.current_graph_view.edgesCF, function(){
					this.hide();
				});
			}
			else if(this.mode === "DF"){
				$.each(this.current_graph_view.edgesDF, function(){
					this.hide();
				});
			}
		},
		getCFEdge : function getEdge(sourceId, targetId){
			var foundedCFEdge;
			$.each(this.current_graph_view.edgesCF, function(){
				if(this.source.id === sourceId && this.target.id === targetId){
					foundedCFEdge = this;
					return false;
				}
			});

			return foundedCFEdge;
		},
		getCFEdgesFrom : function getEdge(sourceId){
			var foundedCFEdge = [];
			$.each(this.current_graph_view.edgesCF, function(){
				if(this.source.id === sourceId){
					foundedCFEdge.push(this);
					// return false;
				}
			});

			return foundedCFEdge;
		},
		getCFEdgesTo : function getEdge(targetId){
			var foundedCFEdge = [];
			$.each(this.current_graph_view.edgesCF, function(){
				if(this.target.id === targetId){
					foundedCFEdge.push(this);
					return false;
				}
			});

			return foundedCFEdge;
		},
		getDFEdge : function getEdge(sourceId, targetId, outputId, inputId){
			var foundedDFEdge;
			$.each(this.current_graph_view.edgesDF, function(){
				if( this.sourceId === sourceId && this.targetId === targetId &&
					this.input.id === inputId && this.output.id === inputId ) {

					foundedDFEdge = this;
					return false;
				}
			});

			return foundedDFEdge;
		},
		getDFEdgesConnectedTo : function getDFEdgeConnectedTo(nodeId){
			var foundedDFEdgesCount = 0;
			$.each(this.current_graph_view.edgesDF, function(){
				if( this.sourceId === nodeId || this.targetId === nodeId ) {
					foundedDFEdgesCount++;
				}
			});

			console.log(nodeId, foundedDFEdgesCount);

			return foundedDFEdgesCount;
		},
		isInputConnected: function isInputConnected(nodeId, inputId){
			// alert(this.caller.callee)
			var result = false;
			$.each(this.current_graph_view.edgesDF, function(){
				if(this.targetId === nodeId && this.input.id === inputId){
					result = true;
					return false;
				}
			});
			// console.log(nodeId, inputId, result);

			return result;
		},
		parseAndSetDataModelToView : function parseAndSetDataModelToView(modelData){
			var tab = [],
				tmp,
				that = this,
				bool = true;
			;

			$.each(modelData, function(){
				tmp = that.drawGraph(this);
				if(tmp){
					tab.push( tmp );
					that.current_graph_view = tmp;
					that.hideCurrentGraph();
				}
			});

			this.graph_views_tab = tab;
			this.current_graph_view = tab[ tab.length-1 ];
			this.showCurrentGraph();
			this.switchMode();
			this.visualiser.resetCounter();
		},
		drawGraph : function drawGraph(graph_json){
			// alert(graph_json.nodes)
			var that = this,
				graph_view = this.getBlankGraph();
			;

			graph_view.id = graph_json.id;

			if(!this.paper){
				gui.error(language[gui.language].alerts.errors.noinit);
			}
			else {
				var paper = this.paper,
					that = this,
					type,
					visualizedNode,
					tmp
				;

				try{
					var deployerOutput = gui.controller.deploy(graph_json, paper.width);
				} catch(e){
					console.error(e);
				}

				var tmpCoords, x, y;

				$.each(graph_json.nodes, function(key, val){
					tmpCoords = deployerOutput.getCoords(val.nodeId);
					if(tmpCoords){
						x = tmpCoords[0];
						y = tmpCoords[1];
					}
					visualizedNode = that.visualiser.visualiseNode( val, x, y );
					if(visualizedNode)
						graph_view.nodes.push( visualizedNode );
				});

				var tmp;
				$.each(graph_json.nodes, function(key, val){
					$.each(val.sources, function(){
						console.log("-----------", this, graph_view.nodes.map(function(o){return o.id}))
						tmp = that.addCFEdge({
							source: that.getNodeById(this, graph_view.nodes),
							target: that.getNodeById(val.nodeId, graph_view.nodes)
						});

						if(tmp)
							graph_view.edgesCF.push(tmp);
					});
					$.each(val.targets, function(){
						// console.log(this, graph_view.nodes.map(function(o){return o.id}))
						tmp = that.addCFEdge({
							source: that.getNodeById(val.nodeId, graph_view.nodes),
							target: that.getNodeById(this, graph_view.nodes)
						});

						if(tmp)
							graph_view.edgesCF.push(tmp);
					});
					if(val.controlType.toLowerCase() === "#conditionstart"){
						tmp = that.addCFEdge({
							source: that.getNodeById(val.nodeId, graph_view.nodes),
							target: that.getNodeById(val.condition.then, graph_view.nodes),
							label: "TRUE"
						});

						if(tmp)
							graph_view.edgesCF.push(tmp);

						tmp = that.addCFEdge({
							source: that.getNodeById(val.nodeId, graph_view.nodes),
							target: that.getNodeById(val.condition.else, graph_view.nodes),
							label: "FALSE"
						});

						if(tmp)
							graph_view.edgesCF.push(tmp);
					}

					$.each(val.functionalDescription.inputs, function(){
						if(this && this.source && this.source.length == 2){
							// console.log( val.nodeId, this.source )
							var tmp = that.addDFEdge({
									sourceId : this.source[0],
									targetId : val.nodeId,
									input : that.getNodeById(val.nodeId, graph_view.nodes).getInputById(this.id),
									output : that.getNodeById(this.source[0], graph_view.nodes).getOutputById(this.source[1])
								});

							if(tmp)
								graph_view.edgesDF.push(tmp);
						}
					});
				});

				return graph_view;

			}
		},
		getBestConnectors : function getBestConnectors(sourceConnectors, targetConnectors){
			var minOdl=Infinity,
				minI,
				minJ,
				dx, dy, dz,
				i, iMax, j, jMax
				;
			for(i=0, iMax=sourceConnectors.length; i<iMax; i++){
				for(j=0, jMax=targetConnectors.length; j<jMax; j++){
					dx = sourceConnectors[i][0]-targetConnectors[j][0]; // odleglosc w poziomie
					dy = sourceConnectors[i][1]-targetConnectors[j][1];	// odleglosc w pionie
					dz = dx*dx + dy*dy;	// odleglo�?…â€º�?„â€¡
					if(dz < minOdl)
					{
						minI = i;
						minJ = j;
						minOdl = dz;
					}
				}
			}

			// console.log(sourceConnectors, targetConnectors)

			return {
				x1 : sourceConnectors[minI][0],
				y1 : sourceConnectors[minI][1],
				x2 : targetConnectors[minJ][0],
				y2 : targetConnectors[minJ][1]
			};
		},
		init : function init(){
			var $elem = $("#"+this.id),
				that = this;
			
			if(!(this.width && this.height)){
				this.width = parseInt($elem.css("width"), 10) || 950;
				this.height = parseInt($elem.css("height"), 10) || 650;
			}
			var heightOfTopBar = 20;

			var html = [],
				h = (this.height-2-heightOfTopBar),
				canvas_width = (Math.floor(this.width * .7)),
				left_plugins_width = (Math.floor(this.width * .15))
			;
			html.push("<div id='top_menu_"+pf+"' style='position:relative;background-repeat:repeat-x; background-image: url(/images/dropdown-bg.gif); width: "+(this.width-2)+"px; height:"+heightOfTopBar+"px; border:1px solid black;'>&nbsp; <span> </span></div>");
			html.push("<div id='top_nav_"+pf+"' style='width: "+(this.width-2)+"px; height:"+heightOfTopBar+"; border:1px solid black;'>&nbsp;&gt; <span> </span></div>");
			html.push("<div id='left_plugins_"+pf+"' style='width:"+left_plugins_width+"px; height:"+h+"px; float:left;border:1px solid black;'></div>");
			html.push("<div id='canvas_holder_"+pf+"' style='width:"+canvas_width+"px; height:"+h+"px; float:left;border:1px solid black; overflow: hidden; '>");
			html.push("<div id='console_"+pf+"' style='width:"+canvas_width+"px; height: 0px; float:left;'></div>");
			html.push("<div id='canvas_"+pf+"' style='width:"+canvas_width+"px; height:"+h+"px; float:left; '></div></div>");
			html.push("<div id='right_plugins_"+pf+"' style='width:"+(this.width-6-canvas_width-left_plugins_width)+"px; height:" + h + "px; float:left;border:1px solid black; '></div>");

			$elem.html(html.join(""));

			this.paper = Raphael("canvas_"+pf, canvas_width, h);
			// this.leftPlugins = Raphael("left_plugins_"+pf, left_plugins_width, h);
			this.bgSelectionHelper = this.paper.rect(0,0,width,height).attr({fill : "#DEDEDE", stroke: "none"}).toBack();
	
			$elem.css("width", this.width);
			$elem.css("height", this.height);

			//zbieranie danych o poÅ‚oÅ¼eniu
			var $column = $("#canvas_holder_"+pf),
				position = $column.position();
			this.columnParams.centerCol = {
				top : position.top,
				left : position.left,
				width : $column.width(),
				height : $column.height(),
			};

			$column = $("#left_plugins_"+pf)
			position = $column.position();
			this.columnParams.leftCol = {
				top : position.top,
				left : position.left,
				width : $column.width(),
				height : $column.height(),
			};
			
			$column = $("#right_plugins_"+pf);
			position = $column.position();
			this.columnParams.rightCol = {
				top : position.top,
				left : position.left,
				width : $column.width(),
				height : $column.height(),
			};

			$column = $("#top_nav_"+pf)
			position = $column.position();
			this.columnParams.top_nav = {
				top : position.top,
				left : position.left,
				width : $column.width(),
				height : $column.height(),
			};

			$column = $("#top_menu_"+pf)
			position = $column.position();
			this.columnParams.top_menu = {
				top : position.top,
				left : position.left,
				width : $column.width(),
				height : $column.height(),
			};
		},
		setBold : function setBold(x1, y1, x2, y2){
			$.each(this.current_graph_view.nodes, function(k, v){
				if( v.isInside(x1, y1, x2, y2) )
					v.setBold(true);
				else 
					v.setBold(false);
			});
		},
		deselectAll : function deselectAll(){
			$.each(this.current_graph_view.nodes, function(k, v){
				v.removeHighlight();
			});
			this.tooltip.close();
		},
		selectAll : function selectAll(){
			var e = {ctrl: false};
			$.each(this.current_graph_view.nodes, function(k, v){
				v.highlight2();
			});
			if(gui.view.mode === 'DF'){
				$.each(this.current_graph_view.edgesDF, function(k, v){
					v.selectArrow(e, true);
				});
			}else{
				$.each(this.current_graph_view.edgesCF, function(k, v){
					v.selectArrow(e, true);
				});
			}
		},
		selectNodesInsideRect : function selectNodesInsideRect(x1,y1,x2,y2, ctrl){
			//alert(x1+":"+x2+":"+ctrl)
			$.each(this.current_graph_view.nodes, function(k, v){
				if( v.isInside(x1, y1, x2, y2) )
					v.highlight(ctrl);
				else if(!ctrl){
					v.removeHighlight();
				}
			});	
		},
		selectEdgesInsideRect : function selectEdgesInsideRect(e){
			if(gui.view.mode === 'DF'){
				$.each(this.current_graph_view.edgesDF, function(k, v){
					if(v.isInside(e)) v.selectArrow(e, true);
				});
			}
		},
		setBoldNodesInsideRect : function setBoldNodesInsideRect(x1,y1,x2,y2){
			$.each(this.current_graph_view.nodes, function(k, v){
				if( v.isInside(x1, y1, x2, y2) )
					v.setBold(true);
				else
					v.setBold(false);
			});
		},
		getNodesInsideRect : function getNodeById(x1, y1, x2, y2, count){
			var resultTab = [];

			if( x1 && y1 ){
				x2 = (typeof x2 === 'number' ? x2 : x1);
				y2 = (typeof y2 === 'number' ? y2 : y1);
				count = (typeof count === 'number' ? count : 1);

				$.each(this.current_graph_view.nodes, function(){
					//a(x1+":"+y1+":"+x2+":"+y2+":"+count);
					if( this.isInside(x1, y1, x2, y2) ){
						resultTab.push(this);

						if(resultTab.length >= count)
							return false;
					}
				});
				//TU BYDEM DZIABAŁ (Błażej)
			}
			else {
				// console.trace();
			}
			//alert(resultTab[0]);
			return count === 1 ? resultTab[0] : resultTab;
		},
		getInputByPosition: function getInputByPosition(x, y){
			// gui.view.paper.rect(x-1, y-1, 2, 2).attr("fill", "red");
			var result,
				bbox,
				loopcontroller = true;
			$.each(this.current_graph_view.nodes, function(k, v){
				$.each(v.inputs, function(){
					bbox = this.node.getBBox();
					if ( bbox.x+bbox.width > x &&
						bbox.y+bbox.height > y &&
						bbox.x < x &&
						bbox.y < y
						){
						result = {
							targetId : v.id,
							input : this
						};
						loopcontroller = false;
						return false;
					}
				});

				return loopcontroller;
			});

			return result;
		},
		removeNode : function removeNode(id){
			$.each(this.current_graph_view.nodes, function(i, v){
				if(v.id === id){
					v.remove();
					return false;
				}
			});
		},
		hideCurrentGraph : function hideCurrentGraph(){
			$.each(this.current_graph_view.nodes, function(){
				this.hideNode();
			});
			$.each(this.current_graph_view.edgesDF, function(){
				this.hide();
			});
			$.each(this.current_graph_view.edgesCF, function(){
				this.hide();
			});
		},
		showCurrentGraph : function showCurrentGraph(){
			$.each(this.current_graph_view.nodes, function(){
				this.showNode();
			});
			$.each(this.current_graph_view.edgesDF, function(){
				this.show();
			});
			$.each(this.current_graph_view.edgesCF, function(){
				this.show();
			});
		},
		removeCurrentGraph : function removeCurrentGraph(){
			$.each(this.current_graph_view.nodes, function(){
				this.removeNode();
			});
			if(this.mode === "DF")
				$.each(this.current_graph_view.edgesDF, function(){
					this.remove();
				});
			else if(this.mode === "CF")
				$.each(this.current_graph_view.edgesCF, function(){
					this.remove();
				});
		},
		removeAllGraphs : function removeAllGraphs(){
			var that = this;
			$.each(this.graph_views_tab, function(){
				$.each(this.nodes, function(){
					this.removeNode();
				});
				if(that.mode === "DF")
					$.each(this.edgesDF, function(){
						this.remove();
					});
				else if(that.mode === "CF")
					$.each(this.edgesCF, function(){
						this.remove();
					});
			});

			this.current_graph_view = undefined;
			this.graph_views_tab.length = [];
		},
		getBlankGraph : function getBlankGraph(){
			return {
				id : "",
				nodes : [],
				edgesCF : [],
				edgesDF : [],
				xPos : 0,
				yPos : 0,
				scale : 100,
				mode : "DF"
			};
		},
		setBlankGraphAsCurrent : function setBlankGraphAsCurrent(){
			this.current_graph_view = this.getBlankGraph();
		},
		menuList : (function menuList(){
			//menu holder singleton (Menu Błażeja i Jacka)
			var Constructor = function(){
				var list = [];
				var opened = false;
				var sec = false;
				var obj = {
					push: function(menu){
						list.push(menu);
					},
					close: function(){
						if(!sec){
							for(var i in list){
								if(list[i]) list[i].close();
							}
							opened = false;
						}else{
							sec = false;
						}
					},
					signalOpened: function(){
						opened = true;
					},
					signalClosed: function(){
						opened = false;
					},
					isOpen: function(){
						return opened;
					},
					secure: function(){
						sec = true;
					}
				};
				return obj;
			}, instance = null;
			return {
				getInstance: function(){
					return instance || (instance = new Constructor);
				}
			}
		})(),
		contextMenu : contextMenu
	}
	outputView.init();
	outputView.tooltip = tooltipper();
	outputView.visualiser = nodeVisualizator(outputView);
	outputView.bottomBar = bottomBar(outputView.paper);
	outputView.form = form();
	outputView.blankNodes = blankNode();
	outputView.mainMenu = menu();
	// outputView.nodeDragger = nodeDragger();
	// outputView.mainMenu.init();

	var	lastDragX,
		lastDragY,
		ox, dx,
		oy, dy,
		width, height,
		lastRot = 0,
		itWasJustAClick = false,
		sel,
		x1, x2, y1, y2,
		bgStart = function(x, y, d){
			itWasJustAClick = true;
			ox = d.layerX;
			oy = d.layerY;
			lastDragX = 0;
			lastDragY = 0;
			sel = outputView.paper.rect(ox,oy,1,1).attr({fill: "#aaaaff", stroke: "#0000ff", opacity: .2});
		},
		bgMove = function(x, y, evt){
			itWasJustAClick = false;
			var rot = 0;	//angle of rotation
			if(x >= 0){
				if( y >= 0 ) rot = 0;
				else {
					rot = -90;
				}
			} else {
				if( y >= 0 ) rot = -270;
				else rot = -180;
			}
			
			if(rot == 0 || rot == -180)
				sel.attr("width", (x < 0 ? -x : x)+"px").attr("height", (y < 0 ? -y : y)+"px");
			else 
				sel.attr("height", (x < 0 ? -x : x)+"px").attr("width", (y < 0 ? -y : y)+"px");
				
			sel.rotate(rot-lastRot, ox, oy);	
			lastRot = rot;
			lastDragX = x;
			lastDragY = y;
			
			x1 = ox; y1 = oy;
			x2 = ox; y2 = oy;
			
			if(lastDragX >= 0)
				x2+=lastDragX;
			else
				x1+=lastDragX;
				
			if(lastDragY >= 0)
				y2+=lastDragY;
			else
				y1+=lastDragY;

			// gui.view.paper.rect(ox+x, oy+y, 2, 2).attr("fill", "red");
				

			// TUTAJ POWINNO BYC WYS�?…?ANIE EVENTU DO KONTROLERA Z 4MA WSP??â€œ�?…?�?…Â»�?„?DNYMI
			gui.view.setBoldNodesInsideRect(x1,y1,x2,y2);			
		},
		bgStop = function(evt){
			if(itWasJustAClick){
				gui.controller.reactOnEvent("ESCAPE");
			}
			else {
				x1 = ox; y1 = oy;
				x2 = ox; y2 = oy;
				
				if(lastDragX >= 0)
					x2+=lastDragX;
				else
					x1+=lastDragX;
					
				if(lastDragY >= 0)
					y2+=lastDragY;
				else
					y1+=lastDragY;
				
				// TUTAJ POWINNO BY�?„â€  WYS�?…?ANIE EVENTU DO KONTROLERA Z SELEKTEM
				
				gui.controller.reactOnEvent("SELECT", {
					x1 : x1,
					x2 : x2,
					y1 : y1,
					y2 : y2,
					ctrl : evt.ctrlKey
				});
				
				$.each(outputView.current_graph_view.nodes, function(i, val){
					val.setBold(false);
				});
			}

			sel.remove();
			sel = null;
			lastRot = 0;
		}

	outputView.bgSelectionHelper.drag(bgMove, bgStart, bgStop);

	return outputView;
};
//Koniec pliku view.js
//Poczatek pliku repoNodes.js
	function repoNodes(visualiser) {
		var resultObject = {
			currNodes: [],
			paper: undefined,
			data: undefined,
			scroller: undefined,
			require: "sdb_json_array div raphael_x_500".split(" "),
			init: function init() {
				if ($("#repoNodes_" + pf).length === 0) {
					$("#right_plugins_" + pf).append("<div id='repoNodes_" + pf + "' class='plugin_" + pf + "'> </div>");
					this.paper = Raphael("repoNodes_" + pf, gui.view.columnParams.rightCol.width - 1, 500);
					this.scroller = sideScroller(this.paper);
					this.createCover();					
				}
			},
			createCover: function createCover(){
				var that, left, top;
				left = $("#repoNodes_" + pf).position().left;
				that = this;
				this.cover = this.paper.rect(0, 0, this.paper.width, this.paper.height).attr({
					opacity: 0,
					fill: "ivory"
				}).mouseover(function() {
					that.scroller.showYourself();
				}).mouseout(function(evt, x, y) {
					top = $("#navigator_" + pf).position().top + $("#navigator_" + pf).height();
					if (!that.cover.isPointInside(x - left, y - top)) that.scroller.goHide();
				}).toFront();
			},
			setData: function setData(data) {
				if (data) {
					this.data = data;
				}

				return this;
			},
			draw: function draw() {
				var newRepoService,
					that = this,
					tmp, n = -1;

				this.clear();

				$.each(this.data, function(k, dataNode) {
					// console.log(dataNode)
					n++;
					newRepoService = visualiser.getBlankNode();
					visualiser.prepareData(dataNode, newRepoService);

					newRepoService.x = 10;
					newRepoService.y = 15 + (45 * n);
					newRepoService.width = CFG.nodeDefaults.defaultRepoWidth;
					newRepoService.height = CFG.nodeDefaults.defaultRepoHeight;
					newRepoService.inputs = dataNode.functionalDescription.inputs;
					newRepoService.outputs = dataNode.functionalDescription.outputs;
					newRepoService.color = CFG.colors.service

					// console.log("repo", newRepoService, that.data.length)
					visualiser.draw_rectNode(newRepoService, that.paper);
					newRepoService.drawIO(that.paper, true);
					newRepoService.raph_label.attr({
						cursor: "pointer"
					}).dblclick(function() {
						gui.controller.reactOnEvent("AddServiceFromRepoToCanvas", dataNode);
					});
					$.each(newRepoService.outputs, function() {
						this.node.attr({
							cursor: "default"
						});
					});

					visualiser.addTooltips(newRepoService);
					that.currNodes.push(newRepoService);

				});

				this.scroller.init();
				this.scroller.update(this.currNodes);

				return this;
			},
			clear: function clear() {
				if (this.paper) {
					this.paper.clear();
					this.currNodes.length = 0;
					this.createCover();
				}
				return this;
			}
		}

		return resultObject;
	}
//Koniec pliku repoNodes.js
//Poczatek pliku initLogger.js

	function initLogger(paper) {
		/* Logger 2.0 (Błażej)
		* SUBMITTED: 23.08.2012
		* REQUIRED PARAMS: 
		* - paper (on which we will draw button opening the console)
		* REQUIRED VARIABLES SET BY HIGHER LEVEL:
		* - pf (number for id randomization)
		* REQUIRED DOM ELEMENTS:
		* - div with id 'console_'+pf
		* AVIABLE FUNCTIONS:
		* - info(information string [, title string])
		* - warning(warning string [, title string])
		* - error(error string [, title string])
		*/
		// console.log(paper);
		var h = paper.height,
			lId = "#console_" + pf,
			eId = "#console_entries_" + pf,
			bPath = 'M' + (paper.width - 170) + ' 0 Q' + (paper.width - 170) + ' 25 ' + (paper.width - 145) + ' 25 L' + (paper.width - 45) + ' 25 Q' + (paper.width - 20) + ' 25 ' + (paper.width - 20) + ' 0 Z',
			alertbg = paper.path(bPath).attr({
				fill: "#FF0",
				"fill-opacity": 0.0
			}),
			buttonBG = paper.path(bPath).attr({
				fill: "#222",
				"fill-opacity": .75
			});
		///images
		var iImg = paper.image('/images/info.png', paper.width - 152, 4, 15, 15),
			wImg = paper.image('/images/warning.png', paper.width - 112, 4, 15, 15),
			eImg = paper.image('/images/error.png', paper.width - 72, 4, 15, 15);
		//counters
		var iCounter = paper.text(paper.width - 125, 11, "0").attr({
			fill: "white"
		}),
			wCounter = paper.text(paper.width - 85, 11, "0").attr({
				fill: "yellow"
			}),
			eCounter = paper.text(paper.width - 45, 11, "0").attr({
				fill: "orange"
			});
		//button mask
		var mask = paper.path(bPath).attr({
			fill: "#222",
			"fill-opacity": 0.0
		});
		//private variables
		var counter = [0, 0, 0],
			state = [true, true, true],
			cCId = "#console_controller_" + pf,
			bImgs = [iImg, wImg, eImg],
			bCount = [iCounter, wCounter, eCounter],
			buttonBG = buttonBG,
			animation = null,
			curElCount = 0,
			colors = ['#FAFAFF', '#FFFFE0', '#FFFAFA'],
			txtColors = ['white', 'yellow', 'orange'],
			imgNames = ['info', 'warning', 'error'],
			menu;

		//private functions
		var addMessage = function(message, priority) {
				curElCount++;
				var divId = "console_row_" + curElCount;
				var divString = [];
				divString.push("<div id='");
				divString.push(divId);
				divString.push("' class='console_row priority");
				divString.push(priority);
				divString.push("' style='border-bottom: dashed #222; border-bottom-width: 1px; background-color:");
				divString.push(colors[priority]);
				if (!state[priority]) {
					divString.push("; display: none")
				}
				divString.push(";'><table width='100%' style='table-layout: fixed;'><tr><td valign='top' style='width: 20px;'><img src='/images/");
				divString.push(imgNames[priority]);
				divString.push(".png' style='padding-left: 2px; padding-top: 3px;'/></td><td valign='top' style='float: left;'>");
				divString.push(message);
				divString.push("</td><td valign='top' style='width: 20px;'><div id='cCheck_");
				divString.push(curElCount);
				divString.push("'><form><input type='checkbox' class='cCheck'/></form></div></td><td valign='top' style='width: 20px;'><div id='cCancel_");
				divString.push(curElCount);
				divString.push("' style='cursor: pointer;'><img src='/images/cancel.png' title='");
				divString.push(language[gui.language].logger.delComm);
				divString.push("' style='padding-left: 2px; padding-top: 3px;'/></div></td></tr></table></div>");
				divString = divString.join("");
				$(divString).prependTo($(eId));
				var delId = "#cCancel_" + curElCount;
				var checkId = "#cCheck_" + curElCount;
				var nr = curElCount;
				$(delId).click(function() {
					counter[priority]--;
					redrawCounter(priority);
					delId = "#console_row_" + nr;
					$(delId).remove();
				});
			},
			redrawCounter = function(priority) {
				bCount[priority].remove();
				bCount[priority] = paper.text(paper.width - (125 - (priority * 40)), 11, counter[priority]).attr({
					fill: txtColors[priority]
				});
				mask.toFront();
			},
			refreshLogger = function(priority) {
				var visible;
				if (state[priority]) {
					visible = 'block';
				} else {
					visible = 'none';
				}
				var prClass = '.priority' + priority;
				$.each($(eId).find(prClass), function() {
					$(this).css('display', visible);
				});
			},
			refreshCounter = function() {
				var prClass, num;
				for (var i = 0; i < 3; i++) {
					prClass = '.priority' + i;
					num = 0;
					$.each($(eId).find(prClass), function() {
						num++;
					});
					counter[i] = num;
					redrawCounter(i);
				}
			},
			fade = function() {
				if (buttonBG.attr("fill-opacity") == 1) {
					buttonBG.animate({
						"fill-opacity": 0.75
					}, 700);
				} else {
					buttonBG.animate({
						"fill-opacity": 1
					}, 700);
				}
			},
			getScrollBarWidth = function() {
				var w = 0,
					testDiv = "<div id='scrollTest' style='overflow: scroll;'></div>";
				$('body').append(testDiv);
				var el = document.getElementById('scrollTest');
				w = el.offsetWidth - el.scrollWidth;
				$('#scrollTest').remove();
				return w;
			},
			close = function() {
				$(eId).css('overflow-y: hidden;');
				$(lId).animate({
					'height': 0
				});
				menu.close();
			};
		//console object
		var obj = {
			info: function info(title, text) {
				text = text || "(an empty string)";
				if (title) text = "<b>" + title + "</b><br/>" + text;
				counter[0]++;
				redrawCounter(0);
				//here adding to div and dTabs
				addMessage(text, 0);
			},
			warning: function warn(title, text) {
				text = text || "(an empty string)";
				if (title) text = "<b>" + title + "</b><br/>" + text;
				counter[1]++;
				redrawCounter(1);
				alertbg.animate({
					"fill-opacity": 1.0
				});
				//here adding to div and dTabs
				addMessage(text, 1);
			},
			error: function err(title, text) {
				text = text || "(an empty string)";
				if (title) text = "<b>" + title + "</b><br/>" + text;
				counter[2]++;
				redrawCounter(2);
				alertbg.animate({
					"fill-opacity": 1.0
				});
				//here adding to div and dTabs
				addMessage(text, 2);
				//pulse
				if (animation) clearInterval(animation);
				animation = setInterval(fade, 750);
			},
			open: function open() {
				if (animation) clearInterval(animation);
				alertbg.animate({"fill-opacity": 0});
				$(lId).animate({
					'height': h
				}, 400, function() {
					$(eId).css('overflow-y: scroll;');
				});
			},
			close: close
		};
		//adding console HTML structure
		var divString = [];
		divString.push("<div id='");
		divString.push("console_controller_" + pf);
		divString.push("' style='border-bottom: solid #222; border-bottom-width: 1px; background-color: white");
		divString.push("; height: 25px;'><table style='table-layout: fixed; width:");
		var w = $(lId).css('width');
		w = w.slice(0, w.length - 2);
		w = w - getScrollBarWidth();
		divString.push(w);
		divString.push("px;'><tr><td valign='top' style='float: left;'><div id='console_CL' class='logButton' style='margin-left: 5px; background-color: #FF7400; color: white;'>");
		divString.push(language[gui.language].logger.console_CL);
		divString.push("</div></td><td valign='top' style='width: 400px; text-align: right;'><div id='console_SA' class='logButton'>");
		divString.push(language[gui.language].logger.console_SA);
		divString.push("</div><div id='console_DA' class='logButton' style='margin-left: 10px;'>");
		divString.push(language[gui.language].logger.console_DA);
		divString.push("</div><div id='console_D' class='logButton' style='margin-left: 10px;'>")
		divString.push(language[gui.language].logger.console_D);
		divString.push("</div></td><td valign='top' style='width: 50px; text-align: right; cursor: default;'>");
		divString.push(language[gui.language].logger.show);
		divString.push("</td><td valign='top' style='width: 20px;'><div id='console_I' style='cursor: pointer;'><img src='/images/info.png' title='");
		divString.push(language[gui.language].logger.shInfo);
		divString.push("' style='padding-left: 2px; padding-top: 3px;'/></div></td>");
		divString.push("<td valign='top' style='width: 20px;'><div id='console_W' style='cursor: pointer;'><img src='/images/warning.png' title='");
		divString.push(language[gui.language].logger.shWarning);
		divString.push("' style='padding-left: 2px; padding-top: 3px;'/></div></td>");
		divString.push("<td valign='top' style='width: 20px;'><div id='console_E' style='cursor: pointer;'><img src='/images/error.png' title='");
		divString.push(language[gui.language].logger.shError);
		divString.push("' style='padding-left: 2px; padding-top: 3px;'/></div></td>");
		divString.push("</tr></table></div><div id='console_entries_" + pf + "' style='overflow-y:scroll; height:" + (h - 25) + "px;'></div>");
		divString = divString.join("");
		$(divString).prependTo($(lId));
		//event handling for console controller
		$('#console_I').click(function() {
			if (state[0]) {
				$('#console_I').css('opacity', 0.4);
				state[0] = false;
			} else {
				$('#console_I').css('opacity', 1);
				state[0] = true;
			}
			refreshLogger(0);
		});
		$('#console_W').click(function() {
			if (state[1]) {
				$('#console_W').css('opacity', 0.4);
				state[1] = false;
			} else {
				$('#console_W').css('opacity', 1);
				state[1] = true;
			}
			refreshLogger(1);
		});
		$('#console_E').click(function() {
			if (state[2]) {
				$('#console_E').css('opacity', 0.4);
				state[2] = false;
			} else {
				$('#console_E').css('opacity', 1);
				state[2] = true;
			}
			refreshLogger(2);
		});
		$('#console_SA').click(function() {
			$.each($(eId).find('.cCheck'), function() {
				if ($(this).parents('.console_row').css('display') != 'none') {
					$(this).prop('checked', true);
				} else {
					$(this).prop('checked', false);
				}
			});
		});
		$('#console_DA').click(function() {
			$.each($(eId).find('.cCheck'), function() {
				$(this).prop('checked', false);
			});
		});
		$('#console_D').click(function() {
			$.each($(eId).find('.cCheck'), function() {
				if ($(this).prop('checked') == true && $(this).parents('.console_row').css('display') != 'none') {
					$(this).parents('.console_row').remove();
				}
			});
			refreshCounter();
		});
		//unselect for text buttons
		document.getElementById('console_CL').onselectstart = function() {
			return (false);
		};
		document.getElementById('console_SA').onselectstart = function() {
			return (false);
		};
		document.getElementById('console_DA').onselectstart = function() {
			return (false);
		};
		document.getElementById('console_D').onselectstart = function() {
			return (false);
		};
		//main event handling
		$('#console_CL').click(function() {
			$(eId).css('overflow-y: hidden;');
			$(lId).animate({
				'height': 0
			});
		});
		mask.click(function() {
			obj.open();
		});
		
		$(mask.node).css('cursor', 'pointer');

		//context menu options
		menu = gui.view.contextMenu("console_" + pf, gui.view);
		menu.addOption(language[gui.language].logger.close, close);
		//object return
		return obj;
	};
//Koniec pliku initLogger.js
//Poczatek pliku deploy.js
	function deploy(ssdlJson, canvasW, nodeW, nodeH, nodeHSpacing, nodeVSpacing, startY) {
		/* DEPLOYER 2.0 (Błażej)
		 * REQUIRED PARAMS:
		 * - ssdlJson (jSon form of SSDL XML)
		 * - canvasW (width of canvas we will be drawing on)
		 * OPTIONAL PARAMS:
		 * - nodeW (width of nodes)
		 * - nodeH (height of nodes)
		 * - nodeHSpacing (minimum horizontal spacing between nodes)
		 * - nodeVSpacing (vertical spacing between nodes)
		 * - startY (height on canvas from which we start to draw graph)
		 * OUTPUT:
		 * - object
		 * -> coords (array{nodeID, nodeX, nodeY})
		 * -> getCoords (function(id) returning array{nodeX, nodeY} for specified ID)
		 */

		//-MAIN-FUNCTION--------------------->>>
		function run() { //deploying main ssdl graph
			var jnodes = ssdlJson.nodes,
				nodeArr = getNodes(jnodes);
			processNodes(nodeArr);
			var graphMat = postProcessNodes(nodeArr);
			// console.time("Deploying Time");
			// console.group("DEPLOYMENT RESULTS:");
			if (nodeArr.length > 18) { //CHOICE TIME
				// console.info("Genetic Alghoritm in use");
				var bestI = genetic(graphMat, 200, 250, 20, 25, 50);
			} else {
				// console.info("BruteForce Alghoritm in use");
				var bestI = bruteForce(graphMat);
			}
			var out = generateCoords(graphMat, bestI);
			// console.log("ALGHORITM PERFORMANCE: ");
			// console.timeEnd("Deploying Time");
			// console.info("Best deployment rating: " + bestI.rating);
			// console.log("GRAPH MATRIX: ");
			// console.log(graphMat);
			// console.log("DEPLOYMENT: ");
			// console.log(out);
			// console.groupEnd();
			var outObj = {
				coords: out,
				getCoords: function(id) {
					var len = this.coords.length;
					var outputCoordsTab;
					for (var i = 0; i < len; i++) {
						if (this.coords[i][0] === id) {
							outputCoordsTab = [this.coords[i][1], this.coords[i][2]];
							break;
						}
					}

					return outputCoordsTab;
				}
			}
			return outObj;
		};
		//-PARSING-FUNCTIONS----------------->>>
		function node(id, sources) { //NODE OBJECT
			this.id = id;
			this.parents = [];
			this.children = [];
			this.sources = sources;
			this.level = -1;
			this.column = -1;
		};
		function getNodes(jsonNodes) { //building nodes list basing on JSon form of SSDL
			var nodes = [];
			var i = 0;
			$.each(jsonNodes, function() {
				nodes[i] = new node(this.nodeId, this.sources);
				i++;
			});
			return nodes;
		};
		function getNodeById(nodeArray, nId) { //searching nodes list for node with specific id
			var ret = null
			$.each(nodeArray, function() {
				if (this.id == nId) {
					ret = this;
					return false;
				}
			});
			return ret;
		};
		function processNodes(nodeArray) { //setting flow for each node
			$.each(nodeArray, function() {
				var tempObj = this;
				$.each(this.sources, function() { //assigning parent/child refferences for each node
					var temp = getNodeById(nodeArray, this);
					if (temp != null) {
						tempObj.parents.push(temp);
						temp.children.push(tempObj);
					} else {
						// console.error("getNodeByID(" + this + ") returned NULL!!!");
					}
				});
			});
		};
		function postProcessNode(node) { //assigning node level to node and its parents/children
			if (node.id == "#Start") { //if in root assigning level 0
				node.level = 0;
			} else {
				$.each(node.parents, function() {
					postProcessNode(this);
				});
			}
			var lowerLevel = node.level;
			$.each(node.children, function() { //assigning  node level incremented by one to all children
				if (this.level == -1 || this.level > lowerLevel + 1) {
					this.level = lowerLevel + 1;
				}
			});
		};
		function postProcessNodes(nodeArray) { //creating graphMatrix and subgraph Matrixes
			var graphMatrix = [
				[]
			];
			postProcessNode(getNodeById(nodeArray, "#End")); //assigning node levels
			$.each(nodeArray, function() {
				if (this.id != "#End") { //for all nodes except #End
					if (!graphMatrix[this.level]) { //creating level array if not present
						graphMatrix[this.level] = [];
					}
					graphMatrix[this.level].push(this); //assigning node to graph matrix
					this.column = graphMatrix[this.level].length - 1; //assigning column nuber to node
				}
			});
			//assigning #End to graph matrix
			var stop = getNodeById(nodeArray, "#End");
			if (graphMatrix[stop.level]) {
				stop.level++;
			}
			graphMatrix[stop.level] = [stop];
			stop.column = 0;
			return graphMatrix;
		};
		//-AUXILIARY-FUNCTIONS--------------->>>
		function clone(tab) { //array shallow cloning function
			var result = [];
			$.each(tab, function(i, v) {
				result.push(v);
			});
			return result;
		};
		function cloneObj(obj) { //object deep cloning function
			var object = {};
			object.o = obj;

			// try  jQuery.extend(true, [], object);
			// roznica: {} -> [];
			var clone = jQuery.extend(true, {}, object);
			var result = clone.o;
			return result;
		};
		//-DEPLOYMENT-ALGORITHM-FUNCTIONS---->>>
		function individual(deploymentMatrix) { //INDIVIDUAL OBJECT
			this.deploymentMatrix = deploymentMatrix;
			this.rating = null;
		};
		function rate(individual, graphMatrix) { //rating individual by square criterion
			var deploymentMatrix = individual.deploymentMatrix,
				len = deploymentMatrix.length,
				rating = 0;
			for (var i = 1; i < len; i++) { //for each level
				var len2 = deploymentMatrix[i].length;
				for (var j = 0; j < len2; j++) { //for each column
					var num = deploymentMatrix[i][j],
						temp = graphMatrix[i][num].parents,
						//get parents
						len3 = temp.length,
						parentColIds = [],
						parentRowIds = [];
					for (var k = 0; k < len3; k++) { //get their IDs
						parentColIds.push(temp[k].column);
						parentRowIds.push(temp[k].level);
					}
					//sum horizontal distance to all parents for all nodes
					var len4 = parentColIds.length;
					for (var l = 0; l < len4; l++) {
						var len5 = deploymentMatrix[parentRowIds[l]].length;
						if (len2 > 1) {
							for (var o = 0; o < len5; o++) {
								if (deploymentMatrix[parentRowIds[l]][o] == parentColIds[l]) {
									var xLen = ((j + 1) / (len2 + 1)) - ((o + 1) / (deploymentMatrix[parentRowIds[l]].length + 1));
									xLen *= xLen;
									rating += Math.sqrt(xLen);
								}
							}
						}
					}
				}
			}
			individual.rating = rating;
			return rating;
		};
		//-BRUTEFORCE-VERSION---------------->>>
		function bruteForce(graphMatrix) { //searching for best deployment by bruteForce
			var len = graphMatrix.length,
				matrix = [
					[]
				],
				bruteForceMatrix = [
					[
						[]
					]
				],
				individuals = [],
				bestRating, tempRating, bestIndividual, tempIndividual;
			for (var i = 0; i < len; i++) { //for each level
				var len2 = graphMatrix[i].length,
					tab = [];
				for (var j = 0; j < len2; j++) { //create table of possible IDs
					tab.push(j);
				}
				//ZuO i mrokH i rekurencja
				bruteForceMatrix[i] = [];
				generatePossibleRows(tab, [], bruteForceMatrix[i], len2);
			}
			//here we have matrix of possible levels, now it's time to mix it to individuals
			generateDepMat(bruteForceMatrix, [], individuals, 0);
			var am = individuals.length,
				tempMat = [
					[]
				];
			for (var i = 0; i < len; i++) {
				tempMat[i] = [];
				tempMat[i] = bruteForceMatrix[i][individuals[0][i]];
			}
			bestIndividual = new individual(tempMat);
			bestRating = rate(bestIndividual, graphMatrix);
			//searching for best individual by checking all generated matrixes
			for (var i = 1; i < am; i++) {
				tempMat = [
					[]
				];
				for (var j = 0; j < len; j++) {
					tempMat[j] = [];
					tempMat[j] = bruteForceMatrix[j][individuals[i][j]];
				}
				tempIndividual = new individual(tempMat);
				tempRating = rate(tempIndividual, graphMatrix);
				if (tempRating < bestRating) {
					bestRating = tempRating;
					bestIndividual = tempIndividual;
				}
			}
			return bestIndividual;
		};
		function generatePossibleRows(possibleIds, combination, output, left) { //generating table of possible rows
			if (left == 0) { //if combination was completed
				output.push(combination); //add it to output matrix
			} else {
				for (var i = 0; i < left; i++) { //for left possible ids
					var ids = clone(possibleIds),
						newCombination = clone(combination);
					newCombination.push(ids[i]); //create new combinations
					for (var j = i; j < left - 1; j++) { //shrink support table
						ids[j] = ids[j + 1];
					}
					generatePossibleRows(ids, newCombination, output, left - 1); //send combination further
				}
			}
		};
		function generateDepMat(bfMatrix, combination, output, row) { //generating deployment matrixes for individuals
			if (row == bfMatrix.length) { //if combination was completed
				output.push(combination); //add it to output table
			} else {
				var len = bfMatrix[row].length;
				for (var i = 0; i < len; i++) { //for all possible combinations of this level
					var newCombination = clone(combination);
					newCombination.push(i); //create new deployment option based on row ids
					generateDepMat(bfMatrix, newCombination, output, row + 1); //send combination further
				}
			}
		};
		//-GENETIC-VERSION------------------->>>
		function genetic(graphMatrix, generationsAmount, individualsAmount, rivalsAmount, mutationRatio, hybridizationRatio) {
			var individuals = [];
			var oldIndividuals = null;
			//generating 1st individual and save it as best
			var deploymentMatrix = generateRandom(graphMatrix);
			var bestIndividual = new individual(deploymentMatrix);
			var bestRating = rate(bestIndividual, graphMatrix);
			var bestGen = 0;
			individuals.push(bestIndividual);
			//generating 1st generation
			for (var i = 1; i < individualsAmount; i++) {
				deploymentMatrix = generateRandom(graphMatrix); //generating random individual
				ind = new individual(deploymentMatrix);
				if (rate(ind, graphMatrix) < bestRating) { //rating random individual / if it's best then save it as best
					bestRating = ind.rating;
					bestIndividual = cloneObj(ind);
				}
				individuals.push(ind);
			}
			//generating further generations
			for (var i = 1; i < generationsAmount && bestRating > 0; i++) {
				oldIndividuals = cloneObj(individuals);
				for (var j = 0; j < individualsAmount; j++) {
					individual1 = select(oldIndividuals, individualsAmount, rivalsAmount);
					rand = Math.floor((Math.random() * 100)) + 1;
					if (rand < mutationRatio) {
						individual1 = mute(individual1);
					}
					rand = Math.floor((Math.random() * 100)) + 1;
					if (rand < hybridizationRatio) {
						individual2 = select(oldIndividuals, individualsAmount, rivalsAmount);
						hybridize(individual1, individual2);
						rand = Math.floor((Math.random() * 100)) + 1;
						if (rand < mutationRatio) {
							individual2 = mute(individual2);
						}
						individuals[j] = individual2;
						if (rate(individual2, graphMatrix) < bestRating) {
							bestRating = individual2.rating;
							bestIndividual = cloneObj(individual2);
							bestGen = i;
						}
						j++;
					}
					if (rate(individual1, graphMatrix) < bestRating) {
						bestRating = individual1.rating;
						bestIndividual = cloneObj(individual1);
						bestGen = i;
					}
					individuals[j] = individual1;
				}
			}
			// console.info("Best deployment discovered in " + bestGen + "/" + generationsAmount + " generation");
			return bestIndividual;
		};
		function select(individuals, indAm, rivalsAmount) { //selection by tournament
			rand = Math.floor((Math.random() * indAm));
			bestIndividual = individuals[rand];
			bestRating = bestIndividual.rating;
			for (var j = 1; j < rivalsAmount; j++) {
				rand = Math.floor((Math.random() * indAm));
				ind = individuals[rand];
				if (ind.rating < bestRating) {
					bestIndividual = ind;
					bestRating = ind.rating;
				}
			}
			return new individual(bestIndividual.deploymentMatrix.slice());
		};
		function mute(individual1) { //mutation by switching 2 elements of random level
			deploymentMatrix = individual1.deploymentMatrix.slice();
			individual2 = new individual(deploymentMatrix);
			rand = Math.floor((Math.random() * individual2.deploymentMatrix.length));
			rand2 = Math.floor((Math.random() * individual2.deploymentMatrix[rand].length));
			rand3 = Math.floor((Math.random() * individual2.deploymentMatrix[rand].length));
			temp = individual2.deploymentMatrix[rand][rand2];
			individual2.deploymentMatrix[rand][rand2] = individual2.deploymentMatrix[rand][rand3];
			individual2.deploymentMatrix[rand][rand3] = temp;
			return individual2;
		};
		function hybridize(individual1, individual2) { //hybridization
			len = individual2.deploymentMatrix.length;
			rand1 = Math.floor((Math.random() * len));
			rand2 = Math.floor((Math.random() * len));
			for (var i = rand1; i < rand2; i++) {
				individual2.deploymentMatrix[i] = clone(individual1.deploymentMatrix[i]);
			}
		};
		function generateRandom(graphMatrix) { //generating random deployment matrix
			len = graphMatrix.length;
			matrix = [
				[]
			];
			for (var i = 0; i < len; i++) { //for each level
				len2 = graphMatrix[i].length;
				tab = [];
				tab2 = [];
				elAmount = len2;
				for (var j = 0; j < len2; j++) { //create table of possible IDs
					tab.push(j);
				}
				for (var j = 0; j < len2; j++) { //randomly place all IDs
					rand = Math.floor((Math.random() * elAmount));
					tab2.push(tab[rand]);
					for (var k = rand; k < elAmount - 1; k++) { //shrink support table (tab)
						tab[k] = tab[k + 1];
					}
					elAmount--;
				}
				matrix[i] = tab2;
			}
			return matrix;
		};
		//-COMMON-FINISH--------------------->>>
		function generateCoords(graphMatrix, bestInd) { //generating ID's -> coordinates table
			var w = canvasW;
			var width, height, spacing, hSpacing;
			//check if node properties are defined. if not assign default
			startY = startY || 15;
			width = nodeW || 135;
			height = nodeH || 30;
			spacing = nodeVSpacing || 30;
			hSpacing = nodeHSpacing || 30;
			var dMatrix = bestInd.deploymentMatrix,
				len = dMatrix.length,
				maxWidth = 1,
				rowLength = [],
				rowElWidth = [],
				columnPadding = [];
			//searching for longest row
			for (var i = 0; i < len; i++) {
				rowLength[i] = dMatrix[i].length;
				if (rowLength[i] > maxWidth) {
					maxWidth = dMatrix[i].length;
				}
			}
			for (var i = 0; i < len; i++) {
				rowElWidth[i] = w / rowLength[i];
				if (rowElWidth[i] < width + hSpacing) {
					rowElWidth[i] = width + hSpacing;
					columnPadding[i] = (w - rowLength[i] * (width + hSpacing)) / 2;
				} else {
					columnPadding[i] = 0;
				}
			}
			var dTab = [];
			//assigning x & y to nodes
			for (var i = 0; i < len; i++) {
				var len2 = dMatrix[i].length;
				for (var j = 0; j < len2; j++) {
					var id = graphMatrix[i][dMatrix[i][j]].id,
						y = i * (height + spacing) + startY,
						x = Math.floor(columnPadding[i] + j * rowElWidth[i] + (rowElWidth[i] - width) / 2),
						tab = [];
					tab[0] = id;
					tab[1] = x;
					tab[2] = y;
					dTab.push(tab);
				}
			}
			return dTab;
		}
		//-PLUGIN-RUN------------------------>>>
		return run();
	};
//Koniec pliku deploy.js
//Poczatek pliku navigator.js
	function navigation() {
		var tmp = {
			name: "navigator",
			version: "1.0",
			author: "Author",
			dataType: 'json',
			data: null,
			tree: null,
			globalEvents: ["load"],
			localEvents: ["select"],
			require: "ssdl_JSON div".split(" "),
			currentIdsAndLabels: {},
			init: function init() {
				if ($("#navigator_" + pf).length === 0) {
					$("#left_plugins_" + pf).prepend("<div id='navigator_" + pf + "' class='plugin_" + pf + "'' style='overflow:hidden'> </div>");
				}
			},
			setData: function setData(data) {
				if (data) {
					this.data = this.convert(data)
				}
			},
			setCurrent: function setCurrent(id) {
				var $theOne = $("ul#navigator span#" + id);

				if ($theOne.length === 1) {
					$("li.navigatorElement span").removeClass("selectedLI");
					$theOne.addClass("selectedLI");
				}
			},
			draw: function draw() {
				if (this.data) {
					var that = this;
					// console.log(this.data);
					currentIdsAndLabels: {};
					// if(this.data.children.length > 0)
					// 	this.data.children[0].children.push( {id:"BUM", label: "BIMBAM"} );
					var out = (function(data) {
						var tab = [];

						tab.push("<ul id='navigator'>");
						tab.push("<li class='navigatorElement'><img id='img_navigator|" + data.id + "' src='/images\\arrow_next.png' class='img_hasChildren' style='width: 10px'/><span id='" + data.id + "'>" + data.id + "</span></li>");

						that.currentIdsAndLabels[data.id] = data.label || data.id;

						(function inner(data, id) {
							tab.push("<ul id='" + id + "'>");
							$.each(data.children, function() {
								if (this.children && this.children.length > 0) {
									tab.push("<li class='navigatorElement'><img id='img|" + id + "' src='/images\\arrow_next.png' class='img_hasChildren' style='width: 10px'/><span id='" + this.id + "'>" + this.label + "</span></li>");
									inner(this, id + "|" + this.id);
								} else {
									tab.push("<li class='navigatorElement'><img src='/images\\white.gif' class='img_noChildren' style='visibility: hidden;height: 10px; width: 10px'/><span id='" + this.id + "'>" + this.label + "</span></li>");
								}
								that.currentIdsAndLabels[this.id] = this.label || this.id;
							});
							tab.push("</ul>");
						})(data, 'navigator|' + data.id);
						tab.push("</ul>");

						return tab.join("");
					})(this.data);

					$("#navigator_" + pf).html(out);

					$("img.img_hasChildren").click(function() {
						var $ul = $(this).parent().next();
						$ul.toggle(150);
						// dodać zmianę img
						return false;
					});

					$("li.navigatorElement").click(function() {
						var $this = $(this);
						if (!$this.find("span").hasClass("selectedLI")) {
							$("li.navigatorElement span").removeClass("selectedLI");
							$this.find("span").addClass("selectedLI");

							// console.log($(this).parent().find("img").attr("id").split("|")[1]);
							gui.controller.reactOnEvent("SwitchCurrentGraph", {
								id: $this.parent().attr("id") + "|" + $this.find("span:first").attr("id")
							})
						}
						return false;
					});

					$("li.navigatorElement:first").click();
				}
			},
			convert: function convert(json, id, str) {
				// alert(json.id)
				var n = json.nodes,
					id = json.id,
					output_json = {
						id: (id ? id : "root"),
						children: []
					};
				str = ((str ? str : "") + (id ? id : "root"))
				$.each(n, function() {
					if (this.subgraph && this.subgraph.nodes && this.subgraph.nodes.length > 0) {
						var currNode = {};
						currNode.id = this.nodeId;
						currNode.label = this.nodeLabel;
						currNode.children = convert(this.subgraph).children;
						output_json.children.push(currNode);
					}
				});
				// console.log(output_json);
				return output_json;
			}
		}
		tmp.draw();

		return tmp;
	}
//Koniec pliku navigator.js
//Poczatek pliku repository.js
	function repository() {
		var tmp = {
			name: "repository",
			version: "1.0",
			author: "Author",
			dataType: 'xml',
			data: undefined,
			globalEvents: ["load"],
			require: "div canvas".split(" "),
			localEvents: ["select"],
			init: function init() {
				if ($("#repository_" + pf).length === 0) {
					$("#right_plugins_" + pf).append("<div id='repository_" + pf + "' class='plugin_" + pf + "' style='overflow:hidden;'> </div>");
				}
			},
			setData: function setData(data) {
				//na przyszłość wymagane więcej walidacji
				if (data && data.constructor == "[object XMLDocument]") {
					this.data = data;
				}

				return this;
			},
			draw: function draw() {
				if (this.data) {
					var html = [],
						name, url, that = this;;

					$(this.data).find("list element").each(function() {
						name = $(this).find("name").text();
						url = $(this).find("url").text();
						html.push("<a href='" + url + "' class='repository_link_" + pf + "'>" + name + "</a><br/>");
					});

					$("#repository_" + pf).html(html.join(""));

					var $repository_links = $(".repository_link_" + pf);
					$repository_links.click(function() {
						$repository_links.removeClass("selectedRepoNodes")
						gui.controller.reactOnEvent("LoadAndEditCompoundService", {
							url: this.href,
							title: this.textContent
						});
						$(this).addClass("selectedRepoNodes");
						return false;
					});

					$($("a")[4]).click();
					// $("a:last").click();
				}

				return this;
			}
		}

		return tmp;
	}
//Koniec pliku repository.js
//Poczatek pliku shortcut.js
function shortcutHelper() {
		var memoryTab = [],
			validationTab = ["ctrl", "delete", "shift", "esc", "f1", "home", "alt", "backspace", "space", "enter", "home", "end"],
			// spacje
			exists = function shortcutExists(shortcut) {
				var result = false;
				$.each(memoryTab, function() {
					if (this === shortcut) {
						result = true;
						return false;
					}
				})

				return result;
			},
			validate = function isValid(argumentsTab) {
				var shortcut = argumentsTab[0].toLowerCase().replace(/ /g, ""),
					callback = argumentsTab[1],
					opt = argumentsTab[2],
					msgTab = [],
					result = {
						valid: true,
						msg: ""
					};

				if (typeof callback != "function") {
					result.valid = false;
					msgTab.push("drugi argument musi być funkcją.");
				}

				if (!(typeof shortcut == "string")) {
					result.valid = false;
					msgTab.push("\npierwszy argument musi być typu string");
				} else {
					var stringTab = shortcut.split("+");
					msgTab.push("\npodany skrót: " + shortcut)

					var numberOfAZ = 0
					$.each(stringTab, function(i) {
						var noErrors = true,
							that = this.toString();
						if (!~validationTab.indexOf(that)) {
							if (!/^[a-z]{1}$/.test(that)) {
								result.valid = false;
								msgTab.push("\nnieprawidłowa wartość: " + that);
							} else if (numberOfAZ > 0) {
								result.valid = false;
								msgTab.push("\nnieprawidłowa wartość: +" + that);
							} else {
								numberOfAZ++;
							}
						}
					});

				}
				if (!result.valid) result.msg = msgTab.join("");

				return result;
			},
			result = {
				add: function add(shortcut, fun, opt) {
					var result = true,
						validationObj = validate(arguments);
					opt = opt || {
						'type': 'keypress',
						'propagate': false,
						'target': document
					}

					shortcut = shortcut.toLowerCase().replace(/ /g, "");
					if (!validationObj.valid) {
						gui.logger.error("shortcut.add", validationObj.msg.replace(/\n/g, "<br/>"));
					} else if (exists(shortcut)) {
						gui.logger.error("shortcut.add", shortcut + language[gui.language].alerts.errors.shortcutAdded);
					} else {
						memoryTab.push(shortcut);
						// console.log(opt)
						window.shortcut.add(shortcut, fun, opt)
					}

					// console.log(memoryTab)
					return result;
				},
				remove: function remove(shortcut) {
					// transformacja shortcut
					shortcut = shortcut.toLowerCase().replace(/ /g, "");
					// console.log(shortcut);
					var index = memoryTab.indexOf(shortcut);
					var result = true;

					if (!~index) {
						gui.logger.error("shortcut.remove", language[gui.language].alerts.errors.shortcut + shortcut + "\"" + language[gui.language].alerts.errors.shorcutNotDefined);
						result = false;
					} else {
						memoryTab.splice(index, 1);
						window.shortcut.remove(shortcut);
					}

					// console.log(memoryTab)
					return result;
				}
			};

		return result;
}
//Koniec pliku shortcut.js
//Poczatek pliku controller.js
// ocb z exeptions i parameters w graphie ???
"use strict";
//url to adres do pliku albo repozytorium, które wysyła listę dostępnych usług.

function Controller(url, saveUrl, graphToEditUrl, graphToEditName, gui) {
	var pf = gui.id_postfix;
	var selectednode = false;

	var controllerObject = {
		plugins: [],
		idCounter: 0,
		graphData_tab: [],
		current_graphData: {
			id: "root",
			nodes: [],
			isRoot: true
		},
		// element modelu, ale celowo zawarty w kontrolerze
		init: function init() {
			this.initPlugins();
			this.init = undefined;
		},
		initPlugins: function initPlugins() {
			// this.repository = repository(gui.view.columnParams.rightCol.width);
			// this.repository.init();
			this.repoNodes = repoNodes(gui.view.visualiser);
			this.repoNodes.init();
			this.navigator = navigation();
			this.navigator.init();
			this.shortcut = shortcutHelper();

			this.shortcut.add("ctrl+a", (function() {
				this.reactOnEvent("selectAll")
			}).bind(this));
			this.shortcut.add("Esc", (function() {
				this.reactOnEvent("Escape")
			}).bind(this));

			this.shortcut.add("Delete", (function() {
				this.reactOnEvent("Delete")
			}).bind(this));

			// this.shortcut.add("ctrl + X", function() {
			// 	alert("")
			// });
			this.shortcut.add("ctrl+shift+z", function() {
				alert("")
			});

			this.shortcut.add("ctrl + s", function(event) {
				alert(event);
			});

			// setTimeout((function() {
			// 	this.shortcut.remove("ctrl+x")
			// }).bind(this), 2000);
		},
		getBlankModelNode: function getBlankModelNode(){
			var blank = {
				nodeId : "",
				nodeLabel : "",
				nodeType : "",
				controlType : "",
				alternatives : "",
				sources : [],
				targets : [],
				subgraph : {},
				physicalDescription : {
					address : "",
					operation : "",
					serviceGlobalId : "",
					serviceName : ""
				},
				functionalDescription : {
					description : "",
					effects : "",
					preconditions : "",
					serviceClasses : [],
					metaKeywords : [],
					inputs : [],
					outputs : []
				},
				condition : {
					conditionId : "",
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
				},
				nonFunctionalDescription : [],
				emulation : {
					id : "",
					name : "",
					vactors : "",

				}
			}

			return blank;
		},
		getGraphById: function getGraphById(id) {
			var result;
			$.each(this.graphData_tab, function() {
				if (id === this.id) {
					result = this;
					return false;
				}
			});

			return result;
		},
		deploy: deploy,
		initLogger: initLogger,
		changeCurrentGraphData: function changeCurrentGraphData(id) {
			var result;
			$.each(this.graphData_tab, function() {
				if (this.id === id) {
					result = this;
					return false;
				}
			});
			if (result) {
				this.current_graphData = result;
			}
		},
		generateIOId: function generateIOId(seed) {
			seed = seed || "id00";
			return seed + Math.round(Math.random() * 10e5);
		},
		save: function save(sUrl, data, type, dataType, fun_success, fun_error) {
			// jsonFormatter(arguments, 1, 1);
			$.ajax({
				url: sUrl,
				type: type,
				dataType: dataType || 'text',
				data: data,
				success: fun_success ||
				function(res, status, jqXHR) {
					// alert("saved");
				},
				error: fun_error ||
				function(jqXHR, status, e) {
					// alert("error");
				}
			});
		},
		load: function load(sUrl, fun_success, dataType, fun_error) {
			$.ajax({
				url: sUrl,
				type: "GET",
				dataType: dataType || 'xml',
				success: fun_success ||
				function(res, status, jqXHR) {
					// console.group("AJAX QUERY RESULTS:");
					// console.info("Loaded data from "+sUrl+" with status: "+status);
					// console.group("Response:");
					// console.log(res);
					// console.groupEnd();
					// console.groupEnd();
				},
				error: fun_error ||
				function(jqXHR, status, e) {
					// console.group("AJAX QUERY RESULTS:");
					// console.error("Error while downloading data from "+sUrl);
					// console.log(status+": "+e);
					// console.groupEnd();
				}
			});
		},
		setDynamicTypedOfIO : function setDynamicTypedOfIO(node){
			this.assignTypeToOnceDynamicIO(node, "dynamic");
		},
		assignTypeToOnceDynamicIO : function assignTypeToOnceDynamicIO(node, type){
			if(typeof node === "string"){
				node = this.getNodeById(node);
			}
			if( node.controlType.toLowerCase() === "#conditionstart" || node.controlType.toLowerCase() === "#conditionend" ){
				$.each(node.functionalDescription.inputs, function(){
					this.dataType = type;
					this.class = type;
				});
				$.each(node.functionalDescription.outputs, function(){
					this.dataType = type;
					this.class = type;
				});
				
				gui.view.updateNode(node);
			}
		},
		deleteHighlightedNodes : function deleteHighlightedNodes(){
			var foundComplementaryConditionNode, e, modelNode, id;
			for (var q = gui.view.current_graph_view.nodes.length; q-- ;) {
				e = gui.view.current_graph_view.nodes[ q ];
				if (e.highlighted) {
					id = e.id;
					modelNode = this.getNodeById(id);
					this.deleteNode( q, id );
					if( e.controlType.toLowerCase() === "#conditionstart" || e.controlType.toLowerCase() === "#conditionend" ){
						foundComplementaryConditionNode = this.findNodesByConditionId( modelNode.condition.conditionId );
						this.deleteNode( foundComplementaryConditionNode.index, foundComplementaryConditionNode.node.nodeId);
					}
				}
			}
		},
		deleteNode : function deleteNode(number, id){
			var index;
			gui.controller.current_graphData.nodes.splice( number, 1 );
			gui.view.current_graph_view.nodes.splice( number, 1 );
			
			$.each(gui.controller.current_graphData.nodes, function(i, v) {
				if ( (index = v.sources.indexOf( id )) != -1) {
					v.sources.splice(index, 1);
				}
				if ( (index = v.targets.indexOf( id )) != -1) {
					v.targets.splice(index, 1);
				}
			});
			for (var i = gui.view.current_graph_view.edgesCF.length; i--; ) {
				if (gui.view.current_graph_view.edgesCF[i].source.id ==  id ) gui.view.current_graph_view.edgesCF.splice(i, 1);
				else if (gui.view.current_graph_view.edgesCF[i].target.id ==  id ) gui.view.current_graph_view.edgesCF.splice(i, 1);
			}

			for (var i = gui.view.current_graph_view.edgesDF.length; i--; ) {
				if (gui.view.current_graph_view.edgesDF[i].sourceId ==  id ) gui.view.current_graph_view.edgesDF.splice(i, 1);
				else if (gui.view.current_graph_view.edgesDF[i].targetId == id ) gui.view.current_graph_view.edgesDF.splice(i, 1);
			}
		},
		findNodesByConditionId : function findNodesByConditionId(conditionId){
			var tmp;
			for (var i = gui.controller.current_graphData.nodes.length; i--; ) {
				tmp = gui.controller.current_graphData.nodes[i];
				if(tmp.condition.conditionId === conditionId){
					return {node: tmp, index: i};
				}
			}
		},
		reactOnEvent: function reactOnEvent(evtType, evtObj) {
			//var events = ("DRAGGING SELECTION, SELECT, DESELECT, MOVE, RESIZE, SCROLL, DELETE, EDGE DETACH,"+" DELETE NODE, CREATE NODE, CREATE EDGE, GRAPH LOADED, GRAPH SAVED, GRAPH CHANGED").split(", ");			
			var that = this;

			// console.log('Event: ', evtType, '  ->  ', evtObj);
			switch (evtType.toUpperCase()) {
				case "ASKDAMIANFORID" :
					(function(e){
						that.load(CFG.url_askForId, e.onsuccess, "xml", e.onerror);
					})(evtObj);
					break;
				case "EDITSERVICE":
					(function(e) {
						if (e && e.url) {
							that.loadSSDL(e.url);
						}
					})(evtObj);
					break;
				case "SAVE":
					(function(e) {
						console.log(e);
						// na szybko
						// 	$("#saveDialog").dialog("open");
						// } else {
						// var validation = validatorObject.validateGraph(that.getRoot());
						// jsonFormatter(validation,1,1)
						var savedSSDL;
						// e = e || {};
						// e.name = 1;
						// e.description = 1;
						if (that.current_graphData.nodes.length < 3) {
							alert(language[gui.language].alerts.emptyGraph);
						} else if (!(e && e.name && e.description) && !graphToEditUrl) {
							gui.view.form.editGraphSaveParams();
						} else {
							var confirmation = true;//(validation && validation.numberOfErrors && (validation.numberOfErrors < 1))
							// if (!confirmation) 
							// 	confirmation = confirm(language[gui.language].alerts.graphNotPassedValidation); 

							if (confirmation) {
								savedSSDL = that.saveSSDL();
								var output = !graphToEditUrl ? "name=" + e.name + "&description=" + e.description + "&" : "";
								output += "ssdl=" + savedSSDL;

								console.log(output);
								that.save(saveUrl, output, "POST", "xml", function() {
									alert(language[gui.language].alerts.saveOK);
								}, function() {
									alert(language[gui.language].alerts.saveNotOK);
								})
							}
						}

						// save(sUrl, data, type, fun_success, dataType, fun_error)
					})(evtObj);
					break;
				case "START":
					(function() {
						// that.load(url, function fun_success(list){
						// 	that.repository.setData(list).draw();
						// });
						that.load(url, function fun_success(sdb) {
							var parsedSDB = that.parseSDBetaArray(sdb);
							that.repoNodes.setData(parsedSDB).draw();
						});
						that.reactOnEvent("LoadAndEditCompoundService", {
							url: graphToEditUrl,
							title: graphToEditName
						});
					})();
					break;
				case "TRYTOSAVENODEAFTEREDIT":
					(function(e) {
						//e = zwrócony JSONek
						var wrongsList = prepareFormMessages(validatorObject.validateNode(e));
						// console.log(e, wrongsList, validatorObject);
						if (wrongsList.length === 0) {
							$.each(that.current_graphData.nodes, function(i, v) {
								if (v.nodeId == e.nodeId) {
									that.current_graphData.nodes[i] = e;
									// console.log(that.current_graphData.nodes);
									return false;
								}
							});
							gui.view.updateNode(e);

							if(e.controlType.toLowerCase() === "#conditionstart" ){
								var edges = gui.view.getCFEdgesFrom(e.nodeId);
								if(edges.length == 2){
									var THEN = gui.view.getNodeById( e.condition.then );
									var ELSE = gui.view.getNodeById( e.condition.else );

									// console.log(THEN, ELSE)

									edges[0].target = ( edges[0].label === "TRUE" ? THEN : ELSE);
									edges[1].target = ( edges[1].label === "TRUE" ? THEN : ELSE);
									edges[0].update();
									edges[1].update();
								} else if(edges.length == 0){
									var THEN = gui.view.getNodeById( e.condition.then );
									var ELSE = gui.view.getNodeById( e.condition.else );

									var source = gui.view.getNodeById(e.nodeId);

									if(THEN && ELSE){
										that.reactOnEvent("AddCFEdge", {
										 	source: source,
										 	target: THEN,
										 	CF_or_DF: "CF",
										 	label: "TRUE"
										});
										that.reactOnEvent("AddCFEdge", {
										 	source: source,
										 	target: ELSE,
										 	CF_or_DF: "CF",
										 	label: "FALSE"
										});
									}
								}
								else {
									console.log("stało się coś niedobrego?");
								}
							}

							if( e.nodeType && e.nodeType.toLowerCase() == "emulationservice" && !e.emulation.id){
								gui.controller.reactOnEvent("AskDamianForId", {
									onsuccess : (function(xml){
										var nodeId = e.nodeId;
										var node = gui.controller.getNodeById(nodeId);
										var id = $(xml).find("id").text();

										if(id){
											node.physicalDescription.address += ("&id=" + id);
											node.emulation.id = id;
										} else {
											alert(langAlerts.idnewemuservice);
										}

									}).bind(that),
									onerror : function(){
										alert(langAlerts.idnewemuservice); //to samo co wyżej
									}
								});
							}

							gui.view.form.closeForm();
						} else {
							gui.view.form.handleErrors(wrongsList);
						}


						gui.view.hideAllUnwantedEdges();
						// Deploying
					})(evtObj);
					break;
				case "DELETE":
					(function() {
						if( $("#form_" + pf).dialog("isOpen") ||
							$("#f_globalNFPropertiesForm_" + pf).dialog("isOpen") ||
							$("#f_inputVariablesForm_" + pf).dialog("isOpen") ||
							$("#f_dialog_emulationService_" + pf).dialog("isOpen")
							){
							return;
						}
						if( !confirm("Czy na pewno chcesz usunąć zaznaczone elementy?") ){
							return;
						}
						var e, inp;
						switch (gui.view.mode) {
						case 'DF':
							for (var i = gui.view.current_graph_view.edgesDF.length; i--;) {
								e = gui.view.current_graph_view.edgesDF[i];
								if (e && e.highlighted) {
									// -----------
									if ( gui.view.getDFEdgesConnectedTo(e.sourceId) < 2 ){
										that.setDynamicTypedOfIO( e.sourceId );
									}
									if( gui.view.getDFEdgesConnectedTo(e.targetId) < 2 ){
										that.setDynamicTypedOfIO( e.targetId);
									}
									// -----------
									inp = that.getInputById(e.targetId, e.input.id);
									if(inp)	inp.source = [];
									e.remove();
									gui.view.current_graph_view.edgesDF.splice(i, 1);
								}
							}
							break;
						case 'CF':
							for (i = gui.view.current_graph_view.edgesCF.length ; i-- ;) {
								e = gui.view.current_graph_view.edgesCF[i];
								if (e && e.highlighted && !e.labelPath ) {
									var sId = e.source.id;
									var tId = e.target.id;
									var len = gui.controller.current_graphData.nodes.length;
									for (var j = len; j--; ) {
										if (gui.controller.current_graphData.nodes[j].nodeId == tId) {
											var index = gui.controller.current_graphData.nodes[j].sources.indexOf(sId);
											gui.controller.current_graphData.nodes[j].sources.splice(index, 1);
										}
										else if (gui.controller.current_graphData.nodes[j].nodeId == sId) {
											var index = gui.controller.current_graphData.nodes[j].targets.indexOf(tId);
											gui.controller.current_graphData.nodes[j].targets.splice(index, 1);
										}
									}

									e.remove();
									gui.view.current_graph_view.edgesCF.splice(i, 1);		
								}
							}
							break;
						}

						//część usuwająca node'y
						var index;
						gui.view.hideCurrentGraph();

						that.deleteHighlightedNodes();

						gui.view.showCurrentGraph();
						gui.view.switchMode();
						selectednode = false;
					})(evtObj);
					break;
				case "SELECT":
					(function(e) {
						gui.view.selectNodesInsideRect(e.x1, e.y1, e.x2, e.y2, e.ctrl);
						gui.view.selectEdgesInsideRect(e);
					})(evtObj);
					break;
				case "CLEARGRAPH":
					(function() {
						gui.view.hideCurrentGraph();
						gui.view.current_graph_view.edgesDF = [];
						gui.view.current_graph_view.nodes = [];
						gui.view.current_graph_view.edgesCF = [];
						gui.controller.current_graphData.nodes = [];
						gui.view.showCurrentGraph();
						gui.view.switchMode();
					})(evtObj);
					break;
				case "DESELECT":
					(function() {
						gui.view.deselectAll();
					})();
					break;
				case "SELECTALL":
					(function() {
						gui.view.selectAll();
					})();
					break;
				case "ESCAPE":
					(function() {
						gui.view.updateEdges();
						gui.view.menuList.getInstance().close();
						gui.view.deselectAll();
						gui.view.tooltip.close();
						// gui.logger.close();
					})();
					break;
				case "ADDOUTPUT":
					(function(e) {
						var source = that.getNodeById(e.sourceId),
							input = e.input,
							outputTmp, output, newId, graphNode;
						if (source) {
							outputTmp = that.getOutputById(e.sourceId, input.id)
							if (outputTmp) {
								newId = that.generateIOId(input.id);
							}
							output = {
								id: newId || input.id,
								class: input.class,
								label: input.label,
								dataType: input.dataType
							};

							source.functionalDescription.outputs.push(output);
							
							graphNode = gui.view.getNodeById(e.sourceId);
							graphNode.addOutput(output);
							output = graphNode.getOutputById(output.id);

							// console.log(source)
							that.reactOnEvent("addDFEdge", {
								sourceId: source.nodeId,
								targetId: e.targetId,
								input: e.input,
								output: output,
								CF_or_DF: "DF"
							});
						}

						// console.log(e)
					})(evtObj);
					break;
				case "ADDINPUT":
					(function(e) {
						// console.log(e);
						var target = that.getNodeById(e.targetId),
							output = e.output,
							inputTmp, input, newId, graphNode;
						if (target) {
							inputTmp = that.getInputById(e.targetId, output.id)
							if (inputTmp) {
								newId = that.generateIOId(output.id);
							}
							input = {
								id: newId || output.id,
								class: output.class,
								label: output.label,
								dataType: output.dataType
							};

							target.functionalDescription.inputs.push(input);

							// gui.view.updateNode(target);
							// jedyna wada obecnego podejścia: nie sprawdza, czy dany io już istnieje,
							// ale w tym wypadku nie jest to potrzebne
							graphNode = gui.view.getNodeById(e.targetId);
							graphNode.addInput(input);
							input = graphNode.getInputById(input.id);

							that.reactOnEvent("addDFEdge", {
								sourceId: e.sourceId,
								targetId: e.targetId,
								input: input,
								output: e.output,
								CF_or_DF: "DF"
							});
						}

						// console.log(e)
					})(evtObj);
					break;
				case "ADDCFEDGE":
					(function(e) {
						// var target = gui.controller.getNodeById(e.target.id);
						// target.sources.push(e.source.id);
						console.log(e);
						var source = gui.controller.getNodeById( e.source.id );
						if(source){
							source.targets.push( e.target.id );
							var edge = gui.view.addCFEdge(e);
							if(edge){
								gui.view.current_graph_view.edgesCF.push(edge);
								edge.switchMode( gui.view.mode );
							}
						}
					})(evtObj);
					break;
				case "ADDDFEDGE":
					(function(e) {
						console.log(e, "++++++++")
						var input = gui.controller.getInputById(e.targetId, e.input.id);
						if (input) {
							input.source = [e.sourceId, e.output.id];
						} else {
							a(e.targetId + ":" + e.input.id);
						}
						var edge = gui.view.addDFEdge(e);
						gui.view.current_graph_view.edgesDF.push(edge);
					})(evtObj);
					break;
				case "NODESELECTED":
					(function(e) {
						selectednode = true;
					})(evtObj);
					break;
				case "NODEMOVED":
					(function(e) {

					})(evtObj);
					break;
				case "SWITCHMODE":
					(function(e) {
						gui.view.switchMode(e.mode);
					})(evtObj);
					break;
				case "ADDSTARTSTOPAUTOMATICALLY":
					(function() {
						var result = that.addStartStop();
						if (result) {
							gui.view.addStartStop(result);
						}
					})();
					break;
				case "ADDSERVICEFROMREPOTOCANVAS":
					(function(e) {
						e = $.extend(true, {}, e);
						e.nodeId = gui.controller.generateId();
						e.functionalDescription.inputs = $.extend(true, [], e.functionalDescription.inputs);
						e.functionalDescription.outputs = $.extend(true, [], e.functionalDescription.outputs);

						var newDataNode = that.getBlankModelNode();

						copyProps( e, newDataNode);

						that.current_graphData.nodes.push( newDataNode );
						gui.view.addNodeFromRepo( newDataNode );
					})(evtObj);
					break;
				case "EDITNODE":
					(function(e) {
						if (e && e.nodeId) {
							// alert(e.nodeId)
							var node = that.getNodeById(e.nodeId);
							if(node) {
								console.log(node, "before edit");
								gui.view.editNode(node);
							}
							else 
								throw {
									name: "object missing",
									message: "ther's no node with id: "+e.nodeId
								};
						}
					})(evtObj);
					break;
				case "LOADANDEDITCOMPOUNDSERVICE":
					(function(e) {
						that.load(e.url, (function(ssdl) {
							var tab = [],
								ssdl_json = this.convert(ssdl, e.title);
							// raport(this.convertJSON2XML(ssdl_json, true));
							// var afterValidation = that.validator.
							// if( true )
							// 	this.current_graphData = ssdl_json;
							// rozwal na tablice
							(function splitOnSubgraph(graph, id, isRoot) {
								$.each(graph.nodes, function() {
									if (this.subgraph.nodes) {
										splitOnSubgraph(this.subgraph, this.nodeId);
									}
								});
								graph.id = (id || graph.id);
								graph.isRoot = isRoot;
								//delete graph.subgraph;
								tab.push(graph);

							})(ssdl_json, e.title, true);

							//walidacja
							//save current data, graph_view
							//delete all graphViews
							// gui.view.
							gui.view.removeAllGraphs();
							gui.view.setBlankGraphAsCurrent()

							if(tab.length == 0){
								this.graphData_tab = [ current_graphData ];
							} else {
								this.graphData_tab = tab;
								this.current_graphData = tab[tab.length - 1];
							}

							// console.log(this.graphData_tab)
							gui.view.parseAndSetDataModelToView(this.graphData_tab);
							this.reactOnEvent("SSDLLoaded", ssdl);
						}).bind(that));
					})(evtObj);
					break;
				case "SWITCHCURRENTGRAPH":
					(function(e) {
						// --- kod dla wtyczki navigator
						if (e && e.id && (typeof e.id === "string") && e.id.substring(e.id.lastIndexOf("|") + 1 !== that.current_graphData.id)) {
							var tab_nav = e.id.split("|");
							tab_nav.splice(0, 1);
							var tab_copy = $.extend(true, [], tab_nav),
								id = tab_nav[tab_nav.length - 1],
								id_string = "",
								labels = that.navigator.currentIdsAndLabels;
							$.each(tab_nav, function(k, v) {
								id_string += "|" + v;
								tab_nav[k] = "<a href='#' class='top_nav_element' id='top_nav_elem" + id_string + "'>" + (labels[v] || v) + "</a>";
							});
							tab_nav = tab_nav.join(" \\ ");

							$("div#top_nav_" + pf + " span").html(tab_nav);

							$("a.top_nav_element").click(function() {
								var lastIndexOf = this.id.lastIndexOf("|"),
									id = this.id.substring(lastIndexOf + 1);
								that.reactOnEvent("SWITCHCURRENTGRAPH", {
									id: this.id
								});
								that.navigator.setCurrent(id)
							});

							gui.view.changeCurrentGraphView(id);
							that.changeCurrentGraphData(id);
						}
					})(evtObj);
					break;
				case "SSDLLOADED":
					(function(e) {
						that.navigator.setData(that.current_graphData)
						that.navigator.draw();
					})(evtObj);
					break;
				case "ADDBLANKNODE":
					(function(e) {
						e.nodeId = that.generateId();
						e.isBlank = true;
						var newDataNode = that.getBlankModelNode();

						// console.log(newDataNode, " blank");
						// console.log(e, " e");
						copyProps(e, newDataNode);
						// console.log(newDataNode, " and now?");
						var graphNode = gui.view.visualiser.visualiseNode(newDataNode);
						// console.log(graphNode, "gn");
						graphNode.switchMode( gui.view.mode );
						gui.view.current_graph_view.nodes.push(graphNode);
						that.current_graphData.nodes.push(newDataNode);
					})(evtObj);
					break;
			}
		},
		xmlToString: function xmlToString(xml) {
			console.log(xml)
			return (new XMLSerializer()).serializeToString(xml);
		},
		updateNodeData: function updateNodeData(oldNode, newNode) {
			oldNode.nodeLabel = newNode.nodeLabel;
			oldNode.physicalDescription = newNode.physicalDescription;
			oldNode.functionalDescription = newNode.functionalDescription;
			oldNode.nonFunctionalDescription = newNode.nonFunctionalDescription;
		},
		getNodeById: function getNodeById(id, graph) {
			var result;
			graph = graph || gui.controller.current_graphData;
			if (graph.nodes) {
				$.each(graph.nodes, function() {
					if (this.nodeId === id) {
						result = this;
						return false;
					}
				});
			}

			return result;
		},
		getInputById: function getInputById(nodeId, inputId) {
			var result;

			$.each(gui.controller.current_graphData.nodes, function() {
				// if (this.nodeId === nodeId && this.functionalDescription && this.functionalDescription.inputs) {
				if (this.nodeId === nodeId){
					console.log(this.nodeLabel);
					$.each(this.functionalDescription.inputs, function() {
						if (this.id === inputId) {
							result = this;
							return false;
						}
					});
					return false;
				}
			});

			return result;
		},
		getOutputById: function getOutputById(nodeId, inputId) {
			var result;

			$.each(gui.controller.current_graphData.nodes, function() {
				if (this.nodeId === nodeId) {
					$.each(this.functionalDescription.outputs, function() {
						if (this.id === inputId) {
							result = this;
							return false;
						}
					});
					return false;
				}
			});

			return result;
		},
		addStartStop: function addStartStop() {
			var result = false;
			if (!(this.getNodeById("#Start") || this.getNodeById("#End"))) {
				var start = copyProps({
						nodeId: "#Start",
						nodeLabel: "#Start",
						nodeType: "Control",
						controlType: "#start"
					}, this.getBlankModelNode()),
					stop = copyProps({
						nodeId: "#End",
						nodeLabel: "#End",
						nodeType: "Control",
						controlType: "#end"
					}, this.getBlankModelNode())
				;

				this.current_graphData.nodes.unshift(start, stop);

				result = {
					start: start,
					stop: stop
				};
			}

			return result;
		},
		generateId: function generateId() {
			this.idCounter++;
			var num = this.idCounter,
				tab = ["node---"],
				digitMax = 6,
				digits = Math.ceil(Math.log(num) / Math.log(10)),
				digitMax = (digitMax - digits >= 0 ? digitMax : digits);

			for (var i = 0; i < digitMax - digits; i++)
				tab.push("0");
			tab.push(num);

			var outputId = tab.join("");

			return tab.join("");
		},
		parseSDBetaArray: function parseSDBetaArray(sdb) {
			var tab = [],
				that = this,
				node, $sdbArray, $sdb, $physicalDescription, $functionalDescription, $functionalDescriptionServiceClasses, $functionalDescriptionMetaKeywords, $functionalDescriptionInputs, $functionalDescriptionOutputs, $nonfunctionalDescription;

			$sdbArray = $(sdb).find("ServiceDescriptionArray ns2\\:serviceDescription");
			$sdbArray.each(function() {
				node = {};
				$sdb = $(this);
				$physicalDescription = $sdb.find("ns2\\:physicalDescription");
				$functionalDescription = $sdb.find("ns2\\:functionalDescription");
				$functionalDescriptionServiceClasses = $functionalDescription.find("ns2\\:serviceClasses ns2\\:serviceClass");
				$functionalDescriptionMetaKeywords = $functionalDescription.find("ns2\\:metaKeywords ns2\\:metaKeyword");
				$functionalDescriptionInputs = $functionalDescription.find("ns2\\:inputs ns2\\:input");
				$functionalDescriptionOutputs = $functionalDescription.find("ns2\\:outputs ns2\\:output");
				$nonfunctionalDescription = $sdb.find("ns2\\:nonfunctionalDescription  ns2\\:nonFunctionaleProperty");

				node.nodeId = node.nodeLabel = $physicalDescription.find("ns2\\:serviceName").text();
				node.nodeType = "Service";
				node.physicalDescription = {
					serviceName: node.nodeLabel,
					serviceGlobalId: $physicalDescription.find("ns2\\:serviceGlobalID").text(),
					address: $physicalDescription.find("ns2\\:address").text(),
					operation: $physicalDescription.find("ns2\\:operation").text()
				};

				node.functionalDescription = {
					serviceClasses: [],
					description: $functionalDescription.find("ns2\\:description").text(),
					metaKeywords: [],
					inputs: [],
					outputs: [],
					preconditions: [],
					effects: []
				}

				node.nonfunctionalDescription = [];

				$functionalDescriptionServiceClasses.each(function() {
					node.functionalDescription.serviceClasses.push(this.textContent);
				});
				$functionalDescriptionMetaKeywords.each(function() {
					node.functionalDescription.metaKeywords.push(this.textContent);
				});
				$functionalDescriptionInputs.each(function() {
					var input = {};
					input.class = $(this).find("ns2\\:class").text();
					input.id = $(this).find("ns2\\:id").text();
					input.label = $(this).find("ns2\\:label").text();
					input.dataType = $(this).find("ns2\\:dataType").text();
					input.properties = $(this).find("ns2\\:properties").text();
					input.source = [];

					node.functionalDescription.inputs.push(input);

				});
				$functionalDescriptionOutputs.each(function() {
					var output = {};
					output.class = $(this).find("ns2\\:class").text();
					output.id = $(this).find("ns2\\:id").text();
					output.label = $(this).find("ns2\\:label").text();
					output.dataType = $(this).find("ns2\\:dataType").text();
					output.properties = $(this).find("ns2\\:properties").text();

					node.functionalDescription.outputs.push(output);

				});
				$nonfunctionalDescription.each(function() {
					var nonFunctionaleProperty = {};
					nonFunctionaleProperty.unit = $(this).find("ns2\\:unit").text();
					nonFunctionaleProperty.value = $(this).find("ns2\\:value").text();
					nonFunctionaleProperty.relation = $(this).find("ns2\\:relation").text();
					nonFunctionaleProperty.name = $(this).find("ns2\\:name").text();

					node.nonfunctionalDescription.push(nonFunctionaleProperty);
				});

				node.sources = [];

				tab.push(node);
				// console.log( jstr(node) )
				// console.log("++++++++")
			});

			// console.log(jstr(tab))
			return tab;
		},
		convertJSON2XML: function convertJSON2XML(json, humanFriendly) {
			if( !json ){
				throw {
					name: "object missing",
					message: "argument json is obligatory"
				}
			}
			function parseGraph(subgraph, tabulacja) {
				tabulacja = (tabulacja && typeof tabulacja == "string" ? tabulacja : "");
				if (subgraph && subgraph.nodes && subgraph.nodes.length > 0) {
					tabOutput.push(tabulacja + "<nodes>\n");
					$.each(subgraph.nodes, function(key, node) {
						parseNode(key, node, tabulacja);
					});
					tabOutput.push(tabulacja + "</nodes>\n"); /* Koniec wierzchołków  w grafie */
				} else {
					tabOutput.push(tabulacja + "<nodes/>\n");
				}
				parseGraphAtributes(subgraph, tabulacja);
			}

			function parseGraphAtributes(graph, tabulacja) { /* Dane wejściowe  w grafie */
				if (graph.inputVariables && graph.inputVariables.length > 0) {
					tabOutput.push(tabulacja + "<inputVariables>\n");
					$.each(graph.inputVariables, function(key, inputVariable) {
						tabOutput.push(tabulacja + "\t<inputVariable>\n");
						tabOutput.push(tabulacja + "\t\t<name>" + (inputVariable.name || "") + "</name>\n");
						tabOutput.push(tabulacja + "\t\t<value>" + (inputVariable.value || "") + "</value>\n");
						tabOutput.push(tabulacja + "\t\t<type>" + (inputVariable.type || "") + "</type>\n");
						tabOutput.push(tabulacja + "\t</inputVariable>\n");
					});
					tabOutput.push(tabulacja + "</inputVariables>\n");
				} else {
					tabOutput.push(tabulacja + "<inputVariables/>\n");
				} /* Koniec danych wejściowych  w grafie */

				/* Paramertry niefunkcjonalne w grafie */
				if (graph.nonFunctionalParameters && graph.nonFunctionalParameters.length > 0) {
					tabOutput.push(tabulacja + "<nonFunctionalParameters>\n");
					$.each(graph.nonFunctionalParameters, function(key, nonFunctionalProperty) {
						tabOutput.push(tabulacja + "\t<nonFunctionalProperty>\n");
						tabOutput.push(tabulacja + "\t\t<weight>" + (nonFunctionalProperty.weight || "") + "</weight>\n");
						tabOutput.push(tabulacja + "\t\t<unit>" + (nonFunctionalProperty.unit || "") + "</unit>\n");
						tabOutput.push(tabulacja + "\t\t<value>" + (nonFunctionalProperty.value || "") + "</value>\n");
						tabOutput.push(tabulacja + "\t\t<relation>" + (nonFunctionalProperty.relation || "") + "</relation>\n");
						tabOutput.push(tabulacja + "\t\t<name>" + (nonFunctionalProperty.name || "") + "</name>\n");
						tabOutput.push(tabulacja + "\t</nonFunctionalProperty>\n");
					});
					tabOutput.push(tabulacja + "</nonFunctionalParameters>\n");
				} else {
					tabOutput.push(tabulacja + "<nonFunctionalParameters/>\n");
				} /* Koniec parametrów niefunkcjonalnych w grafie */
			}

			function parseNode(key, node, tabulacja) {
				// alert(node.nodeId)
				/* Wierzchołki  w grafie */
				tabulacja = (tabulacja && typeof tabulacja == "string" ? tabulacja : "");
				tabOutput.push(tabulacja + "\t<node>\n");
				tabOutput.push(tabulacja + "\t\t<nodeId>" + (node.nodeId || "") + "</nodeId>\n");
				tabOutput.push(tabulacja + "\t\t<nodeLabel>" + (node.nodeLabel || "") + "</nodeLabel>\n");
				tabOutput.push(tabulacja + "\t\t<nodeType>" + (node.nodeType || "") + "</nodeType>\n");
				tabOutput.push(tabulacja + "\t\t<controlType>" + (node.controlType || "") + "</controlType>\n");
				if (node.physicalDescription) {
					physicalDescription = node.physicalDescription;
					tabOutput.push(tabulacja + "\t\t<physicalDescription>\n");
					tabOutput.push(tabulacja + "\t\t\t<serviceName>" + (physicalDescription.serviceName || "") + "</serviceName>\n");
					tabOutput.push(tabulacja + "\t\t\t<serviceGlobalId>" + (physicalDescription.serviceGlobalId || "") + "</serviceGlobalId>\n");
					tabOutput.push(tabulacja + "\t\t\t<address>" + (physicalDescription.address || ""));
					// if(node.emulate && node.emulate.id)
					// 	tabOutput.push( "&id="+node.emulate.id);
					tabOutput.push( "</address>\n");
					tabOutput.push(tabulacja + "\t\t\t<operation>" + (physicalDescription.operation || "") + "</operation>\n");
					tabOutput.push(tabulacja + "\t\t</physicalDescription>\n");
				}
				if (node.functionalDescription) {
					var functionalDescription = node.functionalDescription;
					tabOutput.push(tabulacja + "\t\t<functionalDescription>\n");
					if (functionalDescription.serviceClasses && functionalDescription.serviceClasses.length > 0) {
						tabOutput.push(tabulacja + "\t\t\t<serviceClasses>\n");
						$.each(functionalDescription.serviceClasses, function(key, serviceClass) {
							tabOutput.push(tabulacja + "\t\t\t\t<serviceClass>" + (serviceClass || "") + "</serviceClass>\n");
						});
						tabOutput.push(tabulacja + "\t\t\t</serviceClasses>\n");
					} else {
						tabOutput.push(tabulacja + "\t\t\t<serviceClasses/>\n");
					}
					tabOutput.push(tabulacja + "\t\t\t<description>" + (functionalDescription.description || "") + "</description>\n");
					if (functionalDescription.metaKeywords && functionalDescription.metaKeywords.length > 0) {
						tabOutput.push(tabulacja + "\t\t\t<metaKeywords>\n");
						$.each(functionalDescription.metaKeywords, function(key, metaKeyword) {
							tabOutput.push(tabulacja + "\t\t\t\t<metaKeyword>" + (metaKeyword || "") + "</metaKeyword>\n");
						});
						tabOutput.push(tabulacja + "\t\t\t</metaKeywords>\n");
					} else {
						tabOutput.push(tabulacja + "\t\t\t<metaKeywords/>\n");
					}
					if (functionalDescription.inputs && functionalDescription.inputs.length > 0) {
						tabOutput.push(tabulacja + "\t\t\t<inputs>\n");
						$.each(functionalDescription.inputs, function(key, input) {
							console.log(input);
							tabOutput.push(tabulacja + "\t\t\t\t<input>\n");
							tabOutput.push(tabulacja + "\t\t\t\t\t<class>" + (input.class || "") + "</class>\n");
							tabOutput.push(tabulacja + "\t\t\t\t\t<id>" + (input.id || "") + "</id>\n");
							tabOutput.push(tabulacja + "\t\t\t\t\t<label>" + (input.label || "") + "</label>\n");
							tabOutput.push(tabulacja + "\t\t\t\t\t<dataType>" + (input.dataType || "") + "</dataType>\n");
							tabOutput.push(tabulacja + "\t\t\t\t\t<properties>" + (input.properties || "") + "</properties>\n");
							tabOutput.push(tabulacja + "\t\t\t\t\t<source>\n");
							tabOutput.push(tabulacja + "\t\t\t\t\t\t<nodeId>" + (input.source[0] || "") + "</nodeId>\n");
							tabOutput.push(tabulacja + "\t\t\t\t\t\t<outputId>" + (input.source[1] || "") + "</outputId>\n");
							tabOutput.push(tabulacja + "\t\t\t\t\t</source>\n");
							tabOutput.push(tabulacja + "\t\t\t\t</input>\n");
						});
						tabOutput.push(tabulacja + "\t\t\t</inputs>\n");
					} else if(node.controlType.toLowerCase() === "#start" && functionalDescription.outputs && functionalDescription.outputs.length > 0){
						tabOutput.push(tabulacja + "\t\t\t<inputs>\n");
						$.each(functionalDescription.outputs, function(key, output) {
							tabOutput.push(tabulacja + "\t\t\t\t<input>\n");
							tabOutput.push(tabulacja + "\t\t\t\t\t<class>" + (output.class || "") + "</class>\n");
							tabOutput.push(tabulacja + "\t\t\t\t\t<id>" + (output.id || "") + "</id>\n");
							tabOutput.push(tabulacja + "\t\t\t\t\t<label>" + (output.label || "") + "</label>\n");
							tabOutput.push(tabulacja + "\t\t\t\t\t<dataType>" + (output.dataType || "") + "</dataType>\n");
							tabOutput.push(tabulacja + "\t\t\t\t\t<properties>" + (output.properties || "") + "</properties>\n");
							tabOutput.push(tabulacja + "\t\t\t\t\t<source>\n");
							tabOutput.push(tabulacja + "\t\t\t\t\t\t<nodeId>" + (node.nodeId || "") + "</nodeId>\n");
							tabOutput.push(tabulacja + "\t\t\t\t\t\t<outputId>" + (output.id || "") + "</outputId>\n");
							tabOutput.push(tabulacja + "\t\t\t\t\t</source>\n");
							tabOutput.push(tabulacja + "\t\t\t\t</input>\n");
						});
						tabOutput.push(tabulacja + "\t\t\t</inputs>\n");
					} else {
						tabOutput.push(tabulacja + "\t\t\t<inputs/>\n");
					}

					if (functionalDescription.outputs && functionalDescription.outputs.length > 0) {
						tabOutput.push(tabulacja + "\t\t\t<outputs>\n");
						$.each(functionalDescription.outputs, function(key, output) {
							tabOutput.push(tabulacja + "\t\t\t\t<output>\n");
							tabOutput.push(tabulacja + "\t\t\t\t\t<class>" + (output.class || "") + "</class>\n");
							tabOutput.push(tabulacja + "\t\t\t\t\t<id>" + (output.id || "") + "</id>\n");
							tabOutput.push(tabulacja + "\t\t\t\t\t<label>" + (output.label || "") + "</label>\n");
							tabOutput.push(tabulacja + "\t\t\t\t\t<dataType>" + (output.dataType || "") + "</dataType>\n");
							tabOutput.push(tabulacja + "\t\t\t\t\t<properties>" + (output.properties || "") + "</properties>\n");
							tabOutput.push(tabulacja + "\t\t\t\t</output>\n");
						});
						tabOutput.push(tabulacja + "\t\t\t</outputs>\n");
					} else if(node.controlType.toLowerCase() === "#end" && functionalDescription.inputs && functionalDescription.inputs.length > 0){
						tabOutput.push(tabulacja + "\t\t\t<outputs>\n");
						$.each(functionalDescription.inputs, function(key, inputs) {
							tabOutput.push(tabulacja + "\t\t\t\t<output>\n");
							tabOutput.push(tabulacja + "\t\t\t\t\t<class>" + (inputs.class || "") + "</class>\n");
							tabOutput.push(tabulacja + "\t\t\t\t\t<id>" + (inputs.id || "") + "</id>\n");
							tabOutput.push(tabulacja + "\t\t\t\t\t<label>" + (inputs.label || "") + "</label>\n");
							tabOutput.push(tabulacja + "\t\t\t\t\t<dataType>" + (inputs.dataType || "") + "</dataType>\n");
							tabOutput.push(tabulacja + "\t\t\t\t\t<properties>" + (inputs.properties || "") + "</properties>\n");
							tabOutput.push(tabulacja + "\t\t\t\t</output>\n");
						});
						tabOutput.push(tabulacja + "\t\t\t</outputs>\n");
					} else {
						tabOutput.push(tabulacja + "\t\t\t<outputs/>\n");
					}
					tabOutput.push(tabulacja + "\t\t\t<preconditions>" + (functionalDescription.preconditions || "") + "</preconditions>\n");
					tabOutput.push(tabulacja + "\t\t\t<effects>" + (functionalDescription.effects || "") + "</effects>\n");
					tabOutput.push(tabulacja + "\t\t</functionalDescription>\n");
				}
				if (node.nonFunctionalDescription) {
					nonFunctionalDescription = node.nonFunctionalDescription
					if (nonFunctionalDescription && nonFunctionalDescription.length > 0) {
						tabOutput.push(tabulacja + "\t\t<nonFunctionalDescription>\n");
						$.each(nonFunctionalDescription, function(key, nonFunctionalProperty) {
							tabOutput.push(tabulacja + "\t\t\t<nonFunctionalProperty>\n");
							tabOutput.push(tabulacja + "\t\t\t\t<weight>" + (nonFunctionalProperty.weight || "") + "</weight>\n");
							tabOutput.push(tabulacja + "\t\t\t\t<name>" + (nonFunctionalProperty.name || "") + "</name>\n");
							tabOutput.push(tabulacja + "\t\t\t\t<relation>" + (nonFunctionalProperty.relation || "") + "</relation>\n");
							tabOutput.push(tabulacja + "\t\t\t\t<unit>" + (nonFunctionalProperty.unit || "") + "</unit>\n");
							tabOutput.push(tabulacja + "\t\t\t\t<value>" + (nonFunctionalProperty.value || "") + "</value>\n");
							tabOutput.push(tabulacja + "\t\t\t</nonFunctionalProperty>\n");
						});
						tabOutput.push(tabulacja + "\t\t</nonFunctionalDescription>\n");
					} else {
						tabOutput.push(tabulacja + "\t\t<nonFunctionalDescription/>\n");
					}
				}
				tabOutput.push(tabulacja + "\t\t<alternatives>" + (node.alternatives || "") + "</alternatives>\n");

				if (node.subgraph && node.subgraph.nodes) {
					tabOutput.push(tabulacja + "\t\t<subGraph>\n");
					parseGraph(node.subgraph, tabulacja + "\t\t\t");
					tabOutput.push(tabulacja + "\t\t</subGraph>\n");
				} else tabOutput.push(tabulacja + "\t\t<subGraph>" + (false || "") + "</subGraph>\n");

				tabOutput.push(tabulacja + "\t\t<controlType>" + (false || "") + "</controlType>\n");
				// C O N D I T I O N
				var condition = node.condition;
				tabOutput.push(tabulacja + "\t\t<condition>\n");
					tabOutput.push(tabulacja + "\t\t\t<conditionId>"+(condition.id || "")+"</conditionId>\n");
					tabOutput.push(tabulacja + "\t\t\t<paths>\n");
					$.each(condition.paths, function(key, path) {
						tabOutput.push(tabulacja + "\t\t\t\t<path>\n");
							tabOutput.push(tabulacja + "\t\t\t\t\t<pathId>"+(path.pathId || "")+"</pathId>\n");
							tabOutput.push(tabulacja + "\t\t\t\t\t<inputId>"+(path.inputId || "")+"</inputId>\n");
						tabOutput.push(tabulacja + "\t\t\t\t</path>\n");
					});
					tabOutput.push(tabulacja + "\t\t\t</paths>\n");
					tabOutput.push(tabulacja + "\t\t\t<type>"+(condition.type || "")+"</type>\n");
					tabOutput.push(tabulacja + "\t\t\t<if>\n");
						tabOutput.push(tabulacja + "\t\t\t\t<path>"+(condition.if.path || "")+"</path>\n");
						tabOutput.push(tabulacja + "\t\t\t\t<variable>"+(condition.if.variable || "")+"</variable>\n");
						tabOutput.push(tabulacja + "\t\t\t\t<value>"+(condition.if.value || "")+"</value>\n");
						tabOutput.push(tabulacja + "\t\t\t\t<relation>"+(condition.if.relation || "")+"</relation>\n");
					tabOutput.push(tabulacja + "\t\t\t</if>\n");
					tabOutput.push(tabulacja + "\t\t\t<then>"+(condition.then || "")+"</then>\n");
					tabOutput.push(tabulacja + "\t\t\t<else>"+(condition.else || "")+"</else>\n");
				tabOutput.push(tabulacja + "\t\t</condition>\n");

				if (node.sources) {
					tabOutput.push(tabulacja + "\t\t<sources>\n");
					$.each(node.sources, function(key, source) {
						tabOutput.push(tabulacja + "\t\t\t<source>" + source + "</source>\n");
					});
					tabOutput.push(tabulacja + "\t\t</sources>\n");
				}
				if (node.targets) {
					tabOutput.push(tabulacja + "\t\t<targets>\n");
					$.each(node.targets, function(key, target) {
						tabOutput.push(tabulacja + "\t\t\t<target>" + target + "</target>\n");
					});
					tabOutput.push(tabulacja + "\t\t</targets>\n");
				}
				tabOutput.push(tabulacja + "\t</node>\n");
			}

			var tabOutput = [],
				physicalDescription, functionalDescription, nonFunctionalDescription, i = 0
			;
			// console.log(jsonFormatter(json, true))
			tabOutput.push("<graph version=\"1.3\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">\n");
			parseGraph(json, "\t");
			tabOutput.push("</graph>");

			var stringXML = tabOutput.join("");

			if (!humanFriendly) {
				stringXML = stringXML.replace(/\t/g, "").replace(/\n/g, "");
				// alert(humanFriendly)
			}

			return stringXML;
		},
		convert: function convert(ssdl, id, version) { // converst ssdl into json
			//alert("convert"+":"+ssdl);
			var Graph = {};
			version = version || $(ssdl).find("graph").attr("version");
			Graph.id = id ? id : "root";
			Graph.nodes = [];

			$(ssdl).find("nodes:first > node").each(function() {
				var _this = $(this);
				var node = {};
				node.nodeId = _this.find("nodeId:first").text();
				node.nodeType = _this.find("nodeType:first").text();
				node.nodeLabel = _this.find("nodeLabel:first").text() || node.nodeId;
				node.controlType = _this.find("controlType:first").text();

				node.physicalDescription = {};
				node.physicalDescription.serviceName = _this.find("serviceName:first").text();
				node.physicalDescription.serviceGlobalId = _this.find("serviceGlobalId:first").text();
				node.physicalDescription.address = _this.find("address:first").text();
				node.physicalDescription.operation = _this.find("operation:first").text();

				node.functionalDescription = {};
				node.functionalDescription.description = _this.find("functionalDescription description:first").text();
				node.functionalDescription.serviceClasses = [];
				_this.find("functionalDescription serviceClasses:first serviceClass").each(function() {
					node.functionalDescription.serviceClasses.push($(this).text());
				});
				node.functionalDescription.metaKeywords = []
				_this.find("functionalDescription metaKeywords:first metaKeyword").each(function() {
					node.functionalDescription.metaKeywords.push($(this).text());
				});
				node.functionalDescription.inputs = [];
				if(node.controlType.toLowerCase() != "#start"){
					var input, tmp1, tmp2;
					_this.find("functionalDescription inputs:first input").each(function() {
						input = {}
						input.class = $(this).find("class").text();
						input.id = $(this).find("id").text();
						input.label = $(this).find("label").text();
						input.dataType = $(this).find("dataType").text();
						input.properties = $(this).find("properties").text();
						input.source = [];

						tmp1 = $(this).find("nodeId").text();
						tmp2 = $(this).find("outputId").text();
						if (tmp1.length > 0 && tmp2.length > 0) {
							input.source.push(tmp1, tmp2);
						}
						node.functionalDescription.inputs.push(input);
					});
				}
				node.functionalDescription.outputs = [];

				if(node.controlType.toLowerCase() != "#end"){
					var output;
					_this.find("functionalDescription outputs:first output").each(function() {
						output = {}
						output.class = $(this).find("class").text();
						output.id = $(this).find("id").text();
						output.label = $(this).find("label").text();
						output.dataType = $(this).find("dataType").text();
						output.properties = $(this).find("properties").text();

						node.functionalDescription.outputs.push(output);
					});
				}
				node.functionalDescription.preconditions = _this.find("functionalDescription preconditions:first").text();
				node.functionalDescription.effects = _this.find("functionalDescription effects:first").text();
				node.nonFunctionalDescription = [];
				var nonFunctionalProperty;
				_this.find("nonFunctionalDescription:first nonFunctionalProperty").each(function() {
					nonFunctionalProperty = {};
					nonFunctionalProperty.weight = parseInt($(this).find("weight").text(), 10);
					nonFunctionalProperty.name = $(this).find("name").text();
					nonFunctionalProperty.relation = $(this).find("relation").text();
					nonFunctionalProperty.unit = $(this).find("unit").text();
					nonFunctionalProperty.value = $(this).find("value").text();

					node.nonFunctionalDescription.push(nonFunctionalProperty);
				});

				node.alternatives = _this.find("alternatives:first").text();
				node.subgraph = {};

				if (_this.find("subGraph:first nodes").length > 0) {
					var tmp = _this.find("subGraph:first");
					node.subgraph = {};
					var t = convert(tmp[0], node.nodeId);
					node.subgraph.nodes = t.nodes;
					node.subgraph.inputVariables = t.inputVariables;
					node.subgraph.nonFunctionalParameters = t.nonFunctionalParameters;
					node.subgraph.parameters = _this.find("subGraph parameters:last").text();
					node.subgraph.exceptions = _this.find("subGraph excptions:last").text();
				}


				var $condition = _this.find("condition:first");
					node.condition = {};
					node.condition.conditionId = $condition.find("conditionId:first").text();
					node.condition.paths = [];
					var path;
					$condition.find("paths:first path").each(function(){
						path = {};
						path.pathId = $(this).find("pathId:first").text();
						path.inputId = $(this).find("inputId:first").text();

						node.condition.paths.push( path );
					});
					node.condition.type = $condition.find("type:first").text();

				var $details = $condition.find("if:first");
					node.condition.if = {};
					node.condition.if.path = $details.find("path:first").text();
					node.condition.if.variable = $details.find("variable:first").text();
					node.condition.if.value = $details.find("value:first").text();
					node.condition.if.relation = $details.find("relation:first").text();

					node.condition.then = $.trim( $condition.find("then:first").text() );
					node.condition.else = $.trim( $condition.find("else:first").text() );

				node.sources = [];
				_this.find("sources:first source").each(function() {
					var txt = $(this).text();
					if (txt.length > 0 && node.nodeId) {
						node.sources.push(txt);
					}
				});

				node.targets = [];
				_this.find("targets:first target").each(function() {
					var txt = $(this).text();
					if (txt && node.nodeId) {
						node.targets.push(txt);
					}
				});

				Graph.nodes.push(node);
			});
			$(ssdl).find("nodes:first > node").remove();

			var inputVariables = [],
				inputVariable;
			$(ssdl).find("inputVariables:first inputVariable").each(function() {
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
			$(ssdl).find("nonFunctionalParameters:first nonFunctionalProperty").each(function() {
				nonFunctionalProperty = {};
				nonFunctionalProperty.weight = parseInt($(this).find("weight:first").text(), 10);
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
		},
		getRoot: function getRoot() {
			var result;
			if(!this.graphData_tab.length){
				this.graphData_tab.push( this.current_graphData );
			}
			for (var i = this.graphData_tab.length - 1, j = -1; i > j; i--) {
				if (this.graphData_tab[i].isRoot) {
					result = this.graphData_tab[i];
					break;
				}
			}

			return result;
		},
		saveSSDL: function saveSSDL(humanFriendly) {
			var root = this.getRoot();
			var xml = this.convertJSON2XML(root, humanFriendly);

			return xml;
		}
	}

	$('html').click(function() {
		selectednode = selectednode || false;
		if (!selectednode) controllerObject.reactOnEvent("ESCAPE");
	});
	controllerObject.reactOnEvent("START");

	return controllerObject;
}
//Koniec pliku controller.js

	global.Graph_GUI = function Graph_GUI(id, width, height, graphSaveParams, sdbUrl, saveUrl, graphToEditUrl, graphToEditName){
		var r = {};

		r.id_postfix = Math.round( Math.random() * 10e5 );
		r.language = "polish";
		CFG.saveUrl = saveUrl;

		// tymczasowo na potrzeby rozdzielenia wtyczek na wiele plików.
			window.gui = r;
			window.pf = r.id_postfix;
		//

		skeletonAppender(r.language,r.id_postfix); // funkcja wrzuca szkielet dla wszystkich formularzy do body. -- Dorota
	
		r.view = View(id, width, height, r, graphSaveParams);
		r.view.blankNodes.init();
		r.view.blankNodes.draw();
		r.view.mainMenu.init();
		r.view.nodeDragger = nodeDragger();
		r.controller = Controller(sdbUrl, saveUrl, graphToEditUrl, graphToEditName, r);
		r.logger = r.controller.initLogger(r.view.paper);
		r.controller.init();

		$(function(){
			$(".plugin_"+r.id_postfix).css("padding-bottom", "10px")
		});

		// setTimeout(function(id, width, height, r, graphSaveParams){r.view = View(id, width, height, r, graphSaveParams);}.bind(global, id, width, height, r, graphSaveParams), 0);
		// setTimeout(function(r, nodeDragger){
		// 	r.view.blankNodes.init();
		// 	r.view.blankNodes.draw();
		// 	r.view.mainMenu.init();
		// 	r.view.nodeDragger = nodeDragger();
		// }.bind(r, nodeDragger), 0);
		// setTimeout(function(sdbUrl, saveUrl, graphToEditUrl, graphToEditName, r){
		// 	r.controller = Controller(sdbUrl, saveUrl, graphToEditUrl, graphToEditName, r);
		// 	r.logger = r.controller.initLogger(r.view.paper);
		// 	r.controller.init();
		// 	$(function(){
		// 		$(".plugin_"+r.id_postfix).css("padding-bottom", "10px")
		// 	});
		// }.bind(global, sdbUrl, saveUrl, graphToEditUrl, graphToEditName, r), 0);

		// return r;
	}

})(this);