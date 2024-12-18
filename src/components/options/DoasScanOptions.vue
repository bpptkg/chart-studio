<template>
  <div>
    <v-row align="center">
      <v-col>
        <v-select
          v-model="station"
          :items="stations"
          label="Station"
        ></v-select>
      </v-col>
      <v-col>
        <v-select
          v-model="fieldType"
          :items="fieldTypes"
          label="Field Type"
        ></v-select>
      </v-col>
    </v-row>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  import { DoasScanConfig } from '@/model/types'

  interface Props {
    config?: DoasScanConfig
  }

  interface Emits {
    (event: 'update', config: DoasScanConfig): void
  }

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()

  const stations = ref([
    { value: 'babadan1', title: 'Babadan' },
    { value: 'jrakah', title: 'Jrakah' },
    { value: 'kaliurang', title: 'Kaliurang' },
  ])

  const fieldTypes = ref([
    { value: 'flux', title: 'Flux' },
    { value: 'plumecompleteness', title: 'Plume Completeness' },
  ])

  const station = computed({
    get: () => props.config?.station || 'babadan',
    set: (value: string) =>
      emit('update', {
        ...props.config,
        station: value,
      } as DoasScanConfig),
  })

  const fieldType = computed({
    get: () => props.config?.fieldType || 'flux',
    set: (value: string) =>
      emit('update', {
        ...props.config,
        fieldType: value,
      } as DoasScanConfig),
  })
</script>
