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
                           for(var i in query){
                               console.log(i + "" + query[i]);
                           }
		 	    	      	  console.log('query ok!...' + models);
		 	    	      	  callback(null,models);
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