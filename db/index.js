const MongoClient 	= require('mongodb').MongoClient;
const asyncSeries		= require('async').series;
const asyncParallel	= require('async').parallel;
const config			= require('../config');

let state = {
	db: null,
};

exports.connect = (url, done) => {
	if (state.db) {
		return done();
	}

	MongoClient.connect(url, (err, db) => {
		if (err) {
			return done(err);
		}
		state.db = db;
		done();
	});
};

exports.get = () => state.db;

function connect(cb) {
	MongoClient.connect(config.get('mongo:uri'), (err, db) => {
		if (err) {
			return cb(err);
		}
		state.db = db;
		cb();
	});
}

function drop(cb) {
	state.db.dropDatabase(cb);
}

function writePersonal(cb) {
	state.db.collection('personal').insert(
		{
			id  : 1,
			name: {
				first : 'firstName',
				middle: 'middleName',
				last  : 'lastName',
			},
			birthDate: {
				day  : 'birthDay',
				month: 'birthMonth',
				year : 'birthYear',
			},
			photo      : null,
			livingPlace: {
				country: 'livingCountry',
				state  : 'livingState',
				city   : 'livingCity',
			},
		}
	);
	cb();
}

function write(cb) {
	asyncParallel([
		writePersonal
	], cb);
}

exports.createDb = () => {
	asyncSeries([
		connect,
		drop,
		write
	]);
};
