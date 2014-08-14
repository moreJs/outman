var fact_dao = require("../../dao/fact"),
    fs = require('fs');


function show(req,res){
    var id = req.params.id;
    fact_dao.getById(id,function(err,model){
        res.send(model);
    });
}
function go(req,res){
    var id = req.params.id;
    fact_dao.getById(id,function(err,model){
        var list = [ "node_name" , "branchs"  ,"reason_actions" ,"reason" ,"actions" ,"result","name"],
            temp = {};
        for(var k in model){
            if(list.indexOf(k) === -1){
                continue;
            }
            temp[k] = model[k];
        }
       fs.writeFile(__dirname + '/'+id+'.json',JSON.stringify(temp),function(err){
           if(err){
               console.log('00000000000');
           }else{
               fs.readFile(__dirname + '/'+id+'.json','utf8',function(err,data){
                   if(err){
                       console.log('00000000000');
                   }else{
                       fs.unlinkSync(__dirname + '/'+id+'.json');
                       var temp = JSON.parse(data);
                       change(temp);
                       res.send(temp);
                   }
               });
           }
       });
    });
}
function show_all(req,res){
    fact_dao.getAll(function(err,models){
        res.send(models);
    });
}
function add(req,res){
    var temp = req.body;
    fact_dao.add(temp,function(err){
        if(err){
            res.send(err);
        }else{
            res.send('ok');
        }
    });
}
function update(req,res){
    var temp = req.body,
        _id = temp._id;
    delete  temp._id;
    fact_dao.update({_id:_id},temp,{ },function(err){
        if(err){
            res.send(err);
        }else{
            res.send('ok');
        }
    });
}
function  delet(req , res){
    var  _id = req.params.id;
    fact_dao.delete({_id:_id},function(err){
        if(err){
            res.send(err);
        }else{
            res.send('ok');
        }
    });
}
module.exports = function(app){
    app.get("/fact/:id",show);
    app.get("/fact",show_all);
    app.post("/fact",add);
    app.post("/fact/:id",update);
    app.del("/fact/:id",delet);
    //分页
    app.get("/fact/page/:from/:len",getPage);
    //查询
    app.get("/fact/search/:key/:value",searchPage);
    app.get("/flare/:id",go);

};
function searchPage(req,res){
    var key = req.params.key,
        value = req.params.value;
    var query = {};
    query[key] = value;
    fact_dao.getByQuery(query,function(err,models){
        res.send(models);
    });
}
function getPage(req,res){
    var index = req.params.from,
        len = req.params.len;
    fact_dao.getAtoB(parseInt(index),parseInt(len),function(err,models){
        res.send(models);
    });
}
function change(temp){
/*   var list = [ "id" , "f_time"  ,"department" ,"car" ,"production_variety" ,"process","production_line" ,"group" , "d_time",
  "content" , "person" ];
    for(var i = 0 ; i < list.length ;i++){
        var key = list[i];
        delete model[key];
    }*/
    dfs(temp);
/*    fs.writeFile('ttt.txt',JSON.stringify(model),function(err){
        if(err){
            console.log(err);
        }else{
            console.log('ok');
        }
    })*/
}



function dfs(temp){
    var list = [ "node_name" , "branchs"  ,"reason_actions" ,"reason" ,"actions" ,"result","name"];
    for(var item in temp){
        if(list.indexOf(item) === -1){
             temp[item];
             continue;
        }
        if(item.match(/s$/)){
           temp['children'] = temp[item];
           temp[item];
            for(var i = 0 ; i < temp['children'].length;i++){
                   dfs(temp['children'][i]);
            }
        }else{
            if( item != 'name'){
                temp['name'] = temp[item];
                temp[item];
            }
       } }
}
/*change({
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
    "branchs":[{
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
});*/
