/**
 * 创建者：饶道坤
 * 创建日期：2016/2/18.
 * 描述：菜单管理
 */
App.controller('menuManageCtrl', ['$scope', '$http', '$state','$localStorage', function($scope, $http, $state,$localStorage) {



    $scope.arrayMenuChangeToJson = function (source_data, pid) {

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
                    json.label =  source_data[i].func_title;
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
                    json.label =  source_sub_data[i].func_title;
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



    /**
     * 加载所有菜单
     */
    $scope.loadMenuItems = function() {
        $http({
            method:'POST',
            url:BACKSTAGESERVERADDRESS.ADDRESS+'/funcTree/getAllMenuTree'
        })
        .success(function(data) {
            console.log('菜单 data',data);
            if(data.e.code==0){
                var menu_data = data.data.sendData;//正确的数据集合
                console.log('menu_data',menu_data);
                $scope.web_menu_items = menu_data[0];
                $scope.web_menu_selected($scope.web_menu_items[0]);
                console.log('$scope.web_menu_items',$scope.web_menu_items);
                $scope.phone_menu_items = menu_data[1];
                $scope.phone_menu_selected($scope.phone_menu_items[0]);
                $scope.web_menu_tree= $scope.arrayMenuChangeToJson(menu_data[0],0);
                $scope.phone_menu_tree= $scope.arrayMenuChangeToJson(menu_data[1],0);
                console.log('$scope.web_menu_tree',$scope.web_menu_tree);
                console.log('$scope.phone_menu_tree',$scope.phone_menu_tree);
            }
        })
    };
    $scope.loadMenuItems();


    $scope.web_menu_selected = function(branch) {
        console.log('mennu_selected>',branch);
        $scope.web_menu_selected_items = branch;
        for(var i=0;i<$scope.web_menu_items.length;i++){
            if($scope.web_menu_selected_items.pid==0){
                $scope.web_menu_pre_name="平台管理端没有上级菜单!";
            }else if($scope.web_menu_items[i].id==$scope.web_menu_selected_items.pid){
                $scope.web_menu_pre_name=$scope.web_menu_items[i].func_title;
            }
        }
    };

    $scope.phone_menu_selected = function(branch) {
        console.log('mennu_selected>',branch);
        $scope.phone_menu_selected_items = branch;
        for(var i=0;i<$scope.phone_menu_items.length;i++){
            if($scope.phone_menu_selected_items.pid==0){
                $scope.phone_menu_pre_name="移动端没有上级菜单!";
            }else if($scope.phone_menu_items[i].id==$scope.phone_menu_selected_items.pid){
                $scope.phone_menu_pre_name=$scope.phone_menu_items[i].func_title;
            }
        }
        console.log('$scope.phone_menu_selected_items',$scope.phone_menu_selected_items);
    };

    //打开新增菜单窗口
    $scope.open_add_menuModal = function(operate_type,menu_type){
        $scope.operate_type = operate_type;
        $scope.menu_type = menu_type;
        $scope.menu_selected_items = {};
        if(menu_type==1){
            console.log('进入web');
            console.log('$scope.web_menu_selected_items.pid',$scope.web_menu_selected_items.pid);
            if($scope.web_menu_selected_items.pid==0 ||$scope.web_menu_selected_items.pid==1){
                $scope.web_menu_pre_name=$scope.web_menu_selected_items.func_title;
                console.log('$scope.web_menu_pre_name',$scope.web_menu_pre_name);
                $scope.menu_selected_items.func_code=$scope.web_menu_selected_items.func_code+'.';
                $scope.menu_selected_items.pid = $scope.web_menu_selected_items.id;
            }else{
                $scope.isSecondRole=1;
            }
        }
        if(menu_type==2){
            console.log('进入phone');
            if($scope.phone_menu_selected_items.pid==0||$scope.phone_menu_selected_items.pid==2){
                $scope.phone_menu_pre_name=$scope.phone_menu_selected_items.func_title;
                $scope.menu_selected_items.func_code=$scope.phone_menu_selected_items.func_code+'.';
                $scope.menu_selected_items.pid = $scope.phone_menu_selected_items.id;
            }else{
                $scope.isSecondRole=1;
            }
        }
        if(typeof($scope.menu_selected_items.pid)!='undefined'){
            $('#menuModal').modal({
                backdrop:'static',//禁用鼠标点击窗口外部，窗口关闭
                keyboard:false//禁用esc关闭按键
            });
        }else if($scope.isSecondRole){
            $.alert_error('三级菜单下不允许再添加四级菜单！');
        }else{
            $.alert_error('请先选择一个要新增的菜单，所在的父级菜单！');
        }
    };

    //打开编辑菜单窗口
    $scope.open_edit_menuModal = function(operate_type,menu_type){

        $scope.operate_type = operate_type;
        $scope.menu_type = menu_type;
        if(menu_type==1){
            $scope.menu_selected_items =$scope.web_menu_selected_items;
            if(typeof($scope.menu_selected_items)!='undefined'){
                for(var i=0;i<$scope.web_menu_items.length;i++){
                    if($scope.web_menu_selected_items.pid==0){
                        $.alert_error('平台管理端不能编辑！');
                    }else if($scope.web_menu_items[i].id==$scope.web_menu_selected_items.pid){
                        $scope.web_menu_pre_name=$scope.web_menu_items[i].func_title;
                        $('#menuModal').modal({
                            backdrop:'static',//禁用鼠标点击窗口外部，窗口关闭
                            keyboard:false//禁用esc关闭按键
                        });
                    }
                }
            }else{
                $.alert_error('请先选择一个要修改的菜单！');
            }

        }
        if(menu_type==2){
            $scope.menu_selected_items =$scope.phone_menu_selected_items;
            if(typeof($scope.menu_selected_items)!='undefined'){
                for(var j=0;j<$scope.phone_menu_items.length;j++){
                    if($scope.phone_menu_selected_items.pid==0){
                        $.alert_error('移动端不能编辑！');
                    }else if($scope.phone_menu_items[j].id==$scope.phone_menu_selected_items.pid){
                        $scope.phone_menu_pre_name=$scope.phone_menu_items[j].func_title;
                        $('#menuModal').modal({
                            backdrop:'static',//禁用鼠标点击窗口外部，窗口关闭
                            keyboard:false//禁用esc关闭按键
                        });
                    }
                }
            }else{
                $.alert_error('请先选择一个要修改的菜单！');
            }
        }

        //if(typeof($scope.menu_selected_items)!='undefined'){
        //    $('#menuModal').modal({
        //        backdrop:'static',//禁用鼠标点击窗口外部，窗口关闭
        //        keyboard:false,//禁用esc关闭按键
        //    });
        //}else{
        //    $.alert_error('请先选择一个要修改的菜单！');
        //}

    };

    //关闭新增菜单窗口
    $scope.close_departmentModal = function(){
        $scope.phone_menu_selected($scope.phone_menu_selected_items);
        $scope.web_menu_selected($scope.web_menu_selected_items);
        $('#menuModal').modal('hide');
    };


    //验证form表单
    $scope.submitted = false;
    $scope.validate_menu_input = function(name, type) {
        var input = $scope.menuform[name];
        return (input.$dirty || $scope.submitted) && input.$error[type];
    };



    //设置新菜单ID
    $scope.create_menu_id = function(array,obj_pid){
        array = array.sort(function(a,b){
            return a.id- b.id;
        });
        var statys = false;
        var jjk =0;
        var seq_num = 0;
        var i = array.length;
        while (i--) {
            if (array[i].pid === obj_pid) {
                jjk = array[i].id;
                seq_num = jjk+1;
                statys = true;
                break;
                console.log(jjk);
            }
        }
        if(statys==false){
            seq_num = obj_pid+'1';
        }
        return seq_num;
    };

    //保存菜单信息
    $scope.save_menu = function() {
        $scope.submitted = true;
        if ($scope.menuform.$valid) {

            console.log('验证成功!!');
            if($scope.menu_type==1){
                if($scope.operate_type==1){
                    console.log('web端菜单新的编号》》',$scope.create_menu_id($scope.web_menu_items,$scope.menu_selected_items.pid));
                    $scope.menu_selected_items.id = $scope.create_menu_id($scope.web_menu_items,$scope.menu_selected_items.pid);
                }

                $scope.menu_selected_items.platform = 1;

            }
            if($scope.menu_type==2){
                if($scope.operate_type==1){
                    console.log('手机端菜单新的编号》》',$scope.create_menu_id($scope.phone_menu_items,$scope.menu_selected_items.pid));
                    $scope.menu_selected_items.id = $scope.create_menu_id($scope.phone_menu_items,$scope.menu_selected_items.pid)
                }

                $scope.menu_selected_items.platform = 2;

            }
            $scope.menu_selected_items.func_type = 2;

            if($scope.operate_type==1 && $scope.menu_selected_items.pid!=1){
                var smenu_pid = ''+$scope.menu_selected_items.pid+'';
                var smenu_id = ''+$scope.menu_selected_items.id+'';
                $scope.menu_selected_items.seq = smenu_id.substring(smenu_pid.length,smenu_id.length);
                console.log(smenu_id.substring(smenu_pid.length,smenu_id.length));
            }

            console.log(' $scope.menu_selected_items ', $scope.menu_selected_items );

            $http({
                method:'POST',
                url:BACKSTAGESERVERADDRESS.ADDRESS+'/funcTree/updateFuncTree',
                data:$scope.menu_selected_items
            })
                .success(function(data) {
                    console.log('保存菜单结果',data);
                    if(data.e.code==0){
                        $.showMessage('保存成功');
                        $scope.loadMenuItems();
                        $('#menuModal').modal('hide');
                    }else{
                        $.showError(data.e.desc);
                    }
                })
        } else {
            console.log('验证失败');
            return false;
        }
    };




    //删除函数
    $scope.del_menu_fn = function(){
        $http({
            method:'POST',
            url:BACKSTAGESERVERADDRESS.ADDRESS+'/funcTree/deleteFuncTree/'+$scope.del_menu_selectes_items.id,
        })
            .success(function(data) {
                if(data.e.code==0){
                    $.alert_ok('删除成功');
                    $scope.loadMenuItems();
                }else{
                    $.alert_error('删除失败');
                }
            })
    };
    //删除部门
    $scope.del_menu = function(menu_type){
        $scope.del_menu_selectes_items = null;
        if(menu_type==1){
            $scope.del_menu_selectes_items = $scope.web_menu_selected_items;
        }
        if(menu_type==2){
            $scope.del_menu_selectes_items = $scope.phone_menu_selected_items ;
        }
        if($scope.del_menu_selectes_items!=null){
            $.alert_confim('确定要删除该菜单么？',$scope.del_menu_fn);
        }else{
            $.alert_error('请先选择一个要删除的菜单！');
        }
    };


    $scope.isTab_selected=1;
    $scope.tab_selected=function(item){
        $scope.isTab_selected='';
        $scope.isTab_selected=item;
        console.log('$scope.isTab_selected:',$scope.isTab_selected);
    }

}]);