<template>
  <div>
    <v-select v-model="type" :items="types" label="Type"></v-select>
    <v-select v-model="station" :items="stations" label="Station"></v-select>
    <v-select v-model="field" :items="fields" label="Field"></v-select>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  import { TiltmeterConfig } from '@/model/types'
  import { computed, reactive, ref } from 'vue'
  import {
    TiltStationRecord,
    tiltPlatformStations,
    tiltBoreholeStations,
    tiltTlrStations,
  } from './tiltStations'

  interface Props {
    config?: TiltmeterConfig
  }

  interface Emits {
    (event: 'update', config: TiltmeterConfig): void
  }

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()

  type TiltmeterStationMap = Record<
    TiltmeterConfig['type'],
    TiltStationRecord[]
  >
  const stationsMap: TiltmeterStationMap = reactive({
    platform: tiltPlatformStations,
    borehole: tiltBoreholeStations,
    tlr: tiltTlrStations,
  })

  const types = ref([
    { value: 'platform', title: 'Platform' },
    { value: 'borehole', title: 'Borehole' },
    { value: 'tlr', title: 'TLR' },
  ])

  const fields = ref([
    { value: 'x', title: 'X' },
    { value: 'y', title: 'Y' },
    { value: 'temperature', title: 'Temperature' },
  ])

  const defaultType = 'platform'
  const defaultField = 'x'

  const isTypeUpdating = ref(false)

  const type = computed({
    get() {
      return props.config?.type || defaultType
    },
    set(value) {
      isTypeUpdating.value = true
      station.value = stationsMap[value][0].value
      emit(
        'update',
        Object.assign(
          {},
          {
            type: value,
            station: stationsMap[value][0].value,
            field: field.value,
          }
        )
      )
      isTypeUpdating.value = false
    },
  })

  const stations = computed(() => {
    return stationsMap[type.value]
  })

  const station = computed({
    get() {
      return props.config?.station || stations.value[0].value
    },
    set(value) {
      if (!isTypeUpdating.value) {
        emit(
          'update',
          Object.assign(
            {},
            {
              type: type.value,
              station: value,
              field: field.value,
            }
          )
        )
      }
    },
  })

  const field = computed({
    get() {
      return props.config?.field || defaultField
    },
    set(value) {
      emit(
        'update',
        Object.assign(
          {},
          {
            type: type.value,
            station: station.value,
            field: value,
          }
        )
      )
    },
  })
</script>
