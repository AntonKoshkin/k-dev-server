const portfolioController	= require('../controllers/portfolio.controller');
// const bodyParser				= require('body-parser');

module.exports = app => {
	app.get('/portfolio', portfolioController.get);

	app.post('/portfolio', portfolioController.post);

	app.delete('/portfolio', portfolioController.delete);

	app.put('/portfolio', portfolioController.put);
};
