<script setup lang="ts">
import type { DataTableHeader } from 'vuetify'

import TickerBadge from '@/components/ui/TickerBadge.vue'
import TypeBadge from '@/components/ui/TypeBadge.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import { useFormatCurrency } from '@/composables/useFormatCurrency'
import type { PortfolioHoldingSummary } from '@/types'

defineProps<{
  holdings: PortfolioHoldingSummary[]
}>()

const { formatCurrency } = useFormatCurrency()

const headers: DataTableHeader[] = [
  { title: 'Ticker', key: 'ticker', sortable: false },
  { title: 'Asset', key: 'name' },
  { title: 'Type', key: 'type', sortable: false },
  { title: 'Qty', key: 'quantity', align: 'end' },
  { title: 'Avg Buy', key: 'avgBuyPrice', align: 'end' },
  { title: 'Current Price', key: 'currentPrice', align: 'end' },
  { title: 'Total Value', key: 'totalValue', align: 'end' },
  { title: 'Unrealized Gain', key: 'unrealizedGain', align: 'end' },
]
</script>

<template>
  <div>
    <EmptyState v-if="holdings.length === 0" message="No holdings yet." />
    <v-data-table
      v-else
      :headers="headers"
      :items="holdings"
      item-value="ticker"
      class="holdings-table"
    >
      <template #[`item.ticker`]="{ item }">
        <TickerBadge :ticker="item.ticker" />
      </template>
      <template #[`item.type`]="{ item }">
        <TypeBadge :type="item.type" />
      </template>
      <template #[`item.quantity`]="{ item }">
        <span class="mono">{{ item.quantity }}</span>
      </template>
      <template #[`item.avgBuyPrice`]="{ item }">
        <span class="mono">{{ formatCurrency(item.avgBuyPrice) }}</span>
      </template>
      <template #[`item.currentPrice`]="{ item }">
        <span class="mono">{{ formatCurrency(item.currentPrice) }}</span>
      </template>
      <template #[`item.totalValue`]="{ item }">
        <span class="mono">{{ formatCurrency(item.totalValue) }}</span>
      </template>
      <template #[`item.unrealizedGain`]="{ item }">
        <span
          class="mono font-weight-bold"
          :class="item.unrealizedGain >= 0 ? 'text-gain' : 'text-loss'"
        >
          {{ formatCurrency(item.unrealizedGain) }}
        </span>
      </template>
    </v-data-table>
  </div>
</template>
