/**
 * 创建者：饶道坤
 * 创建日期：2016/01/26
 * 描述：登陆
 */
App.controller('LoginController', ['$scope', '$http', '$state','authService','$localStorage','$rootScope', function($scope, $http, $state,authService,$localStorage,$rootScope) {

    // bind here all data from the form
    $scope.account = {};
    // place the message if something goes wrong
    $scope.authMsg = '';


    //载入登陆状态
    $rootScope.app.layout.login_status = true;

    //$('.wrapper').addClass('main_back');
    $scope.login = function() {
        $scope.authMsg = '';

        if($scope.loginForm.$valid) {

            //$http
            //    .post('api/account/login', {email: $scope.account.email, password: $scope.account.password})
            //    .then(function(response) {
            //        // assumes if ok, response is an object with some data, if not, a string with error
            //        // customize according to your api
            //        if ( !response.account ) {
            //            $scope.authMsg = 'Incorrect credentials.';
            //        }else{
            //            $state.go('app.dashboard');
            //        }
            //    }, function(x) {
            //        $scope.authMsg = 'Server Request Error';
            //    });

            console.log($scope.account.email,$scope.account.password);
            $http({
                method:'POST',
                url:BACKSTAGESERVERADDRESS.ADDRESS+'/login/doLogin/',
                data:{'loginName':$scope.account.email,'passWord':$scope.account.password}
            })
                .success(function(data) {
                    if(data.e.code==0){
                        $scope.login_status = true;

                        //登录成功后跳转到首页
                        authService.create();
                        if(typeof(data.data.sendData.sid)!='undefined' && data.data.sendData.sid!=null){
                            authService.addsid(data.data.sendData.sendData,data.data.sendData.sid);
                        }
                        $state.go('app.org.desktop');
                        //取消登陆状态
                        $rootScope.app.layout.login_status = false;
                       console.log('data',data);
                    }else{
                        $scope.login_status = false;
                        console.log('data',data);
                    }
                })
        }
        else {
            // set as dirty if the user click directly to login so we show the validation messages
            $scope.loginForm.account_email.$dirty = true;
            $scope.loginForm.account_password.$dirty = true;
        }
    };

}]);