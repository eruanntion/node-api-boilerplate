//region Module dependencies

const express = require('express');
const router = express.Router();
const fs = require('fs');
const debug = require('debug')('node-api-boilerplate:routes:index');

const config = require('../config');
const {check} = require('../middlewares/api-version');

//endregion

// Check API version
router.use(check);

/**
 * Load all the routes from this (routes) directory
 */
config('api:supportedVersions').forEach(version => {
	fs.readdir(`${__dirname}/${version}`, (err, items) => {
		if (err) {
			console.error(err);
			process.exit(1);
		}

		items.forEach(item => {
			let name = item.replace('Route.js', '');

			router.all(`/${version}`, require(`../controllers/${version}/status-controller`).get);
			router.use(`/${version}/${name}`, require(`./${version}/${item}`));
			debug(`/routes/${version}/${item} loaded`);
		})
	});
});

module.exports = router;
