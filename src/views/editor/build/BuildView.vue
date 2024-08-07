<template>
  <splitpanes
    class="cs-theme"
    :class="{ 'cs-theme--dark': isDarkTheme }"
    @resize="handlePaneResize"
  >
    <pane v-if="workspaceStore.showBuildLeftSidebar" :size="leftPaneSize">
      <builder-pane></builder-pane>
    </pane>
    <pane :size="mainPaneSize">
      <preview-pane></preview-pane>
    </pane>
    <pane v-if="workspaceStore.showBuildRightSidebar" :size="rightPaneSize">
      <property-pane></property-pane>
    </pane>
  </splitpanes>
</template>

<script setup lang="ts">
  import { useTheme } from 'vuetify'
  import { PaneDimension } from '@/shared/pane'
  import { useBuildViewStore } from '@/stores/buildView'
  import { useWorkspaceStore } from '@/stores/workspace'
  import { storeToRefs } from 'pinia'
  import { Splitpanes, Pane } from 'splitpanes'
  import { nextTick, watch } from 'vue'
  import BuilderPane from './BuilderPane.vue'
  import PreviewPane from './PreviewPane.vue'
  import PropertyPane from './PropertyPane.vue'

  const theme = useTheme()

  const isDarkTheme = computed(() => theme.global.current.value.dark)

  const workspaceStore = useWorkspaceStore()
  const { showBuildLeftSidebar, showBuildRightSidebar } =
    storeToRefs(workspaceStore)

  const buildViewStore = useBuildViewStore()
  const { leftPaneSize, rightPaneSize, mainPaneSize } =
    storeToRefs(buildViewStore)

  function handlePaneResize(event: PaneDimension[]) {
    if (workspaceStore.showBuildLeftSidebar) {
      buildViewStore.setLeftPaneSize(event[0].size)
    }
    if (workspaceStore.showBuildRightSidebar) {
      buildViewStore.setRightPaneSize(event[event.length - 1].size)
    }
  }

  // Whenever sidebar hidden or shown, add small fraction to the opposite sidebar
  // in order to fast rerender the pane.
  watch(showBuildLeftSidebar, () => {
    nextTick(() => {
      buildViewStore.setRightPaneSize(rightPaneSize.value + 1e-5)
    })
  })

  watch(showBuildRightSidebar, () => {
    nextTick(() => {
      buildViewStore.setLeftPaneSize(leftPaneSize.value + 1e-5)
    })
  })
</script>

<style lang="scss">
  @import '@/styles/splitpanes.scss';
</style>
