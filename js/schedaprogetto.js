$('html').removeClass();

$(document).ready(function () {
    $('.up').css({
        "opacity": '1',
        "transition-duration": '1s'       
    });
    AOS.init({
        duration: 1000,
    });

    //DATA JSON
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);
    var id = window.location.search,
        id = id.replace('?id=', 'proj/');
    var root = "./database/" + id + ".json"
    
    $.getJSON(root, function (data) {
        $.each(data, function (key, value) {
            var context = data[key];
            var html = template(context);
            $('#data-list').append(html);
            if (context.video == ""){
                $("#my-video").removeAttr("controls")
            };
        });
        $.each(data.proj.team, function (key, value) {
            var context2 = data.proj.team[key];
            console.log(context2);
            $('#teamPers').append('<li><p>'+context2+'</p></li>');
            if (context2 == ""){
                $(".team").remove();
                $(".cred").removeClass("col-lg-7");
                $(".cred").addClass("col-12");
            }; 
        });
    });
    
    //GRAFICO PERCENTUALE
    var stat = function () {
       //for each group of stats
       $('.stat-group').each(function () {
           //cache some stuff
           that = $(this);
           var svgObj = that.find('.svg');
           var perObj = that.find('.per');
           //establish dimentions
           var wide = that.width();
           var center = wide / 2;
           var radius = wide * 0.8 / 2;
           var start = center - radius;
           //gab the stats
           var per = perObj.text().replace("%", "") / 100;
           //set up the shapes
           var svg = Snap(svgObj.get(0));
           var arc = svg.path("");
           var circle = svg.circle(wide / 2, wide / 2, radius);
           //initialize the circle pre-animation
           circle.attr({
               stroke: '#dbdbdb'
               , fill: 'none'
               , strokeWidth: 3
           });
           //empty the percentage
           perObj.text('');
           //gather everything together
           var stat = {
               center: center
               , radius: radius
               , start: start
               , svgObj: svgObj
               , per: per
               , svg: svg
               , arc: arc
               , circle: circle
           };
           //call the animation
           run(stat);
       });
       //animation function
       function run(stat) {
           //establish the animation end point
           var endpoint = stat.per * 360;
           //set up animation (from, to, setter)
           Snap.animate(0, endpoint, function (val) {
               //remove the previous arc
               stat.arc.remove();
               //get the current percentage
               var curPer = Math.round(val / 360 * 100);
               //if it's maxed out
               if (curPer == 100) {
                   //color the circle stroke instead of the arc
                   stat.circle.attr({
                       stroke: "#FFA500"
                   });
                   //otherwise animate the arc
               }
               else {
                   //calculate the arc
                   var d = val;
                   var dr = d - 90;
                   var radians = Math.PI * (dr) / 180;
                   var endx = stat.center + stat.radius * Math.cos(radians);
                   var endy = stat.center + stat.radius * Math.sin(radians);
                   var largeArc = d > 180 ? 1 : 0;
                   var path = "M" + stat.center + "," + stat.start + " A" + stat.radius + "," + stat.radius + " 0 " + largeArc + ",1 " + endx + "," + endy;
                   //place the arc
                   stat.arc = stat.svg.path(path);
                   //style the arc
                   stat.arc.attr({
                       stroke: '#FFA500'
                       , fill: 'none'
                       , strokeWidth: 2
                       , shadow: '0px 3px 15px darkgray'
                   });
               }
               //grow the percentage text
               stat.svgObj.prev().html(curPer + '%');
               //animation speed and easing
           }, 1500, mina.easeinout);
        }
    };
    
        //call it on ready
    window.onscroll = function () {
       if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200) {
           stat();
           window.scrollY = null
       }
   };
    
});
