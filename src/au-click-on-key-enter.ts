module au {
    export module clickOnKeyEnter {
        export function Directive(): angular.IDirective {
                return (scope, element, attrs) => {

                    var fn = e => {

                        if (e.which == 13) {

                            $(attrs.clickOnEnter).click();
                        }
                    };
                    $(element).on("keyup", ":input", fn);
                    scope.$on('$destroy', () => {
                        $(":input", element).off("keyup", fn);
                    });

                };

            }
            export var name = "clickOnEnter";
    }
}

(() => {
    angular.module(au.moduleName)
        .directive(au.clickOnKeyEnter.name, au.clickOnKeyEnter.Directive);
})();