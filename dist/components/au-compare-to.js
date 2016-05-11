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
//# sourceMappingURL=au-compare-to.js.map