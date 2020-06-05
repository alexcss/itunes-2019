'use strict';

function msToTime(duration) {
	var milliseconds = parseInt((duration % 1000) / 100),
		seconds = parseInt((duration / 1000) % 60),
		minutes = parseInt((duration / (1000 * 60)) % 60),
		hours = parseInt((duration / (1000 * 60 * 60)) % 24);
	hours = (hours < 10) ? "0" + hours : hours;
	minutes = (minutes < 10) ? "0" + minutes : minutes;
	seconds = (seconds < 10) ? "0" + seconds : seconds;
	return minutes + ":" + seconds;
}

const searchForm = document.querySelector('[data-search]');

searchForm.addEventListener('submit', sendRequest);

function sendRequest(event){
	event.preventDefault();
	console.log('ajax rocks');

	// let url = "http://itunes.apple.com/search?term=vitas";
	let url = `${this.action}?term=${this.elements.query.value}`;

	fetch(url)
		.then( result => result.json() )
		.then( showTunes );	

	
}
const listEl = document.querySelector('[data-list]');
const tmpl = document.querySelector('[data-tmpl]').innerHTML;

function showTunes(data) {
	console.log(data);

	listEl.innerHTML = ''; 

	data.results.forEach( tune => {
		listEl.innerHTML += tmpl
						.replace(/{{audio}}/gi, tune.previewUrl)
						.replace(/{{title}}/gi, tune.trackName)
						.replace(/{{img}}/gi, tune.artworkUrl100)
					;
	})
}