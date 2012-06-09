function requirementNode(cx, cy, name, class_, nodetype, sources, address, description, $nonfunctionality, js_on, subgraph, thisGraph){
	this.super = serv_req;
	this.super(cx, cy, name, class_, nodetype, sources, address, description, $nonfunctionality, js_on, subgraph, thisGraph);
	this.gradient = "#a6c9e2"
	var thisObj = this;
	
	
	this.toString = function(){
		source = this.sources[0] != undefined ? this.sources[0] : ""
		var string = "";
		 	string += "x:"+thisObj.getCoords().cx+", y:"+thisObj.getCoords().cy+"<br/>"+
				"name: <b>"+this.name+
				"</b><br/>nodeType: <b>"+this.nodetype+
				"</b><br/>functionalDescription"+
				"</b><br/> &nbsp; &nbsp; :serviceClass <b>"+class_+
				"</b><br/> &nbsp; &nbsp; :description <b>"+description
				if(js_on != undefined){
					"</b><br/> &nbsp; &nbsp; :metaKeywords <b>"+js_on.metakeywords+
					"</b><br/> &nbsp; &nbsp; :input <b>"+js_on.input_tab+
					"</b><br/> &nbsp; &nbsp; :output <b>"+js_on.output_tab+
					"</b><br/>nonFunctionalDescription<b>"+js_on.nonFunProp_tab;
				}
				string += "</b>";
				
				return string;
				
		//return "<node><name>"+this.name+"</name><class>"+this.class_+"</class><nodetype>"+this.nodetype+"</nodetype><inputs><input><metaname/><name>a</name><type>Integer</type><source/></input><input><metaname/><name>b</name><type>Integer</type><source>"+source+"</source></input></inputs><outputs><output><metaname/><name>a</name><type>Integer</type></output><output><metaname/><name>b</name><type>Integer</type></output></outputs><preconditions/><effects/><address>"+this.address+"</address><method>"+this.method+"</method><controltype>Start</controltype><condition/></node>";
	}
	/*
	this.toString = function(){
		sources = thisObj.sources;
		src_tmp=", sources: "
		if(sources != null){		
			src_tmp = ", sources: [";
			if(sources[0])	src_tmp += sources[0];
			for(i=1; i<sources.length; i++)	src_tmp += ", "+sources[i];
			src_tmp += "]";
		} else src_tmp+=" null"
		
		return "[ServiceNode: {name: "+this.name+", cx:"+this.cx+", cy:"+this.cy+", class: "+this.class_+", type: "+this.nodetype+", address: "+this.address+", method: "+this.method+src_tmp+"}]";
	}
	*/
	
	this.dialogPreperer= function(first){
		setValues(thisObj, first);
		$( "#dialog1" )
		.dialog("option", "title", "Opcje dla: "+thisObj.node.nodeId)
		.dialog("option", "buttons", [{text: "OK", click: function(){
			//TODO - zmiana nazwy.... 
				name = $("#edit_nodeid")[0].value
				if(thisObj.node.nodeId !=  name && name != ""){
																						//thisObj.g.changeName(thisObj.name, $("#dial1_inp_name")[0].value);
					thisObj.node.nodeId = name;
					
					thisObj.mainRect.node.removeAttribute("class");
					thisObj.mainRect.node.setAttribute("class",name);
					
					for(i=0; i<thisObj.c.length; i++)
					{
						thisObj.c[i].node.removeAttribute("class");
						thisObj.c[i].node.setAttribute("class",name+" connector");
					}
					thisObj.img.node.removeAttribute("class")
					thisObj.img.node.setAttribute("class",name+" gear");
					
					thisObj.label.attr("text", name)
					thisObj.label.node.removeAttribute("class");
					thisObj.label.node.setAttribute("class",name+" label");
				}
				
				//alert($(".edit_class").length);
				$(".edit_class").each(function(){
					thisObj.node.functionalDescription.serviceClasses.push2($(this).find("u").text())
				});
				
				thisObj.node.functionalDescription.inputs = [];
				$(".edit_input").each(function(){
					var tmp = this.title.split(";"), input={};
					
					//alert(tmp);	alert(tmp.length);
						input.class = tmp[0];
						input.id = tmp[1];
						input.label = tmp[2];
						input.dataType = tmp[3];
						input.properties = tmp[4];
						if(tmp.length==7)
							input.source = [tmp[5], tmp[6]];
						
					thisObj.node.functionalDescription.inputs.push(input);
					
					//thisObj.node.functionalDescription.serviceClasses.push2($(this).find("u").text())
				});
				
				thisObj.node.functionalDescription.outputs = [];
				$(".edit_output").each(function(){
					var tmp = this.title.split(";"), output={};
					
					//alert(tmp);	alert(tmp.length);
						output.class = tmp[0];
						output.id = tmp[1];
						output.label = tmp[2];
						output.dataType = tmp[3];
						output.properties = tmp[4];
						
					thisObj.node.functionalDescription.outputs.push(output);
					
					//thisObj.node.functionalDescription.serviceClasses.push2($(this).find("u").text())
				});
				
				thisObj.node.nonFunctionalDescription = [];
				//alert($(".edit_nonFuncDescrProp").length)
				$(".edit_nonFuncDescrProp").each(function(){
					//alert(this.title)
					var tmp = this.title.split(";"), nonFunctionalProperty={};
					
						nonFunctionalProperty.weight = tmp[0];
						nonFunctionalProperty.name = tmp[1];
						nonFunctionalProperty.relation = tmp[2];
						nonFunctionalProperty.value = tmp[3];
						nonFunctionalProperty.unit = tmp[4];
						
					thisObj.node.nonFunctionalDescription.push(nonFunctionalProperty);
					
					//thisObj.node.functionalDescription.serviceClasses.push2($(this).find("u").text())
				});
				
				/*
				thisObj.class = $("#dial1_inp_class")[0].value;
				thisObj.nodetype = $("#dial1_inp_type")[0].value;
				thisObj.address = $("#dial1_inp_address")[0].value;
				thisObj.description = $("#dial1_inp_description")[0].innerHTML;
				*/
				$(this).dialog("close");}
			},
			{text: "Cancel", click: function() {
				$(this).dialog("close"); 
				}}])
		.dialog( "open" );
		
		$("div.ui-dialog-buttonset button").css("font-size", "12px");
	}

}