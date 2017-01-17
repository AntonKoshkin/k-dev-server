const artistsController = require('../controllers/artists');

module.exports = app => {
	app.get('/artists', artistsController.all);

	app.get('/artists/:id', artistsController.findById);

	app.post('/artists', artistsController.create);

	app.put('/artists/:id', artistsController.update);

	app.delete('/artists/:id', artistsController.delete);
};
