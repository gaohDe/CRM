/**
 * 创建者：饶道坤
 * 创建日期：2016/3/24.
 * 描述：客户详情
 */
App.controller('customerDetalCtrl', ['$scope', '$http', '$state','$localStorage','$interval', 'uiGridConstants','ngTableParams','$q','$stateParams','customerService','dailyutilsService',
    function($scope, $http, $state,$localStorage,$interval,uiGridConstants,ngTableParams,$q,$stateParams,customerService,dailyutilsService) {

        console.log('客户ID',$stateParams.customer_id,'客户状态',$stateParams.customer_state);

        //定义是否主要联系人
        $scope.is_primary_contact_items = [
            {id:0,label:'否'},
            {id:1,label:'是'}
        ]

        //客户ID
        $scope.customer_id = $stateParams.customer_id;

        //客户状态
        $scope.customer_state = $stateParams.customer_state;

        $scope.sex_items = [
            {id:1,label:'男'},
            {id:2,label:'女'}
        ]

        //定义客户状态数据集
        $scope.customer_status_items = [
            {id:1,label:'A类客户'},
            {id:2,label:'B类客户'},
            {id:3,label:'C类客户'},
            {id:4,label:'个人客户'}
        ]

        //定义客户性质数据集
        $scope.customer_nature_items = [
            {id:1,label:'合资'},
            {id:2,label:'国企'},
            {id:3,label:'民营'},
            {id:4,label:'独资'},
            {id:5,label:'集体'}
        ]

        //定义客户来源数据集
        $scope.customer_source_items = [
            {id:1,label:'电话营销开发'},
            {id:2,label:'主页客户反馈'},
            {id:3,label:'市场活动反馈'},
            {id:4,label:'客户自找上门'},
            {id:5,label:'广告推广'},
            {id:6,label:'老客户转介绍'},
            {id:7,label:'老客户转报'}
        ]

        //定义客户类型数据集
        $scope.customer_type_items = [
            {id:1,label:'潜在'},
            {id:2,label:'储备'},
            {id:3,label:'成交'},
            {id:4,label:'删除'}
        ]

        //定义客户等级数据集
        $scope.customer_Grade_items = [
            {id:1,label:'小客户'},
            {id:2,label:'中客户'},
            {id:3,label:'大客户'}
        ]


        //定义成交类别
        $scope.transaction_type_items = [
            {id:1,label:'合同'},
            {id:2,label:'项目'},
            {id:3,label:'服务'}
        ]


        //活动日程类别
        $scope.activity_type_items = [
            {id:1,label:'跟进客户'},
            {id:2,label:'客户关怀'},
            {id:3,label:'备忘'},
            {id:4,label:'请假'},
            {id:5,label:'其它待办事项'}
        ]

        //联系方式
        $scope.contactMode_items = [
            {id:1,label:'打电话'},
            {id:2,label:'发邮件'},
            {id:3,label:'面谈'}
        ]

        //提醒时间
        $scope.remind_date_items = [
            {id:1,label:'准点提醒'},
            {id:2,label:'提前10分钟'},
            {id:3,label:'提前30分钟'},
            {id:3,label:'提前1小时'},
            {id:3,label:'提前一天'},
            {id:3,label:'不提醒'}
        ]





        //查询职务
        $scope.findAllDictByQuery_fn = function(dict_type){

            $http({
                method:'POST',
                url:BACKSTAGESERVERADDRESS.ADDRESS+'/dict/findAllDictByQuery/',
                data:{dict_type:dict_type}
            })
                .success(function(data) {
                    if(data.e.code==0){
                        $scope.dict_items = data.data.sendData;
                        console.log('职务》》》》',data);
                    }
                })
        }

        $scope.findAllDictByQuery_fn(7);
        //查询跟踪阶段数据
        $scope.search_business_stage_fn = function(){

            $http({
                method:'POST',
                url:BACKSTAGESERVERADDRESS.ADDRESS+'/busiBusinessStage/findAllBusiBusinessStage'
            })
                .success(function(data) {
                    if(data.e.code==0){
                        $scope.business_stage_items = data.data.sendData;
                        console.log('跟踪阶段》》》》',data);
                    }
                })
        }

        $scope.search_business_stage_fn();

        //$scope.customer_detal_items = customerService.customerItems;


        //根据客户ID查询客户详情
        $scope.findCustomerById = function(){
            $http({
                method:'POST',
                url:BACKSTAGESERVERADDRESS.ADDRESS+'/customer/findCustomerById/'+$scope.customer_id
            })
                .success(function(data) {
                    if(data.e.code==0){
                        console.log(data);
                        $scope.customer_detal_items = data.data.sendData[0];

                        if($scope.customer_state!=4){
                            $scope.customer_industry = $scope.customer_detal_items.industry_name+'-'+$scope.customer_detal_items.subindustry_name;
                            $scope.customer_company_address = $scope.customer_detal_items.province + '-'+ $scope.customer_detal_items.city +'-'+$scope.customer_detal_items.district;

                            $scope.customer_company_region = $scope.customer_detal_items.province + '-'+ $scope.customer_detal_items.city;
                        }

                        console.log('$scope.customer_detal_items', $scope.customer_detal_items );


                    }
                })
        }

        $scope.findCustomerById();


        $scope.csan = function(){
            //console.log('$scope.customer_sex_selected',$scope.customer_sex_selected);
            console.log('$scope.customer_detal_items', $scope.customer_detal_items );
        }





        //更改客户信息
        $scope.edit_customer_status = false;
        $scope.edit_customer_detal = function(){
            $scope.edit_customer_status = true;
        }

        $scope.edit_status_input = {
            border: '1px solid #dde6e9'

        }

        $scope.edit_status_select = {
            border: '1px solid #dde6e9',
            webkitAppearance:'menulist',
            cursor:'pointer'

        }


        $scope.save_customer_detal = function(){
            $scope.edit_customer_status = false;
        }


/********************************************联系人列表（开始）*************************************************/
        $scope.ContactsQuery = { "page":0, "rows":10, "query":{ "customer_id":$scope.customer_id,"is_delete":0}}
        //加载数据函数
        $scope.ContactsloadData = function (_defer,_params,_rows) {

            var q1=$q.defer();
            $scope.ContactsQuery.page = (_params.page()-1);

            $http({
                method:'POST',
                url:BACKSTAGESERVERADDRESS.ADDRESS+'/customercontacts/findCustomerContacts',
                data:$scope.ContactsQuery ,
            })
                .success(function(data) {
                    console.log("Contacts>>=",data);
                    if(data.e.code==0){

                        //console.log(data.data.sendData);
                        q1.resolve(data.data);
                    }else{
                        //alert("-------------f1");
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
                        //$scope.cusomerContactsList=data.sendData.cusomerContactsList;

                        //查询联系人
                        $scope.ContactsList= data.sendData;

                        $scope.ContactsCounts=data.count;

                    })
                ,
            ]).then(function(values) {

                _params.total($scope.ContactsCounts);
                _defer.resolve($scope.ContactsList);
                console.log("$q all ok",values);
                return ;
            },function (values) {

                console.log("$q all error2");
                console.log("err",values);
            });

        };






        var ContactsPages=10;
        $scope.ContactsTableParams = new ngTableParams({
            page: 1, // show first page
            count: ContactsPages// count per page
        }, {
            getData: function ($defer, params) {
                $scope.ContactsQuery.rows = params.count();
                $scope.ContactsloadData($defer,params,ContactsPages);

            }
        });

        //联系人列表选择事件
        $scope.cuctomer_contactsMouseover = function(items){

            $scope.contacts_Mouseover_items = items;
            //console.log('$scope.contacts_Mouseover_items',$scope.contacts_Mouseover_items);
        }

        //联系人列表选择事件
        $scope.cuctomer_contactsSelected = function(items){


            console.log('items',items);
        }

        console.log($('#customer_contacts_table'));

        //编辑联系人信息
        $scope.edit_customer_contacts = function(contacts){
            $scope.contacts_items = contacts;

            $('#customer_contacts_Modal').modal({
                backdrop:'static',//禁用鼠标点击窗口外部，窗口关闭
                keyboard:false,//禁用esc关闭按键
            });
        }


        //打开联系人窗口
        $scope.open_customer_contacts_Modal = function(){

            console.log( $scope.edit_contacts_form);
            $scope.contacts_items = {
                is_primary_contact:0
            };
            $('#customer_contacts_Modal').modal({
                backdrop:'static',//禁用鼠标点击窗口外部，窗口关闭
                keyboard:false,//禁用esc关闭按键
            });
        }

        //关闭联系人窗口
        $scope.close_customer_contacts_Modal = function(){
            $scope.submit_information = false;
            $('#customer_contacts_Modal').modal('hide');
        }



        //验证form表单
        $scope.submit_information = false;
        $scope.validate_information_Input = function(name,type,form) {
            var information_input = form[name];
            return ($scope.submit_information) && information_input.$error[type];
        };


        //保存联系人窗口
        $scope.save_customer_contacts_Modal = function(form){
            $scope.submit_information = true;
            if (form.$valid) {
                console.log(' $scope.contacts_items', $scope.contacts_items );
                console.log('验证成功!!');
                $scope.contacts_items.customer_id =  $scope.customer_id;
                $scope.contacts_items.tracking_user_id = $localStorage.user.id;
               delete $scope.contacts_items.modify_user_id;
                delete $scope.contacts_items.modify_time;
                $http({
                    method:'POST',
                    url:BACKSTAGESERVERADDRESS.ADDRESS+'/customercontacts/updateCustContacts',
                    data:$scope.contacts_items
                })
                    .success(function(data) {
                        console.log('保存客户结果',data);
                        if(data.e.code==0){
                            $.showMessage('保存成功');
                            $scope.ContactsTableParams.reload();
                            $scope.close_customer_contacts_Modal();

                        }else{
                            $.showError(data.e.desc);
                        }
                    })
            } else {
                console.log('验证失败');
                return false;
            }
        }


        $scope.del_customer_contacts_fn = function(){
            $http({
                method:'POST',
                url:BACKSTAGESERVERADDRESS.ADDRESS+'/customercontacts/deleteCustomercontacts/'+$scope.del_contactsId
            })
                .success(function(data) {
                    if(data.e.code==0){
                        $scope.ContactsTableParams.reload();
                        $.alert_ok('删除成功');
                    }else{
                        $.alert_error('删除失败');
                    }
                })
        }

        $scope.del_customer_contacts = function(item){
            $scope.del_contactsId = item.id;
            $.alert_confim('确定删除该联系人么？',$scope.del_customer_contacts_fn);
        }


        /*******************************联系人列表（结束）************************************/


/**********************************************商机列表（开始）***************************************************/
        $scope.BusinessOpportunitiesQuery = { "page":0, "rows":10, "query":{ "custId":$scope.customer_id}}
        //加载数据函数
        $scope.BusinessOpportunitiesloadData = function (_defer,_params,_rows) {

            var q1=$q.defer();
            $scope.BusinessOpportunitiesQuery.page = (_params.page()-1);

            $http({
                method:'POST',
                url:BACKSTAGESERVERADDRESS.ADDRESS+'/businessOpportunities/findBusinessOpportunitiesByCustId',
                data:$scope.BusinessOpportunitiesQuery ,
            })
                .success(function(data) {
                    console.log("商机列表>>=",data);
                    if(data.e.code==0){

                        //console.log(data.data.sendData);
                        q1.resolve(data.data);
                    }else{
                        //alert("-------------f1");
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
                        //$scope.cusomerContactsList=data.sendData.cusomerContactsList;

                        //查询试题
                        $scope.BusinessOpportunitiesList= data.sendData;

                        $scope.BusinessOpportunitiesCounts=data.count;

                    })
                ,
            ]).then(function(values) {

                _defer.resolve($scope.BusinessOpportunitiesList);
                _params.total($scope.BusinessOpportunitiesCounts);
                console.log("$q all ok",values);
                return ;
            },function (values) {

                console.log("$q all error2");
                console.log("err",values);
            });

        };






        var BusinessOpportunitiesPages=10;
        $scope.BusinessOpportunitiesTableParams = new ngTableParams({
            page: 1, // show first page
            count: BusinessOpportunitiesPages// count per page
        }, {
            getData: function ($defer, params) {
                $scope.BusinessOpportunitiesQuery.rows = params.count();
                $scope.BusinessOpportunitiesloadData($defer,params,BusinessOpportunitiesPages);

            }
        });



        $scope.BusinessOpportunities_selected_fn = function(item){
            $scope.BusinessOpportunities_selected = item;
        }




        //下次拜访（开始）时间控件调用
        $scope.expected_transaction_timeOpen = function ($event) {
            console.log($scope.startOpened);
            $event.preventDefault();
            $event.stopPropagation();
            $scope.startOpened = !$scope.startOpened;
        };

        //编辑商机信息
        $scope.edit_businessOpportunity_Modal = function(items){
            $scope.findAllDictByQuery_fn(8);
            $scope.businessOpportunity_items = items;

            $scope.businessOpportunity_items.belonging_user_id = $localStorage.user.id;
            $scope.businessOpportunity_items.belonging_user_name = $localStorage.user.user_cn_name;

            $scope.businessOpportunity_items.expected_transaction_time=(new Date($scope.businessOpportunity_items.expected_transaction_time)).Format('yyyy-MM-dd');

            console.log('$scope.businessOpportunity_items',$scope.businessOpportunity_items);
            $('#businessOpportunity_Modal').modal({
                backdrop:'static',//禁用鼠标点击窗口外部，窗口关闭
                keyboard:false,//禁用esc关闭按键
            });
        }
        //
        //打开商机窗口
        $scope.open_businessOpportunity_Modal = function(){
            console.log($localStorage);
            $scope.findAllDictByQuery_fn(8);
            $scope.businessOpportunity_items = {
                belonging_user_id:$localStorage.user.id,
                belonging_user_name:$localStorage.user.user_cn_name,
                customer_id:$scope.customer_id
            };
            $('#businessOpportunity_Modal').modal({
                backdrop:'static',//禁用鼠标点击窗口外部，窗口关闭
                keyboard:false,//禁用esc关闭按键
            });
        }

        //关闭商机窗口
        $scope.close_businessOpportunity_Modal = function(){
            $scope.submit_information = false;
            $('#businessOpportunity_Modal').modal('hide');
        }





        ////保存商机窗口
        $scope.save_businessOpportunity_Modal = function(form){
            $scope.submit_information = true;
            if (form.$valid) {
                $scope.businessOpportunity_items.expected_transaction_time =(new Date($scope.businessOpportunity_items.expected_transaction_time)).getTime();
                console.log(' $scope.businessOpportunity_items', $scope.businessOpportunity_items );
                console.log('验证成功!!');
                //$scope.contacts_items.customer_id =  $scope.customer_id;
                //$scope.contacts_items.tracking_user_id = $localStorage.user.id;
                delete $scope.businessOpportunity_items.belonging_user_name;
                delete $scope.businessOpportunity_items.modify_user_id;
                delete $scope.businessOpportunity_items.modify_time;
                delete $scope.businessOpportunity_items.create_name;
                $http({
                    method:'POST',
                    url:BACKSTAGESERVERADDRESS.ADDRESS+'/businessOpportunities/updateBusinessOpportunities',
                    data:$scope.businessOpportunity_items
                })
                    .success(function(data) {
                        console.log('保存商机结果',data);
                        if(data.e.code==0){
                            $.showMessage('保存成功');
                            $scope.BusinessOpportunitiesTableParams.reload();
                            $scope.close_businessOpportunity_Modal();

                        }else{
                            $.showError(data.e.desc);
                        }
                    })
            } else {
                console.log('验证失败',form);
                return false;
            }
        }


        $scope.del_businessOpportunity_fn = function(){
            $http({
                method:'POST',
                url:BACKSTAGESERVERADDRESS.ADDRESS+'/businessOpportunities/deleteBusinessOpportunities/'+$scope.del_businessOpportunityId
            })
                .success(function(data) {
                    console.log('商机删除结果',data);
                    if(data.e.code==0){
                        $scope.BusinessOpportunitiesTableParams.reload();
                        $.alert_ok('删除成功');
                    }else{
                        $.alert_error('删除失败');
                    }
                })
        }

        $scope.del_businessOpportunity = function(item){
            $scope.del_businessOpportunityId = item.id;
            $.alert_confim('确定删除该商机么？',$scope.del_businessOpportunity_fn);
        }


/**********************************************商机列表（结束）***************************************************/

/**********************************************成交信息列表（开始）***************************************************/

$scope.TransactionQuery = { "page":0, "rows":10, "custId":$scope.customer_id}
        //加载数据函数
        $scope.TransactionloadData = function (_defer,_params,_rows) {

            var q1=$q.defer();
            $scope.BusinessOpportunitiesQuery.page = (_params.page()-1);

            $http({
                method:'POST',
                url:BACKSTAGESERVERADDRESS.ADDRESS+'/customerTransaction/findCustomerTransactionByCustId',
                data:$scope.TransactionQuery ,
            })
                .success(function(data) {
                    console.log("成交信息>>=",data);
                    if(data.e.code==0){

                        //console.log(data.data.sendData);
                        q1.resolve(data.data);
                    }else{
                        //alert("-------------f1");
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
                        //$scope.cusomerContactsList=data.sendData.cusomerContactsList;

                        //查询成交信息
                        $scope.TransactionList= data.sendData;

                        $scope.TransactionCounts=data.count;

                    })
                ,
            ]).then(function(values) {

                _defer.resolve($scope.TransactionList);
                _params.total($scope.TransactionCounts);
                console.log("$q all ok",values);
                return ;
            },function (values) {

                console.log("$q all error2");
                console.log("err",values);
            });

        };






        var TransactionPages=10;
        $scope.TransactionTableParams = new ngTableParams({
            page: 1, // show first page
            count: TransactionPages// count per page
        }, {
            getData: function ($defer, params) {
                $scope.TransactionQuery.rows = params.count();
                $scope.TransactionloadData($defer,params,TransactionPages);

            }
        });



        //成交信息列表选择事件
        $scope.transaction_selected_fn = function(item,type){
            if(type==1){
                $scope.transaction_selected = item;
            }
            if(type==2){
                $scope.transaction_mouseover = item;
            }
        }


        //开始时间
        $scope.Transaction_time_beginOpen = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.Transaction_time_endOpened = false;
            $scope.Transaction_time_startOpened = !$scope.Transaction_time_startOpened;
            console.log($scope.opened)
        };

        //结束时间
        $scope.Transaction_time_endOpen = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.Transaction_time_startOpened = false;
            $scope.Transaction_time_endOpened = !$scope.Transaction_time_endOpened;
        };


        ////查询相关项
        //$scope.findCustomerTransactionByCustId = function(){
        //    $http({
        //        method:'POST',
        //        url:BACKSTAGESERVERADDRESS.ADDRESS+'/customerTransaction/findCustomerTransactionByCustId/'+$scope.customer_id
        //    })
        //        .success(function(data) {
        //            if(data.e.code==0){
        //                console.log('相关项',data);
        //                $scope.transaction_array = data.data.sendData;
        //            }
        //        })
        //}


        //修改成交信息窗口
        $scope.edit_Transaction_Modal = function(item){
            console.log(item);
            $scope.Transaction_items = item

            $scope.Transaction_items.start_date=(new Date($scope.Transaction_items.start_date)).Format('yyyy-MM-dd');
            $scope.Transaction_items.end_time=(new Date($scope.Transaction_items.end_time)).Format('yyyy-MM-dd');
            $('#Transaction_Modal').modal({
                backdrop:'static',//禁用鼠标点击窗口外部，窗口关闭
                keyboard:false,//禁用esc关闭按键
            });
        }


        //打开成交信息窗口
        $scope.open_Transaction_Modal = function(){
            console.log($localStorage);
            $scope.Transaction_items = {
                //belonging_user_id:$localStorage.user.id,
                //belonging_user_name:$localStorage.user.user_cn_name,
                customer_id:$scope.customer_id
            };
            $('#Transaction_Modal').modal({
                backdrop:'static',//禁用鼠标点击窗口外部，窗口关闭
                keyboard:false,//禁用esc关闭按键
            });
        }

        //关闭成交信息窗口
        $scope.close_Transaction_Modal = function(){
            $scope.submit_information = false;
            $('#Transaction_Modal').modal('hide');

        }


        ////保存成交信息窗口
        $scope.save_Transaction_Modal = function(form){
            $scope.submit_information = true;
            if (form.$valid) {
                if(typeof($scope.Transaction_items.start_date)!='undefined'){
                    $scope.Transaction_items.start_date = new Date($scope.Transaction_items.start_date).getTime();
                }
                if(typeof($scope.Transaction_items.end_time)!='undefined'){
                    $scope.Transaction_items.end_time =new Date($scope.Transaction_items.end_time).getTime();
                }

                console.log(' $scope.Transaction_items', $scope.Transaction_items );
                console.log('验证成功!!');
                //$scope.contacts_items.customer_id =  $scope.customer_id;
                //$scope.contacts_items.tracking_user_id = $localStorage.user.id;
                //delete $scope.businessOpportunity_items.belonging_user_name;
                delete $scope.Transaction_items.modify_user_id;
                delete $scope.Transaction_items.modify_time;
                $http({
                    method:'POST',
                    url:BACKSTAGESERVERADDRESS.ADDRESS+'/customerTransaction/updateCustomerTransaction',
                    data:$scope.Transaction_items
                })
                    .success(function(data) {
                        console.log('保存成交信息结果',data);
                        if(data.e.code==0){
                            $.showMessage('保存成功');
                            $scope.TransactionTableParams.reload();
                            $scope.close_Transaction_Modal();

                        }else{
                            $.showError(data.e.desc);
                        }
                    })
            } else {
                console.log('验证失败');
                return false;
            }
        }

