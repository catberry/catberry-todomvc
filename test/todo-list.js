/* eslint-disable strict, prefer-template, prefer-arrow-callback, require-jsdoc */

var config = require('../config/environment.json');
var todos = require('../todos.json');
var fs = require('fs');

phantom.casperTest = true;
phantom.casperPath = fs.workingDirectory + '/node_modules/casperjs';
phantom.injectJs(phantom.casperPath + '/bin/bootstrap.js');

var casper = require('casper').create({
	verbose: true,
	logLevel: 'debug'
});

var failures = [];
var URL = 'http://localhost:' + config.server.port;
var ACTIVE_TODOS_COUNT = getActiveTodosCount();
var COMPLETED_TODOS_COUNT = getCompletedTodosCount();
var NUMBER_OF_TESTS = 18;

casper.test.on('fail', function(failure) {
	failures.push(failure);
});

casper.test.begin('TodoMVC tests in browser', NUMBER_OF_TESTS, function(test) {
	casper.start();
	casper.wait(20000);
	casper.thenOpen(URL, function() {
		test.assertTitle(config.title, 'Page title is the one expected');
		test.assertSelectorHasText('.selected', 'All', 'Current filter is "all"');
		test.assertElementCount('.todo-list > li', todos.items.length, 'All default todos were rendered');
		test.assertSelectorHasText('.todo-count > strong', ACTIVE_TODOS_COUNT, 'Number of active todos is right.');
	});

	casper.thenOpen(URL + '/completed', function() {
		test.assertSelectorHasText('.selected', 'Completed', 'Current filter is "completed"');
		test.assertElementCount('.todo-list > li', COMPLETED_TODOS_COUNT, 'Only completed todos were rendered');
		test.assertSelectorHasText('.todo-count > strong', ACTIVE_TODOS_COUNT, 'Number of active todos is right.');
	});

	casper.back(function() {
		test.assertSelectorHasText('.selected', 'All', 'Current filter is "all"');
		test.assertElementCount('.todo-list > li', todos.items.length, 'All default todos were rendered');
	});

	casper.thenOpen(URL + '/active', function() {
		test.assertSelectorHasText('.selected', 'Active', 'Current filter is "active"');
		test.assertElementCount('.todo-list > li', ACTIVE_TODOS_COUNT, 'Only active todos were rendered');
		test.assertSelectorHasText('.todo-count > strong', ACTIVE_TODOS_COUNT, 'Number of active todos is right.');
	});

	casper.thenClick('li:not(.completed) .toggle', function() {
		test.assertSelectorHasText('.todo-count > strong', ACTIVE_TODOS_COUNT - 1,
			'After completing a todo number of active todos is right.');
	});

	casper.thenOpen(URL, function() {
		test.assertSelectorHasText('.selected', 'All', 'Current filter is "all"');
		this.fillSelectors('form', {
			'.new-todo': 'Test TodoMVC'
		}, true);
	});

	casper.then(function() {
		test.assertElementCount('.todo-list > li', todos.items.length + 1, 'New todo was added.');
	});

	casper.thenClick('a[href="/active"]');

	casper.then(function() {
		test.assertSelectorHasText('.selected', 'Active', 'Current filter is "active"');
		test.assertEqual(casper.getCurrentUrl(), URL + '/active', 'Routing works.');
	});

	casper.thenClick('.toggle-all');

	casper.then(function() {
		test.assertElementCount('.todo-list > li', 0, 'All todos were marked as completed');
		test.assertSelectorHasText('.todo-count > strong', 0, 'No more active todos');
	});

	casper.back();

	casper.then(function() {
		casper.mouse.move('.todo-list > li:first-of-type');
		casper.mouseEvent('click', '.destroy');
	});

	casper.then(function() {
		test.assertElementCount('.todo-list > li', todos.items.length, 'First todo was deleted.');
	});

	casper.run(function() {
		test.done();
		if (failures.length > 0) {
			casper.echo(failures.length + ' test(s) failed.');
			phantom.exit(1);
			return;
		}

		casper.echo('All tests passed.');
		phantom.exit();
	});
});

function getActiveTodosCount() {
	return todos.items.filter(function(item) {
		return !item.isCompleted;
	}).length;
}

function getCompletedTodosCount() {
	return todos.items.filter(function(item) {
		return item.isCompleted;
	}).length;
}
