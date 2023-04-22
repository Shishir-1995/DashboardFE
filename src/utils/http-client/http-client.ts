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
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6IlN0dWRlbnQiLCJuYW1lIjoiYWxrYSBzaW5oYSIsImNvZGluZ0lhSUQiOjEsImRzYUlhSWQiOjUsImlhdCI6MTY4MjE4ODcwNn0.RiUL1GPwsNDiGKowpzJNU56PwR7Sw4h6JKdVZgafS6M"
  if (token) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (config.headers as any).token = `${token}`;
  }

  return config;
});


export default httpClient;
