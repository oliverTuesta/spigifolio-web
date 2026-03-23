<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import MovementsTable from '@/components/movements/MovementsTable.vue'
import { usePagination } from '@/composables/usePagination'
import type { MovementType } from '@/types'
import { useMovementsStore } from '@/stores/movements.store'
import { useUserStore } from '@/stores/user.store'

const userStore = useUserStore()
const movementsStore = useMovementsStore()

const typeFilter = ref<'ALL' | MovementType>('ALL')
const from = ref('')
const to = ref('')

const totalPages = computed(() => movementsStore.movements?.totalPages ?? 1)
const { page, limit, goToPage } = usePagination(totalPages)

const typeSelectItems = [
  { title: 'All types', value: 'ALL' },
  { title: 'Buy', value: 'BUY' },
  { title: 'Sell', value: 'SELL' },
  { title: 'Dividend', value: 'DIVIDEND' },
] as const

function buildQuery() {
  return {
    type: typeFilter.value === 'ALL' ? undefined : typeFilter.value,
    from: from.value || undefined,
    to: to.value || undefined,
    page: page.value,
    limit: limit.value,
  }
}

async function loadMovements() {
  const uid = userStore.currentUser?.id
  if (uid === undefined) {
    return
  }
  await movementsStore.fetchMovements(uid, buildQuery())
}

watch([typeFilter, from, to], () => {
  goToPage(1)
})

watch(
  [page, typeFilter, from, to, () => userStore.currentUser?.id],
  async () => {
    await loadMovements()
  },
  { immediate: true },
)

function clearFilters() {
  typeFilter.value = 'ALL'
  from.value = ''
  to.value = ''
  goToPage(1)
}
</script>

<template>
  <v-container class="py-8 movements-page" fluid>
    <v-alert v-if="!userStore.currentUser" type="info" variant="tonal" class="mb-4">
      Select a user to view movements.
    </v-alert>

    <v-alert v-else-if="movementsStore.error" type="error" class="mb-4">
      {{ movementsStore.error }}
    </v-alert>

    <div v-if="userStore.currentUser && movementsStore.loading" class="d-flex justify-center py-16">
      <v-progress-circular indeterminate color="secondary" size="48" />
    </div>

    <template v-else-if="userStore.currentUser">
      <h1 class="text-h4 display-font font-weight-bold mb-6">Movements</h1>

      <v-card class="pa-4 mb-6">
        <div class="d-flex flex-wrap align-end ga-4">
          <v-select
            v-model="typeFilter"
            label="Type"
            :items="typeSelectItems"
            item-title="title"
            item-value="value"
            max-width="220"
            hide-details
          />
          <v-text-field v-model="from" type="date" label="From" hide-details max-width="200" />
          <v-text-field v-model="to" type="date" label="To" hide-details max-width="200" />
          <v-btn variant="outlined" @click="clearFilters">Clear</v-btn>
        </div>
      </v-card>

      <MovementsTable />

      <div v-if="(movementsStore.movements?.total ?? 0) > 0" class="d-flex justify-center mt-4">
        <v-pagination
          v-model="page"
          :length="totalPages"
          rounded="circle"
          color="secondary"
        />
      </div>
    </template>

    <v-btn
      class="fab-add-movement"
      icon="mdi-plus"
      color="primary"
      size="large"
      :to="{ name: 'add-movement' }"
    />
  </v-container>
</template>

<style scoped>
.movements-page {
  position: relative;
  padding-bottom: 96px;
}

.fab-add-movement {
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 10;
}
</style>
