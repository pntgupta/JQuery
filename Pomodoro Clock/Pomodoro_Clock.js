var pause=0,session=1,counter;
var $text =$("#timecount");
$(document).ready(function(){
	$(".timer-inner").click(function() {
		if(pause==0) //To trigger start and pause on alternate click
		{	
			countDownTimer();
			pause=1;
		}
		else
		{
			clearInterval(counter);
			pause=0;
		}
	});

	$("._btnsession").click(function() {
		if(pause==0)  //a=0 when counter not started or pause
		{
			var newTime = parseInt($(".sessionLength").text());

			if($(this).val()=="+")
				newTime++;
			else if(newTime>1)  //Minimum session time must be 1 minute
				newTime--;

			$(".sessionLength").text(newTime);
			$("#timecount").text(newTime + " : 00");
		}
	});

	$("._btnbreak").click(function() {
		if (pause==0)
		{	
			var newBreak = parseInt($(".breakLength").text());
			
			if($(this).val()=="+")
				newBreak++;
			else if(newBreak>1)
				newBreak--;

			$(".breakLength").text(newBreak);
		}
	});
});

function countDownTimer()
{
	var time = $("#timecount").text().split(" : ");
	time = parseInt(time[0])*60 + parseInt(time[1]);
	//setTimeout(function(){displayTimer(--time)});  //1st time and continuation after every pause ,counter decrement immediately, not after 1 sec
	counter = setInterval(function(){displayTimer(--time)},1000);
}

function displayTimer(time)
{
	if(time<0)
	{
		clearInterval(counter);
		session++;
		if(session%2==1)  //session = odd means session time else break.
		{
			console.clock();
			$text.text($(".sessionLength").text() + " : 00");

			$("#sessionOrBreak").text("Session");
		}
		else
		{
			$("#timecount").text($(".breakLength").text() + " : 00");
			$("#sessionOrBreak").text("Break!");
		}
		countDownTimer();
	}
	else
	{
		var sec = time%60;
		if(sec<10)
			sec = "0"+time%60;

		$("#timecount").text(parseInt(time/60)+" : "+sec);
		if(session%2==1)
		$(".timer-inner").css("background","linear-gradient(to bottom, #333333 "+time/(parseInt($(".sessionLength").text())*0.60)+"%, rgb(153,204,0) 0%");
		else
		$(".timer-inner").css("background","linear-gradient(to bottom, #333333 "+time/(parseInt($(".breakLength").text())*0.60)+"%, rgb(255,68,68) 0%");
	}
}

