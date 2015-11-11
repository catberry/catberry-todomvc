'use strict';

module.exports = Todo;

/**
 * Creates new todo.
 * @param {string} label Label text.
 * @param {boolean} isCompleted Is todo item completed.
 * @constructor
 */
function Todo(label, isCompleted) {
	this.edit(label);
	this.setStatus(isCompleted);
}

/**
 * Label
 * @type {string}
 */
Todo.prototype.label = '';

/**
 * Is todo completes?
 * @type {boolean}
 */
Todo.prototype.isCompleted = false;

/**
 * Edits todo.
 * @param {string} label Label text.
 */
Todo.prototype.edit = function (label) {
	this.label = label || '';
};

/**
 * Sets status.
 * @param {boolean} isCompleted Is todo item completed.
 */
Todo.prototype.setStatus = function (isCompleted) {
	this.isCompleted = isCompleted || false;
};

/**
 * Marks todo as completed.
 */
Todo.prototype.markAsCompleted = function () {
	this.setStatus(true);
};
