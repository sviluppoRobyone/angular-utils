declare module au {
    module input {
        class bootstrapTemplate {
            formName: string;
            fieldName: string;
            content: string;
        }
        abstract class StandardInput {
            private args;
            static $inject: string[];
            templateCfg: bootstrapTemplate;
            directiveName: string;
            type: string;
            GetTemplate(): string;
            constructor(...args: any[]);
            $scope: angular.IScope;
            $form: angular.IFormController;
            field: angular.INgModelController;
            ready: boolean;
            noFeedback: boolean;
            hasErrorClass: boolean;
            hasSuccessClass: boolean;
            hasWarnigClass: boolean;
            brand: any;
            hasRequiredIcon: boolean;
            hasFeedbackIcon: boolean;
            json: {
                label: any;
                hasLabel: boolean;
                model: any;
                required: any;
                readonly: any;
                requiredText: any;
                pattern: any;
                hasPattern: boolean;
                patternText: any;
                hasMaxLength: boolean;
                maxLength: any;
                hasMinLength: boolean;
                minLength: any;
                hasHelpText: boolean;
                helpText: any;
                min: number;
                form: ng.IFormController;
                max: number;
                type: string;
                options: any;
                optionsValue: any;
                optionsLabel: any;
                optionsExpression: string;
                compare: any;
                hasCompare: boolean;
            };
            hasCompare: boolean;
            compare: any;
            optionsExpression: string;
            options: any;
            optionsLabel: any;
            optionsValue: any;
            GetNumberValueOrNull(key: string): number;
            min: number;
            max: number;
            label: any;
            hasLabel: boolean;
            model: any;
            filename: any;
            required: any;
            readonly: any;
            hasPattern: boolean;
            private defaultPattern;
            getPattern(): any;
            pattern: any;
            requiredText: any;
            patternText: any;
            helpText: any;
            hasHelpText: boolean;
            hasMaxLength: boolean;
            maxLength: any;
            hasMinLength: boolean;
            minLength: any;
            placeholder: any;
            addonLeft: any;
            addonRight: any;
            hasAddon: boolean;
            GetController(): typeof StandardInput;
            directive(): ng.IDirective;
        }
        class TextInput extends StandardInput {
            GetController(): typeof TextInput;
            constructor(...args: any[]);
        }
        class EmailInput extends StandardInput {
            GetController(): typeof EmailInput;
            constructor(...args: any[]);
        }
        class PasswordInput extends StandardInput {
            GetController(): typeof PasswordInput;
            constructor(...args: any[]);
        }
        class DateInput extends StandardInput {
            GetController(): typeof DateInput;
            constructor(...args: any[]);
        }
        class NumberInput extends StandardInput {
            GetController(): typeof NumberInput;
            constructor(...args: any[]);
        }
        class CheckboxInput extends StandardInput {
            GetController(): typeof CheckboxInput;
            constructor(...args: any[]);
            GetTemplate(): string;
        }
        class AwesomeCheckboxInput extends StandardInput {
            GetController(): typeof AwesomeCheckboxInput;
            rndId: string;
            constructor(...args: any[]);
            GetTemplate(): string;
        }
        class FileInput extends StandardInput {
            GetTemplate(): string;
            GetController(): typeof FileInput;
            constructor(...args: any[]);
        }
        class SelectInput extends StandardInput {
            GetTemplate(): string;
            GetController(): typeof SelectInput;
            constructor(...args: any[]);
        }
        class TextAreaInput extends StandardInput {
            constructor(...args: any[]);
            GetController(): typeof TextAreaInput;
            GetTemplate(): string;
        }
    }
}
