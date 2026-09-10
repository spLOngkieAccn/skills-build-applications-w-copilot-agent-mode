import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const LEADERBOARD_ENDPOINT = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection(LEADERBOARD_ENDPOINT, 'leaderboard')
      .then(setLeaders)
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
          <p className="eyebrow">Friendly competition</p>
          <h1>Leaderboard</h1>
          <p className="section-intro">Small wins add up. See who is leading the charge.</p>
        </div>
      </div>
      {status === 'loading' && <p className="state-message">Loading leaderboard...</p>}
      {status === 'error' && <p className="state-message state-error">{error}</p>}
      {status === 'ready' && (
        <div className="leaderboard-list">
          {leaders.map((entry, index) => (
            <article className={`leader-row ${index < 3 ? 'leader-row-top' : ''}`} key={entry._id || entry.id || index}>
              <span className="rank">{entry.rank || index + 1}</span>
              <div className="leader-name">
                <strong>{entry.user?.name || entry.user?.username || entry.name || 'Unnamed athlete'}</strong>
                <span>{entry.team?.name || 'Individual challenge'}</span>
              </div>
              <strong className="points">{entry.points ?? entry.score ?? 0}<small> pts</small></strong>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Leaderboard
