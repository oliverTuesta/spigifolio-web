<script setup lang="ts">
import type { DataTableHeader } from 'vuetify'
import { computed } from 'vue'

import MovementBadge from '@/components/ui/MovementBadge.vue'
import TickerBadge from '@/components/ui/TickerBadge.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import { useFormatCurrency } from '@/composables/useFormatCurrency'
import { useFormatDate } from '@/composables/useFormatDate'
import { useMovementsStore } from '@/stores/movements.store'

const movementsStore = useMovementsStore()
const { formatCurrency } = useFormatCurrency()
const { formatDate } = useFormatDate()

const items = computed(() => movementsStore.movements?.data ?? [])

const headers: DataTableHeader[] = [
  { title: 'Date', key: 'date', sortable: false },
  { title: 'Type', key: 'type', sortable: false },
  { title: 'Ticker', key: 'ticker', sortable: false },
  { title: 'Asset', key: 'assetName', sortable: false },
  { title: 'Qty', key: 'quantity', align: 'end', sortable: false },
  { title: 'Price', key: 'price', align: 'end', sortable: false },
  { title: 'Total', key: 'total', align: 'end', sortable: false },
]

/** Flatten nested asset for table row keys / slots. */
const tableRows = computed(() =>
  items.value.map((m) => ({
    ...m,
    ticker: m.asset.ticker,
    assetName: m.asset.name,
  })),
)
</script>

<template>
  <div>
    <EmptyState v-if="!movementsStore.loading && tableRows.length === 0" message="No movements found." />
    <v-data-table
      v-else-if="tableRows.length > 0"
      :headers="headers"
      :items="tableRows"
      item-value="id"
      class="movements-table"
    >
      <template #[`item.date`]="{ item }">
        <span>{{ formatDate(item.date) }}</span>
      </template>
      <template #[`item.type`]="{ item }">
        <MovementBadge :type="item.type" />
      </template>
      <template #[`item.ticker`]="{ item }">
        <TickerBadge :ticker="item.ticker" />
      </template>
      <template #[`item.quantity`]="{ item }">
        <span class="mono">{{ item.quantity ?? '—' }}</span>
      </template>
      <template #[`item.price`]="{ item }">
        <span class="mono">{{ formatCurrency(item.price) }}</span>
      </template>
      <template #[`item.total`]="{ item }">
        <span class="mono">{{ formatCurrency(item.total) }}</span>
      </template>
    </v-data-table>
  </div>
</template>
