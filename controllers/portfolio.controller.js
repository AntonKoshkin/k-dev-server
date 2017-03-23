const portfolioModel = require('../models/portfolio.model');

exports.get = (req, res) => {
	console.log('portfolio controller get')
	portfolioModel.get((err, docs) => {
		if (err) {
			console.log(err);
			res.sendStatus(500);
			return;
		}
		docs.forEach(project => {
			project.image	= project.images.filter(image => image.main)[0];
			for (let img in project.image) {
				if (img !== 'main' && img !== 'alt') {
					project.image[img] = '/assets/img/portfolio' + project.image[img];
				}
			}

			delete project._id; // eslint-disable-line
			delete project.descriptionFull;
			delete project.params;
			delete project.images;
		});
		res.send(docs);
	});
};

exports.getOne = (req, res) => {
	console.log('portfolio controller get one');
	portfolioModel.getOne(
		req.params.name,
		(err, doc) => {
			if (err) {
				console.log(err);
				res.sendStatus(500);
				return;
			}
			if (doc) {
				doc.images.forEach(image => {
					for (let img in image) {
						if (img !== 'main' && img !== 'alt') {
							console.log('img', img)
							image[img] = '/assets/img/portfolio' + image[img];
						}
					}
				});
				delete doc.description;
				delete doc._id; // eslint-disable-line
			}
			res.end(doc);
		}
	);
};

// exports.post = (req, res) => {
// 	portfolioModel.post(
// 		req.body,
// 		(err, result) => {
// 			if (err) {
// 				console.log(err);
// 				res.sendStatus(500);
// 				return;
// 			}
// 			res.send(result);
// 		}
// 	);
// };

// exports.delete = (req, res) => {
// 	portfolioModel.delete(
// 		req.body.id,
// 		(err, result) => {
// 			if (err) {
// 				console.log(err);
// 				res.sendStatus(500);
// 				return;
// 			}
// 			res.send(result);
// 		}
// 	);
// };

// exports.put = (req, res) => {
// 	portfolioModel.put(
// 		req.body,
// 		(err, docs) => {
// 			if (err) {
// 				console.log(err);
// 				res.sendStatus(500);
// 				return;
// 			}
// 			res.send(docs);
// 		}
// 	);
// };
