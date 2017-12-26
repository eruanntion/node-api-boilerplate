/**
 * Get API version status
 * @param req
 * @param res
 */
exports.get = (req, res) => res.json({
	APIVersion: req.version,
	status: 'OK'
});