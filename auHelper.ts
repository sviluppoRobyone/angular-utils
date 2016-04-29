module Au {
    export module Utils {
        export class ngUtils {
            args: any = null;
            static serviceName="ngUtils";
            static $inject = ["$injector"];
            private store={};
            constructor(...args) {
                this.args = args;
                Object.defineProperty(this, "args", { enumerable: false });
    
            }
            private getFromInject<T>(key:string) {
                if (!this.store[key])
                    this.store[key] = this.$injector.get<T>(key);

                    return this.store[key];

            }
            get $injector(): angular.auto.IInjectorService {
                return this.args[0];
            }
            get $http(): angular.IHttpService {
                return this.getFromInject("$http");
            }
            get $location(): angular.ILocationService {
                return this.getFromInject("$location");
            }
            get $routeParams(): angular.route.IRouteParamsService {
                return this.getFromInject("$routeParams");
            }
            get $q(): angular.IQService {
                return this.getFromInject("$q");
            }
            get $filter(): angular.IFilterService {
                return this.getFromInject("$filter");
            }
            get $route(): angular.route.IRouteService {
                return this.getFromInject("$route");
            }
            get $timeout(): angular.ITimeoutService {
                return this.getFromInject("$timeout");
            }
            get $ngView(): JQuery {
                return $("[ng-view]");
            }
            get $cacheFactory(): angular.ICacheFactoryService {
                return this.getFromInject("$cacheFactory");
            }
            get $locale(): angular.ILocaleService {
                return this.getFromInject("$cacheFactory");
            }
            get $interval(): angular.IIntervalService {
                return this.getFromInject("$interval");
            }
            get $log(): angular.ILogService {
                return this.getFromInject("$log");
            }

            manageAjaxLoading(before: Function, ajax: (ok: angular.IQResolveReject<any>, ko: angular.IQResolveReject<any>) => void, after: Function) {

                var qBefore = this.$q.defer();
                var qAjax = this.$q.defer();
                var qAfter = this.$q.defer();

                var doBefore = () => {
                    this.$timeout(() => {
                        before && before();
                    }).then(() => {
                        qBefore.resolve();
                    });
                }
                var doAfter = () => {
                    this.$timeout(() => {
                        after && after();
                    }).then(() => {
                        qAfter.resolve();
                    });
                }
                qBefore.promise.then(() => {
                    ajax(qAjax.resolve, qAjax.reject);
                });
                qAjax.promise.then(() => {
                    doAfter();
                });

                return this.$q((ok, ko) => {
                    qAfter.promise.then(() => {
                        ok();
                    });
                    doBefore();
                })
            }

            normalizeLocationSearch<T>(baseObj: T, cfg: ILocationSearchNormalizer): T {

                var s = this.$location.search();

                (cfg.BooleanProperties||[]).forEach(p => {
                    //dall'url mi perdo il valore boolean, mi arrivano come stringhe
                    if (s[p] && angular.isString(s[p])) {
                        s[p] = s[p] == "True";
                    }
                });
                //this.$ngUtils.$log.info(this.ModuloRicerca);
                //se l'array è di un solo elemento mi arriva come stringa
                (cfg.ArrayProperties || []).forEach(p => {
                    
                    if (s[p] && angular.isString(s[p])) {
                        s[p]=[s[p]];
                    }
                   
                });

                angular.merge(baseObj, s);
                return baseObj;
            }
            onScopeDispose($scope: angular.IScope) {
                var q = this.$q.defer();
                $scope.$on("$destroy", () => {
                    q.resolve();
                });
                return q.promise;
            }

            getRouteParamsAsNumber(name: string): number {
                return parseInt(this.$routeParams[name] ? this.$routeParams[name] : "0");
            }
        }
        export interface ILocationSearchNormalizer {
            ArrayProperties?: string[],
            BooleanProperties?: string[],

        }
        export class CtrlLoading {
            static DirectiveName = "auLoading";
            static $inject=["$scope"];
            get scopeSpacing() {
                return this.$scope.hasOwnProperty("spacing") ? parseInt(this.$scope["spacing"]) : 3;
            }
            get iconSize() {
                return this.$scope.hasOwnProperty("iconSize") ? parseInt(this.$scope["iconSize"]) : 2;
            }
            get iconName() {
                return this.$scope.hasOwnProperty("iconName") ? this.$scope["iconName"] : "circle-o-notch";
            }
            spaceArray:any[]=[];
            constructor(...args) {
                this.args = args;
                this.Init();
            }
            Init() {
                this.spaceArray = [];
                for (var i = 0; i < this.scopeSpacing; i++) {
                    this.spaceArray.push(i);
                }
                
                
            }
            args:any[];
            get $scope():angular.IScope {
                return this.args[0];
            }
            static Directive(): angular.IDirective {
                return <angular.IDirective>{
                    template: `
                        <div class="text-center">
                                     <br ng-repeat="n in Ctrl.spaceArray" />   
                                <i class="fa fa-spin fa-{{Ctrl.iconName}} fa-{{Ctrl.iconSize}}x"></i>
                                    <br ng-repeat="n in Ctrl.spaceArray" />               
    
                        </div>

                    `,
                    controller: CtrlLoading,
                    replace:true,
                    controllerAs: "Ctrl",
                    scope: {
                        spacing: "=?",
                        iconSize: "=?",
                        iconName:"=?"
                    }

                };
            }
        }
    }
}

(() => {
    var app = angular.module(Au.moduleName);

    app.directive(Au.Utils.CtrlLoading.DirectiveName, Au.Utils.CtrlLoading.Directive);
    app.service(Au.Utils.ngUtils.serviceName,Au.Utils.ngUtils)
})();
 
