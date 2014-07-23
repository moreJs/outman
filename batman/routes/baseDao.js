exports.show = function(dao,id,callback){
    dao.getById(id,callback);
}/**
 * Created by User on 14-7-13.
 */

exports.showAll = function(dao,callback){
    dao.getAll(callback);
}

exports.add = function(dao,doc,callback){
    dao.add(doc,callback);
}

exports.update = function(dao,cond,up,option,callback){
    dao.update(cond,up,option,callback);
}

exports.del = function(dao,query,callback){
    dao.delete(query,callback);
}
exports.search = function(query,callback){
    dao.getByQuery(query,callback);
}
