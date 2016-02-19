declare module Au {
    var moduleName: string;
    module Http {
        class HttpEvents implements angular.IHttpInterceptor {
            static InterceptorName: string;
            static EventProgress: string;
            static EventFinish: string;
            $q: angular.IQService;
            $rootScope: angular.IRootScopeService;
            $log: angular.ILogService;
            private $injector;
            constructor($injector: angular.auto.IInjectorService);
            private loadingCount;
            request: (config: any) => any;
            response: (response: any) => any;
            responseError: (response: any) => ng.IPromise<any>;
        }
        class HttpEventsConfig {
            private $injector;
            private $httpProvider;
            constructor($injector: angular.auto.IInjectorService);
            Init(): void;
        }
        class ToggleOnHttpActivity {
            static DirectiveName: string;
            static Directive(): angular.IDirective;
        }
    }
    module Errors {
        interface IGetErrors<T> {
            (promise: angular.IDeferred<string[]>, resp: angular.IHttpPromiseCallbackArg<T>): void;
        }
        var defaultError: IGetErrors<any>;
        module dotnet {
            interface IModelState {
                Message: string;
                ModelState: {
                    [p: string]: string[];
                };
            }
        }
        var dotnetMvcError: IGetErrors<dotnet.IModelState>;
    }
    module Button {
        class ActionButtonConfig {
            static serviceName: string;
            getErrors: Errors.IGetErrors<any>;
        }
        class ActionButtonCtrl {
            static directiveName: string;
            private args;
            static $inject: string[];
            constructor(...args: any[]);
            static template: string;
            $q: angular.IQService;
            auButtonConfig: ActionButtonConfig;
            $scope: angular.IScope;
            $element: JQuery;
            $timeout: angular.ITimeoutService;
            form: angular.IFormController;
            hasForm: boolean;
            text: string;
            enabled: boolean;
            action: any;
            time: number;
            type: any;
            confirm: any;
            running: boolean;
            done: boolean;
            error: boolean;
            Click(): void;
            static directive(): ng.IDirective;
        }
    }
    module Input {
        class InputCtrl {
            static directiveName: string;
            static fieldName: string;
            static formName: string;
            static template: string;
            private args;
            static $inject: string[];
            private directiveInfo;
            constructor(...args: any[]);
            $scope: angular.IScope;
            $form: angular.IFormController;
            field: angular.INgModelController;
            ready: boolean;
            noFeedback: boolean;
            hasErrorClass: boolean;
            hasSuccessClass: boolean;
            hasWarnigClass: boolean;
            hasRequiredIcon: boolean;
            hasFeedbackIcon: boolean;
            json: {
                label: any;
                hasLabel: boolean;
                model: any;
                required: any;
                requiredText: any;
                pattern: any;
                hasPattern: boolean;
                patternText: any;
                hasMaxLength: boolean;
                maxLength: any;
                hasHelpText: boolean;
                helpText: any;
                min: any;
                form: ng.IFormController;
                max: any;
                type: any;
                options: any;
                optionsGroup: any;
                optionsValue: any;
                optionsLabel: any;
                optionsExpression: string;
            };
            label: any;
            hasLabel: boolean;
            model: any;
            filename: any;
            required: any;
            type: any;
            hasPattern: boolean;
            private defaultPattern;
            getPattern(): any;
            pattern: any;
            requiredText: any;
            patternText: any;
            helpText: any;
            hasHelpText: boolean;
            hasMaxLength: boolean;
            maxLength: any;
            placeholder: any;
            multiline: boolean;
            debug: boolean;
            min: any;
            max: any;
            IsSelect: boolean;
            IsInputNumber: boolean;
            IsInputDate: boolean;
            IsInputFile: boolean;
            IsInputCheckbox: boolean;
            minMaxEnabled: boolean;
            addonLeft: any;
            addonRight: any;
            hasAddonLeft: boolean;
            hasAddonRight: boolean;
            hasAnyAddon: boolean;
            options: any;
            optionsLabel: any;
            optionsValue: any;
            optionsGroup: any;
            optionsExpression: string;
            autocomplete: any;
            static directive(): ng.IDirective;
        }
    }
}
