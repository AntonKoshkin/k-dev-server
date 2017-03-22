const personalModel = require('../models/personal.model');

exports.get = (req, res) => {
	personalModel.get((err, doc) => {
		if (err) {
			console.log(err);
			res.sendStatus(500);
			return;
		}
		res.end(JSON.stringify(doc));
	});
};

// exports.put = (req, res) => {
// 	personalModel.put(
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

// exports.addImage = (req, res) => {
// 	personalModel.addImage(
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
