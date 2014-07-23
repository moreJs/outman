var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/batman');
exports.mongoose = mongoose;
exports.Schema =  mongoose.Schema;