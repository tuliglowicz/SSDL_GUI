function sideScroller(paper){
	// TODO: dobrze byłoby upgrade'ować to jakoś tak, żeby wywołanie nie miało 20 linijek...
	var multiplier = 0,
		visible = .4,
		animationTime = CFG.slider.animationTime,
		visibleHeight = paper.height,
		checkHeight = function(set){	//określa wysokość przekazanej tablicy obiektów
			if(!set[0]) return 0;
			var min = set[0].getBBox().y, max = 0, bbox;
			$.each(set, function(){
				bbox = this.getBBox();
				if(bbox.y < min) min = bbox.y;
				if(bbox.y + bbox.height > max) max = bbox.y + bbox.height;
			});
			return max - min + 10; //10 dodaję jako margines
		},
		isInvalid = function(set){	//sprawdza, czy tablica obiektów może zostać użyta
			return
				set.some(function(elem){
					return (getType(elem.getBBox) != "function" || getType(elem.translate) != "function")
				});
		},
		scroll = {
			move: function move(set, mult){
				return function(dx, dy){
					var newY = this.oy + dy, altDy, blockDy;
					if(newY >= 0 && newY + this.attr("height") <= visibleHeight){
						this.attr({'y': newY});;
						blockDy = newY - this.lastPos;
						$.each(set, function(){
							this.translate(0, (-1*blockDy/mult));
						});
						this.lastPos = newY;
					}
					else{
						if(newY < 0)
							altDy = this.oy;
						else
							altDy = visibleHeight - this.attr("height");
						// console.log('altDy: '+altDy);
						this.attr({'y': altDy});
						blockDy = altDy - this.lastPos;
						$.each(set, function(){
							this.translate(0, (-1*(blockDy/mult)));
						});
						this.lastPos = altDy;
					}
				}
			},
			start: function start(){
				this.oy = this.attr("y");
				this.lastPos = this.attr("y");
			},
			stop: function stop(){},
			init: function init(){
				this.slider = paper.rect(paper.width-5, 0, 5, visibleHeight*.75, 5)
					.attr({"stroke-width":0, fill:CFG.slider.fillColor, opacity: visible})
					.hide();
				this.set = [];
			},
			//update musi być wywoływany przy każdorazowej zmianie zawartości kanwy, na której siedzi sobie scroll
			update: function update(set){
				var result = false;
				if(!isInvalid(set)){
					this.set = set;
					var setHeight = checkHeight(set);
					multiplier = (visibleHeight / setHeight < 1) ? visibleHeight/setHeight : 1;
					this.slider.attr({height: visibleHeight*multiplier});
					this.slider.drag(this.move(this.set, multiplier), this.start, this.stop);
					result = true;
				}
				else
					console.log("Invalid object array passed to the addSideScroller() function. There will be NO side scroller for you! :[");
				return result;
			},
			showYourself: function showYourself(){
				if(multiplier !== 1)
					this.slider.show();
			},
			goHide: function goHide(){
				this.slider.hide();
			}
		};
	scroll.init();
	return scroll;
};