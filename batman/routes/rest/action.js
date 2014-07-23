action_dao = require("../../dao/action");
base = require("../baseDao");
function show(req,res){
    var id = req.params.id;
    action_dao.getById(id,function(err,model){
        res.send(model);
    });
/*    base.show(dao,id,function(err,model){
        res.send(model);
    })*/

}
function show_all(req,res){
/*    base.showAll(dao,function(err,models){
        res.send(models);
    })*/
    action_dao.getAll(function(err,models){
        res.send(models);
    });
}
function add(req,res){
    var temp = req.body;
/*    base.add(dao,{id:temp.id,title:temp.title},function(){
    })*/
    action_dao.add({id:temp.id,title:temp.title},function(){});
}
function update(req,res){
    var temp = req.body,
        _id = temp._id;
/*    base.update(dao,{_id:_id},{id:temp.id,title:temp.title},{},function(){})*/
    action_dao.update({_id:_id},{id:temp.id,title:temp.title},{},function(){});
}
function  delet(req , res){
    var  _id = req.params.id;
/*    base.del(dao,{_id:_id},function(){})*/
    action_dao.delete({_id:_id},function(){});
}
module.exports = function(app){
    app.get("/action/:id",show);
    app.get("/action",show_all);
    app.post("/action",add);
    app.post("/action/:id",update);
    app.del("/action/:id",delet);
    //分页
    app.get("/action/page/:from/:len",getPage);
    //查询
    app.get("action/search/:key/:value/",searchPage);
};
function searchPage(req,res){
    var key = req.params.key,
        value = req.params.value;
    var query = {};
    query[key] = value;
    action_dao.getByQuery(query,function(err,models){
        res.send(models);
    });
}
function getPage(req,res){
    var index = req.params.from,
        len = req.params.len;
    action_dao.getAtoB(parseInt(index),parseInt(len),function(err,models){
        res.send(models);
    });
}

