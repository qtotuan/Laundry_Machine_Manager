//Set end time
var myDeadline = "2016-11-31";
var remainingTime;

function getRemainingTime (endTime) {
  var totalTime = Date.parse(endTime) - Date.parse(new Date());
  var seconds = Math.floor((totalTime/1000) % 60);
  var minutes = Math.floor((totalTime/1000/60) % 60);
  var hours = Math.floor((totalTime/1000/60/60) % 24);
  var days = Math.floor((totalTime/1000/60/60/24));
  return {
  	"totalTime": totalTime,
  	"days": days,
  	"hours": hours,
  	"minutes": minutes,
  	"seconds": seconds
  };
}

function updateClock (endtime) {
  var totalTime = getRemainingTime(endtime);
  //Build in leading zeros for the timer inner HTML
  var secondsHTML = ("0" + totalTime.seconds).slice(-2);
  var minutesHTML = ("0" + totalTime.minutes).slice(-2);
  var hoursHTML = ("0" + totalTime.hours).slice(-2);
  var timeHTML = hoursHTML + ":" + minutesHTML + ":" + secondsHTML
  //Update the HTML of the timer
  $("#status-button").html(timeHTML);
  $("#start-stop-button").html("Cancel");
  //Stop the timer if timer has gone to 0
  if (totalTime.total <=0) {
    clearInterval(totalTime);
  }
}

function runTimer (endtime) {
  remainingTime = setInterval(function() {
  updateClock(endtime);
  }, 1000);
}

$("#start-stop-button").click(function() {
  if ($("#start-stop-button").html() === "Start") {
    //Update timer in the first second to avoid delay
    updateClock(myDeadline);
    //Update the timer every second
    runTimer(myDeadline);
  } else if ($("#start-stop-button").html() === "Cancel") {
    $("#start-stop-button").html("Start");
    $("#status-button").html("OPEN")
    clearInterval(remainingTime);
  }
});

$("a").click(function() {
  console.log("CLICK");
  var input = $(this).html();
  var timeArray = input.split(" ");
  var time = parseInt(timeArray[0]);
});
