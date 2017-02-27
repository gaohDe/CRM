/**
 * Created by ÈÄµÀÀ¤ on 2016/1/26.
 */
App.factory('colors', ['APP_COLORS', function(colors) {

    return {
        byName: function(name) {
            return (colors[name] || '#fff');
        }
    };

}]);