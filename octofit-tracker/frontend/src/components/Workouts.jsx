import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('workouts')
      .then(setWorkouts)
      .catch((requestError) => {
        setError(requestError.message)
        setStatus('error')
      })
      .finally(() => setStatus((current) => (current === 'error' ? current : 'ready')))
  }, [])

  return (
    <section className="content-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Build your next session</p>
          <h1>Workouts</h1>
          <p className="section-intro">A considered menu for wherever your energy is today.</p>
        </div>
        <span className="count-badge">{workouts.length} options</span>
      </div>
      {status === 'loading' && <p className="state-message">Loading workouts...</p>}
      {status === 'error' && <p className="state-message state-error">{error}</p>}
      {status === 'ready' && (
        <div className="resource-grid">
          {workouts.map((workout) => (
            <article className="workout-card" key={workout._id || workout.id || workout.name}>
              <div className="workout-topline"><span>{workout.category || 'Training'}</span><span>{workout.durationMinutes ? `${workout.durationMinutes} min` : 'Flexible'}</span></div>
              <h2>{workout.name || 'Untitled workout'}</h2>
              <p>{workout.description || 'A focused session ready when you are.'}</p>
              <div className="tag-row">{(workout.focus || workout.type || 'Full body').toString()}</div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Workouts
