'use strict';

module.exports = TodoClearButton;

var todosHelper = require('../../../lib/helpers/todosHelper');

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "todo-clear-button" component.
 * @constructor
 */
function TodoClearButton() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
TodoClearButton.prototype.render = function () {
	var storeData = this.$context.getStoreData();

	return storeData.then(function (data) {
		var count = todosHelper
				.getCount(data.allItems, todosHelper.only.completed);

		return {
			hasCompleted: (count > 0)
		};
	});
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
TodoClearButton.prototype.bind = function () {
	return {
		click: {
			button: this._handleClearCompletedTodos
		}
	};
};

/**
 * Handles button click.
 * @private
 */
TodoClearButton.prototype._handleClearCompletedTodos = function () {
	this.$context.sendAction('delete-completed-todos');
};
