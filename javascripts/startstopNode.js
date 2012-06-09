function startstopNode(node, cx, cy, thisGraph){
	this.super = Node
	if(name == "end"){
		cx = 750;
		cy = 350;
	}
	
	this.super(cx, cy, thisGraph);
	this.w = 0;
	this.h = 0;
	
	//-------------------------------------------------------------------- SSW variables
		this.node = node
	//-------------------------------------------------------------------- end of SSW variables

	var thisObj = this;
	this.c;
	
	/*
	this.dialogPreperer= function(first){
		setValues(thisObj);
		$( "#dialog1" )
		.dialog("option", "title", "Opcje dla: "+name)
		.dialog("option", "buttons", [{text: "OK", click: function(){
			//TODO - zmiana nazwy.... 
				if(thisObj.name != $("#dial1_inp_name")[0].value  && $("#dial1_inp_name")[0].value != ""){
					//thisObj.g.changeName(thisObj.name, $("#dial1_inp_name")[0].value);
					name = $("#dial1_inp_name")[0].value;
					
					thisObj.name = name;
					
					thisObj.label.attr("text", $("#dial1_inp_name")[0].value)
					thisObj.label.node.removeAttribute("class");
					thisObj.label.node.setAttribute("class",name+" label");
					
					thisObj.c.node.removeAttribute("class");
					thisObj.c.node.setAttribute("class",name);
					
				}
				thisObj.class_ = $("#dial1_inp_class")[0].value;
				thisObj.nodetype = $("#dial1_inp_type")[0].value;
				thisObj.address = $("#dial1_inp_address")[0].value;
				$(this).dialog("close");}
			},
			{text: "Cancel", click: function() {
				$(this).dialog("close"); 
				}}])
		.dialog( "open" );
		
		$("div.ui-dialog-buttonset button").css("font-size", "12px");
	}
	*/
	
	/* ------------------------------- */
		msoverc = function(){
			for(i=0; i<thisObj.c.length; i++)
				thisObj.c[i].animate({opacity: 1}, 150);
				showDescription();
		}
	
		msoutc = function(){
			for(i=0; i<thisObj.c.length; i++)
				thisObj.c[i].animate({opacity: 0}, 150);
				hideDescription();
		}
	html = "<div id='description' style='display:none; background-color: silver; position: absolute; z-index: 9999999; top:2px; left:953px; width:200px; height: 500px;'></div>"
		$(html).appendTo("body");
		function showDescription(){
			html = thisObj.toString();
			
			$("#description").html(html).show();
		}
		function hideDescription(){
			$("#description").hide();
		}
		
	this.toString = function(){
		return "x:"+thisObj.getCoords().cx+", y:"+thisObj.getCoords().cy+"<br/>";
		//"<node><name>"+this.name+"</name><class/><nodetype>"+this.nodetype+"</nodetype><inputs><input><metaname/><name>a</name><type>Integer</type><source/></input><input><metaname/><name>b</name><type>Integer</type><source/></input></inputs><outputs><output><metaname/><name>a</name><type>Integer</type></output><output><metaname/><name>b</name><type>Integer</type></output></outputs><preconditions/><effects/><address/><method/><controltype>"+(this.name.capitalise())+"</controltype><condition/></node>";
	}	
	
		for(i=0; i<thisObj.set.length; i++)
			thisObj.set[i].mouseover(msoverc).mouseout(msoutc);
	/* ------------------------------- */
	
	
	
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
		
		return "[StartStopNode: {name: "+this.name+", cx:"+this.cx+", cy:"+this.cy+", class: "+this.class_+", type: "+this.nodetype+", address: "+this.address+", method: "+this.method+src_tmp+"}]";
	}*/
	
	this.drawElement = function(){
		this.c = thisObj.paper.circle(this.cx, this.cy, 15).attr({fill: "white", cursor: "crosshair"});
		
		
		this.c.node.setAttribute("class",node.nodeId);
		this.c.click(function(evt){
			//raport(thisObj.toString())
			if(!thisObj.highlighted){
				thisObj.highlight(true, evt.ctrlKey);
			}
		});
				
		if(node.nodeId == undefined || node.nodeId == "null") node.nodeId = "<tmp>";
		else name = (name.length > 9 ? name.substring(0, 7)+"..." : node.nodeId)
		this.label = thisObj.paper.text(this.cx, this.cy-20, node.nodeId).attr("fill", "#333");
		this.label.node.removeAttribute("style");
		this.label.node.removeAttribute("text");
		this.label.node.setAttribute("class","label");
		this.label.node.setAttribute("class",node.nodeId);
		//this.label.dblclick(thisObj.dialogPreperer);
		this.label.click(function(evt){
			//raport(thisObj.toString())
			if(!thisObj.highlighted){
				thisObj.highlight(true, evt.ctrlKey);
			}
		});
		
		this.set.push(this.c, this.label);
		
		
		// ========================================= D-R-A-G
		var lastDragX, lastDragY, width, height, ox, oy;
		var start = function(x, y, evt){			
		  lastDragX = 0;
	      lastDragY = 0;
	      bbox = thisObj.set.getBBox();
		  width = bbox.width;
		  height = bbox.height;
		  ox = bbox.x;
		  oy = bbox.y;
		}
		var move = function(x, y){
        	dx = x - lastDragX;	// mouse x
        	dy = y - lastDragY; // mouse y
			
			//150 to szerokość paneli po lewej i po prawej względem centralnej części
        	transX = ox + dx > RafaelWidth-width-150 ? RafaelWidth-width-ox-150 : (ox + dx < 150 ? 150-ox : dx);
	    	transY = oy + dy > RafaelHeight-height ? RafaelHeight-height-oy : (oy + dy < 0 ? -oy : dy);
          
	      	thisObj.translate(transX, transY);
	      	
        	lastDragX = x
        	lastDragY = y;
        	ox += transX;
        	oy += transY;
          
         thisGraph.updateArrows(name)
		}
		var stop = function(x, y){
		}
		
		this.label.drag(move, start, stop);
		// ========================================= END OF D-R-A-G
		
		// ========================================= D-R-A-G-G-I-N-G---A-R-R-O-W-S
		var arrow, ccx, ccy, ofsetX, ofsetY;
		var start2 = function(){
			tmp = $("#c2").dialog( "isOpen" )===true ? "#c2 :first-child" : "#canvas_container"
			canvas = $(tmp);
				ofsetX = parseInt(canvas.offset().left) + parseInt(canvas.css("border-top-width"));
				ofsetY = parseInt(canvas.offset().top) + parseInt(canvas.css("border-left-width"));
				ccx = this.attr("cx");
				ccy = this.attr("cy");
				
				//raport(ccx+", "+ccy+", "+this.attr("cx"))
				arrow = thisObj.paper.arrow(ccx,ccy,ccx+1,ccy+1,4);
		}
		var move2 = function(a, b, c, d, event){
			try{
				arrow[0].remove();
				arrow[1].remove();
			}catch(e){}
			
			//raport(ccx+", "+ccy+", "+(event.clientX-ofsetX)+", "+(event.clientY-ofsetY))

			arrow = thisObj.paper.arrow(ccx, ccy, event.clientX-ofsetX, event.clientY - ofsetY  + window.scrollY, 4);
		}
		
		var stop2 = function(event){
			try {
				arrow[0].remove();
				arrow[1].remove();
			} catch(e){}
			
			elem = thisObj.paper.getElementByPoint(event.clientX, event.clientY)
			elemName = (elem != null) ? elem.node.getAttribute("class") : null; //możliwe, że elemName jest tutaj stringiem z kilkoma nazwami klas oddzielonymi spacjami.
		
			if(elemName != null && elemName != node.nodeId){
				myfound = thisObj.g.nodes.myFind(elemName);
				//alert(myfound)
				if(myfound != null && myfound.node && myfound.node.sources.push2(name)) //push2 zwraca true, jeśli dodał coś
					thisObj.g.addEdge(node.nodeId, elemName)
				else{
				}
				
			}
		}
		this.c.drag(move2, start2, stop2);
		return thisObj;
	}
	
	this.highlight = function(highlight, ctrl){
		var color, bool = highlight, bool = true;
		if(ctrl != undefined && !ctrl)
			bool = thisObj.g.removeHighlight(node.nodeId);
		
		if(bool){
			if(highlight == undefined){
				color = thisObj.highlighted ? "black" : "orange";
				highlight = !thisObj.highlighted;
			} else if(highlight){
				color = "orange";
			} else {
				color = "black";
			}
			
			thisObj.c.attr("stroke", color);
			thisObj.highlighted = highlight;
		}
	}
	this.highlight2 = function(){
		thisObj.c.attr("stroke", "black");
		thisObj.highlighted = false;
	}
	this.setBold = function(flag){
		if(flag)
			thisObj.c.attr("stroke-width", "2px");
		else
			thisObj.c.attr("stroke-width", "1px");
	}
}