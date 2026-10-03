/// <reference types="vite/client" />

declare interface ImportMetaEnv {
  VITE_PAYLOAD_URL: string
  VITE_SERVER_URL: string
  VITE_CMS_URL: string
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv
}
