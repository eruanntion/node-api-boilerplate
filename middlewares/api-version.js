/**
 * Check API Version
 * @param req
 * @param res
 * @param next
 */
exports.check = (req, res, next) => {
	req.version = req.path.split(['/'])[1];
	next();
};

/**
* Get API version status
* @param req
* @param res
*/
exports.get = (req, res) => res.json({
	APIVersion: req.version,
	status: 'OK'
});