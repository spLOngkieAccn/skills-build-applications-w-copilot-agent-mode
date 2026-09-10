import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('users')
      .then(setUsers)
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
          <p className="eyebrow">Community</p>
          <h1>Members</h1>
          <p className="section-intro">The people making progress together.</p>
        </div>
        <span className="count-badge">{users.length} members</span>
      </div>
      {status === 'loading' && <p className="state-message">Loading members...</p>}
      {status === 'error' && <p className="state-message state-error">{error}</p>}
      {status === 'ready' && (
        <div className="resource-grid">
          {users.map((user) => (
            <article className="resource-card" key={user._id || user.id || user.username}>
              <div className="avatar">{(user.name || user.username || '?').charAt(0)}</div>
              <div>
                <h2>{user.name || user.username || 'Unnamed member'}</h2>
                <p>@{user.username || 'member'}</p>
                <small>{user.email || 'No email listed'}</small>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Users
