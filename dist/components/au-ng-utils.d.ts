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
            protected getFromInject<T>(key: string): any;
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
