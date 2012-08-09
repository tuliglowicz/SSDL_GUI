// W tych dwóch funkcjach siedzą straszne ściany tekstu, które jednakowoż DZIAŁAJĄ i jak mi ktoś coś tam ruszy, to ma undefinedem w dziób.
function skeletonAppender(){
	var content = "<div id='form' class='ui-dialog-content ui-widget-content'></div>"
		+ "<div id='f_dialog_confirm1' title='Remove all data?'><p><span class='ui-icon ui-icon-alert' style='float:left; margin:0 5px 5px 0;'></span><span style='font-size: 10px'>You are about to clear the entire form. Are you sure?</span></p></div>"
		+ "<div id='f_dialog_confirm2' title='Are you sure?'><p><span class='ui-icon ui-icon-alert' style='float:left; margin:0 5px 5px 0;'></span><span style='font-size: 10px'>You will lose all data and this action cannot be cancelled. Do you really want to do this?</span></p></div><div id='f_dialog_fine' title='As you wish.'><p>FINE.</p></div>"
		+ "<div id='f_addInputForm' class='ui-dialog-content ui-widget-content' title='Add a new input'></div><div id='f_addOutputForm' class='ui-dialog-content ui-widget-content' title='Add a new output'></div>"
		+ "<div id='f_addNFPropertyForm' title='Add a new non functional property'></div><div id='f_addGlobalNFPropertyForm' title='Add a new graph non functional property'></div><div id='f_addInputVariableForm' title='Add a new non functional property'></div>"
		+ "<div id='f_globalNFPropertiesForm' title='Graph non functional properties'></div><div id='f_inputVariablesForm' title='Input variables'></div>";

	$("body").append(content);
};
function formAppender(){
	var mainContent = "<div id='tabs' class='ui-tabs ui-widget ui-widget-content ui-corner-all'>"
		 + "<ul class='ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all'>"
			 + "<li class='ui-state-default ui-corner-top ui-tabs-selected ui-state-active' id='mainTab'><a href='#tabs-1'>Main</a></li>"
			 + "<li id='physicalDescriptionTab'><a href='#tabs-2'>Service description</a></li>"
			 + "<li id='inputsTab'><a href='#tabs-3'>Inputs</a></li>"
			 + "<li id='outputsTab'><a href='#tabs-4'>Outputs</a></li>"
			 + "<li id='nonFunctionalDescriptionTab'><a href='#tabs-5'>Non-functional description</a></li>"
		 + "</ul><div id='tabs-1' class='ui-tabs-panel ui-widget-content ui-corner-bottom'>"
			 + "</br><button id='f_mainTab_nextButton' style='float:right'>NEXT</button></br></div>"
		 + "<div id='tabs-2' class='ui-tabs-panel ui-widget-content ui-corner-bottom'>"
			 + "</br><button id='f_physicalDescriptionTab_nextButton' style='float: right'>NEXT</button><button id='f_physicalDescriptionTab_backButton' style='float: right'>BACK</button></br></div>"
		 + "<div id='tabs-3' class='ui-tabs-panel ui-widget-content ui-corner-bottom'><p><div id='inputs-content' class='ui-widget'>"
					 + "<p>Defined inputs:</p><table id='f_inputsTab_inputs' class='text ui-widget-content ui-corner-all'>"
						 + "<thead><tr class='ui-widget-header '><th>Id</th><th>Label</th><th>Class</th><th>DataType</th></tr></thead><tbody><tr></tr></tbody></table></br>"
					 + "<button id='f_inputsTab_openAddInputForm'>Add new</button><button id='f_inputsTab_openEditInputForm'>Edit</button><button id='f_inputsTab_deleteThisInput'>Delete</button>"
				 + "</div></br><button id='f_inputsTab_nextButton' style='float: right'>NEXT</button><button id='f_inputsTab_backButton' style='float: right'>BACK</button></br>"
			 + "</p></div><div id='tabs-4' class='ui-tabs-panel ui-widget-content ui-corner-bottom'><p>"
				 + "<div id='outputs-content' class='ui-widget'><p>Defined outputs:</p>"
					 + "<table id='f_outputsTab_outputs' class='text ui-widget-content ui-corner-all'>"
						 + "<thead><tr class='ui-widget-header '><th>Id</th><th>Label</th><th>Class</th><th>DataType</th></tr></thead><tbody></tbody></table></br>"
					 + "<button id='f_outputsTab_openAddOutputForm'>Add new</button><button id='f_outputsTab_openEditOutputForm'>Edit</button><button id='f_outputsTab_deleteThisOutput'>Delete</button>"	
				 + "</div></br><button id='f_outputsTab_nextButton' style='float: right'>NEXT</button><button id='f_outputsTab_backButton' style='float: right'>BACK</button></br>"
			 + "</p></div><div id='tabs-5' class='ui-tabs-panel ui-widget-content ui-corner-bottom'><p>"
				 + "<div id='nonFunctionalProperties-content' class='ui-widget'><p>Defined Non Functional Properties:</p>"
					 + "<table id='f_nonFunctionalDescriptionTab_NFProps' class='text ui-widget-content ui-corner-all'>"
						 + "<thead><tr class='ui-widget-header '><th>Weight</th><th>Name</th><th>Relation</th><th>Unit</th><th>Value</th></tr></thead><tbody><tr></tr></tbody></table></br>"
				 + "<button id='f_nonFunctionalDescriptionTab_openAddNFPropertyForm'>Add new</button><button id='f_nonFunctionalDescriptionTab_openEditNFPropertyForm'>Edit</button><button id='f_nonFunctionalDescriptionTab_deleteThisNFProperty'>Delete</button>"	
				 + "</div></br><button id='f_nonFunctionalDescriptionTab_backButton' style='float: right'>BACK</button></br></p></div></div>"
	 + "<input type='submit' name='f_button_sumbitAllButton' id='f_button_sumbitAllButton' value='Submit all' style='float:right;'/>"
	 + "<input type='reset' name='f_button_resetAllButton' id='f_button_resetAllButton' value='Reset all' style='float:right;'/></br>";
	
	$("#form").prepend(mainContent);

	var inputVariables = "<p>Defined input variables:</p><table id='f_inputVariables' class='text ui-widget-content ui-corner-all'>"
						 + "<thead><tr class='ui-widget-header '><th>Name</th><th>Value</th><th>Type</th></tr></thead><tbody><tr></tr></tbody></table></br>"
						 + "<button id='f_openAddInputVariableForm'>Add new</button><button id='f_openEditInputVariableForm'>Edit</button><button id='f_deleteThisInputVariable'>Delete</button>";

	$("#f_inputVariablesForm").append(inputVariables);

	var gNFProps = "<p>Defined graph non functional properties:</p><table id='f_globalNFProps' class='text ui-widget-content ui-corner-all'>"
						 + "<thead><tr class='ui-widget-header '><th>Weight</th><th>Name</th><th>Relation</th><th>Unit</th><th>Value</th></tr></thead><tbody><tr></tr></tbody></table></br>"
						 + "<button id='f_openAddGlobalNFPropertyForm'>Add new</button><button id='f_openEditGlobalNFPropertyForm'>Edit</button><button id='f_deleteThisGlobalNFProperty'>Delete</button>";

	$("#f_globalNFPropertiesForm").append(gNFProps);
};

