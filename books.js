
var fs = require("fs");
var webpage = require("webpage");
var books = require("./urls.json");
var from = 0, to = books.length;



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

                    setTimeout(function () {
                        var book = {};
                        var desc = document.getElementsByClassName("desc")[0];

                        book.title = desc.querySelector("h3").textContent;
                        try {
                            book.score = desc.getElementsByClassName("score")[0].textContent;
                        } catch (e) {

                            console.log(e.name + ": " + e.message);
                        }
                        book.reviewCount = desc.querySelector(".num > span").textContent;
                        book.author = desc.querySelector(".author > a").textContent;
                        var l = book.author.indexOf("【");
                        var r = book.author.indexOf("】");
                        if (l > -1) {
                            book.country = book.author.slice(l + 1, r);
                            book.author = book.author.slice(r + 1);
                        } else {
                            book.country = "中国";
                        }
                        book.published = desc.querySelector(".published > a").textContent;
                        var date = desc.querySelector("tr:last-child").childNodes[1];
                        book.date = date.textContent;
                        book.price = desc.querySelector(".price > em").textContent.replace("¥ ", "");
                        var temp = desc.querySelectorAll(".price > i");
                        book.oldPrice = temp[0].querySelector("del").textContent.replace("¥ ", "");
                        book.paperPrice = temp[1].querySelector("del").textContent.replace("¥ ", "");
                        book.size = document.querySelector(".size").textContent.replace("万字", "");
                        var list = document.querySelectorAll(".u-taglist > ul a");
                        book.marks = [];
                        for (var i = 0, len = list.length; i < len; i = i + 1) {
                            book.marks.push(list[i].textContent);
                        }

                        console.log(JSON.stringify(book));
                        console.log("finish");
                        //});
                    }, 1000);
                }


            });

        } else {

            console.error(status);
        }
    });
};

var db = [];

to = 0;
var max = to - from + 1;
var count = 0;

for (var i = from; i <= to; i = i + 1) {
    open(books[i], function (book) {

        console.log(book);

        db.push(book);
        count = count + 1;

        if (count >= max) {
            fs.write("./books.json", JSON.stringify(db), "w");
            phantom.exit();
        }
    });
}
