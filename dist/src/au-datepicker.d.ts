declare module au {
    module datepicker {
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
