'use strict';

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "todo-footer" component.
 * @constructor
 */
class TodoFooter {

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
				hasItems: (Object.keys(data.allItems).length > 0)
			};
		});
	}
}

module.exports = TodoFooter;
