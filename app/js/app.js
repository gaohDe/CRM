/*!
 * 
 * Angle - Bootstrap Admin App + AngularJS
 * 
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: http://support.wrapbootstrap.com/knowledge_base/topics/usage-licenses
 * 
 */

if (typeof $ === 'undefined') { throw new Error('This application\'s JavaScript requires jQuery'); }

// APP START
// ----------------------------------- 

var App = angular.module('angle', [
    'ngRoute',
    'ngAnimate',
    'toaster',
    'ngStorage',
    'ngCookies',
    'pascalprecht.translate',
    'ui.bootstrap',
    'ui.router',
    'oc.lazyLoad',
    'cfp.loadingBar',
    'ngSanitize',
    'ngResource',
    'tmh.dynamicLocale',
    'ui.utils',
    'dailyutilsService',
    'auth.service'
  ]);

App.run(["$rootScope", "$state", "$stateParams",  '$window', '$templateCache','$localStorage','toaster',
    function ($rootScope, $state, $stateParams, $window, $templateCache,$localStorage,toaster) {
  // Set reference to access them from any scope
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
  $rootScope.$storage = $window.localStorage;


  //// -----------------------------------
  $rootScope.app = {
    name: 'Angle',
    description: 'Angular Bootstrap Admin Template',
    year: ((new Date()).getFullYear()),
    layout: {
      isFixed: true,
      isCollapsed: false,
      isBoxed: false,
      isRTL: false,
      horizontal: false,
      isFloat: false,
      asideHover: false,
      theme: null,
      login_status:false
    },
    useFullLayout: false,
    hiddenFooter: false,
    viewAnimation: 'ng-fadeInUp'
  };

    $rootScope.body_height = {
        minHeight:$('#crm_body')[0].offsetHeight-140+'px'
        //border:'1px solid #dcdcdc'
        //background:'#e8e8e8'
    };
  //$rootScope.user = {
  //  name:     'John',
  //  job:      'ng-developer',
  //  picture:  'app/img/user/02.jpg'
  //};



    //普通消息提示框
    $.showInfo = function(text){
        toaster.pop('info', '提示', text);
    };

    //正确消息提示框
    $.showMessage = function(text){
        toaster.pop('success', '成功', text);
    };
    //错误消息提示框
    $.showError = function(text){
        toaster.pop('error', '错误', text);
    };

    //警告消息提示框
    $.showWarning = function(text){
        toaster.pop('warning', '警告', text);
    };

    //等待消息提示框
    $.showWait = function(text){
        toaster.pop('wait', '等待', text);
    };








    //弹出确认框
    $.alert_confim = function (title,fn) {
        swal({
                title: title,
                //text: "You will not be able to recover this imaginary file!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确定",
                closeOnConfirm: false,
                cancelButtonText:"取消"
            },
            function(isConfirm){
                console.log(isConfirm);
                if(isConfirm){
                    fn();
                }
            })
    };



//正确提示框
    $.showMessage_ok = function (text){
        $.scojs_message(text, $.scojs_message.TYPE_OK);
    };

//成功弹出提示框
    $.alert_ok = function(text){
        swal("", text, "success");
    };

//失败弹出提示框
    $.alert_error = function(text){
        swal("", text, "error");
    };

//警告弹出提示框
    $.alert_warning = function(text){
        swal({
            title: "",
            text: text,
            type: "warning"
            //confirmButtonColor: "#1fbba6"
        });
    };

//console.log('$localStorage',$localStorage);

}]);






/*******************************内网服务器配置***************************************/
//内网服务器配置
var BACKSTAGESERVERADDRESS = {
    // ADDRESS:'http://localhost/crm/api/v1'//本地后台服务器
    ADDRESS:'http://192.168.2.15:8080/crm/api/v1'//15后台服务器
};

//附件存放路径
var FILEADDRESS = {
    FILEADDRESS:'http://192.168.2.15/uploads/crmfiles/'//文件存放路径
};


//附件上传接口
var UPLOADFILEADDRESS = {
    UPLOADADDRESS:'http://192.168.2.15:3001/addavatar',//上传图片接口
    UPLOADfILE:'http://192.168.2.15:3001/addfile'//上传附件接口
};


