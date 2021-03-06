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
