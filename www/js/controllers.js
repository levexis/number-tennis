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
.controller('AddCtrl' , function ( $scope , $state, $timeout, prefService) {
    // gets a number between 1 and max
    function randy( max ) {
        return Math.ceil( Math.random() * max );
    }
    function getTarget ( game) {
        return randy( game.max / game.increments ) * game.increments;
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
                choice = randy ( target * 2 );
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
    function nextTarget ( current ) {
        return current+1;
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
        nextTarget: nextTarget
    };
    console.log('add controller',$scope);
})
.controller('SubCtrl' , function ( $scope , $state, $timeout, prefService) {
    // gets a number between 1 and max
    function randy( max ) {
        return Math.ceil( Math.random() * max );
    }
    function getTarget ( game) {
        return randy( game.max / game.increments ) * game.increments;
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
    function nextTarget ( current ) {
        return current+1;
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
        nextTarget: nextTarget
    };
    console.log('add controller',$scope);
})
.controller('GameCtrl' , function ( $scope , $state, $timeout, prefService) {
    $scope.game.points = prefService.getSetting( 'points' );
    $scope.view = $scope.view || {};
    $scope.view.difficulty = prefService.getSetting( 'difficulty' );
    $scope.point = { target : $scope.game.getTarget( $scope.game[$scope.view.difficulty] ),
        timeout : $scope.game[$scope.view.difficulty].timeout};

    $scope.restart = function () {
        $scope.point.target = getTarget ( $scope.game[$scope.view.difficulty] );
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
            $scope.point.target = $scope.game.nextTarget($scope.point.target);
        }
        $scope.point.serve = $scope.point.target + 5 + $scope.game.randy ( $scope.point.target -5 );
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
