const express		= require('express');
const db				= require('./db');
const config		= require('./config');
const fileUpload	= require('express-fileupload');
const logger		= require('morgan');
const bodyParser	= require('body-parser');
const path			= require('path');

const app = express();

app.use(fileUpload());
app.use(logger('dev'));
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({extended: false, limit: '5mb'}));

// app.get('/', function(req, res) {
// 	res.sendFile('index.html', {root: '../k-dev/dist'});
// });

app.use('/assets', express.static(path.join(__dirname, 'assets')));
// app.use(express.static(path.join(__dirname, '../k-dev/dist')));

if (process.env.NODE_ENV === 'production') {
	console.log('production mode');
	db.connect(config.get('mongo:kdev'), err => {
		if (err) {
			console.log(err);
			return false;
		}
		app.listen(config.get('port'), () => {
			require('./routes')(app);
			console.log(process.env.NODE_ENV, 'api started');
		});

		return false;
	});
} else {
	console.log('development mode');
	db.createDb(() => {
		app.listen(config.get(process.env.NODE_ENV === 'production' ? 'prodPort' : 'port'), () => {
			require('./routes')(app);
			console.log(process.env.NODE_ENV, 'api started');
		});
	});
}

// app.get('/*', function(req, res) {
// 	res.sendfile('index.html', {root: '../k-dev/dist'});
// });
