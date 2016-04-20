'use strict';

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * "todo-input" component.
 */
class TodoInput {
	constructor() {

		/**
		 * Input DOM element
		 * @type {Element}
		 */
		this.inputElement = null;
	}

	/**
	 * Returns event binding settings for the component.
	 * This method is optional.
	 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
	 */
	bind() {
		this.inputElement = this.$context.element.querySelector('input');
		return {
			submit: {
				form: this._handleAddTodo
			}
		};
	}

	/**
	 * Handles submit form event.
	 * @param {Event} event DOM event.
	 * @private
	 */
	_handleAddTodo(event) {
		event.preventDefault();
		event.stopPropagation();

		const value = this.getValue().trim();

		if (!value) {
			return;
		}

		this.$context.sendAction('add-todo', {
			label: value
		});

		this.clearValue();
	}

	/**
	 * Gets label of todo.
	 * @returns {string} Current value in input.
	 */
	getValue() {
		return this.inputElement.value || '';
	}

	/**
	 * Clears input.
	 */
	clearValue() {
		this.inputElement.value = '';
		this.inputElement.focus();
	}
}

module.exports = TodoInput;
