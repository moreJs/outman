/**
 * Created by User on 14-8-9.
 */


var _db = require('./db'),
    BaseDao =  require('./baseDao');


var schema = _db.Schema,
    db = _db.mongoose;


var Action = new schema({
         name : String
    }),
    Problem = new schema({
        name : String
    }),
    Reason_Actions = new schema({
      reason : String ,
      actions : [Action]
    }),
/*    Branchs = new schema({
      reason_actions : [Reason_Actions]
    }),*/
    Net = new schema({
          result : String ,
          count : Number ,
          problems : [Problem] ,
          branchs : [Reason_Actions]
    });

var Net = db.model('Net',Net ,'Net');
var _net = new BaseDao(Net);
_net.name = "problem";
module.exports = _net;

/*
{

“reason_actions”：[{
                   “branchs”：  {
“reason”: “c4”，
“action”：[“s1”，“s2”]
}

},{
“branchs”：   {
    “reason”: “a3”，
    “action”：[“s4”]
    }
},
“result”： “yes”，
“count”：“1”
}*/
