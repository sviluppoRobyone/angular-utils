var au;
(function (au) {
    au.moduleName = "angular-utils";
})(au || (au = {}));
angular.module(au.moduleName, []);
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
        })();
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
        })();
        button.ActionButton = ActionButton;
    })(button = au.button || (au.button = {}));
})(au || (au = {}));
(function () {
    angular.module(au.moduleName)
        .service(au.button.ActionButtonConfig.serviceName, au.button.ActionButtonConfig)
        .directive(au.button.ActionButton.directiveName, au.button.ActionButton.directive);
})();
var au;
(function (au) {
    var clickOnKeyEnter;
    (function (clickOnKeyEnter) {
        function Directive() {
            return function (scope, element, attrs) {
                var fn = function (e) {
                    if (e.which == 13) {
                        $(attrs.clickOnEnter).click();
                    }
                };
                $(element).on("keyup", ":input", fn);
                scope.$on('$destroy', function () {
                    $(":input", element).off("keyup", fn);
                });
            };
        }
        clickOnKeyEnter.Directive = Directive;
        clickOnKeyEnter.name = "clickOnEnter";
    })(clickOnKeyEnter = au.clickOnKeyEnter || (au.clickOnKeyEnter = {}));
})(au || (au = {}));
(function () {
    angular.module(au.moduleName)
        .directive(au.clickOnKeyEnter.name, au.clickOnKeyEnter.Directive);
})();
(function () {
    angular.module(au.moduleName)
        .directive("compareTo", [
        "$log", function ($log) {
            return {
                require: "ngModel",
                scope: {
                    otherModelValue: "=compareTo"
                },
                link: function (scope, element, attributes, ngModel) {
                    ngModel.$validators["compareTo"] = function (modelValue) {
                        var arr = [modelValue, scope.otherModelValue];
                        return arr.some(function (x) { return typeof x == "undefined"; }) || arr.some(function (x) { return x == null; }) || modelValue == scope.otherModelValue;
                    };
                    scope.$watch("otherModelValue", function () {
                        ngModel.$validate();
                    });
                }
            };
        }
    ]);
})();
var au;
(function (au) {
    var datepicker;
    (function (datepicker) {
        var DatepickerFallback = (function () {
            function DatepickerFallback() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                this.args = [];
                this.args = [];
                this.Init();
            }
            Object.defineProperty(DatepickerFallback.prototype, "modalHtml", {
                get: function () {
                    return "<div class=\"modal fade\" tabindex=\"-1\" role=\"dialog\">\n  <div class=\"modal-dialog modal-sm\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n        <h4 class=\"modal-title\">Seleziona una data</h4>\n      </div>\n      <div class=\"modal-body\">\n        \n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-danger pull-left delete\">\n            <i class=\"fa fa-eraser\"></i>           \n        </button>\n        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">\n            <i class=\"fa fa-undo\"></i>\n            Annulla\n        </button>\n        <button type=\"button\" class=\"btn btn-primary save\">\n            <i class=\"fa fa-save\"></i>\n            Salva\n        </button>\n      </div>\n    </div><!-- /.modal-content -->\n  </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->";
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DatepickerFallback.prototype, "DateSupport", {
                get: function () {
                    var type = "date";
                    var input = document.createElement("input");
                    input.setAttribute("type", type);
                    return input.type == type;
                },
                enumerable: true,
                configurable: true
            });
            DatepickerFallback.prototype.Init = function () {
                var _this = this;
                if (this.DateSupport)
                    return;
                $(document).on("focus", "input[type='date']", function (e) {
                    var input = $(e.currentTarget);
                    if (input.prop("readonly") || input.prop("disabled"))
                        return;
                    var modal = $(_this.modalHtml);
                    modal.appendTo("body");
                    modal.modal({});
                    modal.on("hidden.bs.modal", function () {
                        modal.remove();
                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();
                    });
                    var modalBody = $(".modal-body", modal);
                    var dp = $("<div/>").appendTo(modalBody);
                    var selectedDate = null;
                    var options = {
                        language: 'it',
                        todayHighlight: true,
                        todayBtn: true
                    };
                    dp.datepicker(options).on('changeDate', function (e) {
                        selectedDate = e.date;
                    });
                    var currentDate = input.val();
                    if (currentDate) {
                        selectedDate = new Date(currentDate);
                        dp.datepicker("_setDate", selectedDate);
                    }
                    dp.children().first().css({
                        "margin-left": "auto",
                        "margin-right": "auto"
                    });
                    $(".save", modal).click(function () {
                        var day = ("0" + selectedDate.getDate()).slice(-2);
                        var month = ("0" + (selectedDate.getMonth() + 1)).slice(-2);
                        var d = selectedDate.getFullYear() + "-" + month + "-" + day;
                        input.val(d).trigger("input");
                        modal.modal("hide");
                    });
                    $(".delete", modal).click(function () {
                        input.val("").trigger("input");
                        modal.modal("hide");
                    });
                    modal.modal("show");
                });
            };
            DatepickerFallback.$inject = ["$injector"];
            return DatepickerFallback;
        })();
        datepicker.DatepickerFallback = DatepickerFallback;
    })(datepicker = au.datepicker || (au.datepicker = {}));
})(au || (au = {}));
(function () {
    angular
        .module(au.moduleName)
        .run(au.datepicker.DatepickerFallback.$inject.concat([(function () {
            var aaa = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                aaa[_i - 0] = arguments[_i];
            }
            new ((_a = au.datepicker.DatepickerFallback).bind.apply(_a, [void 0].concat(aaa)))();
            var _a;
        })]));
})();
var au;
(function (au) {
    var errors;
    (function (errors_1) {
        errors_1.defaultError = function (promise, resp) {
            promise.resolve(["An error occurred"]);
        };
        errors_1.dotnetMvcError = function (promise, response) {
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
    })(errors = au.errors || (au.errors = {}));
})(au || (au = {}));
var au;
(function (au) {
    var fileRead;
    (function (fileRead) {
        fileRead.directiveName = "fileread";
        function Core($timeout) {
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
        }
        fileRead.Core = Core;
    })(fileRead = au.fileRead || (au.fileRead = {}));
})(au || (au = {}));
(function () {
    angular.module(au.moduleName).directive(au.fileRead.directiveName, ["$timeout", au.fileRead.Core]);
})();
var au;
(function (au) {
    var httpActivity;
    (function (httpActivity) {
        var HttpEvents = (function () {
            function HttpEvents($injector) {
                var _this = this;
                this.$injector = null;
                this.loadingCount = 0;
                this.request = function (config) {
                    _this.loadingCount++;
                    if (_this.loadingCount) {
                        _this.$rootScope.$broadcast(HttpEvents.EventProgress);
                    }
                    return config || _this.$q.when(config);
                };
                this.response = function (response) {
                    _this.loadingCount--;
                    if (!_this.loadingCount) {
                        _this.$rootScope.$broadcast(HttpEvents.EventFinish);
                    }
                    return response || _this.$q.when(response);
                };
                this.responseError = function (response) {
                    _this.loadingCount--;
                    if (!_this.loadingCount) {
                        _this.$rootScope.$broadcast(HttpEvents.EventFinish);
                    }
                    return _this.$q.reject(response);
                };
                this.$injector = $injector;
                this.$rootScope.$on(HttpEvents.EventProgress, function () {
                });
                this.$rootScope.$on(HttpEvents.EventFinish, function () {
                });
                this.$rootScope.$watch(function () { return _this.loadingCount; }, function () {
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
        httpActivity.HttpEvents = HttpEvents;
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
        httpActivity.HttpEventsConfig = HttpEventsConfig;
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
        httpActivity.ToggleOnHttpActivity = ToggleOnHttpActivity;
    })(httpActivity = au.httpActivity || (au.httpActivity = {}));
})(au || (au = {}));
(function () {
    angular.module(au.moduleName)
        .factory(au.httpActivity.HttpEvents.InterceptorName, [
        "$injector", function ($injector) {
            return new au.httpActivity.HttpEvents($injector);
        }
    ])
        .config([
        "$injector", function ($injector) {
            new au.httpActivity.HttpEventsConfig($injector);
        }
    ])
        .directive(au.httpActivity.ToggleOnHttpActivity.DirectiveName, au.httpActivity.ToggleOnHttpActivity.Directive);
})();
var au;
(function (au) {
    var httpDateParser;
    (function (httpDateParser) {
        var Intercept = (function () {
            function Intercept($injector) {
                var _this = this;
                this.$injector = null;
                this.stringType = typeof "";
                this.objectType = typeof {};
                this.regexList = [
                    /^\d{4}\-\d{2}\-\d{2}T\d{2}:\d{2}:\d{2}$/,
                    /^\d{4}\-\d{2}\-\d{2}T\d{2}:\d{2}:\d{2}(\.{1}\d{1,})?\d$/
                ];
                this.response = function (response) {
                    if (response.headers("Content-Type") && response.headers("Content-Type").indexOf("application/json") > -1) {
                        response.data = _this.SearchObj(response.data);
                    }
                    return response || _this.$q.when(response);
                };
                this.$injector = $injector;
            }
            Object.defineProperty(Intercept.prototype, "$q", {
                get: function () {
                    return this.$injector.get("$q");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Intercept.prototype, "$log", {
                get: function () {
                    return this.$injector.get("$log");
                },
                enumerable: true,
                configurable: true
            });
            Intercept.prototype.ApplyFix = function (obj) {
                return new Date(obj);
            };
            Intercept.prototype.SearchObj = function (obj) {
                var _this = this;
                if (!obj)
                    return 0;
                var t = typeof obj;
                if (t == this.stringType) {
                    if (this.regexList.some(function (r) { return r.exec(obj) !== null; })) {
                        obj = this.ApplyFix(obj);
                    }
                }
                else if (Array.isArray(obj)) {
                    obj = obj.map(function (p) { return _this.SearchObj(p); });
                }
                else if (t == this.objectType) {
                    for (var propertyName in obj) {
                        if (obj[propertyName])
                            obj[propertyName] = this.SearchObj(obj[propertyName]);
                    }
                }
                return obj;
            };
            Intercept.InterceptorName = "dateFixInterceptor";
            return Intercept;
        })();
        httpDateParser.Intercept = Intercept;
        var InterceptConfig = (function () {
            function InterceptConfig($injector) {
                this.$injector = null;
                this.$injector = $injector;
                this.Init();
            }
            Object.defineProperty(InterceptConfig.prototype, "$httpProvider", {
                get: function () {
                    return this.$injector.get("$httpProvider");
                },
                enumerable: true,
                configurable: true
            });
            InterceptConfig.prototype.Init = function () {
                this.$httpProvider.interceptors.push(Intercept.InterceptorName);
            };
            return InterceptConfig;
        })();
        httpDateParser.InterceptConfig = InterceptConfig;
    })(httpDateParser = au.httpDateParser || (au.httpDateParser = {}));
})(au || (au = {}));
(function () {
    angular.module(au.moduleName)
        .factory(au.httpDateParser.Intercept.InterceptorName, ["$injector", function ($injector) {
            return new au.httpDateParser.Intercept($injector);
        }])
        .config(["$injector", function ($injector) {
            new au.httpDateParser.InterceptConfig($injector);
        }]);
})();
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
                return StandardFormGroup("\n\n       \n                <input ng-readonly=\"Ctrl.readonly\" type=\"" + this.type + "\" ng-model=\"Ctrl.model\" class=\"form-control\" name=\"" + this.templateCfg.fieldName + "\" ng-attr-maxlength=\"{{Ctrl.hasMaxLength?Ctrl.maxLength:undefined}}\" ng-attr-minlength=\"{{Ctrl.hasMinLength?Ctrl.minLength:undefined}}\" ng-pattern=\"Ctrl.getPattern()\" ng-required=\"Ctrl.required\" ng-attr-placeholder=\"{{Ctrl.placeholder?Ctrl.placeholder:undefined}}\" ng-attr-min=\"{{Ctrl.minMaxEnabled && Ctrl.min ?Ctrl.min:undefined}}\"  ng-attr-max=\"{{Ctrl.minMaxEnabled && Ctrl.max ? Ctrl.max:undefined}}\" ng-attr-compare-to=\"Ctrl.hasCompare?Ctrl.compare:undefined\" />\n                \n       \n     \n\n\n");
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
            Object.defineProperty(StandardInput.prototype, "min", {
                get: function () {
                    return this.$scope["min"] || null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StandardInput.prototype, "max", {
                get: function () {
                    return this.$scope["max"] || null;
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
            return "\n            <label class=\"control-label\" ng-if=\"Ctrl.hasLabel\">{{Ctrl.label}}</label>\n         \n            <div ng-class=\"{'input-group':Ctrl.hasAnyAddon}\">\n                <span class=\"input-group-addon\" ng-if=\"Ctrl.hasAddonLeft\">{{Ctrl.addonLeft}}</span>\n                " + input + "                \n                <span class=\"input-group-addon\" ng-if=\"Ctrl.hasAddonRight\">{{Ctrl.addonRight}}</span>\n            </div>\n\n            <span title=\"Campo Richiesto\" class=\"glyphicon glyphicon-asterisk form-control-feedback\" ng-if=\"Ctrl.hasRequiredIcon\" aria-hidden=\"true\"></span>\n            <span class=\"glyphicon glyphicon-ok form-control-feedback\" ng-if=\"Ctrl.hasSuccessClass\" aria-hidden=\"true\"></span>\n\n\n             <span class=\"glyphicon glyphicon-warning-sign form-control-feedback\" ng-if=\"Ctrl.hasWarnigClass\" aria-hidden=\"true\"></span>";
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
var au;
(function (au) {
    var loading;
    (function (loading) {
        var CtrlLoading = (function () {
            function CtrlLoading() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                this.spaceArray = [];
                this.args = args;
                this.Init();
            }
            Object.defineProperty(CtrlLoading.prototype, "scopeSpacing", {
                get: function () {
                    return this.$scope.hasOwnProperty("spacing") ? parseInt(this.$scope["spacing"]) : 3;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CtrlLoading.prototype, "iconSize", {
                get: function () {
                    return this.$scope.hasOwnProperty("iconSize") ? parseInt(this.$scope["iconSize"]) : 2;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CtrlLoading.prototype, "iconName", {
                get: function () {
                    return this.$scope.hasOwnProperty("iconName") ? this.$scope["iconName"] : "circle-o-notch";
                },
                enumerable: true,
                configurable: true
            });
            CtrlLoading.prototype.Init = function () {
                this.spaceArray = [];
                for (var i = 0; i < this.scopeSpacing; i++) {
                    this.spaceArray.push(i);
                }
            };
            Object.defineProperty(CtrlLoading.prototype, "$scope", {
                get: function () {
                    return this.args[0];
                },
                enumerable: true,
                configurable: true
            });
            CtrlLoading.Directive = function () {
                return {
                    template: "\n                        <div class=\"text-center\">\n                                     <br ng-repeat=\"n in Ctrl.spaceArray\" />   \n                                <i class=\"fa fa-spin fa-{{Ctrl.iconName}} fa-{{Ctrl.iconSize}}x\"></i>\n                                    <br ng-repeat=\"n in Ctrl.spaceArray\" />               \n    \n                        </div>\n\n                    ",
                    controller: CtrlLoading,
                    replace: true,
                    controllerAs: "Ctrl",
                    scope: {
                        spacing: "@?",
                        iconSize: "@?",
                        iconName: "@?"
                    }
                };
            };
            CtrlLoading.DirectiveName = "auLoading";
            CtrlLoading.$inject = ["$scope"];
            return CtrlLoading;
        })();
        loading.CtrlLoading = CtrlLoading;
    })(loading = au.loading || (au.loading = {}));
})(au || (au = {}));
(function () {
    angular.module(au.moduleName)
        .directive(au.loading.CtrlLoading.DirectiveName, au.loading.CtrlLoading.Directive);
})();
var au;
(function (au) {
    var ngUtils;
    (function (ngUtils_1) {
        var ngUtils = (function () {
            function ngUtils() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                this.args = null;
                this.store = {};
                this.args = args;
                Object.defineProperty(this, "args", { enumerable: false });
            }
            ngUtils.prototype.getFromInject = function (key) {
                if (!this.store[key])
                    this.store[key] = this.$injector.get(key);
                return this.store[key];
            };
            Object.defineProperty(ngUtils.prototype, "$injector", {
                get: function () {
                    return this.args[0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ngUtils.prototype, "$http", {
                get: function () {
                    return this.getFromInject("$http");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ngUtils.prototype, "$location", {
                get: function () {
                    return this.getFromInject("$location");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ngUtils.prototype, "$routeParams", {
                get: function () {
                    return this.getFromInject("$routeParams");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ngUtils.prototype, "$q", {
                get: function () {
                    return this.getFromInject("$q");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ngUtils.prototype, "$filter", {
                get: function () {
                    return this.getFromInject("$filter");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ngUtils.prototype, "$route", {
                get: function () {
                    return this.getFromInject("$route");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ngUtils.prototype, "$timeout", {
                get: function () {
                    return this.getFromInject("$timeout");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ngUtils.prototype, "$ngView", {
                get: function () {
                    return $("[ng-view]");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ngUtils.prototype, "$cacheFactory", {
                get: function () {
                    return this.getFromInject("$cacheFactory");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ngUtils.prototype, "$locale", {
                get: function () {
                    return this.getFromInject("$locale");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ngUtils.prototype, "$interval", {
                get: function () {
                    return this.getFromInject("$interval");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ngUtils.prototype, "$log", {
                get: function () {
                    return this.getFromInject("$log");
                },
                enumerable: true,
                configurable: true
            });
            ngUtils.prototype.manageAjaxLoading = function (before, ajax, after) {
                var _this = this;
                var qBefore = this.$q.defer();
                var qAjax = this.$q.defer();
                var qAfter = this.$q.defer();
                var doBefore = function () {
                    _this.$timeout(function () {
                        before && before();
                    }).then(function () {
                        qBefore.resolve();
                    });
                };
                var doAfter = function () {
                    _this.$timeout(function () {
                        after && after();
                    }).then(function () {
                        qAfter.resolve();
                    });
                };
                qBefore.promise.then(function () {
                    ajax(qAjax.resolve, qAjax.reject);
                });
                qAjax.promise.then(function () {
                    doAfter();
                });
                return this.$q(function (ok, ko) {
                    qAfter.promise.then(function () {
                        ok();
                    });
                    doBefore();
                });
            };
            ngUtils.prototype.normalizeLocationSearch = function (baseObj, cfg) {
                var s = this.$location.search();
                (cfg.BooleanProperties || []).forEach(function (p) {
                    if (s[p] && angular.isString(s[p])) {
                        s[p] = s[p] == "True";
                    }
                });
                (cfg.ArrayProperties || []).forEach(function (p) {
                    if (s[p] && angular.isString(s[p])) {
                        s[p] = [s[p]];
                    }
                });
                angular.merge(baseObj, s);
                return baseObj;
            };
            ngUtils.prototype.onScopeDispose = function ($scope) {
                var q = this.$q.defer();
                $scope.$on("$destroy", function () {
                    q.resolve();
                });
                return q.promise;
            };
            ngUtils.prototype.getRouteParamsAsNumber = function (name) {
                return parseInt(this.$routeParams[name] ? this.$routeParams[name] : "0");
            };
            ngUtils.serviceName = "ngUtils";
            ngUtils.$inject = ["$injector"];
            return ngUtils;
        })();
        ngUtils_1.ngUtils = ngUtils;
    })(ngUtils = au.ngUtils || (au.ngUtils = {}));
})(au || (au = {}));
(function () {
    angular.module(au.moduleName)
        .service(au.ngUtils.ngUtils.serviceName, au.ngUtils.ngUtils);
})();
//# sourceMappingURL=au.js.map