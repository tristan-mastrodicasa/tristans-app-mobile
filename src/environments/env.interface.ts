/**
 * Create envrionment.prod.ts and envrionment.ts
 * Update the variables according to the different development and live environments
 */

export interface Env {
  production: boolean;
  serveFromCache: boolean;
  includeCache: boolean;
  serverUrl: string;
  google_client_id: string;
}
