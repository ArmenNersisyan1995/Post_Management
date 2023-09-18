import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { endpoint, REQUEST_TIMEOUT, routsPatterns } from 'resources/constants';
import { showMessage } from 'store';

const instance: AxiosInstance = axios.create({
  withCredentials: true,
  timeout: REQUEST_TIMEOUT,
});

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.config?.successMessage) {
      showMessage({
        messages: [response.config?.successMessage],
        options: { variant: 'success' },
      });
    }
    return response;
  },
  (error: AxiosError) => {
    const message: string | undefined = error?.config?.failureMessage;
    if (error.response && error.response.status === 401) {
      /* eslint-disable no-param-reassign */
      if (error.config && !error?.config?._retry) {
        error.config._retry = true;
        return (
          instance.get(endpoint.REFRESH_TOKEN)
            .catch((tokenError) => {
              Promise.reject(tokenError);
              localStorage.clear();
              window.location.href = routsPatterns.SIGN_IN;
            })
        );
      }
    }

    if (message) {
      showMessage({ messages: [message], options: { variant: 'error' } });
    }
    return Promise.reject(error);
  },
);

export default instance;
