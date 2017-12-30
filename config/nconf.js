//region NPM module dependencies

/**
 * Global config
 * @public
 */
const nconf = require('nconf');
const path = require('path');
const fs = require('fs');
const debug = require('debug')('node-api-boilerplate:config');

//endregion

//region If not provided, set environment to development

const env = (process.env.NODE_ENV || 'development').trim();

//endregion

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
		let flagFilePath = `${__dirname}/flags/${flag}.json`;

		if (!fs.existsSync(flagFilePath)) {
			console.error(`\nCONFIGURATION LOADING ERROR: missing file "${flagFilePath}"`
				, `\nConfiguration loading failed while trying to load config file for "${flag}" flag.`
				, '\nPlease check if you provided the correct flag name.');
			process.exit(1);
		}

		nconf.file(flag, {file: flagFilePath});
		console.log('Sandbox config loaded');
		debug(flag, 'config file loaded');
	});
}

//endregion

//region Load an environment configuration data into the hierarchy

let envFilePath = `${__dirname}/environments/${env}.json`;

if (!fs.existsSync(envFilePath)) {
	console.error(`\nCONFIGURATION LOADING ERROR: missing file "${envFilePath}"`
		, `\nConfig loading failed while trying to load config file for "${env}" environment.`
		, '\nPlease check if you provided the correct environment name.');
	process.exit(1);
}

nconf.file(env, {file: envFilePath});
debug(env, 'config file loaded');

//endregion

//region Load default configuration data into the hierarchy

let defaultFilePath = `${__dirname}/environments/default.json`;

if (!fs.existsSync(defaultFilePath)) {
	console.error(`\nCONFIGURATION LOADING ERROR: missing file "${defaultFilePath}"`
		, `\nConfig loading failed while trying to load default config file.`);
	process.exit(1);
}

nconf.file('default', {file: defaultFilePath});
debug('default config file loaded');

//endregion

//region Set custom variables

nconf.set('rootDir', path.join(__dirname, '../'));
debug('Custom variables loaded into config');

//endregion

//region Check if everything is loaded

nconf.required(['env', 'http:port']);

//endregion

//region Bind get method to nconf, so you can use short notation

/**
 * Global config
 * @public
 */
nconf.get = nconf.get.bind(nconf);

//endregion

module.exports = nconf;