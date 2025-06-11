/// <reference types="vite/client" />
/// <reference types="@cloudflare/workers-types" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    readonly DEV: boolean
    readonly PROD: boolean
    readonly MODE: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }