var fs = require("fs");
var webpage = require("webpage");
var books = require("./urls.json");

var open = function (url, i, cb) {

    console.log(i, url);

    var page = webpage.create();

    page.viewportSize = {width: 1920, height: 1200};

    page.settings.userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2591.0 Safari/537.36";
    page.settings.resourceTimeout = 3000;
    var urls = {};

    page.onResourceTimeout = function () {
        console.log("timeout");
        handler("doingnothing: finish");
    };

    var handler = function (msg) {

        if (msg.indexOf("doingnothing: ") === -1) {
            return;
        }

        msg = msg.replace("doingnothing: ", "");

        console.log("msg >> " + msg);

        if (msg === "finish") {
            console.log("finish: " + url);
            urls.url = url;
            cb(urls, i);
            return;
        }

        try {
            urls = JSON.parse(msg);
        } catch (e) {
            console.log("out >> " + e.name + ": " + e.message);
        }
    };

    page.onConsoleMessage = handler;


    page.open(url, function (status) {


        if (status === "success") {

            page.evaluate(function () {


                var a = function () {
                    var book = {};
                    var desc = document.getElementsByClassName("desc")[0];

                    if (!desc) {
                        window.onload = a;
                    }

                    book.title = desc.querySelector("h3").textContent;
                    try {
                        book.reviewCount = desc.querySelector(".num > span").textContent;
                    } catch (e) {
                    }
                    try {
                        book.author = desc.querySelector(".author > a").textContent;
                    } catch (e) {

                        book.author = desc.querySelector(".author > span").textContent;
                    }

                    try {
                        book.published = desc.querySelector(".published > a").textContent;
                    } catch (e) {
                    }
                    try {
                        book.score = desc.querySelector(".score").textContent;
                    } catch (e) {
                    }
                    try {
                        var date = desc.querySelector("tr:last-child").childNodes[1];
                        book.date = date.textContent;
                    } catch (e) {
                    }

                    try {
                        book.price = desc.querySelector(".price > em").textContent.replace("¥ ", "");
                        var temp = desc.querySelectorAll(".price > i");
                        book.oldPrice = temp[0].querySelector("del").textContent.replace("¥ ", "");

                        book.paperPrice = temp[1].querySelector("del").textContent.replace("¥ ", "");

                    } catch (e) {
                    }

                    try {
                        book.size = document.querySelector(".size").textContent;
                    } catch (e) {
                    }
                    try {
                        var list = document.querySelectorAll(".u-taglist > ul a");
                        book.marks = [];
                        for (var i = 0, len = list.length; i < len; i = i + 1) {
                            book.marks.push(list[i].textContent);
                        }
                    } catch (e) {
                    }

                    console.log("doingnothing: " + JSON.stringify(book));

                    console.log("doingnothing: finish");
                };

                a();

            });

        } else {

            console.error(status);
        }
    });
};

var db = [];

var MAX = books.length;

var COUNT = 0;

var step = 20;

//console.log(step);

var one = function (from, to) {

    if (to > MAX) {
        to = MAX;
    }

    var max = to - from;

    var count = 0;

    console.log(from, to);

    var q = [];
    var xx = function (a) {
        var q1;

        for (var i = 0, len = q.length; i < len; i  = i + 1) {
            if (q[i] > a) {
                q1 = q.slice(0, i).concat([a]).concat(q.slice(i));
                i = len + 1;
            }
        }

        if (i === len) {

            q1 = q.concat([a]);
        }

        q = q1;
    };

    for (var i = from; i < to; i = i + 1) {

        open(books[i], i, function (book, i) {

            xx(i);

            console.log(q);

            db.push(book);
            count = count + 1;
            COUNT = COUNT + 1;

            //console.log(count, max);

            if (count >= max) {

                console.log(COUNT);
                fs.write("./books" + "." + COUNT + ".json", JSON.stringify(db), "w");

                db = [];

                if (COUNT >= MAX) {

                    phantom.exit();

                } else {

                    //console.log("more");

                    setTimeout(function () {

                        one(to, to + step)

                    }, 2000);

                }
            }
        });
    }
};
COUNT = 1476;
console.log(books[1015]);
console.log(MAX);
one(COUNT, COUNT + step);
//COUNT = 1;
//one(0,1);
