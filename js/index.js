$('.fix').hide()
$('.best-work').hide();

$(document).ready(function () {  
    $(window).on('load', function () {
        $('#preloader').fadeIn(1).delay(250).fadeOut('slow',function(){$(this).remove();});
    });
    AOS.init({
        duration: 1000,
    });
    var viewport = $(document).height();
    var viewPortSize =  viewport / 4.3;
    var source = $("#entry-template").html();
    var source2 = $("#entry2-template").html();
    var template = Handlebars.compile(source);
    var template2 = Handlebars.compile(source2);
    var root = "http://www.ginofiore.eu/database/progetti.json"
    
    //DATA JSON
    $.getJSON(root, function (data) {
        var dati = data.evidenza;
        
        $.each(dati, function (key, value) {
            var context = dati[key];
            var html = template(context);
            $('#data-list').append(html);
        });  
        
        $.each(dati, function (key, value) {
            var context = dati[key];
            var html = template2(context);
            $('#data-line').append(html);
            $('#data-preloading').append('<img style="widht: 1; height: 0;" src="' + context.img + '">');
        });
    });  
    
    //STYLE JS
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        
        if (scroll <= viewPortSize) {
            $('.herobanner-back').show();
            $('.best-work').hide();
            $('.scroll').css({
                "animation-iteration-count": '5'
            });
            $('.progetto21').css({
                "opacity": '0',
                "transform": "translateX(+100vh)",
                "transition-duration": "0s"
            })
            $('.fix').hide();
        }
        
        if (scroll > viewPortSize) {
            $('.best-work').show();
            $('.herobanner-back').hide();
            $('.scroll').css({
                "animation-iteration-count": 'infinite',
                "opacity": '1'
            });
            $('.fix').show()
            $('.squareRot').css({
                "transform": 'rotate(0deg)'
            });
            $('.progetto1').css({
                "opacity": '1'
            });
            $('.progetto2').css({
                "opacity": '0'
            });
            $('.progetto3').css({
                "opacity": '0'
            });
            $('.progetto21').css({
                "opacity": '1',
                "transform": "translateX(0vh)",
            });
            $('.progetto22').css({
                "opacity": '0',
                "transform": "translateX(+100vh)"
            });
            $('.progetto23').css({
                "opacity": '0',
                "transform": "translateX(+100vh)"
            });
            $('.indicatoriEv').css({
                "justify-content": 'flex-start',
                "opacity": '1'
            });
        }
        
        if (scroll >= viewPortSize*2.4) {
            $('.scroll').css({
                "animation-iteration-count": '0',
            });
            $('.progetto1').css({
                "opacity": '0'
            });
            $('.progetto2').css({
                "opacity": '1'
            });
            $('.progetto21').css({
                "opacity": '0',
                "transform": "translateX(-100vh)",
                "transition-duration": "2s"
            });
            $('.progetto22').css({
                "opacity": '1',
                "transform": "translateX(0vh)"
            });
            $('.squareRot').css({
                "transform": 'rotate(-90deg)'
            });
            $('.indicatoriEv').css({
                "justify-content": 'center'
            });
        }
        
        if (scroll >= viewPortSize*3.1) {
            $('.progetto2').css({
                "opacity": '0'
            });
            $('.progetto3').css({
                "opacity": '1'
            });
            $('.progetto22').css({
                "opacity": '0',
                "transform": "translateX(-100vh)"
            });
            $('.progetto23').css({
                "opacity": '1',
                "transform": "translateX(0vh)"
            });
            $('.squareRot').css({
                "transform": 'rotate(-180deg)'
            });
            $('.scroll').css({
                "opacity": '0'
            });
            $('.indicatoriEv').css({
                "justify-content": 'flex-end'
            });
        } 
    }); 
    
    $('.slide1').click(function(){
        $("html, body").animate({ scrollTop: viewPortSize*2 });
        return false;
     });
    
    $('.slide2').click(function(){
        $("html, body").animate({ scrollTop: viewPortSize*2.5 });
        return false;
     });
    
    $('.slide3').click(function(){
        $("html, body").animate({ scrollTop: viewPortSize*3.2 });
        return false;
     });
    
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
        return false;
    };
    
});