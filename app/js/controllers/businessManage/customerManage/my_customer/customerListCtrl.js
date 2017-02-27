/**
 * 创建者：饶道坤
 * 创建日期：2016/2/17.
 * 描述：客户列表
 */
App.controller('customerListCtrl', ['$scope', '$http', '$state','$localStorage','$interval', 'uiGridConstants','ngTableParams','$q','customerService','dailyutilsService','i18nService','$compile',
    function($scope, $http, $state,$localStorage,$interval,uiGridConstants,ngTableParams,$q,customerService,dailyutilsService,i18nService,$compile) {
        $scope.msg = {};
    $scope.user = $localStorage.user;
        console.log($('#crm_body')[0].offsetHeight);



        //定义是否主要联系人
        $scope.is_primary_contact_items = [
            {id:0,label:'否'},
            {id:1,label:'是'}
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


        //查询跟踪人数据
        $scope.search_dep_user_fn = function(){

            $http({
                method:'POST',
                url:BACKSTAGESERVERADDRESS.ADDRESS+'/user/findUserByDepartId/'+$scope.user.department_id
            })
                .success(function(data) {
                    if(data.e.code==0){
                        $scope.dep_user_items = data.data.sendData;
                        console.log('当前部门跟踪人》》》》',data);
                    }
                })
        }


        //查询职务
        $scope.findAllDictByQuery_fn = function(){

            $http({
                method:'POST',
                url:BACKSTAGESERVERADDRESS.ADDRESS+'/dict/findAllDictByQuery/',
                data:{dict_type:7}
            })
                .success(function(data) {
                    if(data.e.code==0){
                        $scope.dict_items = data.data.sendData;
                        console.log('职务》》》》',data);
                    }
                })
        }

        $scope.search_dep_user_fn();
        $scope.search_business_stage_fn();


        ////获取所有语言
        //$scope.langs = i18nService.getAllLangs();
        //$scope.lang = 'zh-cn';
        //console.log($scope.langs);

        $scope.customer_row_over = function(index,row){
            //console.log('鼠标移入',index,row)
            $scope.customer_over_items = row.entity;
            $scope.customer_over_index = index;
        }

        $scope.customer_row_out = function(index,row){
            //console.log('鼠标移出',index,row)
        }


        //定义鼠标移入和移出的圆点样式
        $scope.over_style = {opacity:'1'};
        $scope.out_style = {opacity:'.65'};





        // $scope.dropdown = {};
        //
        // $scope.dropdown.items = null;
        //
        // $scope.disableDropdown = null;
        //
        //
        //
        // $scope.status = {
        //     isopen: false
        // };

        $scope.toggled = function(open) {
            console.log('Dropdown is now: ', open);
        };

        // $scope.toggleDropdown = function($event) {
        //     $event.preventDefault();
        //     $event.stopPropagation();
        //     $scope.status.isopen = !$scope.status.isopen;
        // };





    $scope.customer_list_gridOptions = {
        gridHeight:'800px',
        //enableFiltering: true,//启用搜索框
        enableSelectAll: true,//可以多选
        enableRowSelection: true,//启用选择行
        enableRowHeaderSelection: true,//单选
        multiSelect:true,
        //paginationPageSizes: [25, 50, 75],//设置分页的每页可显示的数据数量
        paginationPageSize: 20,//默认每页显示25条数据
        enablePaginationControls: true,
        enableSorting: true,
        enableGridMenu: false,//是否显示右上角菜单
        gridMenuShowHideColumns:true,//菜单中是否启用隐藏列操作功能
        // rowTemplate: '<div ng-mouseover="grid.appScope.customer_row_over(rowRenderIndex,row)" ng-mouseout="grid.appScope.customer_row_out(rowRenderIndex,row)">'+
        // '<div ng-repeat="col in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ui-grid-cell>'+
        // '</div>'+
        // '</div>',

        //gridMenuCustomItems: [
        //    {
        //        title: 'Rotate Grid',
        //        action: function ($event) \0
        //            this.grid.element.toggleClass('rotated');
        //        },
        //        order: 210
        //    }
        //],
        columnDefs: [
            // { name:'xz', field: 'xz',width: '2%', displayName: '<input type="checkbox"/>',enableColumnMenu: false,enableColumnResizing: false,
            //     cellTemplate:'' +
            //         '<div class="checkbox c-checkbox" style="margin-left: 5px;">' +
            //             '<label style="padding-left: 0px;">' +
            //                 '<input type="checkbox"/>' +
            //                 '<span class="fa fa-check" style="margin-left:0px; "></span>' +
            //             '</label>' +
            //         '</div>'
            // },
            { name:'customer_name', field: 'customer_name', displayName: '客户名称', width: '10%' ,enableColumnMenu: false,cellFilter:'null_value_filter'
                //menuItems: [
                //    {
                //        title: 'Outer Scope Alert',
                //        icon: 'ui-grid-icon-info-circled',
                //        action: function($event) {
                //            this.context.blargh(); // $scope.blargh() would work too, this is just an example
                //        },
                //        context: $scope
                //    },
                //    {
                //        title: 'Grid ID',
                //        action: function() {
                //            alert('Grid ID: ' + this.grid.id);
                //        }
                //    },
                //    {
                //        title: 'Column Title Alert',
                //        shown: function () {
                //            return this.context.col.displayName === 'Company';
                //        },
                //        action: function() {
                //            alert(this.context.col.displayName);
                //        }
                //    }
                //]
            },

            { name:'customer_type', field: 'customer_type', displayName: '客户类型', width: '10%',cellFilter: 'customer_type_filter',enableColumnMenu: false},
            { name:'customer_source', field: 'customer_source', displayName: '客户来源', width: '10%',cellFilter: 'customer_source_filter',enableColumnMenu: false},
            { name:'customer_web', field: 'customer_web', displayName: '客户网站', width: '10%',enableColumnMenu: false,cellFilter:'null_value_filter'},
            { name:'contacts_name', field: 'contacts_name', displayName: '联系人', width: '10%',enableColumnMenu: false,cellFilter:'null_value_filter'},
            { name:'telephone', field: 'telephone', displayName: '电话', width: '10%',enableColumnMenu: false,cellFilter:'null_value_filter'},
            { name:'business_stage_id', field: 'business_stage_id', displayName: '跟踪进程', width: '10%',enableColumnMenu: false,cellFilter: 'business_stage_filter'},
            { name:'tracking_user_name', field: 'tracking_user_name', displayName: '跟踪人', width: '10%' ,enableColumnMenu: false,cellFilter:'null_value_filter'},
            { name:'customer_state', field: 'customer_state', displayName: '客户状态', width: '10%',cellFilter: 'customer_status_filter',enableColumnMenu: false},
            { name:'caozuo', field: 'caozuo', displayName: '操作',width: '7%',enableColumnMenu: false,enableColumnResizing: false,
                cellTemplate:'<span on-toggle="toggled(open)" dropdown class="dropdown" style="position: absolute;margin-top: 5px;margin-left: 15px;">' +
                '<a href="" dropdown-toggle=""><i class="fa fa-cog"></i></a>' +
                    '<ul class="dropdown-menu" style="z-index: 9999;width: 85px;min-width: 85px;border: 1px solid #dde6e9;font-size: 12px;margin-left: -15px;margin-top: -2px;">' +
                        '<li><a href="javasript:void(0);">删除</a></li>' +
                        '<li><a href="javasript:void(0);">恢复</a></li>' +
                        '<li><a href="javasript:void(0);">更改状态</a></li>'+
                    '</ul>' +
                '</span>'
            }
        ],
        rowHeight: 40
    };





        $scope.customer_selectAall_items = new Array();
        //定义ui-gird事件（这个函数里面定义的都是ui-gird控件的各种事件）
        $scope.customer_list_gridOptions.onRegisterApi = function(gridApi) {
            $scope.customer_gridApi = gridApi;

            //选择一行客户信息详情
            $scope.customer_gridApi.selection.on.rowSelectionChanged($scope,function(rows,elements){

                console.log($scope.customer_gridApi.selection.getSelectedRows());
                $scope.customer_selectAall_items =  $scope.customer_gridApi.selection.getSelectedRows();
                console.log($scope.customer_gridApi);
                $scope.customer_detal_items = rows.entity;

                console.log('存储已经选择数据行》》',$scope.customer_selectAall_items);

                //console.log(changedColumn.entity);
                //    $routeProvider.when('/',{
                //        templateUrl: 'views/businessManage/customerManage/customer_Deal.html',
                //        controller: rows.entity
                //})
                //    .ohterwise({
                //        redirectTo: '/'
                //    });


            })


            //勾选所有复选框操作函数
            $scope.customer_gridApi.selection.on.rowSelectionChangedBatch($scope,function(rows){
                console.log('状态',$scope.customer_gridApi.selection.getSelectAllState())

                if($scope.customer_gridApi.selection.getSelectAllState()==false){

                    // console.log('全选',rows);
                    var df = new Array();
                    for(var i=0;i<rows.length;i++){
                        df.push(rows[i].entity);
                    }
                    console.log('df',df);
                    $scope.customer_selectAall_items = df;
                    console.log('存储已经选择数据行》》',$scope.customer_selectAall_items);
                    // console.log($scope.customer_gridApi);
                }else{
                    $scope.customer_selectAall_items = new Array();
                    console.log('存储已经选择数据行》》',$scope.customer_selectAall_items);
                }

            });

            $scope.toggleFiltering = function(){

                console.log($scope.customer_list_gridOptions);
                console.log(gridApi);
                $scope.customer_list_gridOptions.enableFiltering = !$scope.customer_list_gridOptions.enableFiltering;
                $scope.customer_gridApi.core.notifyDataChange( uiGridConstants.dataChange.COLUMN );
                $scope.customer_gridApi.grid.refresh();
            };


            //$scope.customer_gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);

            //$scope.filter = function() {
            //    $scope.gridApi.grid.refresh();
            //};

        };




        //点击详情按钮，查询选中的数据
        $scope.customemr_detal_fn  = function(rowRenderIndex,row){
            $scope.customer_detal_items = row.entity;

            customerService.setCustomer_detal($scope.customer_detal_items);
            //console.log($scope.customer_gridApi);
            $state.go('app.org.busi.customer.customer_detal',{customer_id:$scope.customer_detal_items.id,customer_state:$scope.customer_detal_items.customer_state});
            console.log('$scope.customer_detal_items>>',$scope.customer_detal_items);
            //console.log(rowRenderIndex,row);

        }


        //设置默认显示的语言


        $scope.customer_querys={'page':0,'rows':10,'query':{"tracking_user_id":-1,"business_stage_id":0,"customer_state":0 ,"customer_type":0,"customer_name":'',"contact_time_begin":'',"contact_time_end":'',"next_visit_time_begin":'',"next_visit_time_end":'',"is_public":0}};
        if($scope.user.role_id==7){
            console.log('$scope.user',$scope.user);
            $scope.customer_querys.user_id=$scope.user.id;
        }else{
            $scope.customer_querys.depart_id=$scope.user.department_id;
        }

        //加载客户数据
        $scope.load_customer_items_fn = function(){
            $http({
                method:'POST',
                url:BACKSTAGESERVERADDRESS.ADDRESS+'/customer/findCustomerByQuery',
                data:$scope.customer_querys
            })
                .success(function(data) {
                    if(data.e.code==0){
                        console.log('data123',data);
                        $scope.customerData=data.data.sendData;
                        $scope.customer_list_gridOptions.data = data.data.sendData;
                        console.log('客户列表数据',$scope.customer_list_gridOptions.data);
                    }
                })
        }


        $scope.load_customer_items_fn();



        $scope.senior_search_panel_state = false;
        $scope.show_senior_search_panel_fn = function(){
            $scope.senior_search_panel_state = !$scope.senior_search_panel_state;
            //if($scope.senior_search_panel_state==true){
            //    console.log($scope.senior_search_panel_state);
            //    $scope.customer_querys.query.contact_time_begin = '';
            //    $scope.customer_querys.query.contact_time_end = '';
            //    $scope.customer_querys.query.next_visit_time_begin = '';
            //    $scope.customer_querys.query.next_visit_time_end = '';
            //}else{
            //    console.log($scope.senior_search_panel_state);
            //    $scope.customer_querys.query.contact_time_begin = 0;
            //    $scope.customer_querys.query.contact_time_end = 0;
            //    $scope.customer_querys.query.next_visit_time_begin = 0;
            //    $scope.customer_querys.query.next_visit_time_end = 0;
            //}

            console.log($scope.customer_querys.query);

        }
        //$scope.close_senior_search_panel_fn = function(){
        //    $scope.senior_search_panel_state = false;
        //}




        //联系时间（开始）时间控件调用
        $scope.contact_time_beginOpen = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.contact_time_endOpened = false;
            $scope.contact_time_startOpened = !$scope.contact_time_startOpened;
            console.log($scope.opened)
        };

        //联系时间（结束）时间控件调用
        $scope.contact_time_endOpen = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.contact_time_startOpened = false;
            $scope.contact_time_endOpened = !$scope.contact_time_endOpened;
        };


        //下次拜访（开始）时间控件调用
        $scope.next_visit_time_beginOpen = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.next_visit_time_begin_endOpened = false;
            $scope.next_visit_time_begin_startOpened = !$scope.next_visit_time_begin_startOpened;
            console.log($scope.opened)
        };

        //下次拜访（结束）时间控件调用
        $scope.next_visit_time_endOpen = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.next_visit_time_begin_startOpened = false;
            $scope.next_visit_time_begin_endOpened = !$scope.next_visit_time_begin_endOpened;
        };



        //跟踪人下拉框选择事件
        dep_user_select_fn = function(){
            $scope.customer_querys.query.tracking_user_id = $("#dep_user_select").val();
            console.log($("#dep_user_select").val());
        }
        //客户状态下拉框选择事件
        customer_status_select_fn = function(){
            $scope.customer_querys.query.customer_state = $("#customer_status_select").val();
            console.log($("#customer_status_select").val());
        }

        //客户类型下拉框选择事件
        customer_type_select_fn = function(){
            $scope.customer_querys.query.customer_type = $("#customer_type_select").val();
            console.log($("#customer_type_select").val());
        }

        //跟进阶段下拉框选择事件
        business_stage_select_fn = function(){
            $scope.customer_querys.query.business_stage_id = $("#business_stage_select").val();
            console.log($("#business_stage_select").val());
        }

        //客户查询
        $scope.customer_search_fn = function(){

            if($scope.customer_querys.query.contact_time_begin!=''){
                $scope.customer_querys.query.contact_time_begin = new Date($scope.customer_querys.query.contact_time_begin).getTime();
            }
            if($scope.customer_querys.query.contact_time_end!=''){
                $scope.customer_querys.query.contact_time_end = new Date($scope.customer_querys.query.contact_time_end).getTime();
            }
            if($scope.customer_querys.query.next_visit_time_begin!=''){
                $scope.customer_querys.query.next_visit_time_begin = new Date($scope.customer_querys.query.next_visit_time_begin).getTime();
            }
            if($scope.customer_querys.query.next_visit_time_end!=''){
                $scope.customer_querys.query.next_visit_time_end = new Date($scope.customer_querys.query.next_visit_time_end).getTime();
            }
            $scope.load_customer_items_fn();

            console.log($scope.customer_querys);
        }





        //$scope.saveRow = function( rowEntity ) {
        //    // create a fake promise - normally you'd use the promise returned by $http or $resource
        //    var promise = $q.defer();
        //    $scope.customer_gridApi.rowEdit.setSavePromise( rowEntity, promise.promise );
        //
        //    // fake a delay of 3 seconds whilst the save occurs, return error if gender is "male"
        //    $interval( function() {
        //        if (rowEntity.Gender === 'male' ){
        //            promise.reject();
        //        } else {
        //            promise.resolve();
        //        }
        //    }, 3000, 1);
        //};
        //
        //var handleFileSelect = function( event ){
        //    var target = event.srcElement || event.target;
        //
        //    if (target && target.files && target.files.length === 1) {
        //        var fileObject = target.files[0];
        //        $scope.customer_gridApi.importer.importFile( fileObject );
        //        target.form.reset();
        //    }
        //};
        //
        //var fileChooser = document.querySelectorAll('.file-chooser');
        //
        //if ( fileChooser.length !== 1 ){
        //    console.log('Found > 1 or < 1 file choosers within the menu item, error, cannot continue');
        //} else {
        //    fileChooser[0].addEventListener('change', handleFileSelect, false);  // TODO: why the false on the end?  Google
        //}






        $scope.customer_list_gridOptions.importerDataAddCallback = function( grid, newObjects ) {
            console.log(grid,newObjects);
            $scope.data = $scope.data.concat( newObjects );
        }



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
        $scope.province_addresses_select_change = function(item,model){
            console.log(item,model);

            $scope.city_items = $scope.province_addresses[item]

            $scope.customer_items.city = $scope.city_items[0];
            console.log('单个》》',$scope.city_items[0]);
            //console.log($scope.province_addresses[item.label]);
            //console.log($scope.province_addresses);

        }

        $scope.city_addresses_select_change = function(item,model){
            console.log(item,model);

        }


        //查询行业大类
        $scope.search_industry_big_type = function(industry_json){

            $http({
                method:'POST',
                url:BACKSTAGESERVERADDRESS.ADDRESS+'/dict/findAllDictByQuery',
                data:industry_json
            })
                .success(function(data) {
                    if(data.e.code==0){

                        if(typeof(industry_json.dict_type)!='undefined'){
                            $scope.industry_big_type_items = data.data.sendData;
                            console.log('行业大类',$scope.industry_big_type_items);
                        }
                        if(typeof(industry_json.pid)!='undefined'){
                            $scope.industry_small_type_items = data.data.sendData;
                            console.log('行业子类',$scope.industry_small_type_items);
                        }
                    }
                })

        }

        //
        $scope.industry_big_type_select_change = function(item,model){
            console.log(item,model);
            $scope.search_industry_big_type({"pid":model});
        }



        //打开窗口，添加一个只有ID的数据
        $scope.add_customer_fn = function(){
            console.log('进来了');

            $http({
                method:'POST',
                url:BACKSTAGESERVERADDRESS.ADDRESS+'/customer/updateCustomer',
                data:{customer:$scope.customer_items,contacts:null}
            })
                .success(function(data) {
                    if(data.e.code==0){
                       console.log('保存一个带ID的客户数据',data);
                        $scope.customer_items.id = data.data.sendData;

                        $scope.customer_items_id = data.data.sendData;
                    }
                })

        }


        //打开窗口
        $scope.customer_contacts_Array = new Array();

        $scope.open_add_customer_Modal = function(){

            //定义是添加客户状态
            $scope.add_customer_state = 1;

            //客户信息
            $scope.customer_items = {
                is_public:0,
                customer_state:4

                //tracking_user_id:$scope.user.id
            };
            //客户联系人信息
            $scope.customer_contacts_items = {};
            $scope.customer_contacts_Array[0] = $scope.customer_contacts_items;



            $scope.add_customer_fn();
            $scope.findAllDictByQuery_fn();

            $scope.search_industry_big_type({"dict_type":4});


            $('#add_customer_Modal').modal({
                backdrop:'static',//禁用鼠标点击窗口外部，窗口关闭
                keyboard:false,//禁用esc关闭按键
            });

            $scope.submit_add_customer = false;
            console.log($scope.add_customer_form);
        }


        //删除已经生成的客户ID
        $scope.del_customer = function(){
            $http({
                method:'POST',
                url:BACKSTAGESERVERADDRESS.ADDRESS+'/customer/deleteCustomer/'+$scope.customer_items_id
            })
                .success(function(data) {
                    if(data.e.code==0){
                       console.log(data);
                    }
                })
        }


        //批量删除客户
        $scope.batch_delete_customer = function(){
            $http({
                method:'POST',
                url:BACKSTAGESERVERADDRESS.ADDRESS+'/customer/batchDeleteCustomer',
                data:$scope.customer_selectAall_items
            })
                .success(function(data) {
                    if(data.e.code==0){
                        console.log('批量删除结果',data);
                        $.showMessage('删除成功');
                        //重新加载数据
                        $scope.load_customer_items_fn();
                    }
                })
        }


        //关闭窗口
        $scope.close_add_customer_Modal = function(){
            $('#add_customer_Modal').modal('hide');

            $scope.del_customer();
        }

        //保存事件
        $scope.save_add_customer_Modal = function(){
            console.log('进入保存窗口');
            $('#add_customer_Modal').modal('hide');
        }




        //客户状态选择事件
        $scope.customer_state_id = 4;//默认选择的是个人客户
        $scope.customer_state_select_fn = function(item,model){

            if(model!=$scope.customer_state_id){
                //客户信息
                $scope.customer_items.customer_state = model;
                $scope.customer_state_id = model;
            }


            if(model!=4){
                contact_num=-1;
                $('#contacts_div_0').remove();
                $scope.add_contact();
            }

            console.log(item,model);
        }




        //验证form表单
        $scope.submit_add_customer = false;
        $scope.validate_add_customer_Input = function(name, type) {
            var add_customer_input = $scope.add_customer_form[name];
            return (add_customer_input.$dirty || $scope.submit_add_customer) && add_customer_input.$error[type];
        };














