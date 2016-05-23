var au;
(function (au) {
    var fileRead;
    (function (fileRead) {
        fileRead.directiveName = "fileread";
        function Core($timeout) {
            return {
                restrict: "A",
                require: "ngModel",
                scope: {
                    fileread: "=",
                    filename: "=?"
                },
                link: function (scope, element, attributes, ngModel) {
                    var oldPristine = ngModel.$setPristine;
                    ngModel.$setPristine = function () {
                        element.val("");
                        oldPristine();
                    };
                    element.on("change", function (changeEvent) {
                        ngModel.$setDirty();
                        if (!element.val()) {
                            $timeout(function () {
                                if (element.prop("required"))
                                    ngModel.$setValidity("required", false);
                                ngModel.$valid = !element.prop("required");
                                scope.fileread = null;
                                scope.filename = null;
                            });
                            return;
                        }
                        var reader = new FileReader();
                        reader.onload = function (loadEvent) {
                            $timeout(function () {
                                if (element.prop("required"))
                                    ngModel.$setValidity("required", true);
                                ngModel.$valid = true;
                                scope.filename = element.val();
                                scope.fileread = loadEvent.target.result;
                            });
                        };
                        if (attributes["readAsString"])
                            reader.readAsText(changeEvent.target.files[0]);
                        else
                            reader.readAsDataURL(changeEvent.target.files[0]);
                    });
                }
            };
        }
        fileRead.Core = Core;
    })(fileRead = au.fileRead || (au.fileRead = {}));
})(au || (au = {}));
(function () {
    angular.module(au.moduleName).directive(au.fileRead.directiveName, ["$timeout", au.fileRead.Core]);
})();
//# sourceMappingURL=au-fileread.js.map