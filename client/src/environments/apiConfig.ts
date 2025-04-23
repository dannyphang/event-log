import env from './environment.json';
import envProd from './environment.prod.json';
import { isDevMode } from '@angular/core';

const isProd = !isDevMode();
const isServerConnect = true;

const apiConfig = {
    baseUrl: isProd || isServerConnect ? envProd.baseUrl : env.baseUrl,
    authUrl: isProd || isServerConnect ? envProd.auth : env.auth,
};
export default apiConfig;