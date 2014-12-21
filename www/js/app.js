// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'numTen' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'numTen.services' is found in services.js
// 'numTen.controllers' is found in controllers.js
angular.module('numTen', ['ionic', 'numTen.services', 'numTen.controllers', 'numTen.directives'])


.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })
/*
    // the pet tab has its own child nav-view and history
    .state('tab.pet-index', {
      url: '/pets',
      views: {
        'pets-tab': {
          templateUrl: 'templates/pet-index.html',
          controller: 'PetIndexCtrl'
        }
      }
    })

    .state('tab.pet-detail', {
      url: '/pet/:petId',
      views: {
        'pets-tab': {
          templateUrl: 'templates/pet-detail.html',
          controller: 'PetDetailCtrl'
        }
      }
    })

    .state('tab.adopt', {
      url: '/adopt',
      views: {
        'adopt-tab': {
          templateUrl: 'templates/adopt.html'
        }
      }
    })

    .state('tab.about', {
      url: '/about',
      views: {
        'about-tab': {
          templateUrl: 'templates/about.html'
        }
      }
    });
*/
      .state('tab.play-index', {
          url: '/play',
          views: {
              'play-tab': {
                  templateUrl: 'templates/play.html'
              }
          }
      } )
      .state('tab.play', {
          url : '/play/add',
          views : {
              'play-tab' : {
                  templateUrl : 'templates/game.html',
                  controller : 'AddCtrl'
              }
          }
      })
      .state('tab.settings', {
          url: '/settings',
          views: {
              'settings-tab': {
                  templateUrl: 'templates/settings.html'
              }
          }
      })

      .state('tab.about', {
          url: '/play',
          views: {
              'play-tab': {
                  templateUrl: 'templates/play.html'
              }
          }
      } )

      .state('tab.scores', {
            url: '/scores',
            views: {
                'scores-tab': {
                    templateUrl: 'templates/scores.html'
                }
            }
      });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/settings');

})
.run(
    function ($rootScope, $window, $injector ) {
        var document = $window.document;
        // provides some useful things for debugging and testing, should be removed in web app production
        $window.numTen = {
            rootScope : $rootScope,
            injector : $injector,
            getService : function ( what ) {
                return $injector.get( what );
            }
        };
        // these could be done via a service that saves to local storage
        $rootScope.settings = { difficulty: 'Easy', points: 25};
        $rootScope.scores = {};
    });
/* debugging router? paste this into console
var $rootScope = numTen.rootScope;
$rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
    console.log('$stateChangeStart to '+toState.to+'- fired when the transition begins. toState,toParams : \n',toState, toParams);
});

$rootScope.$on('$stateChangeError',function(event, toState, toParams, fromState, fromParams){
    console.log('$stateChangeError - fired when an error occurs during transition.');
    console.log(arguments);
});

$rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
    console.log('$stateChangeSuccess to '+toState.name+'- fired once the state transition is complete.');
});

$rootScope.$on('$viewContentLoaded',function(event){
    console.log('$viewContentLoaded - fired after dom rendered',event);
});

$rootScope.$on('$stateNotFound',function(event, unfoundState, fromState, fromParams){
    console.log('$stateNotFound '+unfoundState.to+'  - fired when a state cannot be found by its name.');
    console.log(unfoundState, fromState, fromParams);
});
*/