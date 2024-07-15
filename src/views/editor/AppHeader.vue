<template>
  <v-app-bar flat height="60">
    <div>
      <v-tabs v-model="viewIndex" fixed-tabs background-color="transparent">
        <v-tab to="/file/build" value="/file/build">Build</v-tab>
        <v-tab to="/file/compare" value="/file/compare">Compare</v-tab>
        <v-tab to="/file/request" value="/file/request">Request</v-tab>
      </v-tabs>
    </div>

    <div class="d-flex align-center ml-4">
      <v-tooltip
        v-if="workspaceStore.isBuildView || workspaceStore.isCompareView"
        bottom
        :open-delay="500"
        :open-on-click="false"
        :open-on-focus="false"
      >
        <template v-slot:activator="{ props }">
          <v-btn icon size="small" v-bind="props" @click="createNewChart">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>New chart</span>
      </v-tooltip>

      <v-tooltip
        v-if="workspaceStore.isBuildView || workspaceStore.isCompareView"
        bottom
        :open-delay="500"
        :open-on-click="false"
        :open-on-focus="false"
      >
        <template v-slot:activator="{ props }">
          <v-btn icon size="small" v-bind="props" @click="print">
            <v-icon>mdi-printer-outline</v-icon>
          </v-btn>
        </template>
        <span>Print</span>
      </v-tooltip>

      <v-tooltip
        v-if="workspaceStore.isBuildView || workspaceStore.isCompareView"
        bottom
        :open-delay="500"
        :open-on-click="false"
        :open-on-focus="false"
      >
        <template v-slot:activator="{ props }">
          <v-btn icon size="small" v-bind="props" @click="undo">
            <v-icon>mdi-undo</v-icon>
          </v-btn>
        </template>
        <span>Undo</span>
      </v-tooltip>

      <v-tooltip
        v-if="workspaceStore.isBuildView || workspaceStore.isCompareView"
        bottom
        :open-delay="500"
        :open-on-click="false"
        :open-on-focus="false"
      >
        <template v-slot:activator="{ props }">
          <v-btn icon size="small" v-bind="props" @click="redo">
            <v-icon>mdi-redo</v-icon>
          </v-btn>
        </template>
        <span>Redo</span>
      </v-tooltip>
    </div>

    <v-spacer></v-spacer>

    <div class="d-flex align-center">
      <div class="mx-2">
        <v-tooltip
          v-if="workspaceStore.isBuildView || workspaceStore.isCompareView"
          bottom
          :open-delay="500"
          :open-on-click="false"
          :open-on-focus="false"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              icon
              size="small"
              v-bind="props"
              @click="handleToggleLeftSidebar"
            >
              <sidebar-left-icon></sidebar-left-icon>
            </v-btn>
          </template>
          <span>Toggle left sidebar</span>
        </v-tooltip>

        <v-tooltip
          v-if="workspaceStore.isBuildView"
          bottom
          :open-delay="500"
          :open-on-click="false"
          :open-on-focus="false"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              icon
              size="small"
              v-bind="props"
              @click="handleToggleRightSidebar"
            >
              <sidebar-right-icon></sidebar-right-icon>
            </v-btn>
          </template>
          <span>Toggle right sidebar</span>
        </v-tooltip>
      </div>

      <settings-menu></settings-menu>

      <div class="ml-4">
        <user-avatar></user-avatar>
      </div>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
  import { SidebarLeftIcon, SidebarRightIcon } from '@/components/icons'
  import router from '@/router'
  import { useChartStore } from '@/stores/chart'
  import { useCompareStore } from '@/stores/compare'
  import { useWorkspaceStore } from '@/stores/workspace'
  import { storeToRefs } from 'pinia'
  import printJS from 'print-js'
  import SettingsMenu from '../SettingsMenu.vue'
  import UserAvatar from '../UserAvatar.vue'

  const workspaceStore = useWorkspaceStore()
  const { viewIndex } = storeToRefs(workspaceStore)

  const chartStore = useChartStore()
  const compareStore = useCompareStore()

  function createNewChart() {
    // For now, just open a new tab.
    const route = router.resolve({ path: '/file/build' })
    if (route) {
      window.open(route.href, '_blank')
    }
  }

  function print() {
    if (workspaceStore.isBuildView) {
      printJS({
        printable: 'printable-build',
        type: 'html',
      })
    } else if (workspaceStore.isCompareView) {
      printJS({
        printable: 'printable-compare',
        type: 'html',
      })
    }
  }

  function undo() {
    if (workspaceStore.isBuildView) {
      chartStore.undo()
    } else if (workspaceStore.isCompareView) {
      compareStore.undo()
    }
  }

  function redo() {
    if (workspaceStore.isBuildView) {
      chartStore.redo()
    } else if (workspaceStore.isCompareView) {
      compareStore.redo()
    }
  }

  function handleToggleLeftSidebar() {
    if (workspaceStore.isBuildView) {
      workspaceStore.toggleBuildLeftSidebar()
    } else if (workspaceStore.isCompareView) {
      workspaceStore.toggleCompareLeftSidebar()
    }
  }

  function handleToggleRightSidebar() {
    // Only works on build view.
    if (workspaceStore.isBuildView) {
      workspaceStore.toggleBuildRightSidebar()
    }
  }
</script>
