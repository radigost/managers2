/**
 * Created by user on 17.04.17.
 */

// Copyright IBM Corp. 2014,2015. All Rights Reserved.
// Node module: loopback-example-user-management
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

let config = require('../../server/config.json');
let path = require('path');



module.exports = function(customer,Role) {

  // //send verification email after registration
  customer.afterRemote('create', function(context, customerInstanse, next) {
    // console.log('> user.afterRemote triggered');

    var options = {
      type: 'email',
      to: customerInstanse.email,
      from: 'noreply@loopback.com',
      subject: 'Thanks for registering.',
      template: path.resolve(__dirname, '../../server/views/verify.ejs'),
      redirect: '/app/#!/signin',
      user: customer
    };
    // console.log(options);

    customerInstanse.verify(options, function(err, response) {
      if (err) {
        customer.deleteById(customerInstanse.id);
        return next(err);
      }
    
      console.log('> verification email sent:', response);

      // context.res.render('response', {
      //   title: 'Signed up successfully',
      //   content: 'Please check your email and click on the verification link ' +
      //   'before logging in.',
      //   redirectTo: '/',
      //   redirectToLinkText: 'Log in'
      // });
    // });
    next();
  });
  });
  //
  // //send password reset link when requested
  // User.on('resetPasswordRequest', function(info) {
  //   var url = 'http://' + config.host + ':' + config.port + '/reset-password';
  //   var html = 'Click <a href="' + url + '?access_token=' +
  //     info.accessToken.id + '">here</a> to reset your password';
  //
  //   User.app.models.Email.send({
  //     to: info.email,
  //     from: info.email,
  //     subject: 'Password reset',
  //     html: html
  //   }, function(err) {
  //     if (err) return console.log('> error sending password reset email');
  //     console.log('> sending password reset email to:', info.email);
  //   });
  // });

  customer.withRoles = function(cb){
    let app = customer.app;
    let Role = app.models.Role;
    let RoleMapping = app.models.RoleMapping;
    Role.find((err,roles)=>{
      if (err) throw err;
      RoleMapping.find((err,rolemap)=>{
        customer.find({include:'role'},(err,customers)=>{
          customers.forEach((customer)=> {
              customer.roles = roles.map(
                (role)=>rolemap.find(
                  (rolemap)=>{
                    if (rolemap.principalId===customer.id && role.id===rolemap.roleId) return role;
                  }
                ) ? role.name : false  
              );
          });
          cb(null,customers);
        })
      })
    });
  }
  customer.remoteMethod(
    'withRoles', {
      http: {
        path: '/with-roles',
        verb: 'get'
      },
      returns: {
        arg: 'data',
        type: 'array',
        root:'true'
      }
    }
  );




customer.addRole = function(data,cb){

    let app = customer.app;
    let Role = app.models.Role;
    let RoleMapping = app.models.RoleMapping;
    cb(null,"ok");

    // Role.find((err,roles)=>{
    //   if (err) throw err;
    //   RoleMapping.find((err,rolemap)=>{
    //     customer.find({include:'role'},(err,customers)=>{
          
    //       customers.forEach((customer)=> {
    //         console.log(customers);
    //           customer.roles = roles.map(
    //             (role)=>rolemap.find(
    //               (rolemap)=>{
    //                 console.log(rolemap.roleId,role.id,rolemap.principalId,customer.id);
    //                 if (rolemap.principalId===customer.id && role.id===rolemap.roleId) return role;
    //               }
    //             ) ? role.name : false  
    //           );
    //       });

    //       cb(null,"ok");
    //     })
    //   })
      
    // });
  }
  customer.remoteMethod(
    'addRole', {
      http: {
        path: '/add-role',
        verb: 'post'
      },
      accepts: { arg: 'data', type: 'object', http: { source: 'req' } },

      returns: {
        arg: 'data',
        type: 'string',
        root:'true'
      }
    }
  )




customer.getRoles = function(req,cb){
  let tokenId = false;
  if (req.headers && req.headers.authorization) {
      tokenId = req.headers.authorization
  }
  let app = customer.app;
  let Role = app.models.Role;
  let RoleMapping = app.models.RoleMapping;
    
  customer.relations.accessTokens.modelTo.findById(tokenId, function(err, accessToken) {
      if (err) return cb(err);
      if ( ! accessToken) return cb(new Error('could not find accessToken'));

      customer.findById(accessToken.userId, function (err, user) {
        if (err) return cb(err);
        if ( ! user) return cb(new Error('could not find a valid user'));

        RoleMapping.find({where: {principalType: 'USER', principalId: user.id}},(err,rolemap)=>{
          const roleMaps = [];

          rolemap.forEach((map)=>roleMaps.push(new Promise((resolve,reject)=>{
            Role.findById(map.roleId,(err,role)=>{
              if (err) return cb(err);
              resolve(role.name);
            })
          })));

          Promise.all(roleMaps).then((res)=>cb(null,res));
        });
      });
  });
};

customer.remoteMethod(
    'getRoles', {
      http: {
        path: '/roles',
        verb: 'get',
      },
      accepts:[
        {arg: 'req', type: 'object', 'http': {source: 'req'}},
      ],
      returns: {
        arg: 'data',
        type: 'array',
        root:'true'
      }
    }
  );



};
