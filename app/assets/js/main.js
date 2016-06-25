import ToggleClass from './components/toggle';
import FourSquare from './foursquare';
import Bootstrap from 'bootstrap-sass';

var searchForm = document.querySelector('#searchForm');
if (searchForm) {
	let fourSquare = new FourSquare();
}

var text = document.querySelectorAll('.js-logo-text');

[].forEach.call(text, (text) => {
	setTimeout(() => {
		text.classList.add('active');
	}, 500);
});

var splat = document.querySelector('.splat');

function toggleSplat(e) {
	if (e.altKey && e.keyCode === 83) {
		splat.classList.add('active');

		setTimeout(() => {
			splat.classList.remove('active');
		}, 100);

	}
}

document.addEventListener('keydown', toggleSplat);