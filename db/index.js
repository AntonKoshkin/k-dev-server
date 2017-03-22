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

		return false;
	});

	return false;
};

exports.get = () => state.db;

function connect(cb) {
	MongoClient.connect(config.get('mongo:kdev'), (err, db) => {
		if (err) {
			return cb(err);
		}
		state.db = db;
		cb();

		return false;
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
			birth: new Date(1991, 1, 10, 3, 50),
			mail : 'a.v.koshkin.91.gmail.com',
			phone: '79992102728',
			city : 'Санкт-Петербург',

			images: [
				{
					small : '/assets/img/personal/personal__1--large.jpg',
					large : '/assets/img/personal/personal__1--large.jpg',
					thumb : '/qwe/qwe.thumb.jpg',
					isMain: true,
				}, {
					small : '/qwe/qwe.small.jpg',
					large : '/qwe/qwe.large.jpg',
					thumb : '/qwe/qwe.thumb.jpg',
					isMain: false,
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
			skills: [
				{
					name : 'html',
					level: 100,
				}, {
					name : 'css',
					level: 100,
				}, {
					name : 'pug(jade)',
					level: 100,
				}, {
					name : 'stylus',
					level: 100,
				}, {
					name : 'javascript',
					level: 100,
				}, {
					name : 'typescript',
					level: 100,
				}, {
					name : 'jquery',
					level: 100,
				}, {
					name : 'angularjs',
					level: 100,
				}, {
					name : 'angular',
					level: 100,
				}, {
					name : 'gulp',
					level: 100,
				}, {
					name : 'webpack',
					level: 100,
				}, {
					name : 'nodejs',
					level: 100,
				}, {
					name : 'express',
					level: 100,
				}, {
					name : 'rest',
					level: 100,
				}, {
					name : 'git',
					level: 100,
				}, {
					name : 'mongodb',
					level: 100,
				}, {
					name : 'photoshop',
					level: 100,
				}, {
					name : 'illustrator',
					level: 100,
				}
			],
			about: `Привет. Меня зовут Антон. Я фронтенд разработчик.
Раньше я был электромонтажником. Интересная работа, иногда со спецэффектами, но я понял, что это не то, чему хочу посвятить всю жизнь.
Тогда я решил попробовать IT. Самый простой способ "войти в айти", как мне тогда показалось, это веб-разработка. Верно показалось.
Начал изучать верстку. Сперва самостоятельно, потом курсы прошел в |||эпике|https://epixx.ru/|||. Для полноты картины (на самом деле потому что лень писать угловые, фигурные скобки, закрывающие теги и прочее, еще и в одном файле) самостоятельно изучил Stylus, Pug(ex Jade), Gulp и начал искать работу.
Нашел ее в |||Jata.ru|https://jata.ru|||, маленьком стартапе на тот момент. Сверстал там все, что было, и фронтендер, который интегрировал мои изыски в AngularJS, начал знакомить меня с этим фреймворком. С того момента я начал погружаться в прекрасный и безграничный мир JavaScript.

На данный момент я нахожусь в поисках работы на должности фронтендера или верстальщика.`,
		}, cb);
	},
	portfolio(cb) {
		state.db.collection('portfolio').insert([
			{
				title: 'vinyl.jata.ru',
				name : 'vinyl',

				description    : 'Небольшой продающий лэндинг.',
				descriptionFull: 'Небольшой продающий лэндинг. Свертан на флексах. Самой интересной его частью были, пожалуй, различные косые элементы с тенями и изображениями в фонах.',

				params: [
					['Тип проекта', 'Коммерческий'],
					['Адаптивный', 'да']
				],
				images: [
					{
						small: '/vinyl__1--large.jpg',
						large: '/vinyl__1--large.jpg',
						alt  : '/Первый экран сайта vinyl.jata.ru',
						main : true,
					}
				],
				links: [
					{
						name       : 'Репозиторий на GitHub',
						link       : 'https://github.com/AntonKoshkin/vinyl.jata.ru',
						isAvailable: true,
						blank      : false,
						title      : 'К репозиторию',
					}, {
						name       : 'К сайту',
						link       : 'http://vinyl.jata.ru/',
						isAvailable: true,
						blank      : true,
						title      : 'На сайт в новой вкладке',
					}
				],
			}, {
				title: 'jata.ru',
				name : 'jata',

				description    : 'Многостраничный сайт проекта jata.ru.',
				descriptionFull: 'Многостраничный сайт проекта по оклейке "гражданских" машин рекламой. Редизайнутый вариант моего первого коммерческого проекта.',

				params: [
					['Тип проекта', 'Коммерческий'],
					['Адаптивный', 'да, резина']
				],
				images: [
					{
						small: '/jata__1--large.jpg',
						large: '/jata__1--large.jpg',
						alt  : '/Первый экран сайта jata.ru',
						main : true,
					}
				],
				links: [
					{
						name       : 'Репозиторий на GitHub',
						link       : 'https://github.com/AntonKoshkin/jata.ru',
						isAvailable: true,
						blank      : false,
						title      : 'К репозиторию',
					}, {
						name       : 'К сайту',
						link       : 'https://jata.ru/',
						isAvailable: true,
						blank      : true,
						title      : 'На сайт в новой вкладке',
					}
				],
			}, {
				title: '${cabinet}.jata.ru', // eslint-disable-line
				name : 'jata-cabinets',

				description    : 'Кабинеты проекта jata.ru',
				descriptionFull: 'Кабинеты проекта jata.ru. Всего их 4: водитель, рекламодатель, администратор, тестовый рекламодатель (с моковыми данными и подстказками). Дизайн один, разве что я позволил себе его поправить в админке, т.к. это внутренний ресурс. Не в ущерб функционалу, разумеется. От адаптива отказались в пользу приложений, вход с мобильных устройств закрыт. На этих проектах я начал познавать ангуляр, да и сам js. Некоторые контроллеры сделаны мной, верстка моя полностью. У меня в репозитории проект в состоянии когда я последний раз над ним работал. Разработка все еще ведется.',

				params: [
					['Тип проекта', 'Коммерческий'],
					['Адаптивный', 'нет']
				],
				images: [
					{
						small: '/jata-cabinets__1--large.jpg',
						large: '/jata-cabinets__1--large.jpg',
						alt  : '/Первый экран кабинетов jata.ru',
						main : true,
					}
				],
				links: [
					{
						name       : 'Репозиторий на GitHub',
						link       : 'https://github.com/AntonKoshkin/jata-cabinets',
						isAvailable: true,
						blank      : false,
						title      : 'К репозиторию',
					}, {
						name       : 'На страницу входа и регистрации',
						link       : 'https://reg.jata.ru/',
						isAvailable: true,
						blank      : true,
						title      : 'На сайт в новой вкладке',
					}
				],
			}, {
				title: 'daduma.ru',
				name : 'daduma',

				description    : 'Многостраничный сайт проекта daduma.ru',
				descriptionFull: 'Ресурс предоставляет информацию о законах: что за закон, о чем, на какой стадии находится, как по нему голосовали фракции и тп. Также предоставляет возможность голосовать, оставлять комментарии к законам. Проект "от создателей jata.tu", заброшен уже около года. Правда сейчас по нему вновь возобновляется работа. На этом проекте я занимался версткой (полностью) и скриптами, отвечающими за отображение.',

				params: [
					['Тип проекта', 'Коммерческий'],
					['Адаптивный', 'Да']
				],
				images: [
					{
						small: '/daduma__1--large.jpg',
						large: '/daduma__1--large.jpg',
						alt  : '/Первый экран сайта daduma.ru',
						main : true,
					}
				],
				links: [
					{
						name       : 'Репозиторий на GitHub',
						link       : 'https://github.com/AntonKoshkin/daduma',
						isAvailable: true,
						blank      : false,
						title      : 'К репозиторию',
					}, {
						name       : 'К сайту',
						link       : 'http://daduma.ru/',
						isAvailable: true,
						blank      : true,
						title      : 'На сайт в новой вкладке',
					}
				],
			}, {
				title: 'k-dev.ru',
				name : 'k-dev',

				description    : 'Мой старый сайт с портфолио.',
				descriptionFull: 'Мой старый сайт с портфолио. Его я сделал после обучения в эпике, чтобы показывать работодателям. На нем можно посмотреть мои старые учебные работы.',

				params: [
					['Тип проекта', 'Личный'],
					['Адаптивный', 'Да']
				],
				images: [
					{
						small: '/k-dev__1--large.jpg',
						large: '/k-dev__1--large.jpg',
						alt  : '/Первый экран сайта daduma.ru',
						main : true,
					}
				],
				links: [
					{
						name       : 'Репозиторий на GitHub',
						link       : 'https://github.com/AntonKoshkin/myPortfolioPage',
						isAvailable: true,
						blank      : false,
						title      : 'К репозиторию',
					}, {
						name       : 'К сайту',
						link       : 'http://k-dev.ru/',
						isAvailable: true,
						blank      : true,
						title      : 'На сайт в новой вкладке',
					}
				],
			}, {
				title: 'koshkin.xyz',
				name : 'this',

				description    : 'Мой новый сайт-портфолио с блекджеком и... в смысле с бложком и все такое.',
				descriptionFull: 'Собственно, вот этот вот сайт. Сделан на втором ангуляре. Вкрутил в него ангуляр-материал, так как дизайнер из меня ну ваще никудышный (это видно даже за этой библиотекой). Еще вкрутил ангуляр-флекс-лейоут. Чисто посмотреть, что за зверь. Бэк к нему я сделал сам в рамках знакомства с нодой и экспрессом. Долеко до нормального бэка, но для моих целей пока хватает. Сайт планирую переделать на реакт, но посмотрим. Может, буду этот до ума доводить.',

				params: [
					['Тип проекта', 'Личный'],
					['Адаптивный', 'Да']
				],
				images: [
					{
						small: '/koshkin__1--large.jpg',
						large: '/koshkin__1--large.jpg',
						alt  : '/Первый экран этого сайта.',
						main : true,
					}
				],
				links: [
					{
						name       : 'Репозиторий на GitHub',
						link       : 'https://github.com/AntonKoshkin/k-dev',
						isAvailable: true,
						blank      : false,
						title      : 'К репозиторию',
					}, {
						name       : 'На главную',
						link       : 'http://k-dev.ru/',
						isAvailable: true,
						blank      : false,
						title      : 'На сайт в этой же вкладке',
					}
				],
			}
		], cb);
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
