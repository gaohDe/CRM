/**
 * Created by gaohuan on 2016/4/23.
 */

App.controller('myTaskCtrl', ['$state','$scope','$rootScope','AUTH_EVENTS',"$modal", '$http','$q','dailyutilsService','$stateParams',
    function($state,$scope,$rootScope,AUTH_EVENTS,$modal, $http,$q,dailyutilsService,$stateParams) {
        //$scope.teacher_id=parseInt($stateParams.teacher_id);
        //$scope.login_user = $rootScope.user;
        //if($scope.login_user.role_family==2){
        //    $scope.teacher_id=$scope.login_user.id
        //}
        /**
         * 内容：初始化calendar日历控件
         */
        var runFullCalendar = function() {
            $('#full-calendar').fullCalendar({
                monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
                dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
                today: ["今天"],
                firstDay: 1,
                buttonText: {
                    today: '今天',
                    month: '月',
                    week: '周',
                    day: '日',
                    prev: '<',
                    next: '>'
                },
                buttonIcons: {
                    prev: 'fa fa-chevron-left',
                    next: 'fa fa-chevron-right'
                },
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                view: {
                    name: 'basicWeek',
                    title: '2013年9月'
                },
                /**
                 * 事件：当前视图改变时触发此事件
                 * 内容：当当前视图发生变化时，获取当前改变之后的视图日期，并向后台发送请求，加载数据。
                 * @param start 开始时间
                 * @param end   结束时间
                 * @param timezone
                 * @param callback  回调函数
                 */
                //demoCalendar
                events: function(start,end,timezone,callback){
                    console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',start,end,'kkkkkkkkkkkkkkkkkkkkkkkkk');
                    var s = new Date(start);//当前页面的开始时间
                    var sNew = dailyutilsService.editTime(s, '', '', '', 0,0,0,0).getTime();

                    var e = new Date(end);//当前页面的结束时间
                    var eNew = dailyutilsService.editTime(e, '', '', '', 23,59,59,59).getTime();
                    console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj',sNew,eNew);
                    //$scope.query={time_range_begin: sNew, time_range_end:eNew,user_group_id:$scope.login_user.user_group_id};
                    //if($rootScope.user.user_group_id==0){//成员传tutor_id
                    //    $scope.query.teacher_id = $scope.teacher_id
                    //}

                    //$http({
                    //    url:BACKSTAGESERVERADDRESS.ADDRESS + '/lesson/findLessonByTeacher',
                    //    method:"post",
                    //    data:$scope.query
                    //})
                    //    .success(function(data){
                    //        console.log("teacherLesson=", data);
                    //        var d = data.data.sendData;
                    //        $scope.event = [];//全局集合
                    //        $.each(d,function(i){
                    //            $scope.event.push(
                    //                {
                    //                    //title:  d[i].lesson_title,//标题
                    //                    title:(new Date(d[i].sched_teaching_begin)).Format("hh:mm")+" "+(new Date(d[i].sched_teaching_end)).Format("hh:mm"),
                    //                    start:  (new Date(d[i].sched_teaching_begin)).Format("yyyy-MM-dd"),//开始时间
                    //                    id: d[i].id,
                    //                    lesson_property:   d[i].lesson_property,//类型
                    //                    lesson_state:  d[i].lesson_state,//状态
                    //                    editable:   false,
                    //                    sched_lsn_begin: d[i].sched_lsn_begin,//开放订课开始时间
                    //                    sched_lsn_end: d[i].sched_lsn_end,//开放订课结束时间
                    //                    open_book_begin: d[i].open_book_begin,//排课开始时间
                    //                    open_book_end: d[i].open_book_end,//排课结束时间
                    //                    student_num: d[i].student_num,//学生数量
                    //                    teacher_user_cn_name: d[i].teacher_user_cn_name,//老师名称
                    //                    class_name: d[i].class_name,//班级名称
                    //                    lesson_no: d[i].lesson_no,//课程序号
                    //                    //lesson_mode: d[i].lesson_mode,
                    //                    lsn_comments_id: d[i].lsn_comments_id,//comments
                    //                    //backgroundColor: editColor(d[i].lesson_state),
                    //                    className: editClass(d[i].lesson_state),
                    //                    backgroundColor: '#F8F8F8'
                    //
                    //                });
                    //        });
                    //        callback($scope.event);
                    //    })
                    //    .error(function (data) {
                    //        console.log("http error", data);
                    //
                    //    });
                },
                viewDisplay: function (view) {
                    //TODO  动态加载视图中的数据
                    //var viewStart = $.fullCalendar.formatDate(view.start,"yyyy-MM-dd HH:mm:ss");
                    //var viewEnd = $.fullCalendar.formatDate(view.end,"yyyy-MM-dd HH:mm:ss");
                    //console.log(viewStart)
                    //$("#calendar").fullCalendar('removeEvents');
                    //$.post(BACKSTAGESERVERADDRESS.ADDRESS + '/user/findAllByroleFamily', { start: viewStart, end: viewEnd, writer: Value }, function(data) {
                    //    var resultCollection = jQuery.parseJSON(data);
                    //    $.each(resultCollection, function(index, term) {
                    //        $("#calendar").fullCalendar('renderEvent', term, true);
                    //    });
                    //});
                },
                editable: true,
                eventLimit: true, // allow "more" link when too many events
                droppable: true, // this allows things to be dropped onto the calendar !!!
                drop: function(date, allDay) {// this function is called when something is dropped
                    console.log("-------drop---------");
                    console.log('gggggggggggggggggggggg',date);
                    console.log(allDay)

                },
                selectable: true,
                selectHelper: true,
                /**
                 * 事件：被选中时的函数回调
                 * 内容：
                 * @param start
                 * @param end
                 * @param allDay
                 */
                select: function(start, end, allDay,startDate) {
                    console.log("--------select------------")

                },
                /**
                 * 内容：点击视图中的某一天时触发此方法
                 * @param date  当前的时间
                 * @param allDay
                 * @param jsEvent   javascript
                 * @param view  视图信息
                 */
                dayClick: function(date, allDay, jsEvent, view) {
                //    //console.log((new Date(date)).Format("yyyy-MM-dd"))
                //    //console.log('event',$scope.event)
                //    var allLesson = [];//所有课程
                //    for(var i = 0;i < $scope.event.length;i++){
                //        var startTime = $scope.event[i].start;
                //        //判断
                //        if(startTime == (new Date(date)).Format("yyyy-MM-dd")){
                //            allLesson.push($scope.event[i]);
                //        }
                //    }
                //    //console.log('allLesson.length',allLesson.length)
                //    //console.log('allLesson',allLesson)
                //
                //    //如果当天中有课程，则进入课程页面，否者就不触发任何事件
                //    if(allLesson.length > 0){
                //        //获取的当天所有的课程，并将这些课程全部传入calendarLesson页面
                //        var result = {'allLesson': allLesson,'calView': view};
                //        $state.go("app.org.lsn_mgr.calendarLesson",result);
                //    }
                },
                /**
                 *事件：当一个事件点击时触发
                 * 内容：主要针对于日期框中的具体内容
                 * @param calEvent  一个事件对象持有该事件的信息（日期，标题等）
                 * @param jsEvent   拥有低层次的信息，如点击坐标本地JavaScript事件。
                 * @param view  当前视图对象
                 */
                eventClick: function(calEvent, jsEvent, view) {
                //
                //    var result = {'lessonId': calEvent.id,'source': 0,'calendar':{}};
                //    $state.go("app.org.lsn_mgr.lsn_details",result);
                //
                //    //if(1 == calEvent.lesson_property){//一对一
                //    //    var result = {'lesson': calEvent,'source': 0,'calendar':{}};
                //    //    $state.go("app.org.lsn_mgr.lsn_details_person",result);
                //    //}else if(2 == calEvent.lesson_property){//一对多
                //    //    console.log('一对多')
                //    //    var result = {'lesson': calEvent,'source': 0,'calendar':{}};
                //    //    $state.go("app.org.lsn_mgr.lsn_details_teacher",result);
                //    //    //$.showMessage('一对多');
                //    //}else if(3 == calEvent.lesson_property){
                //    //    var result = {'lesson': calEvent,'source': 0,'calendar':{}};
                //    //    $state.go("app.org.lsn_mgr.lsn_details_public",result);
                //    //}
                //
                }
                //eventMouseover: $scope.alertOnMouseOver
            });
        };

        /**
         * TODO
         * 内容：此方法主要用户当鼠标放置到课程标题上面时，则弹出该课程的相关信息
         * @type {*|jQuery|HTMLElement}
         */
        //$scope.overlay = $('.fc-overlay');
        //$scope.alertOnMouseOver = function( event, jsEvent, view ){
        //    $scope.event = event;
        //    $scope.overlay.removeClass('left right').find('.arrow').removeClass('left right top pull-up');
        //    var wrap = $(jsEvent.target).closest('.fc-event');
        //    var cal = wrap.closest('.calendar');
        //    var right = cal.width() - (wrap.offset().left - cal.offset().left + wrap.width());
        //    var left = wrap.offset().left - cal.offset().left;
        //    //var left = 100;
        //    //var right = 100;
        //    if( right > $scope.overlay.width() ) {
        //        $scope.overlay.addClass('left').find('.arrow').addClass('left pull-up')
        //    }else if ( left > $scope.overlay.width() ) {
        //        $scope.overlay.addClass('right').find('.arrow').addClass('right pull-up');
        //    }else{
        //        $scope.overlay.find('.arrow').addClass('top');
        //    }
        //    (wrap.find('.fc-overlay').length == 0) && wrap.append( $scope.overlay );
        //};

        /**
         * 内容：根据不同状态，变化不同的值（通过设置不同的class属性，给出不同的颜色样式，颜色样式会在calendar.css文件中配置出来）
         * @param lesson_state
         * @returns {*}
         */
        //var editClass = function (lesson_state){
        //    var classNew;
        //    if(1 == lesson_state){//未订课
        //        classNew = ['b-l b-2x b-primary'];
        //    }else if(2 == lesson_state){//待上课
        //        classNew = ['b-l b-2x b-primary'];
        //    }else if(3 == lesson_state){//学生取消
        //        classNew = ['b-l b-2x b-primary'];
        //    }else if(4 == lesson_state){//老师取消
        //        classNew = ['b-l b-2x b-primary'];
        //    }else if(5 == lesson_state){//学生缺席
        //        classNew = ['b-l b-2x b-primary'];
        //    }else if(6 == lesson_state){//老师取消
        //        classNew = ['b-l b-2x b-primary'];
        //    }else if(7 == lesson_state){//待评价
        //        classNew = ['b-l b-2x b-primary'];
        //    }else if(9 == lesson_state){//完成
        //        classNew = ['b-l b-2x b-primary'];
        //    }else if(10 == lesson_state){//学生取消待确认
        //        classNew = ['b-l b-2x b-primary'];
        //    }else if(11 == lesson_state){//老师取消待确认
        //        classNew = ['b-l b-2x b-primary'];
        //    }
        //    return classNew;
        //};

        /**
         * 事件：function
         * 内容：初始化calendar
         */
        runFullCalendar();


    }]);