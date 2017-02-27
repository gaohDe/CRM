/**
 * 创建者：姜若雪
 * 创建日期：2016.04.08.
 * 描述：求助审批模块
 */
App.controller('missiontListCtrl', ["$scope", "$http", "ngTableParams", "$q", "$modal",'dailyutilsService','ngDialog','$window','authService',
    function($scope, $http, ngTableParams, $q, $modal,dailyutilsService,ngDialog,$window,authService) {
        $scope.searchItems = {};
        // $scope.type_items = [
        //     {id: 1,label:'本周'},
        //     {id: 2,label:'本月'},
        // ];

        $scope.teamMissionDetail = {};
        //加载所有任务信息
        $scope.loadMissionList = function(_defer,_params,_rows) {
            var dataList = [],
                assignedData;
            var q1=$q.defer();
            var _page=_params.page()-1;

            $scope.searchQuery = {
                "id": '0',
                "page": _page,
                "rows":_rows,
                "query": {
                    tash_name: $scope.searchItems.tash_name
                }
            };
            $http({
                method: 'post',
                url: BACKSTAGESERVERADDRESS.ADDRESS +'/busiGroupTask/findAllBusiGroupTask',
                data: $scope.searchQuery
            }).success(function(data) {
                console.log(data)   
                if(data.e.code==0){
                    q1.resolve(data.data);
     
                } else {
                   q1.reject(data.e);
                }
            }).error(function(data) {
              q1.reject(data.e);
            });

            $q.all([
              q1.promise
                  .then(function(data){
                      _.each(data.sendData, function(value) {
                          var item = {};

                          item.id = value.id;
                          item.task_name = value.task_name;
                          item.start_time = value.task_start_time;
                          item.end_time = value.task_end_time;
                          item.stage_id = value.business_stage_id;
                          item.stage_name = value.stage_name;

                          _.each(value.detailArr, function(numValue) {
                            
                            if (numValue.dict_contact_way_id === 40) {
                                item.tel_num_total = numValue.contact_no;
                            } else if (numValue.dict_contact_way_id === 41) {
                                item.email_num_total = numValue.contact_no;
                            } else {
                                item.face_num_total = numValue.contact_no;
                            }
                          });
                          dataList.push(item);
                      });
                      $scope.dataList = dataList;
                      $scope.pageCounts = data.count;
                  })
              ])
                .then(function(values){
                    _params.total($scope.pageCounts);
                    _defer.resolve($scope.dataList);
                },function(values){
                     console.log('$q all error');
                })
        };

        var pages=5;
        $scope.missionTableParams = new ngTableParams({
            page: 1,
            count: pages
        },{getData:function($defer,params){
              $scope.loadMissionList($defer, params, pages)
            }
        }); 
        //搜索
        $scope.searchTashName = function() {
            $scope.searchItems.tash_name = $scope.searchItem.tash_name;
            $scope.missionTableParams.reload();
        };

        //鼠标覆盖显示操作按钮
        $scope.over_Tr = function(item) {
            $scope.mouseover_id = item.id;
        };

        $scope.out_Tr = function(item) {
            delete $scope.mouseover_id;
        };
        //编辑选中任务
        $scope.editMission = function(item) {
          console.log('edit')
        };

        //点击选中行
        $scope.setItemSelected = function(item){
            $scope.itemSelected = item;

            console.log($scope.itemSelected);
        };
        //新建团队任务
        $scope.addTeamMission = function() {
            //清空弹框数据
            $scope.teamMissionDetail = {};
            $('#addTeamMission').modal({
                    backdrop:'static',//禁用鼠标点击窗口外部，窗口关闭
                    keyboard:false//禁用esc关闭按键
            });
            $scope.setpData();
        };
        //查询所有阶段数据
        $scope.setpData = function() {
            var result = [];
           $http({
                method: 'post',
                url: BACKSTAGESERVERADDRESS.ADDRESS + '/busiBusinessStage/findAllBusiBusinessStage'
            }).success(function(data) {
                if(data.e.code == 0){
                    _.each(data.data.sendData, function(item) {
                        result.push({
                            id: item.id,
                            no_name: item.stage_name,
                            tel: '',
                            email: '',
                            face: ''
                        });
                    });
                    $scope.teamMissionSteps = result;
                }
            })
        };
        $scope.submitted = false;
        //选择时间为本周
        $scope.selectThisWeek = function() {
            $scope.teamMissionDetail.start_time = $scope.showWeekFirstDay();
            $scope.teamMissionDetail.end_time = $scope.showWeekLastDay();
        };
        //选择时间为本月
        $scope.selectThisMonth = function() {
           $scope.teamMissionDetail.start_time = $scope.showMonthFirstDay();
            $scope.teamMissionDetail.end_time = $scope.showMonthLastDay();
        };
        //保存团队任务
        $scope.saveTeamMission = function() {
            var groupTaskDetail = [],
                groupTask = {},
                paramsDate = {};
            $scope.submitted = true;

            groupTask.task_name = $scope.teamMissionDetail.name;
            groupTask.task_start_time = ($scope.teamMissionDetail.start_time.constructor == Number) ?
                $scope.teamMissionDetail.start_time : $scope.teamMissionDetail.start_time.getTime();
            groupTask.task_end_time = ($scope.teamMissionDetail.end_time.constructor == Number) ?
                $scope.teamMissionDetail.end_time : $scope.teamMissionDetail.end_time.getTime();

            for(var i = 0; i < $scope.teamMissionSteps.length; i ++) {
                if ($scope.teamMissionSteps[i].tel || $scope.teamMissionSteps[i].email || $scope.teamMissionSteps[i].face) {
                    groupTaskDetail.push({
                          'business_stage_id': $scope.teamMissionSteps[i].id,
                          'dict_contact_way_id': '40',
                          'contact_no': $scope.teamMissionSteps[i].tel ? $scope.teamMissionSteps[i].tel : '0'
                      },
                      {
                          'business_stage_id': $scope.teamMissionSteps[i].id,
                          'dict_contact_way_id': '41',
                          'contact_no': $scope.teamMissionSteps[i].email ? $scope.teamMissionSteps[i].email : '0'
                      },
                      {
                          'business_stage_id': $scope.teamMissionSteps[i].id,
                          'dict_contact_way_id': '42',
                          'contact_no': $scope.teamMissionSteps[i].face ? $scope.teamMissionSteps[i].face : '0'
                      });
                }
              }
              paramsDate = {
                  groupTask,
                  groupTaskDetail
              };
              console.log(paramsDate)
               $http({
                  method: 'post',
                  url: BACKSTAGESERVERADDRESS.ADDRESS +'/busiGroupTask/updateBusiGroupTask',
                  data: paramsDate
              }).success(function(data) {
                  if(data.e.code==0){
                       $.alert_ok('操作成功');
                       $scope.closeModal();
                       $scope.missionTableParams.reload();
                  } else {
                      $.alert_error('操作失败');
                      console.log('error')
                  }
              })
        };
        //表单验证
        $scope.validateInput = function() {
          // $scope.nameShow = $scope.teamMissionDetail.name ? false : true;

          //   if ($scope.teamMissionDetail.start_time && $scope.teamMissionDetail.end_time) {
          //       $scope.timeShow = false;
          //   } else {
          //     if ($scope.teamMissionDetail.time_type) {
          //         $scope.timeShow = false;
          //     } else {
          //         $scope.timeShow = true;
          //     }
          //   }
        };
        //关闭modal窗口
        $scope.closeModal = function(){
            $('#addTeamMission').modal('hide');
            $('#addPersonalMission').modal('hide');
        };

        $scope.startTimeOpen = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.endOpened = false;
            $scope.startOpened = !$scope.startOpened;
        };

        $scope.endTimeClose = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.startOpened = false;
            $scope.endOpened = !$scope.endOpened;
        };
        //获取本周第一天
        $scope.showWeekFirstDay = function() {
            var Nowdate=new Date();
            var WeekFirstDay=new Date(Nowdate-(Nowdate.getDay()-1)*86400000);
            return WeekFirstDay.getTime();
        };
        //获取本周最后一天
        $scope.showWeekLastDay = function() {
            var Nowdate=new Date();
            var WeekFirstDay=new Date(Nowdate-(Nowdate.getDay()-1)*86400000);
            var WeekLastDay=new Date((WeekFirstDay/1000+6*86400)*1000);
            return WeekLastDay.getTime();
        };
        //获取本月第一天
        $scope.showMonthFirstDay = function() {
          var myDate = new Date();
          var year = myDate.getFullYear();
          var month = myDate.getMonth()+1;
          if (month<10){
              month = "0"+month;
          }
          var MonthFirstDay = year + "/" + month+"/01";
          var date = new Date(MonthFirstDay);
          return date.getTime();
        };
        //获取本月最后一天
        $scope.showMonthLastDay = function() {
            var myDate = new Date();
            var year = myDate.getFullYear();
            var month = myDate.getMonth()+1;
            if (month<10){
                month = "0"+ month;
            }
            myDate = new Date(year,month,0);
            var lastDay = year + "/" + month +"/"+ myDate.getDate();
            var date = new Date(lastDay);
            return date.getTime();
        };




                // $scope.my_dep_tree = {};
        $scope.personalMissionDetail = {};
        //新建个人任务
        $scope.addPersonalMission = function() {
          //清空弹框数据
          $scope.personalMissionDetail = {};
          $scope.personalMissionDetailByTotal = {};
          $('#addPersonalMission').modal({
                  backdrop:'static',//禁用鼠标点击窗口外部，窗口关闭
                  keyboard:false//禁用esc关闭按键
          });
          $scope.search_user_all();
          $scope.searchCus();
          $scope.setpData();
        };
        //显示团队组织架构
        $scope.showTeamTree = function() {
          $('#selectTeam').modal({
                  backdrop:'static',//禁用鼠标点击窗口外部，窗口关闭
                  keyboard:false//禁用esc关闭按键
          });
          $scope.search_department_all();
        };
        //关闭窗口
        $scope.closeSelectTeam = function() {
            $('#selectTeam').modal('hide');
            $scope.personalMissionDetail.department_name = '';
            $scope.personalMissionDetail.department_id = '';
        };
        $scope.saveTeam = function() {
          $('#selectTeam').modal('hide');
          $scope.search_user_all();
        };
        //删除已选团队
        $scope.deleteTeam = function() {
            $scope.personalMissionDetail.department_name = '';
            $scope.personalMissionDetail.department_id = '';
            $scope.search_user_all();
        };
        //查询所有部门
        $scope.search_department_all = function(){
            $http({
                method:'POST',
                url:BACKSTAGESERVERADDRESS.ADDRESS+'/department/findDepartByPid/0'
            })
            .success(function(data) {
                if(data.e.code==0){
                    $scope.department_items = data.data.sendData;
                    $scope.department_items.unshift({'id':0,'pid':-2,'department_name':'公司','seq':1});
                    $scope.department_tree =  $scope.arrayChangeToJson(data.data.sendData,0);
                }
            })
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
        //点击部门展开详情
        $scope.department_tree_selected = function(branch) {
            $scope.departmentSelected = branch;
            $scope.departmentItems = branch;
            $scope.personalMissionDetail.department_name = branch.department_name;
            $scope.personalMissionDetail.department_id = branch.id;
        };
        //查询对应人员
        $scope.search_user_all = function() {
            var result = [],
              searchQuery = {
                "id":0,
                "page":0,
                "rows":0,
                "query":{
                  "departid": $scope.personalMissionDetail.department_id ?
                      $scope.personalMissionDetail.department_id : 0
              }};
           $http({
                method:'POST',
                url:BACKSTAGESERVERADDRESS.ADDRESS+'/user/getAllUser',
                data: searchQuery
            })
            .success(function(data) {
                if(data.e.code==0){
                    _.each(data.data.sendData, function(value) {
                      result.push({
                          'id': value.id,
                          'label': value.user_cn_name
                      });
                    });
                $scope.type_items = result;
                }
            })
        };
        //选择任务方式
        $scope.selectByTotal = function() {
            $scope.isShowTotal = true;
            $scope.isShowCus = false;
            $scope.isTotal = true;
        };
        $scope.selectCusWay = function() {
            $scope.isShowCus = true;
            $scope.isShowTotal = false;
            $scope.isTotal = false;
        };
        //查询客户信息
        $scope.allCusList = [];
        $scope.searchCus = function() {
          var result = [];
            $http({
                method:'POST',
                url:BACKSTAGESERVERADDRESS.ADDRESS+'/customer/findAllCustomer',
                data: {"page":0,"rows":0}
            })
            .success(function(data) {
                if(data.e.code==0){
                  _.each(data.data.sendData, function(value) {
                      result.push({
                        'id': value.id,
                        'name': value.customer_name
                      });
                  });
                  $scope.allCusList = result;
                }
            })
        };
        //添加客户信息
        $scope.selectCus = [];
        $scope.addCus = function() {
            var cus_name;
            cus_name = _.where($scope.allCusList, {'id': $scope.personalMissionDetail.cus_id})[0].name;
            $scope.selectCus.push({
              'cus_id': $scope.personalMissionDetail.cus_id,
              'cus_name': cus_name
            });

          console.log($scope.selectCus)
        };
        //删除客户
        $scope.deleteCuc = function(item) {
          var result = [];
            _.each($scope.selectCus, function(value) {
              if (value.cus_id !== item.cus_id) {
                  result.push(value);
              } 
            });

          $scope.selectCus = result;
        };
        //整理按客户分配数据
        $scope.dealWithCus = function() {
          var result = [];

          _.each($scope.selectCus, function(value) {
              result.push(
                {
                  'department_id': $scope.personalMissionDetail.department_id,
                  'business_stage_id': $scope.personalMissionDetail.step_id,
                  'dict_contact_way_id': '40',
                  'contact_no': value.tel ? value.tel : '0',
                  'assignedTask': {
                    'sell_user_id': $scope.personalMissionDetail.user_id,
                    'customer_id': value.cus_id
                  }
                },
                {
                  'department_id': $scope.personalMissionDetail.department_id,
                  'business_stage_id': $scope.personalMissionDetail.step_id,
                  'dict_contact_way_id': '41',
                  'contact_no': value.email ? value.email : '0',
                  'assignedTask': {
                    'sell_user_id': $scope.personalMissionDetail.user_id,
                    'customer_id': value.cus_id
                  }
                },
                {
                  'department_id': $scope.personalMissionDetail.department_id,
                  'business_stage_id': $scope.personalMissionDetail.step_id,
                  'dict_contact_way_id': '42',
                  'contact_no': value.face ? value.face : '0',
                  'assignedTask': {
                    'sell_user_id': $scope.personalMissionDetail.user_id,
                    'customer_id': value.cus_id
                  }
                }
              );
          });

          return result;
        };
        //整理按总数分配数据
        $scope.dealWithTotal = function() {
            var result = [];

            result.push(
            {
              'department_id': $scope.personalMissionDetail.department_id,
              'business_stage_id': $scope.personalMissionDetail.step_id,
              'dict_contact_way_id': '40',
              'contact_no': $scope.personalMissionDetailByTotal.tel,
              'assignedTask': {
                'sell_user_id': $scope.personalMissionDetail.user_id,
                'customer_id': 0
              }
            },
            {
              'department_id': $scope.personalMissionDetail.department_id,
              'business_stage_id': $scope.personalMissionDetail.step_id,
              'dict_contact_way_id': '41',
              'contact_no': $scope.personalMissionDetailByTotal.email,
              'assignedTask': {
                'sell_user_id': $scope.personalMissionDetail.user_id,
                'customer_id': 0
              }
            },
            {
              'department_id': $scope.personalMissionDetail.department_id,
              'business_stage_id': $scope.personalMissionDetail.step_id,
              'dict_contact_way_id': '42',
              'contact_no': $scope.personalMissionDetailByTotal.face,
              'assignedTask': {
                'sell_user_id': $scope.personalMissionDetail.user_id,
                'customer_id': 0
              }
            }
          );

            return result;
        };
        $scope.savePersonalMission = function() {
          var queryData = {},
              groupTaskDetails = [];

          queryData.task_name = $scope.personalMissionDetail.name;
          queryData.task_start_time = $scope.personalMissionDetail.start_time.getTime();
          queryData.task_end_time = $scope.personalMissionDetail.end_time.getTime();

          groupTaskDetails = $scope.isTotal ? $scope.dealWithTotal() : $scope.dealWithCus();
          queryData.groupTaskDetails = groupTaskDetails;
          $http({
                method:'POST',
                url:BACKSTAGESERVERADDRESS.ADDRESS+'/busiAssignedTask/updatePersonalTask',
                data: queryData
            })
            .success(function(data) {
                if(data.e.code==0){
                   $.alert_ok('操作成功');
                   $scope.closeModal();
                   $scope.missionTableParams.reload();
                } else {

                }
            })
        }
        }]);