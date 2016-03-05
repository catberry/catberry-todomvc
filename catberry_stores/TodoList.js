'use strict';

const data = require('../todos.json');

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

class TodoListStore {
	constructor(locator) {
		this.todosHelper = locator.resolve('todosHelper');
		this.todos = this.todosHelper.loadFromObject(data);
	}

	/**
	 * Loads data.
	 * @returns {{items: Object, allItems: Object}}
     */
	load() {
		const filter = this.$context.state.filter || null;

		return {
			items: this.todosHelper.filter(this.todos, filter),
			allItems: this.todos
		};
	}

	/**
	 * Handles action named "add-todo".
	 * @param {Object} args Action arguments.
	 */
	handleAddTodo(args) {
		this.todosHelper.add(this.todos, args.label);

		this.$context.changed();
	}

	/**
	 * Handles action named "mark-todo".
	 * @param {Object} args Action arguments.
	 */
	handleMarkTodo(args) {
		if (!this.todos.hasOwnProperty(args.key)) {
			return;
		}

		this.todos[args.key].setStatus(args.isCompleted);

		this.$context.changed();
	}

	/**
	 * Handles action named "mark-all-todos".
	 * @param {Object} args Action arguments.
	 */
	handleMarkAllTodos(args) {
		this.todosHelper.setStatusToAll(this.todos, args.isCompleted);

		this.$context.changed();
	}

	/**
	 * Handles action named "edit-todo".
	 * @param {Object} args Action arguments.
	 */
	handleEditTodo(args) {
		if (!args.label) {
			this.handleDeleteTodo(args);
			return;
		}

		if (!this.todos.hasOwnProperty(args.key)) {
			return;
		}

		this.todos[args.key].edit(args.label);

		this.$context.changed();
	}

	/**
	 * Handles action named "delete-todo".
	 * @param {Object} args Action arguments.
	 */
	handleDeleteTodo(args) {
		if (!this.todos.hasOwnProperty(args.key)) {
			return;
		}

		delete this.todos[args.key];

		this.$context.changed();
	}

	/**
	 * Handles action named "delete-completed-todos".
	 */
	handleDeleteCompletedTodos() {
		this.todos = this.todosHelper.filter(this.todos, this.todosHelper.states.active);

		this.$context.changed();
	}
}

module.exports = TodoListStore;
