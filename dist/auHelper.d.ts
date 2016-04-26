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
            onScopeDispose($scope: angular.IScope): ng.IPromise<{}>;
            getRouteParamsAsNumber(name: string): number;
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
