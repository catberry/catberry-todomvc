'use strict';

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * "todo-toggle" component.
 */
class TodoToggle {
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
			return {
				areAllCompleted: this.todosHelper.areAllCompleted(data.items)
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
			change: {
				input: this._handleToggleStatus
			}
		};
	}

	/**
	 * Handles toggle event.
	 * @param {Event} event DOM event.
	 * @private
	 */
	_handleToggleStatus(event) {
		const targetElement = event.currentTarget;

		this.$context.sendAction('mark-all-todos', {
			isCompleted: targetElement.checked
		});
	}
}

module.exports = TodoToggle;
