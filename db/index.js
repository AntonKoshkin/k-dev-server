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
			_id  : 1,
			name : 'Антон Кошкин',
			age  : 25,
			mail : 'a.v.koshkin.91.gmail.com',
			phone: '79992102728',
			city : 'Санкт-Петербург',

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
					name : 'VKontakte',
					title: 'я в ВКонтакте',
					link : 'https://vk.com/scink',
				}, {
					name : 'GitHub',
					title: 'мой код',
					link : 'https://github.com/AntonKoshkin',
				}
			],
			about: `Привет. Меня зовут Антон. Я фронтенд разработчик.
Но раньше я был электромонтажником. Интересная работа, иногда со спецэффектами, но я понял, что это не то, чему хочу посвятить всю жизнь.
Тогда я решил попробовать IT. Самый простой способ "войти в айти", как мне тогда показалось, это веб-разработка. Верно показалось.
В программировании я был не бум-бум, так что полез в верстку. Дальше стандартно (наверное): статьи, ютуб, иногда документации. Само собой получилась каша, пошел на |||курсы|https://epixx.ru/|||. Для полноты картины (на самом деле потому что лень писать угловые, фигурные скобки, закрывающие теги и прочее, еще и в одном файле) самостоятельно изучил Stylus, Pug(ex Jade), Gulp и начал искать работу.
Нашел ее в |||Jata.ru|https://jata.ru|||, маленьком стартапе на тот момент. Сверстал там все, что было, и фронтендер, который интегрировал мои изыски с AngularJS, начал знакомить меня с этим фреймворком. С того момента я начал погружаться в прекрасный и безграничный мир js.`,
		}, cb);
	},
	portfolio(cb) {
		state.db.collection('portfolio').insert({
			title: 'one portfolio work',

			description: 'Далеко-далеко за словесными горами в стране, гласных и согласных живут рыбные тексты. Рукопись живет несколько лучше пояс что текстами грамматики не, эта!',

			images: [
				{
					small: 'https://pp.vk.me/c638329/v638329785/1910d/XJb1caJ2Bwg.jpg',
					large: 'large.image',
					alt  : 'some alt',
					main : true,
				}, {
					small: 'small.image',
					large: 'large.image',
					alt  : 'some alt',
					main : false,
				}
			],
			descriptions: [
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
					name: 'first place',
					link: 'place/first.qwe',
					main: true,
				}, {
					name: 'second place',
					link: 'place/seconf.qwe',
					main: false,
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
