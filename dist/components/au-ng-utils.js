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
                    return this.getFromInject("$cacheFactory");
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
//# sourceMappingURL=au-ng-utils.js.map