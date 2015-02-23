'use strict';

module.exports = TodoInput;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "todo-input" component.
 * @constructor
 */
function TodoInput() {

}

/**
 * Input DOM element
 * @type {Element}
 */
TodoInput.prototype.inputElement = null;

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
TodoInput.prototype.bind = function () {
	this.inputElement = this.$context.element.querySelector('input');
	return {
		submit: {
			form: this._handleAddTodo
		}
	};
};

/**
 * Handles submit form event.
 * @param {Event} event
 * @private
 */
TodoInput.prototype._handleAddTodo = function (event) {
	event.preventDefault();
	event.stopPropagation();

	this.$context.sendAction('add-todo', {
		label: this.getValue()
	});

	this.clearValue();
};

/**
 * Gets label of todo.
 * @returns {string}
 */
TodoInput.prototype.getValue = function () {
	return this.inputElement.value;
};

/**
 * Clears input.
 */
TodoInput.prototype.clearValue = function () {
	this.inputElement.value = '';
	this.inputElement.focus();
};
