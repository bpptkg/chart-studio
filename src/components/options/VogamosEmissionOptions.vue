<template>
  <div>
    <v-select v-model="field" :items="fields" label="Field"></v-select>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  import { VogamosEmissionConfig } from '@/model/types'
  import { computed, Ref, ref } from 'vue'

  interface Props {
    config?: VogamosEmissionConfig
  }

  interface Emits {
    (event: 'update', config: VogamosEmissionConfig): void
  }

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()

  const fields = ref([
    { value: 'co2_min', title: 'CO2 Min' },
    { value: 'co2_max', title: 'CO2 Max' },
    { value: 'co2_avg', title: 'CO2 Avg' },
    { value: 'temperature_min', title: 'Temperature Min' },
    { value: 'temperature_max', title: 'Temperature Max' },
    { value: 'temperature_avg', title: 'Temperature Avg' },
    { value: 'humidity_min', title: 'Humidity Min' },
    { value: 'humidity_max', title: 'Humidity Max' },
    { value: 'humidity_avg', title: 'Humidity Avg' },
  ]) as Ref<
    {
      value: VogamosEmissionConfig['field']
      title: string
    }[]
  >

  const field = computed({
    get() {
      return props.config?.field || 'co2_avg'
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
