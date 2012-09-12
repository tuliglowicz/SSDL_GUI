function shortcutHelper() {
		var memoryTab = [],
			validationTab = ["ctrl", "delete", "shift", "esc", "f1", "home", "alt", "backspace", "space", "enter", "home", "end"],
			// spacje
			exists = function shortcutExists(shortcut) {
				var result = false;
				$.each(memoryTab, function() {
					if (this === shortcut) {
						result = true;
						return false;
					}
				})

				return result;
			},
			validate = function isValid(argumentsTab) {
				var shortcut = argumentsTab[0].toLowerCase().replace(/ /g, ""),
					callback = argumentsTab[1],
					opt = argumentsTab[2],
					msgTab = [],
					result = {
						valid: true,
						msg: ""
					};

				if (typeof callback != "function") {
					result.valid = false;
					msgTab.push("drugi argument musi być funkcją.");
				}

				if (!(typeof shortcut == "string")) {
					result.valid = false;
					msgTab.push("\npierwszy argument musi być typu string");
				} else {
					var stringTab = shortcut.split("+");
					msgTab.push("\npodany skrót: " + shortcut)

					var numberOfAZ = 0
					$.each(stringTab, function(i) {
						var noErrors = true,
							that = this.toString();
						if (!~validationTab.indexOf(that)) {
							if (!/^[a-z]{1}$/.test(that)) {
								result.valid = false;
								msgTab.push("\nnieprawidłowa wartość: " + that);
							} else if (numberOfAZ > 0) {
								result.valid = false;
								msgTab.push("\nnieprawidłowa wartość: +" + that);
							} else {
								numberOfAZ++;
							}
						}
					});

				}
				if (!result.valid) result.msg = msgTab.join("");

				return result;
			},
			result = {
				add: function add(shortcut, fun, opt) {
					var result = true,
						validationObj = validate(arguments);
					opt = opt || {
						'type': 'keypress',
						'propagate': false,
						'target': document
					}

					shortcut = shortcut.toLowerCase().replace(/ /g, "");
					if (!validationObj.valid) {
						gui.logger.error("shortcut.add", validationObj.msg.replace(/\n/g, "<br/>"));
					} else if (exists(shortcut)) {
						gui.logger.error("shortcut.add", shortcut + language[gui.language].alerts.errors.shortcutAdded);
					} else {
						memoryTab.push(shortcut);
						// console.log(opt)
						window.shortcut.add(shortcut, fun, opt)
					}

					// console.log(memoryTab)
					return result;
				},
				remove: function remove(shortcut) {
					// transformacja shortcut
					shortcut = shortcut.toLowerCase().replace(/ /g, "");
					// console.log(shortcut);
					var index = memoryTab.indexOf(shortcut);
					var result = true;

					if (!~index) {
						gui.logger.error("shortcut.remove", language[gui.language].alerts.errors.shortcut + shortcut + "\"" + language[gui.language].alerts.errors.shorcutNotDefined);
						result = false;
					} else {
						memoryTab.splice(index, 1);
						window.shortcut.remove(shortcut);
					}

					// console.log(memoryTab)
					return result;
				}
			};

		return result;
}