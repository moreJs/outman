var app = angular.module('batman',['batman.service','batman.direcive','ngRoute']);
app.config(['$routeProvider',function($routeProvider){
    $routeProvider.
        when('/action',{
            controller:'list_A',
            resolve:{
                actions:function(MultiActionLoader){
                       return MultiActionLoader();
                   }
            },
            templateUrl:'/html/action/list.html'
        }).when('/action/new',{
            controller:'new_A',
            templateUrl:'/html/action/new.html'
        }).when('/action/update/:_id',{
            controller:'update_A',
            resolve:{
                action:function(ActionLoader){
                    return ActionLoader();
                }
            },
            templateUrl:'/html/action/update.html'
        }).
        when('/problem',{
            controller:'list_P',
            resolve:{
                problems:function(MultiProblemLoader){
                    return MultiProblemLoader();
                }
            },
            templateUrl:'/html/problem/list.html'
        }).when('/problem/new',{
            controller:'new_P',
            templateUrl:'/html/problem/new.html'
        }).when('/problem/update/:_id',{
            controller:'update_P',
            resolve:{
                problem:function(ProblemLoader){
                    return ProblemLoader();
                }
            },
            templateUrl:'/html/problem/update.html'
        }).when('/fact',{
            controller:'list_F',
            resolve:{
                facts:function(MultiFactLoader){
                    return MultiFactLoader();
                }
            },
            templateUrl:'/html/fact/list.html'
        }).when('/fact/new',{
            controller:'new_F',
            resolve:{
                p_opts:function(MultiProblemLoader){
                    return MultiProblemLoader();
                },
                a_opts:function(MultiActionLoader){
                    return MultiActionLoader();
                }
            },
            templateUrl:'/html/fact/new.html'
        }).when('/fact/update/:_id',{
            controller:'update_F',
            resolve:{
                fact:function(FactLoader){
                    return FactLoader();
                },
                p_opts:function(MultiProblemLoader){
                    return MultiProblemLoader();
                },
                a_opts:function(MultiActionLoader){
                    return MultiActionLoader();
                }
            },
            templateUrl:'/html/fact/update.html'
        });
}]);

/*app.controller('list_A',['$scope','actions',function($scope,actions){
 $scope.actions = actions;
 $scope.fields = ['id','title']
 }]);*/
