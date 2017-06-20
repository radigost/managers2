
var _ = require('lodash');
var express = require('express');
module.exports = function(app) {
  app.get('/api/v1/my', function(req, res) {
      var content = {
            'user_id': 1,
            // 'permissions':request.user.get_all_permissions(),
            'permissions':['all'],
            'see_editor':true
        }
        res.json(content);
  });



    app.get('/api/v1/update', function(req, res) {
        
        let Link = app.models.Link;
        let Node = app.models.Node;

        var npcAnswer,content,nodeChoices;
        findEnterPoint(req.query.questionId).then((questionId)=>{
            Link.find({where:{'from_node_id':questionId},include:'node_to'},function (err,links) {
                npcAnswer  = _.sample(links);
                if (npcAnswer &&  npcAnswer.to_node_id) {
                    Link.find({where:{'from_node_id':npcAnswer.to_node_id},include:'node_to'},function (err,nodeChoices) {
                        npcAnswer.node_to(function (err,node_to) {
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
                }
                else {
                    sendFailure(res);
                }
            });
        },(err)=>{
            console.log('no node',err);
            // res.redirect("/app/#!/game");
            res.json({error:"no starting point"});
        }); 


    });

    function findEnterPoint(questionId){
        const Dialogue = app.models.Dialogue;
        const Node = app.models.Node;

        
        return new Promise((resolve,reject)=>{
            if (!!questionId){
                resolve(questionId);
            }
            else {
                Dialogue.find((err,dialogues)=>{
                    console.log(dialogues);
                    let dialogue = _.sample(dialogues);
                    console.log(dialogue);

                    let enterNode = Node.findOne({where:{'dialogue_id':dialogue.id,'is_start':true}},(err,node)=>{
                        console.log(err,node);
                        if (!!err || !node){
                            // resolve(31);
                            console.log('no node');
                            reject();
                        }
                        else {
                            console.log(err,node.id,!!node.is_start,node.category,dialogue.id);
                            resolve(node.id);
                        }
                                
                    })    

                });
            }
            
        });
        
    }

    function sendFailure(res){
        const Node = app.models.Node;
        
        Node.find({where:{'type':'failure'}},(err,failNodes)=>{
            if(err){
                res.json(err);
            }

            let failNode = _.sample(failNodes);
            _.extend(failNode,{
                gameStats:{},
                previousAnswer:{text:failNode.text },
                time:_.random(10,80)
            })
            res.json(failNode);
        });

    }

}
