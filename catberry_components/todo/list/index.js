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
function TodoList() {

}

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
 * Handles changed status of todo
 * @param {Event} event
 * @private
 */
TodoList.prototype._handleMark = function (event) {
	var $target = event.currentTarget,
		$item = $target.parentNode.parentNode;

	this.$context.sendAction('mark-todo', {
		index: $item.getAttribute('data-index'),
		isCompleted: $target.checked
	});
};

/**
 * Handles edit of todo
 * @param {Event} event
 * @private
 */
TodoList.prototype._handleEdit = function (event) {
	event.preventDefault();
	event.stopPropagation();

	var $target = event.currentTarget,
		$item = $target.parentNode,
		$input = $target.querySelector('input');

	this.$context.sendAction('edit-todo', {
		index: $item.getAttribute('data-index'),
		label: $input.value
	});
};

/**
 * Handles start editing of todo
 * @param {Event} event
 * @private
 */
TodoList.prototype._handleStartEditing = function (event) {
	var $target = event.currentTarget,
		$item = $target.parentNode.parentNode;

	$item.classList.add(EDITING_CLASS_NAME);
	$item.querySelector('input[type=text]').focus();
};

/**
 * Handles finish editing of todo
 * @param {Event} event
 * @private
 */
TodoList.prototype._handleFinishEditing = function (event) {
	var $target = event.currentTarget,
		$item = $target.parentNode.parentNode;

	$item.classList.remove(EDITING_CLASS_NAME);
};

/**
 * Handles cancel editing of todo
 * @param {Event} event
 * @private
 */
TodoList.prototype._handleCancelEditing = function (event) {
	if (event.keyCode !== ESCAPE_CODE) {
		return;
	}

	var $target = event.currentTarget,
		$item = $target.parentNode.parentNode;

	$item.classList.remove(EDITING_CLASS_NAME);
};

/**
 * Handles deleting of todo
 * @param {Event} event
 * @private
 */
TodoList.prototype._handleDelete = function (event) {
	var $target = event.currentTarget,
		$item = $target.parentNode.parentNode;

	this.$context.sendAction('delete-todo', {
		index: $item.getAttribute('data-index')
	});
};
