<template>
  <div>
    <v-select v-model="field" :items="fields" label="Field"></v-select>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  import { WeatherJurangJeroConfig } from '@/model/types'
  import { computed, Ref, ref } from 'vue'

  interface Props {
    config?: WeatherJurangJeroConfig
  }

  interface Emits {
    (event: 'update', config: WeatherJurangJeroConfig): void
  }

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()

  const fields = ref([
    { value: 'cumulative_rainfall', title: 'Rainfall' },
    { value: 'rate', title: 'Rate' },
    { value: 'wind_direction_avg', title: 'Wind Direction' },
    { value: 'wind_speed_avg', title: 'Wind Speed' },
    { value: 'air_temperature', title: 'Air Temperature' },
    { value: 'relative_humidity', title: 'Air Humidity' },
    { value: 'air_pressure', title: 'Air Pressure' },
  ]) as Ref<
    {
      value: WeatherJurangJeroConfig['field']
      title: string
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
