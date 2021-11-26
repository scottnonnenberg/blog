'use strict';

require('source-map-support').install();
require('./register');
// Disable for now - causes PackFileCacheStrategy/FileSystemInfo warnings from WebPack 5
// require('./scripts/util/setupModulePath');

module.exports = require('./gatsbyNode').default;
