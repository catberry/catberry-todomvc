'use strict';

var Todo = require('../Todo'),
	sequence = 0;

var FILTER_HANDLERS = {
	active: function (item) {
		return !item.isCompleted;
	},
	completed: function (item) {
		return item.isCompleted;
	}
};

module.exports = {

	only: {
		active: 'active',
		completed: 'completed'
	},

	/**
	 * Load todos from json
	 * @param {Object} data Data object.
	 * @returns {Object} Map of items.
	 */
	loadFromObject: function (data) {
		var collection = {};

		var self = this;

		data.items = data.items || [];

		data.items.forEach(function (item) {
			collection[self.getNextIdentifier()] =
					new Todo(item.label, item.isCompleted);
		});

		return collection;
	},

	/**
	 * Add new todo.
	 * @param {Object} collection Map of items.
	 * @param {string} label Label text.
	 */
	add: function (collection, label) {
		collection[this.getNextIdentifier()] = new Todo(label, false);
	},

	/**
	 * Filters todo items
	 * @param {Object} collection Map of items.
	 * @param {string} filterName Name of filter.
	 * @returns {Object} Filtered map of items.
	 */
	filter: function (collection, filterName) {
		if (!filterName || !FILTER_HANDLERS.hasOwnProperty(filterName)) {
			return collection;
		}

		var filtered = {};

		Object.keys(collection).forEach(function (key) {
			if (FILTER_HANDLERS[filterName](collection[key])) {
				filtered[key] = collection[key];
			}
		});

		return filtered;
	},

	/**
	 * Gets number of filtered todos.
	 * @param {Object} collection Map of items.
	 * @param {string} filterName Name of filter.
	 * @returns {number} Number of filtered items.
	 */
	getCount: function (collection, filterName) {
		var count = 0;

		Object.keys(collection).forEach(function (key) {
			if (FILTER_HANDLERS[filterName](collection[key])) {
				count++;
			}
		});

		return count;
	},

	/**
	 * Sets status to all todos.
	 * @param {Object} collection Map of items.
	 * @param {boolean} isCompleted Status to set.
	 */
	setStatusToAll: function (collection, isCompleted) {
		Object.keys(collection).forEach(function (key) {
			collection[key].setStatus(isCompleted);
		});
	},

	/**
	 * Are all todos completed?
	 * @param {Object} collection Map of items.
	 * @returns {boolean} Are all todo items completed.
	 */
	areAllCompleted: function (collection) {
		return Object.keys(collection).every(function (key) {
			return collection[key].isCompleted;
		});
	},

	/**
	 * Gets available identifier for todo.
	 * @returns {number} Next identifier.
	 */
	getNextIdentifier: function () {
		return sequence++;
	}
};
