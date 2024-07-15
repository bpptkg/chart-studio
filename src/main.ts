import { registerPlugins } from '@/plugins'

import App from './App.vue'
import { useUserStore } from './stores/user'
import { createApp } from 'vue'

const app = createApp(App)

registerPlugins(app)

function initApp() {
  app.mount('#app')
}

async function initialize() {
  const userStore = useUserStore()

  userStore
    .getUser()
    .then(() => {
      initApp()
    })
    .catch(() => {
      if (import.meta.env.MODE === 'production') {
        return (window.location.href = import.meta.env.VITE_CENDANA_URL || '/')
      } else {
        initApp()
      }
    })
}

window.addEventListener('load', () => {
  initialize()
})
