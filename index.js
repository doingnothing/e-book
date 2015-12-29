var fs = require("fs");
var webpage = require("webpage");


var open = function (url, n, cb) {

    console.log(url);

    var page = webpage.create();

    page.viewportSize = {width: 1920, height: 1200 };

    page.settings.userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2591.0 Safari/537.36";

    var sub = [];
    var at = 0;
    var makeOne = function (name, count, url) {
        return {
            name: name,
            count: count,
            url: url
        };
    };

    page.onConsoleMessage = function(msg) {
        if (msg === "finish") {
            cb(n, sub);
            return;
        }


        var infos = msg.split("|");
        if (infos.length !== 3) {
            console.log("not: " + msg);
            return;
        }
        sub[at] = makeOne(String(infos[0]), Number(infos[1]), String(infos[2]));
        at = at + 1;
    };
    page.open(url, function(status) {

        if (status === "success") {

            page.evaluate(function () {
                document.addEventListener("DOMContentLoaded", function () {
                    console.log(document.title);
                    var contents = document.querySelector(".m-category-nav .level2");

                    var level1s = contents.querySelectorAll("li");

                    for (var i = 0, len = level1s.length; i < len; i = i + 1) {
                        var url = level1s[i].querySelector("a").href;
                        var name = level1s[i].querySelector("span").textContent;
                        var count = level1s[i].querySelector("em").textContent;
                        console.log(name + "|" + count + "|" + url);
                    }
                    console.log("finish");
                });



            });
        } else {
            console.log(status);
            console.log("finish");
        }
    });
};

var duokan = require("./0.json");
var subs = duokan.sub;
var len = subs.length;
//len = 4;
var count = 0;
var cb = function (i, sub) {
    var content = JSON.stringify({
        name: subs[i].name,
        sub: sub
    });

    var path = (i + 1) + ".json";
    fs.write(path, content, "w");
    count = count + 1;

    console.log(i + 1);
    if (count >= len) {
        phantom.exit();
    }
};
for (var i = count; i < len; i = i + 1) {
    (function (i) {

        open(subs[i].url, i, cb)

    })(i);

}

