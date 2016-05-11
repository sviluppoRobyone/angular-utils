module au {
    export module button {
        export class ActionButtonConfig {
                static serviceName="auButtonConfig";
                getErrors: au.errors.IGetErrors<any> =  au.errors.defaultError;


            }
        export class ActionButton {
             static directiveName="auButton";
                private args: any[] = [];
                static $inject = ["$scope", "$timeout", "$element", "auButtonConfig","$q"];
                constructor(...args) {
                    this.args = args;

                }




                static template = `
            
            <button ng-disabled="!Ctrl.enabled" ng-click="Ctrl.Click()" class="btn {{Ctrl.type}}">
                    <i class="fa fa-spin fa-spinner" ng-show="Ctrl.running"></i>
                    <i class="fa fa-check" ng-show="Ctrl.done"></i>
                    <i class="fa fa-times" ng-show="Ctrl.error"></i>
                 {{Ctrl.text}}
            </button>


`;              
                get $q(): angular.IQService {
                    return this.args[4];
                }
                get auButtonConfig(): ActionButtonConfig {
                    return this.args[3];
                }
                get $scope(): angular.IScope {
                    return this.args[0];
                }
                get $element(): JQuery {
                    return $(this.args[2]);
                }
                get $timeout(): angular.ITimeoutService {
                    return this.args[1];
                }
                get form(): angular.IFormController {
                    return this.$scope["form"] || null;
                }
                get hasForm() {
                    return this.form != null;
                }
                get text(): string {
                    return this.$scope["text"] || null;
                }
                get enabled() {
                    return !this.running && ((this.hasForm && this.form.$valid) || !this.hasForm);
                }
                get action() {
                    return this.$scope["action"] || (() => null);
                }
                get time(): number {
                    return this.$scope["time"] || 3000;
                }
                get type() {
                    return this.$scope["type"] || "btn-primary";
                }
                get confirm() {
                    return this.$scope["confirm"] || null;
                }
                running = false;
                done: boolean = false;
                error: boolean = false;
                Click() {
                    if (this.hasForm && this.form.$invalid) return;


                    this.$element.popover("destroy");
                    if (this.confirm && !confirm(this.confirm)) return;

              

                    this.running = true;
                    const p = this.action();
                  
                    //se ritorna una promise
                    if (p && [p.finally, p.then, p.catch].every(x=> x instanceof Function)) {


                        (<angular.IPromise<any>>p).finally(() => {
                            this.running = false;
                        }).then(() => {

                            this.done = true;

                            this.$timeout(() => {
                                this.done = false;
                            }, this.time);

                        }).catch((r) => {
                            this.error = true;

                            var error$Q = this.$q.defer<string[]>();

                            error$Q.promise.then((errors) => {
                               this.$element.popover({
                                   content: () => {
                                        var ul = $("<ul/>");

                                        errors.forEach(message => {
                                            $("<li/>").text(message).appendTo(ul);
                                        });
                                        var d = $("<div/>");
                                        d.addClass("text-danger").append(ul);
                                        return d;
                                    },
                                    html: true,
                                    placement: "top",
                                    title: "Si sono verificati alcuni errori"

                                }).popover("show");

                                this.$timeout(() => {
                                        this.error = false;
                                    }, this.time);
                            });
                            
                            this.auButtonConfig.getErrors(error$Q,r);



                        });
                    }
                    else this.running = false;
                }
                static directive() {
                    return <angular.IDirective>{
                        controller: ActionButton,
                        controllerAs: "Ctrl",
                        replace: true,
                        template: ActionButton.template,
                        scope: {
                            action: "&",
                            form: "=",
                            text: "@",
                            type: "@?",
                            debug: "=?",
                            confirm: "@?"
                        }
                    };
                }
            }
        }
    }

(() => {
    angular.module(au.moduleName)
        .service(au.button.ActionButtonConfig.serviceName, au.button.ActionButtonConfig)
        .directive(au.button.ActionButton.directiveName, au.button.ActionButton.directive);
})();