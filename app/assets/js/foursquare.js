import jQuery from 'jquery';
let $ = jQuery;

const URL = 'https://api.foursquare.com';
const ENDPOINT_EXPLORE = '/v2/venues/explore';
const CLIENT_ID = '4GSCITNB5YDXYHICVOTRMAWXOS5XRY04XVLOXKG4ZALYPCMC';
const CLIENT_SECRET = '2TLI5SLFQ23PN0FWZMFMCE2OOVNALBD2QDI2IYUX3T2MP0TY';

let exploreParams = {
	v: 20130815,
	section: 'topPicks'
};

let photoSize = 'width100';

export default class {
	addPhoto(photos, result = '') {
		
		if (photos.count) {
			result =  '<img src="' + photos.groups[0].prefix + photoSize + photos.groups[0].suffix + '"/>';
		}

		return result;
	}
	/**
     * Handles the error response from the getJSON method. Displays message.
     *
     * @method ajaxResponseFail
     */
	ajaxResponseFail() {
		this.statusBox.innerText = "There was an error retrieving recommended places."
	}

	/**
     * Handles the response from the getJSON method, loops through responses and adds to list on the page
     *
     * @method ajaxResponseSuccess
     * @param {Object} Data JSON data recieved from the get JSON.
     */
	ajaxResponseSuccess(data) {
		let search = data.response.geocode.displayString;
		let responses = data.response.groups[0].items;
		let items = '';

		responses.forEach((item) => {
			items += '<li>' + 
				this.addPhoto(item.venue.photos) +
				item.venue.name + 
				'</li>';
		});

		this.list.innerHTML = items;

		if (this.searchType === 'geo') {
			this.searchBox.setAttribute("placeholder", "Currently using your location...");
		}
	}

	/**
     * This method calls the Foursquare API (or any set) based on the current query and params defined above
     *
     * @method callAPI
     */
	callAPI(endpoint, data, callback) {

		Object.assign(data, {
			near: this.currentQuery,
			client_id: CLIENT_ID,
			client_secret: CLIENT_SECRET,
			limit: this.limit.value});

		$.getJSON(URL + endpoint, 
			data, 
			this.ajaxResponseSuccess.bind(this))
				.fail(this.ajaxResponseFail.bind(this));
	}

	/**
     * If there was an error retrieving the users geolocation, show and error
     *
     * @method showError
     * @param {Object} Error information
     */
	showError(error) {
	    switch(error.code) {
	        case error.PERMISSION_DENIED:
	            this.statusBox.innerHTML = "You have denied us access to your location. Please make a search manually."
	            break;
	        case error.POSITION_UNAVAILABLE:
	            this.statusBox.innerHTML = "We cannot determine your location."
	            break;
	        case error.TIMEOUT:
	            this.statusBox.innerHTML = "The request to get your location timed out. Please try again."
	            break;
	        case error.UNKNOWN_ERROR:
	            this.statusBox.innerHTML = "An unknown error occurred. Sorry."
	            break;
	    }
	}

	/**
     * If the users browser supports geolocation, it asks for permission
     *
     * @method getLocation
     */
	getLocation() {
	    if (navigator.geolocation) {
	    	this.searchBox.value = "";
	        this.searchBox.setAttribute("placeholder", "Getting your location...");
			this.searchType = 'geo';
	        navigator.geolocation.getCurrentPosition(this.showPosition.bind(this), this.showError.bind(this));
	    } else {
	        this.statusBox.innerText = "Geolocation is not supported by this browser.";
	    }
	}

	/**
     * Sets the users geolocation as the current set query of the app
     *
     * @method hashowPositionndler
     * @param {Object} Raw Geolocation data
     */
	showPosition(position) {
		this.currentQuery = String(position.coords.latitude) + ',' + position.coords.longitude;
    	this.callAPI.call(this, ENDPOINT_EXPLORE, exploreParams);
	}

	/**
     * Bind the events to handle user input
     *
     * @method addEvents
     */
	addEvents() {
		document.querySelector('#searchForm').addEventListener('submit', (e) => {
			if (this.searchBox.value) {	
				this.searchType = 'search';
				this.currentQuery = this.searchBox.value;
				this.callAPI.call(this, ENDPOINT_EXPLORE, exploreParams);
			}
			e.preventDefault;
		});

		document.querySelector('#location').addEventListener('click', this.getLocation.bind(this));

		this.limit.addEventListener('input', () => {
			this.callAPI.call(this, ENDPOINT_EXPLORE, exploreParams);
		});
	}

	/**
	 * This class calls handles users Geolocation or search input and retrieves top recommended places
	 * in their area.
	 *
	 * @class FourSquare
	 * @constructor
	 */
	constructor() {

		this.list = document.querySelector('.results');
		this.searchBox = document.querySelector('#searchBox');
		this.statusBox = document.querySelector('.status-box');
		this.limit = document.querySelector('#results');

		this.addEvents();
		this.getLocation();
	}
}