
'use strict';
App.controller('RolePermitCtrl', ["$scope","$http","dailyutilsService","$q","$modal",
    function ($scope,$http,dailyutilsService,$q,$modal) {

        $scope.selectItem={};



        $scope.PID = 2;
        /**
         * @param source_data  源菜单数据(集合类型)
         * 说明: 此方法把集合类型转化为树类型
         * @author han
         * @Date 2016/0201
         */
        $scope.arrayChangeToJson = function (role_menu_items,source_data, pid) {
            /**
             * @param source_data 源数据
             * @returns {Array}  查询出根节点下的tree数据,并放入tree_json中
             * @author han
             */
            $scope.recursive = function (source_data) {
                // 用来返回集合转化为json数据的字段
                var tree_json = [];
                for (var i = 0; i < source_data.length; i++) {
                    // 定义tree节点的属性
                    var json = {};
                    // 判断父类ID 是否和根节点的ID 相等
                    if (source_data[i].pid == pid) {
                        json.item = source_data[i];
                        if(role_menu_items!=null){
                            for(var j=0;j<role_menu_items.length;j++){
                                if(role_menu_items[j].func_id == source_data[i].id){
                                    json.item.enabled = true;
                                }
                            }
                        }
                        json.children = $scope.sub_recursive(source_data, source_data[i].id);
                        // 把每一个tree节点放入tree_json中
                        tree_json.push(json);
                    }
                }
                return tree_json;
            };

            /**
             * @param source_sub_data 子节点下
             * @param pid 父类的ID
             * @returns {Array}
             *      说明: 循环节点下有无可用节点 如有则继续便利
             * @author 韩武洽
             */
            $scope.sub_recursive = function (source_sub_data, pid) {
                // 用来返回集合转化为json数据的字段
                var tree_json = [];
                for (var i = 0; i < source_sub_data.length; i++) {
                    var json = {};
                    // 判断 判断是否和上级ID 相等
                    if (source_sub_data[i].pid == pid) {
                        json.item = source_sub_data[i];
                        if(role_menu_items!=null){
                            for(var j=0;j<role_menu_items.length;j++){
                                if(role_menu_items[j].func_id == source_sub_data[i].id){
                                    json.item.enabled = true;
                                }
                            }
                        }
                        json.children = $scope.sub_recursive(source_sub_data, source_sub_data[i].id);
                        tree_json.push(json);
                    }
                }
                return tree_json;
            };

            // 调用 调用源数据转化为tree的方法
            var json = $scope.recursive(source_data);
            return json;
        };


        //字典表加载角色大类
        $scope.dictRole = function(dictionaries_json){
            $http({
                method:'POST',
                url:BACKSTAGESERVERADDRESS.ADDRESS+'/dict/findAllDictByQuery',
                data:dictionaries_json
            })
                .success(function(data) {
                    console.log('jjjjjjjjjjjjjjjjjjjjjj',data);
                    if(data.e.code==0){
                        console.log('data',data);
                        if(dictionaries_json.dict_type==1){
                            $scope.role_items = data.data.sendData;
                            console.log('$scope.role_items',$scope.role_items);
                        }
                        if(dictionaries_json.dict_type==2){
                            $scope.job_items = data.data.sendData;
                            console.log('$scope.job_items',$scope.job_items);
                        }
                    }
                })
        };

        //查询角色
        $scope.dictRole({"dict_type":1,"pid":0});
        //查询职务
        $scope.dictRole({"dict_type":2,"pid":0});
        //查询行业
        $scope.dictRole({"dict_type":3,"pid":0});


        /**
         * 初始化加载角色信息
         * 从服务器获取请求来的list数据，将该数据转化成angularJs能够识别的json格式。
         */
        $scope.loadRole = function(){
            $http({
                method: "post",
                url: BACKSTAGESERVERADDRESS.ADDRESS+'/role/getRoleTree'
            }).success(function(data) {
                console.log('getRoleTree',data);
                var code = data.e.code;
                if(0 == code){
                    //var role_data = data.data.sendData;//正确的数据集合
                    $scope.role_menu = data.data.sendData;//正确的数据集合
                    $scope.setSelected($scope.role_menu[0]);
                }else{

                }
            }).error(function(err){
                console.log("rst err=",err);
            });
        };
        $scope.loadRole();


        /**
         * 增加角色操作
         */
        $scope.toAddRoleMenu = function(){
            $scope.selectItem ={};
            console.log($scope.selectItem);
            $('#addRoleMenu').modal({
                backdrop:'static',//禁用鼠标点击窗口外部，窗口关闭
                keyboard:false//禁用esc关闭按键
            });
        };

        /**
         * 修改角色操作
         */
        $scope.toEditRoleMenu = function(item){
            $scope.selectItem=item;
            console.log("ddddddddddddddddddddddddddd",item);
            $('#addRoleMenu').modal({
                backdrop:'static',//禁用鼠标点击窗口外部，窗口关闭
                keyboard:false//禁用esc关闭按键
            });
        };
        /**
         * 选中下拉框菜单
         */
        $scope.role_item_select = function(item, model){
            console.log(item,'role_id',model);
        };

        /**
         * 提交表单的操作
         * 包括角色的基本信息，以及该角色下的权限菜单。
         */
        $scope.roleMenuSubmit = function(){

        console.log('$scope.selectItem--------------------',$scope.selectItem);

        if($scope.selectItem.id==null || $scope.selectItem.id==undefined){//判断是修改还是添加
                delete  $scope.selectItem.id;
        }
            $http({
                method: 'post',
                url: BACKSTAGESERVERADDRESS.ADDRESS+'/role/updateRole',
                data:$scope.selectItem
            }).success(function(data) {
                if(data.e.code==0){
                    $.showMessage('成功！');
                    $scope.loadRole();
                }else{
                    $.showError('失败！');
                }
            }).error(function(err){
                $.showError('失败！');
            });
            $('#addRoleMenu').modal('hide');

        };
        /**
         * 取消角色添加
         */
        $scope.cancelAddRole=function(){
            $('#addRoleMenu').modal('hide');
        };

        /**
         * 删除角色
         */
        $scope.deleteRole=function(){
            console.log('$scope.selectItem2',$scope.selectItem);
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
                        url:BACKSTAGESERVERADDRESS.ADDRESS+'/role/deleteRole/'+$scope.selectItem.id
                    })
                        .success(function(data) {
                            if(data.e.code==0){
                                $.showMessage('删除成功！');
                                $scope.loadRole();
                            }else{
                                $.showMessage('删除失败！');
                            }
                        })
                        .error(function(data) {
                            console.log("http error",data);
                        });

                }
            })
        };
        $(document).ready(function(){
            $("ul#role_menu_ul li").mouseover(function(){
                layer.tips('Hi，我是tips', '吸附元素选择器，如#id');
            });
            $("ul#role_menu_ul li").mouseout(function(){
            });
        });

        /**
         * 加载所有菜单
         */
        $scope.loadPermitMenu = function(role_menu_items) {
            $http({
                method:'POST',
                url:BACKSTAGESERVERADDRESS.ADDRESS+'/funcTree/getMenuTree/0'
            })
                .success(function(data) {
                    console.log('所有data',data);
                    if(data.e.code==0){
                        var menu_data = data.data.sendData;//正确的数据集合
                        $scope.menu_two = data.data.sendData;
                        console.log("-----------移动端--------menu_data-----------------",menu_data);
                        var json_web = $scope.arrayChangeToJson(role_menu_items,menu_data,1);
                        var json_app = $scope.arrayChangeToJson(role_menu_items,menu_data,2);
                        console.log("--------移动端----json---------------",json_web);
                        console.log("--------移动端----json---------------",json_app);
                        $scope.menu_web = json_web;
                        $scope.menu_app = json_app;
                    }
                })
        };
        $scope.loadPermitMenu(null);

        //选中角色，并查询该角色下的菜单权限

        $scope.setSelected = function(item){
            $scope.selectItem=item;
            console.log('$scope.selectItem1',$scope.selectItem);
            $http({
                    method:'POST',
                    url:BACKSTAGESERVERADDRESS.ADDRESS+'/rolesPermit/findFuncTreeByRoleId/'+item.id
                })
                    .success(function(data) {
                        if(data.e.code==0){
                           console.log(' 角色菜单信息',data);
                            $scope.role_menu_items = data.data.sendData;
                            $scope.loadPermitMenu($scope.role_menu_items);
                            $scope.add_role_menu_array.length=0;
                            $scope.del_role_menu_array.length=0;
                        }
                    });
        };


        //判断是否存在元素
        $scope.judge_exist = function(array,obj){
            var i = array.length;
            while (i--) {
                if (array[i].func_id === obj.func_id) {
                    return true;
                }
            }
            return false;
        };


        //判断是否存在元素
        $scope.judge_exist_two = function(array,ids,obj_id){
            var i = array.length;
            while (i--) {
                if (array[i][''+ids+''] === obj_id && array[i].enabled==true) {
                    return true;
                }
            }
            return false;
        };

        //勾选子级和父级菜单
        $scope.checked_menu = function(items){
            for(var i=0;i<$scope.menu_two.length;i++){
                // 如果点击勾选的是父级菜单，则同时勾选该父级菜单下的所有子级菜单的勾选状态
                if(items.pid==$scope.menu_two[i].id){
                    $scope.menu_two[i].enabled = true;
                    console.log('勾选的是父级菜单');
                    var add_json = {role_id:$scope.selectItem.id,func_id:items.id};
                    if($scope.judge_exist($scope.add_role_menu_array,add_json)==false && $scope.judge_exist($scope.role_menu_items,add_json)==false){
                        $scope.add_role_menu_array.push(add_json);

                        for(var q=0;q<$scope.menu_two.length;q++){
                            if(items.pid == $scope.menu_two[q].id){
                                var pid_json = {role_id:$scope.selectItem.id,func_id:$scope.menu_two[q].id};
                                if($scope.judge_exist($scope.add_role_menu_array,pid_json)==false  && $scope.judge_exist($scope.role_menu_items,pid_json)==false){
                                    $scope.add_role_menu_array.push(pid_json);
                                }
                            }
                        }
                    }else{
                        console.log('删除del_json');
                        for(var p=0;p<$scope.menu_two.length;p++){
                            if(items.pid == $scope.menu_two[p].id || items.id == $scope.menu_two[p].id){
                                for(var j=0;j<$scope.del_role_menu_array.length;j++){
                                    if($scope.del_role_menu_array[j].func_id== $scope.menu_two[p].id){
                                        $scope.del_role_menu_array.splice(j,1);
                                    }
                                }
                            }
                        }
                    }
                }

                //如果点击勾选的是子级菜单，则同时勾选该子级菜单的父级菜单
                if(items.id==$scope.menu_two[i].pid){
                    $scope.menu_two[i].enabled = true;
                    console.log('勾选的是子级菜单');
                    $scope.checked_menu($scope.menu_two[i]);
                }
            }
        };


        //取消子级和父级的勾选状态
        $scope.cancel_checked_menu = function(items){
            for(var i=0;i<$scope.menu_two.length;i++){
                // 如果点击取消勾选的是父级菜单，则同时取消该父级菜单下的所有子级菜单的勾选状态
                if(items.id==$scope.menu_two[i].pid){
                    $scope.menu_two[i].enabled = false;
                    console.log('取消的是父级菜单');
                    var del_json = {role_id:$scope.selectItem.id,func_id:items.id};
                    if($scope.judge_exist($scope.del_role_menu_array,del_json)==false && $scope.judge_exist($scope.role_menu_items,del_json)==true){
                        $scope.del_role_menu_array.push(del_json);

                        for(var q=0;q<$scope.menu_two.length;q++){
                            if(items.id == $scope.menu_two[q].pid){
                                var pid_json = {role_id:$scope.selectItem.id,func_id:$scope.menu_two[q].id};
                                if($scope.judge_exist($scope.del_role_menu_array,pid_json)==false  && $scope.judge_exist($scope.role_menu_items,pid_json)==true){
                                    $scope.del_role_menu_array.push(pid_json);
                                }
                            }
                        }
                    }else{
                        for(var p=0;p<$scope.menu_two.length;p++){
                            if(items.id == $scope.menu_two[p].pid || items.id == $scope.menu_two[p].id){
                                for(var j=0;j<$scope.add_role_menu_array.length;j++){
                                    if($scope.add_role_menu_array[j].func_id== $scope.menu_two[p].id){
                                        $scope.add_role_menu_array.splice(j,1);
                                    }
                                }
                            }
                        }
                    }
                    $scope.cancel_checked_menu($scope.menu_two[i]);
                }

                //如果点击取消的是子级菜单，则只取消该子级菜单自己的勾选状态
                if(items.pid==$scope.menu_two[i].id){
                    console.log('取消的是子级菜单');
                    //如果点击取消的子级菜单是其父级菜单下唯一一个勾选的，则同时取消该子级菜单的父级菜单的勾选状态
                    if($scope.judge_exist_two($scope.menu_two,'pid',items.pid)==false){
                        $scope.menu_two[i].enabled = false;

                        var del_json = {role_id:$scope.selectItem.id,func_id:items.id};
                        if($scope.judge_exist($scope.del_role_menu_array,del_json)==false && $scope.judge_exist($scope.role_menu_items,del_json)==true){
                            $scope.del_role_menu_array.push(del_json);

                            for(var q=0;q<$scope.menu_two.length;q++){
                                if(items.pid == $scope.menu_two[q].id){
                                    var pid_json = {role_id:$scope.selectItem.id,func_id:$scope.menu_two[q].id};
                                    if($scope.judge_exist($scope.del_role_menu_array,pid_json)==false && $scope.judge_exist($scope.role_menu_items,pid_json)==true){
                                        $scope.del_role_menu_array.push(pid_json);
                                    }

                                }
                            }
                        }else{
                            console.log('删除的是$scope.add_role_menu_array');
                            for(var p=0;p<$scope.menu_two.length;p++){
                                if(items.pid == $scope.menu_two[p].id || items.id == $scope.menu_two[p].id){
                                    for(var j=0;j<$scope.add_role_menu_array.length;j++){
                                        if($scope.add_role_menu_array[j].func_id== $scope.menu_two[p].id){
                                            $scope.add_role_menu_array.splice(j,1);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };



        $scope.add_role_menu_array = new Array();
        $scope.del_role_menu_array = new Array();
        //角色菜单操作
        //$scope.isNodeSelected=0;
        $scope.click_roleMenu_Node = function(node){
            //$scope.isNodeSelected=!$scope.isNodeSelected;
            //console.log('$scope.isNodeSelected',$scope.isNodeSelected);
            console.log('node.item.enabled',node.item.enabled);
            if(node.item.enabled==true){
                //勾选子级和父级
                $scope.checked_menu(node.item);

                console.log('$scope.menu_two',$scope.menu_two);
                //var add_json = {role_id:$scope.selectItem.id,func_id:node.item.id};
                //console.log('是否存在》',$scope.judge_exist($scope.add_role_menu_array,add_json));
                //if($scope.judge_exist($scope.add_role_menu_array,add_json)==false && $scope.judge_exist($scope.role_menu_items,add_json)==false){
                //    $scope.add_role_menu_array.push(add_json);
                //
                //}else{
                //    for(var i=0;i<$scope.del_role_menu_array.length;i++){
                //        if($scope.del_role_menu_array[i].func_id==add_json.func_id){
                //            $scope.del_role_menu_array.splice(i,1);
                //        }
                //    }
                //}
            }

            if(node.item.enabled==false){
                //取消子级和父级勾选
                $scope.cancel_checked_menu(node.item);

                var del_json = {role_id:$scope.selectItem.id,func_id:node.item.id};
                console.log('是否存在》',$scope.judge_exist($scope.del_role_menu_array,del_json));
                if($scope.judge_exist($scope.del_role_menu_array,del_json)==false && $scope.judge_exist($scope.role_menu_items,del_json)==true){
                    $scope.del_role_menu_array.push(del_json);
                }else{
                    for(var i=0;i<$scope.add_role_menu_array.length;i++){
                        if($scope.add_role_menu_array[i].func_id==del_json.func_id){
                            $scope.add_role_menu_array.splice(i,1);
                        }

                    }
                }

            }

            console.log('$scope.add_role_menu_array',$scope.add_role_menu_array);
            console.log('$scope.del_role_menu_array',$scope.del_role_menu_array);
            console.log('node',node);

        };



        //保存角色权限菜单
        $scope.save_role_menu = function(){
            if($scope.selectItem!=undefined){

                console.log('$scope.role_menu_items',$scope.role_menu_items);

                $http({
                    method:'POST',
                    url:BACKSTAGESERVERADDRESS.ADDRESS+'/rolesPermit/saveAndDelFuncTree',
                    data:{save:JSON.stringify($scope.add_role_menu_array),del:JSON.stringify($scope.del_role_menu_array)}
                })
                    .success(function(data) {
                        if(data.e.code==0){
                            $.showMessage('保存成功');
                            $scope.add_role_menu_array.length=0;
                            $scope.del_role_menu_array.length=0;
                        }else{
                            $.showError('保存失败');
                        }
                    })
            }else{
                $.alert_warning('请先选择角色！');
            }
            console.log("$scope.selectItem",$scope.selectItem);
        };

        $scope.isTab_selected=1;
        $scope.tab_selected=function(item){
            $scope.isTab_selected='';
            $scope.isTab_selected=item;
            console.log('$scope.isTab_selected:',$scope.isTab_selected);
        }


    }]);


