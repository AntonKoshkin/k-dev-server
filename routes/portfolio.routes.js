const portfolioController	= require('../controllers/portfolio.controller');

module.exports = app => {
	app.get('/portfolio', portfolioController.get);

	app.get('/portfolio/:id', portfolioController.getOne);

	app.post('/portfolio', portfolioController.post);

	app.delete('/portfolio', portfolioController.delete);

	app.put('/portfolio', portfolioController.put);
};
