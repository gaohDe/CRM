/**
 * 创建者：饶道坤
 * 创建日期：2016/2/2.
 * 描述：参考界面
 */
App.controller('templateCtrl', ['$scope','$q', '$http', '$state','$localStorage','$modal','$timeout',
    function($scope,$q, $http, $state,$localStorage,$modal,$timeout) {


/*********************************************UI-Grid表格控件JS示例（开始）*************************************************/


        //鼠标移入事件
        $scope.template_row_over = function(index,row){
            //console.log('鼠标移入',index,row)
            $scope.template_ui_grid_over_items = row.entity;
            $scope.template_ui_grid_over_index = index;
        }
        //鼠标移出事件
        $scope.template_row_out = function(index,row){
            //console.log('鼠标移出',index,row)
        }


        //点击详情按钮，查询选中的数据
        $scope.template_ui_grid_detal_fn  = function(rowRenderIndex,row){
            $scope.template_ui_grid_detal_items = row.entity;

            console.log('$scope.template_ui_grid_detal_items>>',$scope.template_ui_grid_detal_items);

        }


        //定义鼠标移入和移出的圆点样式
        $scope.over_style = {opacity:'1'};
        $scope.out_style = {opacity:'.65'};

        $scope.template_gridOptions = {
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
        };

        $scope.template_gridOptions.columnDefs = [
            { name: 'id' },
            { name: 'name'},
            { name: 'age', displayName: 'Age (not focusable)', allowCellFocus : false },
            { name: 'address.city' }
        ];

        // $scope.gridOptions.multiSelect = true;

        $http.get('http://ui-grid.info/data/500_complex.json')
            .success(function(data) {
                $scope.template_gridOptions.data = data;
                $timeout(function() {
                    // if($scope.gridApi.selection.selectRow){
                    //     $scope.gridApi.selection.selectRow($scope.gridOptions.data[0]);
                    // }
                });
            });

        // $scope.info = {};
        //
        // $scope.toggleMultiSelect = function() {
        //     $scope.gridApi.selection.setMultiSelect(!$scope.gridApi.grid.options.multiSelect);
        // };
        //
        // $scope.toggleModifierKeysToMultiSelect = function() {
        //     $scope.gridApi.selection.setModifierKeysToMultiSelect(!$scope.gridApi.grid.options.modifierKeysToMultiSelect);
        // };
        //
        // $scope.selectAll = function() {
        //     $scope.gridApi.selection.selectAllRows();
        // };
        //
        // $scope.clearAll = function() {
        //     $scope.gridApi.selection.clearSelectedRows();
        // };
        //
        // $scope.toggleRow1 = function() {
        //     $scope.gridApi.selection.toggleRowSelection($scope.gridOptions.data[0]);
        // };
        //
        // $scope.toggleFullRowSelection = function() {
        //     $scope.gridOptions.enableFullRowSelection = !$scope.gridOptions.enableFullRowSelection;
        //     $scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.OPTIONS);
        // };
        //
        // $scope.setSelectable = function() {
        //     $scope.gridApi.selection.clearSelectedRows();
        //
        //     $scope.gridOptions.isRowSelectable = function(row){
        //         if(row.entity.age > 30){
        //             return false;
        //         } else {
        //             return true;
        //         }
        //     };
        //     $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
        //
        //     $scope.gridOptions.data[0].age = 31;
        //     $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.EDIT);
        // };
        //
        // $scope.gridOptions.onRegisterApi = function(gridApi){
        //     //set gridApi on scope
        //     $scope.gridApi = gridApi;
        //     gridApi.selection.on.rowSelectionChanged($scope,function(row){
        //         var msg = 'row selected ' + row.isSelected;
        //         $log.log(msg);
        //     });
        //
        //     gridApi.selection.on.rowSelectionChangedBatch($scope,function(rows){
        //         var msg = 'rows changed ' + rows.length;
        //         $log.log(msg);
        //     });
        // };






/*********************************************UI-Grid表格控件JS示例（结束）*************************************************/



/*********************************************时间控件JS（开始）*************************************************/


        //开始时间
        $scope.template_time_beginOpen = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.next_visit_time_begin_endOpened = false;
            $scope.next_visit_time_begin_startOpened = !$scope.next_visit_time_begin_startOpened;
            console.log($scope.opened)
        };

        //结束时间
        $scope.template__time_endOpen = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.next_visit_time_begin_startOpened = false;
            $scope.next_visit_time_begin_endOpened = !$scope.next_visit_time_begin_endOpened;
        };



/*********************************************时间控件JS（结束）*************************************************/
    /****面包屑js通用代码*****/
    $scope.showSearchArea = function() {
        $scope.show_edit = !$scope.show_edit;
        if ($scope.show_edit) {
            $('.findMoreIcon').removeClass('fa-angle-double-down');
            $('.findMoreIcon').addClass("fa-angle-double-up");
        } else {
            $('.findMoreIcon').addClass('fa-angle-double-down');
        }
    }

    /********************************弹出窗口所用JS代码（开始）*******************************/

    //打开窗口
    $scope.openModal = function(){
        $('#myModal').modal({
            backdrop:'static',//禁用鼠标点击窗口外部，窗口关闭
            keyboard:false,//禁用esc关闭按键
        });
    }

    //关闭窗口
    $scope.closeModal = function(){
        $('#myModal').modal('hide');
    }

    //保存事件
    $scope.saveModal = function(){
      console.log('进入保存窗口');
        $('#myModal').modal('hide');
    }

    /********************************弹出窗口所用JS代码（结束）*******************************/



/***********************************侧边右上角提示框JS代码（开始）*********************************************/
        //普通提示框
        $scope.Info_prompt = function(){
            $.showInfo('提示信息');
        }
        //成功提示框
        $scope.success_prompt = function(){
            $.showMessage('成功了')
        }

        //失败提示框
        $scope.error_prompt= function(){
            $.showError('失败了');
        }

        //警告提示框
        $scope.warning_prompt = function(){
            $.showWarning('警告');
        }
        //等待提示框
        $scope.showWait = function(){
            $.showWait('等待');
        }


/***********************************侧边右上角提示框JS代码（结束）*********************************************/




/***********************************弹出提示框JS代码（开始）*********************************************/
        //成功提示框
        $scope.success_msg = function(){
            $.alert_ok('保存成功!')
        }

        //失败提示框
        $scope.error_msg = function(){
            $.alert_error('保存失败!');
        }

        //警告提示框
        $scope.warning_msg = function(){
            $.alert_warning('这里是警告');
        }

        //确认提示框

        $scope.is_del = function(){
            $.alert_ok('删除成功!')
        }
        $scope.confirm_msg = function(){
            $.alert_confim('确认删除么？',$scope.is_del);
        }


////////////////////////////////////////////////新提示框样式//////////////////////////////////////////////////////

        $scope.demotwo_isok = function(){
            $.alert({
                title: '',
                content: '删除成功!',
                confirmButton: '确定'
            });
        }

       $scope.demotwo_isconfirm = function(){
           $.confirm({
               icon: 'fa fa fa-warning',
               title: '',
               content: '确认删除么？',
               confirmButton: '确定',
               cancelButton: '取消',
               confirmButtonClass: 'btn btn-default btn-sm',
               cancelButtonClass: 'btn btn-primary btn-sm',
               confirm: function(){
                   $scope.demotwo_isok();
               },
               cancel: function(){
                   // $.alert('Canceled!')
               }
           });
       }




/***********************************弹出提示框JS代码（结束）*********************************************/

        //$scope.crm_images={};
        //$scope.uploadImages=function(){
        //    for(var i=0;i<$scope.uploader.queue.length;i++){
        //        $scope.file_Item=$scope.uploader.queue[i];
        //        $scope.file_name="crmfiles/images/"+$scope.file_Item.file.name;
        //        $scope.uploader.queue[i].formData.push({
        //            filename: $scope.file_name
        //        });
        //        uploader.queue[i].upload();
        //    }
        //    console.log('$scope.file_Item',$scope.file_Item);
        //    $scope.crm_images.path=BACKSTAGESERVERADDRESS.FILEADDRESS+$scope.file_name;
        //
        //    //$http({
        //    //    method:'POST',
        //    //    url:BACKSTAGESERVERADDRESS.ADDRESS+'/appcolophon/addorupdate',
        //    //    data:$scope.crm_images
        //    //}).success(function(data){
        //    //    console.log('---------------------------------------------------------------------data',data);
        //    //})
        //
        //};
        //
        //var uploader = $scope.uploader= new FileUploader({
        //    method: 'POST',
        //    url:UPLOADFILEADDRESS.UPLOADfILE,
        //    data:''
        //});
        //
        //// FILTERS
        //
        //uploader.filters.push({
        //    name: 'customFilter',
        //    fn: function(item /*{File|FileLikeObject}*/, options) {
        //        return this.queue.length ;
        //    }
        //});
        //
        //// CALLBACKS
        //
        //uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        //    console.info('onWhenAddingFileFailed', item, filter, options);
        //};
        //uploader.onAfterAddingFile = function(fileItem) {
        //    console.info('onAfterAddingFile', fileItem);
        //};
        //uploader.onAfterAddingAll = function(addedFileItems) {
        //    console.info('onAfterAddingAll', addedFileItems);
        //};
        //uploader.onBeforeUploadItem = function(item) {
        //    console.info('onBeforeUploadItem', item);
        //};
        //uploader.onProgressItem = function(fileItem, progress) {
        //    console.info('onProgressItem', fileItem, progress);
        //};
        //uploader.onProgressAll = function(progress) {
        //    console.info('onProgressAll', progress);
        //};
        //uploader.onSuccessItem = function(fileItem, response, status, headers) {
        //    console.info('onSuccessItem', fileItem, response, status, headers);
        //};
        //uploader.onErrorItem = function(fileItem, response, status, headers) {
        //    console.info('onErrorItem', fileItem, response, status, headers);
        //};
        //uploader.onCancelItem = function(fileItem, response, status, headers) {
        //    console.info('onCancelItem', fileItem, response, status, headers);
        //};
        //uploader.onCompleteItem = function(fileItem, response, status, headers) {
        //    console.info('onCompleteItem', fileItem, response, status, headers);
        //};
        //uploader.onCompleteAll = function() {
        //    console.info('onCompleteAll');
        //};
        //
        //console.info('uploader', uploader);



        /**
         * 客户地址选择框
         */
            //载入外部json文件
        $scope.selectProvince = '';
        $scope.selectCity = '';
        $scope.loadAreaJson=function(){
            $http({
                url:'app/json/area.json'
            }).success(function(data){
                $scope.province=data;
                console.log('---------省市json------------',$scope.province);
            });
        };
        $scope.loadAreaJson();



    }]);


App.filter('ui_grid_sex_filter', function() {
    var genderHash = {
        0: '男',
        1: '女',
    };

    return function(input) {
        if (!input){
            return '';
        } else {
            return genderHash[input];
        }
    };
});