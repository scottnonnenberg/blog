/* eslint-disable @typescript-eslint/no-var-requires */

'use strict';

require('source-map-support').install();
require('./register');
require('./scripts/util/setupModulePath');

module.exports = require('./gatsbyNode').default;
