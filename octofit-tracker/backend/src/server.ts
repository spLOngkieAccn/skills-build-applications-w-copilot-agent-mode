import express from 'express';
import cors from 'cors';
import { Activity, Leaderboard, Team, User, Workout } from './models/index.js';

export const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const frontendUrl = process.env.FRONTEND_URL;
const codespace = codespaceName
  ? `https://${codespaceName}-${port}.app.github.dev`
  : undefined;
export const apiUrl = codespace || `http://localhost:${port}`;
const allowedOrigins = new Set([
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  ...(codespaceName ? [`https://${codespaceName}-5173.app.github.dev`] : []),
  ...(frontendUrl ? [frontendUrl] : []),
]);

export const app = express();

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.has(origin)) {
      callback(null, true);
      return;
    }

    callback(null, false);
  },
  methods: ['GET', 'OPTIONS'],
}));
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
