<template>
  <div>
    <v-select v-model="field" :items="fields" label="Field"></v-select>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { WeatherBabadanConfig } from '@/model/types'
import { computed, Ref, ref } from 'vue'

interface Props {
  config?: WeatherBabadanConfig
}

interface Emits {
  (event: 'update', config: WeatherBabadanConfig): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const fields = ref([
  { value: 'cumulative_rainfall', text: 'Rainfall' },
  { value: 'rate', text: 'Rate' },
  { value: 'wind_direction_avg', text: 'Wind Direction' },
  { value: 'wind_speed_avg', text: 'Wind Speed' },
  { value: 'air_temperature', text: 'Air Temperature' },
  { value: 'air_pressure', text: 'Air Pressure' },
  { value: 'relative_humidity', text: 'Air Humidity' },
]) as Ref<
  {
    value: WeatherBabadanConfig['field']
    text: string
  }[]
>

const field = computed({
  get() {
    return props.config?.field || 'cumulative_rainfall'
  },
  set(value) {
    emit(
      'update',
      Object.assign(
        {},
        {
          field: value,
        }
      )
    )
  },
})
</script>
