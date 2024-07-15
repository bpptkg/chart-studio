<template>
  <div>
    <v-select v-model="type" :items="types" label="Type"></v-select>
    <v-select
      v-model="agg"
      :items="aggregates"
      label="Field"
      type="text"
    ></v-select>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  import { SeismicEnergyConfig } from '@/model/types'
  import { ref, computed } from 'vue'

  interface Props {
    config?: SeismicEnergyConfig
  }

  interface Emits {
    (event: 'update', config: SeismicEnergyConfig): void
  }

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()

  const types = ref([
    { value: 'total', title: 'Total' },
    { value: 'vta', title: 'VTA' },
    { value: 'vtbmp', title: 'VTB+MP' },
  ])

  const aggregates = ref([
    { value: 'daily', title: 'Daily Value' },
    { value: 'daily-cumulative', title: 'Daily Cumulative Value' },
  ])

  const type = computed({
    get() {
      return props.config?.type || 'total'
    },
    set(value) {
      emit(
        'update',
        Object.assign(
          {},
          {
            type: value,
            aggregate: agg.value,
          }
        )
      )
    },
  })

  const agg = computed({
    get() {
      return props.config?.aggregate || 'daily'
    },
    set(value: SeismicEnergyConfig['aggregate']) {
      emit(
        'update',
        Object.assign(
          {},
          {
            type: type.value,
            aggregate: value,
          }
        )
      )
    },
  })
</script>
