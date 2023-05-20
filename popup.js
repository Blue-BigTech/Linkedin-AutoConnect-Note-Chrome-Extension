// popup.js
var input_limit = document.getElementById("input_limit");
var input_note = document.getElementById("input_note");
var ss_button = document.getElementById("ss_button");
var go_button = document.getElementById("go_button");

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
//  chrome.storage.local.get([`${value}`]).then((result) => {
//       return result
//   });
// }

function go_clickHandler(e) {
    chrome.runtime.sendMessage({message: 'home'})
}

function ss_clickHandler(e) {
  if(ss_state === false){
    ss_button.textContent = 'Stop';

    const limit = input_limit.value;
    const note = input_note.value;

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {message: 'start', limit : limit, note: note});
    })

    ss_state = true;
  } else { 
    chrome.runtime.sendMessage({message: "stop clicked!"});
    ss_button.textContent = 'Start';
    resetAll();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  ss_button.addEventListener('click', ss_clickHandler);
  go_button.addEventListener('click', go_clickHandler);
});
