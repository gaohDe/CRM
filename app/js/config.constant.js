/**
 * Created by 饶道坤 on 2016/1/25.
 */
/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/
App.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    waitAuthenticated: 'wait-authenticated'
});

App.constant('APP_MEDIAQUERY', {
    'desktopXL': 1200,
    'desktop': 992,
    'tablet': 768,
    'mobile': 480
});

App.constant('APP_COLORS', {
        'primary':                '#5d9cec',
        'success':                '#27c24c',
        'info':                   '#23b7e5',
        'warning':                '#ff902b',
        'danger':                 '#f05050',
        'inverse':                '#131e26',
        'green':                  '#37bc9b',
        'pink':                   '#f532e5',
        'purple':                 '#7266ba',
        'dark':                   '#3a3f51',
        'yellow':                 '#fad732',
        'gray-darker':            '#232735',
        'gray-dark':              '#3a3f51',
        'gray':                   '#dde6e9',
        'gray-light':             '#e4eaec',
        'gray-lighter':           '#edf1f2'
    })
    .constant('APP_MEDIAQUERY', {
        'desktopLG':             1200,
        'desktop':                992,
        'tablet':                 768,
        'mobile':                 480
    })
    .constant('APP_REQUIRES', {
        // jQuery based and standalone scripts
        scripts: {
            'whirl':['app/vendor/whirl/dist/whirl.css'],
            'classyloader':['app/vendor/jquery-classyloader/js/jquery.classyloader.min.js'],

            'animo':['app/vendor/animo.js/animo.js'],

            'fastclick':['app/vendor/fastclick/lib/fastclick.js'],

            'modernizr':['app/vendor/modernizr/modernizr.js'],

            'animate':['app/vendor/animate.css/animate.min.css'],

            'icons':['app/vendor/skycons/skycons.js',

                                   'app/vendor/fontawesome/css/font-awesome.min.css',

                                   'app/vendor/simple-line-icons/css/simple-line-icons.css',

                                   'app/vendor/weather-icons/css/weather-icons.min.css'],

            'sparklines':['app/vendor/sparklines/jquery.sparkline.min.js'],

            'wysiwyg':['app/vendor/bootstrap-wysiwyg/bootstrap-wysiwyg.js',

                                   'app/vendor/bootstrap-wysiwyg/external/jquery.hotkeys.js'],

            'slimscroll':['app/vendor/slimScroll/jquery.slimscroll.min.js'],

            'screenfull':['app/vendor/screenfull/dist/screenfull.js'],

            'vector-map':[
                                    'app/vendor/ika.jvectormap/jquery-jvectormap-1.2.2.min.js',
                                    'app/vendor/ika.jvectormap/jquery-jvectormap-1.2.2.css'],
            'vector-map-maps':[
                                   'app/vendor/ika.jvectormap/jquery-jvectormap-world-mill-en.js',
                                   'app/vendor/ika.jvectormap/jquery-jvectormap-us-mill-en.js'
                                ],

            'loadGoogleMapsJS':['app/vendor/gmap/load-google-maps.js'],

            'flot-chart':['app/vendor/Flot/jquery.flot.js'],

            'flot-chart-plugins': [
                                'app/vendor/flot.tooltip/js/jquery.flot.tooltip.min.js',
                                'app/vendor/Flot/jquery.flot.resize.js',
                                'app/vendor/Flot/jquery.flot.pie.js',
                                'app/vendor/Flot/jquery.flot.time.js',
                                'app/vendor/Flot/jquery.flot.categories.js',
                                'app/vendor/flot-spline/js/jquery.flot.spline.min.js'
            ],
            // jquery core and widgets
            'jquery-ui':[
                'app/vendor/jquery-ui/ui/core.js',
                'app/vendor/jquery-ui/ui/widget.js'
            ],

            // loads only jquery required modules and touch support
            'jquery-ui-widgets':  [
                                'app/vendor/jquery-ui/ui/core.js',
                                'app/vendor/jquery-ui/ui/widget.js',
                                'app/vendor/jquery-ui/ui/mouse.js',
                                'app/vendor/jquery-ui/ui/draggable.js',
                                'app/vendor/jquery-ui/ui/droppable.js',
                                'app/vendor/jquery-ui/ui/sortable.js',
                                'app/vendor/jqueryui-touch-punch/jquery.ui.touch-punch.min.js'
            ],

            'moment' :['app/vendor/moment/min/moment-with-locales.min.js'],

            'inputmask':['app/vendor/jquery.inputmask/dist/jquery.inputmask.bundle.min.js'],

            'flatdoc':['app/vendor/flatdoc/flatdoc.js'],

            'codemirror':[
                                'app/vendor/codemirror/lib/codemirror.js',
                                'app/vendor/codemirror/lib/codemirror.css'
            ],
            // modes for common web files
            'codemirror-modes-web':[
                        'app/vendor/codemirror/mode/javascript/javascript.js',
                        'app/vendor/codemirror/mode/xml/xml.js',
                        'app/vendor/codemirror/mode/htmlmixed/htmlmixed.js',
                        'app/vendor/codemirror/mode/css/css.js'
            ],

            'taginput':[
                        'app/vendor/bootstrap-tagsinput/dist/bootstrap-tagsinput.css',
                        'app/vendor/bootstrap-tagsinput/dist/bootstrap-tagsinput.min.js'
            ],

            'filestyle':['app/vendor/bootstrap-filestyle/src/bootstrap-filestyle.js'],

            'parsley':['app/vendor/parsleyjs/dist/parsley.min.js'],

            'fullcalendar': [
                        'app/vendor/fullcalendar/dist/fullcalendar.min.js',
                        'app/vendor/fullcalendar/dist/fullcalendar.css'
            ],
            'gcal':['app/vendor/fullcalendar/dist/gcal.js'],

            'chartjs':['app/vendor/Chart.js/Chart.js'],

            'morris':[
                    'app/vendor/raphael/raphael.js',
                    'app/vendor/morris.js/morris.js',
                    'app/vendor/morris.js/morris.css'
            ],

            'loaders.css': ['app/vendor/loaders.css/loaders.css'],

            'spinkit':['app/vendor/spinkit/css/spinkit.css'],

            'appCtrl':['app/js/controllers/AppController.js'],

            'bootstrap_js':[
                'app/js/plugin/bootstrap/js/bootstrap.js',
                'app/js/plugin/bootstrap/js/bootstrap.min.js'
            ],

            'bootstrap_css':[
                'app/js/plugin/bootstrap/css/bootstrap.css',
                'app/js/plugin/bootstrap/css/bootstrap.min.css',
                'app/js/plugin/bootstrap/css/bootstrap-theme.css',
                'app/js/plugin/bootstrap/css/bootstrap-theme.min.css'
            ],
            'bootstrap_model':[
                //'app/js/plugin/bootstrap_model/bootstrap.min.css',
                'app/js/plugin/bootstrap_model/bootstrap.min.js',
                'app/js/plugin/bootstrap_model/jquery.min.js'
            ],

            //登陆
            'loginCtrl':[
                'app/js/controllers/login/LoginController.js',
                'app/css/login/login.css'
                //'app/js/plugin/bootstrap/css/screen.css'
            ],
            //菜单管理
            'menuManage':['app/js/controllers/systemManage/menuManageCtrl.js',
                        'app/css/sysManagement/menuManage.css'
            ],
            //设置权限
            'RolePermitCtrl':[
                'app/js/controllers/systemManage/RolePermitController.js',
                'app/css/sysManagement/RolePermit.css'
            ],
            //字典管理
            'dictionaryCtrl':[
                'app/js/controllers/systemManage/dictionaryCtrlController.js',
                'app/css/sysManagement/dictionary.css'
            ],
            //模板
            'templateCtrl':[
                'app/js/controllers/template/templateCtrl.js'
            ],
            //组织架构模块
            'organizationCtrl':[
                'app/js/controllers/systemManage/organization/organizationController.js',
                'app/css/sysManagement/organization/organization_manage.css'
            ],
            //组织架构详情
            'organizationDetailCtrl':[
                'app/js/controllers/systemManage/organization/organizationDetailCtrl.js',
                'app/css/sysManagement/organization/organization_manage.css'
            ],
            //业务阶段设置
            'business_stageCtrl':[
                'app/js/controllers/businessManage/businessStageController.js',
                'app/css/businessManage/business_stage.css'
            ],
            //公共资源参数设置
            'pub_resource_paramCtrl':[
                'app/js/controllers/businessManage/pub_resource_paramController.js',
                'app/css/businessManage/pub_resource_param.css'
            ],

            //客户列表
            'customerListCtrl':[
                'app/js/controllers/businessManage/customerManage/my_customer/customerListCtrl.js',
                'app/js/service/customerManage/customerService.js',
                'app/css/businessManage/customer_manage/customer_list.css'
            ],
            //客户详情
            'customerDetalCtrl':[
                'app/js/controllers/businessManage/customerManage/my_customer/customerDetalCtrl.js',
                'app/js/service/customerManage/customerService.js',
                'app/css/businessManage/customer_manage/customer_list.css'
            ],
            //客户成交
            'customerDealCtrl':[
                'app/js/controllers/businessManage/customerManage/customerDealCtrl.js'
            ],
            //客户抢单
            'customerGrabCtrl':[
                'app/js/controllers/businessManage/customerManage/customerGrabCtrl.js'
            ],
            //抢单审核管理
            'customerGrabAuditCtrl':[
                'app/js/controllers/businessManage/customerManage/customerGrabAuditCtrl.js'
            ],
            //求助管理
            'searchHelpCtrl': [
                'app/js/controllers/businessManage/customerManage/helpManage.js',
                'app/css/businessManage/customer_manage/helpManage.css'
            ],
            //求助审批管理
            'searchHelpApproveCtrl': [
                'app/js/controllers/businessManage/customerManage/helpApproveManage.js',
                'app/css/businessManage/customer_manage/helpApproveManage.css'
            ],
            //公共资源
            'customerPublicResourceCtrl':[
                'app/js/controllers/businessManage/customerManage/customerPublicResourceCtrl.js'
            ],
            //商机
            'business_opportunitiesCtrl':[
                'app/js/controllers/businessManage/customerManage/business_opportunitiesController.js',
                'app/css/businessManage/customer_manage/business_opportunities.css'
            ],//联系人
            'contactsCtrl':[
                'app/js/controllers/businessManage/customerManage/contactsController.js',
                'app/css/businessManage/customer_manage/contacts.css'
            ],
            //资料列表
            'materialMgrListCtrl':[
                'app/js/controllers/materialManage/materialManageListController.js',
                'app/css/materialManage/materialManageList.css'
            ],
            //团队任务分配
            'teamMissiontCtrl':[
                'app/js/controllers/missionManage/missionList.js',
                'app/css/missionManage/missionList.css'
            ],
            //我的安排
            'myTaskCtrl':[
                'app/js/controllers/taskManage/myTaskController.js',
                'app/js/controllers/taskManage/moment.min.js',
                'app/css/taskManage/myTask.css'
            ]
            //,'froala_editor':[
            //    "app/vendor/angular-froala/src/froala_editor.min.js",
            //    "app/vendor/angular-froala/src/froala-sanitize.js",
            //    "app/vendor/angular-froala/src/angular-froala.js",
            //    "app/vendor/angular-froala/src/froala_editor.min.css",
            //    "app/vendor/angular-froala/src/froala_style.min.css",
            //    "app/vendor/froala_editor/js/plugins/align.min.js",
            //    "app/vendor/froala_editor/js/plugins/char_counter.min.js",
            //    "app/vendor/froala_editor/js/plugins/code_view.min.js",
            //    "app/vendor/froala_editor/js/plugins/colors.min.js",
            //    "app/vendor/froala_editor/js/plugins/emoticons.min.js",
            //    "app/vendor/froala_editor/js/plugins/entities.min.js",
            //    "app/vendor/froala_editor/js/plugins/file.min.js",
            //    "app/vendor/froala_editor/js/plugins/font_family.min.js",
            //    "app/vendor/froala_editor/js/plugins/font_size.min.js",
            //    "app/vendor/froala_editor/js/plugins/fullscreen.min.js",
            //    "app/vendor/froala_editor/js/plugins/image.min.js",
            //    "app/vendor/froala_editor/js/plugins/image_manager.min.js",
            //    "app/vendor/froala_editor/js/plugins/inline_style.min.js",
            //    "app/vendor/froala_editor/js/plugins/line_breaker.min.js",
            //    "app/vendor/froala_editor/js/plugins/link.min.js",
            //    "app/vendor/froala_editor/js/plugins/lists.min.js",
            //    "app/vendor/froala_editor/js/plugins/paragraph_format.min.js",
            //    "app/vendor/froala_editor/js/plugins/paragraph_style.min.js",
            //    "app/vendor/froala_editor/js/plugins/quote.min.js",
            //    "app/vendor/froala_editor/js/plugins/table.min.js",
            //    "app/vendor/froala_editor/js/plugins/save.min.js",
            //    "app/vendor/froala_editor/js/plugins/url.min.js",
            //    "app/vendor/froala_editor/js/plugins/video.min.js",
            //    "app/vendor/froala_editor/js/languages/zh_cn.js",
            //    "app/vendor/froala_editor/css/plugins/char_counter.css",
            //    "app/vendor/froala_editor/css/plugins/code_view.css",
            //    "app/vendor/froala_editor/css/plugins/colors.css",
            //    "app/vendor/froala_editor/css/plugins/emoticons.css",
            //    "app/vendor/froala_editor/css/plugins/file.css",
            //    "app/vendor/froala_editor/css/plugins/fullscreen.css",
            //    "app/vendor/froala_editor/css/plugins/image.css",
            //    "app/vendor/froala_editor/css/plugins/image_manager.css",
            //    "app/vendor/froala_editor/css/plugins/line_breaker.css",
            //    "app/vendor/froala_editor/css/plugins/table.css",
            //    "app/vendor/froala_editor/css/plugins/video.css",
            //],




        },









        // Angular based script (use the right module name)
        modules: [
                {
                    name: 'toaster',
                    files: [
                        'app/vendor/angularjs-toaster/toaster.js',
                        'app/vendor/angularjs-toaster/toaster.css'
                    ]},
                {
                    name: 'localytics.directives',
                    files: [
                        'app/vendor/chosen_v1.2.0/chosen.jquery.min.js',
                        'app/vendor/chosen_v1.2.0/chosen.min.css',
                        'app/vendor/angular-chosen-localytics/chosen.js'
                    ]},
                {
                    name: 'ngDialog',
                    files: [
                        'app/vendor/ngDialog/js/ngDialog.min.js',
                        'app/vendor/ngDialog/css/ngDialog.min.css',
                        'app/vendor/ngDialog/css/ngDialog-theme-default.min.css'
                    ]},
                {
                    name: 'ngWig',
                    files: ['app/vendor/ngWig/dist/ng-wig.min.js']},
                {
                    name: 'ngTable',
                    files: [
                        'app/vendor/ng-table/dist/ng-table.min.js',
                        'app/vendor/ng-table/dist/ng-table.min.css'
                    ]},
                {
                    name: 'ngTableExport',
                    files: ['app/vendor/ng-table-export/ng-table-export.js']},
                {
                    name: 'angularBootstrapNavTree',
                    files: [
                        'app/vendor/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
                        'app/vendor/angular-bootstrap-nav-tree/dist/abn_tree.css'
                    ]},
                {
                    name: 'htmlSortable',
                    files: [
                        'app/vendor/html.sortable/dist/html.sortable.js',
                        'app/vendor/html.sortable/dist/html.sortable.angular.js'
                    ]},
                {
                    name: 'xeditable',
                    files: [
                        'app/vendor/angular-xeditable/dist/js/xeditable.js',
                        'app/vendor/angular-xeditable/dist/css/xeditable.css'
                    ]},
                {
                    name: 'angularFileUpload',
                    files: ['app/vendor/angular-file-upload/angular-file-upload.js']},
                {
                    name: 'ngImgCrop',
                    files: [
                        'app/vendor/ng-img-crop/compile/unminified/ng-img-crop.js',
                        'app/vendor/ng-img-crop/compile/unminified/ng-img-crop.css'
                    ]},
                {
                    name: 'ui.select',
                    files: [
                        'app/vendor/angular-ui-select/dist/select.js',
                        'app/vendor/angular-ui-select/dist/select.css'
                    ]},
                {
                    name: 'ui.codemirror',
                    files: ['app/vendor/angular-ui-codemirror/ui-codemirror.js']},
                {
                    name: 'angular-carousel',
                    files: [
                        'app/vendor/angular-carousel/dist/angular-carousel.css',
                        'app/vendor/angular-carousel/dist/angular-carousel.js'
                    ]},
                {
                    name: 'ngGrid',
                    files: [
                        'app/vendor/ng-grid/build/ng-grid.min.js',
                        'app/vendor/ng-grid/ng-grid.css'
                    ]},
                {
                    name: 'infinite-scroll',
                    files: ['app/vendor/ngInfiniteScroll/build/ng-infinite-scroll.js']},
                {
                    name: 'ui.bootstrap-slider',
                    files: [
                        'app/vendor/seiyria-bootstrap-slider/dist/bootstrap-slider.min.js',
                        'app/vendor/seiyria-bootstrap-slider/dist/css/bootstrap-slider.min.css',
                        'app/vendor/angular-bootstrap-slider/slider.js'
                    ]},
                {
                    name: 'ui.grid',
                    files: [
                        'app/vendor/angular-ui-grid/ui-grid.min.css',
                        'app/vendor/angular-ui-grid/ui-grid.js'
                    ]},
                {
                    name: 'textAngularSetup',
                    files: ['app/vendor/textAngular/src/textAngularSetup.js']},
                {
                    name: 'textAngular',
                    files: [
                    'app/vendor/textAngular/dist/textAngular-rangy.min.js',
                    'app/vendor/textAngular/src/textAngular.js',
                    'app/vendor/textAngular/src/textAngularSetup.js',
                    'app/vendor/textAngular/src/textAngular.css'], serie: true},
                {
                    name: 'angular-rickshaw',
                    files: [
                        'app/vendor/d3/d3.min.js',
                        'app/vendor/rickshaw/rickshaw.js',
                        'app/vendor/rickshaw/rickshaw.min.css',
                        'app/vendor/angular-rickshaw/rickshaw.js'], serie: true},
                {
                    name: 'angular-chartist',
                    files: [
                        'app/vendor/chartist/dist/chartist.min.css',
                        'app/vendor/chartist/dist/chartist.js',
                        'app/vendor/angular-chartist.js/dist/angular-chartist.js'], serie: true},
                {
                    name: 'ui.map',
                    files: ['app/vendor/angular-ui-map/ui-map.js']},
                {
                    name: 'datatables',
                    files: [
                        'app/vendor/datatables/media/css/jquery.dataTables.css',
                        'app/vendor/datatables/media/js/jquery.dataTables.js',
                        'app/vendor/angular-datatables/dist/angular-datatables.js'], serie: true},
                {
                    name: 'angular-jqcloud',
                    files: [
                        'app/vendor/jqcloud2/dist/jqcloud.css',
                        'app/vendor/jqcloud2/dist/jqcloud.js',
                        'app/vendor/angular-jqcloud/angular-jqcloud.js']},
                {
                    name: 'angularGrid',
                    files: [
                        'app/vendor/ag-grid/dist/angular-grid.css',
                        'app/vendor/ag-grid/dist/angular-grid.js',
                        'app/vendor/ag-grid/dist/theme-dark.css',
                        'app/vendor/ag-grid/dist/theme-fresh.css'
                    ]},
                {
                    name: 'ng-nestable',
                    files: [
                        'app/vendor/ng-nestable/src/angular-nestable.js',
                        'app/vendor/nestable/jquery.nestable.js'
                    ]},
                {
                    name: 'fullcalendar',
                    files: [
                        'app/vendor/fullcalendar/dist/fullcalendar.min.js',
                        //'app/vendor/fullcalendar/dist/gcal.js',
                        'app/vendor/fullcalendar/dist/fullcalendar.css'
                    ]},
                {
                    name: 'akoenig.deckgrid',
                    files: ['app/vendor/angular-deckgrid/angular-deckgrid.js']}
        ]
    })
;