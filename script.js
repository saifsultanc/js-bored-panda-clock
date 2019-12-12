const MORNING = 0,
  AFTERNOON = 1,
  EVENING = 2,
  NIGHT = 3;

// print the time out
function digitalTime() {
  let date = new Date();

  let hours = date.getHours();

  let minutes = date.getMinutes();
  minutes < 10 ? (minutes = "0" + minutes) : minutes;

  let seconds = date.getSeconds();
  seconds < 10 ? (seconds = "0" + seconds) : seconds;

  let format;
  hours < 12 ? (format = "AM") : (format = "PM"), (hours -= 12);

  let clock = document.getElementById("clock");
  clock.innerHTML = hours + ":" + minutes + ":" + seconds + " " + format;
}

// process panda selection
let wakeUpStatus = MORNING,
  lunchStatus = AFTERNOON,
  napStatus = NIGHT;
function pandaTask() {
  let wakeUpOptions = document.getElementsByName("wake");
  let wakeUpValue;
  for (let i = 0; i < wakeUpOptions.length; i++) {
    if (wakeUpOptions[i].checked) {
      wakeUpValue = wakeUpOptions[i].value;
    }
  }
  let lunchOptions = document.getElementsByName("lunch");
  let lunchValue;
  for (let i = 0; i < lunchOptions.length; i++) {
    if (lunchOptions[i].checked) {
      lunchValue = lunchOptions[i].value;
    }
  }
  let napOptions = document.getElementsByName("nap");
  let napValue;
  for (let i = 0; i < napOptions.length; i++) {
    if (napOptions[i].checked) {
      napValue = napOptions[i].value;
    }
  }
  if (isPandaUpdateRequired(wakeUpValue, lunchValue, napValue)) {
    processPandaUpdate(wakeUpValue, lunchValue, napValue);
  }
}

// only update is necessary
function isPandaUpdateRequired(wakeUpValue, lunchValue, napValue) {
  if (
    wakeUpStatus === wakeUpValue &&
    lunchStatus === lunchValue &&
    napStatus === napValue
  )
    return false;
  else {
    wakeUpStatus = wakeUpValue;
    lunchStatus = lunchValue;
    napStatus = napValue;
  }
  return true;
}

// current time slab is ?
function getCurrentTime() {
  const hours = new Date().getHours();

  if (hours >= 6 && hours < 12) return MORNING;
  else if (hours >= 12 && hours < 4) return AFTERNOON;
  else if (hours >= 4 && hours <= 8) return EVENING;
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

// get the right output out to the user
function processPandaUpdate(wakeUpValue, lunchValue, napValue) {
  let report = document.getElementById("timeEvent");
  if (isPandaCrazy(wakeUpValue, lunchValue, napValue)) {
    report.innerHTML = "CRAZY PANDA!";
  }
  let currentValue = getCurrentTime();
  switch (currentValue) {
    case wakeUpValue:
      report.innerHTML = "GOOD MORNING PANDA!";
      break;
    case lunchValue:
      report.innerHTML = "BON APETIT!";
      break;
    case napValue:
      report.innerHTML = "SWEET DREAMS!";
      break;
    default:
      report.innerHTML = "PANDA MESSED UP! Restart application.";
  }
}

// tasks to keep on processing
setInterval(digitalTime, 1000);
setInterval(pandaTask, 1000);
