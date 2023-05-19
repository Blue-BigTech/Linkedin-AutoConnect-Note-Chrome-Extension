// popup.js
//  persistence when out of focus but terminated when closed

// variables to represent items from html doc
var input_reload = document.getElementById("input-reload");
var input_check = document.getElementById("input-check");
var ss_button = document.getElementById("ss_button");

// logic specific variables
var ss_state = false;

function ss_clickHandler(e) {
  if(ss_state === false){
    // ss_button.style.backgroundImage = 'url("images/stop.png")';
    // initiate statusCheck
    statusCheck();
    // set state flag to true
    ss_state = true;
  } 
  else{ // ss_state == true
    chrome.runtime.sendMessage({message: "stop clicked!"});
    // replace image
    // ss_button.style.backgroundImage = 'url("images/start.png")';
    
    resetAll();
  }
}

// use to reset all relevant vars
function resetAll(){
 ss_state = false;
 chrome.action.setBadgeText({text:''});

}

// statusCheck logic := count to zero, when zero is met reset timer and refresh page
function statusCheck(){
  var reload = input_reload.value;
  var check = input_check.value;
  reload = (reload)?reload:4;
  check = (check)?check:3;
  var time = 0;
  var t = time;
  setInterval(function() {
    // only carry on if in active state
    if(ss_state === true){
      // set badge text
      chrome.action.setBadgeText({text:''+t});
      // decerement time
      t++;
      chrome.runtime.sendMessage({message: t});
      // if time is below zero reset counter and refresh page
    }
    else { // ss_state == false
      t = time;
      // clear previously set timing interval
      chrome.action.setBadgeText({text:''});
    }
  }, 1000);  
}

// add event listeners after DOM has fully loaded (`DOMContentLoaded`)
document.addEventListener('DOMContentLoaded', function () {
  // reset all global vars and badge
  resetAll();
  // start-stop button click listener
  ss_button.addEventListener('click', ss_clickHandler);
});
