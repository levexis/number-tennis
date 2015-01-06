angular.module('numTen.controllers', [])

/*
// A simple controller that fetches a list of data from a service
.controller('PetIndexCtrl', function($scope, PetService) {
  // "Pets" is a service returning mock data (services.js)
  $scope.pets = PetService.all();
})


// A simple controller that shows a tapped item's data
.controller('PetDetailCtrl', function($scope, $stateParams, PetService) {
  // "Pets" is a service returning mock data (services.js)
  $scope.pet = PetService.get($stateParams.petId);
});
*/
.controller('SettingsCtrl' , function ( $scope , $rootScope, prefService) {
    // get pointer to  settings
    $scope.settings = prefService.getSettings();
})
.controller('ScoresCtrl' , function ( $scope , $rootScope, scoreService) {
    // get pointer to  settings
    $scope.scores = scoreService.getScores();
})
/* am being lazy these controllers should be services but can quickly refactor as/when we do some tests */
.controller('AddCtrl' , function ( $scope ) {
    // gets a number between 1 and max
    function randy( max ) {
        return Math.ceil( Math.random() * max );
    }
    function getTarget ( game) {
        function _getCandidate() {
            return randy( game.max / game.increments  ) * game.increments;
        }
        var candidate = _getCandidate(),crashTest = 0;
        while ( candidate < game.choices && crashTest++ < 1000) {
            candidate = _getCandidate();
        }
        return candidate;
    }
    function generateChoices (serve,target,options) {
        var choice,
            crashTest = 0,
            out = [],
            correct = randy ( options ) ; // which one will be correct
        for ( var i=1; i<=options ;i++) {
            if ( i === correct ) {
                out.push ( target - serve);
            } else {
                // spread could be effected by difficulty, ie maybe 1 difference?
                choice = randy ( target );
                // we want 5 unique choices
                while ( ( isAnswerCorrect ( choice , serve, target ) ||
                    choice === target ||
                    !choice*1 ||
                    out.indexOf (choice) > -1 ) &&
                    crashTest++ < 1000 ) {
                    choice = randy ( target );
                }
                out.push ( choice );
            }
        }
        return out;
    }
    function isAnswerCorrect ( answer , serve, target ) {
        return ( ( serve + answer ) === target );
    }
    function nextTarget ( current , difficulty ) {
        difficulty = difficulty || 'Easy';
        return current + $scope.game[ difficulty ].increments;
    }
    function serve ( target ) {
        return randy ( target - 1 );
    }
    $scope.game = { name : 'Addition',
        operator : '+',
        Easy : {
            points : 25, // defaults
            max : 10,
            increments : 10,
            moveTarget: false,
            timeout : 0,
            choices : 3
        },
        Normal : {
            points : 25, // defaults
            max : 50,
            increments : 10,
            moveTarget: false,
            timeout : 10,
            choices : 4
        },
        Hard : {
            points : 25, // defaults
            max : 100,
            increments : 1,
            moveTarget: true,
            timeout : 8,
            choices : 4
        },
        Insane : {
            points : 25, // defaults
            max : 500,
            increments : 1,
            moveTarget: true,
            decreaseTime: true, // on success TBD, possibly down to 1s until they get 1 wrong
            timeout : 5,
            choices : 5
        },
        isAnswerCorrect: isAnswerCorrect,
        randy: randy,
        getTarget: getTarget,
        generateChoices: generateChoices,
        nextTarget: nextTarget,
        serve: serve
    };
    console.log('add controller',$scope);
})
.controller('SubCtrl' , function ( $scope ) {
    // gets a number between 1 and max
    function randy( max ) {
        return Math.ceil( Math.random() * max );
    }
    function getTarget ( game) {
        function _getCandidate() {
            return randy( game.max / game.increments  ) * game.increments;
        }
        var candidate = _getCandidate(),crashTest = 0;
        while ( candidate < game.choices && crashTest++ < 1000) {
            candidate = _getCandidate();
        }
        return candidate;
    }
    function generateChoices (serve,target,options) {
        var choice,
            crashTest = 0,
            out = [],
            correct = randy ( options ) ; // which one will be correct
        for ( var i=1; i<=options ;i++) {
            if ( i === correct ) {
                out.push ( serve - target);
            } else {
                // spread could be effected by difficulty, ie maybe 1 difference?
                choice = randy ( target );
                // we want 5 unique choices
                while ( ( isAnswerCorrect ( choice , serve, target ) ||
                    choice === target ||
                    !choice*1 ||
                    out.indexOf (choice) > -1 ) &&
                    crashTest++ < 1000 ) {
                    choice = randy ( target );
                }
                out.push ( choice );
            }
        }
        return out;
    }
    function isAnswerCorrect ( answer , serve, target ) {
        return ( ( serve - answer ) === target );
    }
    function nextTarget ( current , difficulty ) {
        difficulty = difficulty || 'Easy';
        return current + $scope.game[ difficulty ].increments;
    }
    function serve ( target ) {
        return target + 5 + randy ( target - 5 );
    }
    $scope.game = { name : 'Subtraction',
        operator : '-',
        Easy : {
            points : 25, // defaults
            max : 20,
            increments : 10,
            moveTarget: false,
            timeout : 0,
            choices : 3
        },
        Normal : {
            points : 25, // defaults
            max : 100,
            increments : 10,
            moveTarget: false,
            timeout : 10,
            choices : 4
        },
        Hard : {
            points : 25, // defaults
            max : 100,
            increments : 1,
            moveTarget: true,
            timeout : 8,
            choices : 4
        },
        Insane : {
            points : 25, // defaults
            max : 500,
            increments : 1,
            moveTarget: true,
            decreaseTime: true, // on success TBD, possibly down to 1s until they get 1 wrong
            timeout : 5,
            choices : 5
        },
        isAnswerCorrect: isAnswerCorrect,
        randy: randy,
        getTarget: getTarget,
        generateChoices: generateChoices,
        nextTarget: nextTarget,
        serve: serve
    };
})
.controller('MulCtrl' , function ( $scope ) {
    // gets a number between 1 and max
    function randy( max ) {
        return Math.ceil( Math.random() * max );
    }
    function getTarget ( game) {
        // find 2 numbers, must be higher than number of choices
        function _getCandidate() {
            return randy( game.max / game.increments  ) *
            randy( game.max / game.increments ) * game.increments;
        }
        var candidate = _getCandidate(),crashTest = 0;
        while ( candidate < game.choices && crashTest++ < 1000) {
            candidate = _getCandidate();
        }
        return candidate;
    }
    function generateChoices (serve,target,options) {
        var choice,
            crashTest = 0,
            out = [],
            correct = randy ( options ) ; // which one will be correct
            console.log('choices',serve,target,options);
        for ( var i=1; i<=options ;i++) {
            if ( i === correct ) {
                out.push ( target / serve);
            } else {
                // spread could be effected by difficulty, ie maybe 1 difference?
                choice = randy ( target );
                // we want unique choices
                while ( crashTest++ < 1000 &&
                    ( isAnswerCorrect ( choice , serve, target ) ||
                        !choice*1 ||
                        out.indexOf (choice) > -1 )
                    ) {
                    choice = randy ( target );
                }
                out.push ( choice );
            }
        }
        return out;
    }
    function isAnswerCorrect ( answer , serve, target ) {
        return ( ( serve * answer ) === target );
    }
    // find a completely new target
    function nextTarget ( current , difficulty ) {
        difficulty = difficulty || 'Easy';
        return getTarget( $scope.game[ difficulty ] );
    }
    function serve ( target ) {
        console.log('serve',target);
        var candidate = randy( target ), crashTest = 0;
        while ( ( candidate <= 1 ||
            candidate === target ||
            (target / candidate )%1 > 0 ) && crashTest++<1000 ) {
            candidate = randy( target );
        }
        console.log('candidate',candidate);
        // return 1 if not divisible by anything else
        return ( (target / ( candidate || 1) )%1 > 0) ? 1 : candidate;
    }
    $scope.game = { name : 'Multiplication',
        operator : '*',
        Easy : {
            points : 25, // defaults
            max : 5,
            increments : 1,
            moveTarget: true,
            timeout : 0,
            choices : 3
        },
        Normal : {
            points : 25, // defaults
            max : 10,
            increments : 2,
            moveTarget: true,
            timeout : 10,
            choices : 4
        },
        Hard : {
            points : 25, // defaults
            max : 12,
            increments : 1,
            moveTarget: true,
            timeout : 8,
            choices : 4
        },
        Insane : {
            points : 25, // defaults
            max : 15,
            increments : 1,
            moveTarget: true,
            decreaseTime: true, // on success TBD, possibly down to 1s until they get 1 wrong
            timeout : 5,
            choices : 5
        },
        isAnswerCorrect: isAnswerCorrect,
        randy: randy,
        getTarget: getTarget,
        generateChoices: generateChoices,
        nextTarget: nextTarget,
        serve: serve
    };
})
.controller('DivCtrl' , function ( $scope ) {
    // gets a number between 1 and max
    function randy( max ) {
        return Math.ceil( Math.random() * max );
    }
    function getTarget ( game) {
        // find 2 numbers, must be higher than number of choices
        function _getCandidate() {
            return randy( game.max / game.increments  ) * game.increments;
        }
        var candidate = _getCandidate(),crashTest = 0;
        while ( candidate < game.choices && crashTest++ < 1000) {
            candidate = _getCandidate();
        }
        return candidate;
    }
    function generateChoices (serve,target,options) {
        var choice,
            crashTest,
            out = [],
            correct = randy ( options ) ; // which one will be correct
        console.log('choices',serve,target,options);
        for ( var i=1; i<=options ;i++) {
            if ( i === correct ) {
                out.push ( serve / target);
            } else {
                // spread could be effected by difficulty, ie maybe 1 difference?
                choice = randy ( target );
                // we want unique choices
                crashTest = 0;
                while ( crashTest++ < 1000 &&
                    ( isAnswerCorrect ( choice , serve, target ) ||
                        !choice*1 ||
                        out.indexOf (choice) > -1 )
                    ) {
                    choice = randy ( target );
                }
                out.push ( choice );
            }
        }
        return out;
    }
    function isAnswerCorrect ( answer , serve, target ) {
        return ( ( serve / answer ) === target );
    }
    // find a completely new target
    function nextTarget ( current , difficulty ) {
        difficulty = difficulty || 'Easy';
        return getTarget( $scope.game[ difficulty ] );
    }
    function serve ( target ) {
        console.log('serve',target);
        var candidate = target * randy( target ), crashTest = 0;
        while ( ( candidate <= 1 ||
            candidate === target ) &&
             crashTest++<1000 ) {
            candidate = target * randy( target );
        }
        console.log('candidate',candidate);
        // return 1 if not divisible by anything else
        return candidate;
    }
    $scope.game = { name : 'Division',
        operator : '/',
        Easy : {
            points : 25, // defaults
            max : 5,
            increments : 1,
            moveTarget: true,
            timeout : 0,
            choices : 3
        },
        Normal : {
            points : 25, // defaults
            max : 10,
            increments : 2,
            moveTarget: true,
            timeout : 10,
            choices : 4
        },
        Hard : {
            points : 25, // defaults
            max : 12,
            increments : 1,
            moveTarget: true,
            timeout : 8,
            choices : 4
        },
        Insane : {
            points : 25, // defaults
            max : 15,
            increments : 1,
            moveTarget: true,
            decreaseTime: true, // on success TBD, possibly down to 1s until they get 1 wrong
            timeout : 5,
            choices : 5
        },
        isAnswerCorrect: isAnswerCorrect,
        randy: randy,
        getTarget: getTarget,
        generateChoices: generateChoices,
        nextTarget: nextTarget,
        serve: serve
    };
})
.controller('GameCtrl' , function ( $scope , $state, $timeout, prefService) {
    $scope.game.points = prefService.getSetting( 'points' );
    $scope.view = $scope.view || {};
    $scope.view.difficulty = prefService.getSetting( 'difficulty' );
    $scope.point = { target : $scope.game.getTarget( $scope.game[$scope.view.difficulty] ),
        timeout : $scope.game[$scope.view.difficulty].timeout};

    $scope.restart = function () {
        $scope.point.target = $scope.game.getTarget ( $scope.game[$scope.view.difficulty] );
        $scope.view.countdown.set(1);
        delete $scope.point.won;
        delete $scope.point.serve;
        delete $scope.game.over;
        $scope.point.served = false;
        if ( $scope.view.score ) {
            $scope.view.score.correct = 0;
            $scope.view.score.attempts = 0;
        }
        if ( $scope.point.$served ) {
            $timeout.cancel( $scope.point.$served );
        }
    };
    $scope.serveNext = function() {
        if ( $scope.game[$scope.view.difficulty].moveTarget ) {
            $scope.point.target = $scope.game.nextTarget($scope.point.target , $scope.view.difficulty );
        }
        $scope.point.serve = $scope.game.serve ( $scope.point.target );
        $scope.point.choices = $scope.game.generateChoices ( $scope.point.serve , $scope.point.target , $scope.game[$scope.view.difficulty].choices ); // progress bar?
        $scope.point.served = false;
    };
    $scope.checkAnswer = function ( choice ) {
        $scope.point.won = $scope.game.isAnswerCorrect ( choice * 1 , $scope.point.serve , $scope.point.target );
    };
    $scope.$watch('view.countdown',function ( value ) {
        if ( !value || !value.secs ) {
            $scope.serveNext();
        }
    }, true);
    $scope.state = $state;
    console.log('game ctrl',$scope);
});
