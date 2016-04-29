declare module Au {
    module Utils {
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
        interface ILocationSearchNormalizer {
            ArrayProperties: string[];
            BooleanProperties: string[];
        }
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
