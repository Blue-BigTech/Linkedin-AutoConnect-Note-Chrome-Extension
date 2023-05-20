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
      await connectOnPage();
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

async function connectOnPage(){
	// document.body.style.backgroundColor = 'red';
	console.log("Start Connecting...");
  await _scrollDown();
  
  // const allPeople = document.querySelectorAll("span.artdeco-button__text");
  const allButtons = document.getElementsByClassName("artdeco-button artdeco-button--2 artdeco-button--secondary ember-view");
  const count = allButtons.length;
  for(let i = 0; i < count; i++) {
    const spanText = allButtons[i].lastChild.innerText;
    if(spanText === "Connect"){
      allButtons[i].click();
      await _waitSeconds(2000);
      console.log("+++++++++++++")
      var addNoteBtn = document.querySelector('[aria-label="Add a note"]');
      addNoteBtn.click();
      await _waitSeconds(2000);
      const textAreaElm = document.getElementById("custom-message");
      console.log(textAreaElm);
      textAreaElm.value = "How are you?"

      var evt = document.createEvent("Events");
      evt.initEvent("change", true, true);
      textAreaElm.dispatchEvent(evt);

      break;//TODO
    }
  }

  // _goNextPage();
}

async function _scrollDown() {
  var scrollableElement = document.documentElement;
  scrollableElement.scrollBy(0, 2000);
  await _waitSeconds(2000);
}

function _goNextPage() {
	console.log("Next Page");
  console.log(document.querySelector("button.artdeco-pagination__button--next"));
  document.querySelector("button.artdeco-pagination__button--next").click();
}

function _waitSeconds(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}
