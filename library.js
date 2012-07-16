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