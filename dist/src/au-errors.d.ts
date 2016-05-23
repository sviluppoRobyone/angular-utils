declare module au {
    module errors {
        interface IGetErrors<T> {
            (promise: angular.IDeferred<string[]>, resp: angular.IHttpPromiseCallbackArg<T>): void;
        }
        var defaultError: IGetErrors<any>;
        module dotnet {
            interface IModelState {
                Message: string;
                ModelState: {
                    [p: string]: string[];
                };
            }
        }
        var dotnetMvcError: IGetErrors<dotnet.IModelState>;
    }
}
