module Au {
    export var moduleName = "angularUtils";
    export module Http {
        //http://stackoverflow.com/questions/20798626/write-http-interceptor-as-class
        //http://stackoverflow.com/questions/23361883/angular-js-detect-when-all-http-have-finished
        export class HttpEvents {
            static $inject = ["$q", "$rootScope","$log"];
            private args: any[] = [];
            static InterceptorName = "HttpEventInterceptor";
            static EventProgress="loading:progress";
            static EventFinish="loading:finish";
           

            get $q(): angular.IQService {
                return this.args[0];
            }

            get $rootScope(): angular.IRootScopeService {
                return this.args[1];
            }
            get $log() :angular.ILogService{
                return this.args[2];
            }
            constructor(...args) {
                this.args = args;

                this.$rootScope.$on(HttpEvents.EventProgress, () => {
                    this.$log.info("Detect loading progress");
                });

                this.$rootScope.$on(HttpEvents.EventFinish, () => {
                    this.$log.info("Detect loading finish");
                });
            }

            

            private loadingCount :number=0;
            public request=(config)=> {
                if (++this.loadingCount === 1) {
                    this.$log.info("Trigger loading progress");
                    this.$rootScope.$broadcast(HttpEvents.EventProgress);
                    
                }
                return config || this.$q.when(config);
            }
            public response=(response)=> {
                if (--this.loadingCount === 0) {
                    this.$log.info("Trigger loading progress");
                    this.$rootScope.$broadcast(HttpEvents.EventFinish);
                }
                return response || this.$q.when(response);
            }
            public responseError=(response)=> {
                if (this.loadingCount === 0) {
                    this.$log.info("Trigger loading finish");
                     this.$rootScope.$broadcast(HttpEvents.EventFinish);
                }
                return this.$q.reject(response);
            }

           
        }
        export class HttpEventsConfig {
            static $inject = ["$httpProvider"];
            private args: any[] = [];
            get $httpProvider():angular.IHttpProvider {
                return this.args[0];
            }
            constructor(...args) {
                this.args = args;
            }
            Init() {
                this.$httpProvider.interceptors.push(HttpEvents.InterceptorName);
            }
        }
        export class ToggleOnHttpActivity {
            static DirectiveName:string="auHttpActivity";
            static Directive(): angular.IDirective {
                

                    var fn: angular.IDirectiveLinkFn = (s, e) => {
                        e.addClass("hidden");
                        s.$root.$on(HttpEvents.EventProgress, () => {
                            e.removeClass("hidden");
                        });
                        s.$root.$on(HttpEvents.EventFinish, () => {
                            e.addClass("hidden");
                        });
                    };
                    return <angular.IDirective>{
                        link: fn,
                        restrict: "A"

                    };
                
            }
        }
       
    }
    export module Errors {
        import IHttpPromiseCallbackArg = angular.IHttpPromiseCallbackArg;

        export interface IGetErrors<T> {
                (promise: angular.IDeferred<string[]>, resp: T): void
         }

        export var defaultError: IGetErrors<any> = (promise,resp) => {
            promise.resolve(["An error occurred"]);
        };

        export module dotnet {
            export interface IModelState {
                Message:string,
                ModelState:{[p:string]:string[]}
            }
        }
        export var dotnetMvcError:IGetErrors<IHttpPromiseCallbackArg<dotnet.IModelState>>=(promise,response) => {
            if (response.data.ModelState) {
                var errors: string[] = [];
                for (var k in response.data.ModelState) {
                    if (response.data.ModelState.hasOwnProperty(k) && response.data.ModelState[k] instanceof Array) {

                        var prepend = ((typeof k == typeof "") && (<string>k).length > 0) ? k + ": " : "";
                        response.data.ModelState[k].forEach(e => {
                            
                                errors.push(prepend+e);
                        });

                    }
                }
                promise.resolve(errors);
            }
        }
    }
    export module Button{
           

