module.exports = app => {
	if (process.env.NODE_ENV === 'development') {
		app.get('/*', function(req, res, next) {
			res.setHeader('Access-Control-Allow-Origin', '*');
			next();
		});
		app.post('/*', function(req, res, next) {
			res.setHeader('Access-Control-Allow-Origin', '*');
			next();
		});
	}

	require('./personal.routes')(app);
};
