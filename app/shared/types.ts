export interface Env {
  ASSETS: Fetcher;
}

export interface Context {
  env: Env;
  request: Request;
}