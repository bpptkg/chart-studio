<template>
  <v-app>
    <app-header></app-header>
    <v-main>
      <v-divider></v-divider>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
  import AppHeader from './AppHeader.vue'
  import { useTheme } from 'vuetify'
  import { THEME_KEY } from '@/constants/theme'

  const theme = useTheme()

  onMounted(() => {
    const themeValue = localStorage.getItem(THEME_KEY)
    if (themeValue) {
      theme.global.name.value = themeValue
    }
  })
</script>

<style lang="scss">
  @import '@/styles/customize.scss';
</style>
