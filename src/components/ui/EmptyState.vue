<script setup lang="ts">
defineProps<{
  message: string
}>()
</script>

<template>
  <v-card class="text-center pa-8">
    <v-icon size="48" color="secondary">mdi-inbox-outline</v-icon>
    <p class="text-muted mt-4">{{ message }}</p>
  </v-card>
</template>
