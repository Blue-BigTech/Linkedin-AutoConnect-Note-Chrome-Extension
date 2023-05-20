console.log("++++++++++++++++++++++++++++++++++")
chrome.runtime.onMessage.addListener(
  async function(request, sender, sendResponse) {
    if (request.message === 'start') {
      console.log("*******Start********");
      // console.log("-------Start--------");
      // const status = true;
      // saveValue(status);
      // const passList = document.querySelectorAll(".encounters-action--dislike");
      // const pass = passList[0];
      // pass.click();
      connectOnPage();
      console.log("********End*******");
    }
});

// function saveValue(value) {
//   chrome.storage.local.set({[value]: value}).then(() => {
//     console.log("SAVED");
//   });
// }

// function getValue(value) {
//   chrome.storage.local.get([`${value}`]).then((result) => {
//     return result
//   })
// }

function connectOnPage(){
	document.body.style.backgroundColor = 'red';
	console.log("start scrapping")
}
