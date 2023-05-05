import axios, { AxiosRequestConfig } from 'axios';

import { Env } from '../../Env/env';
import { getCookie } from 'utils/cookies/cookies';


const headers = {
  appVersionCode: '1',
  clientPlatform: 'WEB'
};

const httpClient = axios.create({
  baseURL: Env.backendBaseUrl,
  headers
});

httpClient.interceptors.request.use((config) => {

  const token = getCookie("accessToken")
  if (token) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (config.headers as any).token = `${token}`;
  }

  return config;
});


export default httpClient;
