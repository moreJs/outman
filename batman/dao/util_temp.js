/**
 * Created by User on 14-4-29.
 */

/**
 * Created by User on 14-4-27.
 */
var Wind = require('wind');
var _db = require('./db');
var BaseDao =  require('./baseDao');
var reason = require('./reason');
var net = require('./know_net');

var schema = _db.Schema;
var __db = _db.db;

/*var my_command = {
        'group' : { //mongodb group command
        'ns' : 'reason', //the collection to query
       // 'cond' : {'active.end' : { $gt: new Date() }}, //active.end must be in the future
        'initial': {'ans': {}}, //initialize any count object properties
        '$reduce' : 'function(doc, out){ out.ans[doc.INDEX_NUM] = doc.SORT_ID }', //
        'key' : {'PROBLEM_ID ': 1} //fields to group by
    }
}
__db.db.executeDbCommand(my_command, function(err, dbres){
    console.log('this is a good boy to!');
    var ret = dbres.documents[0].retval; //这里包含了查询的结果集合。
    for (var key in ret)
        console.log(ret[key]);
});
console.log('this is a good boy!');*/
/*var Miaoshu = new schema(
    {
        DESCRIPTION_ID :String,
        PROBLEM_ID : String,
        SORT_TYPE : String,
        PROBLEM_CONTENT : String,
        SOURCE_PIC : String,
        SOURCE_FILE : String,
        RELATER_ID : String,
        RELATE_TIME : String,
        ACCEPTER_ID : String,
        ACCEPT_TIME : String,
        CREATOR_ID : String,
        CREATE_TIME : String,
        EDITOR_ID : String,
        EDIT_TIME : String,
        DELETED : String,
        VERSION : String,
        DESCRIPTION_SORT_ID : String,
        DESCRIPTION_SORT_INDEX : String,
        SORT_ID : String,
        INDEX_NUM : String
    }
);
Miaoshu.set('collection', 'miaoshu');
var Miaoshu = db.model('miaoshu',Miaoshu);

var mmiaoshu = new BaseDao(Miaoshu);*/
/*
mmiaoshu.getById('53533222fc8c76a5d1bb11c6',function(err,data){
    console.log(data.SORT_ID);
});*/

 //   pro.my_problem.update({_id:data._id},data,{},function(){});
/*pro.my_problem.getById("5353323dfc8c76a5d1bb177d",function(err,data){
   console.log(data);
})*/
/*    mmiaoshu.getAll(function(err,models){
        var length = models.length;
        var flag = true;
        var count = 0;
        for(var i = 0; i < length ;i++){
           if(!flag){
               i--;
               continue;
           }
            var temp = models[i];
            var id = temp.PROBLEM_ID;
            var sort_id = temp.SORT_ID;
            if(parseInt(sort_id) != 0){
                flag = false;
                pro.my_problem.update({PROBLEM_ID:id },{SORT_ID:sort_id},{},function(err){
                    flag = true;
                });
            }
        }
        console.log(count);
    });*/

/*pro.problem.find({PROBLEM_ID:1},function(err,doc){
    doc['title'] = 'hello';
    doc.save(function(){});
});*/
/*
 _Miaoshu.getAll(function(err,models){
    var length = models.length;
    console.log(length);
*/
/*    for(var i = 0; i < length ;i++){
      var temp = models[i];
      var id = temp.PROBLEM_ID;
      var sort_id = temp.SORT_ID;
*//*
*/
/*      pro.problem.update({PROBLEM_ID:id},{$set:{SORT_ID:sort_id}} ,function(){});*//*
*/
/*
      console.log(sort_id);
   }*//*

})
*/

/*
db.reason.group({
    "key":{"PROBLEM_ID":true},
    "initial":{"ans":{}},
    "$reduce": function(doc,prev){
        prev.ans[doc.INDEX_NUM] = doc.SORT_ID;

    }
});*/

/*var command = {
    'group' : { //mongodb group command
        'ns' : 'reason', //the collection to query
        "initial":{"ans":{}}, //initialize any count object properties
        "$reduce": function(doc,prev){
            prev.ans[doc.INDEX_NUM] = doc.SORT_ID;
        }, //
        "key":{"PROBLEM_ID":true} //fields to group by
    }
}
__db.db.executeDbCommand(command, function(err, dbres){
    var ret = dbres.documents[0].retval; //这里包含了查询的结果集合。
    for (var key in ret)
        console.log(ret[key]);
});*/

var key = {"PROBLEM_ID":true},
//var keyf = function(doc){return parseInt(doc['PROBLEM_ID']);},
    condition = {},
    initial = {"NET":[]},
    reduce = function(doc,prev){
        var temp = parseInt(doc.INDEX_NUM);
        if(!prev.NET[temp]){
            prev.NET[temp] = new Array();
        }
        prev.NET[temp].push(doc.SORT_ID);
    },
    final = {},
    command = {};
    reason.reason.collection.group(key , condition, initial, reduce, final, command, function(err, dbres){
       var length = dbres.length;
    for(var i = 0; i < length ; i++){
       net.my_know_net.create(dbres[i],function(){});
    }
});


