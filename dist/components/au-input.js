var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var au;
(function (au) {
    var input;
    (function (input_1) {
        var bootstrapTemplate = (function () {
            function bootstrapTemplate() {
                this.formName = "_form";
                this.fieldName = "_input";
                this.content = "";
            }
            return bootstrapTemplate;
        })();
        input_1.bootstrapTemplate = bootstrapTemplate;
        var StandardInput = (function () {
            function StandardInput() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                this.args = [];
                this.templateCfg = new bootstrapTemplate();
                this.directiveName = "auInput";
                this.type = "text";
                this.defaultPattern = /.*/;
                this.args = args;
            }
            StandardInput.prototype.GetTemplate = function () {
                return StandardFormGroup("\n\n       \n                <input ng-readonly=\"Ctrl.readonly\" type=\"" + this.type + "\" ng-model=\"Ctrl.model\" class=\"form-control\" name=\"" + this.templateCfg.fieldName + "\" ng-attr-maxlength=\"{{Ctrl.hasMaxLength?Ctrl.maxLength:undefined}}\" ng-attr-minlength=\"{{Ctrl.hasMinLength?Ctrl.minLength:undefined}}\" ng-pattern=\"Ctrl.getPattern()\" ng-required=\"Ctrl.required\" ng-attr-placeholder=\"{{Ctrl.placeholder?Ctrl.placeholder:undefined}}\" ng-attr-min=\"{{Ctrl.min ?Ctrl.min:undefined}}\"  ng-attr-max=\"{{Ctrl.max ? Ctrl.max:undefined}}\" ng-attr-compare-to=\"Ctrl.hasCompare?Ctrl.compare:undefined\" />\n                \n       \n     \n\n\n");
            };
            Object.defineProperty(StandardInput.prototype, "$scope", {
                get: function () {
                    return this.args[0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StandardInput.prototype, "$form", {
                get: function () {
                    return this.$scope[this.templateCfg.formName] || null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StandardInput.prototype, "field", {
                get: function () {
                    return this.$form[this.templateCfg.fieldName] || null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StandardInput.prototype, "ready", {
                get: function () {
                    return true && this.$form != null && this.field != null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StandardInput.prototype, "noFeedback", {
                get: function () {
                    return this.ready && this.field.$valid && this.field.$pristine;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StandardInput.prototype, "hasErrorClass", {
                get: function () {
                    return this.ready && !this.noFeedback && this.field.$invalid && this.field.$dirty;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StandardInput.prototype, "hasSuccessClass", {
                get: function () {
                    return this.ready && !this.noFeedback && this.field.$valid;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StandardInput.prototype, "hasWarnigClass", {
                get: function () {
                    return this.ready && !this.noFeedback && this.field.$invalid && !this.field.$pristine;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StandardInput.prototype, "brand", {
                get: function () {
                    return this.$scope["brand"] || "primary";
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StandardInput.prototype, "hasRequiredIcon", {
                get: function () {
                    return this.ready &&
                        !this.noFeedback &&
                        this.field.$error.required &&
                        this.required &&
                        this.field.$pristine;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StandardInput.prototype, "hasFeedbackIcon", {
                get: function () {
                    return this.ready &&
                        !this.noFeedback &&
                        (this.hasErrorClass || this.hasSuccessClass || this.hasRequiredIcon || this.hasWarnigClass);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StandardInput.prototype, "json", {
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
                        optionsValue: this.optionsValue,
                        optionsLabel: this.optionsLabel,
                        optionsExpression: this.optionsExpression,
                        compare: this.compare,
                        hasCompare: this.hasCompare
                    };
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StandardInput.prototype, "hasCompare", {
                get: function () {
                    return this.$scope.hasOwnProperty("compare");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StandardInput.prototype, "compare", {
                get: function () {
                    return this.hasCompare ? this.$scope["compare"] : this.model;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StandardInput.prototype, "optionsExpression", {
                get: function () {
                    var d = this.directive();
                    return "item[" + d.controllerAs + ".optionsValue] as item[" + d.controllerAs + ".optionsLabel] for item in " + d.controllerAs + ".options";
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StandardInput.prototype, "options", {
                get: function () {
                    return this.$scope["options"] || [];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StandardInput.prototype, "optionsLabel", {
                get: function () {
                    return this.$scope["optionsLabel"] || "Name";
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StandardInput.prototype, "optionsValue", {
                get: function () {
                    return this.$scope["optionsValue"] || "Value";
                },
                enumerable: true,
                configurable: true
            });
            StandardInput.prototype.GetNumberValueOrNull = function (key) {
                var r = this.$scope[key];
                if (r)
                    return parseInt(r);
                return null;
            };
            Object.defineProperty(StandardInput.prototype, "min", {
                get: function () {
                    return this.GetNumberValueOrNull("min");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StandardInput.prototype, "max", {
                get: function () {
                    return this.GetNumberValueOrNull("max");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StandardInput.prototype, "label", {
                get: function () {
                    return this.$scope["label"] || null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StandardInput.prototype, "hasLabel", {
                get: function () {
                    return this.label != null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StandardInput.prototype, "model", {
                get: function () {
                    return this.$scope[this.directiveName];
                },
                set: function (x) {
                    this.$scope[this.directiveName] = x;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StandardInput.prototype, "filename", {
                get: function () {
                    return this.$scope["filename"];
                },
                set: function (x) {
                    this.$scope["filename"] = x;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StandardInput.prototype, "required", {
                get: function () {
                    return true && this.$scope.hasOwnProperty("required") && this.$scope["required"];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StandardInput.prototype, "readonly", {
                get: function () {
                    return true && this.$scope.hasOwnProperty("readonly") && this.$scope["readonly"];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StandardInput.prototype, "hasPattern", {
                get: function () {
                    return this.pattern != null;
                },
                enumerable: true,
                configurable: true
            });
            StandardInput.prototype.getPattern = function () {
                return this.hasPattern ? this.pattern : this.defaultPattern;
            };
            Object.defineProperty(StandardInput.prototype, "pattern", {
                get: function () {
                    return this.$scope["pattern"] || null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StandardInput.prototype, "requiredText", {
                get: function () {
                    return this.$scope["requiredText"] || "Campo Richiesto";
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StandardInput.prototype, "patternText", {
                get: function () {
                    return this.$scope["patternText"] || "Formato non valido";
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StandardInput.prototype, "helpText", {
                get: function () {
                    return this.$scope["helpText"] || null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StandardInput.prototype, "hasHelpText", {
                get: function () {
                    return this.helpText != null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StandardInput.prototype, "hasMaxLength", {
                get: function () {
                    return this.maxLength != null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StandardInput.prototype, "maxLength", {
                get: function () {
                    return this.$scope["maxLength"] || null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StandardInput.prototype, "hasMinLength", {
                get: function () {
                    return this.minLength != null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StandardInput.prototype, "minLength", {
                get: function () {
                    return this.$scope["minLength"] || null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StandardInput.prototype, "placeholder", {
                get: function () {
                    return this.$scope["placeholder"] || null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StandardInput.prototype, "addonLeft", {
                get: function () {
                    return this.$scope["addonLeft"] || null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StandardInput.prototype, "addonRight", {
                get: function () {
                    return this.$scope["addonRight"] || null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StandardInput.prototype, "hasAddon", {
                get: function () {
                    return [this.addonLeft, this.addonRight].some(function (x) { return x != null; });
                },
                enumerable: true,
                configurable: true
            });
            StandardInput.prototype.GetController = function () {
                return StandardInput;
            };
            StandardInput.prototype.directive = function () {
                var d = {
                    controller: this.GetController(),
                    controllerAs: "Ctrl",
                    replace: true,
                    template: GetBootstrapTemplate(angular.merge({}, this.templateCfg, { content: this.GetTemplate() })),
                    scope: {
                        brand: "@",
                        required: "=?",
                        readonly: "=?",
                        label: "@",
                        requiredText: "@",
                        patternText: "@",
                        pattern: "@",
                        helpText: "@",
                        maxLength: "=?",
                        minLength: "=?",
                        placeholder: "@",
                        min: "=?",
                        max: "=?",
                        filename: "=?",
                        addonLeft: "@",
                        addonRight: "@",
                        debug: "=?",
                        options: "=?",
                        optionsLabel: "@",
                        optionsValue: "@",
                        autocomplete: "=?",
                        compare: "=?"
                    }
                };
                d.scope[this.directiveName] = "=";
                return d;
            };
            StandardInput.$inject = ["$scope"];
            return StandardInput;
        })();
        input_1.StandardInput = StandardInput;
        var TextInput = (function (_super) {
            __extends(TextInput, _super);
            function TextInput() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                _super.apply(this, args);
                this.directiveName = "auText";
                this.type = "text";
            }
            TextInput.prototype.GetController = function () {
                return TextInput;
            };
            return TextInput;
        })(StandardInput);
        input_1.TextInput = TextInput;
        var EmailInput = (function (_super) {
            __extends(EmailInput, _super);
            function EmailInput() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                _super.apply(this, args);
                this.directiveName = "auEmail";
                this.type = "email";
            }
            EmailInput.prototype.GetController = function () {
                return EmailInput;
            };
            return EmailInput;
        })(StandardInput);
        input_1.EmailInput = EmailInput;
        var PasswordInput = (function (_super) {
            __extends(PasswordInput, _super);
            function PasswordInput() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                _super.apply(this, args);
                this.directiveName = "auPassword";
                this.type = "password";
            }
            PasswordInput.prototype.GetController = function () {
                return PasswordInput;
            };
            return PasswordInput;
        })(StandardInput);
        input_1.PasswordInput = PasswordInput;
        var DateInput = (function (_super) {
            __extends(DateInput, _super);
            function DateInput() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                _super.apply(this, args);
                this.directiveName = "auDate";
                this.type = "date";
            }
            DateInput.prototype.GetController = function () {
                return DateInput;
            };
            return DateInput;
        })(StandardInput);
        input_1.DateInput = DateInput;
        var NumberInput = (function (_super) {
            __extends(NumberInput, _super);
            function NumberInput() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                _super.apply(this, args);
                this.directiveName = "auNumber";
                this.type = "number";
            }
            NumberInput.prototype.GetController = function () {
                return NumberInput;
            };
            return NumberInput;
        })(StandardInput);
        input_1.NumberInput = NumberInput;
        var CheckboxInput = (function (_super) {
            __extends(CheckboxInput, _super);
            function CheckboxInput() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                _super.apply(this, args);
                this.directiveName = "auCheckbox";
            }
            CheckboxInput.prototype.GetController = function () {
                return CheckboxInput;
            };
            CheckboxInput.prototype.GetTemplate = function () {
                return "\n\n            <label>\n                <input type=\"checkbox\" name=\"" + this.templateCfg.formName + "\" ng-model=\"Ctrl.model\" ng-required=\"Ctrl.required\" /> {{Ctrl.label}} \n                <span ng-if=\"Ctrl.hasFeedbackIcon\">\n                    <i class=\"glyphicon\" ng-class=\"{'glyphicon-ok':Ctrl.hasSuccessClass,'glyphicon-asterisk':Ctrl.hasRequiredIcon,'glyphicon-warning-sign':Ctrl.hasWarnigClass}\"></i>\n                </span>\n            </label>\n\n\n            ";
            };
            return CheckboxInput;
        })(StandardInput);
        input_1.CheckboxInput = CheckboxInput;
        var AwesomeCheckboxInput = (function (_super) {
            __extends(AwesomeCheckboxInput, _super);
            function AwesomeCheckboxInput() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                _super.apply(this, args);
                this.rndId = new Date().getUTCMilliseconds().toString();
                this.directiveName = "auAwesomeCheckbox";
            }
            AwesomeCheckboxInput.prototype.GetController = function () {
                return AwesomeCheckboxInput;
            };
            AwesomeCheckboxInput.prototype.GetTemplate = function () {
                return "\n                <div class=\"checkbox checkbox-{{Ctrl.brand}}\">\n                     <input type=\"checkbox\" name=\"" + this.templateCfg.formName + "\" ng-model=\"Ctrl.model\" ng-required=\"Ctrl.required\" id=\"{{Ctrl.rndId}}\"  /> \n                 <label for=\"{{Ctrl.rndId}}\">\n                       {{Ctrl.label}}   \n                                <span ng-if=\"Ctrl.hasFeedbackIcon\">\n                            <i class=\"glyphicon\" ng-class=\"{'glyphicon-ok':Ctrl.hasSuccessClass,'glyphicon-asterisk':Ctrl.hasRequiredIcon,'glyphicon-warning-sign':Ctrl.hasWarnigClass}\"></i>\n                                     </span>\n                    </label>\n\n                </div>\n        \n\n            ";
            };
            return AwesomeCheckboxInput;
        })(StandardInput);
        input_1.AwesomeCheckboxInput = AwesomeCheckboxInput;
        var FileInput = (function (_super) {
            __extends(FileInput, _super);
            function FileInput() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                _super.apply(this, args);
                this.directiveName = "auFile";
            }
            FileInput.prototype.GetTemplate = function () {
                return StandardFormGroup("\n  <input type=\"file\" class=\"form-control\" name=\"" + this.templateCfg.fieldName + "\" ng-model=\"Ctrl.model\"  fileread=\"Ctrl.model\" filename=\"Ctrl.filename\"  ng-required=\"Ctrl.required\" />\n\n");
            };
            FileInput.prototype.GetController = function () {
                return FileInput;
            };
            return FileInput;
        })(StandardInput);
        input_1.FileInput = FileInput;
        var SelectInput = (function (_super) {
            __extends(SelectInput, _super);
            function SelectInput() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                _super.apply(this, args);
                this.directiveName = "auSelect";
            }
            SelectInput.prototype.GetTemplate = function () {
                return StandardFormGroup("\n                <select name=\"" + this.templateCfg.fieldName + "\" ng-readonly=\"Ctrl.readonly\" class=\"form-control\" ng-options=\"{{Ctrl.optionsExpression}}\" ng-model=\"Ctrl.model\"  ng-required=\"Ctrl.required\">\n                </select>\n");
            };
            SelectInput.prototype.GetController = function () {
                return SelectInput;
            };
            return SelectInput;
        })(StandardInput);
        input_1.SelectInput = SelectInput;
        var TextAreaInput = (function (_super) {
            __extends(TextAreaInput, _super);
            function TextAreaInput() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                _super.apply(this, args);
                this.directiveName = "auTextarea";
            }
            TextAreaInput.prototype.GetController = function () {
                return TextAreaInput;
            };
            TextAreaInput.prototype.GetTemplate = function () {
                return StandardFormGroup("\n                <textarea  ng-model=\"Ctrl.model\" class=\"form-control\" name=\"" + this.templateCfg.fieldName + "\" ng-attr-maxlength=\"{{Ctrl.hasMaxLength?Ctrl.maxLength:undefined}}\" ng-attr-minlength=\"{{Ctrl.hasMinLength?Ctrl.minLength:undefined}}\" ng-pattern=\"Ctrl.getPattern()\" ng-required=\"Ctrl.required\" ng-readonly=\"Ctrl.readonly\" ng-attr-placeholder=\"{{Ctrl.placeholder?Ctrl.placeholder:undefined}}\" ></textarea>\n");
            };
            return TextAreaInput;
        })(StandardInput);
        input_1.TextAreaInput = TextAreaInput;
        function StandardFormGroup(input) {
            return "\n            <label class=\"control-label\" ng-if=\"Ctrl.hasLabel\">{{Ctrl.label}}</label>\n         \n            <div ng-class=\"{'input-group':Ctrl.hasAddon}\">\n                <span class=\"input-group-addon\" ng-if=\"Ctrl.addonLeft\">{{Ctrl.addonLeft}}</span>\n                " + input + "                \n                <span class=\"input-group-addon\" ng-if=\"Ctrl.addonRight\">\n{{Ctrl.addonRight}}\n</span>\n                <span class=\"input-group-addon\" ng-if=\"Ctrl.addonRight && (Ctrl.hasSuccessClass||Ctrl.hasWarnigClass)\">\n                    <i class=\"glyphicon\" ng-class=\"{'glyphicon-ok':Ctrl.hasSuccessClass,'glyphicon-warning-sign':Ctrl.hasWarnigClass}\" ></i>\n                </span>\n            </div>\n\n            <span title=\"Campo Richiesto\" class=\"glyphicon glyphicon-asterisk form-control-feedback\" ng-if=\"Ctrl.hasRequiredIcon\" aria-hidden=\"true\"></span>\n                <span ng-if=\"!Ctrl.addonRight && (Ctrl.hasSuccessClass||Ctrl.hasWarnigClass)\">\n                <span class=\"glyphicon form-control-feedback\" ng-if=\"\" ng-class=\"{'glyphicon-ok':Ctrl.hasSuccessClass,'glyphicon-warning-sign':Ctrl.hasWarnigClass}\"></span>\n             \n                </span>\n           ";
        }
        function GetBootstrapTemplate(cfg) {
            return "\n    <div class=\"au-input\" ng-form=\"" + cfg.formName + "\" ng-class=\"{'well well-sm':Ctrl.debug}\">\n        <div class=\"form-group\" ng-class=\"{'has-error':Ctrl.hasErrorClass,'has-success':Ctrl.hasSuccessClass,'has-feedback':Ctrl.hasFeedbackIcon,'has-warning':Ctrl.hasWarnigClass}\">\n        \n            " + cfg.content + "\n\n\n\n            <ul class=\"help-block list-unstyled\" ng-show=\"" + cfg.formName + "." + cfg.fieldName + ".$dirty && " + cfg.formName + "." + cfg.fieldName + ".$invalid\">\n                <li ng-if=\"" + cfg.formName + "." + cfg.fieldName + ".$error.required\">{{Ctrl.requiredText}}</li>\n                <li ng-if=\"" + cfg.formName + "." + cfg.fieldName + ".$error.pattern\">{{Ctrl.patternText}}</li>\n                <li ng-if=\"" + cfg.formName + "." + cfg.fieldName + ".$error.min\">Valore minimo: {{Ctrl.min}}</li>\n                <li ng-if=\"" + cfg.formName + "." + cfg.fieldName + ".$error.max\">Valore massimo: {{Ctrl.max}}</li>\n                <li ng-if=\"" + cfg.formName + "." + cfg.fieldName + ".$error.minlength\">Lunghezza minima: {{Ctrl.minLength}} caratteri</li>\n                <li ng-if=\"" + cfg.formName + "." + cfg.fieldName + ".$error.maxlength\">Lunghezza massima: {{Ctrl.maxLength}} caratteri</li>\n                <li ng-if=\"" + cfg.formName + "." + cfg.fieldName + ".$error.compareTo\">Le password non coincidono</li>\n            </ul>\n            <p class=\"help-block\" ng-if=\"Ctrl.hasHelpText\">{{Ctrl.helpText}}</p>\n\n        </div>\n   \n    <pre ng-if=\"Ctrl.debug\" class=\"pre-scrollable\">{{Ctrl.json|json}}</pre>\n</div>\n\n\n";
        }
    })(input = au.input || (au.input = {}));
})(au || (au = {}));
(function () {
    var inputsDirective = [
        au.input.NumberInput,
        au.input.DateInput,
        au.input.TextInput,
        au.input.CheckboxInput,
        au.input.FileInput,
        au.input.TextAreaInput,
        au.input.SelectInput,
        au.input.PasswordInput,
        au.input.EmailInput,
        au.input.AwesomeCheckboxInput
    ];
    inputsDirective.forEach(function (d) {
        var obj = new d();
        angular.module(au.moduleName).directive(obj.directiveName, function () { return obj.directive(); });
    });
})();
//# sourceMappingURL=au-input.js.map