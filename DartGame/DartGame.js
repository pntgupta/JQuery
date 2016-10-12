var dartDiameter = 200;
var arrowLength = 200;
var arrowheight = 8;
var rotationspeed = 4;
var shootArrowSpeed = 200;
var flag=0;
var blinkingTime=500;

$(".outerDart").css({height:dartDiameter+arrowLength+'px',width:dartDiameter+arrowLength+'px',animation: 'animate '+rotationspeed+'s infinite linear','-webkit-animation': 'animate '+rotationspeed+'s infinite linear'});
$("img.dart").css({height: dartDiameter+'px',width: dartDiameter+'px',top: (arrowLength/2)+'px',left: (arrowLength/2)+'px'});
$(".arrow").css({height: arrowheight+'px',width: arrowLength+'px',top: ((arrowLength+dartDiameter)/2)+'px',left: ((arrowLength+dartDiameter)/2)+'px'});

$(".shoot_div").click(function(){
	var AngleOfShootArrow = 360*(shootArrowSpeed/1000)/rotationspeed;
	var MinAngle = arrowheight/arrowLength * (180/Math.PI);
	var DartRotation = getRotationDegrees($(".outerDart"));
	$(".arrow").each(function(i){var AngleAfterHit = 90 - (getRotationDegrees($(this))+AngleOfShootArrow+DartRotation)%360;
								if(Math.abs(AngleAfterHit)<=MinAngle)
									{flag=1;
									return false;}
							});
	if(flag===1)
		{debugger;
			$(".shoot_arrow").addClass("aminateit1");
		setTimeout(function() {
	    	$( ".pause_button" ).trigger( "click" );
		}, shootArrowSpeed);
		var x= setInterval(function(){
			$(".shoot_arrow").toggleClass("hide");
		},blinkingTime);
		clearInterval(x,blinkingTime*6);
	}
	else
		{$(".shoot_arrow").addClass("aminateit");
		setTimeout(function() {
	    	angle = 90-getRotationDegrees($(".outerDart"));
			var $newArrow = $("<img class='arrow' src='images/Arrow.png'/>").css('transform', 'rotate('+angle+'deg)');
			$(".outerDart").append($newArrow);
			$(".shoot_arrow").removeClass("aminateit")
		}, shootArrowSpeed);
	}

});
$(".stop_button").click(function(){	
	$(".outerDart").css('-webkit-animation', "none");
})
$(".start_button").click(function(){	
	$(".outerDart").css('-webkit-animation', "animate 2s infinite linear");
})
$(".pause_button").click(function(){
	$(".outerDart").css('-webkit-animation-play-state',$(".outerDart").css('-webkit-animation-play-state') == "running" ? "paused" : "running");
})

function getRotationDegrees(obj) {
    var matrix = obj.css("-webkit-transform") || obj.css("transform");
    if(matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    } else { var angle = 0; }
    return (angle < 0) ? angle + 360 : angle;
}