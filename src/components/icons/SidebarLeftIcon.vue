<template>
  <svg
    width="20"
    height="16"
    viewBox="0 0 20 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M1 0H19C19.55 0 20 0.45 20 1V15C20 15.55 19.55 16 19 16H1C0.45 16 0 15.55 0 15V1C0 0.45 0.45 0 1 0ZM8 14H18V2H8V14Z"
      :fill="isDarkTheme ? '#fff' : 'rgba(0,0,0,.54)'"
    />
  </svg>
</template>

<script setup lang="ts">
  import { useTheme } from 'vuetify'

  const theme = useTheme()

  const isDarkTheme = computed(() => theme.global.current.value.dark)
</script>
