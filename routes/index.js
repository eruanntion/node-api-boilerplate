//region Module dependencies

const express = require('express');
const router = express.Router({mergeParams: true});
const fs = require('fs');

const config = require('../config');
const {notFound, unsupportedAPIVersion} = require('../middlewares/error');

//endregion

/**
 * Catch unsupported API versions
 */
router.use((req, res, next) => {
	const {version} = req.params;

	if (!/\d+$|\d+\.\d+$/.test(version))
		return notFound(req, res, next);

	if (version < config('minSupportedAPIVersion') || version > config('maxSupportedAPIVersion'))
		return unsupportedAPIVersion(req, res, next);

	req.version = parseFloat(version).toFixed(1);
	next();
});

/**
 * Check API version status
 */
router.get('/', function (req, res) {
	res.json({
		APIVersion: req.version,
		status: 'OK'
	});
});

/**
 * Load all the routes from this (routes) directory
 */
fs.readdir(__dirname, (err, items) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}

	items.forEach(item => {
		let name = item.slice(0, -3);

		if (name !== 'index') {
			router.use(`/${name}`, require(`./${item}`));
		}
	})
});

module.exports = router;
