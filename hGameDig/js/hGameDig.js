// 兼容 requestAnimationFrame
(function () {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // Webkit中此取消方法的名字变了
            window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
    }
}());

// canvas 动画
(function ($) {
    $.fn.hGameDig = function (opts) {
        var defaults = {
            data: [],
            loadedCallBack: $.noop,
            shouldClick: function () { return true; },
            dragEnd: $.noop,
        },
            allSize = null,
            imgList = {},
            el = $(this),
            opts = $.extend({}, defaults, opts),
            allSize = setSize();

        el.addClass('el-dig');
        createCanvas();
        var lx, ly, zx, zy, deg = 0, lh = allSize.lh, timer1, timer2, timer3, dragIndex = -1, isClockWith = true,
            zsfloat = 0,
            isfloatup = true,
            zsListTemp = opts.data,
            zsList = getZSlist(),
            textCanvas = createText(),
            ctx = el.find('canvas')[0].getContext('2d');

        ctx.textAlign = "center";
        ctx.font = allSize.fontsize + "px";

        createImage(function () {
            opts.loadedCallBack();
            addEvents();
            canvasDraw();
        });
        function createText() {
            var context = {};
            for (var i = 0; i < zsList.length; i++) {
                if (!!zsList[i].text) {
                    var textCanvas = $('<canvas>').attr({ width: allSize.textWidth, height: allSize.textHeight })[0];
                    textCtx = textCanvas.getContext('2d');
                    textCtx.textAlign = "center";
                    textCtx.font = allSize.fontsize + "px Arial";
                    textCtx.fillStyle = '#fff';
                    textCtx.textBaseline = 'middle'
                    textCtx.fillText(zsList[i].text, allSize.textWidth / 2, allSize.textHeight / 2);
                    context[i] = textCanvas;
                }
            }
            return context;
        }
        function getZSlist() {
            var temp = [],
                zsList = zsListTemp;
            //todo 理论上不会死循环 但是有待改进，暂时没有想到更好的算法
            for (var i = 0; i < zsList.length; i++) {
                var item = zsList[i];
                //Math.random()*(max-min+1)+min 求范围内随机数
                item.x = (allSize.cWidth - allSize.zsw) * Math.random() + allSize.zsw / 2
                item.y = (allSize.cHeight - allSize.bottom - allSize.top) * Math.random() + allSize.top
                if (temp.length == 0) {
                    temp.push(item);
                } else {
                    for (var j = 0; j < temp.length;) {
                        var distance = Math.sqrt(Math.pow(item.x - temp[j].x, 2) + Math.pow(item.y - temp[j].y, 2));
                        if (distance > allSize.zsmd) {
                            j++
                            if (j == temp.length) {
                                temp.push(item);
                                break;
                            }
                        } else {
                            item.x = (allSize.cWidth - allSize.zsw) * Math.random() + allSize.zsw / 2
                            item.y = (allSize.cHeight - allSize.bottom - allSize.top) * Math.random() + allSize.top
                            j = 0;
                        }
                    }
                }
            }
            return temp;
        };
        function createCanvas() {
            var canvas = $('<canvas>').attr({
                width: allSize.cWidth,
                height: allSize.cHeight,
            }).css({
                height: allSize.cHeight / allSize.ratio,
                width: allSize.cWidth / allSize.ratio,
            });
            el.append(canvas);
        }
        function setSize() {
            var cWidth = el.width(),
                /**
                 * rem 布局
                 * psd 宽度为780 情况下。
                 * 假设 html设定 font-size:100px
                 * 此时 倍数为7.8
                 * 
                 * 在 设备宽度780的情况下 宽度为10px的元素 设定为  width：0.1rem
                 * 
                 * 故所有尺寸 设置如下。
                 * */

                ratio = getRatio(),
                n = cWidth / 7.8 * ratio;
            return {
                ratio: ratio,
                cWidth: cWidth ,
                cHeight: el.height(),
                middleX: cWidth / 2,
                lw: 0.1 * n,//10px
                lh: 1.55 * n,//155px
                zzw: 1.7 * n,
                zzh: 2 * n,
                zsw: 1.2 * n,
                zsh: 1.2 * n,
                zsmd: 1.5 * n,//钻石之间最小距离
                jcd: 1 * n, //  是否被勾中检测点
                jcdd: 0.4 * n, // 是否被勾中 检测点的范围 
                gifd: 1.5 * n, // 钻石在钩子中的位置
                zsfloat: 0.15 * n,
                fontsize: 0.28 * n,
                bottom: 1.8 * n,
                top: 1.55 * n + 2 * n + 2 * n,
                textWidth: 1.2 * n,
                textHeight: 0.5 * n,
                textMargin: 1.1 * n
            }
        }
        function createImage(callBack) {
            var imgsData = [
                { name: 'gzImg', src: './images/zhuazi.png' },
                { name: 'zsImg', src: './images/shopduan.png' },
                { name: 'cgzImg', src: './images/closezz.png' },
                { name: 'coinImg', src: './images/shopduan1.png' }
            ],
                count = imgsData.length,
                flag = 0;
            for (var i = 0; i < imgsData.length; i++) {
                var item = imgsData[i],
                    x = new Image();
                x.src = item.src;
                imgList[item.name] = x;
                x.onload = function () {
                    if (++flag == count) {
                        callBack.apply(this);
                    }
                }
            }
        }
        function canvasDraw() {
            if (isClockWith) {
                deg--;
                if (deg == -90) {
                    isClockWith = false;
                }
            } else {
                deg++;
                if (deg == 90) {
                    isClockWith = true;
                }
            }
            ctx.clearRect(0, 0, allSize.cWidth, allSize.cHeight);
            drawLine();
            drawZZ();
            drawZS();
            timer1 = window.requestAnimationFrame(canvasDraw);
        }
        function drawLine() {
            var d = Math.abs(deg) * (Math.PI / 180);
            lx = (deg < 0) ? allSize.middleX - lh * Math.sin(d) : allSize.middleX + lh * Math.sin(d);
            ly = lh * Math.cos(d);
            ctx.beginPath();
            ctx.moveTo(allSize.middleX, 0);
            ctx.lineTo(lx, ly);
            ctx.strokeStyle = "#a2a4a6";
            ctx.lineWidth = 4;
            ctx.stroke();
            ctx.closePath();
            // drawgzRotate();
        }
        function drawZZ() {
            var d = (90 - Math.abs(deg)) * Math.PI / 180;
            // d 通过四边形内角和 = 360 换算得来。
            zx = lx - allSize.zzw / 2 * Math.sin(d);
            zy = (deg <= 0) ? ly - allSize.zzw / 2 * Math.cos(d) : ly + allSize.zzw / 2 * Math.cos(d);

            ctx.save();//保存状态
            ctx.translate(zx, zy);//设置画布上的(0,0)位置，也就是旋转的中心点
            ctx.rotate(-deg * Math.PI / 180);
            if (dragIndex >= 0) {
                ctx.drawImage(imgList.cgzImg, 0, 0, allSize.zzw, allSize.zzh);//把图片绘制在旋转的中心点，
            } else {
                ctx.drawImage(imgList.gzImg, 0, 0, allSize.zzw, allSize.zzh);//把图片绘制在旋转的中心点，

            }
            ctx.restore();//恢复状态
        }
        function drawZS() {
            var r = allSize.zsw / 2,
                hasZs = false;
            for (var i = 0; i < zsList.length; i++) {
                var item = zsList[i],
                    img = item.type == 'coin' ? imgList.coinImg : imgList.zsImg;
                if (i == dragIndex) {
                    var d = (90 - Math.abs(deg)) * Math.PI / 180,
                        x1 = allSize.gifd * Math.cos(d),
                        y1 = allSize.gifd * Math.sin(d),
                        px = (deg < 0) ? lx - x1 : lx + x1,
                        py = ly + y1;
                    ctx.save();//保存状态
                    ctx.arc(px, py, allSize.zsw / 2, 0, 2 * Math.PI);
                    ctx.drawImage(img, px - allSize.zsw / 2, py - allSize.zsw / 2, allSize.zsw, allSize.zsw);
                    ctx.clip();
                    ctx.restore();
                    if (!!item.text && !!textCanvas[i]) {
                        ctx.drawImage(textCanvas[i], px - allSize.textWidth / 2, py - allSize.textMargin, allSize.textWidth, allSize.textHeight);
                    }
                    continue;
                }
                if (!item.isRandom) {
                    continue;
                }
                hasZs = true;
                if (isfloatup) {
                    item.y -= 0.1;
                }
                else {
                    item.y += 0.1;
                }
                ctx.save();
                ctx.arc(item.x, item.y, r, 0, 2 * Math.PI);
                ctx.drawImage(img, zsList[i].x - r, zsList[i].y - r, 2 * r, 2 * r);
                ctx.clip();
                ctx.restore();
                if (!!item.text && !!textCanvas[i]) {
                    ctx.drawImage(textCanvas[i], item.x - allSize.textWidth / 2, item.y - allSize.textMargin, allSize.textWidth, allSize.textHeight);
                }
            }
            if (hasZs) {
                if (isfloatup) {
                    zsfloat += 0.1;
                    if (zsfloat >= allSize.zsfloat) {
                        isfloatup = false;
                    }
                } else {
                    zsfloat -= 0.1;
                    if (zsfloat <= 0) {
                        isfloatup = true;
                    }
                }
            } else {
                isfloatup = true;
                zsfloat = 0;
            }

        }
        function gzStretch() {
            lh += 5;
            ctx.clearRect(0, 0, allSize.cWidth, allSize.cHeight);
            drawLine();
            drawZZ();
            drawZS();
            timer2 = window.requestAnimationFrame(gzStretch);
            shouldEndGzStretch();
        }
        function shouldEndGzStretch() {
            if (zx < 0 || zx > allSize.cWidth || zy < 0 || zy > allSize.cHeight) {
                cancelAnimationFrame(timer2);
                timer2 = null;
                lineBack();
                return;
            }
            var px, py;
            var d = (90 - Math.abs(deg)) * Math.PI / 180;
            x1 = allSize.jcd * Math.cos(d)
            y1 = allSize.jcd * Math.sin(d);
            px = (deg < 0) ? lx - x1 : lx + x1;
            py = ly + y1;
            for (var i = 0; i < zsList.length; i++) {
                if (!zsList[i].isRandom) {
                    continue;
                }
                var item = zsList[i];
                var distance = Math.sqrt(Math.pow(item.x - px, 2) + Math.pow(item.y - py, 2));
                if (distance < allSize.jcdd) {
                    cancelAnimationFrame(timer2);
                    timer2 = null;
                    item.isRandom = false;
                    dragIndex = i;
                    lineBack();
                    break;
                }
            }
        }
        function lineBack() {
            lh -= 5;
            ctx.clearRect(0, 0, allSize.cWidth, allSize.cHeight);
            drawLine();
            drawZZ();
            drawZS();
            timer3 = window.requestAnimationFrame(lineBack);
            if (lh <= allSize.lh) {
                lh = allSize.lh;
                cancelAnimationFrame(timer3);
                timer3 = null;
                if (dragIndex >= 0) {
                    //触发 抓取事件
                    opts.dragEnd(dragIndex);
                }
                dragIndex = -1;
                canvasDraw();
            }
        }
        function addEvents() {
            el.on('click', function () {
                if (opts.shouldClick()) {
                    if (!!timer1) {
                        cancelAnimationFrame(timer1);
                        timer1 = null;
                        if (!timer2) {
                            gzStretch();
                        }
                    }
                }
            });
        }
        function getRatio() {
            var ctx = $('<canvas>')[0].getContext('2d');

            return ctx.webkitBackingStorePixelRatio ||

                ctx.mozBackingStorePixelRatio ||

                ctx.msBackingStorePixelRatio ||

                ctx.oBackingStorePixelRatio ||

                ctx.backingStorePixelRatio || 1;
        }
    }
})(jQuery);