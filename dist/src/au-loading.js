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
        }());
        loading.CtrlLoading = CtrlLoading;
    })(loading = au.loading || (au.loading = {}));
})(au || (au = {}));
(function () {
    angular.module(au.moduleName)
        .directive(au.loading.CtrlLoading.DirectiveName, au.loading.CtrlLoading.Directive);
})();
//# sourceMappingURL=au-loading.js.map