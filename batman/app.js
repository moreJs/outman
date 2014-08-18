
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
var rest_net = require('./routes/rest/net');

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
     "id" : "123",
     "f_time":"123",
     "department":"123",
     "car" : "123",
     "production_variety" : "123",
     "process" : "123",
     "production_line" : "123",
     "group" : "123",
     "d_time" : "123",
     "content": "123",
     "node_name" : [{"name":"拉毛"},{"name":"缺孔"}],
     "person" : "123",
     "branchs":[ {"reason_actions": [{
        "reason" : "孔变形" ,
        "actions" : [{"name":"部件维修"},{"name":"清理废料"}]
    },{
        "reason" : "缩径" ,
        "actions" : [{"name":"打磨"},{"name":"调整压力"}]
    }],
        "result" : "no"
    },{"reason_actions": [{
        "reason" : "孔变形" ,
        "actions" : [{"name":"部件维修"},{"name":"清理废料"}]
    },{
        "reason" : "缩径" ,
        "actions" : [{"name":"打磨"},{"name":"调整压力"}]
    }],
        "result" : "no"
    }
  ]
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
/*“reason_actions”：[{
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

}*/


//添加各自的路由
rest_action(app);
rest_problem(app);
rest_fact(app);
rest_net(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
