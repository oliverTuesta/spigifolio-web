import { defineStore } from 'pinia'
import { ref } from 'vue'

import * as movementsService from '@/services/movements.service'
import { usePortfolioStore } from '@/stores/portfolio.store'
import type { CreateMovementPayload, Movement, MovementsQuery, PaginatedResponse } from '@/types'

export const useMovementsStore = defineStore('movements', () => {
  const movements = ref<PaginatedResponse<Movement> | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const lastUserId = ref<number | null>(null)
  const lastQuery = ref<MovementsQuery | undefined>(undefined)

  async function fetchMovements(userId: number, query?: MovementsQuery) {
    lastUserId.value = userId
    lastQuery.value = query
    loading.value = true
    error.value = null
    try {
      movements.value = await movementsService.getByUser(userId, query)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load movements'
    } finally {
      loading.value = false
    }
  }

  async function createMovement(data: CreateMovementPayload) {
    loading.value = true
    error.value = null
    try {
      await movementsService.create(data)
      const portfolioStore = usePortfolioStore()
      await portfolioStore.fetchSummary(data.userId)
      if (lastUserId.value !== null) {
        await fetchMovements(lastUserId.value, lastQuery.value)
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to create movement'
      throw e
    } finally {
      loading.value = false
    }
  }

  return {
    movements,
    loading,
    error,
    fetchMovements,
    createMovement,
  }
})