/*****************************************查询联系人接口（开始）*************************************************/
        $scope.first_contactsQuery = {"page":0,"rows":10, "query":{
            "tracking_user_id":-1,
            "customer_id":0,
            "fuzzy_query":"",
            "job":-1,
            "is_primary_contact":-1,
            "is_delete":-1
        }};
        //加载数据函数
        $scope.first_contactsLoadData = function (_defer,_params,_rows) {
            var q1=$q.defer();
            $scope.first_contactsQuery.page=(_params.page()-1);

            $http({
                method:'POST',
                url:BACKSTAGESERVERADDRESS.ADDRESS+'/customercontacts/findCustomerContacts',
                data:$scope.first_contactsQuery
            })
                .success(function(data) {
                    console.log("first_contacts----------------->>>>",data);
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
                        $scope.first_contactsList= data.sendData;
                        console.log('$scope.first_contactsList',$scope.first_contactsList);
                        $scope.first_contactsCounts=data.count;
                        console.log('$scope.first_contactsCounts',$scope.first_contactsCounts);
                    })

            ]).then(function(values) {
                _params.total($scope.first_contactsCounts);
                _defer.resolve($scope.first_contactsList);
            },function (values) {
                console.log("$q all error2");
                console.log("err",values);
            });
        };

        var pages=10;
        $scope.first_contactsTableParams_fn = function(){
            $scope.first_contactsTableParams = new ngTableParams({
                page: 1, // show first page
                count: pages// count per page
            }, {
                getData: function ($defer, params) {
                    console.log("params",params );
                    $scope.first_contactsQuery.rows = params.count();
                    $scope.first_contactsLoadData($defer,params,pages);
                }
            });
        }



            $scope.setSelected_first_contacts = function(items){
                $scope.select_first_contacts_items = items;
                console.log('$scope.select_first_contacts_items',$scope.select_first_contacts_items);
            }
        //打开窗口
        $scope.show_first_contacts_model = function(){
            if(typeof($scope.first_contactsTableParams)!='undefined'){
                $scope.first_contactsTableParams.reload();
                console.log('不是第一次打开联系人窗口');
            }else{
                $scope.first_contactsTableParams_fn();
                console.log('是第一次打开联系人窗口');
            }
            $('#first_contacts_Modal').modal({
                backdrop:'static',//禁用鼠标点击窗口外部，窗口关闭
                keyboard:false,//禁用esc关闭按键
            });

            $('.modal').css('overflow-y:','auto');
        }

        //关闭窗口
        $scope.close_first_contacts_model = function(){
            $('#first_contacts_Modal').modal('hide');
            $('.modal').css('overflow-y:','auto');
        }

        //保存事件
        $scope.save_first_contacts_model = function(){
            console.log('进入保存窗口');
            $scope.customer_items.customer_contact_id = $scope.select_first_contacts_items.id;
            $scope.customer_items.cust_contact_name = $scope.select_first_contacts_items.contacts_name;

            $('#first_contacts_Modal').modal('hide');
            console.log('$scope.customer_items',$scope.customer_items);
        }

