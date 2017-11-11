'use strict';

const catberry = require('catberry');
const http = require('http');
const path = require('path');
const express = require('express');
const templateEngine = require('catberry-handlebars');
const Todos = require('./lib/Todos');

// configuration
const config = {
	title: 'Catberry • TodoMVC',
	server: {
		port: Number(process.env.PORT) || 3000
	},
	logger: {
		level: Number(process.env.CAT_LOG_LEVEL) || 30
	},
	isRelease: process.argv[2] === 'release',
	componentsGlob: 'catberry_components/**/cat-component.json',
	publicDirectoryPath: path.join(__dirname, 'public')
};

const cat = catberry.create(config);
const app = express();

const logger = require('catberry-logger');
logger.register(cat.locator);

const READY_MESSAGE = 'Ready to handle incoming requests on port';

templateEngine.register(cat.locator);
cat.locator.register('todosHelper', Todos);

const compression = require('compression');
const zlib = require('zlib');
app.use(compression({
	flush: zlib.Z_PARTIAL_FLUSH
}));

const serveStatic = require('serve-static');
app.use(serveStatic(config.publicDirectoryPath));

// serving client config
// CREATE A SEPARATE OBJECT HERE AND COPY REQUIRED VALUES
// FROM THE SERVER CONFIG EXCLUDING PRIVATE DATA IF NEEDED
const clientConfig = {
	title: config.title,
	isRelease: config.isRelease,
	logger: config.logger
};
const configResp = `window.$catConfig=${JSON.stringify(clientConfig)}`;
app.get('/config.js', (req, res) => res.end(configResp));

app.use(cat.getMiddleware());

const errorhandler = require('errorhandler');
app.use(errorhandler());

cat.events.on('ready', () => {
	const logger = cat.locator.resolve('logger');
	logger.info(`${READY_MESSAGE} ${config.server.port}`);
});

http
	.createServer(app)
	.listen(config.server.port);
