var url = "http://www.duokan.com/list/6-";
var from = 1, to = 105;

var fs = require("fs");
var webpage = require("webpage");


var open = function (url, cb) {

    console.log(url);
    var page = webpage.create();

    page.viewportSize = {width: 1920, height: 1200};

    page.settings.userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2591.0 Safari/537.36";

    var urls;

    page.onConsoleMessage = function (msg) {

        console.log(msg);
        if (msg === "finish") {
            console.log("finish: " + url);
            cb(urls);
            return;
        }

        try {
            urls = JSON.parse(msg);
        } catch (e) {
            console.log(e.name + ": " + e.message);
        }
    };
    page.open(url, function (status) {

        if (status === "success") {

            page.evaluate(function () {

                window.onload = function () {
                    //document.addEventListener("DOMContentLoaded", function () {

                    var titles = document.getElementsByClassName("title");

                    var urls = [];
                    for (var i = 0, max = titles.length; i < max; i = i + 1) {

                        urls.push(titles[i].href);

                    }

                    console.log(JSON.stringify(urls));
                    console.log("finish");
                    //});
                }


            });

        } else {

            console.error(status);
        }
    });
};

var db = [];

var max = to - from + 1;
var count = 0;

for (var i = from; i <= to; i = i + 1) {
    open(url + i, function (urls) {

        console.log(urls);

        db = db.concat(urls);
        count = count + 1;

        if (count >= max) {
            fs.write("./urls.json", JSON.stringify(db), "w");
            phantom.exit();
        }
    });
}