/*****************************************查询联系人接口（结束）*************************************************/






/*****************************************查询联系人母公司（开始）*************************************************/
        $scope.p_companyQuery = {"page":0,"rows":10,"query":{}};
        //加载数据函数
        $scope.p_companyLoadData = function (_defer,_params,_rows) {
            var q1=$q.defer();
            $scope.p_companyQuery.page=(_params.page()-1);

            $http({
                method:'POST',
                url:BACKSTAGESERVERADDRESS.ADDRESS+'/customer/findAllCustomer',
                data:$scope.p_companyQuery
            })
                .success(function(data) {
                    console.log("p_company----------------->>>>",data);
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
                        $scope.p_companyList= data.sendData;
                        console.log('$scope.p_companyList',$scope.p_companyList);
                        $scope.p_companyCounts=data.count;
                        console.log('$scope.p_companyCounts',$scope.p_companyCounts);
                    })

            ]).then(function(values) {
                _params.total($scope.p_companyCounts);
                _defer.resolve($scope.p_companyList);
            },function (values) {
                console.log("$q all error2");
                console.log("err",values);
            });
        };

        var pages=10;
        $scope.p_companyTableParams_fn = function(){
            $scope.p_companyTableParams = new ngTableParams({
                page: 1, // show first page
                count: pages// count per page
            }, {
                getData: function ($defer, params) {
                    console.log("params",params );
                    $scope.p_companyQuery.rows = params.count();
                    $scope.p_companyLoadData($defer,params,pages);
                }
            });
        }




        $scope.set_p_company_Selected = function(items){
            $scope.select_p_company_items = items;
            console.log('$scope.select_p_company_items',$scope.select_p_company_items);
        }

        //打开窗口
        $scope.show_p_company_model = function(){
            if(typeof($scope.p_companyTableParams)!='undefined'){
                $scope.p_companyTableParams.reload();
            }else{
                $scope.p_companyTableParams_fn();
            }
            $('#p_company_Modal').modal({
                backdrop:'static',//禁用鼠标点击窗口外部，窗口关闭
                keyboard:false,//禁用esc关闭按键
            });
            $('#add_customer_Modal').css('overflow-y:','auto');
            $('#add_customer_Modal').modal('hide');
        }

        //关闭窗口
        $scope.close_p_company_model = function(){
            $('#p_company_Modal').modal('hide');
            $('#add_customer_Modal').css('overflow-y:','auto');

            $('#add_customer_Modal').modal({
                backdrop:'static',//禁用鼠标点击窗口外部，窗口关闭
                keyboard:false,//禁用esc关闭按键
            });
        }

        //保存事件
        $scope.save_p_company_model = function(){
            console.log('进入保存窗口');
            $scope.customer_items.pid = $scope.select_p_company_items.id;
            $scope.customer_items.pname = $scope.select_p_company_items.customer_name;
            $('#p_company_Modal').modal('hide');

            $('#add_customer_Modal').modal({
                backdrop:'static',//禁用鼠标点击窗口外部，窗口关闭
                keyboard:false,//禁用esc关闭按键
            });
        }

        //删除已选的母公司值
        $scope.del_customer_items_pid = function(){
            delete $scope.customer_items.pid;
            delete $scope.customer_items.pname;
        }

        /*****************************************查询母公司（结束）*************************************************/




            //保存客户信息
        $scope.save_customer = function() {
            console.log($scope.add_customer_form);
            $scope.submit_add_customer = true;
            if ($scope.add_customer_form.$valid) {
                console.log(' $scope.customer_items', $scope.customer_items );
                console.log('$scope.customer_contacts_Array',$scope.customer_contacts_Array);
                console.log('验证成功!!');
                if($scope.customer_items.customer_state==4){
                    var customer_contacts = {
                        contacts_name:$scope.customer_items.customer_name,
                        first_cellphone:$scope.customer_items.contact_number,
                        is_primary_contact:1
                    };
                    $scope.customer_contacts_Array[0].customer_contacts_items = customer_contacts;
                }
                //delete $scope.customer_items.cust_contact_name;
                //delete $scope.customer_items.pname;

                $http({
                    method:'POST',
                    url:BACKSTAGESERVERADDRESS.ADDRESS+'/customer/updateCustomer',
                    data:{customer:$scope.customer_items,contacts:$scope.customer_contacts_Array}
                })
                    .success(function(data) {
                        console.log('保存客户结果',data);
                        if(data.e.code==0){
                            $scope.submit_add_customer = false;
                            $.showMessage('保存成功');
                            $scope.load_customer_items_fn();
                            $('#add_customer_Modal').modal('hide');

                        }else{
                            $.showError(data.e.desc);
                        }
                    })
            } else {
                console.log('验证失败');
                return false;
            }
        };






        //添加联系人html元素
        var contact_num = -1;
        $scope.add_contact = function(){
            contact_num++;
            $scope.customer_contacts_items = {};
            $scope.customer_contacts_Array[contact_num] = $scope.customer_contacts_items;


            var html = ' <div id="contacts_div_'+contact_num+'" style="border: 1px solid #dde6e9;height: 190px;padding:5px;margin-top: 2px;display: table;">'+
                '<div class="form-group-left" ng-if="customer_items.customer_state!=4">'+
                    '<label class="custom_form_label">联系人名称：</label>'+
                    '<input type="text" name="contacts_name" required="required" ng-model="customer_contacts_Array['+contact_num+'].customer_contacts_items.contacts_name" placeholder="客户名称" class="custom_form_control">'+
                    ' <!--<p class="custom_form_p" ng-show="validate_add_customer_Input("customer_name", "required")">请填写客户名称！</p>-->'+
                '</div>'+
                '<div class="form-group-left" ng-if="customer_items.customer_state!=4">'+
                    ' <label class="custom_form_label">客户手机：</label>'+
                    '<input type="text" name="first_cellphone" required="required" ng-model="customer_contacts_Array['+contact_num+'].customer_contacts_items.first_cellphone" placeholder="手机" class="custom_form_control">'+
                    '<!--<p class="custom_form_p" ng-show="validate_add_customer_Input("customer_name", "required")">请填写客户名称！</p>-->'+
                '</div>'+
                '<div class="form-group-left" ng-if="customer_items.customer_state!=4">'+
                    '<label class="custom_form_label">客户职务：</label>'+
                    '<ui-select   class="custom_form_ui_select_control_forOne" name="job"   ng-model="customer_contacts_Array['+contact_num+'].customer_contacts_items.job" theme="bootstrap" >'+
                        '<ui-select-match placeholder="客户职务">'+
                        '{{$select.selected.dict_name}}'+
                        '</ui-select-match>'+
                        '<ui-select-choices repeat="dict.id as dict in dict_items | filter: $select.search">'+
                        '<small ng-bind-html="dict.dict_name"></small>'+
                        '</ui-select-choices>'+
                    '</ui-select>'+
                    //'<input type="text" name="job" required="required" ng-model="customer_contacts_Array['+contact_num+'].customer_contacts_items.job" placeholder="客户职务" class="custom_form_control">'+
                    '<!--<p class="custom_form_p" ng-show="validate_add_customer_Input("customer_name", "required")">请填写客户名称！</p>-->'+
                ' </div>'+
                '<div class="form-group-left" ng-if="customer_items.customer_state!=4">'+
                    '<label class="custom_form_label">客户QQ：</label>'+
                    '<input type="text" name="qq" required="required" ng-model="customer_contacts_Array['+contact_num+'].customer_contacts_items.qq" placeholder="客户qq" class="custom_form_control">'+
                    '<!--<p class="custom_form_p" ng-show="validate_add_customer_Input("customer_name", "required")">请填写客户名称！</p>-->'+
                '</div>'+

                '<div class="form-group-left" ng-if="customer_items.customer_state!=4">'+
                    '<label class="custom_form_label">客户邮箱：</label>'+
                    '<input type="text" name="first_email"  ng-model="customer_contacts_Array['+contact_num+'].customer_contacts_items.first_email" placeholder="客户邮箱" class="custom_form_control">'+
                    '<!--<p class="custom_form_p" ng-show="validate_add_customer_Input("customer_name", "required")">请填写客户名称！</p>-->'+
                '</div>'+

                '<div class="form-group-left" ng-if="customer_items.customer_state!=4">'+
                    '<label class="custom_form_label">客户微信：</label>'+
                    '<input type="text" name="wechat" required="required" ng-model="customer_contacts_Array['+contact_num+'].customer_contacts_items.wechat" placeholder="客户微信" class="custom_form_control">'+
                    '<!--<p class="custom_form_p" ng-show="validate_add_customer_Input("customer_name", "required")">请填写客户名称！</p>-->'+
                '</div>'+

                '<div class="form-group-left " ng-if="customer_items.customer_state!=4">'+
                    '<label class="custom_form_ui_select_label">是否首要联系人：</label>'+
                    '<ui-select required="required" class="custom_form_ui_select_control_forOne" name="is_primary_contact_items"  ng-model="customer_contacts_Array['+contact_num+'].customer_contacts_items.is_primary_contact" theme="bootstrap" >'+
                        '<ui-select-match placeholder="是否首要联系人">'+
                        '{{$select.selected.label}}'+
                        '</ui-select-match>'+
                        ' <ui-select-choices repeat="is_primary_contact.id as is_primary_contact in is_primary_contact_items | filter: $select.search">'+
                        '<small ng-bind-html="is_primary_contact.label"></small>'+
                        '</ui-select-choices>'+
                    '</ui-select>'+
                    '<!--<p class="custom_form_p" ng-show="validate_add_customer_Input("customer_type", "required")">请选择类型！</p>-->'+
                '</div>'+
                '<div class="form-group-left " ng-if="customer_items.customer_state!=4">'+
                    '<button type="button" class="mb-sm btn btn-danger" ng-click="remove_contact_html('+contact_num+')"> <i class="fa fa-trash-o"style="color: #ffffff;" ></i> 删除联系人</button>'+

                '</div>'+

            '</div>';
            var template = angular.element(html);
            var mobileDialogElement = $compile(template)($scope);
            //console.log('mobileDialogElement',mobileDialogElement);
            angular.element("#contacts_panel_body").append(mobileDialogElement);
        }




        //删除添加的联系人html元素
        $scope.remove_contact_html = function(index){

            $('#contacts_div_'+index).remove();
            delete  $scope.customer_contacts_Array[index];

        }
        $scope.save_contact = function(){

            for(var i=0;i<$scope.customer_contacts_Array.length;i++){
                if(typeof($scope.customer_contacts_Array[i])!='undefined' ){
                    console.log('$scope.customer_contacts_Array[i].customer_contacts_items',$scope.customer_contacts_Array[i].customer_contacts_items);
                }
            }
            console.log('$scope.customer_contacts_Array',$scope.customer_contacts_Array);
        }


}]);



