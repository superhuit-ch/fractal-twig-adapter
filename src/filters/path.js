'use strict';

const _ = require('lodash');
const path = require('path');
const utils = require('@frctl/fractal').utils;

module.exports = function(fractal) {
	return function(uri) {
		const env = this.context._env;
		const request = env && env.request;
		const mountPath = fractal.web.get('static.mount');
		let _uri;

		if (!env || env.server) {
			_uri = uri;
			_uri = (mountPath) ? path.join('/', mountPath, _uri) : _uri;
		} else {
			_uri = utils.relUrlPath(uri, _.get(request, 'path', '/'), fractal.web.get('builder.urls'));
		}

		return _uri;
	};
};
