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




/**
 * Created by Administrator on 2015/11/26.
 */
function runLottey(Elem){
    //1获取画布
    var context=Elem.getContext('2d');
    //2图片加载
    var as=new Image();
    as.src="img/as.png";
    var pin=new Image();
    pin.src="img/pin.png";
    //pin.height=301;
    //pin.width=358;



    const HEIGHT=Elem.height;
    const WIDTH=Elem.width;
    context.translate(WIDTH/2,HEIGHT/2);
    /*as.onload=function(){
     context.drawImage(as,-as.width/2,-as.height/2);

     }
     pin.onload=function(){
     context.drawImage(pin,-pin.width/2+10,-pin.height/2-10)
     }


     //定义start（）方法
     var startTime,timer;
     this.start=function(){
     // context.translate(WIDTH/2,-HEIGHT/2);
     running();
     startTime=new Date().getTime();
     timer=setInterval(running,50)

     }
     var pie=Math.PI/20;
     var running=function (){
     pie+=Math.PI/20;
     context.rotate(pie);
     context.drawImage(as,-as.width/2,-as.height/2);
     context.rotate(-pie);
     context.drawImage(pin,-pin.width/2+10,-pin.height/2-10);
     var endTime=new Date().getTime();
     if (endTime-startTime>=10000){
     clearInterval(timer);
     }
     }*/
    var pie=Math.random()*(Math.PI*2);
    var addPie=0;
    var add=Math.PI/180;
    var startTime;
    var timer=setInterval(draw,50);
    function draw(){
        //旋转后，每次增加的角度+addPie
        if (addPie==0){
            addPie+=addPie;
        }else {
            addPie+=add;
        }
        //旋转并绘制转盘图片
        context.rotate(pie+addPie);
        myDraw(as,-as.width/2,-as.height/2);
        //绘制指针
        context.rotate(-(pie+addPie));
        myDraw(pin,-pin.width/2+10,-pin.height/2-10);

        //获取当前时间
        var endTime=new Date().getTime();
        if ((endTime-startTime)<=5000){
            //加速旋转
            add+=Math.PI/360;

        }else if((endTime-startTime)>=5000&&(endTime-startTime)<10000){
            add-=Math.PI/360;
        } else if ((endTime-startTime)>=10000){
            clearInterval(timer);
            timer=null;
            $('#btnLottery').removeAttr("disabled","disabled")
        }
    }
    function start(){
        addPie=Math.PI/180;
        startTime=new Date().getTime();
        $('#btnLottery').attr("disabled","disabled");
    }

    //3绘制图片的方法
    function myDraw(img,x,y){
        context.drawImage(img,x,y);
    }

    return start

}

