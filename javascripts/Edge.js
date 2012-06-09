// =================================================================================================================
// ---------------------------- definicja klasy Egde -------------------------------------------------------------
// =================================================================================================================
function Edge(beg, end, thisGraph)
{
	this.beg = beg; // node lub string- pocztatek strzalki
	this.end = end; // node lub string- koniec strzalki
	var g = thisGraph;
	var thisObj = this;
	var paper = g.paper;
	this.arrow = null;
	
	//-------------------------------------------------------------------- funkcje strzalek
	this.tryToGetNodes = function(){
		//alert((beg.node ? beg.node.nodeId+"**" : beg)+"\n\n\n"+(end.node ? end.node.nodeId+"**" : end))
		if(getObjectClass(beg) == "string"  || getObjectClass(end) == 'string')
		{
			var tmp;
			if(getObjectClass(beg) == 'string'){
				tmp = g.nodes.myFind(beg, false);				
				if(tmp != undefined && getObjectClass(tmp) != 'string')
					beg = tmp;
			}
			if(getObjectClass(end) == 'string'){
				tmp = g.nodes.myFind(end, false);
				if(tmp != undefined && getObjectClass(tmp) != 'string')
					end = tmp;
			}
		}
		//alert(getObjectClass(beg) != "string"  && getObjectClass(end) != 'string')
		return getObjectClass(beg) != "string"  && getObjectClass(end) != 'string';
	}
	this.draw = function()
	{
		//alert(thisObj.arrow)
		if(thisObj.arrow != null){
			thisObj.arrow[0].remove();
			thisObj.arrow[1].remove();
		}
			
		if(this.tryToGetNodes()){
				points = this.findBestPoints(beg.cx, beg.cy, beg.w, beg.h, end.cx, end.cy, end.w, end.h);
			
				thisObj.arrow = paper.arrow(points.x1, points.y1, points.x2, points.y2, 4);
		}
		else return false;
	}
	this.findBestPoints = function(bcx, bcy, bw, bh, ecx, ecy, ew, eh)
	{
		rect1 = [bcx+bw/2, bcy, bcx+bw, bcy+bh/2, bcx+bw/2, bcy+bh, bcx, bcy+bh/2]
		rect2 = [ecx+ew/2, ecy, ecx+ew, ecy+eh/2, ecx+ew/2, ecy+eh, ecx, ecy+eh/2]
		
		var minOdl=Infinity, minI, minJ;
		for(var i=0; i<8; i+=2)
		{
			for(var j=0; j<8; j+=2)
				{
					dx = rect1[i]-rect2[j];
					dy = rect1[i+1]-rect2[j+1];
					dz = dx*dx + dy*dy;
					if(dz < minOdl)
					{
						minI = i;
						minJ = j;
						minOdl = dz;
					}					
					//raport(i+"--"+j+"--"+minOdl+"--"+dx+"--"+dy+"--"+dz+"--"+minI+"--"+minJ)
				}
		}
		
		return {"x1": rect1[minI], "y1": rect1[minI+1], "x2": rect2[minJ], "y2":rect2[minJ+1]}
	}
	//this.addEvents = function(){}
	this.remove = function(){
		try {
			thisObj.arrow[0].remove();
			thisObj.arrow[1].remove();
		} catch(e){}
	}
	
}