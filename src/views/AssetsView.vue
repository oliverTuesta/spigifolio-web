<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import AssetCard from '@/components/assets/AssetCard.vue'
import type { AssetType } from '@/types'
import { useAssetsStore } from '@/stores/assets.store'

const assetsStore = useAssetsStore()

const search = ref('')
const filterType = ref<'ALL' | AssetType>('ALL')

const dialogOpen = ref(false)
const formTicker = ref('')
const formName = ref('')
const formType = ref<AssetType>('STOCK')

const filteredAssets = computed(() => {
  let list = assetsStore.assets
  if (filterType.value !== 'ALL') {
    list = list.filter((a) => a.type === filterType.value)
  }
  const q = search.value.trim().toLowerCase()
  if (q) {
    list = list.filter(
      (a) =>
        a.ticker.toLowerCase().includes(q) ||
        a.name.toLowerCase().includes(q),
    )
  }
  return list
})

onMounted(() => {
  void assetsStore.fetchAssets()
})

async function submitAsset() {
  await assetsStore.createAsset({
    ticker: formTicker.value.trim(),
    name: formName.value.trim(),
    type: formType.value,
  })
  dialogOpen.value = false
  formTicker.value = ''
  formName.value = ''
  formType.value = 'STOCK'
}

async function onDelete(id: number) {
  if (globalThis.confirm('Remove this asset?')) {
    await assetsStore.removeAsset(id)
  }
}

const typeOptions: { label: string; value: 'ALL' | AssetType }[] = [
  { label: 'ALL', value: 'ALL' },
  { label: 'STOCK', value: 'STOCK' },
  { label: 'ETF', value: 'ETF' },
  { label: 'BOND', value: 'BOND' },
  { label: 'CRYPTO', value: 'CRYPTO' },
]

const assetTypeSelectItems: AssetType[] = ['STOCK', 'ETF', 'BOND', 'CRYPTO']
</script>

<template>
  <v-container class="py-8" fluid>
    <v-alert v-if="assetsStore.error" type="error" class="mb-4">
      {{ assetsStore.error }}
    </v-alert>

    <div v-if="assetsStore.loading" class="d-flex justify-center py-16">
      <v-progress-circular indeterminate color="secondary" size="48" />
    </div>

    <template v-else>
      <div class="d-flex flex-wrap justify-space-between align-center mb-6 ga-4">
        <h1 class="text-h4 display-font font-weight-bold">Assets</h1>
        <v-btn color="primary" @click="dialogOpen = true">+ Add Asset</v-btn>
      </div>

      <v-text-field
        v-model="search"
        prepend-inner-icon="mdi-magnify"
        label="Search"
        hide-details
        class="mb-4"
        max-width="400"
      />

      <v-chip-group v-model="filterType" selected-class="chip-active" mandatory class="mb-6">
        <v-chip
          v-for="opt in typeOptions"
          :key="opt.value"
          :value="opt.value"
          filter
          variant="outlined"
        >
          {{ opt.label }}
        </v-chip>
      </v-chip-group>

      <div class="asset-grid">
        <AssetCard
          v-for="asset in filteredAssets"
          :key="asset.id"
          :asset="asset"
          @delete="onDelete"
        />
      </div>
    </template>

    <v-dialog v-model="dialogOpen" max-width="480">
      <v-card>
        <v-card-title class="display-font">New asset</v-card-title>
        <v-card-text>
          <v-text-field v-model="formTicker" label="Ticker" class="mb-2" />
          <v-text-field v-model="formName" label="Name" class="mb-2" />
          <v-select v-model="formType" label="Type" :items="assetTypeSelectItems" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="dialogOpen = false">Cancel</v-btn>
          <v-btn
            color="primary"
            :disabled="!formTicker.trim() || !formName.trim()"
            @click="submitAsset"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
.asset-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

@media (max-width: 960px) {
  .asset-grid {
    grid-template-columns: 1fr;
  }
}

:deep(.chip-active) {
  background-color: var(--text) !important;
  color: var(--bg-card) !important;
}
</style>
