// Augmenting react's intrinsic JSX attributes to add optional "path" prop
//
// See Module Augmentation:
// https://www.typescriptlang.org/docs/handbook/declaration-merging.html
//
// Source: https://github.com/reach/router/issues/11
//
import { Attributes } from 'react'

declare module 'react' {
  interface Attributes {
    path?: string
  }
}
