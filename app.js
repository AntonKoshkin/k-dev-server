const express		= require('express');
const db				= require('./db');
const config		= require('./config');
const fileUpload	= require('express-fileupload');
const logger		= require('morgan');
const bodyParser	= require('body-parser');

const app = express();

app.use(fileUpload());
app.use(logger('dev'));
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({extended: false, limit: '5mb'}));

if (process.env.NODE_ENV === 'production') {
	console.log('production mode');
	db.connect(config.get('mongo:kdev'), err => {
		if (err) {
			console.log(err);
			return false;
		}
		app.listen(config.get('port'), () => {
			require('./routes')(app);
			console.log('api app started');
		});
	});
} else {
	console.log('development mode');
	db.createDb(() => {
		app.listen(config.get('port'), () => {
			require('./routes')(app);
			console.log('api app started');
		});
	});
}

