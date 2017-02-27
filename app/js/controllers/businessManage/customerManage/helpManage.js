/**
 * 创建者：姜若雪
 * 创建日期：2016。03.31.
 * 描述：组织架构模块
 */
App.controller('searchHelpCtrl', ["$scope", "$http", "ngTableParams", "$q", "$modal",
    function($scope, $http, ngTableParams, $q, $modal) {
    	$scope.helpSearchItems = {};
    	$scope.searchItem = {};//搜索model

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
					"help_user_id": $scope.helpSearchItems.help_user_id,
					"help_state": $scope.helpSearchItems.status_type === 0 ? undefined : $scope.helpSearchItems.status_type,
					"cust_name": $scope.helpSearchItems.cust_name,
					"create_time_begin": $scope.helpSearchItems.start_help_time,
					"create_time_end": $scope.helpSearchItems.end_help_time
				}
        	};

        	console.log($scope.searchQuery)
    		$http({
    			method: 'post',
    			url: BACKSTAGESERVERADDRESS.ADDRESS +'/customerHelp/findCustomerHelp',
    			data: $scope.searchQuery
    		}).success(function(data) {
    			if(data.e.code==0){
                	q1.resolve(data.data);
                	console.log(data.data)
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
	                    console.log($scope.dataList)
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
	    $scope.helpTableParams = new ngTableParams({
	        page: 1,
	        count: pages
	    },{getData:function($defer,params){
	        $scope.loadHelpList($defer, params, pages)
	        }
	    });

	    $scope.helpMyTableParams = new ngTableParams({
	        page: 1,
	        count: pages
	    },{getData:function($defer,params){
	        $scope.loadHelpList($defer, params, pages)
	        }
	    });
	    //求助我的
	    $scope.showAppealList = function() {
	    	$scope.helpSearchItems.help_user_id = '-1';
	    	$scope.helpTableParams.reload();
	    };
	    //我求助的
	    $scope.showHelpList = function() {
	    	$scope.helpSearchItems.help_user_id = '33';
	    	$scope.helpMyTableParams.reload();
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
	        $scope.helpSelectItems = item;
	    };

	    //对求助我的选中任务进行确认帮助
	    $scope.dealHelpItem = function(item) {
	    	var checkHelpItem = {};
	    	checkHelpItem.id = item.id;
	    	checkHelpItem.help_state = '5';

	    	swal({
	                title: '确认帮助么？',
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
	                    $http({
			    			method: 'post',
			    			url: BACKSTAGESERVERADDRESS.ADDRESS +'/customerHelp/updateCustomerHelp',
			    			data: checkHelpItem
			    		}).success(function(data) {
			    			if(data.e.code==0){
			                    $.alert_ok('操作成功');
			                    $scope.helpTableParams.reload();
			                }else{
			                    $.alert_error('操作失败');
			                }
			    		})
	                }
	            })	
	    };

	    //撤销帮助
	    $scope.cancelHelpItem = function(item) {
	    	var checkHelpItem = {};

	    	checkHelpItem.id = item.id;
	    	checkHelpItem.help_state = '4';

	    	swal({
	                title: '确认撤销么？',
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
	                    $http({
			    			method: 'post',
			    			url: BACKSTAGESERVERADDRESS.ADDRESS +'/customerHelp/updateCustomerHelp',
			    			data: checkHelpItem
			    		}).success(function(data) {
			    			if(data.e.code==0){
			                    $.alert_ok('操作成功');
			                    $scope.helpMyTableParams.reload();
			                }else{
			                    $.alert_error('操作失败');
			                }
			    		})
	                }
	            })
	    };
	    //结束任务
	    $scope.finishHelpItem = function(item) {
	    	var checkHelpItem = {};

	    	checkHelpItem.id = item.id;
	    	checkHelpItem.help_state = '6';

	    	console.log(item)

	    	swal({
                title: '确认结束么？',
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
                    $http({
		    			method: 'post',
		    			url: BACKSTAGESERVERADDRESS.ADDRESS +'/customerHelp/updateCustomerHelp',
		    			data: checkHelpItem
		    		}).success(function(data) {
		    			if(data.e.code==0){
		                    $.alert_ok('操作成功');
		                    $scope.helpMyTableParams.reload();
		                }else{
		                    $.alert_error('操作失败');
		                }
		    		})
                }
            })
	    };

	    $scope.showResason = function(item) {
			swal({
	            title: "拒绝理由",
	            text: item.check_remark,
	            type: "warning"
	        });

	    };

	    //搜索
	    $scope.searchHelpMessage = function() {
	    	$scope.helpSearchItems.cust_name = $scope.searchItem.cust_name;
	    	if ($scope.helpSearchItems.help_user_id = '-1') {
	    		$scope.helpTableParams.reload();
	    	} else {
	    		$scope.helpMyTableParams.reload();
	    	}
	    };

	    //点开日历选择日期
	    $scope.startHelpTimeOpen = function ($event) {
	    	console.log('dd')
	        $event.preventDefault();
	        $event.stopPropagation();
	        $scope.endOpened = false;
	        $scope.startOpened = !$scope.startOpened;
	    };

	    $scope.endHelpTimeClose = function ($event) {
	    	$event.preventDefault();
	        $event.stopPropagation();
	        $scope.startOpened = false;
	        $scope.endOpened = !$scope.endOpened;
	    };
    }]);