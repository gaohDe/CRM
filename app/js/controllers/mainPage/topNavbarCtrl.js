/**
 * 创建者：饶道坤
 * 创建日期：2016/1/27.
 * 描述：主页面头部控制
 */
App.controller('topNavbarCtrl', ['$scope', '$http', '$state','authService','$localStorage', function($scope, $http, $state,authService,$localStorage) {


    $scope.navigation_div_one = {marginLeft:'118px'}
    $scope.navigation_div_two = {marginLeft:'288px'}
    $scope.logOut = function(){
        authService.destroy();

        $state.go('page.login');

        console.log("logout----->");


    }

}]);