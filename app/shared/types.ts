export const API_ENDPOINTS = {
  TRPC: '/trpc',
} as const;

export interface Quote {
  quote: string;
  author: string;
}

export interface Env {
  ASSETS: Fetcher;
  QUOTES_KV?: KVNamespace;
}

export interface Context {
  env: Env;
  request: Request;
}