import { API_PREFIX } from "./endpoints";

export const ROUT_PATTERN: RegExp = new RegExp(`^((?!(${API_PREFIX})).)*$`, 'g');

export { default as environment } from './environment';