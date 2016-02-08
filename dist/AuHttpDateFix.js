var Au;
(function (Au) {
    var HttpDateFix;
    (function (HttpDateFix) {
        var Intercept = (function () {
            function Intercept($injector) {
                var _this = this;
                this.$injector = null;
                this.stringType = typeof "";
                this.objectType = typeof {};
                this.regexList = [
                    /^\d{4}\-\d{2}\-\d{2}T\d{2}:\d{2}:\d{2}$/
                ];
                this.response = function (response) {
                    _this.$log.debug(Intercept.InterceptorName, "Response: ", response);
                    _this.SearchObj(response.data);
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
                this.$log.debug(Intercept.InterceptorName, "Apply ", obj);
                obj = (new Date(obj));
            };
            Intercept.prototype.SearchObj = function (obj) {
                var _this = this;
                this.$log.debug(Intercept.InterceptorName, "Search: ", obj);
                if (!obj)
                    return 0;
                var t = typeof obj;
                this.$log.debug(Intercept.InterceptorName, "Type ", t);
                if (t == this.stringType) {
                    if (this.regexList.some(function (r) { return r.exec(obj) !== null; })) {
                        this.ApplyFix(obj);
                        return 1;
                    }
                }
                if (Array.isArray(obj)) {
                    this.$log.debug(Intercept.InterceptorName, "Is Array", obj.length);
                    return obj.map(function (p) { return _this.SearchObj(p); }).reduce(function (a, b) {
                        return a + b;
                    }, 0);
                }
                if (t == this.objectType) {
                    var res = 0;
                    for (var propertyName in obj) {
                        this.$log.debug(Intercept.InterceptorName, "Property[" + propertyName + "]");
                        if (obj[propertyName])
                            res += this.SearchObj(obj[propertyName]);
                    }
                    return res;
                }
            };
            Intercept.InterceptorName = "dateFixInterceptor";
            return Intercept;
        })();
        HttpDateFix.Intercept = Intercept;
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
        HttpDateFix.InterceptConfig = InterceptConfig;
    })(HttpDateFix = Au.HttpDateFix || (Au.HttpDateFix = {}));
})(Au || (Au = {}));
(function () {
    angular.module(Au.moduleName)
        .factory(Au.HttpDateFix.Intercept.InterceptorName, ["$injector", function ($injector) {
            return new Au.HttpDateFix.Intercept($injector);
        }])
        .config(["$injector", function ($injector) {
            new Au.HttpDateFix.InterceptConfig($injector);
        }]);
})();
//# sourceMappingURL=AuHttpDateFix.js.map