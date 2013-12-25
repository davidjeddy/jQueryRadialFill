<!--//
//Start plugin
//wrap in namespace to be safe.
(function($){
    
    //Start jQ plugin
    $.fn.rotator = function(options){

        var settings = $.extend({
            starting: 0,
            ending: 100,
            lineWidth: 7,
            timer: 10,        //1000 = 1 second
            radius: 125,
            percentage: true,
            show_text: true,
            color: 'green',
            fontStyle: 'Calibri',
            fontSize: '20pt',
            fontColor: 'darkblue',
            backgroundColor: 'lightgray',
            callback: function () {}
        }, options);

        this.empty().append("<canvas height ="+this.height()+" width="+this.width()+" id='rotator-canvas'/ ></canvas>");

        //Get the canvas tag and assign to a local var
        var canvas = document.getElementById('rotator-canvas');
        var context = canvas.getContext("2d");
        var step = settings.starting;
        var steps = settings.ending - settings.starting;
        var x = canvas.width / 2;
        var y = canvas.height / 2;
        var z = setInterval(function() {
            //Canvas math(s)
            //TODO Needs work. Need 'min','start_point','end_point','max'.
            context.beginPath();
            context.arc(
                x, y, settings.radius,
                (1.5 + (step/(steps*0.5)))*Math.PI,
                (1.5 + (++step/(steps*0.5)))*Math.PI,
                false);
            context.lineWidth = settings.lineWidth;
            context.strokeStyle = settings.color;
            context.stroke();
            context.font = settings.fontSize + ' ' + settings.fontStyle;
            context.fillStyle = settings.fontColor;
            context.clearRect(
                x - parseInt(settings.fontSize)*1.5,
                y - parseInt(settings.fontSize)/2,
                parseInt(settings.fontSize)*3,
                parseInt(settings.fontSize));

            //show text?
            if (settings.show_text) {
                //Now to handle the text changes
                var text;
                //Do we use the % with the text?
                if (settings.percentage) { text = step + "%" } else { text = step };
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.fillText(text, x , y );
            }
            
            //Incriment the fill animation
            if (step >= steps) {
                window.clearInterval(z);
                context.clearRect(
                    x - parseInt(settings.fontSize)*1.5,
                    y - parseInt(settings.fontSize)/2,
                    parseInt(settings.fontSize)*3,
                    parseInt(settings.fontSize)
                );
                
                //setting.show_text if false, do not show a complete message
                if (settings.show_text) { context.fillText(text, x , y );
                } else { context.fillText('', x , y ); }

                if (typeof(settings.callback) == 'function') {
                    settings.callback.call(this);
                }
            }
        }, settings.timer);

        //Set the radial background pre filled (also be blank for non)
        if (settings.backgroundColor) {
            context.arc(x, y, settings.radius, 0, (2*Math.PI), false);
            context.strokeStyle = settings.backgroundColor;
            context.lineWidth   = settings.lineWidth;
            context.stroke();
        };
    }
}(jQuery));



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