var Book = require('../models').book;
var Promise = require('bluebird');
var _ = require('underscore');



exports.create = function(req, res) {
	var newbook = new Book({
		name: req.body.name,
		author: req.body.author,
	});
	newbook.save(function(err, book) {
		if (err) return res.json({
			success: false,
			msg: err
		});
		res.json({
			success: true,
			data: book
		});
	});
};



exports.GetAllbook = function(req, res) {
	Book.find().exec(function(err, books) {
		if (err) return res.json({
			success: false,
			msg: err
		});
		res.json({
			success: true,
			data: books
		});
	});
};

exports.GetbookById = function(req, res) {
	Book.findOne({
		id: req.params.id
	}).exec(function(err, book) {
		if (err) {
			return res.json({
				success: false,
				msg: err
			});
		}
		if (!book) {
			return res.json({
				success: false,
				msg: "Can't find this book"
			});
		}
		res.json({
			success: true,
			data: book
		});
	});
};

exports.saveImage = function(req, res) {
	console.log(req.files.file[0]);
	if (req.files.file[0] === undefined) {
		console.log('hello')
		req.files.file = [req.files.file];
	}

	Book.findOneAsync({
		id: parseInt(req.body.book)
	}).then(function(book) {
		if (!book) {
			return 'no book';
		} else {
			var allimages = _.map(req.files.file, function(f) {
				console.log(f);
				f = _.pick(f, 'name', 'path', 'mimetype', 'size');
				// console.log(_.pick(f, 'name', 'path', 'mimetype', 'size'))

				f.path = f.path.match(/public(.+)/)[1];
				return f;
			});

			book.images = [].concat(allimages);
			console.log(book.images);
			return book.saveAsync();
		}
	}).then(function(savedbook) {

		if (savedbook == 'no book') {
			return res.json({
				success: false,
				msg: savedbook
			});
		}
		res.json({
			success: true,
			data: savedbook
		});
	}).error(function(err) {
		res.json({
			success: false,
			msg: err
		});
	});

};

exports.destroy = function(req, res) {
	if (!req.params.id) return res.json({
		success: false,
		msg: "no param"
	});

	Book.remove({
		_id: req.params.id
	}).exec(function(err) {
		if (err) return res.json({
			success: false,
			msg: err
		});
		return res.json({
			success: true
		});
	});
};