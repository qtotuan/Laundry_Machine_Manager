//FIREBASE

var config = {
  apiKey: "AIzaSyDfPqrPRojOQqc0oIdBp62ACAafoF5MdUM",
  authDomain: "laundry-app-4175b.firebaseapp.com",
  databaseURL: "https://laundry-app-4175b.firebaseio.com",
  storageBucket: "laundry-app-4175b.appspot.com",
  messagingSenderId: "849872825583"
};
firebase.initializeApp(config);

/*
var title = $("#title");
console.log(title);
*/
var db = firebase.database().ref().child("text");
db.on("value", function(snap) {
  $("#current-user-name").html(snap.val());
})


function updateTitle(newTitle) {
  firebase.database().ref("text").set(newTitle)
};





//LAUNDRY APP

var remainingTime;
var myDeadline;
var userTimeInput;
var userNameInput;

//Set end time
function updateMyDeadline () {
  myDeadline = Date.parse(new Date()) + (userTimeInput * 1000 * 60);
}

function getRemainingTime (endTime) {
  var totalTime = Date.parse(new Date(endTime)) - Date.parse(new Date());
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

function addToQueue (name) {
  var html = "<div class='row'>";
  html += "<div class='col-sm-6 start-time'><span class='glyphicon glyphicon-remove'></span></div>";
  html += "<div class='col-sm-6 queue-name'>" + name + "</div>";
  $(".queue").append(html);
}

function updateCurrentUser () {
  //Display current user and remove input field
  $("#current-user-name").html(userNameInput);
  $("#user-name-input").hide();
}

//Click handler for start/stop button
$("#start-stop-button").click(function() {


  userNameInput = $("#user-name-input").val();
  if (!userTimeInput) {
    alert("Please select minutes");
  } else if (!userNameInput) {
    alert("Please tell me your name");
    console.log(userNameInput);
  } else if ($("#start-stop-button").html() === "Start") {
    //Update timer in the first second to avoid delay
    updateClock(myDeadline);
    //Update the timer every second
    runTimer(myDeadline);
    //Display current user
    updateCurrentUser();
  } else if ($("#start-stop-button").html() === "Cancel") {
    $("#start-stop-button").html("Start");
    $("#status-button").html("OPEN")
    clearInterval(remainingTime);
    //Clear and show input fields; remove current user name display
    $("#user-name-input").val("");
    $("#user-name-input").show();
    $("#dropdownMenu1").html("");
    $("#current-user-name").html("");
  }
  updateTitle($("#user-name-input").val());
});


//Get minutes from the dropdown
$("a").click(function() {
  var input = $(this).html();
  var timeArray = input.split(" ");
  userTimeInput = parseInt(timeArray[0]);
  //Update dropdown menu to show minutes selected
  $("#dropdownMenu1").html(input);
  updateMyDeadline();

});

$(".save-button").click(function() {
  var userName = $(".user-name").val();
  var userEmail = $(".user-email").val();
  addToQueue(userName);
  $(".glyphicon-remove").on("click", function() {
    $(this).parent().parent().remove();
  });
});

// $(document).on("click", function(e) {
//   console.log(e.target);
// });
