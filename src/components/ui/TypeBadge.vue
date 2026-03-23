<script setup lang="ts">
import type { AssetType } from '@/types'

defineProps<{
  type: AssetType
}>()
</script>

<template>
  <v-chip size="x-small" class="bg-alt text-text text-caption">
    {{ type }}
  </v-chip>
</template>
