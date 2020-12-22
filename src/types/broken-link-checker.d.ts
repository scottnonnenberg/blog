// This old component doesn't have typings, so we put our own typings in place!

declare module 'broken-link-checker' {
  export type SiteCheckerResultType = {
    url: {
      resolved: string;
    };
  };

  type OptionsType = {
    excludeExternalLinks: boolean;
  };
  type HandlersType = {
    link?: (result: SiteCheckerResultType) => void;
    end?: () => void;
  };

  export class SiteChecker {
    constructor(options: OptionsType, handlers: HandlersType);
    enqueue: (domain: string) => void;
  }
}
