/**
 * Created by 饶道坤 on 2016/1/26.
 */
App.controller('SidebarController', ['$rootScope', '$scope', '$state', '$http', '$timeout', 'Utils','$localStorage','dailyutilsService',
    function($rootScope, $scope, $state, $http, $timeout, Utils,$localStorage,dailyutilsService){

        var collapseList = [];

        //console.log('进来了')
        //设置样式
        $scope.myssColor={marginLeft:'-22px'};



        $scope.headPortrait_one={height:'50px',    marginLeft: '-3px'};
        $scope.headPortrait_two={height:'175px'/*,borderRadius:'62px'*/,border: '6px solid #ffffff'};


        $scope.menu_collapse_one = {marginLeft:'116px'};
        $scope.menu_collapse_two= {marginLeft:'288px'};


        $scope.left_menu_portrait_style={padding:'30px 30px 20px 0px'};
        //$scope.dt = new Date();
        $scope.cliick_date = function(event){
            console.log('dd',new Date(event.timeStamp).Format("yyyy-MM-dd"));
            console.log('event',event);
        }
        // demo: when switch from collapse to hover, close all items
        $rootScope.$watch('app.layout.asideHover', function(oldVal, newVal){
            if ( newVal === false && oldVal === true) {
                closeAllBut(-1);
            }
        });


        $scope.selected_date_time = function(){
            console.log('进来了');
        }

        //主界面左侧日期控件
        $('#form_date_rao').datetimepicker({
            language:  'zh-CN',
            weekStart: 1,
            todayBtn:  1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            minView: 2,
            forceParse: 0,
            click: function (e) {
                console.log('1111');
            },
            setValue:'2013-03-12'
        });



        //当前日期
        $scope.currentDate = new Date().getDate();

        //判断当前日期是几位数，根据日期位数设置样式
        if(/^\d{2}$/.test($scope.currentDate)) {
           //console.log('是2位数字')
            $scope.currentDate_Num = 2;

        } else {
            //console.log('不是2位数字');
            $scope.currentDate_Num = 1;
        }

        $scope.currentDateStyleOne={padding:'7px 0px 0px 10px'};
        $scope.currentDateStyleTwo={padding:'7px 0px 0px 17px'};




        //删除出现的菜单层
        $scope.remove_menu_dom = function(){
            //console.log(1111)
            $('.dropdown-backdrop').remove();
            $('.sidebar-subnav.nav-floating').remove();
            $('.sidebar li.open').removeClass('open');
        }
        // Check item and children active state
        var isActive = function(item) {

            if(!item) return;

            if( !item.sref || item.sref == '#') {
                var foundActive = false;
                angular.forEach(item.submenu, function(value, key) {
                    if(isActive(value)) foundActive = true;
                });
                return foundActive;
            }
            else
                return $state.is(item.sref) || $state.includes(item.sref);
        };

        // Load menu from json file
        // -----------------------------------

        $scope.getMenuItemPropClasses = function(item) {
            return (item.heading ? 'nav-heading' : '') +
                (isActive(item) ? ' active' : '') ;
        };

        $scope.sdfdsf = function(item){

            return(item.pid!=1 && item.icon!='' && typeof(item.icon)!='undefined' ?'menu_sttt':'');
            //{
            //    console.log(item.text);
            //    console.log('改变样式',item);
            //}
        }

        $scope.loadSidebarMenu = function() {

            //var menuJson = 'server/sidebar-menu.json',
            //    menuURL  = menuJson + '?v=' + (new Date().getTime()); // jumps cache
            //$http.get(menuURL)
            //    .success(function(items) {
            //        $scope.menuItems = items;
            //    })
            //    .error(function(data, status, headers, config) {
            //        alert('Failure loading menu');
            //    });
            $http({
                method:'POST',
                url:BACKSTAGESERVERADDRESS.ADDRESS+'/funcTree/getMenuTreeByRoleId',
                data:{role_id:$localStorage.user.role_id,func_type:2,platform:1}
            })
                .success(function(data) {
                    if(data.e.code==0){
                        //console.log('data',data);
                        $scope.menuItems = data.data.sendData;
                        //console.log('菜单原始数据',data.data.sendData);

                        var hkjk = new Array();
                        for(var i=0;i<$scope.menuItems.length;i++){
                            if($scope.menuItems[i].pid==1){
                                hkjk.push({
                                    "id":$scope.menuItems[i].id,
                                    "pid":$scope.menuItems[i].pid,
                                    "text": $scope.menuItems[i].func_title,
                                    "icon": $scope.menuItems[i].func_icon,
                                    "sref": $scope.menuItems[i].func_code,
                                    "alert": "",
                                    "label": "",
                                    "translate": ""
                                });
                            }
                        }


                        for(var i=0;i<hkjk.length;i++){
                            var hj = new Array();
                            for(var j=0;j<$scope.menuItems.length;j++){

                                if($scope.menuItems[j].pid ==hkjk[i].id){
                                    hj.push({"id":$scope.menuItems[j].id,"pid":$scope.menuItems[j].pid,"text": $scope.menuItems[j].func_title,"sref": $scope.menuItems[j].func_code, "translate": "", "icon": $scope.menuItems[j].func_icon, });
                                }
                                if(j+1==$scope.menuItems.length){
                                    if(hj.length>0){

                                        for(var q=0;q<hj.length;q++){
                                            var mq = new Array();
                                            for(var p=0;p<$scope.menuItems.length;p++){
                                                if($scope.menuItems[p].pid ==hj[q].id){
                                                    mq.push({"id":$scope.menuItems[p].id,"pid":$scope.menuItems[p].pid,"text": $scope.menuItems[p].func_title,"sref": $scope.menuItems[p].func_code, "translate": "" });
                                                }
                                                if(p+1==$scope.menuItems.length){
                                                    if(mq.length>0){
                                                        hj[q].submenu = mq;
                                                        delete  hj[q].sref;
                                                        //console.log('hj[q].submenu',hj[q].submenu);
                                                    }
                                                }
                                            }
                                        }
                                        hkjk[i].submenu = hj;
                                        delete  hkjk[i].sref;

                                    }else{
                                        //delete  hkjk[i].submenu;
                                    }

                                }
                            }

                        }

                        $scope.menuItems = hkjk;
                       //console.log('菜单',$scope.menuItems);
                    }else{
                    }
                })
        };

        $scope.loadSidebarMenu();


        //鼠标选中改变背景色
        $scope.MenuActive_style={background:'#223f66'};

        $scope.MenuOut_style={background:'#2669b3'};
        $scope.selectedMenu = function(item){
            $scope.selectedMenuActive = item;
            $scope.selectedMenuItems = item.submenu;
            //console.log('$scope.selectedMenuActive',$scope.selectedMenuActive);

            //$('#menu_'+item.id).addClass('home_over');
        }


        //LOGO栏移入效果
        $scope.onmouseover_fn = function(){
           //console.log('移入');
            $scope.home_move_state = true;
            //console.log('$scope.home_move_state',$scope.home_move_state);
            $('#home_logo').addClass('home_over');

            $("li[name^='menu_']").removeClass('home_over');

            $("#menu_logo").attr('src','app/img/mainMenu/light_logo.png');

            //console.log('$scope.menuItems',$scope.menuItems);

            delete $scope.selectedMenuActive;
        }

        //LOGO栏移出效果
        onmouseout_fn = function(){
            //console.log('移出');
            $scope.home_move_state = false;
            //console.log('$scope.home_move_state',$scope.home_move_state);
            $('#home_logo').removeClass('home_over');

            $("#menu_logo").attr('src','app/img/mainMenu/dark_logo.png');
        }
        $scope.son_menu_click = function(item){
            console.log('item',item);
        }

        // Handle sidebar collapse items
        // -----------------------------------

        $scope.addCollapse = function($index, item) {
            collapseList[$index] = isActive(item);
        };

        $scope.isCollapse = function($index) {
            return (collapseList[$index]);
        };

        $scope.toggleCollapse = function($index, isParentItem) {


            // collapsed sidebar doesn't toggle drodopwn
            if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) return true;

            // make sure the item index exists
            if( angular.isDefined( collapseList[$index] ) ) {
                if ( ! $scope.lastEventFromChild ) {
                    collapseList[$index] = !collapseList[$index];
                    closeAllBut($index);
                }
            }
            else if ( isParentItem ) {
                closeAllBut(-1);
            }

            $scope.lastEventFromChild = isChild($index);

            return true;

        };

        function closeAllBut(index) {
            index += '';
            for(var i in collapseList) {
                if(index < 0 || index.indexOf(i) < 0)
                    collapseList[i] = true;
            }
        }

        function isChild($index) {
            return (typeof $index === 'string') && !($index.indexOf('-') < 0);
        }





    }]);