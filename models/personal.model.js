const db				= require('../db');
// const ObjectID		= require('mongodb').ObjectID;
// const fileUpload	= require('express-fileupload');

// const CONFIG = require('../config');

exports.get = cb => {
	db.get().collection('personal').find().toArray((err, doc) => {
		let docToSend = doc[0];

		if (docToSend._id) {
			delete docToSend._id;
		}
		docToSend.phone = docToSend.phone.split('').reverse().join('');
		docToSend.mail = docToSend.mail.split('').reverse().join('');
		cb(err, docToSend);
	});
};

exports.put = (newData, cb) => {
	db.get().collection('personal').updateOne(
		{_id: 1},
		{$set: newData},
		(err, result) => cb(err, result)
	);
};

exports.addImage = (img, cb) => {
	// console.log('img', )
	// укладка картинки в фс
	// создание мелкого
	// укладка его в фс
	// созвание миниатюры
	// укладка ее в фс
	const image = {
		large: 'img' + 'large',
		small: 'img' + 'small',
		thumb: 'img' + 'thumb',
	};

	db.get().collection('personal').updateOne(
		{_id: 1},
		{$push: {images: image}},
		(err, result) => cb(err, result)
	);
};
