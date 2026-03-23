<script setup lang="ts">
defineProps<{
  label: string
  value: string
  sub?: string
  accentBorder?: boolean
}>()
</script>

<template>
  <v-card class="stat-card" :class="{ 'accent-border': accentBorder }">
    <v-card-text>
      <p class="label text-uppercase text-muted text-caption">{{ label }}</p>
      <p class="value display-font font-weight-bold">{{ value }}</p>
      <p v-if="sub" class="sub text-muted text-caption mt-1">{{ sub }}</p>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.value {
  font-size: 2rem;
  font-family: var(--font-mono);
}

.accent-border {
  border-left: 3px solid var(--accent) !important;
}
</style>
