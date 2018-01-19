$(document).ready(function () {
    
    AOS.init({
        duration: 1000,
    });
    
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);
    var root = "http://www.ginofiore.eu/database/progetti.json"
    
    $.getJSON(root, function (data) {   
        var dati = data.progetti
        var returnedData = dati.filter(function (value) {
            return value.filtro.indexOf($('.attivo').attr("data-key")) != -1;
        }); 
        
        $.each(returnedData, function (key, value) { 
            var context = returnedData[key];
            var html = template(context);
            $('#data-list').append(html);
            $( ".card:odd" ).addClass('card2');
         });
        
        $(".btn").click(function () {  
            $(".btn").removeClass('attivo');
            $(this).addClass('attivo');
            $("#data-list").empty(); 
            var returnedData = dati.filter(function (value) {
                return value.filtro.indexOf($('.attivo').attr("data-key")) != -1;
            }); 
            $.each(returnedData, function (key, value) {
                var context = returnedData[key];
                var html = template(context);
                $('#data-list').append(html);
                $( ".card:odd" ).addClass('card2'); 
            });
        }); 
    });
    
    if (window.matchMedia('(max-width: 480px)').matches) {
        $('.filtraggio').hide();
        window.onscroll = function() {
           var viewport = window.innerHeight;
           var scroll = $(document).scrollTop();

           if (scroll < viewport) {
                $('.navbar').css({
                    "background-color": 'transparent'
                });
                $('.herobanner-back-works').show();
                $('.down').show();
                $('.up').css({
                    "opacity": '0'
                });
                $('.logonik').attr('src','css/img/pic_nik.png');
                $('.navbar').removeClass('navbar-light');
                $('.nav-link').removeClass('black');
                $('.navbar').addClass('navbar-dark');
           }

           if (scroll >= viewport) {
                $('.navbar').css({
                    "background-color": 'white'
                });
                $('.herobanner-back-works').hide();
                $('.down').hide();
                $('.up').css({
                    "opacity": '1'
                });
                $('.logonik').attr('src','css/img/pic_nik_black.png');
                $('.navbar').addClass('navbar-light');
                $('.nav-link').addClass('black');
                $('.navbar').removeClass('navbar-dark');
            }
        };
    }
    else {
        window.onscroll = function() {
           var viewport = window.innerHeight;
           var scroll = $(document).scrollTop();

           if (scroll >= viewport) {
                $('.herobanner').remove(); 
                AOS.init({
                    duration: 1000,
                });
                $('.navbar').css({
                    "background-color": 'white'
                });
                $('.herobanner-back-works').hide();
                $('.down').hide();
                $('.filtraggio').show()
                $('.filtraggio').css({
                    "opacity": '1'
                });
                $('.up').css({
                    "opacity": '1'
                });
                $('.logonik').attr('src','css/img/pic_nik_black.png');
                $('.navbar').addClass('navbar-light');
                $('.nav-link').addClass('black');
                $('.navbar').removeClass('navbar-dark');
            }
        }
    };
    
});
  