<template>
  <div>
    <v-select
      v-model="eventType"
      :items="eventTypes"
      label="Event Type"
    ></v-select>
    <slot></slot>
    <div v-if="showExtraProps">
      <v-row>
        <v-col>
          <v-text-field
            v-model="barGap"
            label="Bar Gap"
            suffix="%"
            type="number"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="barWidth"
            label="Bar Width"
            suffix="%"
            type="number"
          ></v-text-field>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { debounce } from 'lodash'
import { SeismicityConfig } from '@/model/types'
import { computed, ref } from 'vue'

interface Props {
  config?: SeismicityConfig
  showExtraProps?: boolean
}

interface Emits {
  (event: 'update', config: SeismicityConfig): void
}

const props = withDefaults(defineProps<Props>(), {
  showExtraProps: false,
})
const emit = defineEmits<Emits>()

const eventTypes = ref([
  { value: 'ANTRHOP', title: 'ANTRHOP' },
  { value: 'AUTO', title: 'AUTO' },
  { value: 'EXPLOSION', title: 'EXPLOSION' },
  { value: 'GASBURST', title: 'GASBURST' },
  { value: 'LF', title: 'LF' },
  { value: 'MP', title: 'MP' },
  { value: 'ROCKFALL', title: 'ROCKFALL' },
  { value: 'SOUND', title: 'SOUND' },
  { value: 'TECLOC', title: 'TECLOC' },
  { value: 'TECT', title: 'TECT' },
  { value: 'TELE', title: 'TELE' },
  { value: 'TPHASE', title: 'TPHASE' },
  { value: 'TREMOR', title: 'TREMOR' },
  { value: 'UNKNOWN', title: 'UNKNOWN' },
  { value: 'VTA', title: 'VTA' },
  { value: 'VTB', title: 'VTB' },
  { value: 'AWANPANAS', title: 'AWANPANAS' },
  { value: 'LAHAR', title: 'LAHAR' },
  { value: 'VTA,VTB,MP', title: 'VTA+VTB+MP' },
  { value: 'VTB,MP', title: 'VTB+MP' },
  { value: 'RF,AWANPANAS', title: 'RF+AP' },
])

const eventType = computed({
  get() {
    return props.config?.eventType || 'VTA'
  },
  set(value) {
    emit(
      'update',
      Object.assign(
        {},
        {
          eventType: value,
          barGap: barGap.value,
          barWidth: barWidth.value,
        }
      )
    )
  },
})

const barGap = computed({
  get() {
    return props.config?.barGap || 0
  },
  set: debounce((value) => {
    emit(
      'update',
      Object.assign(
        {},
        {
          eventType: eventType.value,
          barGap: value,
          barWidth: barWidth.value,
        }
      )
    )
  }, 500),
})

const barWidth = computed({
  get() {
    return props.config?.barWidth || 80
  },
  set: debounce((value) => {
    emit(
      'update',
      Object.assign(
        {},
        {
          eventType: eventType.value,
          barGap: barGap.value,
          barWidth: value,
        }
      )
    )
  }, 500),
})
</script>
