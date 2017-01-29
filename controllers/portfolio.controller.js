const portfolioModel = require('../models/portfolio.model');

exports.get = (req, res) => {
	portfolioModel.get((err, docs) => {
		if (err) {
			console.log(err);
			res.sendStatus(500);
			return;
		}
		res.send(docs);
	});
};

exports.post = (req, res) => {
	portfolioModel.post(
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

exports.delete = (req, res) => {
	portfolioModel.delete(
		req.body.id,
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

exports.put = (req, res) => {
	portfolioModel.put(
		req.body,
		(err, docs) => {
			if (err) {
				console.log(err);
				res.sendStatus(500);
				return;
			}
			res.send(docs);
		}
	);
};
