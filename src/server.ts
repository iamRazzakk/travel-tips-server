/* eslint-disable no-console */
// This is server.ts
import mongoose from 'mongoose';
import app from './app';
import config from './config';

async function main() {
  try {
    await mongoose.connect(config.URL as string);
    app.listen(config.PORT, () => {
      console.log(`🚀 Travel Tips Server Running On Port ${config.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
