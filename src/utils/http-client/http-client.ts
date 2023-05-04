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
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6IlN0dWRlbnQiLCJuYW1lIjoiYWxrYSBzaW5oYSIsImNvZGluZ0lhSUQiOjEsImRzYUlhSWQiOjUsImlhdCI6MTY4MzE0OTg5OH0.LezTiJEQ33U9NhvbF9DT4BfC1tfSOd8zey7vp_bQTmA"
  if (token) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (config.headers as any).token = `${token}`;
  }

  return config;
});


export default httpClient;
