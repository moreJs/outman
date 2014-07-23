problem_dao = require("../../dao/problem");


function show(req,res){
    var id = req.params.id;
    problem_dao.getById(id,function(err,model){
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
    problem_dao.getAll(function(err,models){
        res.send(models);
    });
}
function add(req,res){
    var temp = req.body;
    /*    base.add(dao,{id:temp.id,title:temp.title},function(){
     })*/
    problem_dao.add({id:temp.id,title:temp.title},function(){});
}
function update(req,res){
    var temp = req.body,
        _id = temp._id;
    /*    base.update(dao,{_id:_id},{id:temp.id,title:temp.title},{},function(){})*/
    problem_dao.update({_id:_id},{id:temp.id,title:temp.title},{},function(){});
}
function  delet(req , res){
    var  _id = req.params.id;
    /*    base.del(dao,{_id:_id},function(){})*/
    problem_dao.delete({_id:_id},function(){});
}
module.exports = function(app){
    app.get("/problem/:id",show);
    app.get("/problem",show_all);
    app.post("/problem",add);
    app.post("/problem/:id",update);
    app.del("/problem/:id",delet);
    //分页
    app.get("/problem/page/:from/:len",getPage);
    //查询
    app.get("/problem/search/:key/:value",searchPage);
};
function searchPage(req,res){
    var key = req.params.key,
        value = req.params.value;
    var query = {};
    query[key] = value;
    problem_dao.getByQuery(query,function(err,models){
        res.send(models);
    });
}
function getPage(req,res){
    var index = req.params.from,
        len = req.params.len;
    problem_dao.getAtoB(parseInt(index),parseInt(len),function(err,models){
        res.send(models);
    });
}
