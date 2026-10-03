/// <reference types="vite/client" />

declare interface ImportMetaEnv {
  VITE_SERVER_URL: string
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv
}
