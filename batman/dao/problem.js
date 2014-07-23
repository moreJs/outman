
var _db = require('./db');
var BaseDao =  require('./baseDao');


var schema = _db.Schema;
var db = _db.mongoose;



var Problem = new schema({
   id:Number,
   title:String
});


var Problem = db.model('Problem ',Problem ,'problem');
var _problem = new BaseDao(Problem);
_problem.name = "problem";
module.exports = _problem;
