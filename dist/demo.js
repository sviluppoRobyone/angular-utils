var angularUtils;
(function (angularUtils) {
    var demo;
    (function (demo) {
        var DemoController = (function () {
            function DemoController() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                this.data = {
                    booleanInput: false,
                    numberInput: 0,
                    patternInput: null,
                    textInput: "",
                    dateInput: null,
                    fileContent: null,
                    fileName: null
                };
                this.pattern = /^\w+\.\w+$/;
                this.args = null;
                this.args = args;
            }
            Object.defineProperty(DemoController.prototype, "$q", {
                get: function () {
                    return this.args[0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DemoController.prototype, "$timeout", {
                get: function () {
                    return this.args[1];
                },
                enumerable: true,
                configurable: true
            });
            DemoController.prototype.Update = function () {
                var _q = this.$q.defer();
                this.$timeout(function () {
                    _q.resolve();
                }, 4000);
                return _q.promise;
            };
            DemoController.$inject = ["$q", "$timeout"];
            return DemoController;
        })();
        demo.DemoController = DemoController;
    })(demo = angularUtils.demo || (angularUtils.demo = {}));
})(angularUtils || (angularUtils = {}));
angular
    .module("angularUtilsDemo", ["angularUtils"])
    .controller("demoContoller", angularUtils.demo.DemoController);
//# sourceMappingURL=demo.js.map