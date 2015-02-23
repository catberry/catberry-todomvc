'use strict';

module.exports = TodoList;

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
			input: this._handleMark
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
