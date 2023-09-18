import { AppMode } from 'resources/types';

export const configs: { [key: string] : { [key in AppMode]: string } } = {
  apiUrl: {
    development: 'http://localhost:8080/api/',
    testing: '',
    demo: '',
    production: '',
    dev: '',
  },
};
