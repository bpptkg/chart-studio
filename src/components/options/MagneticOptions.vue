<template>
  <div>
    <v-select v-model="station" :items="stations" label="Station"></v-select>
    <v-select v-model="field" :items="fields" label="Field"></v-select>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  import { MagneticConfig } from '@/model/types'
  import { computed, Ref, ref } from 'vue'

  interface Props {
    config?: MagneticConfig
  }

  interface Emits {
    (event: 'update', config: MagneticConfig): void
  }

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()

  const stations = ref([
    { value: 'babadan', title: 'Babadan' },
    { value: 'imogiri', title: 'Imogiri' },
  ]) as Ref<
    {
      value: MagneticConfig['station']
      title: string
    }[]
  >

  const fields = ref([
    { value: 'x', title: 'X Component' },
    { value: 'y', title: 'Y Component' },
    { value: 'z', title: 'Z Component' },
  ]) as Ref<
    {
      value: MagneticConfig['field']
      title: string
    }[]
  >

  const station = computed({
    get() {
      return props.config?.station || 'babadan'
    },
    set(value) {
      emit(
        'update',
        Object.assign(
          {},
          {
            station: value,
            field: field.value,
          }
        )
      )
    },
  })

  const field = computed({
    get() {
      return props.config?.field || 'x'
    },
    set(value) {
      emit(
        'update',
        Object.assign(
          {},
          {
            station: station.value,
            field: value,
          }
        )
      )
    },
  })
</script>
