<template>
  <div class="preview-pane">
    <v-toolbar height="40px" :color="theme.current.value.colors.background">
      <div class="ml-2">Preview</div>

      <v-spacer></v-spacer>

      <slot name="toolbar"></slot>
    </v-toolbar>

    <v-divider></v-divider>

    <v-progress-linear
      class="loader"
      v-show="loading"
      indeterminate
    ></v-progress-linear>

    <div class="canvas" :class="{ 'canvas--dark': isDarkTheme }">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useTheme } from 'vuetify'

  interface Props {
    loading?: boolean
  }

  withDefaults(defineProps<Props>(), {
    loading: false,
  })

  const theme = useTheme()

  const isDarkTheme = computed(() => theme.global.current.value.dark)
</script>

<style lang="scss" scoped>
  .preview-pane {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .loader {
    z-index: 999;
  }

  .canvas {
    position: absolute;
    top: 40px;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ececec;

    &--dark {
      background-color: #363636;
    }
  }
</style>
