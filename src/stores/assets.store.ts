import { defineStore } from 'pinia'
import { ref } from 'vue'

import * as assetsService from '@/services/assets.service'
import type { Asset, AssetType } from '@/types'

export const useAssetsStore = defineStore('assets', () => {
  const assets = ref<Asset[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchAssets() {
    loading.value = true
    error.value = null
    try {
      assets.value = await assetsService.getAll()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load assets'
    } finally {
      loading.value = false
    }
  }

  async function createAsset(data: { ticker: string; name: string; type: AssetType }) {
    loading.value = true
    error.value = null
    try {
      const created = await assetsService.create(data)
      assets.value = [...assets.value, created]
      return created
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to create asset'
      throw e
    } finally {
      loading.value = false
    }
  }

  async function removeAsset(id: number) {
    loading.value = true
    error.value = null
    try {
      await assetsService.remove(id)
      assets.value = assets.value.filter((a) => a.id !== id)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to remove asset'
      throw e
    } finally {
      loading.value = false
    }
  }

  return {
    assets,
    loading,
    error,
    fetchAssets,
    createAsset,
    removeAsset,
  }
})
