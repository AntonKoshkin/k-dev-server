const express	= require('express');
const db			= require('./db');

const app = express();

db.connect('mongodb://localhost:27017/myapi', (err) => {
	if (err) {
		console.log(err);
		return false;
	}
	db.createDb();
	app.listen(3012, () => {
		console.log('api app started');
	});
});
