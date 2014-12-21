angular.module('numTen.directives', [])
.directive('ntCountdown', function( $timeout ) {
    var outTemplate='';
    outTemplate += '<div class="nt-countdown" ng-show="countdown.secs"><span class="centered">{{countdown.secs}}</span></div>';
    return {
        restrict : "E",
        link : function ( $scope, element, attributes ) {
            // intial secs cans be passdown as an attribute
            $scope.countdown = {
                secs : ( attributes.secs || 0 ) * 1 ,
                start : function () {
                    if ( $scope.countdown.secs-- > 0 ) {
                        $timeout( $scope.countdown.start, 1000 );
                    } else {
                        $scope.countdown.secs = 0;
                        $scope.$emit('countdown','complete');
                    }
                }
            };
            $scope.$watch('countdown.secs', function ( now , before) {
                // start the countdown
                if (now && ( !before || ( now === before ) ) ) {
                    $timeout(  $scope.countdown.start, 1000 );
                }
            });
        },
        template: function ( element, attributes) {
            return outTemplate;
        }
    };
})
.directive('ntScore' , function () {
    return {
        restrict : "E",
        link : function ( $scope, element, attributes ) {
            $scope.score={ correct: 0,
                        attempts: 0 };
        },
        template : '<div class="row row-bottom" style="padding-top: 100px;">\
                <div class="button-bar">\
                    <button class="button button-dark button-clear">{{score.correct}} / {{score.attempts}}</button>\
                </div>'
    };
})
.directive('ntServe' , function ($log , $timeout) {
    return {
        restrict : "E",
        link : function ( $scope, element, attributes ) {
            $scope.$watch('point.won', function ( now , before) {
                $log.debug('point won' , now , element);
                if (typeof now === 'boolean') {
                    $scope.score.attempts++;
                    if ( now ) {
                        $scope.score.correct++;
                        element.addClass( 'won' );
                    } else if ( now === false ) {
                        element.addClass( 'lost' );
                    }
                    // cancel timer for this point so it doesn't affect the next point
                    if ( $scope.point.$timeout ) {
                        $timeout.cancel( $scope.point.$timeout );
                    }
                    // wait for point outcome animation before serving next
                    $timeout ( function () {
                        if ( $scope.score.attempts < $scope.game.points ) {
                            $scope.serveNext();
                            delete $scope.point.won;
                            $scope.point.served = false;
                        } else {
                            $scope.game.over = true;
                        }
                    }, 500 );
                } else {
                    element.removeClass( 'won' );
                    element.removeClass( 'lost' );
                }
            });
            // 1s to serve point, this is time it takes ball to come in
            // this is all a bit flakey if someone is super quick
            $scope.point.served = false;
            $scope.$watch('point.served' , function (now , before) {
                if ( !now ) {
                    // if someone answers before serve finished then cancel old loop
                    if ( $scope.point.$served ) {
                        $timeout.cancel( $scope.point.$served );
                    }
                    $log.debug( 'serve', $scope.point.served );
                    $scope.point.$served = $timeout( function () {
                        $scope.point.served = true;
                    }, 1000 );
                }
            });
        },
        template : '<div class="row row-top animated" nt-serve-animation style="padding: 20px" ng-show="!game.over">\
    <div class="col nt-formula nt-ball animated" ng-show="point.serve" ng-class="{ \'bounceInRight\' : point.serve && !point.served, \'bounceOutRight\' : point.won, \'fadeOutLeftBig\' : point.won===false }"><span>{{point.serve}}</span></div>\
    <div class="col col-10 nt-formula">+</div>\
    <div class="col col-10 nt-formula nt-mystery">?</div>\
    <div class="col col-10 nt-formula">=</div>\
    <div class="col nt-formula">{{point.target}}</div>\
    </div>\
    <nt-choices></nt-choices>'
    };
})
.directive('ntServeAnimation' , function() {
        return {
            restrict : "A",
            link : function ( $scope, element, attributes ) {
//                element.addClass( 'fadeInDown' );
                $scope.$watch( 'point.served', function ( now, before ) {
                    if ( now && !before  ) {
                        element.removeClass( 'fadeInDown' );
                    } else {
                        element.addClass( 'fadeInDown' );
                    }
                } );
            }
        };
    })
.directive('ntChoices' , function() {
    return {
            restrict : "E",
            template : '<div class="row row-center animated" nt-choice-fader ng-class="{ \'fadeIn\' : point.serve && !point.served }"  ng-show="!game.over">\
        <div ng-repeat="choice in point.choices" class="col text-center"><button class="button button-large button-light" ng-click="checkAnswer(choice);">{{choice}}</button></div>\
        </ng-repeat>\
    </div>'
    };
 })
 .directive('ntChoiceFader' , function($timeout , $log) {
        return {
            restrict : "A",
            link : function ( $scope, element, attributes ) {
                var timeOut = $scope.point.timeout;
                if ( timeOut ) {
                    // need a delay between adding and removing elements
                    $scope.$watch( 'point.served', function ( now,before) {
                        $log.debug ('fader',now, before ,now && !before);
                        if ( now && !before) {
                            element.addClass( 'fadeOut animation-' + timeOut + 's' );
                            // times out point - needs to be reset or should we keep history?
                            $scope.point.$timeout = $timeout( function () {
                                if ( typeof $scope.point.won !== 'boolean' ) {
                                    $scope.point.won = false;
                                }
                            }, (timeOut-1) * 1000 );
                        } else {
                            element.removeClass( 'fadeOut' );
                        }
                    });
                    $scope.$watch( 'point.won', function ( now, before ) {
                        if ( typeof $scope.point.won === 'boolean' ) {
                            // the fadeOut is removed when the fade in is added
                            element.removeClass( 'animation-' + timeOut + 's' );
                        }
                    });
                }
            }
        };
    })
;