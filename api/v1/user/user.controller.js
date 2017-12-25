/**
 * Get user list
 * @param req
 * @param res
 * @param next
 * @returns {Promise.<void>}
 */
exports.list = async (req, res, next) => {
	res.json('users list');
};

exports.create = async (req, res, next) => {
	res.json('user created');
};



