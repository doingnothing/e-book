var b = require("./get-book-url.js");
var len = 22;
var count = 0;
for (var i = 1; i <= len; i = i + 1) {
    b(i, function () {
        count = count + 1;
        if (count >= len) {
            phantom.exit();
        }
    });
}
