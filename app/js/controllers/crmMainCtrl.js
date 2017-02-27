/**
 * 创建者：饶道坤
 * 创建日期：2016/2/26.
 * 描述：
 */
App.controller('crmMainCtrl', ['$rootScope', '$scope', '$state', '$http', '$timeout', 'Utils','$localStorage',
    function($rootScope, $scope, $state, $http, $timeout, Utils,$localStorage){
        console.log('进入');
        $scope.dfds = {width:'77.8%'};

        $scope.cff =  {width:'74.8%'};

        $scope.crm_main_style_true =  {marginLeft:'118px',height:'100%'};
        $scope.crm_main_style_false =  {marginLeft:'288px'};
    }]);