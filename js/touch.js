$(function(){

    var el = document.createElement('div'),
        transformProps = 'transform WebkitTransform MozTransform OTransform msTransform'.split(' '),
        transformProp = support(transformProps),
        transitionDuration = 'transitionDuration WebkitTransitionDuration MozTransitionDuration OTransitionDuration msTransitionDuration'.split(' '),
        transitionDurationProp = support(transitionDuration);

    function support(props) {
        for(var i = 0, l = props.length; i < l; i++) {
            if(typeof el.style[props[i]] !== "undefined") {
                return props[i];
            }
        }
    }

    var mouse = {
            start : {}
        },
        touch = document.ontouchmove !== undefined,
        viewport = {
            x: -10,
            y: 20,
            el: $('.cube')[0],
            move: function(coords) {
                if(coords) {
                    if(typeof coords.x === "number") this.x = coords.x;
                    if(typeof coords.y === "number") this.y = coords.y;
                }

                this.el.style[transformProp] = "rotateX("+this.x+"deg) rotateY("+this.y+"deg)";
            },
            reset: function() {
                this.move({x: 0, y: 0});
            }
        };

    viewport.duration = function() {
        var d = touch ? 50 : 500;
        viewport.el.style[transitionDurationProp] = d + "ms";
        return d;
    }();

    $(document).keydown(function(evt) {
        switch(evt.keyCode)
        {
            case 37: // left
                viewport.move({y: viewport.y - 90});
                break;

            case 38: // up
                evt.preventDefault();
                viewport.move({x: viewport.x + 90});
                break;

            case 39: // right
                viewport.move({y: viewport.y + 90});
                break;

            case 40: // down
                evt.preventDefault();
                viewport.move({x: viewport.x - 90});
                break;

            case 27: //esc
                viewport.reset();
                break;

            default:
                break;
        };
    }).bind('mousedown touchstart', function(evt) {
        delete mouse.last;
        if($(evt.target).is('a, iframe')) {
            return true;
        }

        evt.originalEvent.touches ? evt = evt.originalEvent.touches[0] : null;
        mouse.start.x = evt.pageX;
        mouse.start.y = evt.pageY;
        $(document).bind('mousemove touchmove', function(event) {
            // Only perform rotation if one touch or mouse (e.g. still scale with pinch and zoom)
            if(!touch || !(event.originalEvent && event.originalEvent.touches.length > 1)) {
                event.preventDefault();
                // Get touch co-ords
                event.originalEvent.touches ? event = event.originalEvent.touches[0] : null;
                $('.viewport').trigger('move-viewport', {x: event.pageX, y: event.pageY});
            }
        });

        $(document).bind('mouseup touchend', function () {
            $(document).unbind('mousemove touchmove');
        });
    });

    $('.viewport').bind('move-viewport', function(evt, movedMouse) {

        // Reduce movement on touch screens
        var movementScaleFactor = touch ? 5 : 1;

        if (!mouse.last) {
            mouse.last = mouse.start;
        } else {
            if (forward(mouse.start.x, mouse.last.x) != forward(mouse.last.x, movedMouse.x)) {
                mouse.start.x = mouse.last.x;
            }
            if (forward(mouse.start.y, mouse.last.y) != forward(mouse.last.y, movedMouse.y)) {
                mouse.start.y = mouse.last.y;
            }
        }

        viewport.move({
            x: viewport.x + parseInt((mouse.start.y - movedMouse.y)/movementScaleFactor),
            y: viewport.y - parseInt((mouse.start.x - movedMouse.x)/movementScaleFactor)
        });

        mouse.last.x = movedMouse.x;
        mouse.last.y = movedMouse.y;

        function forward(v1, v2) {
            return v1 >= v2 ? true : false;
        }
    });

    /* Just for fun */
    // Load the IFrame Player API code asynchronously.
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/player_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // Replace the 'ytplayer' element with an <iframe> and
  // YouTube player after the API code downloads.
  var player;
    if(!touch) {
       // $('.cube > div').eq(2).html('<object width="360" height="360"><param name="movie" value="http://www.youtube.com/v/MY5PkidV1cM?fs=1&amp;hl=pt_BR&amp;rel=0"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/MY5PkidV1cM?fs=1&amp;hl=en_GB&amp;rel=0" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="360" height="360"></embed></object>');
        function onYouTubePlayerAPIReady() {
            player = new YT.Player($('.cube > div').eq(2), {
              height: '640',
              width: '640',
              videoId: 'SlkpxNBbX_0'
            });
          }
    }

});
//esconder iframe celular mobile e botão fechar auto
$("#mobile_up").hide();
$("#floatclose").hide();
//funcao mostrar iframe celular mobile e botao fechar
let titulo_mobile = window.document.getElementById('titulo_mobile');
let text_mobile = window.document.getElementById('text_mobile');
function openweb0(){
    
    $("#mobile_up").show();
    $("#floatclose").show();
 titulo_mobile.innerHTML = 'Novo titulo 1' 
  changeInfo0() 
}   
function openweb1(){
  
    $("#mobile_up").show();
    $("#floatclose").show();
    titulo_mobile.innerHTML = 'Novo titulo 2'
   changeInfo1() 
}
 //funcao ESCONDER iframe celular mobile e botao fechar
function closeweb(){
    $("#mobile_up").hide();
    $("#floatclose").hide();
     
}


//function sendMail() {
//    var link = "mailto:leofaria01@gmail.com"
//             + "?cc=leofaria01@gmail.com" //"?cc=myCCaddress@example.com"
//             + "&subject=" + escape("Contato pelo Site")
//             + "&body=" + escape(document.getElementById('myText').value)
//    ;

//   window.location.href = link;
//}