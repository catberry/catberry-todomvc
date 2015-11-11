'use strict';

module.exports = TodoCount;

var todosHelper = require('../../../lib/helpers/todosHelper');

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "todo-count" component.
 * @constructor
 */
function TodoCount() { }

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
TodoCount.prototype.render = function () {
	var storeData = this.$context.getStoreData();

	return storeData.then(function (data) {
		var count = todosHelper
				.getCount(data.allItems, todosHelper.only.active);

		return {
			count: count,
			isEmpty: (count === 0)
		};
	});
};
