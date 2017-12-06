//region NPM module dependencies.
const nconf = require('nconf');
const path = require('path');
const debug = require('debug')('node-api-boilerplate:config');
debug('NPM modules loaded');
//endregion

const env = process.env.NODE_ENV || 'development';

//region Load commandline arguments and environment variables, respectively
nconf.argv().env();
debug('Argv & env loaded');
//endregion

//region Load flag specific settings
let flags = nconf.get('flags');

if (flags) {
	if (!Array.isArray(flags)) {
		flags = [flags];
	}

	flags.forEach((flag) => {
		nconf.file(flag, {file: `${__dirname}/flags/${flag}.json`});
		debug(flag, 'config file loaded');
	});
}
//endregion

//region load the environment configuration data into the hierarchy.
nconf.file(env, {file: `${__dirname}/environments/${env}.json`});
debug(env, 'config file loaded');
//endregion

//region load the environment configuration data into the hierarchy.
nconf.file('default', {file: `${__dirname}/default.json`});
debug('default config file loaded');
//endregion

//region Set custom variables
nconf.set('root_dir', path.join(__dirname, '../'));
debug('Custom variables loaded into config');
//endregion

module.exports = nconf;