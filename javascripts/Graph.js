// =================================================================================================================
// ---------------------------- definicja klasy Graph -------------------------------------------------------------
// =================================================================================================================
function Graph(paper)
{
	// ------------------------------------------------- pola klasy Graph ------------------------------------------
	this.nodes = [];	// tablica przechowuje bloczki
	this.edges = [];	//tablica przechowuje dane o krawêdziach i obiekty graficzne
	this.paper = paper;
	var thisObj = this;
	
	var bg = paper.rect(0,0,RafaelWidth,RafaelHeight).attr("fill", "#EEEEEE").attr("stroke", "none"); // selection
	var sel;
	function bgStart(x,y,d){
		//alert(x+":"+y);
		//p = d;
		//for(var i in p)	if(!$.isFunction(p[i])) raport(i+":"+p[i]);
		ox = d.layerX;
		oy = d.layerY;
		lastDragX = 0;
		lastDragY = 0;
		sel = paper.rect(ox,oy,1,1).attr({"fill": "#aaaaff", "stroke": "#0000ff", opacity: .2});
	}
	var lastRot = 0;
	function bgMove(x,y,d){
		var rot = 0;	
		if(x >= 0){
			if( y >= 0 ) rot = 0;
			else {
				rot = -90;
			}
		} else {
			if( y >= 0 ) rot = -270;
			else rot = -180;
		}
		
		if(rot == 0 || rot == -180)
			sel.attr("width", (x < 0 ? -x : x)+"px").attr("height", (y < 0 ? -y : y)+"px");
		else 
			sel.attr("height", (x < 0 ? -x : x)+"px").attr("width", (y < 0 ? -y : y)+"px");
		//alert(lastRot+":"+rot+":"+x+":"+y);
		sel.rotate(-lastRot, ox, oy).rotate(rot, ox, oy);	
		lastRot = rot;
		lastDragX = x;
		lastDragY = y;
		
		x1 = ox; y1 = oy;
		x2 = ox; y2 = oy;
		
		if(lastDragX >= 0)
			x2+=lastDragX;
		else
			x1+=lastDragX;
			
		if(lastDragY >= 0)
			y2+=lastDragY;
		else
			y1+=lastDragY;
		$.each(thisObj.nodes, function(i, val){
			try {
				val.setBold(val.cx+val.w > x1 && val.cy+val.h > y1 && val.cx < x2 && val.cy < y2);
			}
			catch(e){}
		});
	}
	function bgStop(evt){
		//cx,cy,w,h
		//ox,oy,rot,sel.attr("width"), sel.attr
		x1 = ox; y1 = oy;
		x2 = ox; y2 = oy;
		
		if(lastDragX >= 0)
			x2+=lastDragX;
		else
			x1+=lastDragX;
			
		if(lastDragY >= 0)
			y2+=lastDragY;
		else
			y1+=lastDragY;
		
		sel.remove();
		sel = null;
		lastRot = 0;
		
		//alert(x1+":"+y1+":"+x2+":"+y2)
		if(!evt.ctrlKey)
			thisObj.removeHighlight();
		
		$.each(thisObj.nodes, function(i, val){
			try {
				val.setBold(false)
			} catch(e){}
			if(val.cx+val.w > x1 && val.cy+val.h > y1 && val.cx < x2 && val.cy < y2){
				try {
					if(evt.ctrlKey)
						val.highlight();
					else
						val.highlight(true, true);
				}
				catch(e){}
			}
		});
	}
		
	bg.drag(bgMove, bgStart, bgStop);
	
	// ---------------------------------------------- funkcje pomocnicze klasy Graph -----------------------------------
	this.addNode = function(node){
		try{
			thisObj.nodes.push(node);
		}catch(e){alert(e);}
	}
	this.setPaper = function(paper){
		this.paper = paper;
	}
	this.removeNode = function(nodeName){
		var tmp = thisObj.nodes.myFind(nodeName, true); //true kasuje node-a
		//raport("mm -- "+tmp+"--"typeof(tmp))
		if(tmp){
			tmp.remove();
		}
		//alert(thisObj.nodes.length)
	}	
	this.removeAllNodes = function(){
		t = thisObj.nodes;
		for(var i=0; i<t.length; i++)
			t[i].remove()
			
		if(i==t.length) //musi byæ, zeby ponizszy skrypt czekal na usuniecie wszystkich obrazow node-ow
			thisObj.nodes = [];
			
			//raport(t.length+":"+thisObj.nodes.length);
	}	
	this.removeAllEdges = function(){
		t = thisObj.edges;
		for(var i=0; i<t.length; i++)
			t[i].remove()
			
		if(i==t.length) //musi byæ, zeby ponizszy skrypt czekal na usuniecie wszystkich obrazow node-ow
			thisObj.edges = [];
			
			//raport(t.length+":"+thisObj.nodes.length);
	}
	this.clear = function(){
		thisObj.removeAllNodes();
		thisObj.removeAllEdges();
	}
	this.addEdge = function(begNode, endNode){
		//alert(begNode+" "+endNode+" "+this.nodes.length);
		tmp = new Edge(begNode, endNode, thisObj);
		tmp.draw();
		thisObj.edges.push(tmp);
	}
	this.updateArrows = function(){
		$.each(thisObj.edges, function(i, val){ val.draw(); })
	}
	this.removeHighlight = function(caller){
		$.each(thisObj.nodes, function(i, val){
			try{val.highlight2();}
			catch(e){}
		})
		
		return true;
	}
	this.highlightAll = function(){
		$.each(thisObj.nodes, function(i, val){
			try{val.highlight(true,true);}
			catch(e){}
		})
		
		return true;
	}
	this.removeEdge = function(name){
		for(var i=0; i<thisObj.edges.length; i++){
			_t = thisObj.edges[i]
			
				//alert(getObjectClass(_t.beg));
			if(_t.beg == name || _t.end == name ){
				_t.remove();
				thisObj.edges.splice(i, 1);
				i=-1;
			}
		}
	}
	this.removeSelected = function(){
		var tmp;
		
		for(i=0; i<thisObj.nodes.length; i++){
			if(thisObj.nodes[i].highlighted){
				tmp = thisObj.nodes[i].node.nodeId
				//thisObj.nodes.myFind(tmp, true);
				thisObj.removeNode(tmp)
				thisObj.removeEdge(tmp)
				i=-1; // -1, bo (-1)++ = 0 (chcê zacz¹æ od nowa)
			}
		}
	}
	this.toXML = function(g, gHelper, nodes){
		tab_output = ["<nodes>"];
		//alert(gg);
		$.each(thisObj.nodes, function(i, n){
			tab_output.push("<node>");
				tab_output.push("<nodeId>", n.node.nodeId, "</nodeId>");
				tab_output.push("<nodeType>", n.node.nodeType, "</nodeType>");
				tab_output.push("<physicalDescription>");
					tab_output.push("<serviceName>", n.node.physicalDescription.serviceName, "</serviceName>");
					tab_output.push("<serviceGlobalId>", n.node.physicalDescription.serviceGlobalId, "</serviceGlobalId>");
					tab_output.push("<address>", n.node.physicalDescription.address, "</address>");
					tab_output.push("<operation>", n.node.physicalDescription.operation, "</operation>");
				tab_output.push("</physicalDescription>");
				tab_output.push("<functionalDescription>");
					tab_output.push("<serviceClasses>");
						$.each(n.node.functionalDescription.serviceClasses, function(i, v){
							tab_output.push("<serviceClass>", v, "</serviceClass>");
						});
					tab_output.push("</serviceClasses>");
					tab_output.push("<description>", n.node.functionalDescription.description, "</description>");
					tab_output.push("<metaKeywords>");
						$.each(n.node.functionalDescription.metaKeywords, function(i, v){
							tab_output.push("<metaKeyword>", v, "</metaKeyword>");
						});
					tab_output.push("</metaKeywords>");
					tab_output.push("<inputs>");
						$.each(n.node.functionalDescription.inputs, function(i, v){
							tab_output.push("<input>");
								tab_output.push("<class>", v.class, "</class>");
								tab_output.push("<id>", v.id, "</id>");
								tab_output.push("<label>", v.label, "</label>");
								tab_output.push("<dataType>", v.dataType, "</dataType>");
								tab_output.push("<properties>", v.properties, "</properties>");
								tab_output.push("<source><nodeId>",v.source[0],"</nodeId><outputId>",v.source[1], "</outputId></source>");
							tab_output.push("</input>");
						});
					tab_output.push("</inputs>");
					tab_output.push("<outputs>");
						$.each(n.node.functionalDescription.outputs, function(i, v){
							tab_output.push("<output>");
								tab_output.push("<class>", v.class, "</class>");
								tab_output.push("<id>", v.id, "</id>");
								tab_output.push("<label>", v.label, "</label>");
								tab_output.push("<dataType>", v.dataType, "</dataType>");
								tab_output.push("<properties>", v.properties, "</properties>");
							tab_output.push("</output>");
						});
					tab_output.push("</outputs>");
					tab_output.push("<preconditions>", n.node.functionalDescription.preconditions, "</preconditions>");
					tab_output.push("<effects>", n.node.functionalDescription.effects, "</effects>");
				tab_output.push("</functionalDescription>");
				tab_output.push("<nonFunctionalDescription>");
					$.each(n.node.nonFunctionalDescription, function(i, v){
						tab_output.push("<nonFunctionalProperty>");
							tab_output.push("<weight>", v.weight, "</weight>");
							tab_output.push("<name>", v.name, "</name>");
							tab_output.push("<relation>", v.relation, "</relation>");
							tab_output.push("<unit>", v.unit, "</unit>");
							tab_output.push("<value>", v.value, "</value>");
						tab_output.push("</nonFunctionalProperty>");
					});
				tab_output.push("</nonFunctionalDescription>");
				tab_output.push("<alternatives>", n.node.alternatives, "</alternatives>");
				tab_output.push("<subGraph>");
					//nodes
					if(n.node.subgraph.length > 0){
						gHelper.rysujSSDL(n.node.subgraph.xml);
						tab_output.push(gHelper.toXML(this, gHelper, nodes));
					}
					//if(nodes && Object.prototype.toString.call(nodes) === "[object String]"){ tab_output.push(nodes);
						//alert(Object.prototype.toString.call(nodes)) 					}
						
					tab_output.push("<inputVariables>", node.subgraph.inputVariables,"</inputVariables>");
					tab_output.push("<parameters>", node.subgraph.parameters,"</parameters>");				
					tab_output.push("<exceptions>", node.subgraph.exceptions,"</exceptions>");
				tab_output.push("</subGraph>");
				tab_output.push("<controlType>", n.node.controlType, "</controlType>");
				tab_output.push("<condition>", n.node.condition, "</condition>");
				tab_output.push("<sources>");
					//alert(_graph2.edges.length);
					$.each(thisObj.edges, function(i, e){
						//alert(e.end)
						if(e.end && e.end == n.node.nodeId)
							tab_output.push("<source>", e.beg, "</source>");
					});
				tab_output.push("</sources>");
				
				//tab_output.push("<>", , "</>");
			tab_output.push("</node>");
		})
		tab_output.push("</nodes>")
		
		var x = tab_output.join("")
		//alert(x);
		return x;
	}
	
	// ---------------------------- funkcje kluczowe	
	//funcja do poprawy w miejscu przydzielania klasy node-a, poprawiæ, gdy 
	this.rysujSSDL = function (xml){
		//alert($(xml).text())
		thisObj.clear();
		
		var c = 0;
		var defaultX = [];
		var defaultY = [];
			defaultX[0] = 210;
			defaultY[0] = 75
			defaultX[1] = 750;
			defaultY[1] = 450;
		for(count = 0; count < 70; count++){
			defaultX[count+2] = 70+100*count;
			defaultY[count+2] = 50*count;
		}
		//2._ SLA_srodmiescie.ssdl.xml
		var slaSrodX = new Array(255, 615, 315, 265, 440, 390, 390);
		var slaSrodY = new Array(62, 362.5, 45, 160, 160, 270, 345);
		//-----------------------------
		//4._ CompositeService_srodmiescie_MAPPED.ssdl.xml
		var slaSrodMappedX = new Array(171, 723,200, 154, 307, 194, 194, 377, 377, 543);
		var slaSrodMappedY = new Array(32, 439.5,55, 148, 148, 255, 359, 359, 422, 422);
		
		//-----------------------------
		//mapping, selection, optimization.ssdl.xml
		var msoX = new Array(662.5,662.5,380,380,590,590,590);
		var msoY = new Array(31.5,353,80,145,100,180,260);
		//-----------------------------
		//mapping, matching.xml
		var mmX = new Array(592, 592, 300, 520, 520, 520, 520);
		var mmY = new Array(31.5, 373, 90, 290, 90, 160, 225);
		//-----------------------------
		//selection, optimization.ssdl.xml
		var soX = new Array(592, 592, 300, 300, 520, 520);
		var soY = new Array(31.5, 373, 90, 160, 160, 250);
		
		
		//------------------
		//var slaSrodMappedX
		
		var p = $(xml).find("nodes node:first, nodes node:first ~ node").each(function(){
			var _this = $(this)

				var tabX, tabY;
				if(false){
					tabX = slaSrodX;
					tabY = slaSrodY;
				}
				else if(true){
					tabX = slaSrodMappedX;
					tabY = slaSrodMappedY;
				}
				else if(false){
					tabX = msoX;
					tabY = msoY;
				}
				else if(false){
					tabX = mmX;
					tabY = mmY;
				}
				else if(false){
					tabX = soX;
					tabY = soY;
				}
				else {
					tabX = defaultX;
					tabY = defaultY;
				}
							
				if(node.nodeId == "#Start" || node.nodeId == "#End"){
					if(node.nodeId == "#Start")
						tmp = new startstopNode(node, tabX[c], tabY[c++], thisObj).drawElement();
					else 
						tmp = new startstopNode(node, tabX[c], tabY[c++], thisObj).drawElement();
				}
				else {
					if(node.nodeType == "Functionality"){
						tmp = new requirementNode(node, tabX[c], tabY[c++], thisObj).drawElement();
					} else if(node.nodeType == "Service" || node.nodeType == "StreamingWorkflowEngine"){
						tmp = new serviceNode(node, tabX[c], tabY[c++], thisObj).drawElement();
					} else if(node.nodeType == "Mediator"){
						tmp = new mediatorNode(node, tabX[c], tabY[c++], thisObj).drawElement();
					}
					/* else if(node.nodeType == "Function"){
						tmp = new functionNode(node, tabX[c], tabY[c++], thisObj).drawElement();
					} else if(node.nodeType == "Event"){
						tmp = new eventNode(node, tabX[c], tabY[c++], thisObj).drawElement();
					}
					*/
				}
				thisObj.addNode(tmp);
			});	
			
			$.each(thisObj.edges, function(i, val){
					val.draw();
			})
			
			
			thisObj.updateArrows();
			
	}
	
}