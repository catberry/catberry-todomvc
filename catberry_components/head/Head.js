'use strict';

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * "head" component.
 */
class Head {

	/**
	 * Gets data for template.
	 * @returns {Object} Data object.
	 */
	render() {
		return this.$context.locator.resolve('config');
	}
}

module.exports = Head;
