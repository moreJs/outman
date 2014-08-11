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

direcive.directive('tree',function(){
    return{
        restrict : 'EA',
        replace : true,
        template : '<div class="Ng_tree">' +
                     '<div class="tree_title">第一次尝试</div>' +
                     '<div class="tree_content">' +
                              '<div>原因节点：<input ng-repeat="len in r_length" name="reason" type="text"/></div><div><a ng-click="add()">添加原因</a>  <a ng-click="sure()" class="sure"> 确定</a></div>' +
                               '<div ng-repeat="le in r_length">方案节点({{le.value}})：<input ng-repeat="l in a_length" name="reason" type="text"/><div><a ng-click="add()">添加方案</a>  <a ng-click="sure()" class="sure"> 确定</a></div></div>' +
                               '<div>效果:<input type="text" name="xiaoguo"/></div>' +
                               '<div><a ng-click="sure()"> 确定</a></div>' +
                     '</div>',
        link : function(scope,ele,attrs){
            scope.r_length = [{}];
            scope.a_length = [{}];
            scope.add = function(){
/*                var input = document.createElement('input');
                input.name="reason";
                input.type="text";
                var content = ele[0].getElementsByClassName('tree_content')[0];
                content.firstElementChild.appendChild(input);*/
                var input = ele[0].querySelector('input[type="text"]:last-child');
                scope.r_length[scope.r_length.length-1].value = input.value;
                scope.r_length.push({});
            }
            scope.sure = function(){
                add();
                var inputs = ele[0].querySelectorAll('input[type="text"]');
                console.log(inputs);
                Array.prototype.forEach.call(inputs,function(input){
                    input.disabled = "disabled";
                });
            }
            var add = function(){
                var input = ele[0].querySelector('input[type="text"]:last-child');
                scope.r_length[scope.r_length.length-1].value = input.value;
            }
        }
    }
});




