var angularUtils;
(function (angularUtils) {
    var directive;
    (function (directive) {
        var input;
        (function (input) {
            var inputTextDirectiveCtrl = (function () {
                function inputTextDirectiveCtrl() {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i - 0] = arguments[_i];
                    }
                    this.args = [];
                    this.args = args;
                    //console.log(inputTextDirectiveCtrl.template);
                }
                Object.defineProperty(inputTextDirectiveCtrl.prototype, "$scope", {
                    get: function () {
                        return this.args[0];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(inputTextDirectiveCtrl.prototype, "$form", {
                    get: function () {
                        return this.$scope[inputTextDirectiveCtrl.formName] || null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(inputTextDirectiveCtrl.prototype, "field", {
                    get: function () {
                        return this.$form[inputTextDirectiveCtrl.fieldName] || null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(inputTextDirectiveCtrl.prototype, "ready", {
                    get: function () {
                        return true && this.$form != null && this.field != null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(inputTextDirectiveCtrl.prototype, "noFeedback", {
                    get: function () {
                        return this.ready && this.field.$valid && this.field.$pristine;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(inputTextDirectiveCtrl.prototype, "hasErrorClass", {
                    get: function () {
                        return this.ready && !this.noFeedback && this.field.$invalid && this.field.$dirty;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(inputTextDirectiveCtrl.prototype, "hasSuccessClass", {
                    get: function () {
                        return this.ready && !this.noFeedback && this.field.$valid;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(inputTextDirectiveCtrl.prototype, "hasWarnigClass", {
                    get: function () {
                        return this.ready && !this.noFeedback && this.field.$invalid && !this.field.$pristine;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(inputTextDirectiveCtrl.prototype, "hasRequiredIcon", {
                    get: function () {
                        return this.ready && !this.noFeedback && this.field.$error.required && this.required && this.field.$pristine;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(inputTextDirectiveCtrl.prototype, "hasFeedbackIcon", {
                    get: function () {
                        return this.ready && !this.noFeedback && (this.hasErrorClass || this.hasSuccessClass || this.hasRequiredIcon || this.hasWarnigClass);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(inputTextDirectiveCtrl.prototype, "json", {
                    get: function () {
                        return {
                            label: this.label,
                            hasLabel: this.hasLabel,
                            model: this.model,
                            required: this.required,
                            requiredText: this.requiredText,
                            pattern: this.pattern,
                            hasPattern: this.hasPattern,
                            patternText: this.patternText,
                            hasMaxLength: this.hasMaxLength,
                            maxLength: this.maxLength,
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
                Object.defineProperty(inputTextDirectiveCtrl.prototype, "label", {
                    get: function () {
                        return this.$scope["label"] || null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(inputTextDirectiveCtrl.prototype, "hasLabel", {
                    get: function () {
                        return this.label != null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(inputTextDirectiveCtrl.prototype, "model", {
                    get: function () {
                        return this.$scope["auInput"];
                    },
                    set: function (x) {
                        this.$scope["auInput"] = x;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(inputTextDirectiveCtrl.prototype, "filename", {
                    get: function () {
                        return this.$scope["filename"];
                    },
                    set: function (x) {
                        this.$scope["filename"] = x;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(inputTextDirectiveCtrl.prototype, "required", {
                    get: function () {
                        return true && this.$scope.hasOwnProperty("required");
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(inputTextDirectiveCtrl.prototype, "type", {
                    get: function () {
                        return this.$scope["type"] || "text";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(inputTextDirectiveCtrl.prototype, "hasPattern", {
                    get: function () {
                        return this.pattern != null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(inputTextDirectiveCtrl.prototype, "pattern", {
                    get: function () {
                        return this.$scope["pattern"] || null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(inputTextDirectiveCtrl.prototype, "requiredText", {
                    get: function () {
                        return this.$scope["requiredText"] || "Campo Richiesto";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(inputTextDirectiveCtrl.prototype, "patternText", {
                    get: function () {
                        return this.$scope["patternText"] || "Formato non valido";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(inputTextDirectiveCtrl.prototype, "helpText", {
                    get: function () {
                        return this.$scope["helpText"] || null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(inputTextDirectiveCtrl.prototype, "hasHelpText", {
                    get: function () {
                        return this.helpText != null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(inputTextDirectiveCtrl.prototype, "hasMaxLength", {
                    get: function () {
                        return this.maxLength != null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(inputTextDirectiveCtrl.prototype, "maxLength", {
                    get: function () {
                        return this.$scope["maxLength"] || null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(inputTextDirectiveCtrl.prototype, "placeholder", {
                    get: function () {
                        return this.$scope["placeholder"] || null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(inputTextDirectiveCtrl.prototype, "multiline", {
                    get: function () {
                        return this.type && this.type == "textarea";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(inputTextDirectiveCtrl.prototype, "debug", {
                    get: function () {
                        return this.$scope.hasOwnProperty("debug");
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(inputTextDirectiveCtrl.prototype, "min", {
                    get: function () {
                        return this.$scope["min"] || null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(inputTextDirectiveCtrl.prototype, "max", {
                    get: function () {
                        return this.$scope["max"] || null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(inputTextDirectiveCtrl.prototype, "IsSelect", {
                    get: function () {
                        return this.type === "select";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(inputTextDirectiveCtrl.prototype, "IsInputNumber", {
                    get: function () {
                        return this.type === "number";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(inputTextDirectiveCtrl.prototype, "IsInputDate", {
                    get: function () {
                        return this.type === "date";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(inputTextDirectiveCtrl.prototype, "IsInputFile", {
                    get: function () {
                        return this.type === "file";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(inputTextDirectiveCtrl.prototype, "IsInputCheckbox", {
                    get: function () {
                        return this.type === "checkbox";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(inputTextDirectiveCtrl.prototype, "minMaxEnabled", {
                    get: function () {
                        return this.IsInputDate || this.IsInputNumber;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(inputTextDirectiveCtrl.prototype, "addonLeft", {
                    get: function () {
                        return this.$scope["addonLeft"] || null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(inputTextDirectiveCtrl.prototype, "addonRight", {
                    get: function () {
                        return this.$scope["addonRight"] || null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(inputTextDirectiveCtrl.prototype, "hasAddonLeft", {
                    get: function () {
                        return this.addonLeft != null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(inputTextDirectiveCtrl.prototype, "hasAddonRight", {
                    get: function () {
                        return this.addonRight != null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(inputTextDirectiveCtrl.prototype, "hasAnyAddon", {
                    get: function () {
                        return [this.hasAddonLeft, this.hasAddonRight].some(function (x) { return x; });
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(inputTextDirectiveCtrl.prototype, "options", {
                    get: function () {
                        return this.$scope["options"] || [];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(inputTextDirectiveCtrl.prototype, "optionsLabel", {
                    get: function () {
                        return this.$scope["optionsLabel"] || "Name";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(inputTextDirectiveCtrl.prototype, "optionsValue", {
                    get: function () {
                        return this.$scope["optionsValue"] || "Value";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(inputTextDirectiveCtrl.prototype, "optionsGroup", {
                    get: function () {
                        return this.$scope["optionsGroup"] || null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(inputTextDirectiveCtrl.prototype, "optionsExpression", {
                    get: function () {
                        return "item[Ctrl.optionsValue] as item[Ctrl.optionsLabel] " + (this.optionsGroup != null ? "group by item[Ctrl.optionsGroup] " : "") + "for item in Ctrl.options";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(inputTextDirectiveCtrl.prototype, "autocomplete", {
                    get: function () {
                        return this.$scope["autocomplete"] ? this.$scope["autocomplete"] : false;
                    },
                    enumerable: true,
                    configurable: true
                });
                inputTextDirectiveCtrl.Directive = function () {
                    return {
                        controller: inputTextDirectiveCtrl,
                        controllerAs: "Ctrl",
                        replace: true,
                        template: inputTextDirectiveCtrl.template,
                        scope: {
                            auInput: "=",
                            required: "=?",
                            label: "=?",
                            type: "=?",
                            requiredText: "=?",
                            patternText: "=?",
                            pattern: "=?",
                            helpText: "=?",
                            maxLength: "=?",
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
                inputTextDirectiveCtrl.fieldName = "field";
                inputTextDirectiveCtrl.formName = "fit";
                inputTextDirectiveCtrl.template = "\n\n<div class=\"input-text\" ng-form=\"" + inputTextDirectiveCtrl.formName + "\" ng-class=\"{'well well-sm':Ctrl.debug}\">\n    <div class=\"form-group\" ng-class=\"{'has-error':Ctrl.hasErrorClass,'has-success':Ctrl.hasSuccessClass,'has-feedback':Ctrl.hasFeedbackIcon,'has-warning':Ctrl.hasWarnigClass}\">\n        \n        <div ng-if=\"Ctrl.IsInputCheckbox\" class=\"checkbox\">\n            <label>\n                <input type=\"checkbox\" name=\"" + inputTextDirectiveCtrl.formName + "\" ng-model=\"Ctrl.model\" ng-required=\"Ctrl.required\" /> {{Ctrl.label}} \n                <span ng-if=\"Ctrl.hasFeedbackIcon\">\n                    <i class=\"glyphicon\" ng-class=\"{'glyphicon-ok':Ctrl.hasSuccessClass,'glyphicon-asterisk':Ctrl.hasRequiredIcon,'glyphicon-warning-sign':Ctrl.hasWarnigClass}\"></i>\n                </span>\n            </label>\n\n        </div>\n        <div ng-if=\"!Ctrl.IsInputCheckbox\">      \n\n       \n            <label class=\"control-label\" ng-if=\"Ctrl.hasLabel\">{{Ctrl.label}}</label>\n         \n            <div ng-class=\"{'input-group':Ctrl.hasAnyAddon}\">\n                <span class=\"input-group-addon\" ng-if=\"Ctrl.hasAddonLeft\">{{Ctrl.addonLeft}}</span>\n                <input ng-if=\"!Ctrl.multiline && !Ctrl.IsInputFile && !Ctrl.IsSelect\"  ng-attr-type=\"{{Ctrl.type}}\" ng-model=\"Ctrl.model\" class=\"form-control\" name=\"" + inputTextDirectiveCtrl.fieldName + "\" ng-attr-maxlength=\"{{Ctrl.hasMaxLength?Ctrl.maxLength:undefined}}\" ng-attr-pattern=\"{{Ctrl.hasPattern?Ctrl.pattern:undefined}}\" ng-required=\"Ctrl.required\" ng-attr-placeholder=\"{{Ctrl.placeholder?Ctrl.placeholder:undefined}}\" ng-attr-min=\"{{Ctrl.minMaxEnabled && Ctrl.min ?Ctrl.min:undefined}}\"  ng-attr-max=\"{{Ctrl.minMaxEnabled && Ctrl.max ? Ctrl.max:undefined}}\" />\n                <input type=\"file\" class=\"form-control\" name=\"" + inputTextDirectiveCtrl.fieldName + "\" ng-model=\"Ctrl.model\" ng-if=\"Ctrl.IsInputFile\" fileread=\"Ctrl.model\" filename=\"Ctrl.filename\"  ng-required=\"Ctrl.required\" />\n                <textarea ng-if=\"Ctrl.multiline\" ng-model=\"Ctrl.model\" class=\"form-control\" name=\"" + inputTextDirectiveCtrl.fieldName + "\" ng-attr-maxlength=\"{{Ctrl.hasMaxLength?Ctrl.maxLength:undefined}}\" ng-attr-pattern=\"{{Ctrl.hasPattern?Ctrl.pattern:undefined}}\" ng-required=\"Ctrl.required\" ng-attr-placeholder=\"{{Ctrl.placeholder?Ctrl.placeholder:undefined}}\" ></textarea>\n                <select name=\"" + inputTextDirectiveCtrl.fieldName + "\" class=\"form-control\" ng-if=\"Ctrl.IsSelect\" ng-options=\"{{Ctrl.optionsExpression}}\" ng-model=\"Ctrl.model\"  ng-required=\"Ctrl.required\">\n                </select>\n                <span class=\"input-group-addon\" ng-if=\"Ctrl.hasAddonRight\">{{Ctrl.addonRight}}</span>\n            </div>\n\n            <span title=\"Campo Richiesto\" class=\"glyphicon glyphicon-asterisk form-control-feedback\" ng-if=\"Ctrl.hasRequiredIcon\" aria-hidden=\"true\"></span>\n            <span class=\"glyphicon glyphicon-ok form-control-feedback\" ng-if=\"Ctrl.hasSuccessClass\" aria-hidden=\"true\"></span>\n\n\n             <span class=\"glyphicon glyphicon-warning-sign form-control-feedback\" ng-if=\"Ctrl.hasWarnigClass\" aria-hidden=\"true\"></span>\n        </div>\n\n        <p class=\"help-block\" ng-show=\"" + inputTextDirectiveCtrl.formName + "." + inputTextDirectiveCtrl.fieldName + ".$dirty && " + inputTextDirectiveCtrl.formName + "." + inputTextDirectiveCtrl.fieldName + ".$invalid\">\n            <span ng-if=\"" + inputTextDirectiveCtrl.formName + "." + inputTextDirectiveCtrl.fieldName + ".$error.required\">{{Ctrl.requiredText}}</span>\n            <span ng-if=\"" + inputTextDirectiveCtrl.formName + "." + inputTextDirectiveCtrl.fieldName + ".$error.pattern\">{{Ctrl.patternText}}</span>\n            <span ng-if=\"" + inputTextDirectiveCtrl.formName + "." + inputTextDirectiveCtrl.fieldName + ".$error.min\">Valore minimo: {{Ctrl.min}}</span>\n            <span ng-if=\"" + inputTextDirectiveCtrl.formName + "." + inputTextDirectiveCtrl.fieldName + ".$error.max\">Valore massimo: {{Ctrl.max}}</span>\n        </p>\n        <p class=\"help-block\" ng-if=\"Ctrl.hasHelpText\">{{Ctrl.helpText}}</p>\n\n    </div>\n   \n    <pre ng-if=\"Ctrl.debug\" class=\"pre-scrollable\">{{Ctrl.json|json}}</pre>\n</div>\n\n\n\n";
                inputTextDirectiveCtrl.$inject = ["$scope"];
                return inputTextDirectiveCtrl;
            })();
            input.inputTextDirectiveCtrl = inputTextDirectiveCtrl;
            var ActionButtonConfig = (function () {
                function ActionButtonConfig() {
                    this.getErrors = function ($q, resp) {
                        $q.resolve(["An error occurred"]);
                    };
                }
                return ActionButtonConfig;
            })();
            input.ActionButtonConfig = ActionButtonConfig;
            var actionButton = (function () {
                function actionButton() {
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
                Object.defineProperty(actionButton.prototype, "$actionButtonConfig", {
                    get: function () {
                        return this.args[3];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(actionButton.prototype, "$scope", {
                    get: function () {
                        return this.args[0];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(actionButton.prototype, "$element", {
                    get: function () {
                        return $(this.args[2]);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(actionButton.prototype, "$timeout", {
                    get: function () {
                        return this.args[1];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(actionButton.prototype, "form", {
                    get: function () {
                        return this.$scope["form"] || null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(actionButton.prototype, "hasForm", {
                    get: function () {
                        return this.form != null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(actionButton.prototype, "text", {
                    get: function () {
                        return this.$scope["text"] || null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(actionButton.prototype, "enabled", {
                    get: function () {
                        return !this.running && ((this.hasForm && this.form.$valid) || !this.hasForm);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(actionButton.prototype, "action", {
                    get: function () {
                        return this.$scope["action"] || (function () { return null; });
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(actionButton.prototype, "time", {
                    get: function () {
                        return this.$scope["time"] || 3000;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(actionButton.prototype, "type", {
                    get: function () {
                        return this.$scope["type"] || "btn-primary";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(actionButton.prototype, "confirm", {
                    get: function () {
                        return this.$scope["confirm"] || null;
                    },
                    enumerable: true,
                    configurable: true
                });
                actionButton.prototype.Click = function () {
                    var _this = this;
                    if (this.hasForm && this.form.$invalid)
                        return;
                    this.$element.popover("destroy");
                    if (this.confirm && !confirm(this.confirm))
                        return;
                    var action = this.action;
                    this.running = true;
                    var p = action();
                    if (!p) {
                        this.running = false;
                    }
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
                            _this.$timeout(function () {
                                _this.error = false;
                            }, _this.time);
                            if (!(r.data.Messages && r.data.Messages instanceof Array))
                                return;
                            _this.$element.popover({
                                content: function () {
                                    var ul = $("<ul/>");
                                    r.data.Messages.forEach(function (message) {
                                        $("<li/>").text(message).appendTo(ul);
                                    });
                                    var d = $("<div/>");
                                    d.addClass("text-danger").append(ul);
                                    return d;
                                },
                                html: true,
                                placement: "top",
                                title: "Si sono verificati alcuni errori"
                            }).popover('show');
                        });
                    }
                    else
                        this.running = true;
                };
                actionButton.Directive = function () {
                    return {
                        controller: actionButton,
                        controllerAs: "Ctrl",
                        replace: true,
                        template: actionButton.template,
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
                actionButton.$inject = ["$scope", "$timeout", "$element", "actionButtonConfig"];
                actionButton.template = "\n            \n            <button ng-disabled=\"!Ctrl.enabled\" ng-click=\"Ctrl.Click()\" class=\"btn {{Ctrl.type}}\">\n                    <i class=\"fa fa-spin fa-spinner\" ng-show=\"Ctrl.running\"></i>\n                    <i class=\"fa fa-check\" ng-show=\"Ctrl.done\"></i>\n                    <i class=\"fa fa-times\" ng-show=\"Ctrl.error\"></i>\n                 {{Ctrl.text}}\n            </button>\n\n\n";
                return actionButton;
            })();
            input.actionButton = actionButton;
        })(input = directive.input || (directive.input = {}));
    })(directive = angularUtils.directive || (angularUtils.directive = {}));
})(angularUtils || (angularUtils = {}));
(function () {
    angular.module("angularUtils", [])
        .directive("auInput", angularUtils.directive.input.inputTextDirectiveCtrl.Directive)
        .service("actionButtonConfig", angularUtils.directive.input.ActionButtonConfig)
        .directive("auButton", angularUtils.directive.input.actionButton.Directive)
        .directive("fileread", ["$timeout", function ($timeout) {
            //http://stackoverflow.com/questions/17063000/ng-model-for-input-type-file
            return {
                restrict: "A",
                require: 'ngModel',
                scope: {
                    fileread: "=",
                    filename: "=?"
                },
                link: function (scope, element, attributes, ngModel) {
                    //console.log(ngModel);
                    var oldPristine = ngModel.$setPristine;
                    ngModel.$setPristine = function () {
                        element.val("");
                        oldPristine();
                    };
                    element.on("change", function (changeEvent) {
                        var inputName = element.attr("name");
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