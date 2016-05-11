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
