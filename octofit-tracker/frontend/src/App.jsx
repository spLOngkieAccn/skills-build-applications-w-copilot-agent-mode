import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { to: '/', label: 'Overview', end: true },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/teams', label: 'Teams' },
  { to: '/users', label: 'Members' },
  { to: '/workouts', label: 'Workouts' },
]

function Overview() {
  return (
    <section className="overview-section">
      <div className="overview-copy">
        <p className="eyebrow">Your momentum, in one place</p>
        <h1>Make today count.</h1>
        <p>Track the work, find your people, and keep a little more energy in reserve for tomorrow.</p>
        <NavLink className="primary-action" to="/activities">Log into the rhythm <span aria-hidden="true">-&gt;</span></NavLink>
      </div>
      <div className="signal-panel" aria-label="OctoFit activity summary">
        <div className="signal-orbit"><span>OF</span></div>
        <div><strong>OctoFit</strong><small>Personal fitness, shared.</small></div>
      </div>
      <div className="overview-links">
        <NavLink to="/leaderboard"><span>01</span><strong>See the leaderboard</strong><small>Compare progress without the pressure.</small></NavLink>
        <NavLink to="/workouts"><span>02</span><strong>Choose a workout</strong><small>Meet the day where it is.</small></NavLink>
        <NavLink to="/teams"><span>03</span><strong>Find your team</strong><small>Consistency likes company.</small></NavLink>
      </div>
    </section>
  )
}

function App() {
  const location = useLocation()
  const currentPage = navigation.find((item) => item.to === location.pathname)?.label || 'OctoFit'

  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink className="brand" to="/" aria-label="OctoFit overview">
          <span className="brand-mark">O</span>
          <span>OctoFit</span>
        </NavLink>
        <nav className="main-nav" aria-label="Main navigation">
          {navigation.map((item) => <NavLink key={item.to} to={item.to} end={item.end}>{item.label}</NavLink>)}
        </nav>
        <span className="page-indicator">{currentPage}</span>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
      <footer className="app-footer"><span>OCTOFIT TRACKER</span><span>Keep showing up.</span></footer>
    </div>
  )
}

export default App
