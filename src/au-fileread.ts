module au {
    export module fileRead {
        export var directiveName: string = "fileread";
      
        export function Core($timeout: angular.ITimeoutService) {
            return <angular.IDirective>{
                restrict: "A",
                require: "ngModel",
                scope: {
                    fileread: "=",
                    filename: "=?"
                },
                link: (scope, element: angular.IAugmentedJQuery, attributes, ngModel: angular.INgModelController) => {


                    var oldPristine = ngModel.$setPristine;
                    ngModel.$setPristine = () => {
                        element.val("");
                        oldPristine();
                    };
                    element.on("change",
                    (changeEvent) => {
                        ngModel.$setDirty();


                        if (!element.val()) {

                            $timeout(() => {
                                if (element.prop("required"))
                                    ngModel.$setValidity("required", false);
                                ngModel.$valid = !element.prop("required");


                                scope.fileread = null;
                                scope.filename = null;
                            });

                            return;
                        }

                        var reader = new FileReader();
                        reader.onload = (loadEvent) => {

                            $timeout(() => {
                                if (element.prop("required"))
                                    ngModel.$setValidity("required", true);
                                ngModel.$valid = true;
                                scope.filename = element.val();
                                scope.fileread = (<any>loadEvent.target).result;

                            });
                        }

                        if (attributes["readAsString"])
                            reader.readAsText((<any>changeEvent.target).files[0]);
                        else
                            reader.readAsDataURL((<any>changeEvent.target).files[0]);
                    });
                }
            };

        }
    }
}
(() => {
    angular.module(au.moduleName).directive(au.fileRead.directiveName, ["$timeout", au.fileRead.Core]);
})();
