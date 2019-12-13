const MORNING = "0",
  AFTERNOON = "1",
  EVENING = "2",
  NIGHT = "3";

// initial status values
let wakeUpStatus = MORNING,
  lunchStatus = AFTERNOON,
  napStatus = NIGHT;

// print the time out
function digitalTime() {
  let date = new Date();

  let hours = date.getHours();

  let minutes = date.getMinutes();
  minutes < 10 ? (minutes = "0" + minutes) : minutes;

  let seconds = date.getSeconds();
  seconds < 10 ? (seconds = "0" + seconds) : seconds;

  let format;
  hours < 12 ? (format = "AM") : (format = "PM");
  if (hours > 12) hours -= 12;

  let clock = document.getElementById("clock");
  clock.innerHTML = hours + ":" + minutes + ":" + seconds + " " + format;
}

// process panda selection
function pandaTask() {
  // process wake time
  let wakeUpOptions = document.getElementsByName("wake");
  let wakeUpValue;
  for (let i = 0; i < wakeUpOptions.length; i++) {
    if (wakeUpOptions[i].checked) {
      wakeUpValue = wakeUpOptions[i].value;
    }
  }

  // process lunch time
  let lunchOptions = document.getElementsByName("lunch");
  let lunchValue;
  for (let i = 0; i < lunchOptions.length; i++) {
    if (lunchOptions[i].checked) {
      lunchValue = lunchOptions[i].value;
    }
  }

  // process nap time
  let napOptions = document.getElementsByName("nap");
  let napValue;
  for (let i = 0; i < napOptions.length; i++) {
    if (napOptions[i].checked) {
      napValue = napOptions[i].value;
    }
  }

  // process panda update only when necessary
  if (isPandaUpdateRequired(wakeUpValue, lunchValue, napValue)) {
    processPandaUpdate(wakeUpValue, lunchValue, napValue);
    updatePandaStatus(wakeUpValue, lunchValue, napValue);
  }
}

// only update if necessary (true/false)
function isPandaUpdateRequired(wakeUpValue, lunchValue, napValue) {
  if (
    wakeUpStatus === wakeUpValue &&
    lunchStatus === lunchValue &&
    napStatus === napValue
  )
    return false;
  else return true;
}

// current time slab is ?
function getCurrentTime() {
  const hours = new Date().getHours();

  if (hours >= 6 && hours < 12) return MORNING;
  else if (hours >= 12 && hours < 16) return AFTERNOON;
  else if (hours >= 16 && hours <= 20) return EVENING;
  else NIGHT;
}

// when panda wants to wakeup/lunch/nap together
function isPandaCrazy(wakeUpValue, lunchValue, napValue) {
  if (
    wakeUpValue === lunchValue ||
    lunchValue === napValue ||
    napValue === wakeUpValue
  )
    return true;
  else return false;
}

// set current values as the overall status values
function updatePandaStatus(wakeUpValue, lunchValue, napValue) {
  wakeUpStatus = wakeUpValue;
  lunchStatus = lunchValue;
  napStatus = napValue;
}

// get the right output out to the user
function processPandaUpdate(wakeUpValue, lunchValue, napValue) {
  let report = document.getElementById("timeEvent");
  let picture = document.getElementById("boredpandaImage");

  // crazy panda result
  if (isPandaCrazy(wakeUpValue, lunchValue, napValue)) {
    report.innerHTML = "CRAZY PANDA!<br>You can't do 2 things at a time!";
    picture.src = "img/panda-crazy.gif";
  } else {
    let currentValue = getCurrentTime();
    switch (currentValue) {
      case wakeUpValue:
        report.innerHTML = "GOOD MORNING PANDA!";
        picture.src = "img/panda-wake-up.gif";
        break;
      case lunchValue:
        report.innerHTML = "BON APETIT!";
        picture.src = "img/panda-lunch.gif";
        break;
      case napValue:
        report.innerHTML = "SWEET DREAMS!";
        picture.src = "img/panda-sleep.gif";
        break;
      default:
        // when panda isn't doing anything right now
        report.innerHTML = "Panda missing! Must be rolling around";
        picture.src = "img/panda-rolling.gif";
    }
  }
}

// party mode result
function partyPanda() {
  let report = document.getElementById("timeEvent");
  let picture = document.getElementById("boredpandaImage");
  report.innerHTML = "Panda PARTYYY!!!!";
  picture.src = "img/panda-party.gif";
}

// time automatically updates every second
setInterval(digitalTime, 1000);

// handle click events on wake up, lunch, nap and party selections
document
  .getElementById("wakeUpTimeSelector")
  .addEventListener("click", pandaTask);
document
  .getElementById("lunchTimeSelector")
  .addEventListener("click", pandaTask);
document.getElementById("napTimeSelector").addEventListener("click", pandaTask);
document
  .getElementById("partyTimeButton")
  .addEventListener("click", partyPanda);
