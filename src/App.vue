<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'

import AppNavbar from '@/components/layout/AppNavbar.vue'
import { useUserStore } from '@/stores/user.store'

const userStore = useUserStore()

onMounted(() => {
  void userStore.fetchUsers()
})
</script>

<template>
  <v-app>
    <AppNavbar />
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>
