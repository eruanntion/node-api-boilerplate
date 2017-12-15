/**
 * Check API version status
 * @param req
 * @param res
 * @param next
 */
exports.get = (req, res, next) => res.json({
	APIVersion: req.version,
	status: 'OK'
});