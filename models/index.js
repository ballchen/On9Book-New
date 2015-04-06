var Promise = require('bluebird');
var local = require('../config/local');


var mongodb_uri = 'mongodb://' + local.model.mongo.options.host + '/' + local.model.mongo.database;


var mongoose = require('mongoose');
Promise.promisifyAll(mongoose);
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);


var bookSchema = require('./book').book(mongoose, autoIncrement);


var book = mongoose.model('book', bookSchema);

mongoose.connect(mongodb_uri);
exports.book = book;