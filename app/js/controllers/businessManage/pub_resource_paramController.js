'use strict';
App.controller('pub_resource_paramCtrl', ["$scope", "$http", "dailyutilsService", "$q", "$modal",
    function($scope, $http, dailyutilsService, $q, $modal) {
        $scope.load_pub_resource_param = function() {
            //查询销售领取未签单资源上限设置数据
            $http({
                method: 'post',
                url: BACKSTAGESERVERADDRESS.ADDRESS + '/busiPubResourceParam/findAllBusiPubResourceParam'
            }).success(function(data) {
                if(data.e.code == 0) {
                    $scope.other_pub_resource_paramItems = data.data.sendData;
                    console.log($scope.other_pub_resource_paramItems.resource_cap_daily)
                }
            });
            //查询所有阶段数据
            $http({
                method: 'post',
                url: BACKSTAGESERVERADDRESS.ADDRESS + '/busiBusinessStage/findAllBusiBusinessStage'
            }).success(function(data) {
                if(data.e.code == 0){
                    $scope.pub_resource_paramItems = data.data.sendData;
                }
            })
            console.log($scope.pub_resource_paramdata)
        };
        $scope.load_pub_resource_param();
        //设置为编辑状态
        $scope.chang_edit_status = function() {
            $scope.show_edit = true;
        },
        //保存修改数据
        $scope.savePub_resource_param = function() {
            $scope.show_edit = false;
            console.log($scope.show_edit)
            $scope.pub_resource_paramdata = [];

            for(var i = 0; i < $scope.pub_resource_paramItems.length; i ++) {
                //只把id和overdue_daypush进$scope.pub_resource_paramdata
                $scope.pub_resource_paramdata.push({
                    "id": $scope.pub_resource_paramItems[i].id,
                    "overdue_day": $scope.pub_resource_paramItems[i].overdue_day
                });
            }

            $scope.data = {
                "BusiPubResourceParam": $scope.other_pub_resource_paramItems,
                "BusiBusinessStage": $scope.pub_resource_paramdata
            };
            $http({
                method: 'post',
                url: BACKSTAGESERVERADDRESS.ADDRESS + '/busiPubResourceParam/updateBusiPubResourceParam',
                data: $scope.data
            }).success(function (data) {
                if (data.e.code == 0) {
                    $scope.load_pub_resource_param();
                    $.showMessage('保存成功');
                } else {
                    $.showMessage('保存失败');
                }
            });
        };

        $scope.cancel=function(){
            $scope.show_edit = false;
            $scope.load_pub_resource_param();
        };
    }]);