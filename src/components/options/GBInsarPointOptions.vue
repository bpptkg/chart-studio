<template>
  <div>
    <v-select
      v-model="field"
      :items="gbInsarPointFields"
      label="Field"
    ></v-select>
    <v-select
      v-model="sampling"
      :items="samplingOptions"
      label="Sampling"
    ></v-select>
  </div>
</template>

<script setup lang="ts">
  import { GBInsarPointConfig } from '@/model/types'
  import { computed } from 'vue'
  import { samplingOptions, gbInsarPointFields } from './gbInsar'

  interface Props {
    config?: GBInsarPointConfig
  }

  interface Emits {
    (event: 'update', config: GBInsarPointConfig): void
  }

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()

  const field = computed({
    get() {
      return props.config?.field || 'rb1'
    },
    set(value) {
      emit(
        'update',
        Object.assign(
          {},
          {
            field: value,
            sampling: sampling.value,
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
            field: field.value,
            sampling: value,
          }
        )
      )
    },
  })
</script>
