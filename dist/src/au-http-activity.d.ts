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
