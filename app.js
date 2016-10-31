//Set end time
var myDeadline = "2016-11-31";

function getRemainingTime (endTime) {
  var totalTime = Date.parse(endTime) - Date.parse(new Date());
  var seconds = Math.floor((totalTime/1000) % 60);
  var minutes = Math.floor((totalTime/1000/60) % 60);
  var hours = Math.floor((totalTime/1000/60/60) % 24);
  var days = Math.floor((totalTime/1000/60/60/24));
  console.log(seconds);
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
  //Stop the timer if timer has gone to 0
  if (totalTime.total <=0) {
    clearInterval(totalTime);
  }
}

function displayTimer (endtime) {
  var remainingTime = setInterval(function() {
  updateClock(endtime);
  }, 1000);
}


$("#start-stop-button").click(function() {
  //Update timer in the first second to avoid delay
  updateClock(myDeadline);
  //Update the timer every second
  displayTimer(myDeadline);
});
