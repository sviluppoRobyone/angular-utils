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
                    /^\d{4}\-\d{2}\-\d{2}T\d{2}:\d{2}:\d{2}$/,
                    /^\d{4}\-\d{2}\-\d{2}T\d{2}:\d{2}:\d{2}(\.{1}\d{1,})?\d$/ //2016-02-18T23:00:00.00000
                ];
                this.response = function (response) {
                    if (response.headers("Content-Type") && response.headers("Content-Type").indexOf("application/json") > -1) {
                        // this.$log.debug(Intercept.InterceptorName, "Response: ", response);
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
                //this.$log.debug(Intercept.InterceptorName, "Apply ", obj);
                return new Date(obj);
            };
            Intercept.prototype.SearchObj = function (obj) {
                // this.$log.debug(Intercept.InterceptorName, "Search: ", obj);
                var _this = this;
                if (!obj)
                    return 0;
                var t = typeof obj;
                //this.$log.debug(Intercept.InterceptorName, "Type ", t);
                if (t == this.stringType) {
                    if (this.regexList.some(function (r) { return r.exec(obj) !== null; })) {
                        obj = this.ApplyFix(obj);
                    }
                }
                else if (Array.isArray(obj)) {
                    //  this.$log.debug(Intercept.InterceptorName, "Is Array", (<Array<any>>obj).length);
                    obj = obj.map(function (p) { return _this.SearchObj(p); });
                }
                else if (t == this.objectType) {
                    for (var propertyName in obj) {
                        //    this.$log.debug(Intercept.InterceptorName, "Property["+propertyName+"]");
                        if (obj[propertyName])
                            obj[propertyName] = this.SearchObj(obj[propertyName]);
                    }
                }
                return obj;
            };
            Intercept.InterceptorName = "dateFixInterceptor";
            return Intercept;
        }());
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
        }());
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