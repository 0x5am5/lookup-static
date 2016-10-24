import angular from 'angular';
import { SearchModule } from './search/search.module';

export const ComponentsModule = angular
  .module('app.components', [
    SearchModule
  ])
  .name;