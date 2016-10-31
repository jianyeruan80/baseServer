// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
//value可与你修改，constant不能修改。 value不能在provider内访问，constant可以
angular.module('baseServer', ['ionic', 'baseServer.controllers','baseServer.api'])
.constant('CONFIG', {'url':'http://192.168.1.100:3000/superadmin/','info':{},'header':{}})
.run(function($ionicPlatform,$rootScope,CONFIG,$location) {
    $rootScope.$on('$locationChangeStart', function() {
            //console.log("$locationChangeStart", arguments);
            if(!Object.keys(CONFIG.info).length) $location.path("/login");
  });
  
  $ionicPlatform.ready(function() {

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

  });

})

.config(function($stateProvider, $urlRouterProvider,$httpProvider) {
  
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
 .state('app.manager', {
      url: '/manager',
      views: {
        'menuContent': {
          templateUrl: 'templates/manager.html',
          controller: 'ManagerCtrl'
        }
      }
    })

  .state('login', {
    url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
   
  });
  
  $urlRouterProvider.otherwise('/login');
});
