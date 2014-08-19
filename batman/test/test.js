var compare = function(temp,item){
    /*    temp["problems"] = action["node_name"];
     temp["branchs"] = net["reason_actions"];
     temp["result"] = net["result"];*/
    //效果
    var t_re = temp["result"],
        i_re = item["result"];

    if(t_re != i_re){
        return false;
    }


    //问题节点
    var t_pro = temp["problems"],
        i_pro = item["problems"],
        t_length = t_pro.length,
        i_length = i_pro.length;


    if(t_length != i_length){
        return false;
    }

    while(t_length > 0){
        t_length--;
        if(t_pro[t_length]['name'] != i_pro[t_length]['name']){
            return false;
        }
    }

    //原因和方案
    var t_brance = temp["branchs"],
        i_brance = item["branchs"],
        t_leng = t_brance.length,
        i_leng = i_brance.length;

    if(t_leng != i_leng){
        return false;
    }

    while(t_leng > 0){
        t_leng--;
        var t_reason = t_brance[t_leng]["reason"],
            t_actions = t_brance[t_leng]["actions"],
            t_a_leng = t_actions.length,
            i_reason = i_brance[t_leng]["reason"],
            i_actions = i_brance[t_leng]["actions"],
            i_a_leng = i_actions.length;
        if(t_reason != i_reason || t_a_leng != i_a_leng){
            return false;
        }

        while(t_a_leng > 0){
            t_a_leng--;
            if(t_actions[t_a_leng]["name"] != i_actions[t_a_leng]["name"]){
                return false;
            }
        }

    }

    return true;
};


var fact = {
        "result" : "no",
        "problems" : [{"name":"拉毛"},{"name":"缺孔"}],
        "branchs":[ {
            "reason" : "孔变形" ,
            "actions" : [{"name":"部件维修"},{"name":"清理废料"}]
        },{
            "reason" : "缩径" ,
            "actions" : [{"name":"打磨"},{"name":"调整压力"}]
        }]
    };
var net = {
    "result" : "no",
    "count" : 1001,
    "problems" : [{"name":"拉毛"},{"name":"缺孔"}],
    "branchs":[ {
        "reason" : "孔变形" ,
        "actions" : [{"name":"部件维修"},{"name":"清理废料"}]
    },{
        "reason" : "缩径" ,
        "actions" : [{"name":"打磨"},{"name":"调整压力"}]
    }]
};

console.log(compare(fact,net));