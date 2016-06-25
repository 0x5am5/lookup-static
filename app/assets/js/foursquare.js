import jQuery from 'jquery';
let $ = jQuery;

const URL = 'https://api.foursquare.com';
const ENDPOINT = '/v2/venues/explore';
const CLIENT_ID = '4GSCITNB5YDXYHICVOTRMAWXOS5XRY04XVLOXKG4ZALYPCMC';
const CLIENT_SECRET = '2TLI5SLFQ23PN0FWZMFMCE2OOVNALBD2QDI2IYUX3T2MP0TY';

let params = {
	near: 'Southwark',
	query: 'sushi',
	limit: 5,
	radius: 5,
	ll:'40.7,-74',
	section: 'topPicks'
};

export default class {
	ajaxResponse(data) {
		let search = data.response.geocode.displayString;
		let responses = data.response.groups[0].items;
		let items = '';

		responses.forEach((item) => {
			items += '<li>' + item.venue.name + '</li>';
		});

		this.list.innerHTML = items;

	}

	callAPI(e) {

		$.getJSON(URL + ENDPOINT, {
				client_id: CLIENT_ID,
				client_secret: CLIENT_SECRET,
				near: this.currentQuery,
				section: params.section,
				v:20130815
		}, this.ajaxResponse.bind(this));

		if (e) {
			e.preventDefault;
		}
	}

	addEvents() {
		document.querySelector('#searchForm').addEventListener('submit', (e) => {
			if (this.searchBox.value) {	
				this.currentQuery = this.searchBox.value;
				this.callAPI.call(this, e);
			}
		});
	}

	showError(error) {
	    switch(error.code) {
	        case error.PERMISSION_DENIED:
	            this.statusBox.innerHTML = "User denied the request for Geolocation."
	            break;
	        case error.POSITION_UNAVAILABLE:
	            this.statusBox.innerHTML = "Location information is unavailable."
	            break;
	        case error.TIMEOUT:
	            this.statusBox.innerHTML = "The request to get user location timed out."
	            break;
	        case error.UNKNOWN_ERROR:
	            this.statusBox.innerHTML = "An unknown error occurred."
	            break;
	    }
	}

	getLocation() {
	    if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(this.showPosition.bind(this), this.showError.bind(this));
	    } else {
	        this.statusBox.innerText = "Geolocation is not supported by this browser.";
	    }
	}
	
	showPosition(position) {

		this.currentQuery = String(position.coords.latitude) + position.coords.longitude;

    	this.statusBox.innerHTML = "Latitude: " + position.coords.latitude + 
    									"<br>Longitude: " + position.coords.longitude; 


    	this.callAPI.call(this);
	}

	constructor() {

		this.list = document.querySelector('.results');
		this.searchBox = document.querySelector('#searchBox');
		this.statusBox = document.querySelector('.status-box');

		this.addEvents();
		this.getLocation();
	}
}