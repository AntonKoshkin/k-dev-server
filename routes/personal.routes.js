const personalController	= require('../controllers/personal.controller');
const bodyParser				= require('body-parser');

module.exports = app => {
	app.get('/personal', personalController.get);

	app.put('/personal', personalController.put);

	app.post(
		'/personal/image',
		bodyParser.urlencoded({
			keepExtensions: true,
			limit         : 1024 * 1024 * 10,
			defer         : true,
			extended      : true,
		}),
		personalController.addImage);
};
