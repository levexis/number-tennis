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
.controller('AddCtrl' , function ( $scope ) {
    var game;
    // gets a number between 1 and max
    function randy( max ) {
        return Math.ceil( Math.random() * max );
    }
    function generateChoices (serve,target,options) {
        var choice,
            crashTest = 0,
            out = [];
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
                    crashTest++ < 50 ) {
                    choice = randy ( target );
                }
                out.push ( choice );
            }
        }
        return out;
    }
    function isAnswerCorrect ( answer , serve, target ) {
        return ( ( answer + serve) === target );
    }
    $scope.game = { name : 'Addition',
        Easy : {
            points : 25, // defaults
            max : 20,
            increments : 10,
            increaseTarget: false,
            timeout : 0,
            choices : 3
        },
        Normal : {
            points : 25, // defaults
            max : 100,
            increments : 1,
            increaseTarget: false,
            timeout : 10,
            choices : 4
        },
        Hard : {
            points : 25, // defaults
            max : 500,
            increments : 1,
            increaseTarget: true,
            decreaseTime: true, // on success TBD
            timeout : 5,
            choices : 5
        }
    };
    game =  $scope.game [ $scope.settings.difficulty ] ||  $scope.game.Easy;
    $scope.game.points = $scope.settings.points || game.points;

    $scope.point = { target : randy ( game.max / game.increments ) * game.increments,
                    timeout : game.timeout};
    $scope.serveNext = function() {
        if ( game.increaseTarget ) {
            $scope.point.target += 1;
        }
        $scope.point.serve = randy ( $scope.point.target -1 );
        $scope.point.choices = generateChoices ( $scope.point.serve , $scope.point.target , game.choices ); // progress bar?
    };
    $scope.checkAnswer = function ( choice ) {
        $scope.point.won = isAnswerCorrect ( choice * 1 , $scope.point.serve , $scope.point.target );
    }
    $scope.$watch('countdown',function ( done ) {
        $scope.serveNext();
    });
});
