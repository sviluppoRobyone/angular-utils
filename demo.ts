module angularUtils {
    export module demo {

        export interface Idata {
            textInput: string;
            numberInput: number;
            booleanInput: boolean;
            patternInput:string;
            fileContent: string;
            dateInput:Date;
            fileName:string;
        }

        export class DemoController {
            static $inject = ["$q","$timeout"];

            data:Idata={
                booleanInput: false,
                numberInput: 0,
                patternInput:null,
                textInput: "",
                dateInput:null,
                fileContent: null,
                fileName:null
            };
            pattern=/^\w+\.\w+$/;
            args:any=null;
            constructor(...args) {
                this.args = args;
               
            }
            get $q(): angular.IQService{
                return this.args[0];

            }
            get $timeout(): angular.ITimeoutService {
                return this.args[1];

            }
            Update() {
                var _q = this.$q.defer();

                this.$timeout(() => {
                    _q.resolve();

                }, 4000);

                return _q.promise;

            }
            
        }
    }
}

angular
    .module("angularUtilsDemo", ["angularUtils"])
    .controller("demoContoller", angularUtils.demo.DemoController);