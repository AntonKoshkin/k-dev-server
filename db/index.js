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
	MongoClient.connect(config.get('mongo:kdev'), (err, db) => {
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

const writeData = {
	personal(cb) {
		state.db.collection('personal').insert({
			_id : 1,
			name: {
				first : 'firstName',
				middle: 'middleName',
				last  : 'lastName',
			},
			birth: {
				day  : 10,
				month: 2,
				year : 1990,
			},
			images: [
				{
					small: '/qwe/qwe.small.jpg',
					large: '/qwe/qwe.large.jpg',
					thumb: '/qwe/qwe.thumb.jpg',
				}, {
					small: '/qwe/qwe.small.jpg',
					large: '/qwe/qwe.large.jpg',
					thumb: '/qwe/qwe.thumb.jpg',
				}
			],
			contacts: [
				{
					name : 'name',
					title: 'title',
					link : 'link',
				}, {
					name : 'name2',
					title: 'title2',
					link : 'link2',
				}
			],
		}, cb);
	},
};

function write(cb) {
	asyncParallel([
		writeData.personal
	], cb);
}

exports.createDb = (cb) => {
	asyncSeries([
		connect,
		drop,
		write
	], cb);
};
