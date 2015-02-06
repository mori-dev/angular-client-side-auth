(function(exports){

    var config = {

        // roles :[ 'guest_role', 'nomal_role', 'admin_role' ],

        roles :{
          'guest_role': 'guest_role',
          'nomal_role': 'nomal_role',
          'admin_role': 'admin_role'
        },

        accessLevels : {
            'public_level' : "*",
            'guest_level': ['guest_role'],
            'nomal_level' : ['nomal_role', 'admin_role'],
            'admin_level': ['admin_role']
        }

    };

    exports.userRoles = config.roles;
    exports.accessLevels = config.accessLevels;

    // function buildRoles(roles){

    //     var userRoles = {};
     
    //     for(var role in roles){
    //         var intCode = parseInt(bitMask, 2);
    //         userRoles[roles[role]] = {
    //             bitMask: intCode,
    //             title: roles[role]
    //         };
    //         bitMask = (intCode << 1 ).toString(2)
    //     }
     
    //     return userRoles;
    // }

    // exports.accessLevels = buildAccessLevels(config.accessLevels, exports.userRoles);

    /*
    This method builds access level bit masks based on the accessLevelDeclaration parameter which must
    contain an array for each access level containing the allowed user roles.
     */
    // function buildAccessLevels(accessLevelDeclarations, userRoles){

    //     var accessLevels = {};
    //     for(var level in accessLevelDeclarations){

    //         if(accessLevelDeclarations[level] == '*'){

    //             var resultBitMask = '';

    //             for( var role in userRoles){
    //                 resultBitMask += "1"
    //             }
    //             //accessLevels[level] = parseInt(resultBitMask, 2);
    //             accessLevels[level] = {
    //                 bitMask: parseInt(resultBitMask, 2)
    //             };
    //         }
    //         else {

    //             var resultBitMask = 0;
    //             for(var role in accessLevelDeclarations[level]){
    //                 if(userRoles.hasOwnProperty(accessLevelDeclarations[level][role]))
    //                     resultBitMask = resultBitMask | userRoles[accessLevelDeclarations[level][role]].bitMask
    //                 else console.log("Access Control Error: Could not find role '" + accessLevelDeclarations[level][role] + "' in registered roles while building access for '" + level + "'")
    //             }
    //             accessLevels[level] = {
    //                 bitMask: resultBitMask
    //             };
    //         }
    //     }

    //     return accessLevels;
    // }

})(typeof exports === 'undefined' ? this['routingConfig'] = {} : exports);