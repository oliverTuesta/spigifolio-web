<script setup lang="ts">
import type { MovementType } from '@/types'

defineProps<{
  type: MovementType
}>()
</script>

<template>
  <v-chip v-if="type === 'BUY'" color="primary" size="small">Buy</v-chip>
  <v-chip
    v-else-if="type === 'SELL'"
    variant="outlined"
    color="error"
    size="small"
  >
    Sell
  </v-chip>
  <v-chip v-else color="accent" size="small" class="text-black">Dividend</v-chip>
</template>