function formGenerator(lang, postfix, json){
	// a("")
	var html = ["<form id=\"" + json.formId + "_" + postfix + "\"><table>"]
	;

	$.each(json.fields, function(i){
		html.push("<tr><td><label for=\"" + this.id + "_" + postfix + "\">" + ( language[lang].forms[this.label] || "") +	": </label></td>");
		switch(this.inputType.toLowerCase()){
			case "textbox" :
				html.push("<td><input type=\"text\" id=\"" + this.id + "_" + postfix + "\" class=\"text ui-widget-content ui-corner-all textfield\" /></td>");
			break;
			case "textarea" :
				html.push("<td><textarea id=\"" + this.id + "_" + postfix + "\" class=\"text ui-widget-content ui-corner-all textfield\" ></textarea></td>");
			break;
			case "select" :
				html.push("<td><select id=\"" + this.id + "_" + postfix + "\" >");
					$.each(this.values, function(){
						// a("a")
						html.push("<option value=\""+this+"\">"+this+"</option>")
					});
				html.push("</select></td>")
			break;
			case "radio" :
				// html.push("ra");
			break;
		}
		html.push("<td><span id=\"" + this.id + "_validation_" + postfix + "\" style='color:red' ></span></td>");
	});
	html.push("</table></form>")

	return html.join("");
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
		var invisible = 0,
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
			isValid = function(set){	//sprawdza, czy tablica obiektów może zostać użyta
				return
					set.some(function(elem){
						return (getType(elem.getBBox) != "function" || getType(elem.translate) != "function")
					});
			},
			scroll = {
				move: function move(set, mult){
					return function(dx, dy){
						var newY = this.oy + dy, altDy; 
						if(newY >= 0 && newY + this.attr("height") <= visibleHeight){
							this.transform("t0,"+dy);
							$.each(set, function(){
								this.translate(0, (-1*dy/mult)); //this.transform("t0,"+(-1*dy/mult))
							});
						}
						else{ 
							if(newY < 0)
								altDy = this.oy;
							else
								altDy = visibleHeight - this.oy - this.attr("height");
							this.transform("t0,"+altDy);
							$.each(set, function(){
								this.translate(0, (-1*(altDy/mult+5))); //this.transform("t0,"+(-1*(altDy/mult+5)))
							});
						}
					}
				},
				start: function start(){
					this.oy = this.attr("y");
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
					if(isValid(set)){
						this.set = set;
						var setHeight = checkHeight(set);
						this.multiplier = (visibleHeight / setHeight < 1) ? visibleHeight/setHeight : 1;
						this.slider.attr({height: visibleHeight*this.multiplier});
						this.slider.drag(this.move(this.set, this.multiplier), this.start, this.stop);
						result = true;
					}
					else
						console.log("Invalid object array passed to the addSideScroller() function. There will be NO side scroller for you! :[");
					return result;
				},
				showYourself: function showYourself(){
					if(this.multiplier !== 1)
						this.slider.show();
				},
				goHide: function goHide(){
					this.slider.hide();
				}
			};
		scroll.init();
		return scroll;
	};
