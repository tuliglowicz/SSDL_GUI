	function navigation() {
		var tmp = {
			name: "navigator",
			version: "1.0",
			author: "Author",
			dataType: 'json',
			data: null,
			tree: null,
			globalEvents: ["load"],
			localEvents: ["select"],
			require: "ssdl_JSON div".split(" "),
			currentIdsAndLabels: {},
			init: function init() {
				if ($("#navigator_" + pf).length === 0) {
					$("#left_plugins_" + pf).prepend("<div id='navigator_" + pf + "' class='plugin_" + pf + "'' style='overflow:hidden'> </div>");
				}
			},
			setData: function setData(data) {
				if (data) {
					this.data = this.convert(data)
				}
			},
			setCurrent: function setCurrent(id) {
				var $theOne = $("ul#navigator span#" + id);

				if ($theOne.length === 1) {
					$("li.navigatorElement span").removeClass("selectedLI");
					$theOne.addClass("selectedLI");
				}
			},
			draw: function draw() {
				if (this.data) {
					var that = this;
					// console.log(this.data);
					currentIdsAndLabels: {};
					// if(this.data.children.length > 0)
					// 	this.data.children[0].children.push( {id:"BUM", label: "BIMBAM"} );
					var out = (function(data) {
						var tab = [];

						tab.push("<ul id='navigator'>");
						tab.push("<li class='navigatorElement'><img id='img_navigator|" + data.id + "' src='images\\arrow_next.png' class='img_hasChildren' style='width: 10px'/><span id='" + data.id + "'>" + data.id + "</span></li>");

						that.currentIdsAndLabels[data.id] = data.label || data.id;

						(function inner(data, id) {
							tab.push("<ul id='" + id + "'>");
							$.each(data.children, function() {
								if (this.children && this.children.length > 0) {
									tab.push("<li class='navigatorElement'><img id='img|" + id + "' src='images\\arrow_next.png' class='img_hasChildren' style='width: 10px'/><span id='" + this.id + "'>" + this.label + "</span></li>");
									inner(this, id + "|" + this.id);
								} else {
									tab.push("<li class='navigatorElement'><img src='images\\white.gif' class='img_noChildren' style='visibility: hidden;height: 10px; width: 10px'/><span id='" + this.id + "'>" + this.label + "</span></li>");
								}
								that.currentIdsAndLabels[this.id] = this.label || this.id;
							});
							tab.push("</ul>");
						})(data, 'navigator|' + data.id);
						tab.push("</ul>");

						return tab.join("");
					})(this.data);

					$("#navigator_" + pf).html(out);

					$("img.img_hasChildren").click(function() {
						var $ul = $(this).parent().next();
						$ul.toggle(150);
						// dodać zmianę img
						return false;
					});

					$("li.navigatorElement").click(function() {
						var $this = $(this);
						if (!$this.find("span").hasClass("selectedLI")) {
							$("li.navigatorElement span").removeClass("selectedLI");
							$this.find("span").addClass("selectedLI");

							// console.log($(this).parent().find("img").attr("id").split("|")[1]);
							gui.controler.reactOnEvent("SwitchCurrentGraph", {
								id: $this.parent().attr("id") + "|" + $this.find("span:first").attr("id")
							})
						}
						return false;
					});

					$("li.navigatorElement:first").click();
				}
			},
			convert: function convert(json, id, str) {
				// alert(json.id)
				var n = json.nodes,
					id = json.id,
					output_json = {
						id: (id ? id : "root"),
						children: []
					};
				str = ((str ? str : "") + (id ? id : "root"))
				$.each(n, function() {
					if (this.subgraph && this.subgraph.nodes && this.subgraph.nodes.length > 0) {
						var currNode = {};
						currNode.id = this.nodeId;
						currNode.label = this.nodeLabel;
						currNode.children = convert(this.subgraph).children;
						output_json.children.push(currNode);
					}
				});
				// console.log(output_json);
				return output_json;
			}
		}
		tmp.draw();

		return tmp;
	}