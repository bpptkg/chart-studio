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
          v-model="sampling"
          :items="samplings"
          label="Sampling"
        ></v-select>
      </v-col>
    </v-row>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  import { RainfallDailyConfig } from '@/model/types'

  interface Props {
    config?: RainfallDailyConfig
  }

  interface Emits {
    (event: 'update', config: RainfallDailyConfig): void
  }

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()

  const stations = ref([
    { value: 'pasarbubar', title: 'Pasarbubar' },
    { value: 'babadan', title: 'Babadan' },
    { value: 'jurangjero', title: 'Jurangjero' },
    { value: 'klatakan', title: 'Klatakan' },
  ])

  const samplings = ref([
    { value: 'day', title: 'Daily' },
    { value: 'hour', title: 'Hourly' },
  ])

  const station = computed({
    get: () => props.config?.station || 'pasarbubar',
    set: (value: string) =>
      emit('update', {
        ...props.config,
        station: value,
      } as RainfallDailyConfig),
  })

  const sampling = computed({
    get: () => props.config?.sampling || 'daily',
    set: (value: string) =>
      emit('update', {
        ...props.config,
        sampling: value,
      } as RainfallDailyConfig),
  })
</script>
