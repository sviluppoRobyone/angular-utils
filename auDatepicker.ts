module Au {
    export module Datepicker {
        export class DatepickerFallback {
            static $inject = ["$injector"];
            private args: any[] = [];

            constructor(...args) {
                this.args = [];
                this.Init();
            }
            get modalHtml() {
                return `<div class="modal fade" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Seleziona una data</h4>
      </div>
      <div class="modal-body">
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Annulla</button>
        <button type="button" class="btn btn-primary save">Salva</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->`;
            }
            get DateSupport() {
                var type = "date";
                var input = document.createElement("input");
                input.setAttribute("type", type);
                return input.type == type;
            }
            Init() {
                if (this.DateSupport) return;

                $(document).on("focus", "input[type='date']", (e) => {
                    var input = $(e.currentTarget);
                    if (input.prop("readonly") || input.prop("disabled"))
                        return;

                    var modal = $(this.modalHtml);

                    modal.appendTo("body");
                    modal.modal({

                    });

                    modal.on("hidden.bs.modal", () => {
                        modal.remove();
                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();
                    })
                    var modalBody = $(".modal-body", modal);
                    var dp = $("<div/>").appendTo(modalBody);
                    var selectedDate: Date = null;
                    var options: DatepickerOptions = {
                        language: 'it',
                        todayHighlight: true,
                        todayBtn: true


                    };
                    dp.datepicker(options).on('changeDate', (e) => {
                        console.log(e.date);
                        selectedDate = e.date;
                    });

                    var currentDate = input.val();
                    if (currentDate) {

                        selectedDate = new Date(currentDate);
                        dp.datepicker("_setDate", selectedDate);
                    }

                    dp.children().first().css({
                        "margin-left": "auto",
                        "margin-right": "auto"
                    });

                    $(".save", modal).click(() => {
                        var day = ("0" + selectedDate.getDate()).slice(-2);
                        var month = ("0" + (selectedDate.getMonth() + 1)).slice(-2);

                        var d = selectedDate.getFullYear() + "-" + month + "-" + day;
                        input.val(d).trigger("input");
                        modal.modal("hide");

                    });
                    modal.modal("show");


                });
            }
        }
    }
  
}
(() => {
    angular
        .module(Au.moduleName)
        .run(Au.Datepicker.DatepickerFallback.$inject.concat([<any>((...aaa) => {
            new Au.Datepicker.DatepickerFallback(...aaa);
        })]))
})();