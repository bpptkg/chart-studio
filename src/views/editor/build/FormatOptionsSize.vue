<template>
  <v-expansion-panel>
    <v-expansion-panel-title>Size</v-expansion-panel-title>
    <v-expansion-panel-text>
      <v-row>
        <v-col>
          <v-text-field
            v-model="w"
            label="Width"
            suffix="px"
            type="number"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="h"
            label="Height"
            suffix="px"
            type="number"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup lang="ts">
  import { debounce } from 'lodash'
  import { useChartStore } from '@/stores/chart'
  import { storeToRefs } from 'pinia'
  import { computed } from 'vue'

  const chartStore = useChartStore()
  const { width, height } = storeToRefs(chartStore)

  const w = computed({
    get() {
      return width.value
    },
    set: debounce((value) => {
      width.value = value
    }, 500),
  })

  const h = computed({
    get() {
      return height.value
    },
    set: debounce((value) => {
      height.value = value
    }, 500),
  })
</script>
