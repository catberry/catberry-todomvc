'use strict';

module.exports = Todo;

/**
 * Creates new todo.
 * @param {string} label
 * @param {boolean} isCompleted
 * @param {number} id
 * @constructor
 */
function Todo (label, isCompleted, id) {
  this.edit(label);
  this.setStatus(isCompleted);
  this.setId(id);
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
 * Identifier
 * @type {number}
 */
Todo.prototype.id = 0;

/**
 * Edits todo.
 * @param {string} label
 */
Todo.prototype.edit = function (label) {
	this.label = label || '';
};

/**
 * Sets status.
 * @param {boolean} isCompleted
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

/**
 * Sets identifier.
 * @param {number} id
 */
Todo.prototype.setId = function (id) {
  this.id = id;
};
