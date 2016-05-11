module au {
    export module loading {
          export class CtrlLoading {
            static DirectiveName = "auLoading";
            static $inject=["$scope"];
            get scopeSpacing() {
                return this.$scope.hasOwnProperty("spacing") ? parseInt(this.$scope["spacing"]) : 3;
            }
            get iconSize() {
                return this.$scope.hasOwnProperty("iconSize") ? parseInt(this.$scope["iconSize"]) : 2;
            }
            get iconName() {
                return this.$scope.hasOwnProperty("iconName") ? this.$scope["iconName"] : "circle-o-notch";
            }
            spaceArray:any[]=[];
            constructor(...args) {
                this.args = args;
                this.Init();
            }
            Init() {
                this.spaceArray = [];
                for (var i = 0; i < this.scopeSpacing; i++) {
                    this.spaceArray.push(i);
                }
                
                
            }
            args:any[];
            get $scope():angular.IScope {
                return this.args[0];
            }
            static Directive(): angular.IDirective {
                return <angular.IDirective>{
                    template: `
                        <div class="text-center">
                                     <br ng-repeat="n in Ctrl.spaceArray" />   
                                <i class="fa fa-spin fa-{{Ctrl.iconName}} fa-{{Ctrl.iconSize}}x"></i>
                                    <br ng-repeat="n in Ctrl.spaceArray" />               
    
                        </div>

                    `,
                    controller: CtrlLoading,
                    replace:true,
                    controllerAs: "Ctrl",
                    scope: {
                        spacing: "@?",
                        iconSize: "@?",
                        iconName:"@?"
                    }

                };
            }
        }
    }
}

(() => {
    angular.module(au.moduleName)
    .directive(au.loading.CtrlLoading.DirectiveName,au.loading.CtrlLoading.Directive)
})();