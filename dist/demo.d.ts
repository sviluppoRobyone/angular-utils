declare module angularUtils {
    module demo {
        interface Idata {
            textInput: string;
            numberInput: number;
            booleanInput: boolean;
            patternInput: string;
            fileContent: string;
            dateInput: Date;
            fileName: string;
        }
        class DemoController {
            static $inject: string[];
            data: Idata;
            pattern: RegExp;
            args: any;
            constructor(...args: any[]);
            $q: angular.IQService;
            $timeout: angular.ITimeoutService;
            Update(): ng.IPromise<{}>;
        }
    }
}