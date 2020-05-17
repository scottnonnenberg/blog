import { WindowLocation } from '@reach/router';

// Matches type here:
//  https://github.com/gatsbyjs/gatsby/blob/54e3d7ae24924215ae9e0976b89e185159d9e38f/packages/gatsby/index.d.ts#L55-L61

export type LocationType = WindowLocation<WindowLocation['state']>;
