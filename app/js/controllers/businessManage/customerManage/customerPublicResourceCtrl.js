/**
 * �����ߣ��ĵ���
 * �������ڣ�2016/2/17.
 * ������������Դ
 */
App.controller('customerPublicResourceCtrl', ['$scope', '$http', '$state','$localStorage', function($scope, $http, $state,$localStorage) {



    //ʱ��ؼ�����
    $scope.expected_transaction_timeOpen = function ($event) {
        console.log($scope.startOpened);
        $event.preventDefault();
        $event.stopPropagation();
        $scope.startOpened = !$scope.startOpened;
    };















}]);