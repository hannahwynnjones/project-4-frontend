angular
  .module('tripApp', ['ui.router', 'ngResource', 'ui.bootstrap', 'ngAnimate', 'satellizer', 'checklist-model'])
  .constant('API_URL', 'http://localhost:3000/api');
