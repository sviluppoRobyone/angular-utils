var Au;
(function (Au) {
    var Datepicker;
    (function (Datepicker) {
        var DatepickerFallback = (function () {
            function DatepickerFallback() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                this.args = [];
                this.args = [];
                this.Init();
            }
            Object.defineProperty(DatepickerFallback.prototype, "modalHtml", {
                get: function () {
                    return "<div class=\"modal fade\" tabindex=\"-1\" role=\"dialog\">\n  <div class=\"modal-dialog modal-sm\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n        <h4 class=\"modal-title\">Seleziona una data</h4>\n      </div>\n      <div class=\"modal-body\">\n        \n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Annulla</button>\n        <button type=\"button\" class=\"btn btn-primary save\">Salva</button>\n      </div>\n    </div><!-- /.modal-content -->\n  </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->";
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DatepickerFallback.prototype, "DateSupport", {
                get: function () {
                    var type = "date";
                    var input = document.createElement("input");
                    input.setAttribute("type", type);
                    return input.type == type;
                },
                enumerable: true,
                configurable: true
            });
            DatepickerFallback.prototype.Init = function () {
                var _this = this;
                if (this.DateSupport)
                    return;
                $(document).on("focus", "input[type='date']", function (e) {
                    var input = $(e.currentTarget);
                    if (input.prop("readonly") || input.prop("disabled"))
                        return;
                    var modal = $(_this.modalHtml);
                    modal.appendTo("body");
                    modal.modal({});
                    modal.on("hidden.bs.modal", function () {
                        modal.remove();
                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();
                    });
                    var modalBody = $(".modal-body", modal);
                    var dp = $("<div/>").appendTo(modalBody);
                    var selectedDate = null;
                    var options = {
                        language: 'it',
                        todayHighlight: true,
                        todayBtn: true
                    };
                    dp.datepicker(options).on('changeDate', function (e) {
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
                    $(".save", modal).click(function () {
                        var day = ("0" + selectedDate.getDate()).slice(-2);
                        var month = ("0" + (selectedDate.getMonth() + 1)).slice(-2);
                        var d = selectedDate.getFullYear() + "-" + month + "-" + day;
                        input.val(d).trigger("input");
                        modal.modal("hide");
                    });
                    modal.modal("show");
                });
            };
            DatepickerFallback.$inject = ["$injector"];
            return DatepickerFallback;
        })();
        Datepicker.DatepickerFallback = DatepickerFallback;
    })(Datepicker = Au.Datepicker || (Au.Datepicker = {}));
})(Au || (Au = {}));
(function () {
    angular
        .module(Au.moduleName)
        .run(Au.Datepicker.DatepickerFallback.$inject.concat([(function () {
            var aaa = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                aaa[_i - 0] = arguments[_i];
            }
            new ((_a = Au.Datepicker.DatepickerFallback).bind.apply(_a, [void 0].concat(aaa)))();
            var _a;
        })]));
})();
//# sourceMappingURL=auDatepicker.js.map