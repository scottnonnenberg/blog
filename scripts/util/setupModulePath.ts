// This file allows us to require files with an absolute path in Node.js.
//   See gatsbyConfig.ts and storybook/main.js for client-side absolute path support.

import path from 'path';
import modulePath from 'app-module-path';

modulePath.addPath(path.join(__dirname, '../..'));
