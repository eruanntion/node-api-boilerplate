//region NPM module dependencies.
const nconf = require('nconf');
const path = require('path');
const fs = require('fs');
const debug = require('debug')('node-api-boilerplate:config');
debug('NPM modules loaded');
//endregion

const env = (process.env.NODE_ENV || 'development').trim();

//region Load commandline arguments and environment variables, respectively
nconf.argv().env();
debug('Argv & env loaded');
//endregion

//region Load flag specific settings
let flags = nconf.get('flag');

if (flags) {
	// Convert to array if only one flag present
	if (!Array.isArray(flags)) {
		flags = [flags];
	}

	flags.forEach((flag) => {
		let flag_file_path = `${__dirname}/flags/${flag}.json`;

		if (!fs.existsSync(flag_file_path)) {
			console.error(`\nCONFIGURATION LOADING ERROR: missing file "${flag_file_path}"`
				, `\nConfiguration loading failed while trying to load config file for "${flag}" flag.`
				, '\nPlease check if you provided the correct flag name.');
			process.exit(1);
		}

		nconf.file(flag, {file: flag_file_path});
		console.log('Sandbox config loaded');
		debug(flag, 'config file loaded');
	});
}
//endregion

//region Load an environment configuration data into the hierarchy.
let env_file_path = `${__dirname}/environments/${env}.json`;

if (!fs.existsSync(env_file_path)) {
	console.error(`\nCONFIGURATION LOADING ERROR: missing file "${env_file_path}"`
		, `\nConfig loading failed while trying to load config file for "${env}" environment.`
		, '\nPlease check if you provided the correct environment name.');
	process.exit(1);
}

nconf.file(env, {file: env_file_path});
debug(env, 'config file loaded');
//endregion

//region Load default configuration data into the hierarchy.
let default_file_path = `${__dirname}/environments/default.json`;

if (!fs.existsSync(default_file_path)) {
	console.error(`\nCONFIGURATION LOADING ERROR: missing file "${default_file_path}"`
		, `\nConfig loading failed while trying to load default config file.`);
	process.exit(1);
}

nconf.file('default', {file: default_file_path});
debug('default config file loaded');
//endregion

//region Set custom variables
nconf.set('root_dir', path.join(__dirname, '../'));
debug('Custom variables loaded into config');
//endregion

//region Check if everything is loaded
nconf.required(['env', 'http:port']);
//endregion

module.exports = nconf;