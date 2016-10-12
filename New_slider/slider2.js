(function($){

//Global variables
var circular;
var nextText;
var prevText;
var slideTime;
var imageHeight;
var imageWidth;

function _init(el,options)
{	
	circular = options.circular || "true";
	nextText = options.nextText || "Next";
	prevText = options.prevText || "Previous";
	slideTime = options.slideTime || 500 ;
	imageHeight = options.imageHeight || 200;
	imageWidth = options.imageWidth || 200;

	var ul_position = 0;
	var totalImage = el.find("li").length; ////Total Images
	
	//Create Previous and Next Button DOM
	var prevDom = _createDOM("input","btnPrevious",prevText);
	var nextDom = _createDOM("input","btnNext",nextText);

	//Append DOM to Element
	el.append(prevDom);
	el.append(nextDom);

	//Resizing image height and width
	el.find("img").css({width : imageWidth+"px",height : imageHeight+"px"});
	el.css({width : imageWidth+"px",height : imageHeight+30+"px"});
	
	//Functions to be executen on click of buttons
	el.children(".btnNext").click(function(){ul_position = _next(el,totalImage,ul_position)});
	el.children(".btnPrevious").click(function(){ul_position = _previous(el,totalImage,ul_position)});
}

function _createDOM(tag,className,value)
{
	return "<"+tag+" type= 'button' class='"+className+"' value='"+value+"'>";
}

function _next(el,totalImage,ul_position)
{
	if(ul_position === imageWidth*(totalImage-1)) //Last image
	{
		if (circular==="false") {return;}
		else
			ul_position=-200;
	}
	ul_position += imageWidth;
	el.children("ul").animate({right : ul_position+"px"},slideTime);
	return ul_position;
}

function _previous(el,totalImage,ul_position)
{
	if(ul_position === 0) //First image
	{
		if (circular==="false") {return;}
		else
			ul_position=imageWidth*(totalImage);
	}
	ul_position -= imageWidth;
	el.children("ul").animate({right : ul_position+"px"},slideTime);
	return ul_position;
}

$.fn.sliderNew = function(options)
{
	this.each(function(index,el){
		$(el).addClass("n_slider");
		_init($(el),options);
	});
}


}(jQuery));