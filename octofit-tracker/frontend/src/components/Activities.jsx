import { useEffect, useState } from 'react'
import { API_BASE_URL, fetchCollection } from '../api.js'

const ACTIVITIES_ENDPOINT = `${API_BASE_URL}/api/activities/`

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection(ACTIVITIES_ENDPOINT, 'activities')
      .then(setActivities)
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
          <p className="eyebrow">Movement log</p>
          <h1>Activities</h1>
          <p className="section-intro">Recent effort, recorded and ready to build on.</p>
        </div>
        <span className="count-badge">{activities.length} logged</span>
      </div>
      {status === 'loading' && <p className="state-message">Loading activities...</p>}
      {status === 'error' && <p className="state-message state-error">{error}</p>}
      {status === 'ready' && (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr><th>Activity</th><th>Athlete</th><th>Duration</th><th>Distance</th><th>Completed</th></tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id || activity.id}>
                  <td><strong>{activity.type || activity.name || 'Workout'}</strong></td>
                  <td>{activity.user?.name || activity.user?.username || activity.username || 'Unassigned'}</td>
                  <td>{activity.durationMinutes ? `${activity.durationMinutes} min` : '—'}</td>
                  <td>{activity.distanceKilometers ? `${activity.distanceKilometers} km` : '—'}</td>
                  <td>{activity.completedAt ? new Date(activity.completedAt).toLocaleDateString() : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Activities
