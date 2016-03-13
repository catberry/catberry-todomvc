'use strict';

class Todo {

	/**
	 * Creates new todo.
	 * @param {string} label Label text.
	 * @param {boolean} isCompleted Is todo item completed.
	 * @constructor
	 */
	constructor(label, isCompleted) {
		this.edit(label);
		this.setStatus(isCompleted);
	}

	/**
	 * Edits todo.
	 * @param {string} label Label text.
	 */
	edit(label) {
		this.label = label || '';
	}

	/**
	 * Sets status.
	 * @param {boolean} isCompleted Is todo item completed.
	 */
	setStatus(isCompleted) {
		this.isCompleted = isCompleted || false;
	}

	/**
	 * Marks todo as completed.
	 */
	markAsCompleted() {
		this.setStatus(true);
	}
}

module.exports = Todo;
