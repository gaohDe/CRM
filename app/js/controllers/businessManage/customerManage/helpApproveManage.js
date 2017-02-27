/**
 * 创建者：姜若雪
 * 创建日期：2016.04.01.
 * 描述：求助审批模块
 */
App.controller('searchHelpApproveCtrl', ["$scope", "$http", "ngTableParams", "$q", "$modal",
    function($scope, $http, ngTableParams, $q, $modal) {
    	$scope.searchItem = {};//搜索model
    	$scope.helpItems = {};
    	$scope.helpSearchItems = {};

    	$scope.status_items = [
	        {id: 0,label:'全部'},
	        {id:1,label:'申请求助'},
	        {id:2,label:'进行中'},
	        {id:3,label:'已拒绝'},
	        {id:4,label:'已撤销'},
	        {id:5,label:'已完成'},
	        {id:6,label:'关闭'},
	    ];


    	//加载所有求助信息
    	$scope.loadHelpList = function(_defer,_params,_rows) {
    		var q1=$q.defer();
        	var _page=_params.page()-1;

        	$scope.searchQuery = {
        		"page": _page,
				"rows":_rows,
				"query": {
					"help_user_id":'-1',
					"cust_name": $scope.helpSearchItems.cust_name,
					"help_state":  $scope.helpSearchItems.status_type === 0 ? undefined : $scope.helpSearchItems.status_type,
					"create_time_begin": $scope.helpSearchItems.start_help_time,
					"create_time_end": $scope.helpSearchItems.end_help_time,
					"check_time_begin": $scope.helpSearchItems.start_approve_time,
					"check_time_end": $scope.helpSearchItems.end_approve_time
				}
        	};

    		$http({
    			method: 'post',
    			url: BACKSTAGESERVERADDRESS.ADDRESS +'/customerHelp/findCustomerHelp',
    			data: $scope.searchQuery
    		}).success(function(data) {
    			if(data.e.code==0){
    				console.log(data)
                	q1.resolve(data.data);
	            }else{
	                q1.reject(data.e)
	            }
    		}).error(function(data) {
    			q1.reject(data.e);
    		});

    		 $q.all([
	            q1.promise
	                .then(function(data){
	                    $scope.dataList = data.sendData;
	                    $scope.pageCounts=data.count;
	                    console.log(data.count)
	                })
	        ])
	            .then(function(values){
	                _params.total($scope.pageCounts);
	                _defer.resolve($scope.dataList);
	            },function(values){
	                 console.log('$q all error');
	            })
    	};
	    
	    var pages=10;
	    $scope.helpApproveTableParams = new ngTableParams({
	        page: 1,
	        count: pages
	    },{getData:function($defer,params){
	        $scope.loadHelpList($defer, params, pages)
	        }
	    }); 

	    //点开日历选择日期
	    $scope.startHelpTimeOpen = function ($event) {
	    	console.log('dd')
	        $event.preventDefault();
	        $event.stopPropagation();
	        $scope.endOpened = false;
	        $scope.endApproveOpened = false;
	        $scope.startApproveOpened = false;
	        $scope.startOpened = !$scope.startOpened;
	    };

	    $scope.endHelpTimeClose = function ($event) {
	    	$event.preventDefault();
	        $event.stopPropagation();
	        $scope.startOpened = false;
	        $scope.endApproveOpened = false;
	        $scope.startApproveOpened = false;
	        $scope.endOpened = !$scope.endOpened;
	    };
	    //审核日期选择
	    $scope.startApproveTimeOpen = function ($event) {
	        $event.preventDefault();
	        $event.stopPropagation();
	        $scope.endApproveOpened = false;
	        $scope.endOpened = false;
	        $scope.startOpened = false;
	        $scope.startApproveOpened = !$scope.startApproveOpened;
	    };

	    $scope.endApproveTimeClose = function ($event) {
	    	$event.preventDefault();
	        $event.stopPropagation();
	        $scope.startApproveOpened = false;
	        $scope.endOpened = false;
	        $scope.startOpened = false;
	        $scope.endApproveOpened = !$scope.endApproveOpened;
	    };

	    //搜索
	    $scope.searchHelpMessage = function() {
	    	$scope.helpSearchItems.cust_name = $scope.searchItem.cust_name;
	    	$scope.helpApproveTableParams.reload();
	    };

	    //鼠标覆盖显示操作按钮
	    $scope.over_Tr = function(item) {
	        $scope.mouseover_id = item.id;
	    };

	    $scope.out_Tr = function(item) {
	        delete $scope.mouseover_id;
	    };

	    //点击选中行
	    $scope.selectedTr = function(item) {
	        $scope.helpApproveItems = item;
	    };

	    //同意该条请求
	    $scope.agreeHelpItem = function(item) {
	    	swal({
                title: '确认同意么？',
                //text: "You will not be able to recover this imaginary file!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确定",
                closeOnConfirm: false,
                cancelButtonText:"取消"
            },
            function(isConfirm){
                if(isConfirm){
                    $scope.alert_confim(item);
                }

            })
	    };

	    $scope.alert_confim = function (item) {
	        var agreeHelpItem = {};
	    	agreeHelpItem.id = item.id;
	    	agreeHelpItem.help_state = '2';

	    	$http({
    			method: 'post',
    			url: BACKSTAGESERVERADDRESS.ADDRESS +'/customerHelp/updateCustomerHelp',
    			data: agreeHelpItem
    		}).success(function(data) {
    			if(data.e.code==0){
                    $.alert_ok('操作成功');
                    $scope.helpApproveTableParams.reload();
                }else{
                    $.alert_error('操作失败');
                }
    		})
	    };

	    //不同意该条请求
	    $scope.noAgreeHelpItem = function(item) {
	    	console.log(item)
	    	$('#addItem').modal({
                backdrop:'static',//禁用鼠标点击窗口外部，窗口关闭
                keyboard:false//禁用esc关闭按键
            });
	    };

	    //关闭modal窗口
        $scope.closeModal = function(){
            $scope.submitted = false;
            $('#addItem').modal('hide');
        };

        //保存拒绝理由
        $scope.save_item_reason = function() {
        	var noAgreeHelpItem = {};

        	noAgreeHelpItem.id = $scope.helpApproveItems.id;
	    	noAgreeHelpItem.help_state = '3';
	    	noAgreeHelpItem.check_remark = $scope.helpApproveItems.reason;
	    	$http({
    			method: 'post',
    			url: BACKSTAGESERVERADDRESS.ADDRESS +'/customerHelp/updateCustomerHelp',
    			data: noAgreeHelpItem
    		}).success(function(data) {
    			if(data.e.code==0){
                    $.alert_ok('操作成功');
                    $scope.helpApproveTableParams.reload();
                    $scope.closeModal();
                }else{
                    $.alert_error('操作失败');
                }
    		})
        };
    }]);