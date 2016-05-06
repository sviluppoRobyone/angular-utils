﻿module Au {
    export module HttpDateFix {
        
        export class Intercept implements angular.IHttpInterceptor {

            static InterceptorName = "dateFixInterceptor";



            get $q(): angular.IQService {
                return this.$injector.get<angular.IQService>("$q");
            }
            get $log(): angular.ILogService {
                return this.$injector.get<angular.ILogService>("$log");
            }
            private $injector: angular.auto.IInjectorService = null;
            
            private stringType= typeof "";
            private objectType = typeof {};

            constructor($injector: angular.auto.IInjectorService) {
                this.$injector = $injector;

               
            }

            private regexList: RegExp[] = [
                /^\d{4}\-\d{2}\-\d{2}T\d{2}:\d{2}:\d{2}$/, //2016-02-18T23:00:00
                /^\d{4}\-\d{2}\-\d{2}T\d{2}:\d{2}:\d{2}(\.{1}\d{1,})?\d$/  //2016-02-18T23:00:00.00000
            ];
            private ApplyFix(obj: string) :Date {
                //this.$log.debug(Intercept.InterceptorName, "Apply ", obj);
               return new Date(obj);
            }
            private SearchObj(obj: any): any {
               // this.$log.debug(Intercept.InterceptorName, "Search: ", obj);
               
                if (!obj) return 0;
                var t = typeof obj;
                //this.$log.debug(Intercept.InterceptorName, "Type ", t);
                if (t == this.stringType) {

                    if (this.regexList.some(r => r.exec(obj) !== null)) {

                        return this.ApplyFix(obj);
                   
                    }
                }
              
                if (Array.isArray(obj)) {
                  //  this.$log.debug(Intercept.InterceptorName, "Is Array", (<Array<any>>obj).length);
                    return (<Array<any>>obj).map(p => this.SearchObj(p));
                }

                if (t == this.objectType) {

                 
                    for (var propertyName in obj) {
                    //    this.$log.debug(Intercept.InterceptorName, "Property["+propertyName+"]");
                        if (obj[propertyName])
                            obj[propertyName]= this.SearchObj(obj[propertyName]);
                    }
                    return obj;
                }
            }
           
            public response = (response: angular.IHttpPromiseCallbackArg<any>) => {
                
        
                if (response.headers("Content-Type") && response.headers("Content-Type").indexOf("application/json") > -1) {
                   // this.$log.debug(Intercept.InterceptorName, "Response: ", response);
                    response.data=this.SearchObj(response.data);
                }
               
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