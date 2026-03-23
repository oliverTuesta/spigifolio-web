import type { PortfolioChart, PortfolioSummary } from '@/types'

import { apiFetch } from './api'

export async function getSummary(userId: number): Promise<PortfolioSummary> {
  return apiFetch<PortfolioSummary>(`/portfolio/${userId}/summary`)
}

export async function getChart(userId: number): Promise<PortfolioChart> {
  return apiFetch<PortfolioChart>(`/portfolio/${userId}/chart`)
}
