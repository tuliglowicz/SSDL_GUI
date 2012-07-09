	Raphael.fn.arrow = function (x1, y1, x2, y2, size) {
		var angle = (Math.atan2(x1-x2,y2-y1) / Math.PI) * 180,
			arrowPath = this.path("M" + x2 + " " + y2 + " L" + (x2 - size) + " " + (y2 - size) + " L" + (x2 - size) + " " + (y2 + size) + " L" + x2 + " " + y2 ).attr("fill","black").rotate((90+angle),x2,y2),
			linePath = this.path("M" + x1 + " " + y1 + " L" + x2 + " " + y2);

		return [linePath, arrowPath];
	};
	Raphael.el.myShow = function (time) {
		time = time || 250;
		this.show().animate({opacity: 1}, time);
		return this;
	};
	Raphael.el.myHide = function (time) {
		time = time || 250;
		this.animate({opacity: 0}, time, function(){
			this.hide();
		});
		return this;
	};
	jQuery.fn.myShow = function (time) {
		time = time || 250;
		this.animate({opacity: 1}, time);
		return this;
	};
	jQuery.fn.myHide = function (time) {
		time = time || 250;
		this.animate({opacity: 0}, time, function(){
			$(this).hide();
		});
		return this;
	};
	function raport(arg){
		arg = arg.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br/>").replace(/\t/g, "&nbsp; &nbsp;");
		document.getElementById("raport").innerHTML +=arg; //+ "----"+ typeof(arg)
	}
	function getType(arg){
		var tmp = Object.prototype.toString.call(arg);

		return tmp.substring(8, tmp.length-1);
	}



	// Object.prototype.getType = function getType(){
	// 	var tmp = Object.prototype.toString.call(this);

	// 	return tmp.substring(8, tmp.length-1);
	// };
	// Object.prototype.extend = function () {
	// 	var tempObj;
	// 	for (var i in arguments) {
	// 		tempObj = arguments[i];
	// 		for (var property in tempObj) {
	// 			this[property] = (this[property] === undefined ? tempObj[property] : this[property]);
	// 		}
	// 	}
	// };