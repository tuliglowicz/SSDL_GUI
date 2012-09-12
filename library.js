
// pomocnicze skróty
var a = alert;
var jstr = JSON.stringify;
// eof pomocnicze skróty

function skeletonAppender(lang,pf){
	var content = "<div id='form_" + pf + "'></div><div id='f_dialog_confirm1_" + pf + "' title='"+language[lang].alerts.removeAll+"'><p><span class='ui-icon ui-icon-alert' style='float:left; margin:0 5px 5px 0;'></span><span style='font-size: 10px'>"+language[lang].alerts.removeAllText+"</span></p><button id='f_button_resetConfirm1_"+pf+"'>"+language[lang].forms.clearAll1+"</button><button id='f_button_resetCancel1_"+pf+"'>"+language[lang].forms.cancel+"</button></div><div id='f_dialog_confirm2_" + pf + "' title='"+language[lang].alerts.areYouSure+"'><p><span class='ui-icon ui-icon-alert' style='float:left; margin:0 5px 5px 0;'></span><span style='font-size: 10px'>"+language[lang].alerts.areYouSureText+"</span></p><button id='f_button_resetConfirm2_"+pf+"'>"+language[lang].forms.clearAll2+"</button><button id='f_button_resetCancel2_"+pf+"'>"+language[lang].forms.cancel+"</button></div><div id='f_dialog_fine_" + pf + "' title='"+language[lang].alerts.asYouWish+"'><p>"+language[lang].alerts.fine+".</p></div><div id='f_addInputForm_" + pf + "' title='Add a new input'><button id='f_addInputForm_changesConfirm_"+ pf +"'>"+language[lang].forms.confirm+"</button><button id='f_addInputForm_changesCancel_"+ pf +"'>"+language[lang].forms.cancel+"</button></div><div id='f_addOutputForm_" + pf + "' title='Add a new output'><button id='f_addOutputForm_changesConfirm_"+ pf +"'>"+language[lang].forms.confirm+"</button><button id='f_addOutputForm_changesCancel_"+ pf +"'>"+language[lang].forms.cancel+"</button></div><div id='f_addNFPropertyForm_" + pf + "' title='Add a new non functional property'><button id='f_addNFPropertyForm_changesConfirm_"+ pf +"'>"+language[lang].forms.confirm+"</button><button id='f_addNFPropertyForm_changesCancel_"+ pf +"'>"+language[lang].forms.cancel+"</button></div><div id='f_addGlobalNFPropertyForm_" + pf + "' title='Add a new graph non functional property'><button id='f_addGlobalNFPropertyForm_changesConfirm_"+ pf +"'>"+language[lang].forms.confirm+"</button><button id='f_addGlobalNFPropertyForm_changesCancel_"+ pf +"'>"+language[lang].forms.cancel+"</button></div><div id='f_addInputVariableForm_" + pf + "' title='Add a new non functional property'><button id='f_addInputVariableForm_changesConfirm_"+ pf +"' >"+language[lang].forms.confirm+"</button><button id='f_addInputVariableForm_changesCancel_"+ pf +"'>"+language[lang].forms.cancel+"</button></div><div id='f_globalNFPropertiesForm_" + pf + "' title='"+language[lang].mainMenu.nonFunctionalParameters+"'><br><button id='f_globalNFPropertiesForm_changesConfirm_" + pf +"' class='formButton'>"+language[lang].forms.saveChanges+"</button><button id='f_globalNFPropertiesForm_changesCancel_" + pf +"' class='formButton'>"+language[lang].forms.cancel+"</button></div><div id='f_inputVariablesForm_" + pf + "' title='"+language[lang].mainMenu.inputVariables+"'><br><button id='f_inputVariablesForm_changesConfirm_" + pf +"' class='formButton'>"+language[lang].forms.saveChanges+"</button><button id='f_inputVariablesForm_changesCancel_" + pf +"' class='formButton'>"+language[lang].forms.cancel+"</button></div><div id='f_graphSaveParamsForm_" + pf + "' title='Graph name & description'><br><button id='f_graphSaveParamsForm_changesConfirm_" + pf +"' class='formButton'>"+language[lang].forms.saveChanges+"</button><button id='f_graphSaveParamsForm_changesCancel_" + pf +"' class='formButton'>"+language[lang].forms.cancel+"</button></div><div id='f_addVectorForm_" + pf + "' title='Add a new vector'><button id='f_addVectorForm_changesConfirm_"+ pf +"'>"+language[lang].forms.confirm+"</button><button id='f_addVectorForm_changesCancel_"+ pf +"'>"+language[lang].forms.cancel+"</button></div><div id='f_dialog_markup_" + pf + "' title='New markup service[JACKU_TUTAJ!!!]'><p><span style='font-size: 10px'>Choose your destiny[JACKU_TUTAJ!!!]</span></p><button id='f_button_newMarkup_"+pf+"'>New[JACKU_TUTAJ!!!]</button><button id='f_button_importMarkup_"+pf+"'>Import from file[JACKU_TUTAJ!!!]</button></div>";
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
			+ "</div></br><button id='f_emulationTab_backButton_" + pf + "' style='float: right'>"+language[lang].forms.back+"</button></br></p></div>"

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
				html.push("<select id=\"" + this.id + "_" + postfix + "\" >");
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
			html.push("<button id=\""+this.id+"_addButton_"+postfix+"\">Add "+ this.label +"</button></td></tr>");
			html.push("<tr><td colspan='2'><p id=\""+this.id+"_list_"+postfix+"\"></p></td></tr><tr>");
		}
		else if(this.button){
			html.push("</td></tr><tr><td></td><td><button id=\""+this.id+"_addButton_"+postfix+"\">Add "+ this.label +"</button></td></tr>");
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
function addSideScroller(paper){
	// TODO: dobrze byłoby upgrade'ować to jakoś tak, żeby wywołanie nie miało 20 linijek...
	var multiplier = 0,
		visible = .4,
		animationTime = 100,
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
			start: function start(){
				this.oy = this.attr("y");
				this.lastPos = this.attr("y");
			},
			stop: function stop(){},
			init: function init(){
				this.slider = paper.rect(paper.width-5, 0, 5, visibleHeight*.75, 5)
					.attr({"stroke-width":0, fill:"black", opacity: visible})
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
					this.slider.drag(this.move(this.set, multiplier), this.start, this.stop);
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

function camelize(str) {
	return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
		if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
		return index == 0 ? match.toLowerCase() : match.toUpperCase();
	})
};

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