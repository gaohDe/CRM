/**
 * 创建者：饶道坤
 * 创建日期：2016/1/28.
 * 描述：组织架构模块
 */
App.controller('organizationController', ['$scope','$q', '$http', '$state','authService','$localStorage','ngTableParams','$modal','dailyutilsService','ngDialog','$window','$stateParams',
    function($scope,$q, $http, $state,authService,$localStorage,ngTableParams,$modal,dailyutilsService,ngDialog,$window,$stateParams) {

        $scope.departmentItems = {};
        $scope.querys={};

        $scope.over_user=function(item){
            $scope.mouseover_id=item.id;
        };
        $scope.out_user=function(item){
            $scope.mouseover_id=0;
        };

        $scope.arrayChangeToJson = function (source_data, pid) {
            /**
             * @param source_data 源数据
             * @returns {Array}  查询出根节点下的tree数据,并放入tree_json中
             * @author han
             */
            this.recursive = function (source_data) {
                // 用来返回集合转化为json数据的字段
                var tree_json = [];
                for (var i = 0; i < source_data.length; i++) {
                    // 定义tree节点的属性
                    var json = {};
                    // 判断父类ID 是否和根节点的ID 相等
                    if (source_data[i].pid == pid) {
                        json.item = source_data[i];
                        json.label =  source_data[i].department_name;
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
                        json.label =  source_sub_data[i].department_name;
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

        var dep_tree_avm = null;
        //查询所有部门
        $scope.search_department_all = function(){
            $http({
                method:'POST',
                url:BACKSTAGESERVERADDRESS.ADDRESS+'/department/findDepartByPid/0'
            })
            .success(function(data) {
                if(data.e.code==0){
                    //console.log('部门树',data);
                    $scope.department_items = data.data.sendData;
                    $scope.department_items.unshift({'id':0,'pid':-2,'department_name':'公司','seq':1});
                    $scope.department_tree =  $scope.arrayChangeToJson(data.data.sendData,0);
                    console.log('$scope.department_items',$scope.department_items);
                    console.log(' $scope.department_tree', $scope.department_tree);
                }
            })
        };

        $scope.my_dep_tree = {};
        $scope.search_department_all();


        //点击部门展开详情
        $scope.department_tree_selected = function(branch) {
            $scope.departmentSelected = branch;
            $scope.departmentItems = branch;
            console.log('111',branch);
            $scope.querys.departid = branch.id;
            $scope.userManageTableParams.reload();
        };


        //打开新增部门窗口
        $scope.open_add_departmentModal = function(){
            $scope.departmentItems={};
            $('#departmentModal').modal({
                backdrop:'static',//禁用鼠标点击窗口外部，窗口关闭
                keyboard:false,//禁用esc关闭按键
            });
        };

        //打开编辑部门窗口
        $scope.open_edit_departmentModal = function(){
            if(typeof($scope.departmentSelected)!='undefined'){
                $scope.departmentItems=$scope.departmentSelected;
                $('#departmentModal').modal({
                    backdrop:'static',//禁用鼠标点击窗口外部，窗口关闭
                    keyboard:false,//禁用esc关闭按键
                });
            }else{
                $.alert_error('请先选择一个要修改的部门！');
            }

        };


        //打开新增用户窗口
        $scope.addUser = function(){
            $scope.userManageItems={};
            $('#addUserModal').modal({
                backdrop:'static',//禁用鼠标点击窗口外部，窗口关闭
                keyboard:false//禁用esc关闭按键
            });
        };


        //选中行
        $scope.select_user=function(item){
            $scope.userManageItems=item;
        };
        //打开编辑用户窗口
        $scope.editUser = function(item){
            console.log('item------------------------',item);
            //$scope.userManageItems=item;
            $('#addUserModal').modal({
                backdrop:'static',//禁用鼠标点击窗口外部，窗口关闭
                keyboard:false//禁用esc关闭按键
            });
        };

        //关闭modal窗口
        $scope.closeModal = function(){
            $scope.submitted = false;
            $('#addUserModal').modal('hide');
            $('#departmentModal').modal('hide');
        };

        //验证form表单
        //$scope.submitted = false;
        //验证form表单
        $scope.submitted = false;
        $scope.validateInput = function(name, type) {
            var input= $scope.userform[name];
            return (input.$dirty || $scope.submitted) && input.$error[type];
        };
        $scope.validate_department_input = function(name, type) {
            var input = $scope.departmentform[name];
            return (input.$dirty || $scope.submitted) && input.$error[type];
        };

        //保存部门信息
        $scope.save_department = function() {
            $scope.submitted = true;
            if ($scope.departmentform.$valid) {
                console.log(' $scope.departmentItems ', $scope.departmentItems );
                console.log('验证成功!!');

                $http({
                    method:'POST',
                    url:BACKSTAGESERVERADDRESS.ADDRESS+'/department/updateDepartment',
                    data:$scope.departmentItems
                })
                    .success(function(data) {
                        if(data.e.code==0){
                            $.showMessage('保存成功');
                            $scope.search_department_all();
                            $('#departmentModal').modal('hide');
                            $scope.submitted = false;
                        }else{
                            $.showError('保存失败');
                        }
                    })
            } else {
                console.log('验证失败');
                return false;
            }
        };

        //保存用户信息
        $scope.save_user = function() {
            $scope.submitted = true;
            if ($scope.userform.$valid) {
                console.log(' $scope.userManageItems ', $scope.userManageItems );
                console.log('验证成功!!');
                console.log('$scope.userManageItems.modify_time:',$scope.userManageItems.modify_time);
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
                            $('#addUserModal').modal('hide');
                            $.showMessage('保存成功');
                            //$state.go('app.org.sys_mgr.framework');
                            $scope.userManageTableParams.reload();
                            $scope.submitted = false;
                        }else{
                            $.showError(data.e.desc);
                        }
                    })
            } else {
                console.log('验证失败');
                return false;
            }
        };

        //清空下拉框
        $scope.select_items_reset = function(item_name){
            $scope.userManageItems[''+item_name+''] = undefined;
            //department.id=null
        };

        //删除函数
        $scope.del_department_fn = function(){
            $http({
                method:'POST',
                url:BACKSTAGESERVERADDRESS.ADDRESS+'/department/deleteDepart/'+$scope.departmentSelected.id
            })
                .success(function(data) {
                    if(data.e.code==0){
                        $.alert_ok('删除成功');
                        $scope.search_department_all();
                    }else{
                        $.alert_error('删除失败');
                    }
                })
        };
        //删除部门
        $scope.del_department = function(){
            if(typeof($scope.departmentSelected)!='undefined'){
                $.alert_confim('确定要删除该部门么？',$scope.del_department_fn);
            }else{
                $.alert_error('请先选择一个要删除的部门！');
            }
        };

        //按条件搜索
        $scope.searchUser=function(){
            $scope.querys.queryall=$scope.userManageItems.queryall;
            $scope.userManageTableParams.reload();
        };

        //加载数据函数
        $scope.userManageLoadData = function (_defer,_params,_rows) {
            var q1=$q.defer();
            var _page=_params.page()-1;
            $scope.userManageQuery = {"page":_page,"rows":_rows, "query":$scope.querys};
            $http({
                method:'POST',
                url:BACKSTAGESERVERADDRESS.ADDRESS+'/user/getAllUser',
                data:$scope.userManageQuery
            })
                .success(function(data) {
                    console.log("userManage----------------->>>>",data);
                    if(data.e.code==0){
                        q1.resolve(data.data);
                    }else{
                        q1.reject(data.e);
                    }
                })
                .error(function(data) {
                    q1.reject(data);
                    console.log("http error",data);
                });

            $q.all([
                q1.promise
                    .then(function(data) {
                        $scope.UserList= data.sendData;
                        console.log('$scope.UserList',$scope.UserList);
                        $scope.pageCounts=data.count;
                        console.log('$scope.pageCounts',$scope.pageCounts);
                    })

            ]).then(function(values) {
                _params.total($scope.pageCounts);
                _defer.resolve($scope.UserList);
            },function (values) {
                console.log("$q all error2");
                console.log("err",values);
            });
        };

        var pages=10;
        $scope.userManageTableParams = new ngTableParams({
            page: 1, // show first page
            count: pages// count per page
        }, {
            getData: function ($defer, params) {
                console.log("params",params );
                //$scope.userManageQuery.rows = params.count();
                $scope.userManageLoadData($defer,params,pages);
            }
        });

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
            });
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
            });
        //用户表选择函数
        $scope.userManageSeleted = function(item){
            $scope.userManageItems = item;
            console.log('$scope.userManageItems7762736271632187368',$scope.userManageItems);
        };
            $scope.users = [
                {id: 1, name: 'awesome user1', status: 2, group: 4, groupName: 'admin'},
                {id: 2, name: 'awesome user2', status: undefined, group: 3, groupName: 'vip'},
                {id: 3, name: 'awesome user3', status: 2, group: null}
            ];

        //点击确认是否离职
        $scope.isResign=function(){
            $.alert_confim('确认离职后不能撤销，是否确认？',$scope.save_resign_fn);
        };
        $scope.save_resign_fn=function(){
            $scope.userManageItems.is_quit_job=1;
            $http({
                method:'POST',
                url:BACKSTAGESERVERADDRESS.ADDRESS+'/user/updateUser',
                data:$scope.userManageItems
            }).success(function(data) {
                console.log('保存用户结果',data);
                if(data.e.code==0){
                    $.alert_ok('设置成功');
                    $scope.userManageTableParams.reload();
                }else{
                    $.showError(data.e.desc);
                }
            })
        };
    }]);