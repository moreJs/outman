var direcive = angular.module('batman.direcive',[]);




direcive.directive('shownet',function(){
    return {
        restrict:'EA',
        scope :{obj:'=item'},
        template : '<a>可视化</a>',
        replace : true,
        link : function(scope,ele,attrs){
            var eles = ele[0];
            eles.addEventListener('click',function(event){
                event.preventDefault();
                mask();
              //  go("/flare/"+scope.obj._id);
                var a = new Tree(scope.obj);
                var swidth = document.documentElement.scrollWidth,
                    sheight = document.documentElement.scrollHeight,
                    width = a.outer.getAttribute("width"),
                    height = a.outer.getAttribute("height");
                a.outer.style.left = (swidth-width)/2;
                a.outer.style.top = (sheight-height)/2;
                document.body.appendChild(a.outer);
                click();
            },true);
        }
    }
});
// 负责展示动画的指令
direcive.directive('show',function(){
    return {
        restrict:'EA',
        scope :{obj:'=item'},
        template : '<a>可视化</a>',
        replace : true,
        link : function(scope,ele,attrs){
            var eles = ele[0];
            eles.addEventListener('click',function(event){
                event.preventDefault();
                mask();
                go("/flare/"+scope.obj._id);
                click();
            },true);
        }
    }
});
var mask = function(){
    if(document.querySelector('.mask')){
        var temp = document.querySelector('.mask')
        temp.style.display = 'block';
    }else{
   var swidth = document.documentElement.scrollWidth,
       sheight = document.documentElement.scrollHeight,
       _div = document.createElement('div'),
       _svg = document.querySelector('svg');
       _div.className = 'mask';
       _div.style.width = swidth + 'px';
       _div.style.height = sheight + 'px';
       document.body.appendChild(_div);
    }
  }
var click = function(){
    var _div = document.querySelector('.mask'),
        _svg = document.querySelector('svg');
    _svg.addEventListener('click',function(){
        //var svg = document.querySelector('svg');
        document.body.removeChild(this);
        _div.style.display = 'none';
    },true);
}
var go = function(url){
    var width = 760,
        height = 400,
        swidth = document.documentElement.scrollWidth,
        sheight = document.documentElement.scrollHeight;

    var cluster = d3.layout.cluster()
        .size([height, width - 160]);

    var diagonal = d3.svg.diagonal()
        .projection(function(d) { return [d.y, d.x]; });

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("left", (swidth-width)/2)
        .attr("top", (sheight-height)/2)
        .append("g")
        .attr("transform", "translate(40,0)");
    d3.select('svg').append('button');
    d3.select('svg').style("left", (swidth-width)/2 + "px").style("top", (sheight-height)/2  + "px");
    d3.json(url, function(error, root) {
        var nodes = cluster.nodes(root),
            links = cluster.links(nodes);

        var link = svg.selectAll(".link")
            .data(links)
            .enter().append("path")
            .attr("class", "link")
            .attr("d", diagonal);

        var node = svg.selectAll(".node")
            .data(nodes)
            .enter().append("g")
            .attr("class", "node")
            .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })

        node.append("circle")
            .attr("r", 4.5);

        node.append("text")
            .attr("dx", function(d) { return d.children ? -8 : 8; })
            .attr("dy", 3)
            .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
            .text(function(d) { return d.name; });
    });
    d3.select(self.frameElement).style("height", height + "px");
};


//负责添加问题处理事实树的指令
direcive.directive('trees',function(){
    return{
        restrict:'EA',
        replace:true,
        transclude:true,
        template:'<div ng-transclude></div>',
        controller:function(){
            var trees = [];
            this.getOpened = function(select){
                angular.forEach(trees,function(item){
                    if(item != select){
                        item.showMe = false;
                    }
                });
            }
            this.add = function(sc){
                trees.push(sc);
            }
        }
    }
});

