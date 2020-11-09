/* eslint-disable @typescript-eslint/no-explicit-any */

declare module '@scottnonnenberg/notate' {
  type NotateType = {
    (cb: (error?: Error | null, result?: any) => unknown, err?: Error, additionalProperties?: any): string;
    prettyPrint: (error: Error) => string;
  };

  const notate: NotateType;

  export default notate;
}
