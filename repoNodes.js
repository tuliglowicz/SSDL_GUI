	function repoNodes(visualiser) {
		var resultObject = {
			currNodes: [],
			paper: undefined,
			data: undefined,
			require: "sdb_json_array div raphael_x_500".split(" "),
			init: function init() {
				if ($("#repoNodes_" + pf).length === 0) {
					$("#right_plugins_" + pf).append("<div id='repoNodes_" + pf + "' class='plugin_" + pf + "'> </div>");
					this.paper = Raphael("repoNodes_" + pf, gui.view.columnParams.rightCol.width - 1, 500);
					this.scroller = sideScroller(this.paper);
					this.createCover();					
				}
			},
			createCover: function createCover(){
				var that, left, top;
				left = $("#repoNodes_" + pf).position().left;
				that = this;
				this.cover = this.paper.rect(0, 0, this.paper.width, this.paper.height).attr({
					opacity: 0,
					fill: "ivory"
				}).mouseover(function() {
					that.scroller.showYourself();
				}).mouseout(function(evt, x, y) {
					top = $("#navigator_" + pf).position().top + $("#navigator_" + pf).height();
					if (!that.cover.isPointInside(x - left, y - top)) that.scroller.goHide();
				}).toFront();
			},
			convertData: function generateData(node, n) {
				var result = visualiser.getBlankNode();
				result.id = node.nodeId;
				result.label = node.nodeLabel;
				result.type = node.nodeType;
				result.x = 10;
				result.y = 15 + (45 * n);
				result.height = 20;
				result.serviceName = node.physicalDescription.serviceName;
				result.set = this.paper.set();

				result.inputs = node.functionalDescription.inputs;
				result.outputs = node.functionalDescription.outputs;

				return result;
			},
			setData: function setData(data) {
				if (data) {
					this.data = data;
				}

				return this;
			},
			draw: function draw() {
				var tempNode, that = this,
					tmp, n = -1;

				this.clear();

				$.each(this.data, function(k, v) {
					tempNode = that.convertData(v, ++n);
					tmp = visualiser.draw_serviceNode(tempNode, that.paper, true).switchToDFMode();
					tmp.raph_label.attr({
						cursor: "pointer"
					}).dblclick(function() {
						gui.controller.reactOnEvent("AddServiceFromRepoToCanvas", v);
					});
					$.each(tmp.outputs, function() {
						this.node.attr({
							cursor: "default"
						});
					});

					gui.view.visualiser.addTooltips(tmp);

					that.currNodes.push(tmp);
				});

				this.scroller.init();
				this.scroller.update(this.currNodes);

				return this;
			},
			clear: function clear() {
				if (this.paper) {
					this.paper.clear();
					this.currNodes.length = 0;
					this.createCover();
				}
				return this;
			}
		}

		return resultObject;
	}