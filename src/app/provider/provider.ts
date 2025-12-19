import { environment } from '../../environments/environment';

const ENV = environment;

export const API = {
  LOGIN: `${ENV.apiUrl}/login`,
};
