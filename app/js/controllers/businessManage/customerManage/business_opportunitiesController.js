/**
 * Created by gaohuan on 2016/3/17.
 */

App.controller("business_opportunitiesCtrl",['$scope','$q', '$http', '$state','authService','$localStorage','ngTableParams','$modal','dailyutilsService','ngDialog','$window','$stateParams',
    function($scope,$q, $http, $state,authService,$localStorage,ngTableParams,$modal,dailyutilsService,ngDialog,$window,$stateParams) {

    $scope.opportunityItems={};
    $scope.querys={};
    //根据关键字搜索
    $scope.opportunitySearch=function(){
        //$scope.opportunityQuery.query.business_opportunities_name=$scope.opportunityItems.business_opportunities_name;
        //console.log('$scope.opportunityQuery.query.business_opportunities_name:',$scope.opportunityQuery.query.business_opportunities_name);
        $scope.opportunityTableParams.reload();
    };

    //加载所有商机数据

    $scope.loadOpportunityData=function(_defer,_params,_rows){
        var q1=$q.defer();
        var _page=_params.page()-1;
        $scope.opportunityQuery={"page":_page,"rows":_rows, 'query':{'custId':-1,'business_opportunities_name':$scope.opportunityItems.business_opportunities_name}};
        console.log('$scope.opportunityQuery:',$scope.opportunityQuery);
       $http({
           method:'POST',
           url:BACKSTAGESERVERADDRESS.ADDRESS+'/businessOpportunities/findBusinessOpportunitiesByCustId',
           data:$scope.opportunityQuery
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
                    $scope.opportunities= data.sendData;
                    console.log('$scope.opportunities',$scope.opportunities);
                    $scope.pageCounts=data.count;
                    console.log('$scope.pageCounts',data.count);
                })
            ])
            .then(function(values) {
                _params.total($scope.pageCounts);
                _defer.resolve($scope.opportunities);
            },function (values) {
                console.log("$q all error2");
                console.log("err",values);
            });
    };
    var pages=10;
    $scope.opportunityTableParams=new ngTableParams({
        page:1,
        count:pages
    },{
        getData:function($defer, params){
            $scope.loadOpportunityData($defer,params,pages);
        }
    });

    //鼠标移入移出显示操作按钮
    $scope.mouseover_opportunity=function(item){
        $scope.mouse_id=item.id;
    };
    $scope.mouseout_opportunity=function(item){
        delete $scope.mouse_id;
    };

    //点击选中行

     $scope.selectedOpportunity=function(item){
         $scope.opportunities.id=item.id;
         console.log('$scope.opportunities.id:',$scope.opportunities.id)
     };

}]);

