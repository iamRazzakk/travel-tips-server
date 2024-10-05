import { config } from 'dotenv';
config();
export default {
  PORT: process.env.PORT,
  URL: process.env.DB_URL,
  JWT_SECRET: process.env.JWT_SECRET_KEY,
  REFRESH_JWT_SECRET: process.env.REFRESH_SECRET_KEY,
  JWT_E_IN: process.env.JWT_EXPIRES_IN,
  JWT_R_IN: process.env.REFRESH_IN,
  NODE_DEV: process.env.NODE_DEV,
  cloud_name: process.env.CLOUDE_NAME,
  api_key: process.env.CLOUDENARY_API_KEY,
  api_secret: process.env.CLOUDENARY_SECRET_API_KEY
};
