var au;
(function (au) {
    var clickOnKeyEnter;
    (function (clickOnKeyEnter) {
        function Directive() {
            return function (scope, element, attrs) {
                var fn = function (e) {
                    if (e.which == 13) {
                        $(attrs.clickOnEnter).click();
                    }
                };
                $(element).on("keyup", ":input", fn);
                scope.$on('$destroy', function () {
                    $(":input", element).off("keyup", fn);
                });
            };
        }
        clickOnKeyEnter.Directive = Directive;
        clickOnKeyEnter.name = "clickOnEnter";
    })(clickOnKeyEnter = au.clickOnKeyEnter || (au.clickOnKeyEnter = {}));
})(au || (au = {}));
(function () {
    angular.module(au.moduleName)
        .directive(au.clickOnKeyEnter.name, au.clickOnKeyEnter.Directive);
})();
//# sourceMappingURL=au-click-on-key-enter.js.map