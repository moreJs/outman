/**
 * Created by User on 14-8-9.
 */
/*
var test = {
“id” ： “1001”，
“f_time”:  “2010/10/1 14:00”，
“department”：“007”，
“car”： “XXX”，
“production_variety”：“后地板”，
“process”：“05”，
“production_line”：“A线”，
“group”：“甲班”，
“d_time”：“60”,
“content”:“OP10制件缩径”，
“node_name”：“缩径”,
“person”：“张三”，

}*/




var _db = require('./db'),
    BaseDao =  require('./baseDao');


var schema = _db.Schema,
    db = _db.mongoose;


var Action = new schema({
    name:String
}),
    Reason_Actions = new schema({
      reason : String,
      actions : [Action]
}),
    Branchs = new schema({
      reason_actions : [Reason_Actions],
      result : String
   }),
    Fact = new schema({
        id : String,
        f_time:Date,
        department:String,
        car : String,
        production_variety : String,
        process : String,
        production_line : String,
        group : String,
        d_time : Date,
        content: String,
        node_name : String,
        person : String,
     branchs : [Branchs]
});

var Fact = db.model('Fact ',Fact ,'Fact');
var _fact = new BaseDao(Fact);
_fact.name = "problem";
module.exports = _fact;
