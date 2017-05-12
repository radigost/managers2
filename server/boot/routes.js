
var _ = require('lodash');
var express = require('express');
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
    var questionId = req.query.questionId || 1; //hardcoded TODO@radigost переделать на выбор начального элемента
    var Link = app.models.Link;
    var Node = app.models.Node;
    // console.log(Link);
     var s = Link.find({where:{'from_node_id':questionId},include:'node_to'},function (err,links) {
        npcAnswer  = _.sample(links);
        // console.log(npcAnswer);
        Link.find({where:{'from_node_id':npcAnswer.to_node_id},include:'node_to'},function (err,nodeChoices) {

            npcAnswer.node_to(function (err,node_to) {
                console.log(node_to);
                content = {
                    type:node_to['type'],
                    questions:nodeChoices,
                    previousAnswer:{text:node_to.text },
                    gameStats:{},
                    time:_.random(10,80)
                };
                res.json(content);
            });

        });



     });
  });


}
