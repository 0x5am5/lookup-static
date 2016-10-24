import Bootstrap from 'bootstrap-sass';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { CommonModule } from './common/common.module';
// import './app.scss';

export const AppModule = angular
  .module('app', [
    ComponentsModule,
    CommonModule,
    uiRouter
  ])
  .component('app', AppComponent)
  .name;

// ---------


// import ToggleClass from './components/toggle';
// import FourSquare from './foursquare';

// var searchForm = document.querySelector('#searchForm');
// if (searchForm) {
// 	let fourSquare = new FourSquare();
// }

// var text = document.querySelectorAll('.js-logo-text');

// [].forEach.call(text, (text) => {
// 	setTimeout(() => {
// 		text.classList.add('active');
// 	}, 500);
// });

// var splat = document.querySelector('.splat');

// function toggleSplat(e) {
// 	if (e.altKey && e.keyCode === 83) {
// 		splat.classList.add('active');

// 		setTimeout(() => {
// 			splat.classList.remove('active');
// 		}, 100);

// 	}
// }

// document.addEventListener('keydown', toggleSplat);