<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'

import type { MovementType } from '@/types'
import { useAssetsStore } from '@/stores/assets.store'
import { useMovementsStore } from '@/stores/movements.store'
import { useUserStore } from '@/stores/user.store'

const userStore = useUserStore()
const assetsStore = useAssetsStore()
const movementsStore = useMovementsStore()

const form = reactive({
  type: 'BUY' as MovementType,
  assetId: null as number | null,
  date: '',
  quantity: null as number | null,
  price: 0,
  total: 0,
})

const submitError = ref<string | null>(null)
const success = ref(false)

const isFormValid = computed(() => {
  if (!userStore.currentUser || form.assetId === null || !form.date) {
    return false
  }
  if (form.price <= 0 || form.total <= 0) {
    return false
  }
  if (form.type === 'DIVIDEND') {
    return true
  }
  return form.quantity !== null && form.quantity > 0
})

watch(
  () => [form.type, form.quantity, form.price] as const,
  () => {
    if (form.type === 'DIVIDEND') {
      form.total = Number(form.price) || 0
    } else {
      const q = Number(form.quantity) || 0
      const p = Number(form.price) || 0
      form.total = q * p
    }
  },
  { deep: true },
)

async function onSubmit() {
  if (!userStore.currentUser || form.assetId === null) {
    return
  }
  submitError.value = null
  success.value = false
  try {
    await movementsStore.createMovement({
      userId: userStore.currentUser.id,
      assetId: form.assetId,
      type: form.type,
      date: form.date,
      quantity: form.type === 'DIVIDEND' ? null : form.quantity,
      price: form.price,
      total: form.total,
    })
    success.value = true
  } catch (e) {
    submitError.value = e instanceof Error ? e.message : 'Failed to save'
  }
}

void assetsStore.fetchAssets()
</script>

<template>
  <v-container class="py-8 add-movement-page" fluid>
    <v-alert v-if="!userStore.currentUser" type="info" variant="tonal" class="mb-4">
      Select a user before adding a movement.
    </v-alert>

    <div v-if="userStore.currentUser && assetsStore.loading" class="d-flex justify-center py-16">
      <v-progress-circular indeterminate color="secondary" size="48" />
    </div>

    <v-card v-else-if="userStore.currentUser" class="mx-auto form-card" max-width="580">
      <v-card-title class="display-font text-h5">Add movement</v-card-title>
      <v-card-text>
        <p class="text-caption text-muted mb-4">Log a buy, sell, or dividend for the selected user.</p>

        <label class="text-caption text-muted d-block mb-2">Type</label>
        <v-btn-toggle
          v-model="form.type"
          mandatory
          divided
          variant="outlined"
          color="secondary"
          class="mb-6 type-toggle"
        >
          <v-btn value="BUY" class="text-none">BUY</v-btn>
          <v-btn value="SELL" class="text-none">SELL</v-btn>
          <v-btn value="DIVIDEND" class="text-none">DIVIDEND</v-btn>
        </v-btn-toggle>

        <v-select
          v-model="form.assetId"
          label="Asset"
          :items="assetsStore.assets"
          item-title="name"
          item-value="id"
          class="mb-4"
        />

        <v-text-field v-model="form.date" type="date" label="Date" class="mb-4" />

        <v-text-field
          v-model.number="form.quantity"
          type="number"
          label="Quantity"
          :disabled="form.type === 'DIVIDEND'"
          min="0"
          step="any"
          class="mb-4"
        />

        <v-text-field
          v-model.number="form.price"
          type="number"
          label="Price"
          prefix="$"
          min="0"
          step="0.01"
          class="mb-4"
        />

        <v-text-field
          :model-value="form.total"
          type="number"
          label="Total"
          prefix="$"
          readonly
          class="mb-4"
        />

        <v-btn color="primary" block :disabled="!isFormValid" @click="onSubmit">
          Submit
        </v-btn>

        <v-alert v-if="success" type="success" class="mt-4">
          Movement saved.
          <RouterLink to="/movements" class="text-secondary">View movements</RouterLink>
          or
          <RouterLink to="/" class="text-secondary">Dashboard</RouterLink>
        </v-alert>

        <v-alert v-if="submitError" type="error" class="mt-4">
          {{ submitError }}
        </v-alert>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
.add-movement-page {
  max-width: 640px;
}

.form-card :deep(.type-toggle .v-btn--active[data-value='BUY']) {
  background-color: var(--text) !important;
  color: var(--bg-card) !important;
}

.form-card :deep(.type-toggle .v-btn--active[data-value='SELL']) {
  border-color: var(--loss) !important;
  color: var(--loss) !important;
}

.form-card :deep(.type-toggle .v-btn--active[data-value='DIVIDEND']) {
  background-color: var(--accent-yellow) !important;
  color: var(--text) !important;
}
</style>
