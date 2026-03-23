<script setup lang="ts">
defineProps<{
  ticker: string
}>()
</script>

<template>
  <v-chip variant="outlined" color="secondary" size="small" class="mono font-weight-medium">
    {{ ticker }}
  </v-chip>
</template>
