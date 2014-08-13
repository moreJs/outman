var direcive = angular.module('batman.direcive',[]);


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
                               '<div ng-repeat="reason in item.reason_actions"><label>原因节点(no:{{$index + 1}})：</label><input ng-model="reason.reason" type="text"/>' +
                                    '<div ><label class="padding_right_43">方案节点：</label><input ng-repeat="act in reason.actions" ng-model="act.name" type="text"/><a class = "left_padding" ng-click="add_action($index)" ng-show="button">添加方案</a></div>' +
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




