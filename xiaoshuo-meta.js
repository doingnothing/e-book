var fs = require('fs');

var Crawler = require("crawler");

var urls = require('./xiaoshuo-url.json');

urls = urls.map(function (path) {
    return 'http://www.duokan.com' + path;
});


console.log(urls.length);

var aaa = function (at) {
    var temp = urls.slice(at - 1, at + 1999);
    var config = {
        from: 1,
        max: temp.length,
        filename: 'xiaoshuo-meta' + at + '.json',
        at: 1
    };

    console.log(temp.length);
    var data = [];
    var c = new Crawler({
        maxConnections: 10,
        callback: function (error, result, $) {
            if (error) {
                console.log(error);
                return;
            }
            try {
                var meta = {};
                var price = $('.m-bookdata .price');
                meta.name = $('.desc h3').text();
                meta.currentPrice = price.find('em').text();
                meta.oldPrice = price.find('del').eq(0).text();
                meta.paperPrice = price.find('del').eq(1).text();

                var stargrade = $('.u-stargrade');
                meta.score = stargrade.find('.score').text();
                meta.count = stargrade.find('.num span').text();

                meta.size = $('.m-bookdetail .size').text();

                meta.tags = [];
                $('.u-taglist a').map(function (index, ele) {
                    meta.tags.push($(ele).text());
                });
                data.push(meta);

                console.log(config.at);
                config.at += 1;
                if (config.at >= config.max) {
                    //console.log(urls);
                    fs.writeFileSync(config.filename, JSON.stringify(data), 'utf8');
                    process.exit();
                }
            } catch (e) {
                console.log(e);
            }
        }
    });
    c.queue(temp);
};
aaa(1);