const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'

function parseErrorBody(error: unknown): string {
  if (typeof error !== 'object' || error === null || !('message' in error)) {
    return 'Request failed'
  }
  const raw = (error as { message: unknown }).message
  if (Array.isArray(raw)) {
    return raw.map(String).join(', ')
  }
  if (typeof raw === 'string') {
    return raw
  }
  return 'Request failed'
}

export async function apiFetch<T>(path: string, params?: Readonly<Record<string, unknown>>): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`, window.location.origin)
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        url.searchParams.set(k, String(v))
      }
    })
  }
  const res = await fetch(url.toString())
  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(parseErrorBody(error))
  }
  return res.json() as Promise<T>
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(parseErrorBody(error))
  }
  return res.json() as Promise<T>
}

export async function apiDelete(path: string): Promise<void> {
  const res = await fetch(`${BASE_URL}${path}`, { method: 'DELETE' })
  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(parseErrorBody(error))
  }
}