App.filter('null_value_filter', function() {
    // var genderHash = {
    //     1: 'A类客户',
    //     2: 'B类客户',
    //     3: 'C类客户'
    // };

    return function(input) {
        if (!input){
            return '/';
        } else {
            return input;
        }
    };
});


App.filter('customer_type_filter', function() {
    var genderHash = {
        1: 'A类客户',
        2: 'B类客户',
        3: 'C类客户'
    };

    return function(input) {
        if (!input){
            return '/';
        } else {
            return genderHash[input];
        }
    };
});


App.filter('customer_status_filter', function() {
    var genderHash = {
        1: '潜在',
        2: '储备',
        3: '成就',
        4: '删除'
    };

    return function(input) {
        if (!input){
            return '/';
        } else {
            return genderHash[input];
        }
    };
});


App.filter('customer_source_filter', function() {
    var genderHash = {
        1:'电话营销开发',
        2:'主页客户反馈',
        3:'市场活动反馈',
        4:'客户自找上门',
        5:'广告推广',
        6:'老客户转介绍',
        7:'老客户转报'
    };

    return function(input) {
        if (!input){
            return '/';
        } else {
            return genderHash[input];
        }
    };
});

App.filter('business_stage_filter', function() {
    var genderHash = {
        1:'新建待跟',
        2:'发送email',
        3:'电话回访预约',
        4:'面谈',
        5:'很有戏谈判阶段',
        6:'有兴趣但需要长期跟踪',
        7:'反应一般，暂无需求'
    };

    return function(input) {
        if (!input){
            return '/';
        } else {
            return genderHash[input];
        }
    };
});