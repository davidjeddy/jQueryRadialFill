<!--//
//Start plugin
(function($){
    
    $.fn.rotator = function(options){

        var settings = $.extend({
            starting: 0,
            ending: 100,
            percentage: true,
            color: 'green',
            lineWidth: 7,
            timer: 10,
            radius: 40,
            fontStyle: 'Calibri',
            fontSize: '20pt',
            fontColor: 'darkblue',
            backgroundColor: 'lightgray',
            callback: function () {
            }
        }, options);

        this.empty().append("<canvas height ="+this.height()+" width="+this.width()+" id='rotator-canvas'/ ></canvas>");

        var canvas = document.getElementById('rotator-canvas');
        var x = canvas.width / 2;
        var y = canvas.height / 2;
        var radius = settings.radius;
        var context = canvas.getContext("2d");

        if(settings.backgroundColor){
            var ctx = canvas.getContext('2d');
            ctx.arc(x, y, radius, 0, 2*Math.PI, false);
            ctx.strokeStyle = settings.backgroundColor;
            ctx.lineWidth = settings.lineWidth;
            ctx.stroke()
        }

        var steps = settings.ending - settings.starting;
        var step = settings.starting;

        var z = setInterval(function() {

            var text;
            var start_angle = (1.5 + (step/(steps*0.5)))*Math.PI;
            var end_angle = (1.5 + (++step/(steps*0.5)))*Math.PI;

            if(settings.percentage) { text = step + "%" } else { text = step };

            context.beginPath();
            context.arc(x, y, radius, start_angle, end_angle, false);
            context.lineWidth = settings.lineWidth;
            context.strokeStyle = settings.color;
            context.stroke();
            context.font = settings.fontSize + ' ' + settings.fontStyle;
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillStyle = settings.fontColor;
            context.clearRect(x - parseInt(settings.fontSize)*1.5, y - parseInt(settings.fontSize)/2, parseInt(settings.fontSize)*3, parseInt(settings.fontSize));
            context.fillText(text, x , y );
            
            if (step >= steps) {
                window.clearInterval(z);

                if(settings.percentage) { text = step + "%" } else { text = step };

                context.clearRect(x - parseInt(settings.fontSize)*1.5, y - parseInt(settings.fontSize)/2, parseInt(settings.fontSize)*3, parseInt(settings.fontSize));
                context.fillText(text, x , y );

                if (typeof(settings.callback) == 'function') {
                    settings.callback.call(this);
                }
            }

        }, settings.timer)
    }
}(jQuery));
// plugin end



//Example function call to run the fill animation
function setpb(){
    $('#rotator').rotator({
        starting: $("#startval").val(),
        ending: $("#endval").val(),
        lineWidth: 10
    })
}

//Example of executing the animation on DOM ready
$(document).ready(function(){

     $('#rotator').rotator({
        starting: 0,
        ending: 100,
        lineWidth: 50,
        color: 'yellow'
    });
});
-->