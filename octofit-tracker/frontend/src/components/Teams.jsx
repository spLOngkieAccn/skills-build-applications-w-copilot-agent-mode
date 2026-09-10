import { useEffect, useState } from 'react'
import { API_BASE_URL, fetchCollection } from '../api.js'

const TEAMS_ENDPOINT = `${API_BASE_URL}/api/teams/`

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection(TEAMS_ENDPOINT, 'teams')
      .then(setTeams)
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
          <p className="eyebrow">Find your people</p>
          <h1>Teams</h1>
          <p className="section-intro">Shared goals are easier to reach together.</p>
        </div>
        <span className="count-badge">{teams.length} teams</span>
      </div>
      {status === 'loading' && <p className="state-message">Loading teams...</p>}
      {status === 'error' && <p className="state-message state-error">{error}</p>}
      {status === 'ready' && (
        <div className="resource-grid">
          {teams.map((team) => (
            <article className="team-card" key={team._id || team.id || team.name}>
              <div className="team-mark">{(team.name || 'T').charAt(0)}</div>
              <div>
                <h2>{team.name || 'Unnamed team'}</h2>
                <p>{team.description || 'A crew with momentum.'}</p>
                <small>{team.members?.length || 0} members</small>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Teams
