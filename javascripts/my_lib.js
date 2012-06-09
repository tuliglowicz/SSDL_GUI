// =================================================================================================================
// ---------------------------- code snippets --------------------------------------------
// =================================================================================================================
/*
	.click(function(){alert("");});
	for(var i in p)	if(!$.isFunction(p[i])) raport(i+":"+p[i]);
*/

// =================================================================================================================
// ---------------------------- funkcje pomocnicze ---------------------------------------------------------------
// =================================================================================================================

function raport(arg){
	//if(document.getElementById("raport"))
	document.getElementById("raport").innerHTML =arg; //+ "----"+ typeof(arg)
}
function getObjectClass(obj) {
    if (obj && obj.constructor && obj.constructor.toString) {
        var arr = obj.constructor.toString().match(
            /function\s*(\w+)/);

        if (arr && arr.length == 2) {
            return arr[1].toLowerCase();
        }
    }
    return undefined;
}
String.prototype.capitalise = function ()
{
    if(getObjectClass(this) == 'string')
    	return this.charAt(0).toUpperCase() + this.slice(1);
    else
    	alert(this+" is not a string!");
}


// =================================================================================================================
// ---------------------------- funkcje dodawane do istniejących klas --------------------------------------------
// =================================================================================================================
	
Raphael.fn.arrow = function (x1, y1, x2, y2, size) {
    var angle = (Math.atan2(x1-x2,y2-y1) / Math.PI) * 180;
    var arrowPath = this.path("M" + x2 + " " + y2 + " L" + (x2 - size) + " " + (y2 - size) + " L" + (x2 - size) + " " + (y2 + size) + " L" + x2 + " " + y2 ).attr("fill","black").rotate((90+angle),x2,y2);
    var linePath = this.path("M" + x1 + " " + y1 + " L" + x2 + " " + y2);
    return [linePath,arrowPath];
}
Array.prototype.push2 = function(arg){
	if(typeof(arg) == 'string')//tylko do stringów
	{
		for(i = 0; i<this.length && this[i] != arg; i++); // ;
		if(i == this.length) {
			this.push(arg);
			return true;
		}
	}
	
	return false;
}
Array.prototype.myFind = function(objName, andDel)
{	//raport(1+":"+this.length+" --- "+this.print());
	for(var i=0; i<this.length && this[i].node && this[i].node.nodeId != objName; i++)	//alert(objName+":"+this[i].node.nodeId+":"+i+":"+this.length)
	;
	
	if(i<this.length && andDel){
		tmp = this[i];
		this.splice(i, 1); //dunno if it works //how to remove an element from array
			//raport(2+":"+this.length+" --- "+this.print());
			//raport(tmp+"---"+this[i])
		return tmp;
	} else{
			//raport(3+":"+this.length+" --- "+this.print());
			//raport(this[i])
		return (i >= this.length) ? undefined : this[i];
	}
}
Array.prototype.print = function()
{
	var str = "";
	if(this.length > 0){
		str=this[0];
		for(var i=1; i<this.length; i++)
			str += ", "+this[i];
	}
	return str;
}

