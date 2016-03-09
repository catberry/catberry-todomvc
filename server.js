'use strict';

const IS_RELEASE = process.argv.length >= 3 ?
	process.argv[2] === 'release' : undefined;
const PORT = process.argv.length >= 4 ?
	Number(process.argv[3]) : undefined;

const catberry = require('catberry');
const http = require('http');
const path = require('path');
const connect = require('connect');
const config = require('./config/environment.json');
const templateEngine = require('catberry-handlebars');
const Todos = require('./lib/Todos');
const cat = catberry.create(config);
const app = connect();

const PUBLIC_PATH = path.join(__dirname, 'public');
const READY_MESSAGE = 'Ready to handle incoming requests on port';

config.publicPath = PUBLIC_PATH;
config.server.port = PORT || config.server.port || 3000;
config.isRelease = IS_RELEASE === undefined ? config.isRelease : IS_RELEASE;

templateEngine.register(cat.locator);
cat.locator.register('todosHelper', Todos);

var serveStatic = require('serve-static');
app.use(serveStatic(PUBLIC_PATH));

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
