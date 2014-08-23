    function BaseDao(Model){
	       this.model = Model;
	}
	
	BaseDao.prototype.add = function (doc , callback){
		  this.model.create(doc , function (err){
		  	   if(err){
		  	   	    console.log('create wrong!');
                  return callback(err);
		  	   	}else{
	   	  	   	  console.log('create ok!');
                  callback(null);
		  	   	}
		  	});
		};
		
		BaseDao.prototype.getById = function (id , callback){
			var temp = this;
		   this.model.findOne({_id:id},function(err,model){
		   	    if(!err){
		   	    	     console.log('findone ok!');
                       callback(null,model);
		   	    }else{
		   	    		 console.log('findone wrong!');
                         callback(err,model);
		   	    }
		   	 });	
		 };
		 
		 BaseDao.prototype.getByQuery = function (query ,callback){
             this.model.find(query ,function(err , models){
		 	    	      if(!err){
                           for(var i in models){
                               console.log(i + "" + models[i]);
                           }
		 	    	      	  console.log('query ok!...' + models);
		 	    	      	  callback(null,models);
		 	    	      	}else {
		 	    	      	   console.log('query wrong!');
                            callback(err,models);
                          }
		 	    	});
		 	};


    // 完全匹配
    BaseDao.prototype.getByQuery_t = function (query ,qs ,callback){
        this.model.find(query ,function(err , models){
            if(!err){
                var len = models.length,
                    i = 0,
                    result = [],
                    total_len = qs.length;
               outer: while(i < len){
                    var temp = models[i++],
                        pros = temp["problems"],
                        p_len = pros.length,
                        j = 0;

                    if(p_len != total_len ){
                        continue outer;
                    }

                    while(j < p_len){
                        var item = pros[j++];
                        if(qs.indexOf(item['name']) == -1){
                            continue outer;
                        }
                    }
                    result.push(temp);
                }
                result.sort(function(a,b){
                     var aa = parseInt(a["count"]),
                         bb = parseInt(b["count"]),
                         ans ;
                     ans = aa >= bb ? -1 : 1;
                     return ans;
                });
                result = result.length > 5 ? result.slice(0,5) : result ;
                callback(null,result);
            }else {
                console.log('query wrong!');
                callback(err,models);
            }
        });
    };


    // 父集匹配
    BaseDao.prototype.getByQuery_tt = function (query,qs,callback){

        this.model.find(query ,function(err , models){
            if(!err){
                console.log(models.length);
                var len = models.length,
                    i = 0,
                    result = [],
                    total_len = qs.length,
                    total_ans = [];
                outer: while(i < len){
                    var temp = models[i++],
                        pros = temp["problems"],
                        p_len = pros.length,
                        j = 0,
                        item = [];

                    if(p_len <= total_len ){
                        continue outer;
                    }

                    while(j < p_len){
                        var _item = pros[j++];
                        item.push(_item["name"]);
                    }

                    j = 0;

                    while(j < total_len){
                        var my_item = qs[j++];
                        if(item.indexOf(my_item) == -1){
                            continue outer;
                        }
                    }

                    while(item.length){
                        var tip = item.pop();
                        if(total_ans.indexOf(tip) == -1){
                            total_ans.push(tip);
                        }
                    }
                }

                while(qs.length){
                    var tt = qs.pop(),
                        index = total_ans.indexOf(tt);
                    if(index != -1){
                        total_ans.splice(index,1);
                    }
                }
                callback(null,total_ans);

                console.log('123:'+total_ans);
            }else {
                console.log('query wrong!');
                callback(err,models);
            }
        });
    };



		   BaseDao.prototype.getAll = function (callback){
               console.log('getall ok!'+this.name);
		   	   this.model.find({},function(err , models){
                   if(!err){
		   	   	  	    callback(null , models);
		   	   	  	}else{
		   	   	  		 console.log('getall wrong!');
                       callback(err , models);

		   	   	  	}
		   	   	});
		   	};
           BaseDao.prototype.getAtoB = function (offSet , limtb ,callback){
                this.model.find({},function(err ,models){
                    var my_models,
                        ans = [],
                        len = models.length;
                    if(!err){
                        var _limit = parseInt(limtb);
                        my_models = models.slice(offSet ,offSet+ _limit);
                        console.log('my_models.offSet:'+offSet);
                        console.log('my_models.limtb:'+(offSet+ _limit));
                        console.log('my_models.length:'+my_models.length);
                    }else{
                        console.log('getAtoB is wrong');
                    }
                     ans.push(len);
                     ans.push(my_models)
                    callback(err,ans);
                });
    };



		   	BaseDao.prototype.delete = function (query,callback){
		   		 this.model.remove(query,function(err){
		   		 	    if(err){
		   		 	    	   console.log('delete wrong');
                            callback(err);
		   		 	    	}else{
		   		 	    		console.log('delete ok');
                             callback(null);
		   		 	    	}
		   		 	});
		   		};
		   		
		   	  BaseDao.prototype.update = function (conditions ,update,options ,callback){
                       this.model.update(conditions ,update  , options ,function(err){
                       	   if(err){
                       	   	   console.log('update wrong!');
                               callback(err);
                       	   	}else{
                       	   		 console.log('update ok!!');
                                 callback(null);
                       	   	}
                       	});		   	  	      	
		   	  	};
/*       BaseDao.prototype.update = function (conditions ,update, option1 , option2, option3 ,callback){
        this.model.update(conditions ,update,option1 , option2, option3,function(err){
            if(err){
                console.log('update wrong!');
                callback(err);
            }else{
                console.log('update ok!!');
                callback(null);
            }
        });
    };*/


			 module.exports = BaseDao;