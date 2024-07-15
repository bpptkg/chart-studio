<template>
  <div>
    <v-select v-model="field" :items="fields" label="Field"></v-select>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  import { RfapEnergyConfig } from '@/model/types'
  import { computed, ref } from 'vue'

  interface Props {
    config?: RfapEnergyConfig
  }

  interface Emits {
    (event: 'update', config: RfapEnergyConfig): void
  }

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()

  const fields = ref([
    { value: 'count', title: 'RF & AP Daily Count' },
    { value: 'energy', title: 'RF & AP Daily Energy' },
    { value: 'count-rf', title: 'RF Daily Count' },
    { value: 'count-ap', title: 'AP Daily Count' },
    { value: 'rfap-stack', title: 'RF & AP Daily Count Stack' },
    { value: 'energy-cumulative', title: 'RF & AP Daily Energy Cumulative' },
  ])

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
