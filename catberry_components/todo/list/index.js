'use strict';

const EDITING_CLASS_NAME = 'editing';
const ESCAPE_CODE = 27;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * "todo-list" component.
 */
class TodoList {

	/**
	 * Gets data context for template engine.
	 * This method is optional.
	 * @returns {Promise<Object>|Object|null|undefined} Data context
	 * for template engine.
	 */
	render() {
		return this.$context.getStoreData();
	}

	/**
	 * Returns event binding settings for the component.
	 * This method is optional.
	 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
	 */
	bind() {
		return {
			click: {
				button: this._handleDelete
			},
			change: {
				'input[type=checkbox]': this._handleMark
			},
			dblclick: {
				label: this._handleStartEditing
			},
			focusout: {
				'input[type=text]': this._handleFinishEditing
			},
			keyup: {
				'input[type=text]': this._handleCancelEditing
			},
			submit: {
				form: this._handleEdit
			}
		};
	}

	/**
	 * Handles changed status of todo.
	 * @param {Event} event DOM event.
	 * @private
	 */
	_handleMark(event) {
		const targetElement = event.currentTarget;
		const itemElement = targetElement.parentNode.parentNode;

		this.$context.sendAction('mark-todo', {
			key: itemElement.getAttribute('data-key'),
			isCompleted: targetElement.checked
		});
	}

	/**
	 * Handles edit of todo.
	 * @param {Event} event DOM event.
	 * @private
	 */
	_handleEdit(event) {
		event.preventDefault();
		event.stopPropagation();

		const targetElement = event.currentTarget;
		const itemElement = targetElement.parentNode;
		const inputElement = targetElement.querySelector('input');

		this.$context.sendAction('edit-todo', {
			key: itemElement.getAttribute('data-key'),
			label: inputElement.value
		});
	}

	/**
	 * Handles start editing of todo.
	 * @param {Event} event DOM event.
	 * @private
	 */
	_handleStartEditing(event) {
		const targetElement = event.currentTarget;
		const itemElement = targetElement.parentNode.parentNode;

		itemElement.classList.add(EDITING_CLASS_NAME);
		itemElement.querySelector('input[type=text]').focus();
	}

	/**
	 * Handles finish editing of todo.
	 * @param {Event} event DOM event.
	 * @private
	 */
	_handleFinishEditing(event) {
		const targetElement = event.currentTarget;
		const itemElement = targetElement.parentNode.parentNode;

		itemElement.classList.remove(EDITING_CLASS_NAME);
	}

	/**
	 * Handles cancel editing of todo.
	 * @param {Event} event DOM event.
	 * @private
	 */
	_handleCancelEditing(event) {
		if (event.keyCode !== ESCAPE_CODE) {
			return;
		}

		const targetElement = event.currentTarget;
		const itemElement = targetElement.parentNode.parentNode;

		itemElement.classList.remove(EDITING_CLASS_NAME);
	}

	/**
	 * Handles deleting of todo.
	 * @param {Event} event DOM event.
	 * @private
	 */
	_handleDelete(event) {
		const targetElement = event.currentTarget;
		const itemElement = targetElement.parentNode.parentNode;

		this.$context.sendAction('delete-todo', {
			key: itemElement.getAttribute('data-key')
		});
	}
}

module.exports = TodoList;
