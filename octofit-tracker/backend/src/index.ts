import mongoose from 'mongoose';
import { apiUrl, app, port } from './server.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function startServer() {
  await mongoose.connect(connectionString);
  console.log('Connected to octofit_db');
  app.listen(port, '0.0.0.0', () => {
    console.log(`OctoFit Tracker API listening at ${apiUrl}`);
  });
}

startServer().catch((error) => {
  console.error('Error starting the API:', error);
  process.exit(1);
});