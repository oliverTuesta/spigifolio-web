import type { CreateMovementPayload, Movement, MovementsQuery, PaginatedResponse } from '@/types'

import { apiFetch, apiPost } from './api'

export async function getByUser(
  userId: number,
  query?: MovementsQuery,
): Promise<PaginatedResponse<Movement>> {
  return apiFetch<PaginatedResponse<Movement>>(
    `/movements/user/${userId}`,
    query as Readonly<Record<string, unknown>>,
  )
}

export async function create(data: CreateMovementPayload): Promise<Movement> {
  return apiPost<Movement>('/movements', data)
}
