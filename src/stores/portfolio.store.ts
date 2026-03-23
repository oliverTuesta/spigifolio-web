import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { formatCurrency } from '@/composables/useFormatCurrency'
import * as portfolioService from '@/services/portfolio.service'
import type { PortfolioChart, PortfolioSummary } from '@/types'

export const usePortfolioStore = defineStore('portfolio', () => {
  const summary = ref<PortfolioSummary | null>(null)
  const chart = ref<PortfolioChart | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const formattedBalance = computed(() => {
    if (!summary.value) {
      return '$0.00'
    }
    return formatCurrency(summary.value.totalBalance)
  })

  const profitabilitySign = computed(() => {
    if (!summary.value) {
      return '+'
    }
    return summary.value.monthlyProfitability >= 0 ? '+' : '-'
  })

  async function fetchSummary(userId: number) {
    loading.value = true
    error.value = null
    try {
      summary.value = await portfolioService.getSummary(userId)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load portfolio summary'
    } finally {
      loading.value = false
    }
  }

  async function fetchChart(userId: number) {
    loading.value = true
    error.value = null
    try {
      chart.value = await portfolioService.getChart(userId)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load chart'
    } finally {
      loading.value = false
    }
  }

  /** Loads summary and chart together without double-loading flicker. */
  async function fetchDashboard(userId: number) {
    loading.value = true
    error.value = null
    try {
      const [s, c] = await Promise.all([
        portfolioService.getSummary(userId),
        portfolioService.getChart(userId),
      ])
      summary.value = s
      chart.value = c
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load dashboard'
    } finally {
      loading.value = false
    }
  }

  return {
    summary,
    chart,
    loading,
    error,
    formattedBalance,
    profitabilitySign,
    fetchSummary,
    fetchChart,
    fetchDashboard,
  }
})
