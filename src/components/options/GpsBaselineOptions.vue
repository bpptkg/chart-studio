<template>
  <div>
    <v-select v-model="station1" :items="stations" label="Station 1"></v-select>
    <v-select v-model="station2" :items="stations" label="Station 2"></v-select>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { GpsBaselineConfig } from '@/model/types'
import { computed } from 'vue'
import stations from './gpsStations'

interface Props {
  config?: GpsBaselineConfig
}

interface Emits {
  (event: 'update', config: GpsBaselineConfig): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const station1 = computed({
  get() {
    return props.config?.station1 || stations[0].value
  },
  set(value) {
    emit(
      'update',
      Object.assign(
        {},
        {
          station1: value,
          station2: station2.value,
        }
      )
    )
  },
})

const station2 = computed({
  get() {
    return props.config?.station2 || stations[0].value
  },
  set(value) {
    emit(
      'update',
      Object.assign(
        {},
        {
          station1: station1.value,
          station2: value,
        }
      )
    )
  },
})
</script>
