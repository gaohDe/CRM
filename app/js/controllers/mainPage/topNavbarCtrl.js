/**
 * �����ߣ��ĵ���
 * �������ڣ�2016/1/27.
 * ��������ҳ��ͷ������
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