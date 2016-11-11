'use strict';

/**
 * @ngdoc overview
 * @name squirrelnewsApp
 * @description
 * # squirrelnewsApp
 *
 * Main module of the application.
 */
angular
  .module('squirrelnewsApp', [
    'ngRoute',
    'ngSanitize',
    'selectize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
