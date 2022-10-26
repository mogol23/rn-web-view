import axios, { AxiosError, AxiosResponse } from 'axios';

const AXIOS = axios.create({
  timeout: 5000,
  headers: {
    Accept: 'application/json',
  },
});

AXIOS.interceptors.response.use(
  (response: AxiosResponse) => {
    if (__DEV__) {
      console.log('*** axios response ***');
      console.log(JSON.stringify(response.data, null, "  "));
      console.log('*** axios response ***');
    }
    return response.data;
  },
  function (error: AxiosError) {
    if (__DEV__) {
      console.log('*** axios error ***');
      console.log(JSON.stringify(error.response));
      console.log('*** axios error ***');
    }
    return Promise.reject(error);
  },
);

export default AXIOS;
