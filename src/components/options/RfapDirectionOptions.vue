<template>
  <div>
    <v-select v-model="field" :items="fields" label="Field"></v-select>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  import { RfapDirectionConfig } from '@/model/types'
  import { computed, Ref, ref } from 'vue'

  interface Props {
    config?: RfapDirectionConfig
  }

  interface Emits {
    (event: 'update', config: RfapDirectionConfig): void
  }

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()

  const fields = ref([
    { value: 'count', title: 'RF & AP Count' },
    { value: 'distance', title: 'RF & AP Max Distance' },
  ]) as Ref<
    {
      value: RfapDirectionConfig['field']
      title: string
    }[]
  >

  const field = computed({
    get() {
      return props.config?.field || 'count'
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
