<template>
  <div>
    <v-select v-model="field" :items="fields" label="Field"></v-select>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  import { VogamosTemperatureConfig } from '@/model/types'
  import { computed, ref, Ref } from 'vue'

  interface Props {
    config?: VogamosTemperatureConfig
  }

  interface Emits {
    (event: 'update', config: VogamosTemperatureConfig): void
  }

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()

  const fields = ref([
    { value: 'temperature1', title: 'Termocouple 1' },
    { value: 'temperature2', title: 'Termocouple 2' },
    { value: 'temperature3', title: 'Soil' },
    { value: 'temperature4', title: 'Temperature 4' },
  ]) as Ref<{ value: VogamosTemperatureConfig['field']; title: string }[]>

  const field = computed({
    get() {
      return props.config?.field || 'temperature1'
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
