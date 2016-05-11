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
//# sourceMappingURL=au-http-activity.js.map