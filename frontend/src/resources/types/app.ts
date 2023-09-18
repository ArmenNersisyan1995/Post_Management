import { ReactNode } from 'react';
import { NonIndexRouteObject } from 'react-router-dom';
import { ButtonPropsColorOverrides as MuiButtonPropsColorOverrides } from '@mui/material/Button';

export interface RouteObject extends NonIndexRouteObject {
  icon?: ReactNode;
  label?: string;
  children?: Array<RouteObject>;
  dashboardIcon?: string;
  colorKey?: keyof MuiButtonPropsColorOverrides;
}

/* ======== Axios ======== */

declare module 'axios' {
  interface HeadersDefaults {
    'REFRESH-TOKEN'?: string;
    'X-AUTH-TOKEN'?: string;
  }

  interface AxiosRequestConfig {
    _retry?: boolean;
    failureMessage?: string;
    successMessage?: string;
  }
}

export type AppMode = (
  'testing' |
  'production' |
  'development' |
  'demo' |
  'dev'
);

export interface Instance {
  id?: number;
}
