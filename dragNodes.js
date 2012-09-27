function nodeDragger(){
	var	lastDragX,
		lastDragY,
		ox, dx,
		oy, dy,
		accX, accY,
		width, height,
		rWidth = gui.view.paper.width,
		rHeight = gui.view.paper.height,
		bbox,
		ctrl,
		transX, transY,
		flag = true,
		ready2move = false,
		that = gui.view, // wczesniej było this
		itWasJustAClick = false,
		id, node,
		result = {
			start : function start( x, y, evt ){
				id = $(evt.target).parent().attr("class").split(" ")[0];
				node = that.getNodeById(id);
				itWasJustAClick = true;
				lastDragX = lastDragY = 0;
				accX = accY = 0;
				dx = dy = 0;
				bbox = node.set.getBBox();
				width = bbox.width;
				height = bbox.height;
				ox = bbox.x;
				oy = bbox.y;

				flag = false;
				if(!node.highlighted){
					if(!evt.ctrlKey)
						gui.controller.reactOnEvent("DESELECT");
					flag = true;
					node.highlight2();
				}
				ready2move = node.highlighted;
				ctrl = evt.ctrlKey;

				that.prepareNodesToDrag();
			},
			move : function move( x, y ){
				if(ready2move){
					itWasJustAClick = false;
					dx = x - lastDragX;	// mouse x
					dy = y - lastDragY; // mouse y
					
					transX = ox + dx > rWidth-width ? rWidth-width-ox : (ox + dx < 0 ? -ox : dx);
					transY = oy + dy > rHeight-height ? rHeight-height-oy : (oy + dy < 0 ? -oy : dy);

					// console.log(transX+":"+transY)
					if(transX != 0 || transY != 0){
				  		$.each(gui.view.current_graph_view.nodes, function(i, val){
							if(val.highlighted){
								val.translate(transX, transY);
							}
						});
					  	
						lastDragX = x;
						lastDragY = y;
						ox += transX;
						oy += transY;
						accX += transX;
						accY += transY;

						//gui.controller.reactOnEvent("NodeMoved");
					}
			 	}
			},
			stop : function stop( evt ){
				that.returnFromDraggingNodes(accX, accY);

				ready2move = false;
				gui.controller.reactOnEvent("NODESELECTED");
				if(itWasJustAClick){
					if(ctrl){
						if(!flag) {
							node.highlight(ctrl);
						}
					}
					else {
						gui.controller.reactOnEvent("DESELECT");
						node.highlight2();
					}

					// gui.controller.reactOnEvent("ESCAPE");
				}
				else {
					// gui.controller.reactOnEvent("NodeMoved");
				}
			}
		};
		
		return result;
}