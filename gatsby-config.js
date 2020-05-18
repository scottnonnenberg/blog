'use strict';

require('source-map-support').install();
require('./register');
require('./scripts/util/setupModulePath');

module.exports = require('./gatsbyConfig').default;
