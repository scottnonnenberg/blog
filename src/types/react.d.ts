import { HTMLAttributes } from 'react';

// https://github.com/microsoft/TypeScript/blob/4eb59a2d77acde13d808ec302f6a28f4fa49aa01/tests/lib/react16.d.ts#L1494-L1503

declare module 'react' {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    // Replicate the default
    acceptCharset?: string;
    action?: string;
    autoComplete?: string;
    encType?: string;
    method?: string;
    name?: string;
    noValidate?: boolean;
    target?: string;

    // Add our new prop
    rel?: string;
  }
}
