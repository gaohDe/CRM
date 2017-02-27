/**
 * 创建者：饶道坤
 * 创建日期：2016/1/30.
 * 描述：组织架构详情
 */
App.controller('organizationDetailCtrl', ['$scope','$q', '$http', '$state','authService','$localStorage','dailyutilsService','$window','$stateParams',
    function($scope,$q, $http, $state,authService,$localStorage,dailyutilsService,$window,$stateParams) {

            $scope.userManageItems = {
                sex:1
            };
        //console.log('$stateParams',$stateParams);

        console.log('$stateParams.user_id',$stateParams.user_id);
        console.log('$stateParams.operateState',$stateParams.operateState);

        $scope.user_id = $stateParams.user_id;
        $scope.operateState = $stateParams.operateState;
        //$scope.findUserById = function(user_id){
        //    $http({
        //        method:'POST',
        //        url:BACKSTAGESERVERADDRESS.ADDRESS+'/user/getAllUser',
        //        data:{id:user_id}
        //    })
        //        .success(function(data) {
        //            if(data.e.code==0){
        //                $.showMessage('保存成功');
        //                $scope.tableParams.reload();
        //            }else{
        //                $.showError('保存失败');
        //            }
        //        })
        //}




        //是否离职
        $scope.is_quit_job_items = [{label:'否',value:0},{label:'是',value:1}]

        //查询职务
            $http({
                method:'POST',
                url:BACKSTAGESERVERADDRESS.ADDRESS+'/dict/findAllDictByQuery',
                data:{"dict_type":2,"pid":-1}
            })
                .success(function(data) {
                    if(data.e.code==0){
                        console.log('data',data);
                            $scope.job_items = data.data.sendData;
                            console.log('$scope.job_items',$scope.job_items);
                    }
                })



        //查询角色
        $http({
            method:'POST',
            url:BACKSTAGESERVERADDRESS.ADDRESS+'/role/getRoleTree'
        })
            .success(function(data) {
                if(data.e.code==0){
                    console.log('data',data);
                        $scope.role_items = data.data.sendData;
                        console.log('$scope.role_items',$scope.role_items);

                }
            })





        //查询部门
        $http({
            method:'POST',
            url:BACKSTAGESERVERADDRESS.ADDRESS+'/department/findDepartByPid/0'
        })
            .success(function(data) {
                if(data.e.code==0){
                    console.log('data',data);
                        $scope.department_items = data.data.sendData;
                        console.log('$scope.department_items',$scope.department_items);

                }
            })

        if($scope.user_id>0){
            $http({
                method:'POST',
                url:BACKSTAGESERVERADDRESS.ADDRESS+'/user/getAllUser',
                data:{id:$scope.user_id,page:0,rows:0,query:null}
            })
                .success(function(data) {
                    if(data.e.code==0){
                        $scope.userManageItems = data.data.sendData[0];
                        console.log('$scope.userManageItems',$scope.userManageItems);
                    }
                })
        }

        //清空下拉框
        $scope.select_items_reset = function(item_name){

            $scope.userManageItems[''+item_name+''] = undefined;
        }






        //保存用户信息
        $scope.save_user = function() {
            $scope.submitted = true;
            if ($scope.userform.$valid) {
                console.log(' $scope.userManageItems ', $scope.userManageItems );
                console.log('验证成功!!');
                delete $scope.userManageItems.modify_time;
                delete $scope.userManageItems.modify_user_id;

                $http({
                    method:'POST',
                    url:BACKSTAGESERVERADDRESS.ADDRESS+'/user/updateUser',
                    data:$scope.userManageItems
                })
                    .success(function(data) {
                        console.log('保存用户结果',data);
                        if(data.e.code==0){
                            $.showMessage('保存成功');
                            $state.go('app.org.sys_mgr.framework');
                            //$scope.tableParams.reload();
                        }else{
                            $.showError(data.e.desc);
                        }
                    })
            } else {
                console.log('验证失败');
                return false;
            }
        };




        //验证form表单
        $scope.submitted = false;
        $scope.validateInput = function(name, type) {
            var input = $scope.userform[name];
            return (input.$dirty || $scope.submitted) && input.$error[type];
        };


    }]);