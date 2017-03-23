const fs = require('fs');
const path = require('path');

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
		res.sendFile('index.html', {root: '../k-dev/dist'});
	});
	app.get('/*', function(req, res) {
		console.log('*', req.originalUrl)
		if (fs.existsSync(path.join('../k-dev/dist', req.originalUrl))) {
			res.sendFile(req.originalUrl, {root: '../k-dev/dist'});
		} else {
			res.sendFile('index.html', {root: '../k-dev/dist'});
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
