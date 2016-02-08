module Au {
    export module HttpDateFix {
        
        export class Intercept implements angular.IHttpInterceptor {

            static InterceptorName = "dateFixInterceptor";



            get $q(): angular.IQService {
                return this.$injector.get<angular.IQService>("$q");
            }
           
            private $injector: angular.auto.IInjectorService = null;
            
            private stringType= typeof "";
            private objectType = typeof {};

            constructor($injector: angular.auto.IInjectorService) {
                this.$injector = $injector;

               
            }

            private regexList: RegExp[] = [
                /^\d{4}\-\d{2}\-\d{2}T\d{2}:\d{2}:\d{2}$/
            ];
            private  ApplyFix(obj: string) {
                obj = <string><any>(new Date(obj));
            }
            private SearchObj(obj: any): number {
                if (!obj) return 0;
                var t = typeof obj;
                if (t == this.stringType) {

                    if (this.regexList.some(r => r.exec(obj) !== null)) {

                        this.ApplyFix(obj);
                        return 1;
                    }
                }
                
                if (Array.isArray(obj)) {
                    return (<Array<any>>obj).map(p => this.SearchObj(p)).reduce((a, b) => {
                        return a + b;
                    },0);
                }

                if (t == this.objectType) {
                    var res = 0;
                    for (var propertyName in obj) {
                        if (obj[propertyName])
                            res += this.SearchObj(obj[propertyName]);
                    }
                    return res;
                }
            }
           
            public response = (response: angular.IHttpPromiseCallbackArg<any>) => {

                this.SearchObj(response.data);
                return response || this.$q.when(response);

            }
           

        }
        export class InterceptConfig {

            private $injector: angular.auto.IInjectorService = null;
            private get $httpProvider(): angular.IHttpProvider {
                return this.$injector.get<angular.IHttpProvider>("$httpProvider");
            }
            constructor($injector: angular.auto.IInjectorService) {
                this.$injector = $injector;
                this.Init();
            }
            Init() {

                this.$httpProvider.interceptors.push(Intercept.InterceptorName);

            }
        }
    }
}

(() => {
    angular.module(Au.moduleName)
        .factory(Au.HttpDateFix.Intercept.InterceptorName, ["$injector", ($injector: angular.auto.IInjectorService) => {
            return new Au.HttpDateFix.Intercept($injector);
        }])
        .config(["$injector", ($injector: angular.auto.IInjectorService) => {
            new Au.HttpDateFix.InterceptConfig($injector);
        }])
})();