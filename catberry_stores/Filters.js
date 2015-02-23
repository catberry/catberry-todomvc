'use strict';

module.exports = Filters;

var AVAILABLE_FILTERS = {
	active: true,
	completed: true
};

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "filters" store.
 * @constructor
 */
function Filters() {

}

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
Filters.prototype.$lifetime = 60000;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
Filters.prototype.load = function () {
	var filter = this.$context.state.filter || null;

	if (!AVAILABLE_FILTERS[filter]) {
		filter = null;
	}

	var params = {
		showAll: (filter === null)
	};

	if (filter) {
		params['show' + filter[0].toUpperCase() + filter.substring(1)] = true;
	}

	return params;
};
