
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
var _ = require('lodash');
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


    app.get('/api/v1/update', function(req, res) {
      var npcAnswer,content,nodeChoices;
      var questionId = req.query.questionId;
      var Link = app.models.Link;
      var Node = app.models.Node;
      // console.log(Link);
       var s = Link.find({where:{'from_node_id':questionId}},function (err,links) {

         npcAnswer  = _.sample(links);
         console.log(npcAnswer);
         Node.find({where:{'id':npcAnswer.to_node_id},include:'links'},function (err,node) {
           console.log(node);
           Link.find({where:{'from_node_id':node.id}},function (err,nodeChoices) {
             content = {
               is_fail:true,
               is_success:true,
               questions:nodeChoices,
               previousAnswer:{text:npcAnswer.id},
               gameStats:{},
               time:50
             };
             res.json(content);
           });

         });



       });




    });


}
