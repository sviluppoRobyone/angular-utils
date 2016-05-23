var au;
(function (au) {
    var button;
    (function (button) {
        var ActionButtonConfig = (function () {
            function ActionButtonConfig() {
                this.getErrors = au.errors.defaultError;
            }
            ActionButtonConfig.serviceName = "auButtonConfig";
            return ActionButtonConfig;
        }());
        button.ActionButtonConfig = ActionButtonConfig;
        var ActionButton = (function () {
            function ActionButton() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                this.args = [];
                this.running = false;
                this.done = false;
                this.error = false;
                this.args = args;
            }
            Object.defineProperty(ActionButton.prototype, "$q", {
                get: function () {
                    return this.args[4];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ActionButton.prototype, "auButtonConfig", {
                get: function () {
                    return this.args[3];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ActionButton.prototype, "$scope", {
                get: function () {
                    return this.args[0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ActionButton.prototype, "$element", {
                get: function () {
                    return $(this.args[2]);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ActionButton.prototype, "$timeout", {
                get: function () {
                    return this.args[1];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ActionButton.prototype, "form", {
                get: function () {
                    return this.$scope["form"] || null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ActionButton.prototype, "hasForm", {
                get: function () {
                    return this.form != null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ActionButton.prototype, "text", {
                get: function () {
                    return this.$scope["text"] || null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ActionButton.prototype, "enabled", {
                get: function () {
                    return !this.running && ((this.hasForm && this.form.$valid) || !this.hasForm);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ActionButton.prototype, "action", {
                get: function () {
                    return this.$scope["action"] || (function () { return null; });
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ActionButton.prototype, "time", {
                get: function () {
                    return this.$scope["time"] || 3000;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ActionButton.prototype, "type", {
                get: function () {
                    return this.$scope["type"] || "btn-primary";
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ActionButton.prototype, "confirm", {
                get: function () {
                    return this.$scope["confirm"] || null;
                },
                enumerable: true,
                configurable: true
            });
            ActionButton.prototype.Click = function () {
                var _this = this;
                if (this.hasForm && this.form.$invalid)
                    return;
                this.$element.popover("destroy");
                if (this.confirm && !confirm(this.confirm))
                    return;
                this.running = true;
                var p = this.action();
                //se ritorna una promise
                if (p && [p.finally, p.then, p.catch].every(function (x) { return x instanceof Function; })) {
                    p.finally(function () {
                        _this.running = false;
                    }).then(function () {
                        _this.done = true;
                        _this.$timeout(function () {
                            _this.done = false;
                        }, _this.time);
                    }).catch(function (r) {
                        _this.error = true;
                        var error$Q = _this.$q.defer();
                        error$Q.promise.then(function (errors) {
                            _this.$element.popover({
                                content: function () {
                                    var ul = $("<ul/>");
                                    errors.forEach(function (message) {
                                        $("<li/>").text(message).appendTo(ul);
                                    });
                                    var d = $("<div/>");
                                    d.addClass("text-danger").append(ul);
                                    return d;
                                },
                                html: true,
                                placement: "top",
                                title: "Si sono verificati alcuni errori"
                            }).popover("show");
                            _this.$timeout(function () {
                                _this.error = false;
                            }, _this.time);
                        });
                        _this.auButtonConfig.getErrors(error$Q, r);
                    });
                }
                else
                    this.running = false;
            };
            ActionButton.directive = function () {
                return {
                    controller: ActionButton,
                    controllerAs: "Ctrl",
                    replace: true,
                    template: ActionButton.template,
                    scope: {
                        action: "&",
                        form: "=",
                        text: "@",
                        type: "@?",
                        debug: "=?",
                        confirm: "@?"
                    }
                };
            };
            ActionButton.directiveName = "auButton";
            ActionButton.$inject = ["$scope", "$timeout", "$element", "auButtonConfig", "$q"];
            ActionButton.template = "\n            \n            <button ng-disabled=\"!Ctrl.enabled\" ng-click=\"Ctrl.Click()\" class=\"btn {{Ctrl.type}}\">\n                    <i class=\"fa fa-spin fa-spinner\" ng-show=\"Ctrl.running\"></i>\n                    <i class=\"fa fa-check\" ng-show=\"Ctrl.done\"></i>\n                    <i class=\"fa fa-times\" ng-show=\"Ctrl.error\"></i>\n                 {{Ctrl.text}}\n            </button>\n\n\n";
            return ActionButton;
        }());
        button.ActionButton = ActionButton;
    })(button = au.button || (au.button = {}));
})(au || (au = {}));
(function () {
    angular.module(au.moduleName)
        .service(au.button.ActionButtonConfig.serviceName, au.button.ActionButtonConfig)
        .directive(au.button.ActionButton.directiveName, au.button.ActionButton.directive);
})();
//# sourceMappingURL=au-button.js.map