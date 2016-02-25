// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('outside', {
    url: '/outside',
    templateUrl: 'templates/outside.html'
  })
  
  .state('outside.loginMain', {
      url: '/loginMain',
      templateUrl: 'templates/loginMain.html'
  })
  
  .state('outside.login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
  })
  
  .state('outside.register', {
      url: '/register',
      templateUrl: 'templates/register.html',
      controller: 'RegisterCtrl'
  })
  
  .state('inside', {
    url: '/inside',
    templateUrl: 'templates/inside.html',
    controller: 'InsideCtrl'
  });

  $urlRouterProvider.otherwise("/outside/loginMain");

})

.run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
  $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
    if (!AuthService.isAuthenticated()) {
      console.log(next.name);
      if (next.name !== 'outside.login' && next.name !== 'outside.register' && next.name!=='outside.loginMain') {
        event.preventDefault();
        $state.go('outside.loginMain');
      }
    }
  });
});
