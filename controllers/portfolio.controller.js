const portfolioModel = require('../models/portfolio.model');

exports.get = (req, res) => {
	portfolioModel.get((err, docs) => {
		if (err) {
			console.log(err);
			res.sendStatus(500);
			return;
		}
		docs.forEach(project => {
			project.link	= project.links.filter(link => link.main)[0];
			project.image	= project.images.filter(image => image.main)[0];

			project.id = project._id; // eslint-disable-line

			delete project.link.main;
			delete project.images;
			delete project.descriptions;
			delete project.links;
			delete project._id; // eslint-disable-line
		});
		res.send(docs);
	});
};

exports.getOne = (req, res) => {
	portfolioModel.getOne(
		req.params.id,
		(err, doc) => {
			if (err) {
				console.log(err);
				res.sendStatus(500);
				return;
			}
			res.send(doc);
		}
	);
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
