
var language = {
	polish : {
		alerts: {
				errors: {
					ioDiffType: "Próbowałeś połączyć wyjście i wejście o innych typach danych.",
					shortcutAdded: " jest już używany!",
					shortcut: " skrót ",
					shortcutNotDefined: "nie jest jeszcze zdefiniowany"
				}

		},
		forms: {
			label: "etykieta",
			description: "opis",
			controlType: "typKontrolny",
			serviceClass: "klasaUslugi",
			address: "adres",
			serviceName: "nazwaUsługi",
			serviceGlobalId: "globalnyIdentyfikatorUsługi",
			operation: "operacja",
			id: "identyfikator",
			class: "klasa",
			dataType: "typDanych",
			properties: "właściwości",
			source: "źródło",
			weight: "waga",
			name: "nazwa",
			relation: "relacja",
			unit: "jednostka",
			value: "wartość",
			type: "typ"
		},
		formTabs: {
			main: "Ogólne",
			serviceDesc: "Opis usługi",
			inputs: "Wejścia",
			outputs: "Wyjścia",
			nonFunctionalDesc: "Opis niefunkcjonalny"
		},

		logger:{
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

		mainMenu:{
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
			startStop: "Start Stop",
			fromDB: "z bazy danych",
			fromFile: "z pliku",
			toDB: "do bazy danych",
			toFile: "do pliku",
			toDBAndDeploy:"do bazy danych i wdróż",
			undo: "Cofnij",
			redo: "Do przodu",
			oneStep: "Jeden krok",
			all: "Do końca",
			inputVariables: "Wartości wejść",
			nonFunctionalParameters:" Parametry niefunkcjonalne",
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
		alerts: {
				errors: {
					ioDiffType: "You tried to make connection between input and output of different data types",
					shortcutAdded: " is being used!",
					shortcut: "shortcut",
					shortcutNotDefined: "is not defined!"
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
			type: "type"
		},
		formTabs: {
			main: "Main",
			serviceDesc: "Service Desciption",
			inputs: "Inputs",
			outputs: "Outputs",
			nonFunctionalDesc: "nonFunctionalDescription"
		},

		logger:{
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

		mainMenu:{
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
			startStop: "Start Stop",
			fromDB: "from DB",
			fromFile: "from File",
			toDB: "to DB",
			toFile: "to File",
			toDBAndDeploy:"to DB and Deploy",
			undo: "Undo",
			redo: "Redo",
			oneStep: "One Step",
			all: "All",
			inputVariables: "Input Variables",
			nonFunctionalParameters:" Non-Functional Parameters",
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