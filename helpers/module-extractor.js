//region Module dependencies

const path = require('path');
const find = require('find');

//endregion

/**
 * Extracts all modules from dirPath by type
 * @param dirPath
 * @returns Object
 */
exports.extract = (dirPath) => {
	const files = find.fileSync(/\.js/, dirPath);
	const result = {};

	files.forEach(file => {
		const typeName = path.basename(file).replace('.js', '').replace(/.+?\./, '');

		if (typeName !== 'index') result[typeName] = require(file);
	});

	return result;
};