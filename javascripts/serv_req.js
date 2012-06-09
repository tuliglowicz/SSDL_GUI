// =================================================================================================================
// ---------------------------- definicja klasy nadrzêdnej dla service i requirement ---------------------------
// =================================================================================================================
function serv_req(node, cx, cy, thisGraph){

	this.super = Node;
	this.super(cx, cy, thisGraph);

	//-------------------------------------------------------------------- SSW node
	this.node = node;
	//-------------------------------------------------------------------- end of SSW node
	
	this.w = 145;
	this.h = 35;
	this.label;
	this.mainRect;
	this.c1, this.c2, this.c3, this.c4, this.img;
	this.c = [];
	var thisObj = this;
	var name = node.nodeId
	
	this.getName = function(){
		return thisObj.node.nodeId;
	}
	this.drawElement = function(){
		if(thisObj.nodetype == "Event"){
			k6_h = 35.0 / 2.0;
			k6_w = 145;
			k6_wkat = 7;
			str = k6_wkat+" "+(-k6_h)+" l "+(k6_w-2*k6_wkat)+" 0 l "+k6_wkat+" "+k6_h+" l "+(-k6_wkat)+" "+k6_h+" l "+(-k6_w+2*k6_wkat)+" 0";
			thisObj.mainRect = paper.path("M "+this.cx+" "+(this.cy+k6_h)+" l "+str+" z").attr("fill", "#ffc0cb")
		}
		else
			thisObj.mainRect = thisObj.paper.rect(this.cx,this.cy,this.w,this.h,5).attr("fill", thisObj.gradient);
			thisObj.mainRect.click(function(evt){
			thisObj.highlight(undefined, evt.ctrlKey);
		});
		
		//if(name == undefined || name == "null") name = "unnamed";
		//else name = (name.length > 100 ? name.substring(0, 7)+"..." : name)
		
		if(thisObj.nodetype == "Mediator")
			thisObj.img2 = thisObj.paper.image("images/db.jpg", this.cx+25, this.cy+12, 20, 20);
		thisObj.label = thisObj.paper.text(this.cx + this.w/2, this.cy + 10, node.nodeId);
		thisObj.label.node.removeAttribute("style");
		thisObj.label.node.removeAttribute("text");
		thisObj.label.node.setAttribute("class",name+" label");
		
		var serviceName = node.physicalDescription.serviceName;
		var maxLength = 25;
		var shortenServiceName = serviceName.length > maxLength ? serviceName.substring(0, maxLength-3)+"..." : serviceName;
		thisObj.serviceNameShown = thisObj.paper.text(this.cx+this.w/2+5, this.cy + 25, shortenServiceName);
		thisObj.serviceNameShown.node.setAttribute("class", name);
		thisObj.serviceNameShown.attr({title: serviceName, cursor: "default"});
		
		
		thisObj.mainRect.node.setAttribute("class",name);
		//thisObj.mainRect.click(function(){raport(thisObj.toString())});
		
		thisObj.img = thisObj.paper.image("images/img.png", this.cx+this.w-17, this.cy+2, 15, 15);
		thisObj.img.node.setAttribute("class", name+" gear");
		thisObj.img.click(function(){thisObj.dialogPreperer(false);});
		
		if(thisObj.node.nodeType == "Service" || thisObj.node.nodeType == "StreamingWorkflowEngine"){
			thisObj.img_subgraph = thisObj.paper.image("images/subgraph.png", this.cx+2, this.cy+10, 15, 15).attr({cursor: "pointer", title: "subgraph"});
			thisObj.img_subgraph.click(function(){
				drawSubgraph(thisObj.node.subgraph.xml, thisObj.node.nodeId, true);
			});
				drawSubgraph(thisObj.node.subgraph.xml, thisObj.node.nodeId, false);
		}
		
		thisObj.c1 = thisObj.paper.circle(this.cx+this.w/2, this.cy, 4);
		thisObj.c2 = thisObj.paper.circle(this.cx+this.w, this.cy+this.h/2, 4);
		thisObj.c3 = thisObj.paper.circle(this.cx+this.w/2, this.cy+this.h, 4);
		thisObj.c4 = thisObj.paper.circle(this.cx, this.cy+this.h/2, 4);

		thisObj.c.push(thisObj.c1,thisObj.c2,thisObj.c3,thisObj.c4)
		for(i=0; i<thisObj.c.length; i++){
			thisObj.c[i].node.setAttribute("class", name+" connector");
		}

		thisObj.set.push(thisObj.mainRect, thisObj.img, thisObj.img_subgraph, thisObj.label, thisObj.serviceNameShown, thisObj.img2, thisObj.c1, thisObj.c2, thisObj.c3, thisObj.c4);
		
		msoverc = function(){
			for(i=0; i<thisObj.c.length; i++)
				thisObj.c[i].animate({opacity: 1}, 150);
				//if(document.getElementById("do_you_wanna_show_description").checked)	showDescription();
		}
	
		msoutc = function(){
			for(i=0; i<thisObj.c.length; i++)
				thisObj.c[i].animate({opacity: 0}, 150);
				hideDescription();
		}
		if($("#description").length == 0){
			html = "<div id='description' style='display:none; background-color: silver; position: absolute; z-index: 9999999; top:2px; left:953px; width:500px; height: 500px;'></div>"
			$(html).appendTo("body");
		}
		function showDescription(){
			html = thisObj.toString();
			
			$("#description").html(html).show();
		}
		function hideDescription(){
			$("#description").hide();
		}
		
		for(i=0; i<thisObj.set.length; i++)
			thisObj.set[i].mouseover(msoverc).mouseout(msoutc);
	

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
		  
			if(!thisObj.highlighted){
				thisObj.highlight(true, evt.ctrlKey);
			}
		}
		var move = function(x, y){
			dx = x - lastDragX;	// mouse x
			dy = y - lastDragY; // mouse y
			
			//150 to szerokoœæ paneli po lewej i po prawej wzglêdem centralnej czêœci
			transX = ox + dx > RafaelWidth-width-150 ? RafaelWidth-width-ox-150 : (ox + dx < 150 ? 150-ox : dx);
			transY = oy + dy > RafaelHeight-height ? RafaelHeight-height-oy : (oy + dy < 0 ? -oy : dy);

			//if(thisObj.highlighted)
		  	$.each(thisGraph.nodes, function(i, val){
				if(val.highlighted){
					val.translate(transX, transY);
				}
			});
			//else {				thisObj.translate(transX, transY);			}
		  	
			lastDragX = x
			lastDragY = y;
			ox += transX;
			oy += transY;
		  
		 thisGraph.updateArrows(node.nodeId)
		}
		var stop = function(x, y){
		}
		
		thisObj.label.drag(move, start, stop);
		// ========================================= END OF D-R-A-G
		
		// ========================================= D-R-A-G-G-I-N-G---A-R-R-O-W-S
		var arrow, ccx, ccy, ofsetX, ofsetY;
		var start2 = function(){
			tmp = $("#c2").dialog( "isOpen" )===true ? "#c2 :first-child" : "#canvas_container"
			//alert(tmp);
			canvas =  $(tmp);
				ofsetX = parseInt(canvas.offset().left) + parseInt(canvas.css("border-top-width"));
				ofsetY = parseInt(canvas.offset().top) + parseInt(canvas.css("border-left-width"));
				ccx = this.attr("cx");
				ccy = this.attr("cy");
				
				//raport(ccx+", "+ccy+", "+this.attr("cx"))
				arrow = thisObj.paper.arrow(ccx,ccy,ccx,ccy,4);
		}
		var move2 = function(a, b, c, d, event){
			try{
				arrow[0].remove();
				arrow[1].remove();
			}catch(e){}
			
			//raport(ccx+", "+ccy+", "+(event.clientX-ofsetX)+", "+(event.clientY-ofsetY))
			//alert(document.body.scrollTop)
			arrow = thisObj.paper.arrow(ccx, ccy, event.clientX-ofsetX, event.clientY - ofsetY + window.scrollY, 4);
		}
		
		var stop2 = function(event){
			try {
				arrow[0].remove();
				arrow[1].remove();
			} catch(e){}
			
			elem = thisObj.paper.getElementByPoint(event.clientX, event.clientY)
			elemName = (elem != null) ? elem.node.getAttribute("class") : null; //mo¿liwe, ¿e elemName jest tutaj stringiem z kilkoma nazwami klas oddzielonymi spacjami.
		
			if(elemName != null && elemName != node.nodeId){
				myfound = thisObj.g.nodes.myFind(elemName);
		//alert(elemName)
				if(myfound != null && myfound.node && myfound.node.sources.push2(node.nodeId)) //push2 zwraca true, jeœli doda³ coœ
					thisObj.g.addEdge(node.nodeId, elemName)
				else ;
			}
		}
		
		for(i=0;i<4;i++)
			thisObj.c[i].drag(move2, start2, stop2);
		
		// ========================================= END OF D-R-A-G-G-I-N-G---A-R-R-O-W-S
		
		//if(thisObj.name == "tmpS"){thisObj.dialogPreperer(true);}

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
			
			thisObj.mainRect.attr("stroke", color);
			for(i=0;i<4;i++)
				thisObj.c[i].attr("stroke", color);
			thisObj.highlighted = highlight;
		}
	}
	this.highlight2 = function(){
		thisObj.mainRect.attr("stroke", "black");
		thisObj.c[0].attr("stroke", "black");
		thisObj.c[1].attr("stroke", "black");
		thisObj.c[2].attr("stroke", "black");
		thisObj.c[3].attr("stroke", "black");
		thisObj.highlighted = false;
	}
	this.setBold = function(flag){
		if(flag)
			thisObj.mainRect.attr("stroke-width", "2px");
		else
			thisObj.mainRect.attr("stroke-width", "1px");
	}
	this.isInside = function(x1,x2,y1,y2){
		return val.cx+val.w > x1 && val.cy+val.h > y1 && val.cx < x2 && val.cy < y2;
	}
}