/**********************************************成交信息列表（结束）***************************************************/




/**********************************************客户活动信息列表（结束）***************************************************/




        $scope.new_activity_type_time_initDate = new Date('2016-15-20');
        $scope.date_time_formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.new_activity_type_time_format = $scope.date_time_formats[1];

        //客户活动（开始）时间控件调用
        $scope.new_activity_type_time_beginOpen = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            // $scope.next_visit_time_begin_endOpened = false;
            $scope.new_activity_type_startOpened = !$scope.new_activity_type_startOpened;
            console.log($scope.opened)
        };



        //加载城市json文件数据
        $scope.province_addresses_array = new Array();
        $scope.refreshAddresses = function (address) {
            var params = { address: address, sensor: false };
            return $http.get(
                'app/json/area.json',
                { params: params }
            ).then(function (response) {
                console.log('response',response)
                $scope.province_addresses = response.data;
                for (var key in response.data){
                    $scope.province_addresses_array.push(key);
                }

                console.log('$scope.province_addresses_array',$scope.province_addresses_array);

            });
        };
        $scope.refreshAddresses();

        //省级下拉框选择事件
        $scope.province_addresses_select_change = function(){
            console.log('进来了',$scope.customer_detal_items.province);

            $scope.city_items = $scope.province_addresses[$scope.customer_detal_items.province]

            console.log('城市》》',$scope.city_items);
            $scope.customer_detal_items.city = $scope.city_items[0];

            //console.log($scope.province_addresses[item.label]);
            //console.log($scope.province_addresses);

        }


        //获取分钟和秒钟
        $scope.refreshTime = function (address) {
            var params = { address: address, sensor: false };
            return $http.get(
                'app/json/date_time.json',
                { params: params }
            ).then(function (response) {
                console.log('时间分钟',response)
                $scope.activity_date_hour = response.data.hour;
                $scope.activity_date_minute = response.data.minute;



                // $scope.province_addresses = response.data;
                // for (var key in response.data){
                //     $scope.province_addresses_array.push(key);
                // }
                //
                // console.log('$scope.province_addresses_array',$scope.province_addresses_array);

            });
        };
        $scope.refreshTime();
        //
        // $scope.mytime = new Date();
        //
        // $scope.hstep = 1;
        // $scope.mstep = 15;
        //
        // $scope.options = {
        //     hstep: [1, 2, 3],
        //     mstep: [1, 5, 10, 15, 25, 30]
        // };
        //
        // $scope.ismeridian = true;
        // $scope.toggleMode = function() {
        //     $scope.ismeridian = ! $scope.ismeridian;
        // };
        //
        // $scope.update = function() {
        //     var d = new Date();
        //     d.setHours( 14 );
        //     d.setMinutes( 0 );
        //     $scope.mytime = d;
        // };
        //
        // $scope.changed = function () {
        //     console.log('Time changed to: ' + $scope.mytime);
        // };
        //
        // $scope.clear = function() {
        //     $scope.mytime = null;
        // };


        //打开成交信息窗口
        $scope.open_new_activity_Modal = function(){
            $scope.new_activity_hour = $scope.activity_date_hour[0];
            $scope.new_activity_minute = $scope.activity_date_minute[0];
            console.log($localStorage);
            $scope.new_activity__items = {
                //belonging_user_id:$localStorage.user.id,
                //belonging_user_name:$localStorage.user.user_cn_name,
                customer_id:$scope.customer_id
            };


            console.log(new Date());
            $scope.new_activity__items.start_time =  new Date().Format('yyyy-MM-dd');
            $('#new_activity_Modal').modal({
                backdrop:'static',//禁用鼠标点击窗口外部，窗口关闭
                keyboard:false,//禁用esc关闭按键
            });
        }

        //关闭成交信息窗口
        $scope.close_new_activity_Modal = function(){
            $scope.submit_information = false;
            $('#new_activity_Modal').modal('hide');
        }
















/**********************************************客户活动信息列表（结束）***************************************************/





    }]);