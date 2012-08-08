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