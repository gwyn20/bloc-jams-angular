(function() {
    function seekBar($document) {
        
        /**
        * @function calculatePercent
        * @desc Calculates the horizontal percent along the seek bar where the event (passed in from the view as $event) occurred.
        * @param {Object} seekBar, event
        */
        var calculatePercent = function(seekBar, event) {
            var offsetX = event.pageX - seekBar.offset().left;
            var seekBarWidth = seekBar.width();
            var offsetXPercent = offsetX / seekBarWidth;
            offsetXPercent = Math.max(0, offsetXPercent);
            offsetXPercent = Math.min(1, offsetXPercent);
            return offsetXPercent;
        };
        
        return {
            templateUrl: '/templates/directives/seek_bar.html',
            replace: true,
            restrict: 'E',
            scope: { },
            link: function(scope, element, attributes) {
                scope.value = 0;
                scope.max = 100;
                
                /**
                * @desc Holds the element that matches the directive (<seek-bar>) as a jQuery object so we can call jQuery methods on it.
                * @type {Object}
                */
                var seekBar = $(element);
 
                /**
                * @function percentString
                * @desc calculates a percent based on the value and maximum value of a seek bar.
                * @param {Object}
                */
                var percentString = function () {
                    var value = scope.value;
                    var max = scope.max;
                    var percent = value / max * 100;
                    return percent + "%";
                };
 
                /**
                * @function fillStyle
                * @desc Returns the width of the seek bar fill element based on the calculated percent.
                * @param {Object}
                */
                scope.fillStyle = function() {
                    return {width: percentString()};
                };
                
                /**
                * @function onClickSeekBar
                * @desc Calculates the horizontal percent along the seek bar where the event (passed in from the view as $event) occurred.
                * @param {Object} seekBar, event
                */
                scope.onClickSeekBar = function(event) {
                    var percent = calculatePercent(seekBar, event);
                    scope.value = percent * scope.max;
                };
                
                /**
                * @function trackThumb
                * @desc Similar to scope.onClickSeekBar, but uses $apply to constantly apply the change in value of  scope.value as the user drags the seek bar thumb.
                * @param {Object} 
                */
                scope.trackThumb = function() {
                    $document.bind('mousemove.thumb', function(event) {
                        var percent = calculatePercent(seekBar, event);
                        scope.$apply(function() {
                            scope.value = percent * scope.max;
                        });
                    });
 
                    $document.bind('mouseup.thumb', function() {
                        $document.unbind('mousemove.thumb');
                        $document.unbind('mouseup.thumb');
                    });
                };
            }
        };
    }

    angular
        .module('blocJams')
        .directive('seekBar', ['$document', seekBar]);
})();
