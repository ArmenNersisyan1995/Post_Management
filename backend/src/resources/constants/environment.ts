import { config } from 'dotenv';

config();

const APP_MODE: string = process.env.NODE_ENV || 'production';

const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

const FRONTEND_PATH = process.env.FRONTEND_PATH || 'frontend/build';
const PRIVATE_KEY_PATH = process.env.PRIVATE_KEY_PATH || 'sslcert/server.key';
const CERTIFICATE_PATH = process.env.CERTIFICATE_PATH || 'sslcert/server.cert';
const CORSE_ORIGIN = process.env.CERTIFICATE_PATH || 'http://localhost:3000';
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const JWT_ACCESS_TOKEN = process.env.JWT_ACCESS_TOKEN || '';
const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN || '';

export default {
  APP_MODE,
  PORT,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  JWT_ACCESS_TOKEN,
  JWT_REFRESH_TOKEN,
  FRONTEND_PATH,
  PRIVATE_KEY_PATH,
  CERTIFICATE_PATH,
  CORSE_ORIGIN,
}
