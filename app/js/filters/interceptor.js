 /**
 * 创建者： 饶道坤
 * 创建时间： 2015/7/3.
 */

sessionID = '';
App.factory('myInterceptor', ['$rootScope','AUTH_EVENTS','$q','$log','$sessionStorage','$localStorage','$location',
    function($rootScope,AUTH_EVENTS,$q,$log,$sessionStorage,$localStorage,$location) {
    $log.debug('$log is here to show you that this is a regular factory with injection');

    var myInterceptor = {
        'request': function(request) {

            if (request.method=="POST"){
                //console.log(request.headers);


                if ($localStorage.user){
                    request.headers["sessionid"] = $localStorage.user.sid;
                }
            }

            return request;
        },

        'requestError': function(rejection) {
            //console.dir('requestError')
            return $q.reject(rejection);
        },


        'response': function(response) {
            //console.log('response')
            //console.log('$localStorage.sdate',$localStorage.user.sdate);

            //如果session过期时间已经小于五分钟，则重新设置session过期时间

            if (typeof($localStorage)!='undefined' && typeof($localStorage.user)!='undefined'&& typeof($localStorage.user.sdate)!='undefined') {
                var sdateStatus = parseInt((new Date().getTime() - $localStorage.user.sdate) / 60000);
                if (sdateStatus <= 100) {
                    $localStorage.user.sdate = new Date().getTime();
                    $rootScope.user = $localStorage.user;

                    //console.log('已经重新计算session过期时间',$localStorage.user.sdate)

                }

            }

            return response;
        },

        'responseError': function(rejection) {
            console.log("responseError",rejection);

            if (rejection.status==408 || rejection.status==0){
                console.log("user session is expired");
                console.log('$localStorage.user',$localStorage.user);
                if(typeof($localStorage.user)!='undefined' && $localStorage.user!=null) {
                    if(typeof($localStorage.user.auth)!='undefined' && $localStorage.user.auth!=null){
                        //console.log('进入')
                        $localStorage.user.auth=AUTH_EVENTS.sessionTimeout;
                        //if ($rootScope.user.auth==authService.sessionTimeout){
                        //  $state.go("e408");
                        //}
                    }

                }
                //超时重新跳转到登陆页面
                $location.path('/page/login');
                console.log('超时了');

            }
            return $q.reject(rejection);

        }
};
return myInterceptor;
}]);


App.config(['$httpProvider', function($httpProvider) {
    delete $httpProvider.defaults.headers.post['X-Requested-With'];
    //$httpProvider.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    //$httpProvider.defaults.headers.post['Access-Control-Allow-Headers'] = '*';
    //$httpProvider.defaults.headers.post['Access-Control-Allow-Methods'] = '*';

    //$httpProvider.defaults.headers.common['raodaokun'] = '8888888888';
    $httpProvider.interceptors.push('myInterceptor');



}]);




