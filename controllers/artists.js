const Artists = require('../models/artists');

exports.all = (req, res) => {
	Artists.all((err, docs) => {
		if (err) {
			console.log(err);
			res.sendStatus(500);
			return;
		}
		res.send(docs);
	});
};

exports.findById = (req, res) => {
	Artists.findById(req.params.id, (err, doc) => {
		if (err) {
			console.log(err);
			res.sendStatus(500);
			return;
		}
		res.send(doc);
	});
};

exports.create = (req, res) => {
	Artists.create(
		{name: req.body.name},
		(err, result) => {
			if (err) {
				console.log(err);
				res.sendStatus(500);
				return;
			}
			res.send(result);
		}
	);
};

exports.update = (req, res) => {
	Artists.update(
		req.params.id,
		{name: req.body.name},
		(err, result) => {
			if (err) {
				console.log(err);
				res.sendStatus(500);
				return;
			}
			res.send(result);
		}
	);
};

exports.delete = (req, res) => {
	Artists.delete(
		req.params.id,
		(err, result) => {
			if (err) {
				console.log(err);
				res.sendStatus(500);
				return;
			}
			res.send(result);
		}
	);
};
