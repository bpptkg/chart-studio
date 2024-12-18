<template>
  <v-dialog v-model="dialog" width="600px">
    <template #activator="{ props }">
      <v-tooltip
        bottom
        :open-delay="500"
        :open-on-click="false"
        :open-on-focus="false"
      >
        <template v-slot:activator="{ props: tooltip }">
          <v-btn icon size="small" flat v-bind="{ ...tooltip, ...props }">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Add subplot</span>
      </v-tooltip>
    </template>

    <v-card>
      <v-card-title>Add Subplot</v-card-title>

      <v-divider></v-divider>

      <v-card-text class="pa-0">
        <splitpanes>
          <pane size="40">
            <div class="dtype-selector">
              <div class="pa-2">
                <v-text-field
                  v-model="search"
                  label="Search"
                  dense
                  hide-details
                  placeholder="Search data type"
                  clearable
                ></v-text-field>
              </div>
              <v-list mandatory select-strategy="single-leaf">
                <v-list-item
                  v-for="dataType in dataTypes"
                  :key="dataType.value"
                  :value="dataType.value"
                  @click="selected = [dataType.value]"
                >
                  <v-list-item-title>{{ dataType.text }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </div>
          </pane>
          <pane>
            <div class="dtype-config">
              <component
                :is="ComponentOptionsMap[selected[0]]"
                :config="config as any"
                @update="handleUpdate"
              ></component>
            </div>
          </pane>
        </splitpanes>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" variant="text" @click="dialog = false">
          Cancel
        </v-btn>
        <v-btn color="blue darken-1" variant="text" @click="handleAdd">
          Add
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import Fuse from 'fuse.js'
  import { ComponentOptionsMap } from '@/components/options'
  import { createSeriesConfig } from '@/model/config'
  import { DataType, DataTypeNameMap, ParameterConfigMap } from '@/model/types'
  import { useChartStore } from '@/stores/chart'
  import { useWorkspaceStore } from '@/stores/workspace'
  import { Pane, Splitpanes } from 'splitpanes'
  import { Ref, ref, watch } from 'vue'

  interface DataTypeItem {
    value: DataType
    text: string
  }

  const chartStore = useChartStore()
  const workspaceStore = useWorkspaceStore()

  function getDataTypes(): DataTypeItem[] {
    const names = Object.keys(DataTypeNameMap) as Array<DataType>
    return names.map((name) => {
      return { value: name, text: DataTypeNameMap[name] }
    })
  }

  const fuse = new Fuse<DataTypeItem>(getDataTypes(), {
    keys: ['text'],
    threshold: 0.3,
  })
  const search = ref('')

  const dataTypes = computed(() => {
    return search.value
      ? fuse
          .search(search.value)
          .map((item) => item.item)
          .slice(0, 10)
      : getDataTypes()
  })

  const dialog = ref(false)

  const selected: Ref<DataType[]> = ref(['Seismicity'])
  const config: Ref<ParameterConfigMap[DataType]> = ref(
    createSeriesConfig('Seismicity')
  )

  watch(selected, (value) => {
    config.value = createSeriesConfig(value[0])
  })

  function handleUpdate<T extends DataType = DataType>(
    payload: ParameterConfigMap[T]
  ): void {
    config.value = { ...config.value, ...payload }
  }

  function handleAdd(): void {
    chartStore.addSubplot({
      dataType: selected.value[0],
      series: [
        {
          dataType: selected.value[0],
          config: { ...config.value },
        },
      ],
    })

    dialog.value = false
    search.value = ''

    // Set index to newly created subplot.
    workspaceStore.setSubplotIndex(chartStore.subplots.length - 1)
  }
</script>

<style lang="scss" scoped>
  .dtype-selector {
    height: 300px;
    overflow-y: auto;
    min-width: 30%;
  }

  .dtype-config {
    height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 15px;
  }
</style>
