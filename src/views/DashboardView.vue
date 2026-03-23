<script setup lang="ts">
import { computed, watch } from 'vue'

import HoldingsTable from '@/components/dashboard/HoldingsTable.vue'
import PortfolioChart from '@/components/dashboard/PortfolioChart.vue'
import StatCard from '@/components/ui/StatCard.vue'
import { formatCurrency } from '@/composables/useFormatCurrency'
import { usePortfolioStore } from '@/stores/portfolio.store'
import { useUserStore } from '@/stores/user.store'

const userStore = useUserStore()
const portfolioStore = usePortfolioStore()

const monthlySub = computed(() => {
  const s = portfolioStore.summary
  if (!s) {
    return undefined
  }
  const v = Math.abs(s.monthlyProfitability)
  const sign = s.monthlyProfitability >= 0 ? '+' : '−'
  return `${sign}${formatCurrency(v)} vs last month`
})

watch(
  () => userStore.currentUser?.id,
  async (id) => {
    if (id === undefined) {
      return
    }
    await portfolioStore.fetchDashboard(id)
  },
  { immediate: true },
)
</script>

<template>
  <v-container class="py-8 dashboard-container" fluid>
    <v-alert v-if="!userStore.currentUser" type="info" variant="tonal" class="mb-4">
      Select a user in the header to load your portfolio.
    </v-alert>

    <v-alert v-else-if="portfolioStore.error" type="error" class="mb-4">
      {{ portfolioStore.error }}
    </v-alert>

    <div v-if="userStore.currentUser && portfolioStore.loading" class="d-flex justify-center py-16">
      <v-progress-circular indeterminate color="secondary" size="48" />
    </div>

    <template v-else-if="userStore.currentUser && portfolioStore.summary">
      <h1 class="text-h4 display-font font-weight-bold mb-6">Dashboard</h1>

      <div class="bento">
        <StatCard
          class="bento-balance"
          label="Total Balance"
          :value="portfolioStore.formattedBalance"
          accent-border
        />
        <StatCard
          class="bento-assets"
          label="Assets"
          :value="String(portfolioStore.summary.totalAssets)"
          sub="Unique positions"
        />
        <StatCard
          class="bento-return"
          label="Monthly Return"
          :value="`${portfolioStore.profitabilitySign}${formatCurrency(Math.abs(portfolioStore.summary.monthlyProfitability))}`"
          :sub="monthlySub"
        />
        <div class="bento-chart">
          <PortfolioChart :chart-data="portfolioStore.chart?.chartData ?? []" />
        </div>
        <div class="bento-holdings">
          <v-card>
            <v-card-title class="display-font">Holdings</v-card-title>
            <v-card-text>
              <HoldingsTable :holdings="portfolioStore.summary.holdings" />
            </v-card-text>
          </v-card>
        </div>
      </div>
    </template>
  </v-container>
</template>

<style scoped>
.dashboard-container {
  max-width: 1200px;
}

.bento {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.bento-balance {
  grid-column: span 2;
}

.bento-assets {
  grid-column: span 1;
}

.bento-return {
  grid-column: span 1;
}

.bento-chart {
  grid-column: span 2;
}

.bento-holdings {
  grid-column: 1 / -1;
}

@media (max-width: 960px) {
  .bento {
    grid-template-columns: 1fr;
  }

  .bento-balance,
  .bento-assets,
  .bento-return,
  .bento-chart,
  .bento-holdings {
    grid-column: 1 / -1;
  }
}
</style>
