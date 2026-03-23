import { describe, it, expect } from 'vitest'

import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'

import App from '../App.vue'

const vuetify = createVuetify({ components, directives })

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', name: 'dashboard', component: { template: '<div />' } }],
})

describe('App', () => {
  it('mounts and shows app shell', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [createPinia(), router, vuetify],
        stubs: {
          AppNavbar: { template: '<div class="navbar">Spigifolio</div>' },
        },
      },
    })
    expect(wrapper.find('.v-application').exists()).toBe(true)
    expect(wrapper.text()).toContain('Spigifolio')
  })
})
