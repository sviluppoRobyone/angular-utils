module au {
    export module httpActivity {

        export class HttpEvents {
            static InterceptorName = "httpEventInterceptor";
            static EventProgress="loading:progress";
            static EventFinish="loading:finish";


            get $q(): angular.IQService {
                return this.$injector.get<angular.IQService>("$q");
            }

            get $rootScope(): angular.IRootScopeService {
                return this.$injector.get<angular.IRootScopeService>("$rootScope");
            }

            get $log(): angular.ILogService {
                return this.$injector.get<angular.ILogService>("$log");
            }

            private $injector: angular.auto.IInjectorService = null;

            constructor($injector: angular.auto.IInjectorService) {
                this.$injector = $injector;

                this.$rootScope.$on(HttpEvents.EventProgress,
                () => {
                    //this.$log.debug("Detect loading progress");
                });

                this.$rootScope.$on(HttpEvents.EventFinish,
                () => {
                    //this.$log.debug("Detect loading finish");
                });
                this.$rootScope.$watch(() => this.loadingCount,
                () => {
                    //this.$log.debug("Ajax count change ", this.loadingCount);
                })
            }


            private loadingCount: number=0;
            public request = (config) => {
                // this.$log.debug("get new request");
                this.loadingCount++;
                if (this.loadingCount) {
                    //   this.$log.debug("Trigger loading progress");
                    this.$rootScope.$broadcast(HttpEvents.EventProgress);

                }
                return config || this.$q.when(config);
            }
            public response = (response) => {
                //this.$log.debug("get new response");
                this.loadingCount--;
                if (!this.loadingCount) {
                    //  this.$log.debug("Trigger loading progress");
                    this.$rootScope.$broadcast(HttpEvents.EventFinish);
                }
                return response || this.$q.when(response);
            }
            public responseError = (response) => {
                //this.$log.debug("get new response error");
                this.loadingCount--;
                if (!this.loadingCount) {
                    // this.$log.debug("Trigger loading finish");
                    this.$rootScope.$broadcast(HttpEvents.EventFinish);
                }
                return this.$q.reject(response);
            }
        }

        export class HttpEventsConfig {

            private $injector: angular.auto.IInjectorService=null;

            private get $httpProvider(): angular.IHttpProvider {
                return this.$injector.get<angular.IHttpProvider>("$httpProvider");
            }

            constructor($injector: angular.auto.IInjectorService) {
                this.$injector = $injector;
                this.Init();
            }

            Init() {

                this.$httpProvider.interceptors.push(HttpEvents.InterceptorName);

            }
        }
         export class ToggleOnHttpActivity {
            static DirectiveName:string="auHttpActivity";
            static Directive(): angular.IDirective {
                

                    var fn: angular.IDirectiveLinkFn = (s, e) => {
                        e.addClass("hidden");
                        s.$root.$on(HttpEvents.EventProgress, () => {
                            e.removeClass("hidden");
                        });
                        s.$root.$on(HttpEvents.EventFinish, () => {
                            e.addClass("hidden");
                        });
                    };
                    return <angular.IDirective>{
                        link: fn,
                        restrict: "A"

                    };
                
            }
        }
    }
}

(() => {
    angular.module(au.moduleName)
    .factory(au.httpActivity.HttpEvents.InterceptorName, [
            "$injector", ($injector: angular.auto.IInjectorService) => {
                return new au.httpActivity.HttpEvents($injector);
            }
        ])
        .config([
            "$injector", ($injector: angular.auto.IInjectorService) => {
                new au.httpActivity.HttpEventsConfig($injector)
            }
        ])
         .directive(au.httpActivity.ToggleOnHttpActivity.DirectiveName, au.httpActivity.ToggleOnHttpActivity.Directive)
})();