            export class ActionButtonConfig {
                static serviceName="auButtonConfig";
                getErrors: Errors.IGetErrors<any> =  Errors.defaultError;


            }
            export class ActionButtonCtrl {
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
                        controller: ActionButtonCtrl,
                        controllerAs: "Ctrl",
                        replace: true,
                        template: ActionButtonCtrl.template,
                        scope: {
                            action: "&",
                            form: "=",
                            text: "=",
                            type: "=?",
                            debug: "=?",
                            confirm: "=?"
                        }
                    };
                }
            }
        }
        export module Input {

            
            export class InputCtrl {
                static directiveName="auInput";
                static fieldName = "field";
                static formName = "fit";
                static template = `

<div class="input-text" ng-form="${InputCtrl.formName}" ng-class="{'well well-sm':Ctrl.debug}">
    <div class="form-group" ng-class="{'has-error':Ctrl.hasErrorClass,'has-success':Ctrl.hasSuccessClass,'has-feedback':Ctrl.hasFeedbackIcon,'has-warning':Ctrl.hasWarnigClass}">
        
        <div ng-if="Ctrl.IsInputCheckbox" class="checkbox">
            <label>
                <input type="checkbox" name="${InputCtrl.formName}" ng-model="Ctrl.model" ng-required="Ctrl.required" /> {{Ctrl.label}} 
                <span ng-if="Ctrl.hasFeedbackIcon">
                    <i class="glyphicon" ng-class="{'glyphicon-ok':Ctrl.hasSuccessClass,'glyphicon-asterisk':Ctrl.hasRequiredIcon,'glyphicon-warning-sign':Ctrl.hasWarnigClass}"></i>
                </span>
            </label>

        </div>
        <div ng-if="!Ctrl.IsInputCheckbox">      

       
            <label class="control-label" ng-if="Ctrl.hasLabel">{{Ctrl.label}}</label>
         
            <div ng-class="{'input-group':Ctrl.hasAnyAddon}">
                <span class="input-group-addon" ng-if="Ctrl.hasAddonLeft">{{Ctrl.addonLeft}}</span>
                <input ng-if="!Ctrl.multiline && !Ctrl.IsInputFile && !Ctrl.IsSelect"  ng-attr-type="{{Ctrl.type}}" ng-model="Ctrl.model" class="form-control" name="${InputCtrl.fieldName}" ng-attr-maxlength="{{Ctrl.hasMaxLength?Ctrl.maxLength:undefined}}" ng-pattern="Ctrl.getPattern()" ng-required="Ctrl.required" ng-attr-placeholder="{{Ctrl.placeholder?Ctrl.placeholder:undefined}}" ng-attr-min="{{Ctrl.minMaxEnabled && Ctrl.min ?Ctrl.min:undefined}}"  ng-attr-max="{{Ctrl.minMaxEnabled && Ctrl.max ? Ctrl.max:undefined}}" />
                <input type="file" class="form-control" name="${InputCtrl.fieldName}" ng-model="Ctrl.model" ng-if="Ctrl.IsInputFile" fileread="Ctrl.model" filename="Ctrl.filename"  ng-required="Ctrl.required" />
                <textarea ng-if="Ctrl.multiline" ng-model="Ctrl.model" class="form-control" name="${InputCtrl.fieldName}" ng-attr-maxlength="{{Ctrl.hasMaxLength?Ctrl.maxLength:undefined}}" ng-pattern="Ctrl.getPattern()" ng-required="Ctrl.required" ng-attr-placeholder="{{Ctrl.placeholder?Ctrl.placeholder:undefined}}" ></textarea>
                <select name="${InputCtrl.fieldName}" class="form-control" ng-if="Ctrl.IsSelect" ng-options="{{Ctrl.optionsExpression}}" ng-model="Ctrl.model"  ng-required="Ctrl.required">
                </select>
                <span class="input-group-addon" ng-if="Ctrl.hasAddonRight">{{Ctrl.addonRight}}</span>
            </div>

            <span title="Campo Richiesto" class="glyphicon glyphicon-asterisk form-control-feedback" ng-if="Ctrl.hasRequiredIcon" aria-hidden="true"></span>
            <span class="glyphicon glyphicon-ok form-control-feedback" ng-if="Ctrl.hasSuccessClass" aria-hidden="true"></span>


             <span class="glyphicon glyphicon-warning-sign form-control-feedback" ng-if="Ctrl.hasWarnigClass" aria-hidden="true"></span>
        </div>

        <p class="help-block" ng-show="${InputCtrl.formName}.${InputCtrl.fieldName}.$dirty && ${InputCtrl.formName}.${InputCtrl.fieldName}.$invalid">
            <span ng-if="${InputCtrl.formName}.${InputCtrl.fieldName}.$error.required">{{Ctrl.requiredText}}</span>
            <span ng-if="${InputCtrl.formName}.${InputCtrl.fieldName}.$error.pattern">{{Ctrl.patternText}}</span>
            <span ng-if="${InputCtrl.formName}.${InputCtrl.fieldName}.$error.min">Valore minimo: {{Ctrl.min}}</span>
            <span ng-if="${InputCtrl.formName}.${InputCtrl.fieldName}.$error.max">Valore massimo: {{Ctrl.max}}</span>
        </p>
        <p class="help-block" ng-if="Ctrl.hasHelpText">{{Ctrl.helpText}}</p>

    </div>
   
    <pre ng-if="Ctrl.debug" class="pre-scrollable">{{Ctrl.json|json}}</pre>
</div>



`;

                private  args: any[] = [];
                static $inject = ["$scope"];
                private directiveInfo:angular.IDirective=null;
                constructor(...args) {
                    this.args = args;
                    this.directiveInfo = InputCtrl.directive();
                }
                get $scope(): angular.IScope {
                    return this.args[0];
                }
                get $form(): angular.IFormController {
                    return this.$scope[InputCtrl.formName] || null;
                }
                get field(): angular.INgModelController {
                    return this.$form[InputCtrl.fieldName] || null;
                }
                get ready(): boolean {
                    return true && this.$form != null && this.field != null;
                }
                get noFeedback() {
                    return this.ready && this.field.$valid && this.field.$pristine;
                }
                get hasErrorClass() {
                    return this.ready && !this.noFeedback && this.field.$invalid && this.field.$dirty;
                }
                get hasSuccessClass() {
                    return this.ready && !this.noFeedback && this.field.$valid;
                }
                get hasWarnigClass() {
                    return this.ready && !this.noFeedback && this.field.$invalid && !this.field.$pristine;
                }
                get hasRequiredIcon() {
                    return this.ready && !this.noFeedback && this.field.$error.required && this.required && this.field.$pristine;
                }
                get hasFeedbackIcon() {
                    return this.ready && !this.noFeedback && (this.hasErrorClass || this.hasSuccessClass || this.hasRequiredIcon || this.hasWarnigClass);
                }
                get json() {
                    return {
                        label: this.label,
                        hasLabel: this.hasLabel,
                        model: this.model,
                        required: this.required,
                        requiredText: this.requiredText,
                        pattern: this.getPattern(),
                        hasPattern: this.hasPattern,
                        patternText: this.patternText,
                        hasMaxLength: this.hasMaxLength,
                        maxLength: this.maxLength,
                        hasHelpText: this.hasHelpText,
                        helpText: this.helpText,
                        min: this.min,
                        form: this.$form,
                        max: this.max,
                        type: this.type,
                        options: this.options,
                        optionsGroup: this.optionsGroup,
                        optionsValue: this.optionsValue,
                        optionsLabel: this.optionsLabel,
                        optionsExpression: this.optionsExpression
                    }
                }
                get label() {
                    return this.$scope["label"] || null;
                }
                get hasLabel() {
                    return this.label != null;
                }
                get model() {
                    return this.$scope[InputCtrl.directiveName];
                }
                set model(x) {
                    this.$scope[InputCtrl.directiveName] = x;
                }
                get filename() {
                    return this.$scope["filename"];
                }
                set filename(x) {
                    this.$scope["filename"] = x;
                }
                get required() {
                    return true && this.$scope.hasOwnProperty("required") && this.$scope["required"];
                }
                get type() {
                    return this.$scope["type"] || "text";
                }
                get hasPattern() {
                    return this.pattern != null;
                }
                private defaultPattern=/.*/;
                getPattern() {
                    return this.hasPattern?this.pattern :this.defaultPattern;
                }
                get pattern() {
                    return this.$scope["pattern"] || null;
                }

                get requiredText() {
                    return this.$scope["requiredText"] || "Campo Richiesto";
                }
                get patternText() {
                    return this.$scope["patternText"] || "Formato non valido";
                }
                get helpText() {
                    return this.$scope["helpText"] || null;
                }
                get hasHelpText() {
                    return this.helpText != null;
                }
                get hasMaxLength() {
                    return this.maxLength != null;
                }
                get maxLength() {
                    return this.$scope["maxLength"] || null;
                }
                get placeholder() {
                    return this.$scope["placeholder"] || null;
                }
                get multiline() {
                    return this.type && this.type === "textarea";
                }
                get debug() {
                    return this.$scope.hasOwnProperty("debug");
                }
                get min() {
                    return this.$scope["min"] || null;
                }
                get max() {
                    return this.$scope["max"] || null;
                }
                get IsSelect(): boolean {
                    return this.type === "select";
                }
                get IsInputNumber(): boolean {
                    return this.type === "number";
                }
                get IsInputDate(): boolean {
                    return this.type === "date";
                }
                get IsInputFile(): boolean {
                    return this.type === "file";
                }
                get IsInputCheckbox(): boolean {
                    return this.type === "checkbox";
                }
                get minMaxEnabled() {
                    return this.IsInputDate || this.IsInputNumber;
                }
                get addonLeft() {
                    return this.$scope["addonLeft"] || null;
                }
                get addonRight() {
                    return this.$scope["addonRight"] || null;
                }
                get hasAddonLeft() {
                    return this.addonLeft != null;
                }
                get hasAddonRight() {
                    return this.addonRight != null;
                }
                get hasAnyAddon() {
                    return [this.hasAddonLeft, this.hasAddonRight].some(x => x);
                }
                get options() {
                    return this.$scope["options"] || [];
                }
                get optionsLabel() {
                    return this.$scope["optionsLabel"] || "Name";
                }
                get optionsValue() {
                    return this.$scope["optionsValue"] || "Value";
                }
                get optionsGroup() {
                    return this.$scope["optionsGroup"] || null;
                }
                get optionsExpression() {
                    return `item[${this.directiveInfo.controllerAs}.optionsValue] as item[${this.directiveInfo.controllerAs}.optionsLabel] ${this.optionsGroup != null ? `group by item[${this.directiveInfo.controllerAs}.optionsGroup] ` : ""}for item in ${this.directiveInfo.controllerAs}.options`
                }
                get autocomplete() {
                    return this.$scope["autocomplete"] ? this.$scope["autocomplete"] : false;
                }

                static directive() {
                    return <angular.IDirective>{
                        controller: InputCtrl,
                        controllerAs: "Ctrl",
                        replace: true,
                        template: InputCtrl.template,
                        scope: {
                            auInput: "=",
                            required: "=?",
                            label: "=?",
                            type: "=?",
                            requiredText: "=?",
                            patternText: "=?",
                            pattern: "=?",
                            helpText: "=?",
                            maxLength: "=?",
                            placeholder: "=?",
                            min: "=?",
                            max: "=?",
                            filename: "=?",
                            addonLeft: "=?",
                            addonRight: "=?",
                            debug: "=?",
                            options: "=?",
                            optionsLabel: "=?",
                            optionsValue: "=?",
                            optionsGroup: "=?",
                            autocomplete: "=?"
                        }
                    };
                }
            }

          
        }
    
}

(() => {

    angular.module(Au.moduleName, [])
        .factory(Au.Http.HttpEvents.InterceptorName, Au.Http.HttpEvents)
        .config(Au.Http.HttpEventsConfig)
        .directive(Au.Http.ToggleOnHttpActivity.DirectiveName, Au.Http.ToggleOnHttpActivity.Directive)
        .directive(Au.Input.InputCtrl.directiveName, Au.Input.InputCtrl.directive)
        .service(Au.Button.ActionButtonConfig.serviceName, Au.Button.ActionButtonConfig)
        .directive(Au.Button.ActionButtonCtrl.directiveName, Au.Button.ActionButtonCtrl.directive)
        .directive("fileread", ["$timeout", ($timeout: angular.ITimeoutService) => {
            //http://stackoverflow.com/questions/17063000/ng-model-for-input-type-file
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
                    element.on("change", (changeEvent) => {
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
            }
        }]);
})();