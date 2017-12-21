//region Module dependencies

const express = require('express');
const router = express.Router();
const path = require('path');
const find = require('find');
const debug = require('debug')('node-api-boilerplate:routes:index');

const config = require('../config');
const apiVersion = require('../middlewares/api-version.middleware');

//endregion

// Check API version
router.use(apiVersion.check);

/**
 * Load all enabled API versions specified in config
 */
config('api:supportedVersions').forEach(version => {
	router.all(`/${version}`, apiVersion.get);

	find.eachfile(/\.route.js$/, `${__dirname}/${version}/`, file => {
		const routeName = path.basename(file).replace('.route.js', '');
		router.use(`/${version}/${routeName}`, require(file));
		debug(`/api/${version}/${routeName} routes successfully loaded`);
	});
});

module.exports = router;
