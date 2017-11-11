'use strict';

const templateEngine = require('catberry-handlebars');
const catberry = require('catberry');
const cat = catberry.create({
	isRelease: process.argv[2] === 'release'
});

const logger = require('catberry-logger');
logger.register(cat.locator);

templateEngine.register(cat.locator);
cat.build();
