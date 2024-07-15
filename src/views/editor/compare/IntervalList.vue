<template>
  <div>
    <v-list v-if="intervals.length">
      <v-list-item v-for="(interval, index) in intervals" :key="index">
        <date-range
          :interval="interval"
          @update="(value) => handleUpdate(value, index)"
        ></date-range>
        <template v-slot:append>
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
                v-bind="props"
                @click="compareStore.removeInterval(index)"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </template>
            <span>Remove interval</span>
          </v-tooltip>
        </template>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup lang="ts">
  import DateRange from '@/components/DateRange.vue'
  import { DateInterval } from '@/model/types'
  import { useCompareStore } from '@/stores/compare'
  import { storeToRefs } from 'pinia'

  const compareStore = useCompareStore()

  const { intervals } = storeToRefs(compareStore)

  function handleUpdate(interval: DateInterval, index: number): void {
    compareStore.replaceInterval(interval, index)
  }
</script>
