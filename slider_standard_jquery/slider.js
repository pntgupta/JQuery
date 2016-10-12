(function($){
	//Global variables
	var activeImageIndex = 0;
	var totalImage = 0;
	var id;

	function _init(obj,options)
	{
		//id = obj.attr('id');
		totalImage = obj.children("li").length;
		var slide = options.slide || "circular";
		// get the prev dom
		var prevText = options.prevText || "Previous";
		var prevDom = _createDOM("btnPrevious",prevText);
		obj.append(prevDom);
		
		var nextText = options.nextText || "Next";
		var nextDom = _createDOM("btnNext",nextText);
		obj.append(nextDom);
		
		obj.children(".btnNext").click(function(){_next(obj,slide)});
		obj.children(".btnPrevious").click(function(){_previous(obj,slide)});

		// nextDom.click(function(){_next});
		// prevDom.click(_previous);

	};

	function _createDOM(className,value)
	{
		return "<input type='button' class='btn "+className+"' value='"+value+"'/>";
	};

	function _next(obj,slide)
	{
		if(slide==="rectangular" && activeImageIndex>=totalImage-1){

			return;
		}

		obj.children("li:nth-child("+(activeImageIndex+1)+")").css("display","none");
		++activeImageIndex;

		if(slide==="circular")
		activeImageIndex = activeImageIndex % totalImage;		

		obj.children("li:nth-child("+(activeImageIndex+1)+")").css("display","block");
	};

	function _previous(obj,slide)
	{
		if(slide==="rectangular" && activeImageIndex<=0)
			return;

		obj.children("li:nth-child("+(activeImageIndex+1)+")").css("display","none");
		--activeImageIndex;

		if(slide==="circular")
		activeImageIndex = (activeImageIndex+totalImage) %totalImage;

		obj.children("li:nth-child("+(activeImageIndex+1)+")").css("display","block");
	};


	$.fn.practice = function(options)
	{
		//javascript variable
		this.each(function(index,el){   //If multiple same div tags are made then multiple sliders are made by selecting each object
			//console.log('vishal',el,a);
			$(el).addClass("p_slider");
	      _init($(el).find("ul"),options);
		})
	
	};
	


}(jQuery));