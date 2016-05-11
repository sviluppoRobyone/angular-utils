declare module au {
    module button {
        class ActionButtonConfig {
            static serviceName: string;
            getErrors: au.errors.IGetErrors<any>;
        }
        class ActionButton {
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
}

declare module au {
    module clickOnKeyEnter {
        function Directive(): angular.IDirective;
        var name: string;
    }
}


declare module au {
    var moduleName: string;
}

declare module au {
    module datepicker {
        class DatepickerFallback {
            static $inject: string[];
            private args;
            constructor(...args: any[]);
            modalHtml: string;
            DateSupport: boolean;
            Init(): void;
        }
    }
}

declare module au {
    module errors {
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
}

declare module au {
    module fileRead {
        var directiveName: string;
        function Core($timeout: angular.ITimeoutService): ng.IDirective;
    }
}

declare module au {
    module httpActivity {
        class HttpEvents {
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
}

declare module au {
    module httpDateParser {
        class Intercept implements angular.IHttpInterceptor {
            static InterceptorName: string;
            $q: angular.IQService;
            $log: angular.ILogService;
            private $injector;
            private stringType;
            private objectType;
            constructor($injector: angular.auto.IInjectorService);
            private regexList;
            private ApplyFix(obj);
            private SearchObj(obj);
            response: (response: ng.IHttpPromiseCallbackArg<any>) => ng.IHttpPromiseCallbackArg<any> | ng.IPromise<ng.IHttpPromiseCallbackArg<any>>;
        }
        class InterceptConfig {
            private $injector;
            private $httpProvider;
            constructor($injector: angular.auto.IInjectorService);
            Init(): void;
        }
    }
}

declare module au {
    module input {
        class bootstrapTemplate {
            formName: string;
            fieldName: string;
            content: string;
        }
        abstract class StandardInput {
            private args;
            static $inject: string[];
            templateCfg: bootstrapTemplate;
            directiveName: string;
            type: string;
            GetTemplate(): string;
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
                readonly: any;
                requiredText: any;
                pattern: any;
                hasPattern: boolean;
                patternText: any;
                hasMaxLength: boolean;
                maxLength: any;
                hasMinLength: boolean;
                minLength: any;
                hasHelpText: boolean;
                helpText: any;
                min: any;
                form: ng.IFormController;
                max: any;
                type: string;
                options: any;
                optionsValue: any;
                optionsLabel: any;
                optionsExpression: string;
                compare: any;
                hasCompare: boolean;
            };
            hasCompare: boolean;
            compare: any;
            optionsExpression: string;
            options: any;
            optionsLabel: any;
            optionsValue: any;
            min: any;
            max: any;
            label: any;
            hasLabel: boolean;
            model: any;
            filename: any;
            required: any;
            readonly: any;
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
            hasMinLength: boolean;
            minLength: any;
            placeholder: any;
            GetController(): typeof StandardInput;
            directive(): ng.IDirective;
        }
        class TextInput extends StandardInput {
            GetController(): typeof TextInput;
            constructor(...args: any[]);
        }
        class EmailInput extends StandardInput {
            GetController(): typeof EmailInput;
            constructor(...args: any[]);
        }
        class PasswordInput extends StandardInput {
            GetController(): typeof PasswordInput;
            constructor(...args: any[]);
        }
        class DateInput extends StandardInput {
            GetController(): typeof DateInput;
            constructor(...args: any[]);
        }
        class NumberInput extends StandardInput {
            GetController(): typeof NumberInput;
            constructor(...args: any[]);
        }
        class CheckboxInput extends StandardInput {
            GetController(): typeof CheckboxInput;
            constructor(...args: any[]);
            GetTemplate(): string;
        }
        class FileInput extends StandardInput {
            GetTemplate(): string;
            GetController(): typeof FileInput;
            constructor(...args: any[]);
        }
        class SelectInput extends StandardInput {
            GetTemplate(): string;
            GetController(): typeof SelectInput;
            constructor(...args: any[]);
        }
        class TextAreaInput extends StandardInput {
            constructor(...args: any[]);
            GetController(): typeof TextAreaInput;
            GetTemplate(): string;
        }
    }
}

declare module au {
    module loading {
        class CtrlLoading {
            static DirectiveName: string;
            static $inject: string[];
            scopeSpacing: number;
            iconSize: number;
            iconName: any;
            spaceArray: any[];
            constructor(...args: any[]);
            Init(): void;
            args: any[];
            $scope: angular.IScope;
            static Directive(): angular.IDirective;
        }
    }
}

declare module au {
    module ngUtils {
        interface ILocationSearchNormalizer {
            ArrayProperties?: string[];
            BooleanProperties?: string[];
        }
        class ngUtils {
            args: any;
            static serviceName: string;
            static $inject: string[];
            private store;
            constructor(...args: any[]);
            private getFromInject<T>(key);
            $injector: angular.auto.IInjectorService;
            $http: angular.IHttpService;
            $location: angular.ILocationService;
            $routeParams: angular.route.IRouteParamsService;
            $q: angular.IQService;
            $filter: angular.IFilterService;
            $route: angular.route.IRouteService;
            $timeout: angular.ITimeoutService;
            $ngView: JQuery;
            $cacheFactory: angular.ICacheFactoryService;
            $locale: angular.ILocaleService;
            $interval: angular.IIntervalService;
            $log: angular.ILogService;
            manageAjaxLoading(before: Function, ajax: (ok: angular.IQResolveReject<any>, ko: angular.IQResolveReject<any>) => void, after: Function): ng.IPromise<{}>;
            normalizeLocationSearch<T>(baseObj: T, cfg: ILocationSearchNormalizer): T;
            onScopeDispose($scope: angular.IScope): ng.IPromise<{}>;
            getRouteParamsAsNumber(name: string): number;
        }
    }
}
