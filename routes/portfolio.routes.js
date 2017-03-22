const portfolioController	= require('../controllers/portfolio.controller');

module.exports = app => {
	app.get('/api/portfolio', portfolioController.get);

	app.get('/api/portfolio/:name', portfolioController.getOne);

	// app.post('/portfolio', portfolioController.post);

	// app.delete('/portfolio', portfolioController.delete);

	// app.put('/portfolio', portfolioController.put);
};