direcive.directive('tree',function(){
    return{
        restrict : 'EA',
        replace : true,
        template : '<div class="Ng_tree">' +
                     '<div class="tree_title" ng-click="toggle()">第{{$index + 1}}次尝试</div>' +
                     '<div class="tree_content" ng-show="showMe">' +
                               '<div ng-repeat="reason in item.reason_actions"><label>原因节点(no:{{$index + 1}})：</label><select ng-model="reason.reason" ><option ng-repeat="opt in p_opts" value="{{opt.title}}" sel1>{{opt.title}}</option></select>' +
                                    '<div ><label class="padding_right_43">方案节点：</label><select ng-repeat="act in reason.actions" ng-model="act.name" ><option ng-repeat="opt in a_opts" value="{{opt.title}}" sel2>{{opt.title}}</option></select><a class = "left_padding" ng-click="add_action($index)" ng-show="button">添加方案</a></div>' +
                               '</div>' +
                               '<div><label class="padding_right_87">效果:</label><input type="text" ng-model="item.result"/></div>' +
                               '<div><a ng-click="add_reason_actions()" ng-show="button">添加原因</a> <a ng-click="sure()" ng-show="button"> 确定</a></div>' +
                    '</div>' +
                    '</div>',
        require : '^?trees',
        link : function(scope,ele,attrs,treesController){
            scope.showMe = false;
            scope.button = true;
            treesController.add(scope);
            scope.sure = function(){
                scope.showMe = !scope.showMe;
                scope.button = false;
                scope.action.branchs.push( {
                    "reason_actions" : [
                        {
                            "reason" : "",
                            "actions" :  [{"name":""}]
                        }
                    ],
                    "result" : ""
                });
            };
            scope.toggle = function(){
                scope.showMe = !scope.showMe;
               treesController.getOpened(scope);
            };
            scope.add_reason_actions = function(){
                scope.item["reason_actions"].push({
                    "reason" : "",
                    "actions" :  [{"name":""}]
                });
            };
            scope.add_action = function(index){
                scope.item["reason_actions"][index]["actions"].push({"name":""});
            };
        }
    }
});
direcive.directive('tree1',function(){
    return{
        restrict : 'EA',
        replace : true,
        template : '<div class="Ng_tree">' +
            '<div class="tree_title" ng-click="toggle()">原因{{$index + 1}}</div>' +
            '<div class="tree_content" ng-show="showMe">' +
            '<div ><label>原因节点：</label><select ng-model="item.reason" ><option ng-repeat="opt in p_opts" value="{{opt.title}}" sel11>{{opt.title}}</option></select>' +
            '<div ><label class="padding_right_43">方案节点：</label><select ng-repeat="act in item.actions" ng-model="act.name" ><option ng-repeat="opt in a_opts" value="{{opt.title}}" sel12>{{opt.title}}</option></select><a class = "left_padding" ng-click="add_action($index)" ng-show="button">添加方案</a></div>' +
            '</div>' +
            '<div><a ng-click="add_reason_actions()" ng-show="button">添加原因</a> <a ng-click="sure()" ng-show="button"> 确定</a></div>' +
            '</div>' +
            '</div>',
        require : '^?trees',
        link : function(scope,ele,attrs,treesController){
            scope.showMe = false;
            scope.button = true;
            treesController.add(scope);
            scope.sure = function(){
                scope.showMe = !scope.showMe;
                scope.button = false;
                scope.action.branchs.push( {
                    "reason_actions" : [
                        {
                            "reason" : "",
                            "actions" :  [{"name":""}]
                        }
                    ],
                    "result" : ""
                });
            };
            scope.toggle = function(){
                scope.showMe = !scope.showMe;
                treesController.getOpened(scope);
            };
            scope.add_reason_actions = function(){
                scope.item["reason_actions"].push({
                    "reason" : "",
                    "actions" :  [{"name":""}]
                });
            };
            scope.add_action = function(index){
                scope.item["reason_actions"][index]["actions"].push({"name":""});
            };
        }
    }
});

