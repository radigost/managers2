
module.exports = function(app) {
    let Customer = app.models.Customer;
    let Role = app.models.Role;
    let RoleMapping = app.models.RoleMapping;
  


Customer.findOrCreate({where:
    {username: 'Nickolay', email: 'nickolay.pol@gmail.com'}}
  , function(err, user, created) {
    if (err) throw err;

    if (created) Customer.replaceById(user.id,{username: 'Nickolay', email: 'nickolay.pol@gmail.com',password:"adminadmin",emailVerified:"true"},(err,model)=>makeRoles(model,created))
    else Customer.create({username: 'Nickolay', email: 'nickolay.pol@gmail.com',password:"adminadmin",emailVerified:"true"},(err,model)=>makeRoles(model,created));
  });

    function makeRoles(user,created){
        console.log(user);
        //create the admin role
        Role.findOrCreate({
        name: 'admin'
        }, function(err, role,roleCreated) {
            if (err) throw err;

            if (roleCreated) console.log('Created role:', role);

            if(created || roleCreated) role.principals.create({
                principalType: RoleMapping.USER,
                principalId: user.id
            }, function(err, principal) {
                    if (err) throw err;
                    console.log('Created principal:', principal);
            });
        
        });

    }



}

