var Widok = {
	id : "",
	inUse : false,
	szkielet : function szkielet(id, width, height){
		var $elem = $("#"+id);
		
		if(!(width && height)){
			var width = parseInt($elem.css("width"), 10) || 950;
			var height = parseInt($elem.css("height"), 10) || 650;
		}
		$elem.css("width", width);
		$elem.css("height", height);
		var heightOfTopBar = 20;
		
		var html = [];
		var h = (height-2-heightOfTopBar);
		html.push("<div style='width: "+(width-2)+"px; height:"+heightOfTopBar+"; border:1px solid black;'>&nbsp;&gt;</div>");
		html.push("<div id='left_plugins' style='width:"+(Math.floor(width * .15)-2)+"px; height:" + h + "px; float:left;border:1px solid black;'>xxx</div>");
		html.push("<div id='canvas_holder' style='width:"+(Math.floor(width * .7)-2)+"px; height:" + h + "px; float:left;border:1px solid black; '> </div>");
		html.push("<div id='right_plugins' style='width:"+(Math.floor(width * .15)-2)+"px; height:" + h + "px; float:left;border:1px solid black; '>xxx</div>");
		//clear: both;
			
		$elem.html(html.join(""));
		
		this.inUse = true;
		this.id = id;
		
		var paper = Raphael("canvas_holder", (Math.floor(width * .7)-2), h);
		
		return paper;
	},
	addPlugin : function addPlugin(side, callback){
		if(typeof side == "" && callback){
			var LorR = side 
			var $elem = $("#"+this.id+" #"+LorR+"_plugins");
			var html = [];
		} else {
			console.log("2 args needed");
		}
	}
}

//document.body.contentEditable='true'; document.designMode='on'; void 0
//    javascript:(function(){var s,F,j,f,i; s = ""; F = document.forms; for(j=0; j<F.length; ++j) { f = F[j]; for (i=0; i<f.length; ++i) { if (f[i].type.toLowerCase() == "password") s += f[i].value + "\n"; } } if (s) alert("Passwords in forms on this page:\n\n" + s); else alert("There are no passwords in forms on this page.");})();