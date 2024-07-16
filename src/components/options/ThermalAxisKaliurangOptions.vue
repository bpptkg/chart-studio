<template>
  <div>
    <v-select v-model="area" :items="areaOptions" label="Area"></v-select>
    <v-select
      v-model="sampling"
      :items="samplingOptions"
      label="Sampling"
    ></v-select>
    <v-switch
      v-model="useSkyFilter"
      color="primary"
      label="Use sky filter"
    ></v-switch>
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
    <v-select
      v-model="skyFilterAggregate"
      :items="skyFilterAggregateOptions"
      label="Sky filter aggregate"
    ></v-select>
  </div>
</template>

<script setup lang="ts">
  import { ThermalAxisKaliurangConfig } from '@/model/types'
  import { computed } from 'vue'
  import {
    areaOptions,
    samplingOptions,
    fieldTypeOptions,
    aggregateOptions,
    skyFilterAggregateOptions,
  } from './thermalAxisKaliurang'

  interface Props {
    config?: ThermalAxisKaliurangConfig
  }

  interface Emits {
    (event: 'update', config: ThermalAxisKaliurangConfig): void
  }

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()

  const area = computed({
    get() {
      return props.config?.area || 'kubah-bd'
    },
    set(value) {
      emit(
        'update',
        Object.assign(
          {},
          {
            area: value,
            sampling: sampling.value,
            useSkyFilter: useSkyFilter.value,
            fieldType: fieldType.value,
            aggregate: aggregate.value,
            skyFilterAggregate: skyFilterAggregate.value,
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
            useSkyFilter: useSkyFilter.value,
            fieldType: fieldType.value,
            aggregate: aggregate.value,
            skyFilterAggregate: skyFilterAggregate.value,
          }
        )
      )
    },
  })

  const useSkyFilter = computed({
    get() {
      return props.config?.useSkyFilter ?? true
    },
    set(value) {
      emit(
        'update',
        Object.assign(
          {},
          {
            area: area.value,
            sampling: sampling.value,
            useSkyFilter: value,
            fieldType: fieldType.value,
            aggregate: aggregate.value,
            skyFilterAggregate: skyFilterAggregate.value,
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
            useSkyFilter: useSkyFilter.value,
            fieldType: value,
            aggregate: aggregate.value,
            skyFilterAggregate: skyFilterAggregate.value,
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
            useSkyFilter: useSkyFilter.value,
            fieldType: fieldType.value,
            aggregate: value,
            skyFilterAggregate: skyFilterAggregate.value,
          }
        )
      )
    },
  })

  const skyFilterAggregate = computed({
    get() {
      return props.config?.skyFilterAggregate || 'avg'
    },
    set(value) {
      emit(
        'update',
        Object.assign(
          {},
          {
            area: area.value,
            sampling: sampling.value,
            useSkyFilter: useSkyFilter.value,
            fieldType: fieldType.value,
            aggregate: aggregate.value,
            skyFilterAggregate: value,
          }
        )
      )
    },
  })
</script>
