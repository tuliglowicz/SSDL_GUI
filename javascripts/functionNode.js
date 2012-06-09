function functionNode(cx, cy, name, class_, nodetype, sources, address, description, $nonfunctionality, js_on, subgraph, thisGraph){
	this.super = serv_req;
	this.super(cx, cy, name, class_, nodetype, sources, address, description, $nonfunctionality, js_on, subgraph, thisGraph);
	this.gradient = "#99ff99";
	var thisObj = this;
	
	this.toString = function(){
		source = this.sources[0] != undefined ? this.sources[0] : ""
		var string = ""
		 string +=	"x:"+thisObj.getCoords().cx+", y:"+thisObj.getCoords().cy+"<br/>"+
		 			"name: <b>"+this.name+
					"</b><br/>nodeType: <b>"+this.nodetype+
					"</b><br/>physicalDescription"+
					"</b><br/> &nbsp; &nbsp; :address <b>"+address
				if(js_on != undefined){
					string += 	"<br/> &nbsp; :serviceName <b>"+js_on.serviceName+
								"</b><br/> &nbsp; &nbsp; :serviceGlobalId <b>"+js_on.serviceGlobalId+
								"</b><br/> &nbsp; &nbsp; :operation <b>"+js_on.operation
				}
				string += "</b><br/>functionalDescription"+
				"</b><br/> &nbsp; &nbsp; :serviceClass <b>"+class_+
				"</b><br/> &nbsp; &nbsp; :description <b>"+description
				if(js_on != undefined){
					string += "</b><br/> &nbsp; &nbsp; :metaKeywords <b>"+js_on.metakeywords+
					"</b><br/> &nbsp; &nbsp; :input <b>"+js_on.input_tab+
					"</b><br/> &nbsp; &nbsp; :output <b>"+js_on.output_tab+
					"</b><br/>nonFunctionalDescription<b>"+js_on.nonFunProp_tab
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
		.dialog("option", "title", "Opcje dla: "+name)
		.dialog("option", "buttons", [{text: "OK", click: function(){
				if(thisObj.name != $("#dial1_inp_name")[0].value && $("#dial1_inp_name")[0].value != ""){
					name = $("#dial1_inp_name")[0].value;
					thisObj.name = name
					
					thisObj.mainRect.node.removeAttribute("class");
					thisObj.mainRect.node.setAttribute("class", name);
					
					for(i=0; i<thisObj.c.length; i++)
					{
						thisObj.c[i].node.removeAttribute("class");
						thisObj.c[i].node.setAttribute("class", name+" connector");
					}
					thisObj.img.node.removeAttribute("class")
					thisObj.img.node.setAttribute("class", name+" gear");
					
					thisObj.label.attr("text", $("#dial1_inp_name")[0].value)
					thisObj.label.node.removeAttribute("class");
					thisObj.label.node.setAttribute("class", name+" label");
				}
				thisObj.class_ = $("#dial1_inp_class")[0].value;
				thisObj.nodetype = $("#dial1_inp_type")[0].value;
				thisObj.address = $("#dial1_inp_address")[0].value;
				thisObj.description = $("#dial1_inp_description")[0].innerHTML;
				$(this).dialog("close");}
			},
			{text: "Cancel", click: function() {
					$(this).dialog("close"); 
				}}])
		.dialog( "open" );
		
		$("div.ui-dialog-buttonset button").css("font-size", "12px");
	}
	
}