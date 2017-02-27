/**
 * Created by gaohuan on 2016/3/15.
 */
App.controller('materialMgrListCtrl', ['$scope', '$q', '$http', 'FileUploader', 'ngTableParams',
        function ($scope, $q, $http, FileUploader, ngTableParams) {


        $scope.departmentItems = {};
        $scope.searchItem = {};//搜索model
        //$scope.departmentSelectedItems = [];
        $scope.selected_department=[];
        $scope.departmentSelectedItems1=[];

        //传的参数
        $scope.fileRegItems = [];
        $scope.materialItems1={};
        $scope.uploadItems=[];
        $scope.materialItems = {
            "fileManager": {
                'is_department':1,
                "dict_file_type_id":"",
                "file_title": "",
                "file_content": ""
            },
            "fileGroup": {
                'department_id': ''
            },
            "fileReg": [
                {
                    "file_type": '1',
                    "save_path": '',
                    "file_size": '',
                    'file_ext':''
                }
            ]
        }
        ;

        //富文本
        //$scope.froalaOptions = {
        //    height: '250px', //高度
        //    language: "zh_cn",
        //    toolbarInline: false,
        //    placeholderText: '请输入富文本',
        //    toolbarButtons: [
        //        //'fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', '|', 'color', 'emoticons', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', '|', 'quote', 'insertHR', 'undo', 'redo', 'clearFormatting', 'html'
        //        'fullscreen', 'bold', 'italic', 'underline', 'strikeThrough',
        //        'subscript', 'superscript', 'fontFamily', 'fontSize', '|', 'color',
        //        //'emoticons', 'inlineStyle', 'paragraphStyle', '|',
        //        'paragraphFormat', 'align', 'formatOL', 'formatUL',
        //        //'outdent', 'indent', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', '|',
        //        'undo', 'redo'
        //        , 'clearFormatting', 'html'
        //    ]
        //};



        // 点击展开日历选择日期
        $scope.endMaterialOpen = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.startOpened = false;
            $scope.endOpened = !$scope.endOpened;
        };
        $scope.startMaterialOpen = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.endOpened = false;
            $scope.startOpened = !$scope.startOpened;
        };


        //鼠标覆盖显示操作按钮
        $scope.over_Material = function (item) {
            $scope.mouseover_id = item.id;
        };
        $scope.out_Material = function (item) {
            //$scope.mouseover_id=0;
            delete $scope.mouseover_id;
        };


        //根据关键字搜索
        $scope.meterialSearch = function () {
            $scope.materialItems.file_title = $scope.searchItem.file_title;
            $scope.materialTableParams.reload();
        };



        //加载字典表资料类别

        $scope.loadDict_file_type_id=function(){
            $http({
                method:'POST',
                url:BACKSTAGESERVERADDRESS.ADDRESS+'/dict/findAllDictByQuery',
                data:{"dict_type":6}
            })
                .success(function(data) {
                    if(data.e.code==0){
                        console.log('data',data);
                        $scope.Dict_file_type_id_items = data.data.sendData;
                        console.log('$scope.Dict_file_type_id_items',$scope.Dict_file_type_id_items);
                    }
                });
        };
        $scope.loadDict_file_type_id();

        //加载所有资料
        $scope.loadMaterialData = function (_defer, _params, _rows) {
            var q1 = $q.defer();
            var _page = _params.page() - 1;
            $scope.materialQuery = {
                'page': _page, 'row': _rows, 'id':0, 'query': {
                    "file_title": $scope.materialItems.file_title,
                    "dict_file_type_id": $scope.materialItems.dict_file_type_id,
                    "create_time_end": $scope.materialItems.create_time_end,
                    'create_time_begin': $scope.materialItems.create_time_begin
                }
            };
            $http({
                method: 'post',
                url: BACKSTAGESERVERADDRESS.ADDRESS + '/fileFileManager/findAllFileFileManager',
                data: $scope.materialQuery
            }).success(function (data) {
                console.log('data', data);
                if (data.e.code == 0) {
                    q1.resolve(data.data);
                } else {
                    q1.reject(data.e)
                }
            }).error(function (data) {
                q1.reject(data.e);
                console.log('http err', data)
            });
            $q.all([
                q1.promise
                    .then(function (data) {
                        $scope.materials = data.sendData;
                        console.log('$scope.materials', $scope.materials);
                        $scope.pageCounts = data.count;
                        console.log('$scope.pageCounts',$scope.pageCounts);
                    })
                ])
                .then(function (values) {
                    _params.total($scope.pageCounts);
                    _defer.resolve($scope.materials);
                }, function (values) {
                    console.log('$q all error');
                    console.log('err', values);
                })

        };
        var pages = 10;
        $scope.materialTableParams = new ngTableParams({
            page: 1,
            count: pages
        }, {
            getData: function ($defer, params) {
                $scope.loadMaterialData($defer, params, pages)
            }
        });


        //点击选中行
        $scope.selectedMaterial = function (item) {
            $scope.materialItems1=item;
            $scope.materials.id = item.id;
            console.log('$scope.opportunities.id:', $scope.materials.id)
        };


        //添加资料
        $scope.addMaterial = function () {
            uploader.queue=[];
            $scope.selected_department=[];
            $scope.materialItems1 = {};
            $('#addMaterial').modal({
                backdrop: 'static',//禁用鼠标点击窗口外部，窗口关闭
                keyboard: false//禁用esc关闭按键
            });
        };


        //删除资料
        $scope.deleteMaterail = function (item) {
            console.log('*******************', item.id);
            swal({
                    title: "确认删除吗？",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确定",
                    closeOnConfirm: true,
                    cancelButtonText:"取消"
                },
                function(isConfirm){
                    if(isConfirm){
                        $http({
                            method: 'POST',
                            url: BACKSTAGESERVERADDRESS.ADDRESS + '/fileFileManager/deletefileFileManager/' + item.id
                        })
                        .success(function (data) {
                            if (data.e.code == 0) {
                                $.alert_ok('删除成功');
                                $scope.materialTableParams.reload();
                            } else {
                                $.alert_error('删除失败');
                            }
                        })
                    }
                }
            );

        };


        //弹出框取消按钮

        $scope.materailEditCancle = function () {
            uploader.queue=[];
            $scope.selected_department=[];
            $('#addMaterial').modal('hide');
        };

        //查看资料详情

        $scope.materialDetail=function(item){
            $scope.materialItems1=item;
            $scope.loadMaterialFile($scope.materialItems1.id);
            $('#materialDetail').modal({
                backdrop: 'static',//禁用鼠标点击窗口外部，窗口关闭
                keyboard: false//禁用esc关闭按键
            });
        };



        //发布资料分享
        $scope.saveMaterial = function () {
            $scope.materialItems.fileReg=$scope.uploadItems;
            console.log('发布时上传的附件：',$scope.materialItems.fileReg);
            $scope.materialItems.fileManager=$scope.materialItems1;
            console.log('分享的资料名、类型、介绍：',$scope.materialItems.fileManager);
            //从departmentSelectedItems取出ID存进departmentSelectedItems1
            for(var k=0;k<$scope.selected_department.length;k++){
                $scope.departmentSelectedItems1.push($scope.selected_department[k].id);
            }
            $scope.materialItems.fileGroup.department_id=$scope.departmentSelectedItems1.join(',');
            console.log('接收者ID：',$scope.materialItems.fileGroup.department_id);
            console.log('$scope.materialItems',$scope.materialItems);
            $scope.uploader.uploadAll();
        };

        //附件上传完成后调接口上传路径等参数

        $scope.doSaveData=function() {
            $http({
                method: 'post',
                url: BACKSTAGESERVERADDRESS.ADDRESS + '/fileFileManager/updatefileFileManager',
                data: $scope.materialItems
            }).success(function (data) {
                if (data.e.code == 0) {
                    $.alert_ok('保存成功');
                    uploader.queue=[];
                    $scope.selected_department=[];
                    $('#addMaterial').modal('hide');
                    $scope.materialTableParams.reload();
                } else {
                    $.showError(data.e.desc);
                    uploader.queue=[];
                    $scope.selected_department=[];
                }
            });
        };



        $scope.metarialRemove=function(item){
            var idx = uploader.queue.indexOf(item);
            uploader.queue.splice(idx,1);
            $scope.uploadItems.splice(idx,1);
        };


        //上传

        var uploader = $scope.uploader = new FileUploader({
            method: 'POST',
            url:UPLOADFILEADDRESS.UPLOADfILE
        });

        // FILTERS
        uploader.filters.push({
            name: 'customFilter',
            fn: function (item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 10;
            }
        });

        // CALLBACKS
        uploader.onSuccessItem = function (fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
            var filename='';
            for(var i=0;i<addedFileItems.length;i++){
                filename = 'crmfiles/file/'+addedFileItems[i].file.name;
                uploader.queue[i].formData.push({'filename':filename,'file':addedFileItems[i].file});
                $scope.uploadItems.push({
                    file_ext:addedFileItems[i].file.type,
                    file_size:addedFileItems[i].file.size,
                    save_path: FILEADDRESS.FILEADDRESS + 'file/' +addedFileItems[i].file.name,
                    file_type:1,
                    formerly_file_name:addedFileItems[i].file.name
                });
            }
            console.log('uploader',uploader);
            console.log('$scope.uploadItems', $scope.uploadItems);
        };
        uploader.onBeforeUploadItem = function (item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function (fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function (progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onErrorItem = function (fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function (fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function (fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function () {
            console.info('onCompleteAll');
            $scope.doSaveData();
        };

        console.info('uploader', uploader);



        //编辑资料
        $scope.editMaterial = function (item) {
            $scope.loadMaterialFile(item.id);
            $scope.materialItems1 = item;
            console.log('$scope.materialItems', $scope.materialItems);
            $('#addMaterial').modal({
                backdrop: 'static',//禁用鼠标点击窗口外部，窗口关闭
                keyboard: false//禁用esc关闭按键
            });
        };



        //根据资料ID查询资料的附件和接收人

        $scope.regArrData=[];
        $scope.groupArrData=[];
        $scope.loadMaterialFile=function(item){
            $http({
                method:'post',
                url:BACKSTAGESERVERADDRESS.ADDRESS +'/fileFileManager/findFileFileManagerById/'+item
            }).success(function(data) {
                if (data.e.code == 0) {
                    console.log('loadMaterialFile--data',data);
                    $scope.regArrData=data.data.sendData.regArr;
                    $scope.groupArrData=data.data.sendData.groupArr;
                    console.log('$scope.groupArrData',$scope.groupArrData);
                    for(var i=0;i<$scope.regArrData.length;i++){
                        uploader.queue.push({
                            formData: {
                                filename:'crmfiles/file/'+$scope.regArrData[i].formerly_file_name,
                                file:{file_size:$scope.regArrData[i].file_size,
                                    file_ext:$scope.regArrData[i].file_ext,
                                    file_type:1,
                                    name:$scope.regArrData[i].formerly_file_name}
                            },
                            file:{
                                type:$scope.regArrData[i].file_ext,
                                size:$scope.regArrData[i].file_size,
                                name:$scope.regArrData[i].formerly_file_name
                            }
                        });
                    }
                    console.log('uploader.queue---------------------',uploader.queue);
                    for(var j=0;j<$scope.groupArrData.length;j++){
                        $scope.selected_department.push({department_name:$scope.groupArrData[j].department_name,id:$scope.groupArrData[j].department_id});
                        //$scope.selected_node.push($scope.groupArrData[j].department_id);
                        console.log('$scope.selected_department',$scope.selected_department);
                    }
                }
            })
        };




        $scope.arrayChangeToJson = function (source_data, pid) {
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





        //查询所有部门
        $scope.search_department_all = function () {
            $http({
                method: 'POST',
                url: BACKSTAGESERVERADDRESS.ADDRESS + '/department/findDepartByPid/0'
            })
                .success(function (data) {
                    if (data.e.code == 0) {
                        $scope.department_items = data.data.sendData;
                        $scope.menu_two = data.data.sendData;
                        $scope.department_items.unshift({'id': 0, 'pid': -2, 'department_name': '公司', 'seq': 1});
                        $scope.department_tree = $scope.arrayChangeToJson(data.data.sendData, 0);
                        console.log(' $scope.department_tree', $scope.department_tree);
                    }
                })
        };
        $scope.search_department_all();



        //点击选中部门存到数组中并显示在左侧
        $scope.department_tree_selected = function (item) {
            console.log('node.item.enabled',item.enabled);
            if(item.enabled==true){
                //勾选子级和父级菜单
                $scope.checked_menu(item);
            }else if(item.enabled==false){
                //取消子级和父级勾选
                $scope.cancel_checked_menu(item);}
        };

        //勾选子级和父级菜单
        $scope.checked_menu = function(items){
            for(var i=0;i<$scope.menu_two.length;i++){
                //点击子级时勾选这个的父级菜单
                if(items.pid==$scope.menu_two[i].id){
                    $scope.menu_two[i].enabled = true;
                } else if(items.id==$scope.menu_two[i].pid){//点击父级时勾选这个的所有子级菜单
                    $scope.menu_two[i].enabled = true;
                }
            }
            $scope.selected_department.push({department_name: items.department_name,id: items.id});
        };


        //取消子级和父级的勾选状态
        $scope.cancel_checked_menu = function(items){
            for(var m=0;m<$scope.menu_two.length;m++){
                //取消父级
                if(items.id==$scope.menu_two[m].pid){
                    $scope.menu_two[m].enabled = false;
                    for(var a=0;a<$scope.selected_department.length;a++){
                        if($scope.selected_department[a].id==items.id){
                            $scope.selected_department.splice(a,1);
                        }
                    }
                    $scope.cancel_checked_menu($scope.menu_two[m]);
                }
                //取消子级
                else if(items.pid==$scope.menu_two[m].id){
                    //for(var p=0;p<$scope.selected_department.length;p++){
                    //    if($scope.selected_department[p].id==items.pid){
                    //        $scope.selected_department.splice(p,1);
                    //    }
                    //    $scope.checked_menu($scope.menu_two[m]);
                    //}



                    for(var b=0;b<$scope.selected_department.length;b++){
                        if($scope.selected_department[b].id==items.id){
                            $scope.selected_department.splice(b,1);
                        }
                    }
                }
            }
        };


    }]);

