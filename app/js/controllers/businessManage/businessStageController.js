/**
 * Created by 高欢 on 2016/2/16.
 */
'use strict';
App.controller('business_stageCtrl', ["$scope","$http","dailyutilsService","$q","$modal",
    function ($scope,$http,dailyutilsService,$q,$modal) {
        $scope.selected={};
        //查询所有阶段
        $scope.load_stage=function(){
            $http({
                method:'post',
                url:BACKSTAGESERVERADDRESS.ADDRESS+'/busiBusinessStage/findAllBusiBusinessStage'
            }).success(function(data){
                if(data.e.code==0){
                    $scope.busi_stage=data.data.sendData;
                    $scope.length=$scope.busi_stage.length;
                    console.log('---------所有数据json------------',$scope.busi_stage);
                    if($scope.shanchu==1||$scope.shanchu==undefined){
                        $scope.selected.id=$scope.busi_stage[0].id;//刷新页面或删除一个阶段后默认选中第一个阶段
                        $scope.load_stageById($scope.busi_stage[0].id);//刷新页面或删除一个阶段后默认显示第一个阶段的数据
                    }else if($scope.shanchu==2){
                        $scope.load_stageById($scope.selected.id);//保存或取消编辑后默认显示当前阶段数据
                    }
                }
            })
        };
        $scope.load_stage();


        //选中阶段
        $scope.stageSelect=function(item) {
            console.log('itemitem:',item);
            var stage_id='';
            var margin_top=0;
            var margin_bottom=0;
            var div_height=0;
            stage_id='#stage_'+item.seq;
            margin_top=$(stage_id).offset().top;
            margin_bottom=document.body.clientHeight-margin_top;
            div_height=document.getElementById('stage_info_modal').offsetHeight;
            console.log('margin_top',margin_top,'margin_bottom',margin_bottom,'div_height',div_height);
            if(margin_bottom<div_height){
                document.getElementById('arrow_gh').style.top=div_height-margin_bottom+17+'px';
                document.getElementById('stage_info_modal').style.marginTop=document.body.clientHeight-div_height-100+'px';
            }else{
                document.getElementById('arrow_gh').style.top=10+'px';
                document.getElementById('stage_info_modal').style.marginTop=margin_top-96+'px';
            }
            $scope.hjitems=0;
            $scope.selected=item;
            $scope.busi_stage2 = item;//选中的数据给busi_stage2
            console.log('$scope.busi_stage2',$scope.busi_stage2);
        };

        //通过ID查询阶段详情
        $scope.load_stageById=function(item){
            $http({
                method:'post',
                url:BACKSTAGESERVERADDRESS.ADDRESS+'/busiBusinessStage/findBusiBusinessStageById/'+item
            }).success(function(data){
                if(data.e.code==0){
                    $scope.busi_stage2=data.data.sendData[0];
                }
            })
        };

        //新增阶段
        $scope.addStage=function(){
            $scope.hjitems=1;
            $scope.busi_stage2 = {};//新增的时候清空数据
            $('#stage_info').modal({
                backdrop:'static',//禁用鼠标点击窗口外部，窗口关闭
                keyboard:false//禁用esc关闭按键
            });
        };

        //编辑阶段参数
        $scope.editStage=function(){
            $scope.hjitems=1;
            //$scope.busi_stage2 = item;
            //console.log('$scope.busi_stage555',$scope.busi_stage2)
        };

         //验证form表单
        $scope.submitted = false;
        $scope.validate_stage_input = function(name, type) {
            var input = $scope.stage_form[name];
            return (input.$dirty || $scope.submitted) && input.$error[type];
        };

        //保存
        $scope.save_stage=function() {
            $scope.hjitems = 0;
            $scope.submitted = true;
            if ($scope.stage_form.$valid) {
                $http({
                    method: 'post',
                    url: BACKSTAGESERVERADDRESS.ADDRESS + '/busiBusinessStage/updateBusiBusinessStage',
                    data: $scope.busi_stage2
                }).success(function (data) {
                    if (data.e.code == 0) {
                        $scope.shanchu=2;
                        $scope.selected.id=$scope.busi_stage2;
                        $scope.load_stage();
                        $.showMessage('保存成功');
                    } else {
                        $.showMessage('保存失败');
                    }
                });
                $('#stage_info').modal('hide');
            }
        };

        //删除阶段
        $scope.delStage=function(){
            swal({
                title: "删除该阶段之后，所有的动作和消息提示都将被删除。确认删除吗？",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确定",
                closeOnConfirm: true,
                cancelButtonText:"取消"
            },function(isConfirm){
                    if(isConfirm){
                        $http({
                            method:'post',
                            url:BACKSTAGESERVERADDRESS.ADDRESS+'/busiBusinessStage/deleteBusiBusinessStage/'+$scope.selected.id
                        }).success(function (data) {
                            if(data.e.code==0){
                                $scope.shanchu=1;
                                $scope.load_stage();
                                $.showMessage('删除成功');
                            }else{
                                $.showMessage('删除失败');
                            }
                        }).error(function(data){
                            console.log('http err',data)
                        });
                    }
                }
            );
        };

        //取消按钮
        $scope.cancel=function(){
            $scope.hjitems=0;
            $scope.shanchu=2;
            $scope.load_stage();
        }
    }]);
