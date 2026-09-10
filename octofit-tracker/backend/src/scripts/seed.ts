import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/** Seed the octofit_db database with test data. */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Avery Morgan',
        email: 'avery.morgan@example.com',
        username: 'averym',
        avatarUrl: 'https://i.pravatar.cc/150?img=47',
      },
      {
        name: 'Jordan Lee',
        email: 'jordan.lee@example.com',
        username: 'jordanl',
        avatarUrl: 'https://i.pravatar.cc/150?img=12',
      },
      {
        name: 'Sam Rivera',
        email: 'sam.rivera@example.com',
        username: 'samr',
        avatarUrl: 'https://i.pravatar.cc/150?img=32',
      },
    ]);

    await Team.insertMany([
      {
        name: 'Trail Blazers',
        description: 'Weekend runners building consistent mileage together.',
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Core Crew',
        description: 'Strength and mobility enthusiasts.',
        members: [users[1]._id, users[2]._id],
      },
    ]);

    await Activity.insertMany([
      {
        user: users[0]._id,
        type: 'Run',
        durationMinutes: 42,
        distanceKilometers: 6.4,
        calories: 510,
        completedAt: new Date('2026-09-08T07:30:00Z'),
      },
      {
        user: users[1]._id,
        type: 'Cycling',
        durationMinutes: 55,
        distanceKilometers: 18.2,
        calories: 620,
        completedAt: new Date('2026-09-07T17:15:00Z'),
      },
      {
        user: users[2]._id,
        type: 'Strength',
        durationMinutes: 35,
        calories: 280,
        completedAt: new Date('2026-09-06T12:00:00Z'),
      },
    ]);

    await Leaderboard.insertMany([
      { user: users[0]._id, points: 1840, rank: 1, period: 'September 2026' },
      { user: users[1]._id, points: 1610, rank: 2, period: 'September 2026' },
      { user: users[2]._id, points: 1325, rank: 3, period: 'September 2026' },
    ]);

    await Workout.insertMany([
      {
        name: 'Morning Momentum',
        category: 'Full body',
        difficulty: 'Beginner',
        durationMinutes: 25,
        exercises: [
          { name: 'Bodyweight squat', sets: 3, reps: 12 },
          { name: 'Push-up', sets: 3, reps: 8 },
          { name: 'Plank', sets: 3, reps: 1 },
        ],
      },
      {
        name: 'Runner Strength',
        category: 'Strength',
        difficulty: 'Intermediate',
        durationMinutes: 40,
        exercises: [
          { name: 'Reverse lunge', sets: 3, reps: 10 },
          { name: 'Single-leg deadlift', sets: 3, reps: 10 },
          { name: 'Calf raise', sets: 3, reps: 15 },
        ],
      },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
