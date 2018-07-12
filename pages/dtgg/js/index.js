(function($){


    var banner=function(opts){
        var isMethodCall=typeof opts == 'string';
        if(isMethodCall){

        }else{
            if(!!this.data('banner')){
                console.log('已经实例化');
                return;
            }
            new uiElement($(this),{
                _createElement:function(){},
                _init:function(){},
            });
        }
    }

     function uiElement(opts) {
         
     }


    $.fn.banner=function(opts){
        var defaults={
            data:[],
            timer:2000,
        },
        el=$(this),
        scrollIndex=0,
        isIntimer=false;
        opts= $.extend({},defaults,opts);
        createEl();
        elScroll();
        el.data('dataSource',opts.data);
        function createEl(){
            var ul=$('<ul></ul>');
            for(var i=0;i<opts.data.length;i++){
                var li=$('<li></li>');
                li.text(opts.data[i]);
                ul.append(li);
            }
            el.append(ul);
        }

        function elScroll(){
            isIntimer=true;
         var timer = setInterval(function(){
            var li=el.find('li');
            if(scrollIndex>li.length-1){
                clearInterval(timer);
                return;
                isIntimer=false;
            }
                li.eq(scrollIndex).removeClass('inactive').addClass('active');
              scrollIndex-1 >=0 &&  li.eq(scrollIndex-1).removeClass('active').addClass('inactive')

            scrollIndex++;
         },opts.timer)
        }
        el.on('addData',function(e,obj){
            var dataSource=el.data('dataSource');
            el.data('dataSource',dataSource.concat(obj.data));

            var ul=el.find('ul');
            for(var i=0;i<obj.data.length;i++){
                var li=$('<li></li>');
                li.text(obj.data[i]);
                li.appendTo(ul);
            }

            !isIntimer&&elScroll();
        })
        
    }
})(jQuery);

$(function(){
    $('.dtgg-top-con .left-redpackets').css({
        'left':0,
        '-webkit-transform':'rotateZ(0)',
        '-moz-transform': 'rotateZ(0)',
        '-ms-transform':'rotateZ(0)',
        'transform':'rotateZ(0)'
    });
    $('.dtgg-top-con .right-redpackets').css({
        'right':0,
        '-webkit-transform':'rotateZ(0)',
        '-moz-transform': 'rotateZ(0)',
        '-ms-transform':'rotateZ(0)',
        'transform':'rotateZ(0)'
    });
});

function checkTelNum(val){
    if(!val){
        return false;
    }
    var reg=/^[1][3,4,5,7,8][0-9]{9}$/;
    return  reg.test(val)
}

function openDownloadLayer(opts){
    var defaults={success:$.noop,downloadClick:$.noop,end:$.noop};
    opts =$.extend({},defaults,opts);
    var html='\
    <div class="layer-redpacket">\
        <div class="layer-redpacket-logo"></div>\
        <div class="layer-redpacket-openbtn"></div>\
        <div class="layer-redpacket-desc">\
            <p>下载APP登录后即可查收</p>\
            <p>999元现金红包！可提现！</p>\
        </div>\
        <a class="layer-redpacket-downloadbtn" href="javascript:void(0)">下载领取</a>\
    </div>'
   return layer.open({
         type:1,
        content:html,
        skin:'layer-redpacket-con',
        success:function(el){
            console.log(arguments);
           $(el).find('.layer-redpacket-downloadbtn').on('click',opts.downloadClick);
            opts.success(arguments);
        },
        end:opts.end,
    });
}

function openRedPacketLayer(opts){
    var defaults={success:$.noop,openBtnClick:$.noop,end:$.noop};
    opts =$.extend({},defaults,opts);

    var html='\
    <div class="layer-redpacket">\
        <div class="layer-redpacket-logo"></div>\
        <div class="layer-redpacket-openbtn"></div>\
        <div class="layer-redpacket-desc">\
            <p>下载APP登录后即可查收</p>\
            <p>999元现金红包！可提现！</p>\
        </div>\
        <div class="layer-redpacket-closebtn"></div>\
    </div>'
   var index= layer.open({
         type:1,
        content:html,
        skin:'layer-redpacket-con',
        success:function(el){
           $(el).find('.layer-redpacket-openbtn').on('click',function(){
                $(this).addClass('animation-rotate');
                opts.openBtnClick(arguments);
           });
           $(el).find('.layer-redpacket-closebtn').on('click',function(){
            layer.close(index);
         })
            opts.success(arguments);
        },
        end:opts.end,
    });
    return index;
}

function openRedPacketContentLayer(opts){
    var defaults={success:$.noop,joinBtnClick:$.noop,end:$.noop,money:0};
    opts =$.extend({},defaults,opts);
    var html='\
    <div class="layer-redpacket open">\
        <div class="layer-redpacket-money">\
            <p>'+opts.money+'元</p>\
            <p>已存入账户，可提现！</p>\
        </div>\
        <div class="layer-redpacket-desc">\
            <p>参与天天红包，</p>\
            <p>领更多<span>现金红包！</span></p>\
        </div>\
        <a class="layer-redpacket-downloadbtn" href="javascript:void(0)">立即参与</a>\
        <div class="layer-redpacket-closebtn"></div>\
    </div>'
   var index= layer.open({
         type:1,
        content:html,
        skin:'layer-redpacket-con',
        success:function(el){
           $(el).find('.layer-redpacket-downloadbtn').on('click',function(){
                $(this).addClass('animation-rotate');
                opts.joinBtnClick(arguments);
           });
           $(el).find('.layer-redpacket-closebtn').on('click',function(){
               layer.close(index);
           })
            opts.success(arguments);
        },
        end:opts.end,
    });
    return index;
}