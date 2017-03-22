module.exports = app => {
	app.get('/assets', function(req, res) {
		res.sendFile(req.originalUrl);
	});
};
