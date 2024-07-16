<template>
  <div>
    <v-select
      v-model="field"
      :items="gbInsarAreaFields"
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
  import { GBInsarAreaConfig } from '@/model/types'
  import { computed } from 'vue'
  import { samplingOptions, gbInsarAreaFields } from './gbInsar'

  interface Props {
    config?: GBInsarAreaConfig
  }

  interface Emits {
    (event: 'update', config: GBInsarAreaConfig): void
  }

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()

  const field = computed({
    get() {
      return props.config?.field || 'kubahlava'
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
