import angular from 'angular';
import uiRouter from 'angular-ui-router';
import { SearchComponent } from './search.component';

export const SearchModule = angular
  .module('search', [
    uiRouter
  ])
  .component('search', SearchComponent)
  .config(($stateProvider, $urlRouterProvider) => {
    'ngInject';
    $stateProvider
      .state('search', {
        url: '/',
        component: 'search',
      });
    $urlRouterProvider.otherwise('/');
  })
  .name;