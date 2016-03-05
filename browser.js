'use strict';

const catberry = require('catberry');
const templateEngine = require('catberry-handlebars');
const Todos = require('./lib/Todos');

// this config will be replaced by `./config/browser.json` when building
// because of `browser` field in `package.json`
const config = require('./config/environment.json');
const cat = catberry.create(config);

templateEngine.register(cat.locator);
cat.locator.register('todosHelper', Todos, true);

cat.startWhenReady();
