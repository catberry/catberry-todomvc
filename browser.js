'use strict';

const catberry = require('catberry');
const templateEngine = require('catberry-handlebars');
const Todos = require('./lib/Todos');

// config is assigned in the script included into HEAD component
// see server.js and the HEAD component for more details
const cat = catberry.create(window.$catConfig);

const logger = require('catberry-logger');
logger.register(cat.locator);

templateEngine.register(cat.locator);
cat.locator.register('todosHelper', Todos, true);

cat.startWhenReady();
