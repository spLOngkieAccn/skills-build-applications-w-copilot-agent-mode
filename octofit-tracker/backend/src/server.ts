import express from 'express';
import { Activity, Leaderboard, Team, User, Workout } from './models/index.js';

const codespaceName = process.env.CODESPACE_NAME;
const codespace = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : undefined;
export const apiUrl = codespace || `http://localhost:8000`;

export const app = express();

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
