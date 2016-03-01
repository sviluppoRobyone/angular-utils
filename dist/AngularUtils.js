var Au;
(function (Au) {
    Au.moduleName = "angularUtils";
    var Http;
    (function (Http) {
        //http://stackoverflow.com/questions/20798626/write-http-interceptor-as-class
        //http://stackoverflow.com/questions/23361883/angular-js-detect-when-all-http-have-finished
        //https://gist.github.com/abhijeetd/0686edcca2aeb0fc8b38
        var HttpEvents = (function () {
            function HttpEvents($injector) {
                var _this = this;
                this.$injector = null;
                this.loadingCount = 0;
                this.request = function (config) {
                    _this.$log.debug("get new request");
                    _this.loadingCount++;
                    if (_this.loadingCount) {
                        _this.$log.debug("Trigger loading progress");
                        _this.$rootScope.$broadcast(HttpEvents.EventProgress);
                    }
                    return config || _this.$q.when(config);
                };
                this.response = function (response) {
                    _this.$log.debug("get new response");
                    _this.loadingCount--;
                    if (!_this.loadingCount) {
                        _this.$log.debug("Trigger loading progress");
                        _this.$rootScope.$broadcast(HttpEvents.EventFinish);
                    }
                    return response || _this.$q.when(response);
                };
                this.responseError = function (response) {
                    _this.$log.debug("get new response error");
                    _this.loadingCount--;
                    if (!_this.loadingCount) {
                        _this.$log.debug("Trigger loading finish");
                        _this.$rootScope.$broadcast(HttpEvents.EventFinish);
                    }
                    return _this.$q.reject(response);
                };
                this.$injector = $injector;
                this.$rootScope.$on(HttpEvents.EventProgress, function () {
                    _this.$log.debug("Detect loading progress");
                });
                this.$rootScope.$on(HttpEvents.EventFinish, function () {
                    _this.$log.debug("Detect loading finish");
                });
                this.$rootScope.$watch(function () { return _this.loadingCount; }, function () {
                    _this.$log.debug("Ajax count change ", _this.loadingCount);
                });
            }
            Object.defineProperty(HttpEvents.prototype, "$q", {
                get: function () {
                    return this.$injector.get("$q");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HttpEvents.prototype, "$rootScope", {
                get: function () {
                    return this.$injector.get("$rootScope");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HttpEvents.prototype, "$log", {
                get: function () {
                    return this.$injector.get("$log");
                },
                enumerable: true,
                configurable: true
            });
            HttpEvents.InterceptorName = "httpEventInterceptor";
            HttpEvents.EventProgress = "loading:progress";
            HttpEvents.EventFinish = "loading:finish";
            return HttpEvents;
        })();
        Http.HttpEvents = HttpEvents;
        var HttpEventsConfig = (function () {
            function HttpEventsConfig($injector) {
                this.$injector = null;
                this.$injector = $injector;
                this.Init();
            }
            Object.defineProperty(HttpEventsConfig.prototype, "$httpProvider", {
                get: function () {
                    return this.$injector.get("$httpProvider");
                },
                enumerable: true,
                configurable: true
            });
            HttpEventsConfig.prototype.Init = function () {
                this.$httpProvider.interceptors.push(HttpEvents.InterceptorName);
            };
            return HttpEventsConfig;
        })();
        Http.HttpEventsConfig = HttpEventsConfig;
        var ToggleOnHttpActivity = (function () {
            function ToggleOnHttpActivity() {
            }
            ToggleOnHttpActivity.Directive = function () {
                var fn = function (s, e) {
                    e.addClass("hidden");
                    s.$root.$on(HttpEvents.EventProgress, function () {
                        e.removeClass("hidden");
                    });
                    s.$root.$on(HttpEvents.EventFinish, function () {
                        e.addClass("hidden");
                    });
                };
                return {
                    link: fn,
                    restrict: "A"
                };
            };
            ToggleOnHttpActivity.DirectiveName = "auHttpActivity";
            return ToggleOnHttpActivity;
        })();
        Http.ToggleOnHttpActivity = ToggleOnHttpActivity;
    })(Http = Au.Http || (Au.Http = {}));
    var Errors;
    (function (Errors) {
        Errors.defaultError = function (promise, resp) {
            promise.resolve(["An error occurred"]);
        };
        Errors.dotnetMvcError = function (promise, response) {
            if (response.data.ModelState) {
                var errors = [];
                for (var k in response.data.ModelState) {
                    if (response.data.ModelState.hasOwnProperty(k) && response.data.ModelState[k] instanceof Array) {
                        var prepend = ((typeof k == typeof "") && k.length > 0) ? k + ": " : "";
                        response.data.ModelState[k].forEach(function (e) {
                            errors.push(prepend + e);
                        });
                    }
                }
                promise.resolve(errors);
            }
        };
    })(Errors = Au.Errors || (Au.Errors = {}));
    var Button;
    (function (Button) {
        var ActionButtonConfig = (function () {
            function ActionButtonConfig() {
                this.getErrors = Errors.defaultError;
            }
            ActionButtonConfig.serviceName = "auButtonConfig";
            return ActionButtonConfig;
        })();
        Button.ActionButtonConfig = ActionButtonConfig;
        var ActionButtonCtrl = (function () {
            function ActionButtonCtrl() {
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
            Object.defineProperty(ActionButtonCtrl.prototype, "$q", {
                get: function () {
                    return this.args[4];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ActionButtonCtrl.prototype, "auButtonConfig", {
                get: function () {
                    return this.args[3];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ActionButtonCtrl.prototype, "$scope", {
                get: function () {
                    return this.args[0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ActionButtonCtrl.prototype, "$element", {
                get: function () {
                    return $(this.args[2]);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ActionButtonCtrl.prototype, "$timeout", {
                get: function () {
                    return this.args[1];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ActionButtonCtrl.prototype, "form", {
                get: function () {
                    return this.$scope["form"] || null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ActionButtonCtrl.prototype, "hasForm", {
                get: function () {
                    return this.form != null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ActionButtonCtrl.prototype, "text", {
                get: function () {
                    return this.$scope["text"] || null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ActionButtonCtrl.prototype, "enabled", {
                get: function () {
                    return !this.running && ((this.hasForm && this.form.$valid) || !this.hasForm);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ActionButtonCtrl.prototype, "action", {
                get: function () {
                    return this.$scope["action"] || (function () { return null; });
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ActionButtonCtrl.prototype, "time", {
                get: function () {
                    return this.$scope["time"] || 3000;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ActionButtonCtrl.prototype, "type", {
                get: function () {
                    return this.$scope["type"] || "btn-primary";
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ActionButtonCtrl.prototype, "confirm", {
                get: function () {
                    return this.$scope["confirm"] || null;
                },
                enumerable: true,
                configurable: true
            });
            ActionButtonCtrl.prototype.Click = function () {
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
            ActionButtonCtrl.directive = function () {
                return {
                    controller: ActionButtonCtrl,
                    controllerAs: "Ctrl",
                    replace: true,
                    template: ActionButtonCtrl.template,
                    scope: {
                        action: "&",
                        form: "=",
                        text: "=",
                        type: "=?",
                        debug: "=?",
                        confirm: "=?"
                    }
                };
            };
            ActionButtonCtrl.directiveName = "auButton";
            ActionButtonCtrl.$inject = ["$scope", "$timeout", "$element", "auButtonConfig", "$q"];
            ActionButtonCtrl.template = "\n            \n            <button ng-disabled=\"!Ctrl.enabled\" ng-click=\"Ctrl.Click()\" class=\"btn {{Ctrl.type}}\">\n                    <i class=\"fa fa-spin fa-spinner\" ng-show=\"Ctrl.running\"></i>\n                    <i class=\"fa fa-check\" ng-show=\"Ctrl.done\"></i>\n                    <i class=\"fa fa-times\" ng-show=\"Ctrl.error\"></i>\n                 {{Ctrl.text}}\n            </button>\n\n\n";
            return ActionButtonCtrl;
        })();
        Button.ActionButtonCtrl = ActionButtonCtrl;
    })(Button = Au.Button || (Au.Button = {}));
    var Input;
    (function (Input) {
        var InputCtrl = (function () {
            function InputCtrl() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                this.args = [];
                this.directiveInfo = null;
                this.defaultPattern = /.*/;
                this.args = args;
                this.directiveInfo = InputCtrl.directive();
            }
            Object.defineProperty(InputCtrl.prototype, "$scope", {
                get: function () {
                    return this.args[0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "$form", {
                get: function () {
                    return this.$scope[InputCtrl.formName] || null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "field", {
                get: function () {
                    return this.$form[InputCtrl.fieldName] || null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "ready", {
                get: function () {
                    return true && this.$form != null && this.field != null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "noFeedback", {
                get: function () {
                    return this.ready && this.field.$valid && this.field.$pristine;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "hasErrorClass", {
                get: function () {
                    return this.ready && !this.noFeedback && this.field.$invalid && this.field.$dirty;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "hasSuccessClass", {
                get: function () {
                    return this.ready && !this.noFeedback && this.field.$valid;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "hasWarnigClass", {
                get: function () {
                    return this.ready && !this.noFeedback && this.field.$invalid && !this.field.$pristine;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "hasRequiredIcon", {
                get: function () {
                    return this.ready && !this.noFeedback && this.field.$error.required && this.required && this.field.$pristine;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "hasFeedbackIcon", {
                get: function () {
                    return this.ready && !this.noFeedback && (this.hasErrorClass || this.hasSuccessClass || this.hasRequiredIcon || this.hasWarnigClass);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "json", {
                get: function () {
                    return {
                        label: this.label,
                        hasLabel: this.hasLabel,
                        model: this.model,
                        required: this.required,
                        readonly: this.readonly,
                        requiredText: this.requiredText,
                        pattern: this.getPattern(),
                        hasPattern: this.hasPattern,
                        patternText: this.patternText,
                        hasMaxLength: this.hasMaxLength,
                        maxLength: this.maxLength,
                        hasMinLength: this.hasMinLength,
                        minLength: this.minLength,
                        hasHelpText: this.hasHelpText,
                        helpText: this.helpText,
                        min: this.min,
                        form: this.$form,
                        max: this.max,
                        type: this.type,
                        options: this.options,
                        optionsGroup: this.optionsGroup,
                        optionsValue: this.optionsValue,
                        optionsLabel: this.optionsLabel,
                        optionsExpression: this.optionsExpression
                    };
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "label", {
                get: function () {
                    return this.$scope["label"] || null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "hasLabel", {
                get: function () {
                    return this.label != null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "model", {
                get: function () {
                    return this.$scope[InputCtrl.directiveName];
                },
                set: function (x) {
                    this.$scope[InputCtrl.directiveName] = x;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "filename", {
                get: function () {
                    return this.$scope["filename"];
                },
                set: function (x) {
                    this.$scope["filename"] = x;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "required", {
                get: function () {
                    return true && this.$scope.hasOwnProperty("required") && this.$scope["required"];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "readonly", {
                get: function () {
                    return true && this.$scope.hasOwnProperty("readonly") && this.$scope["readonly"];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "type", {
                get: function () {
                    return this.$scope["type"] || "text";
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "hasPattern", {
                get: function () {
                    return this.pattern != null;
                },
                enumerable: true,
                configurable: true
            });
            InputCtrl.prototype.getPattern = function () {
                return this.hasPattern ? this.pattern : this.defaultPattern;
            };
            Object.defineProperty(InputCtrl.prototype, "pattern", {
                get: function () {
                    return this.$scope["pattern"] || null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "requiredText", {
                get: function () {
                    return this.$scope["requiredText"] || "Campo Richiesto";
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "patternText", {
                get: function () {
                    return this.$scope["patternText"] || "Formato non valido";
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "helpText", {
                get: function () {
                    return this.$scope["helpText"] || null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "hasHelpText", {
                get: function () {
                    return this.helpText != null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "hasMaxLength", {
                get: function () {
                    return this.maxLength != null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "maxLength", {
                get: function () {
                    return this.$scope["maxLength"] || null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "hasMinLength", {
                get: function () {
                    return this.minLength != null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "minLength", {
                get: function () {
                    return this.$scope["minLength"] || null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "placeholder", {
                get: function () {
                    return this.$scope["placeholder"] || null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "multiline", {
                get: function () {
                    return this.type && this.type === "textarea";
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "debug", {
                get: function () {
                    return this.$scope.hasOwnProperty("debug");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "min", {
                get: function () {
                    return this.$scope["min"] || null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "max", {
                get: function () {
                    return this.$scope["max"] || null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "IsSelect", {
                get: function () {
                    return this.type === "select";
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "IsInputNumber", {
                get: function () {
                    return this.type === "number";
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "IsInputDate", {
                get: function () {
                    return this.type === "date";
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "IsInputFile", {
                get: function () {
                    return this.type === "file";
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "IsInputCheckbox", {
                get: function () {
                    return this.type === "checkbox";
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "minMaxEnabled", {
                get: function () {
                    return this.IsInputDate || this.IsInputNumber;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "addonLeft", {
                get: function () {
                    return this.$scope["addonLeft"] || null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "addonRight", {
                get: function () {
                    return this.$scope["addonRight"] || null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "hasAddonLeft", {
                get: function () {
                    return this.addonLeft != null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "hasAddonRight", {
                get: function () {
                    return this.addonRight != null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "hasAnyAddon", {
                get: function () {
                    return [this.hasAddonLeft, this.hasAddonRight].some(function (x) { return x; });
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "options", {
                get: function () {
                    return this.$scope["options"] || [];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "optionsLabel", {
                get: function () {
                    return this.$scope["optionsLabel"] || "Name";
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "optionsValue", {
                get: function () {
                    return this.$scope["optionsValue"] || "Value";
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "optionsGroup", {
                get: function () {
                    return this.$scope["optionsGroup"] || null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "optionsExpression", {
                get: function () {
                    return "item[" + this.directiveInfo.controllerAs + ".optionsValue] as item[" + this.directiveInfo.controllerAs + ".optionsLabel] " + (this.optionsGroup != null ? "group by item[" + this.directiveInfo.controllerAs + ".optionsGroup] " : "") + "for item in " + this.directiveInfo.controllerAs + ".options";
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputCtrl.prototype, "autocomplete", {
                get: function () {
                    return this.$scope["autocomplete"] ? this.$scope["autocomplete"] : false;
                },
                enumerable: true,
                configurable: true
            });
            InputCtrl.directive = function () {
                return {
                    controller: InputCtrl,
                    controllerAs: "Ctrl",
                    replace: true,
                    template: InputCtrl.template,
                    scope: {
                        auInput: "=",
                        required: "=?",
                        readonly: "=?",
                        label: "=?",
                        type: "=?",
                        requiredText: "=?",
                        patternText: "=?",
                        pattern: "=?",
                        helpText: "=?",
                        maxLength: "=?",
                        minLength: "=?",
                        placeholder: "=?",
                        min: "=?",
                        max: "=?",
                        filename: "=?",
                        addonLeft: "=?",
                        addonRight: "=?",
                        debug: "=?",
                        options: "=?",
                        optionsLabel: "=?",
                        optionsValue: "=?",
                        optionsGroup: "=?",
                        autocomplete: "=?"
                    }
                };
            };
            InputCtrl.directiveName = "auInput";
            InputCtrl.fieldName = "field";
            InputCtrl.formName = "fit";
            InputCtrl.template = "\n\n<div class=\"input-text\" ng-form=\"" + InputCtrl.formName + "\" ng-class=\"{'well well-sm':Ctrl.debug}\">\n    <div class=\"form-group\" ng-class=\"{'has-error':Ctrl.hasErrorClass,'has-success':Ctrl.hasSuccessClass,'has-feedback':Ctrl.hasFeedbackIcon,'has-warning':Ctrl.hasWarnigClass}\">\n        \n        <div ng-if=\"Ctrl.IsInputCheckbox\" class=\"checkbox\">\n            <label>\n                <input type=\"checkbox\" name=\"" + InputCtrl.formName + "\" ng-model=\"Ctrl.model\" ng-required=\"Ctrl.required\" /> {{Ctrl.label}} \n                <span ng-if=\"Ctrl.hasFeedbackIcon\">\n                    <i class=\"glyphicon\" ng-class=\"{'glyphicon-ok':Ctrl.hasSuccessClass,'glyphicon-asterisk':Ctrl.hasRequiredIcon,'glyphicon-warning-sign':Ctrl.hasWarnigClass}\"></i>\n                </span>\n            </label>\n\n        </div>\n        <div ng-if=\"!Ctrl.IsInputCheckbox\">      \n\n       \n            <label class=\"control-label\" ng-if=\"Ctrl.hasLabel\">{{Ctrl.label}}</label>\n         \n            <div ng-class=\"{'input-group':Ctrl.hasAnyAddon}\">\n                <span class=\"input-group-addon\" ng-if=\"Ctrl.hasAddonLeft\">{{Ctrl.addonLeft}}</span>\n                <input ng-readonly=\"Ctrl.readonly\" ng-if=\"!Ctrl.multiline && !Ctrl.IsInputFile && !Ctrl.IsSelect\"  ng-attr-type=\"{{Ctrl.type}}\" ng-model=\"Ctrl.model\" class=\"form-control\" name=\"" + InputCtrl.fieldName + "\" ng-attr-maxlength=\"{{Ctrl.hasMaxLength?Ctrl.maxLength:undefined}}\" ng-attr-minlength=\"{{Ctrl.hasMinLength?Ctrl.minLength:undefined}}\" ng-pattern=\"Ctrl.getPattern()\" ng-required=\"Ctrl.required\" ng-attr-placeholder=\"{{Ctrl.placeholder?Ctrl.placeholder:undefined}}\" ng-attr-min=\"{{Ctrl.minMaxEnabled && Ctrl.min ?Ctrl.min:undefined}}\"  ng-attr-max=\"{{Ctrl.minMaxEnabled && Ctrl.max ? Ctrl.max:undefined}}\" />\n                <input type=\"file\" class=\"form-control\" name=\"" + InputCtrl.fieldName + "\" ng-model=\"Ctrl.model\" ng-if=\"Ctrl.IsInputFile\" fileread=\"Ctrl.model\" filename=\"Ctrl.filename\"  ng-required=\"Ctrl.required\" />\n                <textarea ng-if=\"Ctrl.multiline\" ng-model=\"Ctrl.model\" class=\"form-control\" name=\"" + InputCtrl.fieldName + "\" ng-attr-maxlength=\"{{Ctrl.hasMaxLength?Ctrl.maxLength:undefined}}\" ng-attr-minlength=\"{{Ctrl.hasMinLength?Ctrl.minLength:undefined}}\" ng-pattern=\"Ctrl.getPattern()\" ng-required=\"Ctrl.required\" ng-readonly=\"Ctrl.readonly\" ng-attr-placeholder=\"{{Ctrl.placeholder?Ctrl.placeholder:undefined}}\" ></textarea>\n                <select name=\"" + InputCtrl.fieldName + "\" ng-readonly=\"Ctrl.readonly\" class=\"form-control\" ng-if=\"Ctrl.IsSelect\" ng-options=\"{{Ctrl.optionsExpression}}\" ng-model=\"Ctrl.model\"  ng-required=\"Ctrl.required\">\n                </select>\n                <span class=\"input-group-addon\" ng-if=\"Ctrl.hasAddonRight\">{{Ctrl.addonRight}}</span>\n            </div>\n\n            <span title=\"Campo Richiesto\" class=\"glyphicon glyphicon-asterisk form-control-feedback\" ng-if=\"Ctrl.hasRequiredIcon\" aria-hidden=\"true\"></span>\n            <span class=\"glyphicon glyphicon-ok form-control-feedback\" ng-if=\"Ctrl.hasSuccessClass\" aria-hidden=\"true\"></span>\n\n\n             <span class=\"glyphicon glyphicon-warning-sign form-control-feedback\" ng-if=\"Ctrl.hasWarnigClass\" aria-hidden=\"true\"></span>\n        </div>\n\n        <ul class=\"help-block list-unstyled\" ng-show=\"" + InputCtrl.formName + "." + InputCtrl.fieldName + ".$dirty && " + InputCtrl.formName + "." + InputCtrl.fieldName + ".$invalid\">\n            <li ng-if=\"" + InputCtrl.formName + "." + InputCtrl.fieldName + ".$error.required\">{{Ctrl.requiredText}}</li>\n            <li ng-if=\"" + InputCtrl.formName + "." + InputCtrl.fieldName + ".$error.pattern\">{{Ctrl.patternText}}</li>\n            <li ng-if=\"" + InputCtrl.formName + "." + InputCtrl.fieldName + ".$error.min\">Valore minimo: {{Ctrl.min}}</li>\n            <li ng-if=\"" + InputCtrl.formName + "." + InputCtrl.fieldName + ".$error.max\">Valore massimo: {{Ctrl.max}}</li>\n            <li ng-if=\"" + InputCtrl.formName + "." + InputCtrl.fieldName + ".$error.minlength\">Lunghezza minima: {{Ctrl.minLength}} caratteri</li>\n            <li ng-if=\"" + InputCtrl.formName + "." + InputCtrl.fieldName + ".$error.maxlength\">Lunghezza massima: {{Ctrl.maxLength}} caratteri</li>\n        </ul>\n        <p class=\"help-block\" ng-if=\"Ctrl.hasHelpText\">{{Ctrl.helpText}}</p>\n\n    </div>\n   \n    <pre ng-if=\"Ctrl.debug\" class=\"pre-scrollable\">{{Ctrl.json|json}}</pre>\n</div>\n\n\n\n";
            InputCtrl.$inject = ["$scope"];
            return InputCtrl;
        })();
        Input.InputCtrl = InputCtrl;
    })(Input = Au.Input || (Au.Input = {}));
})(Au || (Au = {}));
(function () {
    angular.module(Au.moduleName, [])
        .factory(Au.Http.HttpEvents.InterceptorName, ["$injector", function ($injector) {
            return new Au.Http.HttpEvents($injector);
        }])
        .config(["$injector", function ($injector) {
            new Au.Http.HttpEventsConfig($injector);
        }])
        .directive(Au.Http.ToggleOnHttpActivity.DirectiveName, Au.Http.ToggleOnHttpActivity.Directive)
        .directive(Au.Input.InputCtrl.directiveName, Au.Input.InputCtrl.directive)
        .service(Au.Button.ActionButtonConfig.serviceName, Au.Button.ActionButtonConfig)
        .directive(Au.Button.ActionButtonCtrl.directiveName, Au.Button.ActionButtonCtrl.directive)
        .directive("fileread", ["$timeout", function ($timeout) {
            //http://stackoverflow.com/questions/17063000/ng-model-for-input-type-file
            return {
                restrict: "A",
                require: "ngModel",
                scope: {
                    fileread: "=",
                    filename: "=?"
                },
                link: function (scope, element, attributes, ngModel) {
                    var oldPristine = ngModel.$setPristine;
                    ngModel.$setPristine = function () {
                        element.val("");
                        oldPristine();
                    };
                    element.on("change", function (changeEvent) {
                        ngModel.$setDirty();
                        if (!element.val()) {
                            $timeout(function () {
                                if (element.prop("required"))
                                    ngModel.$setValidity("required", false);
                                ngModel.$valid = !element.prop("required");
                                scope.fileread = null;
                                scope.filename = null;
                            });
                            return;
                        }
                        var reader = new FileReader();
                        reader.onload = function (loadEvent) {
                            $timeout(function () {
                                if (element.prop("required"))
                                    ngModel.$setValidity("required", true);
                                ngModel.$valid = true;
                                scope.filename = element.val();
                                scope.fileread = loadEvent.target.result;
                            });
                        };
                        if (attributes["readAsString"])
                            reader.readAsText(changeEvent.target.files[0]);
                        else
                            reader.readAsDataURL(changeEvent.target.files[0]);
                    });
                }
            };
        }]);
})();
//# sourceMappingURL=AngularUtils.js.map