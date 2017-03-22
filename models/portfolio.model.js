const db			= require('../db');
const ObjectID	= require('mongodb').ObjectID;

exports.get = cb => {
	db.get().collection('portfolio')
		.find().toArray((err, docs) => {
			cb(err, docs);
		});
};

exports.getOne = (name, cb) => {
	db.get().collection('portfolio')
		.findOne(
			{name},
			(err, docs) => {
				cb(err, docs);
			}
		);
};

exports.post = (portfolioItem, cb) => {
	db.get().collection('portfolio')
		.insert(
			portfolioItem,
			(err, result) => cb(err, result)
		);
};

exports.delete = (id, cb) => {
	db.get().collection('portfolio')
		.deleteOne(
			{_id: ObjectID(id)},
			(err, result) => cb(err, result)
		);
};

exports.put = (id, newData, cb) => {
	db.get().collection('portfolio')
		.updateOne(
			{_id: ObjectID(id)},
			{$push: newData},
			(err, result) => cb(err, result)
		);
};
