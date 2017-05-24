'use strict';


module.exports = function(Dialogue) {

    // cascade deleting related nodes
    Dialogue.observe("before delete",function(context, next){
        var Node = context.Model.app.models.Node;
        var dialogue = Dialogue.find({where:{id:context.where.id},include:['nodes','links']},function(err,ctx){
            ctx[0].nodes().forEach(function(node){
                Node.destroyById(node.id, function () {
                    console.log("Deleted node", node.id);
                });
            })
            next();
        });
    });


};
