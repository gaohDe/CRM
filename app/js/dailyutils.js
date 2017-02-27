/**
 * 创建者： 饶道坤
 * 创建时间： 2015/6/29.
 */

angular.module('dailyutilsService', [])
    .service('dailyutilsService', ['$http', '$rootScope', '$sessionStorage', '$cookieStore', '$document', '$q', '$timeout',
        '$filter',
        function ($http, $rootScope, $sessionStorage, $cookieStore, $document, $q, $timeout, $filter) {

            /**
             * 把FORM表单提交的参数封装成JSON格式传到后台
             * 使用方法:Form = formToJson($("#userForm"))
             */
            this.formToJson = function (formObj) {
                var o = {};
                var a = formObj.serializeArray();

                $.each(a, function () {

                    if (this.value) {
                        if (o[this.name]) {
                            if (!o[this.name].push) {
                                o[this.name] = [o[this.name]];
                            }
                            o[this.name].push(this.value || null);
                        } else {

                            if ($("[name='" + this.name + "']:checkbox", formObj).length) {
                                //console.dir(this.value)
                                o[this.name] = this.value;
                            } else {
                                o[this.name] = this.value || null;
                            }
                        }
                    }
                });
                return JSON.stringify(o);
            };


            /**
             * 上传图片公用接口
             * @Auther:饶道坤
             * @param formdata 传递的图片数据
             */
            this.imageUpload = function (formdata) {
                var deferred = $q.defer();
                $http({
                    method: "POST",
                    transformRequest: angular.identity,
                    url: UPLOADFILEADDRESS.UPLOADADDRESS,
                    data: formdata,
                    headers: {
                        'Content-Type': undefined,
                    },

                }).success(function (result) {
                    deferred.resolve(result);
                    //console.log('成功',result);

                }).error(function (data, status, headers, config) {
                    deferred.reject(data);
                    //console.log('失败',data);
                });
                return deferred.promise;

            }
            /**
             * 上传图片公用接口
             * @Auther:饶道坤
             * @param formdata 传递的图片数据
             */
            this.imgUpload = function (filename, imgdata) {
                var fd = new FormData();
                fd.append("filename", filename);
                fd.append("imgdata", imgdata);
                var deferred = $q.defer();
                $http({
                    method: "POST",
                    transformRequest: angular.identity,
                    url: UPLOADFILEADDRESS.UPLOADADDRESS,
                    data: fd,
                    headers: {
                        'Content-Type': undefined
                    }

                }).success(function (result) {
                    deferred.resolve(result);

                }).error(function (data, status, headers, config) {
                    deferred.reject(data);
                });
                return deferred.promise;

            }

            /**
             *对Date的扩展，将 Date 转化为指定格式的String
             *月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
             *年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
             *例子：
             *(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
             *(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
             * @param fmt
             * @returns {*}
             * @constructor
             */
            Date.prototype.Format = function (fmt) { //author: pc
                var o = {
                    "M+": this.getMonth() + 1, //月份
                    "d+": this.getDate(), //日
                    "h+": this.getHours(), //小时
                    "m+": this.getMinutes(), //分
                    "s+": this.getSeconds(), //秒
                    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                    "S": this.getMilliseconds() //毫秒
                };
                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            }

            /**
             * 内容：更改某个时间段中的值，比如：需要将2015-10-18 10:10:10  转变成 2015-10-18 0:0:0
             * 则需要var s = new Date(时间);
             *      dailyutilsService.editTime(s, s.getYear(), s.getMonth(), s.getDate(), 0,0,0,0)即可
             * @param date  格式化之后的时间
             * @param year  年份 getYear()
             * @param mon   月份 getMonth()
             * @param day   天 getDate()
             * @param hou   小时
             * @param min   分钟
             * @param sec   秒
             * @param mil   毫秒
             * @author pc
             * @returns {*}
             */
            this.editTime = function (date, year, mon, day, hou, min, sec, mil) {
                if ('' != year) {
                    date.setYear(year);
                }
                if ('' != mon) {
                    date.setMonth(mon);
                }
                if ('' != day) {
                    date.setDate(day);
                }
                if ('' != hou) {
                    date.setHours(hou);
                }
                if ('' != min) {
                    date.setMinutes(min);
                }
                if ('' != sec) {
                    date.setSeconds(sec);
                }
                if ('' != mil) {
                    date.setMilliseconds(mil)
                }
                console.log(date);
                return date
            };


            /**
             * 获取文件后缀名
             * @param file_name
             * @returns {Array|{index: number, input: string}}
             */
            this.cut_Suffix = function (file_name) {
                var d = /\.[^\.]+$/.exec(file_name);
                //console.log(d);
                return d;
            };


            /**
             * @param source_data  源菜单数据(集合类型)
             * 说明: 此方法把集合类型转化为树类型
             * @author han
             * @Date 2016/0201
             */
            this.arrayChangeToJson = function (source_data, pid) {

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
                            json.children = this.sub_recursive(source_data, source_data[i].id);
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
                this.sub_recursive = function (source_sub_data, pid) {
                    // 用来返回集合转化为json数据的字段
                    var tree_json = [];
                    for (var i = 0; i < source_sub_data.length; i++) {
                        var json = {};
                        // 判断 判断是否和上级ID 相等
                        if (source_sub_data[i].pid == pid) {
                            json.item = source_sub_data[i];
                            json.children = this.sub_recursive(source_sub_data, source_sub_data[i].id);
                            tree_json.push(json);
                        }
                    }
                    return tree_json;
                };

                // 调用 调用源数据转化为tree的方法
                var json = this.recursive(source_data);
                return json;
            };


            //http链接参考代码
            //$http({
            //    method:'POST',
            //    url:BACKSTAGESERVERADDRESS.ADDRESS+'/coursePackage/updateCourseGoods',
            //    data:$scope.selectItem
            //})
            //    .success(function(data) {
            //        if(data.e.code==0){
            //            $.showMessage('保存成功');
            //            $scope.tableParams.reload();
            //        }else{
            //            $.showError('保存失败');
            //        }
            //    })

        }]);




