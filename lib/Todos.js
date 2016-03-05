'use strict';

const Todo = require('./Todo');

class Todos {
	constructor() {
		this.sequence = 0;
		this.states = {
			active: 'active',
			completed: 'completed'
		};
	}

	/**
	 * Is an item active?
	 * @param {Object} item
	 * @returns {boolean}
	 */
	isItemActive(item) {
		return !item.isCompleted;
	}

	/**
	 * Is an item completed?
	 * @param {Object} item
	 * @returns {boolean}
	 */
	isItemCompleted(item) {
		return item.isCompleted;
	}

	/**
	 * Checks item status.
	 * @param {string} state
	 * @param {Object} item
	 * @returns {boolean}
	 */
	checkItemState(state, item) {
		if (state === this.states.active) {
			return this.isItemActive(item);
		}

		if (state === this.states.completed) {
			return this.isItemCompleted(item);
		}

		return false;
	}

	/**
	 * Load todos from json
	 * @param {Object} data Data object.
	 * @returns {Object} Map of items.
	 */
	loadFromObject(data) {
		const collection = {};

		const items = data.items || [];

		items.forEach((item) => {
			collection[this.getNextIdentifier()] =
				new Todo(item.label, item.isCompleted);
		});

		return collection;
	}

	/**
	 * Add new todo.
	 * @param {Object} collection Map of items.
	 * @param {string} label Label text.
	 */
	add(collection, label) {
		collection[this.getNextIdentifier()] = new Todo(label, false);
	}

	/**
	 * Filters todo items
	 * @param {Object} collection Map of items.
	 * @param {string} filterName Name of filter.
	 * @returns {Object} Filtered map of items.
	 */
	filter(collection, filterName) {
		if (!filterName) {
			return collection;
		}

		const filtered = {};

		Object.keys(collection).forEach((key) => {
			if (this.checkItemState(filterName, collection[key])) {
				filtered[key] = collection[key];
			}
		});

		return filtered;
	}

	/**
	 * Gets number of filtered todos.
	 * @param {Object} collection Map of items.
	 * @param {string} filterName Name of filter.
	 * @returns {number} Number of filtered items.
	 */
	getCount(collection, filterName) {
		let count = 0;

		Object.keys(collection).forEach((key) => {
			if (this.checkItemState(filterName, collection[key])) {
				count++;
			}
		});

		return count;
	}

	/**
	 * Sets status to all todos.
	 * @param {Object} collection Map of items.
	 * @param {boolean} isCompleted Status to set.
	 */
	setStatusToAll(collection, isCompleted) {
		Object.keys(collection).forEach((key) => {
			collection[key].setStatus(isCompleted);
		});
	}

	/**
	 * Are all todos completed?
	 * @param {Object} collection Map of items.
	 * @returns {boolean} Are all todo items completed.
	 */
	areAllCompleted(collection) {
		return Object.keys(collection)
			.every((key) => this.isItemCompleted(collection[key]));
	}

	/**
	 * Gets available identifier for todo.
	 * @returns {number} Next identifier.
	 */
	getNextIdentifier() {
		return this.sequence++;
	}
}

module.exports = Todos;
