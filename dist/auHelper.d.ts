declare module Au {
    module Utils {
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
