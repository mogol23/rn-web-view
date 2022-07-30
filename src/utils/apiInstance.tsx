import axios, { AxiosResponse } from 'axios';
import { toast } from '.';
import { config } from './../constans';
import redux from './../redux';

export interface errorResponse {
  code: Number;
  error: String | any;
  status: Number;
  success: Boolean;
}

export interface successResponse {
  success: Boolean;
  status: Number;
  data: Object | any;
}

export interface response extends errorResponse, successResponse {}

const baseURL = config.api_url;

const AXIOS = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    Accept: 'application/json',
  },
});

AXIOS.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  function (error) {
    if (
      error.response.data?.success == false ||
      'error' in error.response.data
    ) {
      toast('error', error.response.data?.error);
    }
    // console.error('service', error)
    switch (error.response.status) {
      case 401:
        break;
    }
    return Promise.reject(error);
  },
);

AXIOS.interceptors.request.use((request: any) => {
  const token = redux.store.getState()?.user.token;
  token && (request.headers.Authorization = `Bearer ${token}`);

  return request;
});

function setAuthToken(token: String) {
  AXIOS.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export { baseURL, AXIOS, setAuthToken };

export default AXIOS;
