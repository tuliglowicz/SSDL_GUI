// =================================================================================================================
// ---------------------------- definicja klasy Node ------------------------------------------------------------
// =================================================================================================================
function Node(cx, cy, thisGraph)
{
	this.g = thisGraph;
	this.paper = this.g.paper;
	this.set = this.paper.set();
	this.cx = cx;
	this.cy = cy;
	this.scale = 100;	
	this.highlighted = false;
	
	var thisObj = this;
	
	this.remove = function(){
		try {
			for(i=0; i<this.set.length; i++) this.set[i].remove();
			return true;
		} catch(e){	alert(e) }
		return false;
	}
	this.getCoords = function(){
		return {"cx": this.cx, "cy": this.cy};
	}
	this.setCoords = function(json){ // do poprawy;
		try {
			this.cx = json.cx;
			this.cy = json.cy;
			
			this.drawElement();
		} catch(e){
			throw new Exception("Prawdopodonie zada³eœ nieprawid³owy argument!")
		}
	}
	this.translate = function(transX, transY){
		$.each(thisObj.set, function(i, v){
        	if(v.attr("cx")){
        		v.attr("cx", v.attr("cx") + transX)
        		v.attr("cy", v.attr("cy") + transY)
    		}
        	else
        		v.translate(transX, transY)
      	});
      	
        this.cx += transX;
        this.cy += transY;
	}
	/*
		teraz, po dekompozycji to nie wiem gdzie to powiniennem umieœcieæ, ale przyda sie na pewno
	
			addDrag();
			removeDrag();
			addDialogBox();
			select();
			removeSelection();
	*/		
}