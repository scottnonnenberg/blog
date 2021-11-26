/* eslint-disable @typescript-eslint/no-explicit-any */

// This old component doesn't have typings, so we put our own typings in place!
declare module '@scottnonnenberg/notate' {
  type NotateType = {
    (
      cb: (error?: Error | null, result?: any) => unknown,
      error?: Error,
      additionalProperties?: any
    ): string;
    prettyPrint: (error: Error) => string;
  };

  const notate: NotateType;

  export default notate;
}
