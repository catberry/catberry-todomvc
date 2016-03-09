'use strict';

const IS_RELEASE = process.argv.length === 3 ?
	process.argv[2] === 'release' : undefined;

const templateEngine = require('catberry-handlebars');
const catberry = require('catberry');
const cat = catberry.create({
	isRelease: IS_RELEASE
});

templateEngine.register(cat.locator);
cat.build();
