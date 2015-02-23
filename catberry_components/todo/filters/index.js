'use strict';

module.exports = TodoFilters;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "todo-filters" component.
 * @constructor
 */
function TodoFilters() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
TodoFilters.prototype.render = function () {
	return this.$context.getStoreData();
};
