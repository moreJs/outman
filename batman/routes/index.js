
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { name: 'Express' });
};
exports.test = function(req,res){
    res.render('test');
}