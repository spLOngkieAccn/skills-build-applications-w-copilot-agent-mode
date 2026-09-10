const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
export const isCodespaces = Boolean(codespaceName)
export const API_BASE_URL = isCodespaces
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export async function fetchCollection(endpoint, resourceName = 'resource') {
  const response = await fetch(endpoint)

  if (!response.ok) {
    throw new Error(`Unable to load ${resourceName} (${response.status})`)
  }

  const payload = await response.json()
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload.data)) return payload.data
  if (Array.isArray(payload.results)) return payload.results
  if (Array.isArray(payload.items)) return payload.items
  return []
}
