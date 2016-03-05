'use strict';

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * "todo-clear-button" component.
 */
class TodoClearButton {
	constructor(locator) {
		this.todosHelper = locator.resolve('todosHelper');
	}

	/**
	 * Gets data context for template engine.
	 * This method is optional.
	 * @returns {Promise<Object>|Object|null|undefined} Data context
	 * for template engine.
	 */
	render() {
		const storeData = this.$context.getStoreData();

		return storeData.then((data) => {
			const count = this.todosHelper
				.getCount(data.allItems, this.todosHelper.states.completed);

			return {
				hasCompleted: (count > 0)
			};
		});
	}

	/**
	 * Returns event binding settings for the component.
	 * This method is optional.
	 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
	 */
	bind() {
		return {
			click: {
				button: this._handleClearCompletedTodos
			}
		};
	}

	/**
	 * Handles button click.
	 * @private
	 */
	_handleClearCompletedTodos() {
		this.$context.sendAction('delete-completed-todos');
	}
}

module.exports = TodoClearButton;
