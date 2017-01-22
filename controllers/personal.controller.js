const personal = require('../models/personal.model');

exports.get = (req, res) => {
	personal.get((err, doc) => {
		if (err) {
			console.log(err);
			res.sendStatus(500);
			return;
		}
		res.send(doc);
	});
};

exports.put = (req, res) => {
	personal.put(
		req.body,
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

exports.addImage = (req, res) => {
	console.log('files', req.body)
	personal.addImage(
		req.body,
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
