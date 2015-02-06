'use strict';

angular.module('angular-client-side-auth', ['ngCookies', 'ui.router'])

    .config(['$stateProvider',
             '$urlRouterProvider',
             '$locationProvider',
             '$httpProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    var access = routingConfig.accessLevels;

    // Public routes
    $stateProvider
        .state('public', {
            abstract: true,
            template: "<ui-view/>",
            data: { access: access.public_level }
        })
        .state('public.404', {
            url: '/404/',
            templateUrl: '../views/404.html'
        });

    // Guest routes
    $stateProvider
        .state('guest', {
            abstract: true,
            template: "<ui-view/>",
            data: { access: access.guest_level }
        })
        .state('guest.login', {
            url: '/login/',
            templateUrl: '../views/guest/login.html',
            controller: 'LoginCtrl'
        })
        .state('guest.register', {
            url: '/register/',
            templateUrl: '../views/guest/register.html',
            controller: 'RegisterCtrl'
        });

    // Regular user routes
    $stateProvider
        .state('user', {
            abstract: true,
            template: "<ui-view/>",
            data: { access: access.nomal_level }
        })
        .state('user.home', {
            url: '/',
            templateUrl: '../views/user/home.html'
        })
        .state('user.private', {
            abstract: true,
            url: '/private/',
            templateUrl: '../views/user/private/layout.html'
        })
        .state('user.private.home', {
            url: '',
            templateUrl: '../views/user/private/home.html'
        })
        .state('user.private.nested', {
            url: 'nested/',
            templateUrl: '../views/user/private/nested.html'
        })
        .state('user.private.admin', {
            url: 'admin/',
            templateUrl: '../views/user/private/nested_admin.html',
            data: { access: access.admin_level }
        });

    // Admin routes
    $stateProvider
        .state('admin', {
            abstract: true,
            template: "<ui-view/>",
            data: { access: access.admin_level }
        })
        .state('admin.admin', {
            url: '/admin/',
            templateUrl: '../views/admin.html',
            controller: 'AdminCtrl'
        });

    $urlRouterProvider.otherwise('/404');

    // FIX for trailing slashes. Gracefully "borrowed" from https://github.com/angular-ui/ui-router/issues/50
    $urlRouterProvider.rule(function($injector, $location) {
        if($location.protocol() === 'file')
            return;

        var path = $location.path()
        // Note: misnomer. This returns a query object, not a search string
            , search = $location.search()
            , params
            ;

        // check to see if the path already ends in '/'
        if (path[path.length - 1] === '/') {
            return;
        }

        // If there was no search string / query params, return with a `/`
        if (Object.keys(search).length === 0) {
            return path + '/';
        }

        // Otherwise build the search string and return a `/?` prefix
        params = [];
        angular.forEach(search, function(v, k){
            params.push(k + '=' + v);
        });
        return path + '/?' + params.join('&');
    });

    $locationProvider.html5Mode(true);

    $httpProvider.interceptors.push(function($q, $location) {
        return {
            'responseError': function(response) {
                if(response.status === 401 || response.status === 403) {
                    $location.path('/login');
                }
                return $q.reject(response);
            }
        };
    });

}])

.run(['$rootScope', '$state', 'Auth', function ($rootScope, $state, Auth) {

    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {

        if(!('data' in toState) || !('access' in toState.data)){
            $rootScope.error = "Access undefined for this state";
            event.preventDefault();
        }
        else if (!Auth.authorize(toState.data.access)) {
            $rootScope.error = "権限エラー";
            event.preventDefault();

            if(fromState.url === '^') {
                if(Auth.isLoggedIn()) {
                    $state.go('user.home');
                } else {
                    $rootScope.error = null;
                    $state.go('guest.login');
                }
            }
        }
    });

}]);
