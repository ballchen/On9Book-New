var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var mkdirp = require('mkdirp');
var mime = require('mime');
var fs = require('fs');


var routes = require('./routes/index');
var book_api = require('./routes/book_api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(multer({
    dest: './public/uploads/',
    rename: function(fieldname, filename, req, res) {
        return filename.replace(/\W+/g, '-').toLowerCase() + Date.now() + '.' + mime.extension(req.body.type);
    },
    changeDest: function(dest, req, res) {
        var stat = null;
        dest = dest + '/' + req.body.book;
        try {
            // using fs.statSync; NOTE that fs.existsSync is now deprecated; fs.accessSync could be used but is only nodejs >= v0.12.0
            stat = fs.statSync(dest);
        } catch (err) {
            // for nested folders, look at npm package "mkdirp"
            fs.mkdirSync(dest);
        }

        if (stat && !stat.isDirectory()) {
            // Woh! This file/link/etc already exists, so isn't a directory. Can't save in it. Handle appropriately.
            throw new Error('Directory cannot be created because an inode of a different type exists at "' + dest + '"');
        }
        return dest;
    }
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
app.get('/partial/:name', routes.partial);


app.post('/api/book', book_api.create);
app.post('/api/book/upload', book_api.saveImage);
app.get('/api/book', book_api.GetAllbook);
app.get('/api/book/:id', book_api.GetbookById);
app.delete('/api/book/:id', book_api.destroy);

app.get('*', routes.index);


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



module.exports = app;