/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
const CACHE_NAME = 'version-1';
const urlsToCache = [
	'/',
	'index.html',
	'offline.html',
	'https://todo-restapi-app.herokuapp.com/api/todos',
	'/todo',
	'https://todo-restapi-app.herokuapp.com/api/',
];

const self = this;

// Install SW
self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			console.log('Opened cache');

			return cache.addAll(urlsToCache);
		})
	);
});

// Listen for requests
self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches
			.match(event.request)
			.then(() => fetch(event.request).catch(() => caches.match('offline.html')))
	);
});

// Activate the SW
self.addEventListener('activate', (event) => {
	const cacheWhitelist = [];
	cacheWhitelist.push(CACHE_NAME);

	event.waitUntil(
		caches.keys().then((cacheNames) =>
			Promise.all(
				cacheNames.map((cacheName) => {
					if (!cacheWhitelist.includes(cacheName)) {
						return caches.delete(cacheName);
					}
				})
			)
		)
	);
});
