
// module.exports = function(app) {
//     var router = app.loopback.Router();
//     router.get('api/v1/my', function(req, res) {
//         var content = {
//             'user_id': 1,
//             // 'permissions':request.user.get_all_permissions(),
//             'permissions':['all'],
//             'see_editor':true
//         }
//         res.json(content);
//     });

//       app.use(router);
// }

module.exports = function(app) {
  // Install a "/ping" route that returns "pong"
  app.get('/api/v1/my', function(req, res) {
      var content = {
            'user_id': 1,
            // 'permissions':request.user.get_all_permissions(),
            'permissions':['all'],
            'see_editor':true
        }
        res.json(content);
    // res.send('pong');
  });
}