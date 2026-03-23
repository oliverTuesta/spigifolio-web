import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'folvest',
    themes: {
      folvest: {
        dark: false,
        colors: {
          background: '#F5F0E8',
          surface: '#FFFFFF',
          primary: '#1A1A1A',
          secondary: '#E85D26',
          accent: '#F2C94C',
          error: '#C0392B',
          success: '#2D6A4F',
          warning: '#F59E0B',
          info: '#E85D26',
        },
      },
    },
  },
  defaults: {
    VCard: {
      elevation: 0,
      border: true,
      rounded: 'lg',
    },
    VBtn: {
      rounded: 'pill',
      elevation: 0,
    },
    VTextField: {
      variant: 'outlined',
      density: 'comfortable',
      rounded: 'lg',
      color: 'secondary',
    },
    VSelect: {
      variant: 'outlined',
      density: 'comfortable',
      rounded: 'lg',
      color: 'secondary',
    },
    VDataTable: {
      hover: true,
    },
    VChip: {
      rounded: 'pill',
    },
    VAlert: {
      rounded: 'lg',
      border: true,
    },
  },
})
