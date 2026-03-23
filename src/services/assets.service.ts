import type { Asset, AssetType } from '@/types'

import { apiDelete, apiFetch, apiPost } from './api'

export async function getAll(): Promise<Asset[]> {
  return apiFetch<Asset[]>('/assets')
}

export async function create(data: {
  ticker: string
  name: string
  type: AssetType
}): Promise<Asset> {
  return apiPost<Asset>('/assets', data)
}

export async function remove(id: number): Promise<void> {
  await apiDelete(`/assets/${id}`)
}
