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
			image: [
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
	portfolio(cb) {
		state.db.collection('portfolio').insert({
			title: 'one portfolio work',
			image: {
				small: 'small.image',
				large: 'large.image',
			},
			description: [
				{
					title    : 'block 1 title',
					paragraph: 'Далеко-далеко за словесными горами в стране, гласных и согласных живут рыбные тексты. Послушавшись свой даже вдали несколько строчка если. Пояс предупреждал скатился подпоясал инициал. Дал даль решила живет переписали языкового переписывается предложения.',
				}, {
					title    : 'block 2 title',
					paragraph: 'Далеко-далеко за словесными горами в стране, гласных и согласных живут рыбные тексты. Правилами раз всеми приставка до, скатился букв речью эта даль курсивных города повстречался переписали по всей проектах меня вопрос парадигматическая. Родного.',
				}
			],
			links: [
				{
					place: 'first place',
					link : 'place/first.qwe',
				}, {
					place: 'second place',
					link : 'place/seconf.qwe',
				}
			],
		}, cb);
	},
};

function write(cb) {
	asyncParallel([
		writeData.personal,
		writeData.portfolio
	], cb);
}

exports.createDb = (cb) => {
	asyncSeries([
		connect,
		drop,
		write
	], cb);
};
