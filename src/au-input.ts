module au {
    export module input {

        export class bootstrapTemplate {
            formName: string = "_form";
            fieldName: string = "_input";
            content: string="";

        }

        export abstract class StandardInput {
            private args: any[] = [];
            static $inject = ["$scope"];
            templateCfg: bootstrapTemplate=new bootstrapTemplate();
            directiveName:string="auInput";
            type="text";


            GetTemplate() {
                return StandardFormGroup(`

       
                <input ng-readonly="Ctrl.readonly" type="${this.type}" ng-model="Ctrl.model" class="form-control" name="${this.templateCfg.fieldName}" ng-attr-maxlength="{{Ctrl.hasMaxLength?Ctrl.maxLength:undefined}}" ng-attr-minlength="{{Ctrl.hasMinLength?Ctrl.minLength:undefined}}" ng-pattern="Ctrl.getPattern()" ng-required="Ctrl.required" ng-attr-placeholder="{{Ctrl.placeholder?Ctrl.placeholder:undefined}}" ng-attr-min="{{Ctrl.minMaxEnabled && Ctrl.min ?Ctrl.min:undefined}}"  ng-attr-max="{{Ctrl.minMaxEnabled && Ctrl.max ? Ctrl.max:undefined}}" ng-attr-compare-to="Ctrl.hasCompare?Ctrl.compare:undefined" />
                
       
     


`);
            }

            constructor(...args) {
                this.args = args;


            }

            get $scope(): angular.IScope {
                return this.args[0];
            }

            get $form(): angular.IFormController {
                return this.$scope[this.templateCfg.formName] || null;
            }

            get field(): angular.INgModelController {
                return this.$form[this.templateCfg.fieldName] || null;
            }

            get ready(): boolean {
                return true && this.$form != null && this.field != null;
            }

            get noFeedback() {
                return this.ready && this.field.$valid && this.field.$pristine;
            }

            get hasErrorClass() {
                return this.ready && !this.noFeedback && this.field.$invalid && this.field.$dirty;
            }

            get hasSuccessClass() {
                return this.ready && !this.noFeedback && this.field.$valid;
            }

            get hasWarnigClass() {
                return this.ready && !this.noFeedback && this.field.$invalid && !this.field.$pristine;
            }

            get hasRequiredIcon() {
                return this.ready &&
                    !this.noFeedback &&
                    this.field.$error.required &&
                    this.required &&
                    this.field.$pristine;
            }

            get hasFeedbackIcon() {
                return this.ready &&
                    !this.noFeedback &&
                    (this.hasErrorClass || this.hasSuccessClass || this.hasRequiredIcon || this.hasWarnigClass);
            }

            get json() {
                return {
                    label: this.label,
                    hasLabel: this.hasLabel,
                    model: this.model,
                    required: this.required,
                    readonly: this.readonly,
                    requiredText: this.requiredText,
                    pattern: this.getPattern(),
                    hasPattern: this.hasPattern,
                    patternText: this.patternText,
                    hasMaxLength: this.hasMaxLength,
                    maxLength: this.maxLength,
                    hasMinLength: this.hasMinLength,
                    minLength: this.minLength,
                    hasHelpText: this.hasHelpText,
                    helpText: this.helpText,
                    min: this.min,
                    form: this.$form,
                    max: this.max,
                    type: this.type,
                    options: this.options,
                    optionsValue: this.optionsValue,
                    optionsLabel: this.optionsLabel,
                    optionsExpression: this.optionsExpression,
                    compare: this.compare,
                    hasCompare: this.hasCompare
                }
            }

            get hasCompare(): boolean {
                return this.$scope.hasOwnProperty("compare");
            }

            get compare() {
                //se non c'è confronto con se stesso e va sempre bene
                return this.hasCompare ? this.$scope["compare"] : this.model;
            }

            get optionsExpression() {
                var d = this.directive();
                return `item[${d.controllerAs}.optionsValue] as item[${d.controllerAs}.optionsLabel] for item in ${d.controllerAs}.options`
            }

            get options() {
                return this.$scope["options"] || [];
            }

            get optionsLabel() {
                return this.$scope["optionsLabel"] || "Name";
            }

            get optionsValue() {
                return this.$scope["optionsValue"] || "Value";
            }

            get min() {
                return this.$scope["min"] || null;
            }

            get max() {
                return this.$scope["max"] || null;
            }

            get label() {
                return this.$scope["label"] || null;
            }

            get hasLabel() {
                return this.label != null;
            }

            get model() {
                return this.$scope[this.directiveName];
            }

            set model(x) {
                this.$scope[this.directiveName] = x;
            }

            get filename() {
                return this.$scope["filename"];
            }

            set filename(x) {
                this.$scope["filename"] = x;
            }

            get required() {
                return true && this.$scope.hasOwnProperty("required") && this.$scope["required"];
            }

            get readonly() {
                return true && this.$scope.hasOwnProperty("readonly") && this.$scope["readonly"];
            }

            get hasPattern() {
                return this.pattern != null;
            }

            private defaultPattern=/.*/;

            getPattern() {
                return this.hasPattern ? this.pattern : this.defaultPattern;
            }

            get pattern() {
                return this.$scope["pattern"] || null;
            }

            get requiredText() {
                return this.$scope["requiredText"] || "Campo Richiesto";
            }

            get patternText() {
                return this.$scope["patternText"] || "Formato non valido";
            }

            get helpText() {
                return this.$scope["helpText"] || null;
            }

            get hasHelpText() {
                return this.helpText != null;
            }

            get hasMaxLength() {
                return this.maxLength != null;
            }

            get maxLength() {
                return this.$scope["maxLength"] || null;
            }


            get hasMinLength() {
                return this.minLength != null;
            }

            get minLength() {
                return this.$scope["minLength"] || null;
            }

            get placeholder() {
                return this.$scope["placeholder"] || null;
            }
            GetController() {
                return StandardInput;
            }
            directive() {

                var d = <angular.IDirective>{
                    controller: this.GetController(),
                    controllerAs: "Ctrl",
                    replace: true,
                    template:<any> GetBootstrapTemplate(angular.merge({},this.templateCfg, {content:this.GetTemplate()})),
                    scope: {
                        auInput: "=",
                        required: "=?",
                        readonly: "=?",
                        label: "@",
                        requiredText: "@",
                        patternText: "@",
                        pattern: "@",
                        helpText: "@",
                        maxLength: "=?",
                        minLength: "=?",
                        placeholder: "@",
                        min: "=?",
                        max: "=?",
                        filename: "=?",
                        addonLeft: "@",
                        addonRight: "@",
                        debug: "=?",
                        options: "=?",
                        optionsLabel: "@",
                        optionsValue: "@",
                        autocomplete: "=?",
                        compare: "=?"
                    }
                };
                d.scope[this.directiveName] = "=";
                return d;
            }
        }
        export class TextInput extends StandardInput{
                GetController() {
                return TextInput;
            }       
             constructor(...args) {
                super(...args);


                this.directiveName = "auText";
                 this.type = "text";


             }   
        }
         export class PasswordInput extends StandardInput{
                GetController() {
                return PasswordInput;
            }       
             constructor(...args) {
                super(...args);


                this.directiveName = "auPassword";
                 this.type = "text";


             }   
        }
         export class DateInput extends StandardInput{
                GetController() {
                return DateInput;
            }       
             constructor(...args) {
                super(...args);


                this.directiveName = "auDate";
                 this.type = "date";


             }   
        }
        export class NumberInput extends StandardInput{
                GetController() {
                return NumberInput;
            }       
             constructor(...args) {
                super(...args);


                this.directiveName = "auNumber";
                 this.type = "number";


             }   
        }
        export class CheckboxInput extends StandardInput {

             GetController() {
                return CheckboxInput;
            }
            constructor(...args) {
                super(...args);


                this.directiveName = "auCheckbox";

               

            }

            GetTemplate() {
            return `

            <label>
                <input type="checkbox" name="${this.templateCfg.formName}" ng-model="Ctrl.model" ng-required="Ctrl.required" /> {{Ctrl.label}} 
                <span ng-if="Ctrl.hasFeedbackIcon">
                    <i class="glyphicon" ng-class="{'glyphicon-ok':Ctrl.hasSuccessClass,'glyphicon-asterisk':Ctrl.hasRequiredIcon,'glyphicon-warning-sign':Ctrl.hasWarnigClass}"></i>
                </span>
            </label>


 `;
            }
        }

        export class FileInput extends StandardInput {


            GetTemplate() {
                return  StandardFormGroup(`
  <input type="file" class="form-control" name="${ this.templateCfg.fieldName}" ng-model="Ctrl.model"  fileread="Ctrl.model" filename="Ctrl.filename"  ng-required="Ctrl.required" />

`);

            }
              GetController() {
                return FileInput;
            }
            constructor(...args) {
                super(...args);

             
                this.directiveName = "auFile";

                
                   

            }

          
        }
        export class SelectInput extends StandardInput {

            GetTemplate() {
                return  StandardFormGroup(`
                <select name="${this.templateCfg.fieldName}" ng-readonly="Ctrl.readonly" class="form-control" ng-options="{{Ctrl.optionsExpression}}" ng-model="Ctrl.model"  ng-required="Ctrl.required">
                </select>
`);

            }
            GetController() {
                return SelectInput;
            }
            constructor(...args) {
                super(...args);
                
                this.directiveName = "auSelect";

               
            }
        }

        export class TextAreaInput extends StandardInput {
            constructor(...args) {
                super(...args);
                 this.directiveName = "auTextarea";
            }
             GetController() {
                return TextAreaInput;
            }
            GetTemplate() {
                return  StandardFormGroup(`
                <textarea  ng-model="Ctrl.model" class="form-control" name="${this.templateCfg.fieldName}" ng-attr-maxlength="{{Ctrl.hasMaxLength?Ctrl.maxLength:undefined}}" ng-attr-minlength="{{Ctrl.hasMinLength?Ctrl.minLength:undefined}}" ng-pattern="Ctrl.getPattern()" ng-required="Ctrl.required" ng-readonly="Ctrl.readonly" ng-attr-placeholder="{{Ctrl.placeholder?Ctrl.placeholder:undefined}}" ></textarea>
`);

            }
        }

        function StandardFormGroup(input:string) {
            return `
            <label class="control-label" ng-if="Ctrl.hasLabel">{{Ctrl.label}}</label>
         
            <div ng-class="{'input-group':Ctrl.hasAnyAddon}">
                <span class="input-group-addon" ng-if="Ctrl.hasAddonLeft">{{Ctrl.addonLeft}}</span>
                ${input}                
                <span class="input-group-addon" ng-if="Ctrl.hasAddonRight">{{Ctrl.addonRight}}</span>
            </div>

            <span title="Campo Richiesto" class="glyphicon glyphicon-asterisk form-control-feedback" ng-if="Ctrl.hasRequiredIcon" aria-hidden="true"></span>
            <span class="glyphicon glyphicon-ok form-control-feedback" ng-if="Ctrl.hasSuccessClass" aria-hidden="true"></span>


             <span class="glyphicon glyphicon-warning-sign form-control-feedback" ng-if="Ctrl.hasWarnigClass" aria-hidden="true"></span>`;
        }

        function GetBootstrapTemplate(cfg: bootstrapTemplate) {

            return `
    <div class="au-input" ng-form="${cfg.formName}" ng-class="{'well well-sm':Ctrl.debug}">
        <div class="form-group" ng-class="{'has-error':Ctrl.hasErrorClass,'has-success':Ctrl.hasSuccessClass,'has-feedback':Ctrl.hasFeedbackIcon,'has-warning':Ctrl.hasWarnigClass}">
        
            ${cfg.content}



            <ul class="help-block list-unstyled" ng-show="${cfg.formName}.${cfg.fieldName}.$dirty && ${cfg.formName}.${cfg.fieldName}.$invalid">
                <li ng-if="${cfg.formName}.${cfg.fieldName}.$error.required">{{Ctrl.requiredText}}</li>
                <li ng-if="${cfg.formName}.${cfg.fieldName}.$error.pattern">{{Ctrl.patternText}}</li>
                <li ng-if="${cfg.formName}.${cfg.fieldName}.$error.min">Valore minimo: {{Ctrl.min}}</li>
                <li ng-if="${cfg.formName}.${cfg.fieldName}.$error.max">Valore massimo: {{Ctrl.max}}</li>
                <li ng-if="${cfg.formName}.${cfg.fieldName}.$error.minlength">Lunghezza minima: {{Ctrl.minLength}} caratteri</li>
                <li ng-if="${cfg.formName}.${cfg.fieldName}.$error.maxlength">Lunghezza massima: {{Ctrl.maxLength}} caratteri</li>
                <li ng-if="${cfg.formName}.${cfg.fieldName}.$error.compareTo">Le password non coincidono</li>
            </ul>
            <p class="help-block" ng-if="Ctrl.hasHelpText">{{Ctrl.helpText}}</p>

        </div>
   
    <pre ng-if="Ctrl.debug" class="pre-scrollable">{{Ctrl.json|json}}</pre>
</div>


`;
        }
    

        }

    
}

(() => {
    var inputsDirective = [
        new au.input.NumberInput,
        new au.input.DateInput,
        new au.input.TextInput,
         new au.input.CheckboxInput,
          new au.input.FileInput,
           new au.input.TextAreaInput,
        new au.input.SelectInput
    ];

    inputsDirective.forEach(d => {
        angular.module(au.moduleName).directive(d.directiveName,()=> d.directive());
    });
})();