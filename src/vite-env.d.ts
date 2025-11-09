/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  readonly VITE_VERSION: string
  readonly VITE_PSEUDO_RND: string
  readonly VITE_GIT_SHA: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module 'jest-mock-random'
