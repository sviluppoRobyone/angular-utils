declare module Au {
    module Datepicker {
        class DatepickerFallback {
            static $inject: string[];
            private args;
            constructor(...args: any[]);
            modalHtml: string;
            DateSupport: boolean;
            Init(): void;
        }
    }
}
