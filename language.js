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
			mediator:	"Mediator"

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
			addOutputS: "Czy chcesz dodać nowe wyjście w wierzchołku o etykiecie ",
			addOutputE: " ?",
			inputData: "Wprowadź dane!",
			graphNotPassedValidation:"Graf nie przeszedł poprawnie walidacji!\nCzy jesteś pewien poprawności grafu?\nkliknij OK by potwierdzić.",
			saveOK: "Procedura zapisu przeszła poprawnie",
			saveNotOK: "Procedura zapisu nie powiodła się",
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
				startCantPassControl: "Nie można przekazać kontroli do wierzchołka startowego."
			}

		},
		forms: {
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
			unit: "Jednostka",
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
			viewing: "Przeglądanie wierzchołka typu: ",
			saveChanges: "Zapisz zmiany",
			clearAll1:"Tak, wyczyść formularz",
			clearAll2: "Jestem pewien na 100%",

		},
		formTabs: {
			main: "Ogólne",
			serviceDesc: "Opis usługi",
			inputs: "Wejścia",
			outputs: "Wyjścia",
			nonFunctionalDesc: "Opis niefunkcjonalny"
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
			mediator:	"Mediator"

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
			}

		},
		forms: {
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
			relation: "relation",
			unit: "unit",
			value: "value",
			type: "type",
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
		},
		formTabs: {
			main: "Main",
			serviceDesc: "Service Desciption",
			inputs: "Inputs",
			outputs: "Outputs",
			nonFunctionalDesc: "nonFunctionalDescription"
		},

		logger: {
			console_CL: "Close console",
			console_SA: "select all",
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