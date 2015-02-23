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
 * Handles action named "add-todo".
 * @returns {Promise<Object>|Object|null|undefined} Response to component.
 */
TodoList.prototype.handleAddTodo = function (args) {
	ITEMS.push({
		isCompleted: false,
		label: args.label
	});
	this.$context.changed();
};

/**
 * Handles action named "mark-todo".
 * @returns {Promise<Object>|Object|null|undefined} Response to component.
 */
TodoList.prototype.handleMarkTodo = function (args) {
	if (args.index < 0 || args.index >= ITEMS.length) {
		return;
	}

	ITEMS[args.index].isCompleted = args.isCompleted;

	this.$context.changed();
};

/**
 * Handles action named "edit-todo".
 * @returns {Promise<Object>|Object|null|undefined} Response to component.
 */
TodoList.prototype.handleEditTodo = function (args) {
	if (!args.label) {
		this.handleDeleteTodo(args);
		return;
	}

	if (args.index < 0 || args.index >= ITEMS.length) {
		return;
	}

	ITEMS[args.index].label = args.label;

	this.$context.changed();
};

/**
 * Handles action named "delete-todo".
 * @returns {Promise<Object>|Object|null|undefined} Response to component.
 */
TodoList.prototype.handleDeleteTodo = function (args) {
	if (args.index < 0 || args.index >= ITEMS.length) {
		return;
	}

	ITEMS.splice(args.index, 1);

	this.$context.changed();
};
