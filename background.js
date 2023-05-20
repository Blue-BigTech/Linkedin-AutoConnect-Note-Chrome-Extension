chrome.runtime.onMessage.addListener( async function(request,sender,sendResponse) {
	if(request.message === 'home') {
		const homeURL = `https://www.linkedin.com/search/results/PEOPLE/?keywords=person&origin=SWITCH_SEARCH_VERTICAL&page=1`;
		await chrome.tabs.query({currentWindow: true, active: true}, async function (tabs) {
      await chrome.tabs.update(tabs[0].id, {url: homeURL});
		});
	}
	return true;
});
