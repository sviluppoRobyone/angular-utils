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
//# sourceMappingURL=au-http-date-parser.js.map