import axios, { AxiosRequestConfig } from 'axios';

import { Env } from '../../Env/env';


const headers = {
  appVersionCode: '1',
  clientPlatform: 'WEB'
};

const httpClient = axios.create({
  baseURL: Env.backendBaseUrl,
  headers
});

httpClient.interceptors.request.use((config) => {
  const token = "xyz"
  if (token) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (config.headers as any).authorization = `Bearer ${token}`;
  }

  return config;
});


export default httpClient;
