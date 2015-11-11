'use strict';

module.exports = TodoToggle;

var todosHelper = require('../../../lib/helpers/todosHelper');

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "todo-toggle" component.
 * @constructor
 */
function TodoToggle() { }

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
TodoToggle.prototype.render = function () {
	var storeData = this.$context.getStoreData();

	return storeData.then(function (data) {
		return {
			areAllCompleted: todosHelper.areAllCompleted(data.items)
		};
	});
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
TodoToggle.prototype.bind = function () {
	return {
		change: {
			input: this._handleToggleStatus
		}
	};
};

/**
 * Handles toggle event.
 * @param {Event} event DOM event.
 * @private
 */
TodoToggle.prototype._handleToggleStatus = function (event) {
	var targetElement = event.currentTarget;

	this.$context.sendAction('mark-all-todos', {
		isCompleted: targetElement.checked
	});
};
