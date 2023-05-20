// popup.js
//  persistence when out of focus but terminated when closed

// variables to represent items from html doc
var input_limit = document.getElementById("input_limit");
var input_note = document.getElementById("input_note");
var ss_button = document.getElementById("ss_button");
var go_button = document.getElementById("go_button");

// logic specific variables
var ss_state = false;
chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
  let url = tabs[0].url;
  if(url.search("https://www.linkedin.com/search/results/PEOPLE/") !== -1){
    ss_button.style.display = 'block';
    go_button.style.display = 'none';
  }else{
    ss_button.style.display = 'none';
    go_button.style.display = 'block';
  }
  console.log(url)
});

// const statusData = getValue('status');
// console.log(statusData)
// const bStatus = statusData !== undefined ? statusData.status : false;
// if(bStatus){
//   ss_button.textContent = 'Stop';
// }else{
//   ss_button.textContent = 'Start';
// }

// function saveValue(value) {
//   chrome.storage.local.set({[value]: value}).then(() => {
//     console.log("SAVED");
//   });
// }

// function getValue(value) {
//   // chrome.storage.local.get([`${value}`]).then((result) => {
//   chrome.storage.local.get(["status"]).then((result) => {
//       return result
//   });
// }

function go_clickHandler(e) {
    chrome.runtime.sendMessage({message: 'home'})
}

function ss_clickHandler(e) {
  if(ss_state === false){
    // ss_button.style.backgroundImage = 'url("images/stop.png")';
    ss_button.textContent = 'Stop';

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {message: 'start'});
    })
    // initiate statusCheck
    // statusCheck();
    // set state flag to true
    ss_state = true;
  } else { // ss_state == true
    chrome.runtime.sendMessage({message: "stop clicked!"});
    ss_button.textContent = 'Start';
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
  var limit = input_limit.value;
  var note = input_note.value;
  console.log(limit);
  console.log(note);
  // var time = 0;
  // var t = time;
  // setInterval(function() {
  //   // only carry on if in active state
  //   if(ss_state === true){
  //     // set badge text
  //     chrome.action.setBadgeText({text:''+t});
  //     // decerement time
  //     t++;
  //     chrome.runtime.sendMessage({message: t});
  //     // if time is below zero reset counter and refresh page
  //   }
  //   else { // ss_state == false
  //     t = time;
  //     // clear previously set timing interval
  //     chrome.action.setBadgeText({text:''});
  //   }
  // }, 1000);  
}

// add event listeners after DOM has fully loaded (`DOMContentLoaded`)
document.addEventListener('DOMContentLoaded', function () {
  // reset all global vars and badge
  resetAll();
  // start-stop button click listener
  ss_button.addEventListener('click', ss_clickHandler);
  go_button.addEventListener('click', go_clickHandler);
});
