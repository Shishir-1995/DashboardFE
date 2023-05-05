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
  //IA
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwibmFtZSI6IkFkYXJzaGEgS2hhdHVhIiwiaWF0IjoxNjgzMjE1NjA5fQ.k_0qGaERJNP796VdskdEfrLdsADSUwMbG7IFiyro2TQ"
  //Student
  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlN0dWRlbnQiLCJuYW1lIjoiUGl5dXNoIFNoYXJtYSIsImNvZGluZ0lhSUQiOjEsImRzYUlhSWQiOjIsImlhdCI6MTY4MzIzOTAxN30.ONevVobqJl8B_CIKF1_f5zfQL25XOTOxGvxP6oPnUv0"
  if (token) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (config.headers as any).token = `${token}`;
  }

  return config;
});


export default httpClient;
