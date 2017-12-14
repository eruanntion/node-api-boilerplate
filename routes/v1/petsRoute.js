const express = require('express');
const router = express.Router();

router
	.route('/')
	.get()
	.post();

router
	.route('/:userId')
	.get()
	.put()
	.patch()
	.delete();

module.exports = router;