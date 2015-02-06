var _ =           require('underscore')
    , path =      require('path')
    , passport =  require('passport')
    , AuthCtrl =  require('./controllers/auth')
    , UserCtrl =  require('./controllers/user')
    , User =      require('./models/User.js')
    , userRoles = require('../client/scripts/routingConfig').userRoles
    , accessLevels = require('../client/scripts/routingConfig').accessLevels;

var routes = [

    // Views
    {
        path: '/partials/*',
        httpMethod: 'GET',
        middleware: [function (req, res) {
            var requestedView = path.join('./', req.url);
            res.render(requestedView);
        }]
    },

    // Auth
    {
        path: '/api/v1/register',
        httpMethod: 'POST',
        middleware: [AuthCtrl.register]
    },
    {
        path: '/api/v1/login',
        httpMethod: 'POST',
        middleware: [AuthCtrl.login]
    },
    {
        path: '/api/v1/logout',
        httpMethod: 'POST',
        middleware: [AuthCtrl.logout]
    },

    // User resource
    {
        path: '/api/v1/users',
        httpMethod: 'GET',
        middleware: [UserCtrl.index],
        accessLevel: accessLevels.admin_level
    },

    // All other get requests should be handled by AngularJS's client-side routing system
    {
        path: '/*',
        httpMethod: 'GET',
        middleware: [function(req, res) {
            var role = userRoles.guest_role
              , username = '';
            if(req.user) {
                role = req.user.role;
                username = req.user.username;
            }
            res.cookie('user', JSON.stringify({
                'username': username,
                'role': role
            }));
            res.render('index');
        }]
    }
];

module.exports = function(app) {

    _.each(routes, function(route) {
        route.middleware.unshift(ensureAuthorized);
        var args = _.flatten([route.path, route.middleware]);

        switch(route.httpMethod.toUpperCase()) {
            case 'GET':
                app.get.apply(app, args);
                break;
            case 'POST':
                app.post.apply(app, args);
                break;
            case 'PUT':
                app.put.apply(app, args);
                break;
            case 'DELETE':
                app.delete.apply(app, args);
                break;
            default:
                throw new Error('Invalid HTTP method specified for route ' + route.path);
                break;
        }
    });
}

function ensureAuthorized(req, res, next) {
    var role;
    if(!req.user) {
        role = userRoles.guest_role;
    } else {
        role = req.user.role;
    }

    var accessLevel = _.findWhere(routes, { path: req.route.path, httpMethod: req.route.stack[0].method.toUpperCase() }).accessLevel || accessLevels.public_level;

    if(!(accessLevel === "*") && !(accessLevel.indexOf(role) !== -1)) {
        return res.send(403);
    }
    return next();
}
