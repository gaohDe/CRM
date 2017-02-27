angular.module('auth.service', [])
    .service('authService', ['$rootScope','$sessionStorage','$localStorage','$cookieStore'
        ,'$document', '$q', '$timeout','AUTH_EVENTS','$window',
        function ($rootScope,$sessionStorage,$localStorage,$cookieStore,$document
            , $q, $timeout,AUTH_EVENTS,$window) {

            console.log('session存储数据',$localStorage)


        if ($localStorage.user)    {
            $rootScope.user = $localStorage.user;
        }else{
            $rootScope.user={auth:AUTH_EVENTS.notAuthenticated};
        }

        //console.log('auth.service enter',$localStorage.user,$rootScope.user);

            if ($rootScope.user&&$rootScope.user.auth==AUTH_EVENTS.loginSuccess&&$rootScope.user.sid){

                //msgService.login($rootScope.user.sid);

            }



            this.create = function (sessionId, userId, userRole) {
                this.dump();
            };

            this.addcookie = function(name,token){

                var expireDate = new Date();
                expireDate.setDate(expireDate.getDate() + 30);
                $cookieStore.put('DailyUsername_'+name, name,{'expires': expireDate});
                $cookieStore.put('DailyToken_'+name, token,{'expires': expireDate});
            };

            this.removecookie = function(name){
                $cookieStore.remove('DailyUsername_'+name, null);
                $cookieStore.remove('DailyToken_'+name, null);
            };

            this.addsid=function(users,_sid){

                console.log('users',users);

                console.log("authService addsid",users,_sid);
                if (!users){
                    return;
                }
                $localStorage.user = users;

                $localStorage.user.auth=AUTH_EVENTS.loginSuccess;



                $localStorage.user.sid=_sid;

                if(users.user_icon!=''){
                    $localStorage.user.url =BACKSTAGESERVERADDRESS.FILEADDRESS+users.user_icon;
                }

                $localStorage.user.auth=AUTH_EVENTS.loginSuccess;
                //$rootScope.summary = $localStorage.user;

                $localStorage.user.sdate = new Date().getTime();
                $rootScope.user=$localStorage.user;

                console.log('$localStorage.user>>>>>>>>>>>>>>>>>>>',$localStorage.user);
                console.log('$rootScope',$rootScope);

                if ($rootScope.user.auth==AUTH_EVENTS.loginSuccess&&$rootScope.user.sid){
                    //msgService.login($rootScope.user.sid);
                }


               //var ggh =  parseInt(($localStorage.user.sdate - 1439344686879) / 60000);
            //console.log('$localStorage.user.sdate',ggh);
            //this.dump();
        }

        this.destroy = function () {
            $localStorage.$reset({user: {
                auth:AUTH_EVENTS.notAuthenticated
            }});


            $rootScope.user=$localStorage.user;
            //console.log('auth.service destroy');
            //dump();
            //$window.pomelo.disconnect();

        };

        this.dump = function () {
           //console.log("authservice user=",$sessionStorage.user);
        };

        return this;
    }]);


