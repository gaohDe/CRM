/**
 * Created by 锟侥碉拷锟斤拷 on 2016/1/25.
 */
App.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider',
    function ($stateProvider, $locationProvider, $urlRouterProvider, helper) {
        'use strict';

        // Set the following to true to enable the HTML5 Mode
        // You may have to set <base> tag in index and a routing configuration in your server
        $locationProvider.html5Mode(false);

        // defaults to dashboard
        $urlRouterProvider.otherwise('/app/org/desktop');

        //
        // Application Routes
        // -----------------------------------
        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: helper.basepath('partials/app.html'),
                resolve: helper.resolveFor('appCtrl','fastclick', 'modernizr', 'icons', 'screenfull', 'animo', 'sparklines', 'slimscroll', 'classyloader', 'toaster', 'whirl')
            }).state('app.org', {
                url: '/org',
                template: '<div ui-view class="fade-in-up" style="height:100%;"></div>',
                title: 'org',
                ncyBreadcrumb: {
                    label: 'Org'
                }

            }).state('app.org.desktop', {
                url: '/desktop',
                title: 'Dashboard',
                templateUrl: helper.basepath('dashboard.html'),
                resolve: helper.resolveFor('flot-chart','flot-chart-plugins')

            }).state('app.org.sys_mgr', {
                url: '/sys_mgr',
                template: '<div ui-view class="fade-in-up"  style="height:100%;"></div>',
                title: 'sys_mgr',
                ncyBreadcrumb: {
                    label: 'sys_mgr'
                }
            }).state('app.org.sys_mgr.template', {//参考模版界面
                url: '/template',
                title: "template",
                templateUrl: helper.basepath('template/template.html'),
                resolve: helper.resolveFor('templateCtrl','ngTable','ui.grid')

            }).state('app.org.sys_mgr.framework', {//组织架构
                url: '/framework',
                title: "framework",
                templateUrl: helper.basepath('systemManage/organization/organization_manage.html'),
                resolve: helper.resolveFor('organizationCtrl','ngTable','angularBootstrapNavTree','ui.select','ngDialog')

            }).state('app.org.sys_mgr.organization_detail', {//组织架构详情页
                url: '/organization_detail/?user_id&operateState',
                title: "organization_detail",
                templateUrl: helper.basepath('systemManage/organization/organization_detail.html'),
                resolve: helper.resolveFor('organizationDetailCtrl','ui.select')

            }).state('app.org.sys_mgr.menu', {//菜单管理
                url: '/menu',
                title: "menu",
                templateUrl: helper.basepath('systemManage/menuManage.html'),
                resolve: helper.resolveFor('menuManage','ui.select','angularBootstrapNavTree')

            }).state('app.org.sys_mgr.roles_and_auth', {//设置权限
                url: '/roles_and_auth',
                title: "setRole",
                templateUrl: helper.basepath('systemManage/RolePermit.html'),
                resolve: helper.resolveFor('RolePermitCtrl','ui.select','angularBootstrapNavTree')

            }).state('app.org.sys_mgr.dictionary', {//字典表
                url: '/dictionary',
                title: "dictionary",
                templateUrl: helper.basepath('systemManage/dictionary.html'),
                resolve: helper.resolveFor('dictionaryCtrl','angularBootstrapNavTree','ui.select','ngDialog')

            }).state('app.org.busi', {//业务管理
                url: '/busi',
                template: '<div ui-view class="fade-in-up"  style="height:100%;"></div>',
                title: 'busi',
                ncyBreadcrumb: {
                    label: 'busi'
                }
            }).state('app.org.sys_mgr.busi_business_stage', {//业务阶段设置
                url: '/busi_business_stage',
                title: "busi_business_stage",
                templateUrl: helper.basepath('businessManage/business_stage/business_stage.html'),
                resolve: helper.resolveFor('business_stageCtrl')

            }).state('app.org.sys_mgr.busi_pub_resource_param', {//公共资源参数设置
                url: '/busi_pub_resource_param',
                title: "busi_pub_resource_param",
                templateUrl: helper.basepath('businessManage/pub_resource_param.html'),
                resolve: helper.resolveFor('pub_resource_paramCtrl','ui.select')

            }).state('app.org.busi.customer', {//客户管理
                url: '/customer',
                template: '<div ui-view class="fade-in-up" ng-style="customer_model_height" style="/*border: 1px solid red*/"></div>',
                title: 'customer',
                ncyBreadcrumb: {
                    label: 'customer'
                }
            }).state('app.org.busi.customer.cust_list', {//客户列表
                url: '/cust_list',
                title: "cust_list",
                templateUrl: helper.basepath('businessManage/customerManage/my_customer/customer_List.html'),
                resolve: helper.resolveFor('customerListCtrl','ui.grid','ui.select','ngTable')

            }).state('app.org.busi.customer.customer_detal', {//客户详情
                url: '/customer_detal?customer_id&customer_state',
                title: "customer_detal",
                templateUrl: helper.basepath('businessManage/customerManage/my_customer/customer_detal.html'),
                resolve: helper.resolveFor('customerDetalCtrl','ui.grid','ui.select','ngTable')

            }).state('app.org.busi.customer.cust_deal', {//成交客户
                url: '/cust_deal',
                title: "cust_deal",
                params:{
                    'obj':null
                },
                templateUrl: helper.basepath('businessManage/customerManage/customer_Deal.html'),
                resolve: helper.resolveFor('customerDealCtrl')

            }).state('app.org.busi.customer.grab', {//抢单客户
                url: '/grab',
                title: "grab",
                templateUrl: helper.basepath('businessManage/customerManage/customerGrab.html'),
                resolve: helper.resolveFor('customerGrabCtrl')

            }).state('app.org.busi.customer.grab_audit', {//抢单审核管理
                url: '/grab_audit',
                title: "grab_audit",
                templateUrl: helper.basepath('businessManage/customerManage/customerGrabAudit.html'),
                resolve: helper.resolveFor('customerGrabAuditCtrl')

            }).state('app.org.busi.customer.help', {//求助管理
                url: '/help',
                title: "help",
                templateUrl: helper.basepath('businessManage/customerManage/help_manage.html'),
                resolve: helper.resolveFor('searchHelpCtrl', 'ngTable', 'ui.grid', 'ui.select')
            }).state('app.org.busi.customer.check_help', {//求助审批管理
                url: '/check_help',
                title: 'check_help',
                templateUrl: helper.basepath('businessManage/customerManage/help_approve_manage.html'),
                resolve: helper.resolveFor('searchHelpApproveCtrl', 'ngTable', 'ui.grid', 'ui.select')
            }).state('app.org.busi.customer.public_resource', {//公共资源
                url: '/public_resource',
                title: "public_resource",
                templateUrl: helper.basepath('businessManage/customerManage/customerPublicResource.html'),
                resolve: helper.resolveFor('customerPublicResourceCtrl')

            }).state('app.org.busi.customer.opportunity', {//商机
                url: '/opportunity',
                title: "opportunity",
                templateUrl: helper.basepath('businessManage/customerManage/business_opportunities.html'),
                resolve: helper.resolveFor('business_opportunitiesCtrl','ngTable','ui.select','ngDialog')

            }).state('app.org.busi.customer.contacts', {//联系人
            url: '/contacts',
            title: "contacts",
            templateUrl: helper.basepath('businessManage/customerManage/contacts.html'),
            resolve: helper.resolveFor('contactsCtrl','ngTable','ui.select','ngDialog')

            }).state('app.material_mgr', {//资料管理
                url: '/material_mgr',
                template: '<div ui-view class="fade-in-up"  style="height:100%;"></div>',
                title: 'material_mgr',
                ncyBreadcrumb: {
                    label: 'material_mgr'
                }
            }).state('app.material_mgr.list', {//资料列表
                url: '/material_mgr.list',
                title: "material_mgr.list",
                templateUrl: helper.basepath('materialManage/materialManageList.html'),
                resolve: helper.resolveFor('materialMgrListCtrl','angularFileUpload','ngTable','angularBootstrapNavTree','ui.select')
            }).state('app.org.task', {//任务管理
                url: '/task',
                template: '<div ui-view class="fade-in-up"  style="height:100%;"></div>',
                title: 'task',
                ncyBreadcrumb: {
                    label: 'task'
                }
            }).state('app.org.task.pre', {//我的安排
                url: '/pre',
                title: "pre",
                templateUrl: helper.basepath('taskManage/myTask.html'),
                resolve: helper.resolveFor('myTaskCtrl','fullcalendar')
            }).state('app.org.task.team', {//团队任务分配
                url: '/team',
                title: "team",
                templateUrl: helper.basepath('missionManage/missionList.html'),
                resolve: helper.resolveFor('teamMissiontCtrl','ngTable','ui.select', 'angularBootstrapNavTree', 'ngDialog')
            })

            //
            // Single Page Routes
            // -----------------------------------
            .state('page', {
                url: '/page',
                //templateUrl: 'app/views/pages/page.html',
                //resolve: helper.resolveFor('modernizr', 'icons'),
                //controller: ["$rootScope", function($rootScope) {
                //    $rootScope.app.layout.isBoxed = false;
                //}]
                template: '<div ui-view class="fade-in-up"  style="height:100%;"></div>',
                title: 'page',
                ncyBreadcrumb: {
                    label: 'page'
                }
            })
            .state('page.login', {
                url: '/login',
                title: "Login",
                templateUrl: 'app/views/pages/login.html',
                resolve: helper.resolveFor('loginCtrl')
            })
            .state('page.register', {
                url: '/register',
                title: "Register",
                templateUrl: 'app/views/pages/register.html'
            })
            .state('page.recover', {
                url: '/recover',
                title: "Recover",
                templateUrl: 'app/views/pages/recover.html'
            })
            .state('page.lock', {
                url: '/lock',
                title: "Lock",
                templateUrl: 'app/views/pages/lock.html'
            })
            .state('page.404', {
                url: '/404',
                title: "Not Found",
                templateUrl: 'app/views/pages/404.html'
            })
            //
            // Horizontal layout
            // -----------------------------------
            .state('app-h', {
                url: '/app-h',
                abstract: true,
                templateUrl: helper.basepath( 'partials/app-h.html' ),
                controller: 'AppController',
                resolve: helper.resolveFor('fastclick', 'modernizr', 'icons', 'screenfull', 'animo', 'sparklines', 'slimscroll', 'classyloader', 'toaster', 'whirl')
            })
            .state('app-h.dashboard_v2', {
                url: '/dashboard_v2',
                title: 'Dashboard v2',
                templateUrl: helper.basepath('dashboard_v2.html'),
                controller: ["$rootScope", "$scope", function($rootScope, $scope) {
                    $rootScope.app.layout.horizontal = true;
                    $scope.$on('$destroy', function(){
                        $rootScope.app.layout.horizontal = false;
                    });
                }],
                resolve: helper.resolveFor('flot-chart','flot-chart-plugins')
            })
            //
            // CUSTOM RESOLVES
            //   Add your own resolves properties
            //   following this object extend
            //   method
            // -----------------------------------
            // .state('app.someroute', {
            //   url: '/some_url',
            //   templateUrl: 'path_to_template.html',
            //   controller: 'someController',
            //   resolve: angular.extend(
            //     helper.resolveFor(), {
            //     // YOUR RESOLVES GO HERE
            //     }
            //   )
            // })
        ;


    }]).config(['$ocLazyLoadProvider', 'APP_REQUIRES', function ($ocLazyLoadProvider, APP_REQUIRES) {
    'use strict';

    // Lazy Load modules configuration
    $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: APP_REQUIRES.modules
    });

}]).config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ( $controllerProvider, $compileProvider, $filterProvider, $provide) {
        'use strict';
        // registering components after bootstrap
        App.controller = $controllerProvider.register;
        App.directive  = $compileProvider.directive;
        App.filter     = $filterProvider.register;
        App.factory    = $provide.factory;
        App.service    = $provide.service;
        App.constant   = $provide.constant;
        App.value      = $provide.value;

    }]).config(['$translateProvider', function ($translateProvider) {

    $translateProvider.useStaticFilesLoader({
        prefix : 'app/i18n/',
        suffix : '.json'
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.useLocalStorage();
    $translateProvider.usePostCompiling(true);

}]).config(['tmhDynamicLocaleProvider', function (tmhDynamicLocaleProvider) {

    tmhDynamicLocaleProvider.localeLocationPattern('vendor/angular-i18n/angular-locale_{{locale}}.js');

    // tmhDynamicLocaleProvider.useStorage('$cookieStore');

}]).config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {

    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.latencyThreshold = 500;
    cfpLoadingBarProvider.parentSelector = '.wrapper > section';

}]).config(['$tooltipProvider', function ($tooltipProvider) {

    $tooltipProvider.options({appendToBody: true});

}])
;