<template>
  <div>
    <v-select v-model="location" :items="locations" label="Location"></v-select>
    <v-select v-model="field" :items="fields" label="Field"></v-select>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  import { LavaDomesConfig } from '@/model/types'
  import { computed, Ref, ref } from 'vue'

  interface Props {
    config?: LavaDomesConfig
  }

  interface Emits {
    (event: 'update', config: LavaDomesConfig): void
  }

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()

  const locations = ref([
    { value: 'BARAT DAYA', title: 'Barat Daya' },
    { value: 'TENGAH KAWAH', title: 'Tengah Kawah' },
  ])

  const fields = ref([
    { value: 'volume', title: 'Volume' },
    { value: 'rate', title: 'Rate' },
  ]) as Ref<{ value: LavaDomesConfig['field']; title: string }[]>

  const location = computed({
    get() {
      return props.config?.location || 'BARAT DAYA'
    },
    set(value) {
      emit(
        'update',
        Object.assign(
          {},
          {
            location: value,
            field: field.value,
          }
        )
      )
    },
  })

  const field = computed({
    get() {
      return props.config?.field || 'volume'
    },
    set(value) {
      emit(
        'update',
        Object.assign(
          {},
          {
            location: location.value,
            field: value,
          }
        )
      )
    },
  })
</script>
