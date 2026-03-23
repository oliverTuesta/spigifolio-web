<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { useUserStore } from '@/stores/user.store'

const route = useRoute()
const userStore = useUserStore()

const navLinks = [
  { name: 'dashboard', path: '/', label: 'Dashboard' },
  { name: 'assets', path: '/assets', label: 'Assets' },
  { name: 'movements', path: '/movements', label: 'Movements' },
] as const

const initials = computed(() => {
  const n = userStore.currentUser?.name
  if (!n) {
    return ''
  }
  const parts = n.trim().split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0]![0]! + parts[1]![0]!).toUpperCase()
  }
  return n.slice(0, 2).toUpperCase()
})
</script>

<template>
  <v-app-bar flat color="background" border="b">
    <v-app-bar-title>
      <span class="text-secondary">-</span>
      <span class="display-font ml-2">SPIGIFOLIO</span>
    </v-app-bar-title>
    <template #append>
      <div class="nav-links d-flex ga-2 mr-4">
        <v-btn
          v-for="link in navLinks"
          :key="link.name"
          :to="link.path"
          rounded="pill"
          :variant="route.name === link.name ? 'flat' : 'text'"
          :color="route.name === link.name ? 'primary' : 'default'"
        >
          {{ link.label }}
        </v-btn>
      </div>

      <v-menu v-if="!userStore.currentUser">
        <template #activator="{ props: menuProps }">
          <v-btn v-bind="menuProps" variant="outlined" rounded="pill">Select user</v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="user in userStore.users"
            :key="user.id"
            @click="userStore.setCurrentUser(user)"
          >
            {{ user.name }}
          </v-list-item>
        </v-list>
      </v-menu>

      <v-avatar v-else color="primary" size="36" class="ml-2 cursor-pointer">
        <span class="text-white text-caption font-weight-bold">{{ initials }}</span>
        <v-tooltip activator="parent" location="bottom">
          {{ userStore.currentUser.name }}
        </v-tooltip>
      </v-avatar>
    </template>
  </v-app-bar>
</template>
