/* eslint-disable @typescript-eslint/no-explicit-any */

declare module '@scottnonnenberg/notate' {
  type NotateType = {
    (cb: Function, err?: Error, additionalProperties?: any): string;
    prettyPrint: (error: Error) => string;
  };

  const notate: NotateType;

  export default notate;
}
