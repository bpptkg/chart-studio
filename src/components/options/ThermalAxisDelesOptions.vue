<template>
  <div>
    <v-select v-model="area" :items="areaOptions" label="Area"></v-select>
    <v-select
      v-model="sampling"
      :items="samplingOptions"
      label="Sampling"
    ></v-select>
    <v-select
      v-model="fieldType"
      :items="fieldTypeOptions"
      label="Field Type"
    ></v-select>
    <v-select
      v-model="aggregate"
      :items="aggregateOptions"
      label="Aggregate"
    ></v-select>
  </div>
</template>

<script setup lang="ts">
  import { ThermalAxisDelesConfig } from '@/model/types'
  import { computed } from 'vue'
  import {
    areaOptions,
    samplingOptions,
    fieldTypeOptions,
    aggregateOptions,
  } from './thermalAxisDeles'

  interface Props {
    config?: ThermalAxisDelesConfig
  }

  interface Emits {
    (event: 'update', config: ThermalAxisDelesConfig): void
  }

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()

  const area = computed({
    get() {
      return props.config?.area || 'Asap'
    },
    set(value) {
      emit(
        'update',
        Object.assign(
          {},
          {
            area: value,
            sampling: sampling.value,
            fieldType: fieldType.value,
            aggregate: aggregate.value,
          }
        )
      )
    },
  })

  const sampling = computed({
    get() {
      return props.config?.sampling || 'hour'
    },
    set(value) {
      emit(
        'update',
        Object.assign(
          {},
          {
            area: area.value,
            sampling: value,
            fieldType: fieldType.value,
            aggregate: aggregate.value,
          }
        )
      )
    },
  })

  const fieldType = computed({
    get() {
      return props.config?.fieldType || 'max_temp'
    },
    set(value) {
      emit(
        'update',
        Object.assign(
          {},
          {
            area: area.value,
            sampling: sampling.value,
            fieldType: value,
            aggregate: aggregate.value,
          }
        )
      )
    },
  })

  const aggregate = computed({
    get() {
      return props.config?.aggregate || 'avg'
    },
    set(value) {
      emit(
        'update',
        Object.assign(
          {},
          {
            area: area.value,
            sampling: sampling.value,
            fieldType: fieldType.value,
            aggregate: value,
          }
        )
      )
    },
  })
</script>
