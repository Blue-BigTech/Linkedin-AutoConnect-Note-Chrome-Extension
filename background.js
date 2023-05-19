var action_type = "reload";   //"reload","check_list" , "checking" , "noConnect" , "clicked"
var check_get_time = 0;
var set_period_time = 4

chrome.runtime.onMessage.addListener( async function(request,sender,sendResponse) {
	var time = request.message;

	if( request.message === 1 || action_type == "reload") {   												//status  is reload.
		if(action_type == "clicked" || action_type == "noConnect" ){
			return 0;
		}
		chrome.tabs.query({ active: true, currentWindow: true}, tabs => {
			chrome.scripting.executeScript({
				world: 'MAIN',
				target: { tabId: tabs[0].id },
				func: () => {
					window.location.reload(true);
				}
			}, () => { });
		});	
		action_type = "check_list";
		check_get_time = time;
	}
	var delta_time = time - check_get_time;
	if(action_type == "check_list"){	// check_list
		if ( delta_time < set_period_time ){
			chrome.tabs.query({ active: true, currentWindow: true}, tabs => {
	
				chrome.scripting.executeScript({
					world: 'MAIN',
					target: { tabId: tabs[0].id },
					func: check_list
				}, () => { });
	
			});
		}else { 
			action_type = "reload";
		}
	}
});


const check_list = () => {
	action_type = "checking";
	const poor_country = 'Pakistan , Saudi Arabia , India , Kazakhstan , Bangladesh';
	const card_List = document.querySelectorAll(".up-card-list-section");

	// console.log(card_List[0].querySelectorAll('[data-test="attr-item"]'));		//  	skill list		

	const posted = card_List[0].querySelector('[data-test="posted-on"] > span').innerText;
	const job_type = card_List[0].querySelector('[data-test="job-type"]').innerText;
	const payment_verify = card_List[0].querySelector('[data-test="payment-verification-status"] > .text-muted').innerText;
	const country = card_List[0].querySelector('[data-test="client-country"] > strong').innerText;
	const connect_count = document.querySelector('[data-ev-unique_element_id="t-fwh_connects_AvailableConnectsBalance"]').innerText;
	var cc = connect_count.replace("Available Connects", "").trim() > 5;
	
	if(payment_verify && posted.indexOf("seconds") !=-1 && poor_country.search(country)){
		if (!cc){
			action_type = "noConnect";
		} else {
			card_List[0].click();
			action_type = "clicked";
		}
		
	}else if(action_type == "clicked"){
		card_List[0].click();
	} 
	else {
		action_type = "reload";
	}
}


