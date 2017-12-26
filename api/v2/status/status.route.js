//region Module dependencies

const express = require('express');
const router = express.Router();

const controller = require('./status.controller');

//endregion

router
	.route('/')

	.get(controller.get);

module.exports = router;