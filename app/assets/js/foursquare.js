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
	constructor() {
		$.getJSON(URL + ENDPOINT, {
				client_id: CLIENT_ID,
				client_secret: CLIENT_SECRET,
				near: params.near,
				section: params.section,
				v:20130815
		}, (data) => {
			let search = data.response.geocode.displayString;
			let responses = data.response.groups.items;
			console.log(responses)
			//body.appendChild(String(data));
		});

	}
}