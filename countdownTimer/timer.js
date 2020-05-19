let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
const aud = document.getElementById("audio");
var pause = false;
let remaining;

function timer(seconds) {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);
  
  
  countdown = setInterval(() => {
      
      var secondsLeft = Math.round((then - Date.now()) / 1000);

      remaining = secondsLeft;


      if(pause) {
          clearInterval(countdown);
          return remaining;
      }

    
      if(secondsLeft < 0) {
          clearInterval(countdown);
          return;
      } else if (secondsLeft == -0) {
        aud.play();
        aud.loop = true;
    Push.create("Your Time Is Over", {
            body: "Set Me Again",
            requireInteraction: true,
            onClick: function () {
                window.focus();
                this.close();
                aud.loop = false;
            }
        });
        // timerDisplay.style.display = "none";
        // endTime.style.display = "none";
        
      }

    displayTimeLeft(secondsLeft);
  }, 1000);
}


function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const hours = Math.floor(minutes / 60);
    const remainderMinutes = minutes % 60;
    const display = `${hours < 10 ? '0' : ''}${hours}:${remainderMinutes < 10 ? '0' : ''}${remainderMinutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hours = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `КОНЧИНА В ${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
    aud.loop = false;
}

buttons.forEach(button => button.addEventListener('click', startTimer));


function countdownTimeStart() {
    var hours = document.getElementById('hours').value;
    var minutes = document.getElementById('minutes').value;
    timer((hours * 3600) + (minutes * 60));
};

function pause1() {
    return pause = true;
}

function cont() {
    timer(remaining);
    return pause = false;   
}