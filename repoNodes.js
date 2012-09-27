	function repoNodes(visualiser) {
		var resultObject = {
			currNodes: [],
			paper: undefined,
			data: undefined,
			scroller: undefined,
			require: "sdb_json_array div raphael_x_500".split(" "),
			init: function init() {
				if ($("#repoNodes_" + pf).length === 0) {
					$("#right_plugins_" + pf).append("<div id='repoNodes_" + pf + "' class='plugin_" + pf + "'> </div>");
					this.paper = Raphael("repoNodes_" + pf, gui.view.columnParams.rightCol.width - 1, 500);
					this.scroller = addSideScroller(this.paper);
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
			setData: function setData(data) {
				if (data) {
					this.data = data;
				}

				return this;
			},
			draw: function draw() {
				var newRepoService,
					that = this,
					tmp, n = -1;

				this.clear();

				$.each(this.data, function(k, dataNode) {
					n++;
					newRepoService = visualiser.getBlankNode();
					visualiser.prepareData(dataNode, newRepoService);

					newRepoService.x = 10;
					newRepoService.y = 15 + (45 * n);
					newRepoService.width = CFG.nodeDefaults.defaultRepoWidth;
					newRepoService.height = CFG.nodeDefaults.defaultRepoHeight;
					newRepoService.inputs = dataNode.functionalDescription.inputs;
					newRepoService.outputs = dataNode.functionalDescription.outputs;
					newRepoService.color = CFG.colors.service

					// console.log("repo", newRepoService, that.data.length)
					visualiser.draw_rectNode(newRepoService, that.paper);
					newRepoService.drawIO(that.paper, true);
					newRepoService.raph_label.attr({
						cursor: "pointer"
					}).dblclick(function() {
						gui.controller.reactOnEvent("AddServiceFromRepoToCanvas", dataNode);
					});
					$.each(newRepoService.outputs, function() {
						this.node.attr({
							cursor: "default"
						});
					});

					visualiser.addTooltips(newRepoService);
					that.currNodes.push(newRepoService);

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