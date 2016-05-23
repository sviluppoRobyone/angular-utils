var au;
(function (au) {
    var errors;
    (function (errors_1) {
        errors_1.defaultError = function (promise, resp) {
            promise.resolve(["An error occurred"]);
        };
        errors_1.dotnetMvcError = function (promise, response) {
            if (response.data.ModelState) {
                var errors = [];
                for (var k in response.data.ModelState) {
                    if (response.data.ModelState.hasOwnProperty(k) && response.data.ModelState[k] instanceof Array) {
                        var prepend = ((typeof k == typeof "") && k.length > 0) ? k + ": " : "";
                        response.data.ModelState[k].forEach(function (e) {
                            errors.push(prepend + e);
                        });
                    }
                }
                promise.resolve(errors);
            }
        };
    })(errors = au.errors || (au.errors = {}));
})(au || (au = {}));
//# sourceMappingURL=au-errors.js.map