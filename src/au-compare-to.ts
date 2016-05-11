(() => {
    angular.module(au.moduleName)
    .directive("compareTo", [
            "$log", ($log: angular.ILogService) => {
                return <angular.IDirective>{
                    require: "ngModel",
                    scope: {
                        otherModelValue: "=compareTo"
                    },
                    link: (scope, element, attributes, ngModel: angular.INgModelController) => {

                        ngModel.$validators["compareTo"] = (modelValue) => {

                            var arr = [modelValue, scope.otherModelValue];
                           // $log.debug("compare ", modelValue, scope.otherModelValue);
                            //finché ce n'é uno di vuoto va bene perché si presuppone che ci sia l'attributo required
                            return arr.some(x => typeof x == "undefined") || arr.some(x => x == null) || modelValue == scope.otherModelValue;
                        };

                        scope.$watch("otherModelValue", () => {
                            ngModel.$validate();
                        });
                    }
                };
            }
        ]);
})()