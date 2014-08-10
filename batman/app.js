
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
// action rest
var rest_action = require('./routes/rest/action');
var rest_problem = require('./routes/rest/problem');
var rest_fact = require('./routes/rest/fact');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/test', function(req,res){
 var fact = {
     "id" : "1001",
     "f_time" :  "2010/10/1 14:00",
    "department" :"007",
    "car" : "XXX",
    "production_variety" :"后地板",
    "process" :"05",
     "production_line" :"A线",
    "group" :"甲班",
    "d_time" :"60",
    "content" :"OP10制件缩径",
    "node_name" :"缩径",
    "person" :"张三",
    "branchs":[
     {
    "reason_actions" : [
     {
        "reason" : "a1",
        "actions" :  [{"name":"c1"},{"name":"c2"}]
     },
    {
        "reason" : "a2",
        "actions" :[{"name":"c3"}]
    }
     ],
       "result" : "no"
   }, {
            "reason_actions" : [
                {
                    "reason" : "a1",
                    "actions" :  [{"name":"c1"},{"name":"c2"}]
                },
                {
                    "reason" : "a2",
                    "actions" :[{"name":"c3"}]
                }
            ],
            "result" : "no"
        },{
    "reason_actions" :[ {
        "reason" :"a3",
        "actions" : [{"name":"c4"}]
}],
        "result" : "yes"
}]
};
    var _fact = require('./dao/fact');
    _fact.add(fact,function(err){
        if(err){
            res.send(err);
        }else{
            res.send('ok');
        }
    });
});

//添加各自的路由
rest_action(app);
rest_problem(app);
rest_fact(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
