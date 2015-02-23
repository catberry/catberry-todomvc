'use strict';

module.exports = TodoList;

var FILTERS = {
	active: function (item) {
		return !item.isCompleted;
	},
	completed: function (item) {
		return item.isCompleted;
	}
};

var ITEMS = [
	{
		isCompleted: true,
		label: 'Taste JavaScript'
	},
	{
		isCompleted: false,
		label: 'Buy a unicorn'
	},
	{
		isCompleted: false,
		label: 'Make Catberry TodoMVC'
	}
];

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "todo-list" store.
 * @constructor
 */
function TodoList() {

}

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
TodoList.prototype.$lifetime = 60000;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
TodoList.prototype.load = function () {
	var filter = this.$context.state.filter || null,
		filteredItems = ITEMS;

	if (filter && FILTERS.hasOwnProperty(filter)) {
		filteredItems = ITEMS.filter(FILTERS[filter]);
	}

	return {
		items: filteredItems
	};
};

/**
 * Handles action named "some-action" from any component.
 * @returns {Promise<Object>|Object|null|undefined} Response to component.
 */
TodoList.prototype.handleSomeAction = function () {
	// Here you can call this.$context.changed() if you know
	// that remote data source has been changed.
	// Also you can have many handle methods for other actions.
};
