'use strict';

module.exports = TodoList;

var EDITING_CLASS_NAME = 'editing',
	ESCAPE_CODE = 27;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "todo-list" component.
 * @constructor
 */
function TodoList() { }

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
TodoList.prototype.render = function () {
	return this.$context.getStoreData();
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
TodoList.prototype.bind = function () {
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
};

/**
 * Handles changed status of todo.
 * @param {Event} event DOM event.
 * @private
 */
TodoList.prototype._handleMark = function (event) {
	var targetElement = event.currentTarget,
		itemElement = targetElement.parentNode.parentNode;

	this.$context.sendAction('mark-todo', {
		key: itemElement.getAttribute('data-key'),
		isCompleted: targetElement.checked
	});
};

/**
 * Handles edit of todo.
 * @param {Event} event DOM event.
 * @private
 */
TodoList.prototype._handleEdit = function (event) {
	event.preventDefault();
	event.stopPropagation();

	var targetElement = event.currentTarget,
		itemElement = targetElement.parentNode,
		inputElement = targetElement.querySelector('input');

	this.$context.sendAction('edit-todo', {
		key: itemElement.getAttribute('data-key'),
		label: inputElement.value
	});
};

/**
 * Handles start editing of todo.
 * @param {Event} event DOM event.
 * @private
 */
TodoList.prototype._handleStartEditing = function (event) {
	var targetElement = event.currentTarget,
		itemElement = targetElement.parentNode.parentNode;

	itemElement.classList.add(EDITING_CLASS_NAME);
	itemElement.querySelector('input[type=text]').focus();
};

/**
 * Handles finish editing of todo.
 * @param {Event} event DOM event.
 * @private
 */
TodoList.prototype._handleFinishEditing = function (event) {
	var targetElement = event.currentTarget,
		itemElement = targetElement.parentNode.parentNode;

	itemElement.classList.remove(EDITING_CLASS_NAME);
};

/**
 * Handles cancel editing of todo.
 * @param {Event} event DOM event.
 * @private
 */
TodoList.prototype._handleCancelEditing = function (event) {
	if (event.keyCode !== ESCAPE_CODE) {
		return;
	}

	var targetElement = event.currentTarget,
		itemElement = targetElement.parentNode.parentNode;

	itemElement.classList.remove(EDITING_CLASS_NAME);
};

/**
 * Handles deleting of todo.
 * @param {Event} event DOM event.
 * @private
 */
TodoList.prototype._handleDelete = function (event) {
	var targetElement = event.currentTarget,
		itemElement = targetElement.parentNode.parentNode;

	this.$context.sendAction('delete-todo', {
		key: itemElement.getAttribute('data-key')
	});
};
