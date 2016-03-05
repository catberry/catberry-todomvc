'use strict';

const SIZE = Number(process.argv[2]);

if (isNaN(SIZE)) {
	console.error('You should specify data size by the first parameter'); // eslint-disable-line no-console
	process.exit();
	return;
}

const POSSIBLE_NAMES = [
	'Eric', 'Aaron', 'Dennis', 'Julia',
	'John', 'Federic', 'Thomas', 'Pieter'
];

const POSSIBLE_SURNAMES = [
	'Newton', 'Smith', 'Johnson', 'Ritchie',
	'Ocean', 'Castle', 'Torwalds', 'Einstein'
];

/**
 * Gets a random element in an array
 * @param {Array<string>} array
 * @returns {string}
 */
function random(array) {
	return array[Math.floor(Math.random() * array.length)];
}

const result = [];

for (let i = 0; i < SIZE; i++) {
	const currentName = random(POSSIBLE_NAMES);
	const currentSurname = random(POSSIBLE_SURNAMES);
	result.push({
		label: `Tell ${currentName} ${currentSurname} about Catberry`,
		isCompleted: Math.random() < 0.5
	});
}

const fs = require('fs');
const file = fs.createWriteStream('./todos.json');
const json = JSON.stringify({
	items: result
}, null, ' ');

file.end(json);
