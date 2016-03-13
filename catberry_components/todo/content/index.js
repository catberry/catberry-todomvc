'use strict';

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * "todo-content" component.
 */
class TodoContent {

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
				hasItems: (Object.keys(data.items).length > 0)
			};
		});
	}
}

module.exports = TodoContent;
