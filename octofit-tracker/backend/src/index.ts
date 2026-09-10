import express from 'express';
import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from './models/index.js';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiUrl = codespaceName
  ? `https://${codespaceName}-${port}.app.github.dev`
  : `http://localhost:${port}`;
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiUrl });
});

app.get('/api/users', async (_request, response) => {
  response.json(await User.find().sort({ name: 1 }));
});

app.get('/api/teams/', async (_request, response) => {
  response.json(await Team.find().populate('members', 'name username'));
});

app.get('/api/activities', async (_request, response) => {
  response.json(await Activity.find().populate('user', 'name username').sort({ completedAt: -1 }));
});

app.get('/api/leaderboard/', async (_request, response) => {
  response.json(await Leaderboard.find().populate('user', 'name username').sort({ rank: 1 }));
});

app.get('/api/workouts/', async (_request, response) => {
  response.json(await Workout.find().sort({ name: 1 }));
});

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