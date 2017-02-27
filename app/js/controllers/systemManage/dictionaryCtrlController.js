/**
 * 创建者：高欢
 * 创建日期：2016/2/5.
 * 描述：字典管理
 */
'use strict';
App.controller('dictionaryCtrl', ["$scope","$http","dailyutilsService","$q","$modal",
    function ($scope,$http,dailyutilsService,$q,$modal) {
        //,qtip,$compile,$templateCache
        //'qtip','$compile','$templateCache',
    /**
     * 将数据显示成tree
     * @type {number}
     */
        $scope.PID=-2;//根节点pid
        $scope.arrayChangeToJson = function (source_data, pid) {
            this.recursive = function (source_data) {
                // 用来返回集合转化为json数据的字段
                var tree_json = [];
                for (var i = 0; i < source_data.length; i++) {
                    var json = {};
                    // 判断父类ID 是否和根节点的ID 相等
                    if (source_data[i].pid == pid) {
                        json.item = source_data[i];
                        json.label =  source_data[i].dict_name;
                        json.children = $scope.sub_recursive(source_data, source_data[i].id);
                        // 把每一个tree节点放入tree_json中
                        tree_json.push(json);
                    }
                }
                return tree_json;
            };
            $scope.sub_recursive = function (source_sub_data, pid) {
                // 用来返回集合转化为json数据的字段
                var tree_json = [];
                for (var i = 0; i < source_sub_data.length; i++) {
                    var json = {};
                    // 判断 判断是否和上级ID 相等
                    if (source_sub_data[i].pid == pid) {
                        json.item = source_sub_data[i];
                        json.label =  source_sub_data[i].dict_name;
                        json.children = $scope.sub_recursive(source_sub_data, source_sub_data[i].id);
                        tree_json.push(json);
                    }
                }
                return tree_json;
            };
            // 调用 调用源数据转化为tree的方法
            var json = this.recursive(source_data);
            return json;
        };

        /*
         * 查询出所有字典表数据
         */
        $scope.dict_data=[];
        $scope.dict_items=[];
        $scope.loadDict = function(){
            $http({
                method:'POST',
                url:BACKSTAGESERVERADDRESS.ADDRESS+'/dict/findAllDictByQuery',
                data: {"dict_type":0,"pid":-1}
            })
                .success(function(data) {
                    if(data.e.code==0){
                        $scope.dict_items =data.data.sendData;
                        $scope.dict_data = data.data.sendData;
                        $scope.dict_data.unshift({'id':0,'pid':-2,'dict_name':'公司'});
                        $scope.dictionary_tree_selected($scope.dict_data[1]);//刷新页面后默认选中第一个字典参数
                        console.log('---------------全部数据-------------------',$scope.dict_data);
                        var json = $scope.arrayChangeToJson($scope.dict_data,$scope.PID);//将数据转化为tree形
                        $scope.dictionary_tree=json;
                        console.log("------------------字典树----------------",$scope.dictionary_tree)
                    }
                })
            };
        $scope.loadDict();


        //选择树
        $scope.dictionary_tree_selected=function(branch){
            $scope.del_selected=branch;
            $scope.dictSelected=branch;
            $scope.selectedItems=branch;
            for(var i=0;i<$scope.dict_items.length;i++){
                if($scope.dictSelected.pid==-2){
                    $scope.dict_pre_name="公司没有上级";
                }else if($scope.dict_items[i].id==$scope.dictSelected.pid){
                    $scope.dict_pre_name=$scope.dict_items[i].dict_name;
                }
            }
        };


        /*
         新添加
         */
        $scope.show_type='';
        $scope.add_dict=function(){
            if(typeof($scope.dictSelected)!='undefined'){
                $scope.selectedItems={};
                $scope.selectedItems.pid=$scope.dictSelected.id;
                console.log('$scope.selectedItems.pid',$scope.selectedItems.pid);
                $scope.dict_pre_name=$scope.dictSelected.dict_name;
                for(var i=0;i<$scope.dict_items.length;i++){
                    if($scope.dictSelected.pid==-2){
                        $scope.selectedItems.dict_code='';
                        $scope.selectedItems.dict_type='';
                        $scope.show_type=1;
                    }else if($scope.dictSelected.pid==$scope.dict_items[i].id){
                        $scope.show_type=2;
                        $scope.selectedItems.dict_code=$scope.dictSelected.dict_code+'_';
                        if($scope.dictSelected.pid==0){
                            $scope.selectedItems.dict_type=$scope.dictSelected.dict_type
                        }else{
                            $scope.selectedItems.dict_type=$scope.dict_items[i].dict_type
                        }
                    }
                }
                $('#add_dict').modal({
                    backdrop:'static',//禁用鼠标点击窗口外部，窗口关闭
                    keyboard:false//禁用esc关闭按键
                });
            }else{
                $.alert_error('请先为要添加的字典参数选择一个上级！');
            }
        };
        /***
         * 编辑
         */
        $scope.edit_dict=function(){
            if(typeof($scope.dictSelected)!='undefined'){
                $scope.selectedItems.pid=$scope.dictSelected.pid;
                for(var i=0;i<$scope.dict_items.length;i++){
                    if($scope.dictSelected.pid==-2){
                        $.alert_error('公司不允许编辑！');
                        //$scope.dictionary_tree_selected($scope.dictSelected);//刷新页面后默认选中第一个字典参数
                    }else if($scope.dictSelected.pid==$scope.dict_items[i].id){
                        $scope.show_type=2;
                        if($scope.dictSelected.pid==0){
                            $scope.selectedItems.dict_type=$scope.dictSelected.dict_type
                        }else{
                            $scope.selectedItems.dict_type=$scope.dict_items[i].dict_type
                        }
                        $('#add_dict').modal({
                            backdrop:'static',//禁用鼠标点击窗口外部，窗口关闭
                            keyboard:false//禁用esc关闭按键
                        });
                    }
                }
            }else{
                $.alert_error('请先选择一个要修改的部门！');
            }
        };

        /**
         * 删除
         */
        $scope.del_dict=function(){
            if(typeof($scope.del_selected)!='undefined'){
                swal({
                        title: "确认删除吗？",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "确定",
                        closeOnConfirm: true,
                        cancelButtonText:"取消"
                    },
                    function(isConfirm){
                        if(isConfirm){
                            $http({
                                method:'POST',
                                url:BACKSTAGESERVERADDRESS.ADDRESS+'/dict/deleteDict/'+$scope.del_selected.id
                            }).success(function(data){
                                if(data.e.code==0){
                                    $.showMessage('删除成功');
                                    $scope.loadDict();
                                }else{
                                    $.showError('删除失败')
                                }
                            })
                        }

                    }
                );
            }else{
                $.alert_error('请先选择一个要删除的字典数据！');
            }
        };



        /**
         * 弹出框取消
         */
        $scope.cancelAddDict=function(){
            $('#add_dict').modal('hide');
            $scope.dictionary_tree_selected($scope.dictSelected);
        };

        /***
         * 验证form表单
         */
        $scope.submitted = false;
        $scope.validate_dictionary_input = function(name, type) {
            var input = $scope.dict_form[name];
            return (input.$dirty || $scope.submitted) && input.$error[type];
        };

        /**
         * 弹出框保存
         */
        $scope.saveDict = function(){

            //必填选项验证
            $scope.submitted = true;
            if ($scope.dict_form.$valid) {
                console.log(' $scope.selectedItems ', $scope.selectedItems);
                console.log('验证成功!!');
                if ($scope.selectedItems.id == null || $scope.selectedItems.id == undefined) {//判断是修改还是添加
                    delete  $scope.selectedItems.id;
                }
                delete  $scope.selectedItems.dict_type;
                console.log('$scope.selectedItems',$scope.selectedItems);
                $http({
                    method: 'post',
                    url: BACKSTAGESERVERADDRESS.ADDRESS + '/dict/updateDict',
                    data: $scope.selectedItems
                }).success(function (data) {
                    if (data.e.code == 0) {
                        $.showMessage('成功！');
                        $scope.loadDict();
                    } else {
                        $.showError('失败！');
                    }
                }).error(function (err) {
                    $.showError('失败！');
                });
                $('#add_dict').modal('hide');
            }else {
                console.log('验证失败');
                return false;
            }
        };

        //下拉框选择

        //$scope.dict_item_select = function(item, model){
        //    console.log(item.dict_code,'role_id',model);
        //    if(typeof(item.dict_code)=='undefined'){
        //        //item.dict_code='';
        //        $scope.selectedItems.dict_code='';
        //        $scope.selectedItems.dict_type=item.dict_type;
        //        $scope.show_type=1;
        //    }else{
        //        $scope.selectedItems.dict_code= item.dict_code+'_';
        //        $scope.selectedItems.dict_type= item.dict_type;
        //        $scope.show_type=2;
        //    }
        //};

        //var Dict_type={1:'角色',2:'职位',3:'行业'};
        //$scope.getDict_type=function(no){
        //    return Dict_type[no];
        //};
    }]);
