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
            window.localStorage.setItem( 'numTen.settings', angular.toJson( _settings ) );
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
        // use angular.toJson as this removes internals like hashKeys which can then clash when parsed
        var _scores = JSON.parse ( window.localStorage.getItem('numTen.scores') ) || [];
        return {
            getScores: function ( ) {
                console.log ('scores',_scores);
                return _scores;
            },
            saveScore: function ( data ) {
                var jsonScores;
                if (typeof data === 'object') {
                    _scores.push(data);
                    // need to remove $$hashkey as it wont get added properly and appear in the array
                    jsonScores = angular.toJson ( _scores );
                    window.localStorage.setItem( 'numTen.scores', jsonScores );
                    _scores =JSON.parse ( jsonScores );
                }
            }
        };
    });



