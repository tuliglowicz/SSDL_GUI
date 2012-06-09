//for(var i in p)	if(!$.isFunction(p[i])) raport(i+":"+p[i]);
function raport(arg){
	document.getElementById("raport").innerHTML += arg+"<BR><BR>"; //+ "----"+ typeof(arg)
}
var jstr = JSON.stringify;