app.controller('update_A',['$scope','Action','action','$location',function($scope,Action,action,$location){
    $scope.action = action;
    $scope.title = "修改元方案";
    $scope.submit = function(){
        var a = new Action(action);
        a.$save();
        $location.path('/action');
    };
}]);
app.controller('update_P',['$scope','Problem','problem','$location',function($scope,Problem,problem,$location){
    $scope.action = problem;
    $scope.title = "修改问题类";
    $scope.submit = function(){
        var a = new Problem(problem);
        a.$save();
        $location.path('/problem');
    };
}]);
app.controller('update_F',['$scope','Fact','p_opts','a_opts','fact','$location',function($scope,Fact,p_opts,a_opts,fact,$location){
    $scope.action = fact;
    $scope.p_opts = p_opts ;
    $scope.a_opts = a_opts;
    $scope.title = "修改问题处理事实树类";
    $scope.submit = function(){
        var a = new Fact(fact);
        a.$save();
        $location.path('/fact');
    };
}]);
app.controller('list_A',['$scope','$http','Action','PagSlice','$location',function($scope,$http,Action,PagSlice,$location){
//    $scope.actions = actions;
    var fetch = function(a,b,callback){
        $http.get('/action/page/'+a+'/'+b).success(callback);
    };
    var pages = PagSlice(fetch,10);
    $scope.actions = pages;
    $scope.fields = ['id','title'];
    $scope.title = "元方案字典管理";
    $scope.new = function(){
        $location.path('/action/new');
    };
    $scope.remove = function(index){
        var _id = pages.currentItems[index]._id;
        console.log(pages.currentItems[index].id);
        $scope.actions.currentItems.splice(index,1);
        $scope.actions.total--;
        Action.delete({_id:_id});
        $location.path('/action');
    };
    $scope.del = function(){
        var temp = pages.currentItems;
        for(var i = temp.length -1 ; i >= 0 ;i--){
            if(temp[i].flag){
                Action.delete({_id:temp[i]._id});
                $scope.actions.currentItems.splice(i,1);
                $scope.actions.total--;
            }
        }
    };
    $scope.search = function(){
        var key = $scope.keyWord,
            value = $scope.choose;
            $http.get('/action/search/'+value+'/'+key).success(function(data){
                console.log(data);
                $scope.actions.currentItems = data;
                $scope.actions.total = 1;
            });
    }
}]);
app.controller('list_P',['$scope','$http','Problem','PagSlice','$location',function($scope,$http,Problem,PagSlice,$location){
//    $scope.actions = actions;
    var fetch = function(a,b,callback){
        $http.get('/problem/page/'+a+'/'+b).success(callback);
    };
    var pages = PagSlice(fetch,10);
    $scope.actions = pages;
    $scope.fields = ['id','title'];
    $scope.title = "问题类字典管理";
    $scope.new = function(){
        $location.path('/problem/new');
    };
    $scope.remove = function(index){
        var _id = pages.currentItems[index]._id;
        console.log(pages.currentItems[index].id);
        $scope.actions.currentItems.splice(index,1);
        $scope.actions.total--;
        Problem.delete({_id:_id});
        $location.path('/problem');
    };
    $scope.del = function(){
        var temp = pages.currentItems;
        for(var i = temp.length -1 ; i >= 0 ;i--){
            if(temp[i].flag){
                Problem.delete({_id:temp[i]._id});
                $scope.actions.currentItems.splice(i,1);
                $scope.actions.total--;
            }
        }
    };
    $scope.search = function(){
        var key = $scope.keyWord,
            value = $scope.choose;
        $http.get('/problem/search/'+value+'/'+key).success(function(data){
            console.log(data);
            $scope.actions.currentItems = data;
            $scope.actions.total = 1;
        });
    }
}]);
app.controller('list_F',['$scope','$http','Fact','PagSlice','$location',function($scope,$http,Fact,PagSlice,$location){
//    $scope.actions = actions;
    var fetch = function(a,b,callback){
        $http.get('/fact/page/'+a+'/'+b).success(callback);
    };
    var pages = PagSlice(fetch,10);
    $scope.actions = pages;
    $scope.fields1 = ['id','department','car','production_variety','process','production_line','group','content','node_name','person' +
        '','branchs.reason_actions','branchs.result','branchs.reason_actions.reason','branchs.reason_actions.actions.name'];
    $scope.fields = ['id','department','car','production_variety','process','production_line','group','content','node_name','person' ];
    $scope.title = "问题处理事实树管理";
    $scope.new = function(){
        $location.path('/fact/new');
    };
    $scope.remove = function(index){
        var _id = pages.currentItems[index]._id;
        console.log(pages.currentItems[index].id);
        Fact.delete({_id:_id});
        $scope.actions.currentItems.splice(index,1);
        $scope.actions.total--;
        $location.path('/fact');
    };
    $scope.del = function(){
        var temp = pages.currentItems;
        for(var i = temp.length -1 ; i >= 0 ;i--){
            if(temp[i].flag){
               Fact.delete({_id:temp[i]._id});
               $scope.actions.currentItems.splice(i,1);
               $scope.actions.total--;
            }
        }
        $location.path('/fact');
    };
    $scope.search = function(){
        var key = $scope.keyWord,
            value = $scope.choose;
        $http.get('/fact/search/'+value+'/'+key).success(function(data){
            console.log(data);
            $scope.actions.currentItems = data;
            $scope.actions.total = data.length;
            $scope.actions.resize();
        });
    }
}]);







app.controller('new_A',['$scope','Action','$location',function($scope,Action,$location){
    $scope.action = {};
    $scope.title = "添加元方案";
    $scope.save = function(){
        Action.save({},$scope.action);
        $location.path('/action');
    }
 }]);
app.controller('new_P',['$scope','Problem','$location',function($scope,Problem,$location){
    $scope.action = {};
    $scope.title = "添加元方案";
    $scope.save = function(){
        Problem.save({},$scope.action);
        $location.path('/problem');
    }
}]);
app.controller('new_F',['$scope','Fact','p_opts','a_opts','$location',function($scope,Fact,p_opts,a_opts,$location){
    $scope.action = {};
    $scope.title = "添加问题处理事实树";
    $scope.p_opts = p_opts;
    $scope.a_opts = a_opts
    $scope.save = function(){
        Fact.save({},$scope.action);
        $location.path('/fact');
    };
    $scope.action.branchs = [
        {
            "reason_actions" : [
                {
                    "reason" : "",
                    "actions" :  [{"name":""}]
                }
            ],
            "result" : ""
        }];
}]);