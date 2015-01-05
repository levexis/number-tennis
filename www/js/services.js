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
})
.factory('scoreService', function($rootScope , $log ) {
        // retrieve from local storage
        var _scores = JSON.parse ( window.localStorage.getItem('numTen.scores') ) || [];

        return {
            getScores: function ( key ) {
                return _scores;
            },
            saveScore: function ( data ) {
                if (typeof data === 'object') {
                    _scores.push(data);
                    window.localStorage.setItem( 'numTen.scores', JSON.stringify( _scores ) );
                }
            }
        };
    });



