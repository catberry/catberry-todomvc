'use strict';

module.exports = TodoList;

var todosHelper = require('../lib/helpers/todosHelper'),
	data = require('../todos.json'),
	todos = todosHelper.loadFromObject(data);

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
	var filter = this.$context.state.filter || null;

	return {
		items: todosHelper.filter(todos, filter),
		allItems: todos
	};
};

/**
 * Handles action named "add-todo".
 * @returns {Promise<Object>|Object|null|undefined} Response to component.
 */
TodoList.prototype.handleAddTodo = function (args) {
	todosHelper.append(todos, args.label);
	this.$context.changed();
};

/**
 * Handles action named "mark-todo".
 * @returns {Promise<Object>|Object|null|undefined} Response to component.
 */
TodoList.prototype.handleMarkTodo = function (args) {
	if (args.index < 0 || args.index >= todos.length) {
		return;
	}

	todos[args.index].setStatus(args.isCompleted);

	this.$context.changed();
};

/**
 * Handles action named "mark-all-todos".
 * @returns {Promise<Object>|Object|null|undefined} Response to component.
 */
TodoList.prototype.handleMarkAllTodos = function (args) {
	todosHelper.setStatusToAll(todos, args.isCompleted);
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

	if (args.index < 0 || args.index >= todos.length) {
		return;
	}

	todos[args.index].edit(args.label);

	this.$context.changed();
};

/**
 * Handles action named "delete-todo".
 * @returns {Promise<Object>|Object|null|undefined} Response to component.
 */
TodoList.prototype.handleDeleteTodo = function (args) {
	if (args.index < 0 || args.index >= todos.length) {
		return;
	}

	todos.splice(args.index, 1);

	this.$context.changed();
};

/**
 * Handles action named "delete-completed-todos".
 * @returns {Promise<Object>|Object|null|undefined} Response to component.
 */
TodoList.prototype.handleDeleteCompletedTodos = function () {
	todos = todosHelper.filter(todos, todosHelper.only.active);
	this.$context.changed();
};
