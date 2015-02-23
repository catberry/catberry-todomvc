'use strict';

var Todo = require('../Todo');

var FILTERS = {
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
	 * @param {Object} data
	 * @returns {Array<Todo>}
	 */
	loadFromJSON: function (data) {
		data.items = data.items || [];
		return data.items.map(function (item) {
			return new Todo(item.label, item.isCompleted);
		});
	},

	/**
	 * Append new todo
	 * @param {Array<Todo>} items
	 * @param {string} label
	 */
	append: function (items, label) {
		items.push(new Todo(label, false));
	},

	/**
	 * Filters todo items
	 * @param {Array<Todo>} items
	 * @param {string} filterName
	 * @returns {Array<Todo>}
	 */
	filter: function (items, filterName) {
		if (!filterName || !FILTERS.hasOwnProperty(filterName)) {
			return items;
		}

		return items.filter(FILTERS[filterName]);
	},

	/**
	 * Gets number of filtered todos
	 * @param {Array<Todo>} items
	 * @param {string} filterName
	 * @returns {Number}
	 */
	getCount: function (items, filterName) {
		return this.filter(items, filterName).length;
	},

	/**
	 * Sets status to all todos.
	 * @param {Array<Todo>} items
	 * @param {boolean} isCompleted
	 */
	setStatusToAll: function (items, isCompleted) {
		items.forEach(function (item) {
			item.setStatus(isCompleted);
		});
	},

	/**
	 * Are all todos completed?
	 * @param {Array<Todo>} items
	 * @returns {boolean}
	 */
	areAllCompleted: function (items) {
		return items.every(function (item) {
			return item.isCompleted;
		});
	}
};
