/**
 * Created by ÈÄµÀÀ¤ on 2016/1/25.
 */
App.service('ChartData', ["$resource", function($resource){

    var opts = {
        get: { method: 'GET', isArray: true }
    };
    return {
        load: function(source){
            return $resource(source, {}, opts).get();
        }
    };
}]);