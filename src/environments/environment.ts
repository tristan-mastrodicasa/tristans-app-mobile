import { IEnv } from './env.interface';

/**
 * @todo When the team expands find a way to distribute only the production
 * configuration and interface for dev envrionment
 */
export const environment: IEnv = {
  production: false,
  primaryWebsite: 'http://192.168.1.11:3000',
  serveFromCache: false,
  includeCache: true,
  serverUrl: 'http://192.168.1.11:3000/api/',
  google_client_id: '839993677318-0nc1mhc3vvqhtq4ienhqq6ntej0k4rr8.apps.googleusercontent.com',
};
