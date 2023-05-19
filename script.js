poor_country = 'Pakistan , Saudi Arabia , India , Kazakhstan , Bangladesh';


checkdata = new Promise(function(resolve, eject) {
	card_List = document.querySelectorAll(".up-card-list-section");
	time_List = document.querySelectorAll('[data-test="UpCRelativeTime"]');
	country_List = document.querySelectorAll('[data-test="client-country"]');
	job_type_List = document.querySelectorAll('[data-test="job-type"]');

	card_num = [];
	_time = [];
	_i = 100;

	for (var i = card_List.length - 1; i >= 0; i--) {
		country = country_List[i].innerText
		chrome.runtime.sendMessage({message: poor_country.search(country) == -1});
		chrome.runtime.sendMessage({message: 'country'});
		if (poor_country.search(country) == -1 && job_type_List[i].search('Hourly')==0 && time_List[i].search('minutes') ) {
			chrome.runtime.sendMessage({message: 'msg1'});
			job = job_type_List[i].trim();
			job = job.replace("Hourly","");
			job = job.replace("$","");
			if(job.split("-")[0] > 15){
				chrome.runtime.sendMessage({message: 'msg2'});
				if (time_List[i].split(" ")[0] < 10) {
					chrome.runtime.sendMessage({message: 'msg3'});
					card_num.push(i);
					_time.push(time_List[i].split(" ")[0]);
				}else if(time_List[i].split(" ")[0] == 'a'){
					chrome.runtime.sendMessage({message: 'msg4'});
					_i = i;
				}
			}
		}
	}
	if (_i != 100) {
		card_List[_i].click();
	}else if (card_num.length == 1) {
		card_List[card_num[0]].click();
	}

    if (card_num.length > 1) {
    	_t = _time;
    	t_s = _time.sort();
    	t0 = _t.findIndex(t_s[0]);
    	card_List[card_num[t0]].click();
    	resolve("success");
    } else {
    	eject("reload_check");
  	}
});

checkdata.then(
  function(value) {chrome.runtime.sendMessage({message: 'success'});},
  function(error) {chrome.runtime.sendMessage({message: 'reload_________'});}
);