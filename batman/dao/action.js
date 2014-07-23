var _db = require('./db');
var BaseDao =  require('./baseDao');


var schema = _db.Schema;
var db = _db.mongoose;



var Action = new schema({
   id:Number,
   title:String
});


var Action = db.model('Action',Action,'action');
var _action = new BaseDao(Action);
_action.name = "action";
module.exports = _action;

