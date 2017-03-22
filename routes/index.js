// const assets		= require('./assets.routes');
const personal		= require('./personal.routes');
const portfolio	= require('./portfolio.routes');
const static		= require('./static.routes');
// const fs				= require('fs');

module.exports = app => {
	if (process.env.NODE_ENV === 'development') {
		app.get('/*', function(req, res, next) {
			res.setHeader('Access-Control-Allow-Origin', '*');
			next();
		});
		// app.put('/*', function(req, res, next) {
		// 	res.setHeader('Access-Control-Allow-Origin', '*');
		// 	next();
		// });
		// app.post('/*', function(req, res, next) {
		// 	res.setHeader('Access-Control-Allow-Origin', '*');
		// 	next();
		// });
	}

	personal(app);
	portfolio(app);
	// assets(app);
	static(app);

	// assets(app);
	// app.get('/', function(req, res) {
	// 	console.log(req.originalUrl);
	// 	res.end(fs.readFileSync('../k-dev/dist/index.html'));
	// });
	// app.get('/*', function(req, res) {
	// 	res.end(fs.readFileSync('../k-dev/dist/' + req.originalUrl));
	// });
};
