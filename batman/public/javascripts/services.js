var service = angular.module('batman.service',['ngResource']);

//restfull资源
service.factory('Action',['$resource',function($resource){
    return $resource('/action/:_id',{_id:'@_id'});
}]);
service.factory('Problem',['$resource',function($resource){
    return $resource('/problem/:_id',{_id:'@_id'});
}]);
service.factory('Fact',['$resource',function($resource){
    return $resource('/fact/:_id',{_id:'@_id'});
}]);
service.factory('Net',['$resource',function($resource){
    return $resource('/net/:_id',{_id:'@_id'});
}]);
//整体加载器
service.factory('MultiActionLoader',['Action','$q',function(Action,$q){
    return function(){
       var delay = $q.defer();
       Action.query(function(actions){
           delay.resolve(actions);
       },function(){
           delay.reject("unable to fetch action");
       });
       return delay.promise;
    };
}]);
service.factory('MultiProblemLoader',['Problem','$q',function(Problem,$q){
    return function(){
        var delay = $q.defer();
        Problem.query(function(problems){
            delay.resolve(problems);
        },function(){
            delay.reject("unable to fetch action");
        });
        return delay.promise;
    };
}]);
service.factory('MultiFactLoader',['Fact','$q',function(Fact,$q){
    return function(){
        var delay = $q.defer();
        Fact.query(function(facas){
            delay.resolve(facas);
        },function(){
            delay.reject("unable to fetch action");
        });
        return delay.promise;
    };
}]);
service.factory('MultiNetLoader',['Net','$q',function(Net,$q){
    return function(){
        var delay = $q.defer();
        Net.query(function(facas){
            delay.resolve(facas);
        },function(){
            delay.reject("unable to fetch action");
        });
        return delay.promise;
    };
}]);
//单个加载器
service.factory('ActionLoader',['Action','$route','$q',function(Action,$route,$q){
    return function(){
        var delay = $q.defer();
        Action.get({_id:$route.current.params._id},function(action){
            delay.resolve(action);
        },function(){
            delay.reject('unable to fetch action');
        });
        return delay.promise;
    }
}]);
service.factory('ProblemLoader',['Problem','$route','$q',function(Problem,$route,$q){
    return function(){
        var delay = $q.defer();
        Problem.get({_id:$route.current.params._id},function(problem){
            delay.resolve(problem);
        },function(){
            delay.reject('unable to fetch action');
        });
        return delay.promise;
    }
}]);
service.factory('FactLoader',['Fact','$route','$q',function(Fact,$route,$q){
    return function(){
        var delay = $q.defer();
        Fact.get({_id:$route.current.params._id},function(fact){
            delay.resolve(fact);
        },function(){
            delay.reject('unable to fetch action');
        });
        return delay.promise;
    }
}]);
service.factory('NetLoader',['Net','$route','$q',function(Net,$route,$q){
    return function(){
        var delay = $q.defer();
        Net.get({_id:$route.current.params._id},function(fact){
            delay.resolve(fact);
        },function(){
            delay.reject('unable to fetch action');
        });
        return delay.promise;
    }
}]);
//分页服务
service.factory('PagSlice',function(){
    return function(fetchFunction,pageSize){
        var ans =  {
           //当前起始id
            currentOffSet : 0,
           //当前的结果集
            currentItems : [],
            hasNext : false,
            total: 0,
            isNext : function (){
            return this.hasNext;
           },
           isPro: function(){
               return this.currentOffSet != 0;
           },
            resize : function(){
                this.currentOffSet = 0;
                this.hasNext = false;
            },
           load : function(){
               var that = this;
               fetchFunction(that.currentOffSet,pageSize+1,function(data){
                   that.total = that.total == 0 ? parseInt(data[0]):that.total;
                   var data = data[1];
                   if(data.length == pageSize+1){
                        that.hasNext = true;
                        that.currentItems = data.slice(0,pageSize);
                   }else{
                       that.currentItems = data;
                   }
                   for(var i = 0 ; i < that.currentItems.length;i++){
                       console.log(that.currentItems[i]);
                   }
               });
           },
            next : function(){
                if(this.isNext()){
                    this.currentOffSet += pageSize;
                    this.load();
                }
            },
            pro : function(){
                if(this.isPro()){
                    this.currentOffSet -= pageSize;
                    this.load();
                }
            }
        };
        ans.load();
        return ans;
    }
});