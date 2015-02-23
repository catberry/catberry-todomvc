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
 * @type {Node}
 */
TodoInput.prototype.$input = null;

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
TodoInput.prototype.render = function () {

};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
TodoInput.prototype.bind = function () {
	this.$input = this.$context.element.querySelector('input');
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
	return this.$input.value;
};

/**
 * Clears input.
 */
TodoInput.prototype.clearValue = function () {
	this.$input.value = '';
	this.$input.focus();
};
