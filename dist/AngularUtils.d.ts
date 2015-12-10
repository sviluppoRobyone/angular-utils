declare module Au {
    module Errors {
        import IHttpPromiseCallbackArg = angular.IHttpPromiseCallbackArg;
        interface IGetErrors<T> {
            (promise: angular.IDeferred<string[]>, resp: T): void;
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
        var dotnetMvcError: IGetErrors<IHttpPromiseCallbackArg<dotnet.IModelState>>;
    }
    module Button {
        class ActionButtonConfig {
            getErrors: Errors.IGetErrors<any>;
        }
        class ActionButtonCtrl {
            args: any[];
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
            static Directive(): ng.IDirective;
        }
    }
    module Input {
        class InputCtrl {
            static fieldName: string;
            static formName: string;
            static template: string;
            args: any[];
            static $inject: string[];
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
            static Directive(): ng.IDirective;
        }
    }
}
