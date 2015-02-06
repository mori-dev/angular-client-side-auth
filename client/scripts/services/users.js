'use strict';

angular.module('angular-client-side-auth')
.factory('Users', function($http) {
    return {
        getAll: function(success, error) {
            $http.get('/api/v1/users').success(success).error(error);
        }
    };
});
