'use strict';
angular.module('gantt.bounds', ['gantt', 'gantt.bounds.templates']).directive('ganttBounds', ['moment', '$compile', function(moment, $compile) {
    return {
        restrict: 'E',
        require: '^gantt',
        link: function(scope, element, attrs, ganttCtrl) {
            var api = ganttCtrl.gantt.api;

            api.directives.on.new(scope, function(directiveName, taskScope, taskElement) {
                if (directiveName === 'ganttTask') {
                    taskElement.append($compile('<gantt-task-bounds></gantt-bounds>')(taskScope));
                }
            });

            api.tasks.on.clean(scope, function(model) {
                if (model.est !== undefined && !moment.isMoment(model.est)) {
                    model.est = moment(model.est);  //Earliest Start Time
                }
                if (model.lct !== undefined && !moment.isMoment(model.lct)) {
                    model.lct = moment(model.lct);  //Latest Completion Time
                }
            });
        }
    };
}]);