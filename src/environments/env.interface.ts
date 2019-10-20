/**
 * Create envrionment.prod.ts and envrionment.ts
 * Update the variables according to the different development and live environments
 */

export interface IEnv {
  production: boolean;
  primaryWebsite: string;
  serveFromCache: boolean;
  includeCache: boolean;
  serverUrl: string;
  google_client_id: string;
}
