angular.module('numTen.services', [])

.factory('prefService', function($rootScope , $log ) {
    // retrieve from local storage
    var _settings;

    $rootScope.settings = JSON.parse ( window.localStorage.getItem('numTen.settings') ) || {
        difficulty: 'Easy',
        points: 25};

    /* watches pref changes, saves and processes certain prefs like downloadable */
    $rootScope.$watch('settings', function ( after, before) {
        if ( !_.isEqual(before,after) ) {
            window.localStorage.setItem( 'numTen.settings', JSON.stringify( _settings ) );
        }
        _settings = after;
        // don't forget object comparison
    }, true);
    _settings = $rootScope.settings;

    return {
        getSetting: function ( key ) {
            return _settings[ key ];
        },
        getSettings: function  () {
            return _settings;
        }
    };
});



