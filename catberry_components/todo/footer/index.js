'use strict';

module.exports = TodoFooter;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "todo-footer" component.
 * @constructor
 */
function TodoFooter() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
TodoFooter.prototype.render = function () {
	var storeData = this.$context.getStoreData();

	return storeData.then(function (data) {
		return {
			hasItems: (data.allItems.length > 0)
		};
	});
};
