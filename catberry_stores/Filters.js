'use strict';

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

class FiltersStore {
	constructor(locator) {
		this.todosHelper = locator.resolve('todosHelper');
	}

	/**
	 * Gets current filter.
	 * @returns {{showAll: boolean, showFiltered: {}}}
     */
	load() {
		let filter = this.$context.state.filter || null;

		if (!this.todosHelper.states[filter]) {
			filter = null;
		}

		const params = {
			showAll: (filter === null),
			showFiltered: {}
		};

		if (filter) {
			params.showFiltered[filter] = true;
		}

		return params;
	}
}

module.exports = FiltersStore;
