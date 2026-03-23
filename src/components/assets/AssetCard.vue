<script setup lang="ts">
import { useRouter } from 'vue-router'

import TickerBadge from '@/components/ui/TickerBadge.vue'
import TypeBadge from '@/components/ui/TypeBadge.vue'
import { useFormatCurrency } from '@/composables/useFormatCurrency'
import type { Asset } from '@/types'

const props =
  defineProps<{
    asset: Asset
  }>()

const emit = defineEmits<{
  delete: [id: number]
}>()

const { formatCurrency } = useFormatCurrency()
const router = useRouter()

function goToMovements() {
  void router.push({ name: 'movements' })
}
</script>

<template>
  <v-card class="asset-card">
    <v-card-text>
      <div class="d-flex justify-space-between align-center mb-3">
        <TickerBadge :ticker="asset.ticker" />
        <TypeBadge :type="asset.type" />
      </div>
      <p class="font-weight-bold text-h6 display-font">{{ asset.name }}</p>
      <v-divider class="my-3" color="#1A1A1A" />
      <p class="text-muted text-caption text-uppercase">Latest Price</p>
      <p class="mono font-weight-bold text-h6">{{ formatCurrency(asset.latestPrice.closePrice) }}</p>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.link-history {
  cursor: pointer;
}
</style>
