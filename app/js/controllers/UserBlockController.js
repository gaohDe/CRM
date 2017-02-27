/**
 * Created by ÈÄµÀÀ¤ on 2016/1/26.
 */

App.controller('UserBlockController', ['$scope', function($scope) {

    $scope.userBlockVisible = true;

    $scope.$on('toggleUserBlock', function(event, args) {

        $scope.userBlockVisible = ! $scope.userBlockVisible;

    });

}]);