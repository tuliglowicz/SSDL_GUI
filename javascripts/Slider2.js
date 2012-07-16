jQuery.fn.Slider = function(type) {

	/* 
			"Jaki pseudo kibic... a nie , to pseudo informatyk..."
			"Errare humanum est"... 
			ToDo 
	
		*/

		

		
if(type=="horizontal") {


			var position = $(this).position();
			var top = position.top,
				left = position.left,
				height = this.height(),
				width = this.width();
			
			var scrollbar = jQuery('<div/>', {
				class: "scrollbar",
				css: {
					'z-index': 5,
					position: 'absolute',
					left: width - 10,
					width: '30px',
				},

			});


			var scrollbarcont = jQuery('<div/>', {
				id: "scrollbar1",
				css: {
					position: 'absolute',
					top: top,
					left: left,
					width: width,
					clear: 'both',
					margin: '0px 0 10px',
				},

			});



			var track = jQuery('<div/>', {
				class: "track",
				css: {
					position: 'relative',
					width: '5px',
					height: 0.7 * height,
					float: 'left',
					margin: '0px 0 0 10px',
					opacity: .5,
					background: '#000',
					cursor: 'pointer',
					borderRadius: '2px'
				},

			});


			var thumb = jQuery('<div/>', {
				class: "thumb",
				css: {
					position: 'absolute',
					width: '5px',
					height: 0.1 * height,
					background: '#999',
					textAlign: 'center',
					lineHeight: '60px',
					color: '#666',
					opacity: 1,
					overflow: 'hidden',
					cursor: 's-resize',
					borderRadius: '2px',
					'op - borderRadius': '2px',
					'moz - borderRadius': '2px',
					'webkit - borderRadius': '2px',
				},
			});


			var end = jQuery('<div/>', {
				class: "end",
				css: {
					'background-color': '#999',
					overflow: 'hidden',
					height: '5px',
					width: '13px',
				},
			});


			var viewport = jQuery('<div/>', {
				class: "viewport",
				css: {
					width: width,
					height: height,
					overflow: 'hidden',
					position: 'relative',
				},
			});


			var overwiev = jQuery('<div/>', {
				class: "overview",
				css: {
					'list-style': 'none',
					position: 'absolute',
					left: 0,
					top: 0,
				},
			});
			$(overwiev).append(this);
			$(viewport).append(overwiev);			
			$(thumb).append(end);
			$(track).append(thumb);
			$(scrollbar).append(track);
			$(scrollbarcont).append(scrollbar);
			$(scrollbarcont).append(viewport);
			$('body').append($(scrollbarcont));
			this.css({'width':'auto', 'height':'', 'position':''});
			scrollbarcont.tinyscrollbar();

			$(scrollbar).myShow(1);
			$(scrollbar).
			mouseover(function() {
				$(this).stop().show();
			}).
			mouseout(function() {
				$(this).stop().show();
			})

			$(scrollbarcont).
			mouseover(function() {
				$(scrollbar).myShow(100);
			}).
			mouseout(function() {
				$(scrollbar).myHide(100);
			});
		}

		else {

			var position = this.position();
			var top = position.top,
				left = position.left,
				height = this.height(),
				width = this.width();



			var scrollbarcont = jQuery('<div/>', {
				id: "scrollbar1",
				css: {
					width: width,
					clear: 'both',
					margin: '20px 0 10px',
				},
			});

			var scrollbar = jQuery('<div/>', {
				class: "scrollbar",
				css: {
					position: 'relative',
					margin: '0 0 5px',
					clear: 'both',
					height: '10px',
				},
			});



			var track = jQuery('<div/>', {
				class: "track",
				css: {
					position: 'relative',
					width: width,
					height: '2px',
					margin: '10px',
					background: '#000',
					cursor: 'pointer',
					borderRadius: '2px',
					cursor: 's-resize',
				},
			});


			var thumb = jQuery('<div/>', {
				class: "thumb",
				css: {
					position: 'absolute',
					width: '60px',
					height: '2px',
					background: '#999',
					textAlign: 'center',
					lineWidth: '60px',
					color: '#666',
					overflow: 'hidden',
					cursor: 'pointer',
					borderRadius: '2px',
				},
			});


			var end = jQuery('<div/>', {
				class: "end",
				css: {
					'background-color': '#003D5D',
					overflow: 'hidden',
					height: '25px',
					width: '5px',
				},
			});


			var viewport = jQuery('<div/>', {
				class: "viewport",
				css: {
					width: width - 20,
					height: height,
					overflow: 'hidden',
					position: 'relative',
				},
			});


			var overwiev = jQuery('<div/>', {
				class: "overview",
				css: {
					'list-style': 'none',
					position: 'absolute',
					padding: 0,
					width: 10 * width,
					left: 0,
					top: 0,
				},

			});
			
			$(overwiev).append(this);
			$(viewport).append(overwiev);			
			$(thumb).append(end);
			$(track).append(thumb);
			$(scrollbar).append(track);
			$(scrollbarcont).append(scrollbar);
			$(scrollbarcont).append(viewport);
			$('body').append($(scrollbarcont));
			this.css({'width':'auto', 'height':'', 'position':''});

			scrollbarcont.tinyscrollbar({
				axis: 'x'
			});



		}

	return this;

}


jQuery.fn.myShow = function(time) {
	time = time || 250;
	this.show().animate({
		opacity: 1
	}, time, function() {
		$(this).show();
	});
	return this;
};
jQuery.fn.myHide = function(time) {
	time = time || 250;
	this.animate({
		opacity: 0
	}, time, function() {
		$(this).hide();
	});
	return this;

};