//region Module dependencies

require('./globals');
const config =  require('./nconf');

//endregion

// Export get method directly for nicer & shorter syntax
module.exports = config.get;