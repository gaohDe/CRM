/**
 * Created by ÈÄµÀÀ¤ on 2016/1/26.
 */
App.directive('imageloaded', [
    // Copyright(c) 2013 Andr¨¦ K?nig <akoenig@posteo.de>
    // MIT Licensed
    function () {

        'use strict';

        return {
            restrict: 'A',

            link: function(scope, element, attrs) {
                var cssClass = attrs.loadedclass;

                element.bind('load', function (e) {
                    angular.element(element).addClass(cssClass);
                });
            }
        }
    }
]);