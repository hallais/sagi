'use strict';

angular.module('sagi', ['ui']);
var sagi = angular.module('sagi', ['ngResource', 'ui']);

sagi.config(function($routeProvider) {

  $routeProvider.
      when('/', {
      	controller: 'CadastrarController',
			templateUrl: 'views/cadastrar.html'
      }).
      when('/listar', {
        controller: 'ListarController',
        templateUrl: 'views/listar.html'
      }).
      when('/impressoes', {
        controller: 'ImpressoesController',
        templateUrl: 'views/impressoes.html'
      });
//      when('/thank-you', {
//        controller: 'ThankYouController',
//        templateUrl: 'views/thank-you.html'
//      }).
//      when('/customer', {
//        controller: 'CustomerController',
//        templateUrl: 'views/customer.html'
//      }).
//      when('/who-we-are', {
//        templateUrl: 'views/who-we-are.html'
//      }).
//      when('/how-it-works', {
//        templateUrl: 'views/how-it-works.html'
//      }).
//      when('/help', {
//        templateUrl: 'views/help.html'
//      });
});