direcive.directive('tree2',function(){
    return{
        restrict : 'EA',
        replace : true,
        template : '<div class="Ng_tree">' +
            '<div class="tree_title" ng-click="toggle()">NO:{{$index + 1}}</div>' +
            '<div class="tree_content" id = "shownet" ng-show="showMe">' +
            '</div>' +
            '</div>',
        require : '^?trees',
        link : function(scope,ele,attrs,treesController){
            scope.showMe = false;
            scope.button = true;
            treesController.add(scope);
            var warp = ele[0].lastChild;

            var a = new Tree(scope.item);
         //   var warp = document.getElementById("shownet");
            warp.appendChild(a.outer);

            scope.sure = function(){
                scope.showMe = !scope.showMe;
                scope.button = false;
                scope.action.branchs.push( {
                    "reason_actions" : [
                        {
                            "reason" : "",
                            "actions" :  [{"name":""}]
                        }
                    ],
                    "result" : ""
                });
            };
            scope.toggle = function(){
                scope.showMe = !scope.showMe;
                if(scope.showMe){
                    showNet();
                }
                treesController.getOpened(scope);
            };
            scope.add_reason_actions = function(){
                scope.item["reason_actions"].push({
                    "reason" : "",
                    "actions" :  [{"name":""}]
                });
            };
            scope.add_action = function(index){
                scope.item["reason_actions"][index]["actions"].push({"name":""});
            };
        }
    }
});



direcive.directive('sel',function(){
    return{
        restrict:'A',
        link:function(scope,ele,attrs){
            var eles = ele[0];
            var a1 = scope.item_node.name,
                a2 = scope.opt.title;
            console.log("000:"+a1);
            if(a1 == a2){
                eles.setAttribute('selected','selected');
            }
        }
    }
});
direcive.directive('sel111',function(){
    return{
        restrict:'A',
        link:function(scope,ele,attrs){
            var eles = ele[0];
            var a1 = scope.pro.name,

                a2 = scope.opt.title;
            console.log(a1+"111111111");
            if(a1 == a2){
                eles.setAttribute('selected','selected');
            }
        }
    }
});
direcive.directive('sel1',function(){
    return{
        restrict:'A',
        link:function(scope,ele,attrs){
            var eles = ele[0];
            var a1 = scope.reason.reason,
                a2 = scope.opt.title;
            if(a1 == a2){
                eles.setAttribute('selected','selected');
            }
        }
    }
});
direcive.directive('sel11',function(){
    return{
        restrict:'A',
        link:function(scope,ele,attrs){
            var eles = ele[0];
            var a1 = scope.item.reason,
                a2 = scope.opt.title;
            if(a1 == a2){
                eles.setAttribute('selected','selected');
            }
        }
    }
});
direcive.directive('sel2',function(){
    return{
        restrict:'A',
        link:function(scope,ele,attrs){
            var eles = ele[0];
            var a1 = scope.act.name,
                a2 = scope.opt.title;
            if(a1 == a2){
                eles.setAttribute('selected','selected');
            }
        }
    }
});

direcive.directive('sel12',function(){
    return{
        restrict:'A',
        link:function(scope,ele,attrs){
            var eles = ele[0];
            var a1 = scope.act.name,
                a2 = scope.opt.title;
            if(a1 == a2){
                eles.setAttribute('selected','selected');
            }
        }
    }
});


var Tree = function(data){
    this.data = data;
    this.stack = [];
 //   this.outer = document.querySelector('svg');
    this.svg();
    this.init();
    this.createDom();
};
Tree.prototype.svg = function(){
    this.outer = document.createElementNS('http://www.w3.org/2000/svg',"svg");
    this.outer.setAttribute("width","760");
    this.outer.setAttribute("height","400");
};
Tree.prototype.init = function(){
    var outer = this.outer,
        width = outer.getAttribute('width'),
        height = outer.getAttribute('height');


    this.width = width;
    this.height = height;
    this.row = height / 10;
    this.col = width / 18;
};

