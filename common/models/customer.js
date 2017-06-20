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
    console.log('> user.afterRemote triggered');

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

    // TODO refactor to normal relations find with working 'include'
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
                  (rolemap)=>rolemap.principalId===customer.id && role.id===rolemap.roleId
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
};
