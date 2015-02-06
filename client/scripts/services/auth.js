'use strict';

angular.module('angular-client-side-auth')
.factory('Auth', function($http, $cookieStore){

    var accessLevels = routingConfig.accessLevels
        , userRoles = routingConfig.userRoles
        , currentUser = $cookieStore.get('user') || { username: '', role: userRoles.guest_role };

    $cookieStore.remove('user');
    function changeUser(user) {
        angular.extend(currentUser, user);
    }

    return {
        authorize: function(accessLevel, role) {
            if(role === undefined) {
                role = currentUser.role;
            }
            if(accessLevel === "*") {
                return true;
            } else {
                return (accessLevel.indexOf(role) !== -1);
            }
        },
        isLoggedIn: function(user) {
            if(user === undefined) {
                user = currentUser;
            }
            return (user.role === userRoles.nomal_role) || (user.role === userRoles.admin_role);
        },
        register: function(user, success, error) {
            $http.post('/api/v1/register', user).success(function(res) {
                changeUser(res);
                success();
            }).error(error);
        },
        login: function(user, success, error) {
            $http.post('/api/v1/login', user).success(function(user){
                changeUser(user);
                success(user);
            }).error(error);
        },
        logout: function(success, error) {
            $http.post('/api/v1/logout').success(function(){
                changeUser({
                    username: '',
                    role: userRoles.guest_role
                });
                success();
            }).error(error);
        },
        accessLevels: accessLevels,
        userRoles: userRoles,
        user: currentUser
    };
});
