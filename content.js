console.log("++++++++++++++++ Load Script ++++++++++++++++++")
var counter = 0;
chrome.runtime.onMessage.addListener(
  async function(request, sender, sendResponse) {
    if (request.message === 'start') {
      console.log("*******Start********");
      const limit = request.limit;
      const note = request.note;
      connectOnPage(limit, note);
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

async function connectOnPage(limit, note){
	console.log("Start Connecting...");
  const nlimit = parseInt(limit);
  await _scrollDown();
  
  const allButtons = document.getElementsByClassName("artdeco-button artdeco-button--2 artdeco-button--secondary ember-view");
  const count = allButtons.length;
  for(let i = 0; i < count; i++) {
    const spanText = allButtons[i].lastChild.innerText;
    if(spanText === "Connect"){
      allButtons[i].click();
      await _waitSeconds(2000);
      // const dialog = document.getElementById("artdeco-modal-outlet");
      // console.log(dialog)
      // console.log("==========>", dialog.children[0].children[0].children.length)
      
      // if(dialog.children[0].children[0].children.length !== 0) {
      //   const quit = document.getElementsByClassName("artdeco-modal__dismiss artdeco-button artdeco-button--circle artdeco-button--muted artdeco-button--2 artdeco-button--tertiary ember-view")[0];
      //   quit.click();
      //   _waitSeconds(1000);
      //   continue;
      // }
      var wedontknowBtn = document.querySelector('[aria-label="We don\'t know each other"]');
      console.log('wedonknowbtn=>', wedontknowBtn)
      if(wedontknowBtn !== undefined && wedontknowBtn !== null) {
        wedontknowBtn.click();
        await _waitSeconds(1000);
        var connectBtn = document.querySelector('[aria-label="Connect"]');
        connectBtn.click();
        await _waitSeconds(1000);
        var connectBtn1 = document.querySelector('[aria-label="Connect"]');
        connectBtn1.click();
        await _waitSeconds(1000);
      }
      var addNoteBtn = document.querySelector('[aria-label="Add a note"]');
      addNoteBtn.click();
      await _waitSeconds(2000);
      const textAreaElm = document.getElementById("custom-message");
      textAreaElm.value = note;

      var evt = document.createEvent("Events");
      evt.initEvent("change", true, true);
      textAreaElm.dispatchEvent(evt);
      await _waitSeconds(1000);

      const sendBtn = document.getElementsByClassName("artdeco-button artdeco-button--2 artdeco-button--primary ember-view ml1")[0];
      console.log(sendBtn);
      sendBtn.click();
      counter++;
      console.log(counter);
      if(counter >= nlimit){
        break;
      }
      await _waitSeconds(2000);
    }
  }
  await _waitSeconds(1000);

  if(counter < nlimit){
    _goNextPage();
    await _waitSeconds(3000);
    connectOnPage(limit, note);
  }
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
