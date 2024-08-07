<template>
  <div>
    <v-row align="center">
      <v-col>
        <v-select
          v-model="benchmark"
          :items="benchmarks"
          label="Benchmark"
        ></v-select>
      </v-col>
      <v-col>
        <v-select
          v-model="reflector"
          :items="reflectors"
          label="Reflector"
        ></v-select>
      </v-col>
    </v-row>
    <v-select v-model="fieldType" :items="fieldTypes" label="Type"></v-select>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  import { EdmConfig } from '@/model/types'
  import { computed, reactive, ref } from 'vue'

  interface Props {
    config?: EdmConfig
  }

  interface Emits {
    (event: 'update', config: EdmConfig): void
  }

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()

  const benchmarks = ref([
    { value: 'BAB0', title: 'Babadan 0' },
    { value: 'BAB1', title: 'Babadan 1' },
    { value: 'BAT0', title: 'Batu Alin' },
    { value: 'BEL0', title: 'Beling' },
    { value: 'DEL0', title: 'Deles' },
    { value: 'GEB0', title: 'Gebyok' },
    { value: 'JRK0', title: 'Jrakah' },
    { value: 'KAJ0', title: 'Kajor' },
    { value: 'KAL0', title: 'Kaliurang' },
    { value: 'MRY0', title: 'Mriyan' },
    { value: 'SAP0', title: 'Sapu Angin' },
    { value: 'SEL0', title: 'Selo' },
    { value: 'STA0', title: 'Stabelan' },
    { value: 'TRI0', title: 'Tritis' },
  ])

  type ReflectorMap = Record<string, string[]>

  const reflectorsMap: ReflectorMap = reactive({
    BAB0: ['RB1', 'RB2', 'RB3'],
    BAB1: ['RB1', 'RB2', 'RB3'],
    BAT0: ['RK1', 'RK2'],
    BEL0: ['RM1', 'RM2'],
    DEL0: ['RD1'],
    GEB0: ['RS1', 'RS2', 'RS4'],
    JRK0: ['RJ1', 'RJ2'],
    KAJ0: ['RJ1', 'RJ2', 'RS2', 'RS3'],
    KAL0: ['RK2', 'RK3'],
    MRY0: ['RM1', 'RM2'],
    SAP0: ['RD1'],
    SEL0: ['RS1', 'RS2', 'RS3', 'RS4'],
    STA0: ['RB1', 'RB2', 'RB3', 'RJ2'],
    TRI0: ['RK2', 'RK3'],
  })

  const fieldTypes = ref([
    { value: 'slope', title: 'Slope Distance' },
    { value: 'csd', title: 'Change of Slope Distance (CSD)' },
    { value: 'rate', title: 'Rate' },
  ])

  const isBenchmarkUpdating = ref(false)

  const benchmark = computed({
    get() {
      return props.config?.benchmark || 'BAB0'
    },
    set(value) {
      isBenchmarkUpdating.value = true
      reflector.value = reflectorsMap[value][0]
      emit(
        'update',
        Object.assign(
          {},
          {
            benchmark: value,
            reflector: reflectorsMap[value][0],
            type: fieldType.value,
          }
        )
      )
      isBenchmarkUpdating.value = false
    },
  })

  const reflector = computed({
    get() {
      return props.config?.reflector || 'RB1'
    },
    set(value) {
      if (!isBenchmarkUpdating.value) {
        emit(
          'update',
          Object.assign(
            {},
            {
              benchmark: benchmark.value,
              reflector: value,
              type: fieldType.value,
            }
          )
        )
      }
    },
  })

  const fieldType = computed({
    get() {
      return props.config?.type || 'slope'
    },
    set(value) {
      emit(
        'update',
        Object.assign(
          {},
          {
            benchmark: benchmark.value,
            reflector: reflector.value,
            type: value,
          }
        )
      )
    },
  })

  const reflectors = computed(() => {
    return reflectorsMap[benchmark.value]
  })
</script>
