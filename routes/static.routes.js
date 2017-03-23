const fs = require('fs');
const path = require('path');
const CONFIG = require('../config');

module.exports = app => {
	// app.get('/assets', function(req, res) {
	// 	console.log('assets', req.originalUrl)
	// 	res.sendFile(path.join(__dirname, req.originalUrl));
	// });

	// app.get('/img', function(req, res) {
	// 	console.log('img', req.originalUrl)
	// 	res.sendFile(req.originalUrl, {root: '../k-dev/dist'});
	// });

	app.get('/', function(req, res) {
		console.log('/', req.originalUrl)
		res.sendFile('index.html', {root: CONFIG.get('pathTo:public')});
	});
	app.get('/*', function(req, res) {
		console.log('*', req.originalUrl)
		if (fs.existsSync(path.join(CONFIG.get('pathTo:public'), req.originalUrl))) {
			res.sendFile(req.originalUrl, {root: CONFIG.get('pathTo:public')});
		} else {
			res.sendFile('index.html', {root: CONFIG.get('pathTo:public')});
		}
		// fs.readFileSync(path.join('../k-dev/dist', req.originalUrl), (err, file) => {
		// 	if (err) {
		// 		console.log('ERRRROR!!!')
		// 	} else {
		// 		console.log('OK!');
		// 		res.sendFile(file);
		// 	}
		// });
	});
	// app.get('/', function(req, res) {
	// 	console.log(req.originalUrl);
	// 	res.end(fs.readFileSync('../k-dev/dist/index.html'));
	// });
	// app.get('/*', function(req, res) {
	// 	res.end(fs.readFileSync('../k-dev/dist/' + req.originalUrl));
	// });
	// app.get('/*', function(req, res) { 
	// 	res.sendFile(__dirname + '/index.html')
	// });
};
