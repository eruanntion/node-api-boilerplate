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