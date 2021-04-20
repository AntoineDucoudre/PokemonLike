// if player is on x, y then random.randint(1, 5) --> if truc == 1 --> switch scenes get fight scenes


let seconds = 0;
let minutes = 0;
let hours = 0;

let displaySeconds = 0;
let displayMinutes = 0;
let displayHours = 0;



// Define var to hold setInterval() function
// let interval = null;

// Define var to hold stopwatch status
// let status = "stopped";

//Stopwatch function (logic to determine when to increment next value, etc.)
function Chronometer(){

    seconds++;

    //Logic to determine when to increment next value
    if(seconds / 60 === 1){
        seconds = 0;
        minutes++;

        if(minutes / 60 === 1){
            minutes = 0;
            hours++;
        }

    }

    // if only one digit, add 0 to the value
    if(seconds < 10){
        displaySeconds = "0" + seconds.toString();
    }
    else{
        displaySeconds = seconds;
    }

    if(minutes < 10){
        displayMinutes = "0" + minutes.toString();
    }
    else{
        displayMinutes = minutes;
    }

    if(hours < 10){
        displayHours = "0" + hours.toString();
    }
    else{
        displayHours = hours;
    }

    //Display updated time values to user
    document.getElementById("display").innerHTML = displayHours + ":" + displayMinutes + ":" + displaySeconds;

}

function myFunction() {
  alert(document.getElementById("display").style.color);
}

interval = window.setInterval(Chronometer, 1000);