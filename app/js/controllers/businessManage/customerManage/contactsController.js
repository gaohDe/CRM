/**
 * Created by gaohuan on 2016/3/18.
 */
App.controller('contactCtrl',['$scope','$q','$http','ngTableParams','$localStorage',function($scope,$q,$http,ngTableParams,$localStorage){

    $scope.contactItems={};
    /** 0代表保存 1代表修改 */
    $scope.isSave = 0;
    $scope.querys={};
    /** 选中客户 */
    $scope.selectCustomer = {};
    $scope.contactsItems={};

    /** 性别 */
    $scope.sex_items = [
        {id:0,label:'请选择性别'},
        {id:1,label:'男'},
        {id:2,label:'女'}
    ];

    /** 职务 */
    $scope.job_items = [
        {id:0,label:'请选择性别'}
        ,{id:1,label:'总经理'}
        ,{id:2,label:'总经理助理'}
        ,{id:3,label:'培训主管'}
        ,{id:4,label:'培训专员'}
        ,{id:5,label:'培训经理'}
        ,{id:6,label:'人力资源经理'}
        ,{id:7,label:'HRD'}
        ,{id:8,label:'VP'}
        ,{id:9,label:'从事主管'}
        ,{id:10,label:'采购'}
        ,{id:11,label:'BU maneger'}
        ,{id:12,label:'培训中心主任'}
        ,{id:13,label:'人事部'}
        ,{id:14,label:'人事总监助理'}
        ,{id:15,label:'管理层'}
        ,{id:16,label:'BP主管'}

    ];


    //根据关键字搜索
    $scope.contactSearch=function(){
        console.log("1111",$scope.contactItems.fuzzy_query);
        $scope.contactQuery.query.fuzzy_query = $scope.contactItems.fuzzy_query;
        console.log($scope.contactQuery.query);
        $scope.contactTableParams.reload();
    };

    //加载所有联系人数据
    $scope.contactQuery={ "page":0,"rows":10, "query":{"is_delete":0 ,'fuzzy_query':''} };
    $scope.loadcontactData=function(_defer,_params,_rows){
        var q1=$q.defer();
        var _page=_params.page()-1;
        $scope.contactQuery={ "page":_page,"rows":_rows, "query":{"is_delete":0 ,'fuzzy_query':$scope.contactItems.fuzzy_query} };
        //$scope.contactQuery={"page":_page,"rows":_rows, 'query':{'custId':-1,'business_opportunities_name':$scope.contactItems.business_opportunities_name}};
        console.log('$scope.contactQuery:',$scope.contactQuery);
        $http({
            method:'POST',
            url:BACKSTAGESERVERADDRESS.ADDRESS+'/customercontacts/findCustomerContacts',
            data:$scope.contactQuery
        }).success(function(data){
            if(data.e.code==0){
                console.log('data',data);
                q1.resolve(data.data);
            }else{
                q1.reject(data.e);
            }
        }).error(function(data){
            q1.reject(data);
            console.log("http error",data);
        });
        $q.all([
                q1.promise
                    .then(function(data) {
                        $scope.contacts= data.sendData;
                        console.log('$scope.contacts',$scope.contacts);
                        $scope.pageCounts=data.count;
                        console.log('$scope.pageCounts',data.count);
                    })
            ])
            .then(function(values) {
                _params.total($scope.pageCounts);
                _defer.resolve($scope.contacts);
            },function (values) {
                console.log("$q all error2");
                console.log("err",values);
            });
    };
    var pages=10;
    $scope.contactTableParams=new ngTableParams({
        page:1,
        count:pages
    },{
        getData:function($defer, params){
            $scope.loadcontactData($defer,params,pages);
        }
    });

    //鼠标移入移出显示操作按钮
    $scope.mouseover_contact=function(item){
        $scope.mouse_id=item.id;
    };
    $scope.mouseout_contact=function(item){
        delete $scope.mouse_id;
    };

    ////点击选中行
    //$scope.selectedContact=function(item){
    //    $scope.contacts.id=item.id;
    //    console.log('$scope.opportunities.id:',$scope.contacts.id)
    //};

    $scope.addContact=function(){
        $scope.contactsItems={};
        //$scope.isSave = 0;
        $('#addContact').modal({
            backdrop:'static',//禁用鼠标点击窗口外部，窗口关闭
            keyboard:false//禁用esc关闭按键
        });
    };

    //编辑联系人
    $scope.editContact=function(item){
        $scope.contactsItems=item;
        //$scope.isSave = 1;
        $('#addContact').modal({
            backdrop:'static',//禁用鼠标点击窗口外部，窗口关闭
            keyboard:false//禁用esc关闭按键
        });
    };

    //保存联系人
    $scope.saveContacts=function(){
        $http({
            method:'POST',
            url:BACKSTAGESERVERADDRESS.ADDRESS+'/customercontacts/updateCustContacts',
            data:$scope.contactsItems
        })
            .success(function(data) {
                console.log('$scope.contactsItems',$scope.contactsItems);
                console.log('保存用户结果',data);
                if(data.e.code==0){
                    $.showMessage('保存成功');
                    $scope.contactTableParams.reload();
                }else{
                    $.showError(data.e.desc);
                }
            })
    };


    /**----------------------弹出加载客户的一系列操作------------开始---------- */
    $scope.querys_customer_data = {'page': 0, 'rows': 10, 'query': {}};
    if ($scope.user.role_id == 7) {
        console.log('$scope.user', $scope.user);
        $scope.querys_customer_data.user_id = $scope.user.id;
    } else {
        $scope.querys_customer_data.depart_id = $scope.user.department_id;
    }

    $scope.customerData = function (_defer, _params, _rows) {
        var q1 = $q.defer();
        var _page = _params.page() - 1;

        $http({
            method: 'POST',
            url: BACKSTAGESERVERADDRESS.ADDRESS + '/customer/findCustomerByQuery',
            data: $scope.querys_customer_data
        })
            .success(function (data) {
                console.log("first_contacts----------------->>>>", data);
                if (data.e.code == 0) {
                    q1.resolve(data.data);
                } else {
                    q1.reject(data.e);
                }
            })
            .error(function (data) {
                q1.reject(data);
                console.log("http error", data);
            });

        $q.all([
            q1.promise
                .then(function (data) {
                    $scope.customerList = data.sendData;
                    console.log('$scope.first_contactsList', $scope.customerList);
                    $scope.customerCounts = data.count;
                    console.log('$scope.first_contactsCounts', $scope.customerCounts);
                })

        ]).then(function (values) {
            _defer.resolve($scope.customerList);
            _params.total($scope.customerCounts);
        }, function (values) {
            console.log("$q all error2");
            console.log("err", values);
        });
    };


    var pages = 10;
    $scope.customerTableParams_fn = function () {
        $scope.customerTableParams = new ngTableParams({
            page: 1, // show first page
            count: pages// count per page
        }, {
            getData: function ($defer, params) {
                $scope.querys_customer_data.rows = params.count();
                console.log("params", params);
                $scope.customerData($defer, params, pages);
            }
        });
    };


    //打开窗口
    $scope.open_customer_model = function(){
        if(typeof($scope.customerTableParams)!='undefined'){
            $scope.customerTableParams.reload();
        }else{
            $scope.customerTableParams_fn();
        }
        $('#customerModel').modal({
            backdrop:'static',//禁用鼠标点击窗口外部，窗口关闭
            keyboard:false,//禁用esc关闭按键
        });
    };

    //关闭窗口
    $scope.close_customer_model = function(){
        $('#customerModel').modal('hide');
    };

    //保存事件
    $scope.save_customer_model = function(){
        console.log('进入保存窗口');
        console.log($scope.selectCustomer);
        $scope.contactsItems.customer_id =  $scope.selectCustomer.id;
        console.log( $scope.contactsItems.customer_id,$scope.selectCustomer.id);
        $scope.contactsItems.customer_name =  $scope.selectCustomer.customer_name;
        $('#customerModel').modal('hide');
    };

    // 选中客户
    $scope.setSelectedCustomer = function(item){
        console.log("--------选中客户-----------");
        $scope.selectCustomer = item;
    };

    // 删除添加联系人中选中的客户
    $scope.deleteCustomer = function(){
        $scope.contactsItems.customer_id =  "";
        $scope.contactsItems.customer_name =  "";
    };

    /**----------------------弹出加载客户的一系列操作------------结束---------- */




    /**----------------------弹出加载联系人去向(客户)的一系列操作------------开始---------- */
    $scope.querys_to_customer_data = {'page': 0, 'rows': 10, 'query': {}};
    if ($scope.user.role_id == 7) {
        console.log('$scope.user', $scope.user);
        $scope.querys_to_customer_data.user_id = $scope.user.id;
    } else {
        $scope.querys_to_customer_data.depart_id = $scope.user.department_id;
    }

    $scope.toCustomerData = function (_defer, _params, _rows) {
        var q1 = $q.defer();
        $scope.querys_to_customer_data.page = (_params.page() - 1);

        $http({
            method: 'POST',
            url: BACKSTAGESERVERADDRESS.ADDRESS + '/customer/findCustomerByQuery',
            data: $scope.querys_to_customer_data
        })
            .success(function (data) {
                console.log("tooooooooooooooooo----------------->>>>", data);
                if (data.e.code == 0) {
                    q1.resolve(data.data);
                } else {
                    q1.reject(data.e);
                }
            })
            .error(function (data) {
                q1.reject(data);
                console.log("http error", data);
            });

        $q.all([
            q1.promise
                .then(function (data) {
                    $scope.toCustomerList = data.sendData;
                    console.log('$scope.to------------', $scope.toCustomerList);
                    $scope.toCustomerCounts = data.count;
                    console.log('$scope.to----------------', $scope.toCustomerCounts);
                })

        ]).then(function (values) {
            _defer.resolve($scope.toCustomerList);
            _params.total($scope.toCustomerCounts);
        }, function (values) {
            console.log("$q all error2");
            console.log("err", values);
        });
    };


    var pages = 10;
    $scope.toCustomerTableParams_fn = function () {
        $scope.toCustomerTableParams = new ngTableParams({
            page: 1, // show first page
            count: pages// count per page
        }, {
            getData: function ($defer, params) {
                console.log("params", params);
                $scope.querys_to_customer_data.rows = params.count();
                $scope.toCustomerData($defer, params, pages);
            }
        });
    };


    //打开窗口
    $scope.open_to_customer_model = function(){
        if(typeof($scope.toCustomerTableParams)!='undefined'){
            $scope.toCustomerTableParams.reload();
        }else{
            $scope.toCustomerTableParams_fn();
        }
        $('#toCustomerModel').modal({
            backdrop:'static',//禁用鼠标点击窗口外部，窗口关闭
            keyboard:false,//禁用esc关闭按键
        });
    };

    //关闭窗口
    $scope.close_to_customer_model = function(){
        $('#toCustomerModel').modal('hide');
    };

    //保存事件
    $scope.save_to_customer_model = function(){
        console.log('进入保存窗口to');
        console.log("$scope.selectToCustomer",$scope.selectToCustomer);
        $scope.contactsItems.to_customer_id =  $scope.selectToCustomer.id;
        $scope.contactsItems.to_customer_name =  $scope.selectToCustomer.customer_name;
        $('#toCustomerModel').modal('hide');
    };

    // 选中客户
    $scope.setSelectedToCustomer = function(item){
        console.log("--------选中客户to-----------");
        $scope.selectToCustomer = item;

        console.log($scope.selectToCustomer.id);
        console.log(item.id);
        console.log("$scope.selectToCustomer",$scope.selectToCustomer);

    };

    // 删除添加联系人中选中的客户
    $scope.deleteToCustomer = function(){
        $scope.contactsItems.to_customer_id =  "";
        $scope.contactsItems.to_customer_name =  "";
    };

    /**----------------------弹出加载联系人去向(客户)的一系列操作------------结束--------- */


    ////验证form表单
    //$scope.submitted = false;
    //$scope.validateInput = function(name, type) {
    //    var input= $scope.userform[name];
    //    return (input.$dirty || $scope.submitted) && input.$error[type];
    //};
    //$scope.validate_department_input = function(name, type) {
    //    var input = $scope.departmentform[name];
    //    return (input.$dirty || $scope.submitted) && input.$error[type];
    //};



    //保存用户信息
    $scope.saveContacts = function() {
        $scope.submitted = true;
        if ($scope.materialform.$valid) {
            $scope.contactsItems.tracking_user_id = $localStorage.user.id;

            $scope.contactsItems.is_history = $scope.contactsItems.is_history?1:0;
            delete $scope.contactsItems.modify_user_id;
            delete $scope.contactsItems.modify_time;
            console.log( $scope.contactsItems.is_history);

            console.log(' $scope.userManageItems ', $scope.contactsItems );
            console.log('验证成功!!');
            console.log('$scope.userManageItems.modify_time:',$scope.contactsItems.modify_user_id);
            $http({
                method:'POST',
                url:BACKSTAGESERVERADDRESS.ADDRESS+'/customercontacts/updateCustContacts',
                data:$scope.contactsItems
            })
                .success(function(data) {
                    if(data.e.code==0){
                        console.log("---------------------han---------------保存联系人");

                        console.log("------");

                        $('#addContact').modal('hide');
                        $.showMessage('保存成功');
                        //$state.go('app.org.sys_mgr.framework');
                        $scope.contactTableParams.reload();
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
    //退出弹出框函数
    $scope.close_add_contact_Modal=function(){
        $('#addContact').modal('hide');
    };
}]);