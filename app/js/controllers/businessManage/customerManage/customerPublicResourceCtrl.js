/**
 * 创建者：饶道坤
 * 创建日期：2016/2/17.
 * 描述：公共资源
 */
App.controller('customerPublicResourceCtrl', ['$scope', '$http', '$state','$localStorage', function($scope, $http, $state,$localStorage) {



    //时间控件调用
    $scope.expected_transaction_timeOpen = function ($event) {
        console.log($scope.startOpened);
        $event.preventDefault();
        $event.stopPropagation();
        $scope.startOpened = !$scope.startOpened;
    };















}]);