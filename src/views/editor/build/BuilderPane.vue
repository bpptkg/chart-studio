<template>
  <div class="builder-pane">
    <v-toolbar height="40" :color="theme.current.value.colors.background">
      <div class="ml-2">Plot</div>
    </v-toolbar>

    <v-divider></v-divider>

    <div class="builder-pane-content">
      <scroll-wrapper>
        <range-selector></range-selector>
        <v-divider></v-divider>
        <subplot-list></subplot-list>
      </scroll-wrapper>
    </div>
  </div>
</template>

<script setup lang="ts">
  import ScrollWrapper from '@/components/ScrollWrapper.vue'
  import RangeSelector from './RangeSelector.vue'
  import SubplotList from './SubplotList.vue'
  import { useTheme } from 'vuetify';

  const theme = useTheme()
</script>

<style lang="scss" scoped>
  .builder-pane {
    height: 100%;
    width: 100%;
    position: relative;

    &-content {
      bottom: 0;
      left: 0;
      right: 0;
      position: absolute;
      top: 40px;
    }
  }
</style>
