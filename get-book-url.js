var fs = require("fs");
var webpage = require("webpage");


var open = function (url, i, cb) {

    console.log(url);

    var page = webpage.create();

    page.viewportSize = {width: 1920, height: 1200 };

    page.settings.userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2591.0 Safari/537.36";

    var sub = [];
    var at = 0;

    page.onConsoleMessage = function(msg) {
        if (msg.indexOf("log: ") > -1) {
            console.log(msg);
            return;
        }
        if (msg === "finish") {
            cb(i, sub);
            return;
        }

        sub = Number(msg);
        at = at + 1;
    };
    page.open(url, function(status) {

        if (status === "success") {

            page.evaluate(function () {
                document.addEventListener("DOMContentLoaded", function () {
                    //console.log(document.title);
                    console.log("log: " + location.href);
                    var contents = document.querySelector("#bookpage-a");
                    if (!contents) {
                        console.log(1);
                        console.log("finish");
                        return;
                    }

                    var pages = contents.querySelectorAll("li");
                    var count = pages[pages.length - 1].querySelector("a").textContent;
                    console.log(count);
                    console.log("finish");
                });



            });
        } else {
            console.log(status);
            console.log("finish");
        }
    });
};

module.exports = function (num0, callback) {
    var books = require("./" + num0 + ".json");

    var subs = books.sub;
    var len = subs.length;
    var count = 0;
    var cb = function (i, num) {

        subs[i].num = num;

        count = count + 1;

        var path = "./" + num0 + ".json";
        fs.write(path, JSON.stringify(books), "w");
        if (count >= len) {
            callback();
        }
    };
    for (var i = count; i < len; i = i + 1) {
        (function (i) {

            open(subs[i].url, i, cb)

        })(i);

    }
};

