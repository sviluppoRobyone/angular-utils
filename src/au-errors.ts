module au {
    export module errors {
        import IHttpPromiseCallbackArg = angular.IHttpPromiseCallbackArg;

        export interface IGetErrors<T> {
            (promise: angular.IDeferred<string[]>, resp: angular.IHttpPromiseCallbackArg<T>): void
        }

        export var defaultError: IGetErrors<any> = (promise, resp) => {
            promise.resolve(["An error occurred"]);
        };

        export module dotnet {
            export interface IModelState {
                Message: string,
                ModelState: { [p: string]: string[] }
            }
        }

        export var dotnetMvcError: IGetErrors<dotnet.IModelState> = (promise, response) => {
            if (response.data.ModelState) {
                var errors: string[] = [];
                for (var k in response.data.ModelState) {
                    if (response.data.ModelState.hasOwnProperty(k) && response.data.ModelState[k] instanceof Array) {

                        var prepend = ((typeof k == typeof "") && (<string>k).length > 0) ? k + ": " : "";
                        response.data.ModelState[k].forEach(e => {

                            errors.push(prepend + e);
                        });

                    }
                }
                promise.resolve(errors);
            }
        }
    }
}