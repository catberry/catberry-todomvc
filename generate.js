'use strict';

var size = Number(process.argv[2]);

if (isNaN(size)) {
	console.error('You should specify data size by the first parameter');
	process.exit();
	return;
}

var POSSIBLE_NAMES = [
	'Eric', 'Aaron', 'Dennis', 'Julia',
	'John', 'Federic', 'Thomas', 'Pieter'
];

var POSSIBLE_SURNAMES = [
	'Newton', 'Smith', 'Johnson', 'Ritchie',
	'Ocean', 'Castle', 'Torwalds', 'Einstein'
];

function random(array) {
	return array[Math.floor(Math.random() * array.length)];
}

var result = [],
	currentName, currentSurname;

for (var i = 0; i < size; i++) {
	currentName = random(POSSIBLE_NAMES);
	currentSurname = random(POSSIBLE_SURNAMES);
	result.push({
		label: 'Tell ' + currentName + ' ' + currentSurname + ' about Catberry',
		isCompleted: Math.random() < 0.5
	});
}

var fs = require('fs'),
	file = fs.createWriteStream('./todos.json'),
	json = JSON.stringify({
		items: result
	}, null, ' ');

file.end(json);
