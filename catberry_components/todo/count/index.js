'use strict';

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * "todo-count" component.
 */
class TodoCount {
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
				.getCount(data.allItems, this.todosHelper.states.active);

			return {
				count,
				onlyOneItem: count === 1
			};
		});
	}
}

module.exports = TodoCount;
