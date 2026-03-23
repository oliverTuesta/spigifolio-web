import { defineStore } from 'pinia'
import { ref } from 'vue'

import * as usersService from '@/services/users.service'
import type { User } from '@/types'

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([])
  const currentUser = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchUsers() {
    loading.value = true
    error.value = null
    try {
      users.value = await usersService.getAll()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load users'
    } finally {
      loading.value = false
    }
  }

  function setCurrentUser(user: User) {
    currentUser.value = user
  }

  return {
    users,
    currentUser,
    loading,
    error,
    fetchUsers,
    setCurrentUser,
  }
})
