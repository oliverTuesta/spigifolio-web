import type { User } from '@/types'

import { apiFetch } from './api'

export async function getAll(): Promise<User[]> {
  return apiFetch<User[]>('/users')
}
