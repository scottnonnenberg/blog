/* eslint-disable @typescript-eslint/explicit-function-return-type */

// Thanks to @gmathieu, a workaround for ts-node double-register
//   https://github.com/TypeStrong/ts-node/issues/409#issuecomment-407228078
require('ts-node').register();
require('ts-node').register = () => undefined;
