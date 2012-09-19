	function repository() {
		var tmp = {
			name: "repository",
			version: "1.0",
			author: "Author",
			dataType: 'xml',
			data: undefined,
			globalEvents: ["load"],
			require: "div canvas".split(" "),
			localEvents: ["select"],
			init: function init() {
				if ($("#repository_" + pf).length === 0) {
					$("#right_plugins_" + pf).append("<div id='repository_" + pf + "' class='plugin_" + pf + "' style='overflow:hidden;'> </div>");
				}
			},
			setData: function setData(data) {
				//na przyszłość wymagane więcej walidacji
				if (data && data.constructor == "[object XMLDocument]") {
					this.data = data;
				}

				return this;
			},
			draw: function draw() {
				if (this.data) {
					var html = [],
						name, url, that = this;;

					$(this.data).find("list element").each(function() {
						name = $(this).find("name").text();
						url = $(this).find("url").text();
						html.push("<a href='" + url + "' class='repository_link_" + pf + "'>" + name + "</a><br/>");
					});

					$("#repository_" + pf).html(html.join(""));

					var $repository_links = $(".repository_link_" + pf);
					$repository_links.click(function() {
						$repository_links.removeClass("selectedRepoNodes")
						gui.controller.reactOnEvent("LoadAndEditCompoundService", {
							url: this.href,
							title: this.textContent
						});
						$(this).addClass("selectedRepoNodes");
						return false;
					});

					$($("a")[4]).click();
					// $("a:last").click();
				}

				return this;
			}
		}

		return tmp;
	}