Tree.prototype.createDom = function(){
    //第一列
    var data = this.data;
    var problems = data["problems"],
        len = problems.length,
        pad = this.height / (len + 1);


    for(var i = 0; i < len;i++){
        var x = parseInt(2 * this.col),
            y = parseInt((i+1) * pad),
            key = problems[i];
        this.stack.push(x+":"+y);
        this.darwCricle(x,y);
        this.addText(x,y-30,key.name);
    }

    //第二列
    this.drawStar(this.col*6,this.height/2,30);

    //画线
    while(this.stack.length){
        var temp = this.stack.pop();
        var ans = temp.split(':');
        console.log(temp);
        this.drawline(parseInt(ans[0])+17,ans[1],this.col*6,this.height/2);
    }

    //第三列
    var brancs =data['branchs'],
        leng = brancs.length,
        pading = this.height/(leng+1),
        act = 0,
        item = 0;

    for(var k = 0; k < leng ; k++){
        var temp = brancs[k],
            act = act + temp["actions"].length;
    }
    var a_padding = this.height/(act+1);

    for(var i = 0; i < leng;i++){
        var x = 11 * this.col,
            y = (i+1) * pading,
            key = brancs[i];
        this.darwCricle(x,y);
        this.addText(x,y-30,key["reason"]);
        this.drawline(this.col*6+30,this.height/2,x - 17,y);


        var temp = brancs[i]["actions"],
            l = temp.length;
        for(var m = 0; m < l;m++){
            item++;
            var xx = 15 * this.col,
                yy = item * a_padding,
                t_key = temp[m];
            console.log(item);
            this.darwCricle(xx,yy);
            console.log("test:::"+t_key["name"]);
            this.addText(xx,yy-30,t_key["name"]);
            this.drawline(x + 17,y,xx - 17,yy);
        }
    }
    this.addText(200,120,'出现频数：'+this.data["count"]);
    this.addText(200,150,'效    果：'+this.data["result"]);
};

Tree.prototype.drawline = function(x1,y1,x2,y2){
    var cri = document.createElementNS('http://www.w3.org/2000/svg',"line");
    cri.setAttribute("x1",x1);
    cri.setAttribute("y1",y1);
    cri.setAttribute("x2",x2);
    cri.setAttribute("y2",y2);
    cri.setAttribute("fill","none");
    cri.setAttribute("stroke"," #ccc");
    cri.setAttribute("stroke-width","3");
    this.outer.appendChild(cri);
}
Tree.prototype.drawStar = function(x,y,left){
    var cri = document.createElementNS('http://www.w3.org/2000/svg',"polygon");
    var box = [];
    box.push(x);
    box.push(y-left);
    box.push(x);
    box.push(y+left);
    box.push(x+left);
    box.push(y);
    cri.setAttribute("points",box.join(' '));
    cri.setAttribute("fill","none");
    cri.setAttribute("stroke","steelblue");
    cri.setAttribute("stroke-width","3");
    this.outer.appendChild(cri);



};
Tree.prototype.addText = function(x,y,content){
    var cri = document.createElementNS('http://www.w3.org/2000/svg',"text");
    cri.setAttribute("x",x);
    cri.setAttribute("y",y);
    cri.appendChild(document.createTextNode(content));
    this.outer.appendChild(cri);
};

Tree.prototype.darwCricle = function(x,y){
    var cri = document.createElementNS('http://www.w3.org/2000/svg',"circle");
    cri.setAttribute("cx",x);
    cri.setAttribute("cy",y);
    cri.setAttribute("r","20");
    cri.setAttribute("fill","none");
    cri.setAttribute("stroke","steelblue");
    cri.setAttribute("stroke-width","3");
    this.outer.appendChild(cri);
};
