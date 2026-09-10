import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    avatarUrl: String,
  },
  { timestamps: true },
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    distanceKilometers: Number,
    calories: { type: Number, required: true },
    completedAt: { type: Date, required: true },
  },
  { timestamps: true },
);

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    points: { type: Number, required: true, default: 0 },
    rank: { type: Number, required: true },
    period: { type: String, required: true },
  },
  { timestamps: true },
);

const workoutSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    exercises: [{ name: String, sets: Number, reps: Number }],
  },
  { timestamps: true },
);

export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);
export const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);
export const Leaderboard = mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema);
export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);
