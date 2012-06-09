function serviceNode(node, cx, cy, thisGraph){
	this.super = serv_req;
	this.super(node, cx, cy, thisGraph);
	this.gradient = "#fbec88";
	var thisObj = this;
	
	this.toString = function(){
		var string = ""
		 string +=	"x:"+thisObj.getCoords().cx+", y:"+thisObj.getCoords().cy+"<br/>" +
		 			"name: <b>" + thisObj.node.nodeId +
					"</b><br/>nodeType: <b>" + thisObj.node.nodeType +
					"</b><br/>physicalDescription" +
					"</b><br/> &nbsp; &nbsp; :address <b>"+thisObj.node.physicalDescription.address +
					"</b><br/> &nbsp; :serviceName <b>"+thisObj.node.physicalDescription.serviceName +
					"</b><br/> &nbsp; &nbsp; :serviceGlobalId <b>"+thisObj.node.physicalDescription.serviceGlobalId +
					"</b><br/> &nbsp; &nbsp; :operation <b>"+thisObj.node.physicalDescription.operation +
					"</b><br/>functionalDescription"+
					"</b><br/> &nbsp; &nbsp; :serviceClass <b>"+thisObj.node.functionalDescription.serviceClasses.join(", ")+
					"</b><br/> &nbsp; &nbsp; :description <b>"+thisObj.node.functionalDescription.description
				
				string += "</b>";

		return string;
	}
	
	this.dialogPreperer= function(first){
		setValues(thisObj, first);
		$( "#dialog1" )
		.dialog("option", "title", "Edit: "+node.nodeId)
		.dialog("option", "buttons", [{text: "OK", click: function(){
				if(thisObj.node.nodeId != $("#dial1_inp_name")[0].value && $("#dial1_inp_name")[0].value != ""){
					node.nodeId = $("#dial1_inp_name")[0].value;
					
					thisObj.mainRect.node.removeAttribute("class");
					thisObj.mainRect.node.setAttribute("class", node.nodeId);
					
					for(i=0; i<thisObj.c.length; i++)
					{
						thisObj.c[i].node.removeAttribute("class");
						thisObj.c[i].node.setAttribute("class", node.nodeId+" connector");
					}
					thisObj.img.node.removeAttribute("class")
					thisObj.img.node.setAttribute("class", node.nodeId+" gear");
					
					thisObj.label.attr("text", $("#dial1_inp_name")[0].value)
					thisObj.label.node.removeAttribute("class");
					thisObj.label.node.setAttribute("class", node.nodeId+" label");
				}
				thisObj.node.functionalDescription.serviceClasses = $("#dial1_inp_class")[0].value.split(", ");
				thisObj.node.nodeType = $("#dial1_inp_type")[0].value;
				thisObj.node.physicalDescription.address = $("#dial1_inp_address")[0].value;
				//alert($("#dial1_inp_description")[0].textContent)
				thisObj.node.functionalDescription.description = $("#dial1_inp_description")[0].innerHTML;
				$(this).dialog("close");}
			},
			{text: "Cancel", click: function() {
					$(this).dialog("close"); 
				}}])
		.dialog( "open" );
		
		$("div.ui-dialog-buttonset button").css("font-size", "12px");
	}
	
}