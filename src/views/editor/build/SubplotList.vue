<template>
  <div>
    <div class="d-flex align-center justify-space-between mr-6">
      <v-list-subheader class="ml-2">Subplots</v-list-subheader>

      <div class="d-flex align-center">
        <subplot-selector></subplot-selector>

        <v-tooltip
          bottom
          :open-delay="500"
          :open-on-click="false"
          :open-on-focus="false"
        >
          <template v-slot:activator="{ props }">
            <v-btn icon size="small" flat @click="deleteSubplot" v-bind="props">
              <v-icon>mdi-minus</v-icon>
            </v-btn>
          </template>
          <span>Remove subplot</span>
        </v-tooltip>

        <v-tooltip
          bottom
          :open-delay="500"
          :open-on-click="false"
          :open-on-focus="false"
        >
          <template v-slot:activator="{ props }">
            <v-btn icon size="small" flat @click="moveSubplotUp" v-bind="props">
              <v-icon>mdi-arrow-up</v-icon>
            </v-btn>
          </template>
          <span>Move subplot up</span>
        </v-tooltip>

        <v-tooltip
          bottom
          :open-delay="500"
          :open-on-click="false"
          :open-on-focus="false"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              icon
              size="small"
              flat
              @click="moveSubplotDown"
              v-bind="props"
            >
              <v-icon>mdi-arrow-down</v-icon>
            </v-btn>
          </template>
          <span>Move subplot down</span>
        </v-tooltip>
      </div>
    </div>

    <v-list
      v-if="subplots.length > 0"
      mandatory
      v-model:selected="subplotIndexes"
      select-strategy="single-leaf"
    >
      <v-list-item
        v-for="(subplot, index) in subplots"
        :key="index"
        :value="index"
      >
        <v-list-item-title>{{
          DataTypeNameMap[subplot.dataType]
        }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup lang="ts">
  import SubplotSelector from './SubplotSelector.vue'
  import { useChartStore } from '@/stores/chart'
  import { storeToRefs } from 'pinia'
  import { useWorkspaceStore } from '@/stores/workspace'
  import { watch } from 'vue'
  import { DataTypeNameMap } from '@/model/types'

  const chartStore = useChartStore()
  const { subplots } = storeToRefs(chartStore)

  const subplotIndexes = computed({
    get: () => [subplotIndex.value],
    set: (value: number[]) => {
      workspaceStore.setSubplotIndex(value[0])
    },
  })

  const workspaceStore = useWorkspaceStore()
  const { subplotIndex } = storeToRefs(workspaceStore)

  function deleteSubplot(): void {
    if (subplots.value.length > 0) {
      chartStore.removeSubplot(subplotIndex.value)
      // Reset index to 0.
      workspaceStore.resetSubplotIndex()
    }
  }

  function moveSubplotUp(): void {
    if (subplotIndex.value > 0 && subplots.value.length > 1) {
      const from = subplotIndex.value
      const to = from - 1
      chartStore.moveSubplot(from, to)
      workspaceStore.setSubplotIndex(to)
    }
  }

  function moveSubplotDown(): void {
    const length = subplots.value.length
    if (subplotIndex.value < length - 1 && length > 1) {
      const from = subplotIndex.value
      const to = from + 1
      chartStore.moveSubplot(from, to)
      workspaceStore.setSubplotIndex(to)
    }
  }

  // Reset seriesIndex every time subplotIndex changed.
  watch(subplotIndex, () => {
    workspaceStore.resetSeriesIndex()
  })
</script>
