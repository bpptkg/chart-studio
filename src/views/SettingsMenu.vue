<template>
  <v-menu bottom offset-y rounded>
    <template #activator="{ props }">
      <v-tooltip
        bottom
        :open-delay="500"
        :open-on-click="false"
        :open-on-focus="false"
      >
        <template #activator="{ props: tooltip }">
          <v-btn icon size="small" v-bind="{ ...props, ...tooltip }">
            <v-icon>mdi-cog-outline</v-icon>
          </v-btn>
        </template>
        <span>Settings</span>
      </v-tooltip>
    </template>

    <v-list dense>
      <v-list-item @click="toggleDarkTheme">
        <template v-slot:prepend>
          <v-icon>mdi-weather-night</v-icon>
        </template>

        <v-list-item-title>{{
          currentTheme.dark ? 'Disable dark theme' : 'Enable dark theme'
        }}</v-list-item-title>
      </v-list-item>

      <v-list-item
        href="https://github.com/bpptkg/chart-studio"
        target="_blank"
      >
        <template v-slot:prepend>
          <v-icon>mdi-github</v-icon>
        </template>

        <v-list-item-title>GitHub</v-list-item-title>
      </v-list-item>

      <v-list-item
        href="https://github.com/bpptkg/chart-studio/issues"
        target="_blank"
      >
        <template v-slot:prepend>
          <v-icon>mdi-message-alert-outline</v-icon>
        </template>

        <v-list-item-title>Report an issue</v-list-item-title>
      </v-list-item>

      <v-list-item href="https://bma.cendana15.com/docs/" target="_blank">
        <template v-slot:prepend>
          <v-icon>mdi-api</v-icon>
        </template>

        <v-list-item-title>API Documentation</v-list-item-title>
      </v-list-item>

      <v-list-item target="_blank" to="/about">
        <template v-slot:prepend>
          <v-icon>mdi-information-outline</v-icon>
        </template>

        <v-list-item-title>About</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
  import { useTheme } from 'vuetify'
  import { THEME_KEY } from '@/constants/theme'

  const theme = useTheme()

  const currentTheme = computed(() => theme.global.current.value)

  function toggleDarkTheme() {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
    localStorage.setItem(THEME_KEY, theme.global.name.value)
  }
</script>
