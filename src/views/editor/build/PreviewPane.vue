<template>
  <preview-pane :loading="isRendering">
    <template #toolbar>
      <v-tooltip
        bottom
        :open-delay="500"
        :open-on-click="false"
        :open-on-focus="false"
      >
        <template v-slot:activator="{ props }">
          <v-btn icon size="small" v-bind="props" @click="zoomIn">
            <v-icon>mdi-magnify-plus-outline</v-icon>
          </v-btn>
        </template>
        <span>Zoom in</span>
      </v-tooltip>

      <v-tooltip
        bottom
        :open-delay="500"
        :open-on-click="false"
        :open-on-focus="false"
      >
        <template v-slot:activator="{ props }">
          <v-btn icon size="small" v-bind="props" @click="zoomOut">
            <v-icon>mdi-magnify-minus-outline</v-icon>
          </v-btn>
        </template>
        <span>Zoom out</span>
      </v-tooltip>

      <v-tooltip
        bottom
        :open-delay="500"
        :open-on-click="false"
        :open-on-focus="false"
      >
        <template v-slot:activator="{ props }">
          <v-btn icon size="small" v-bind="props" @click="handleTryAgain">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </template>
        <span>Refresh</span>
      </v-tooltip>

      <v-tooltip
        bottom
        :open-delay="500"
        :open-on-click="false"
        :open-on-focus="false"
      >
        <template v-slot:activator="{ props }">
          <v-btn icon size="small" v-bind="props" @click="handleExportToImage">
            <v-icon>mdi-export</v-icon>
          </v-btn>
        </template>
        <span>Export to Image</span>
      </v-tooltip>

      <v-tooltip
        bottom
        :open-delay="500"
        :open-on-click="false"
        :open-on-focus="false"
      >
        <template v-slot:activator="{ props }">
          <v-btn icon size="small" v-bind="props" @click="handleDownload">
            <v-icon>mdi-tray-arrow-down</v-icon>
          </v-btn>
        </template>
        <span>Export to JSON</span>
      </v-tooltip>
    </template>

    <div id="printable-build">
      <v-chart
        ref="chart"
        :style="style"
        :option="option"
        :update-options="updateOptions"
        :autoresize="true"
      ></v-chart>
    </div>

    <v-snackbar v-model="snackbar" timeout="8000" left>
      <template v-slot:actions>
        <v-btn color="blue" variant="text" @click="handleTryAgain">
          Try Again
        </v-btn>
        <v-btn
          icon
          size="small"
          variant="text"
          @click="snackbar = false"
          class="ml-2"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>

      {{ errorMessage }}
    </v-snackbar>
  </preview-pane>
</template>

<script setup lang="ts">
  import PreviewPane from '@/components/PreviewPane.vue'
  import { MAX_ZOOM_SCALE, MIN_ZOOM_SCALE, ZOOM_DELTA } from '@/constants/zoom'
  import { renderToECharts } from '@/renderer/echarts/render'
  import { exportToFile } from '@/renderer/file/exporting'
  import { getDataURLOptions } from '@/shared/echarts'
  import { useChartStore } from '@/stores/chart'
  import { useDataStore } from '@/stores/data'
  import Panzoom, { PanzoomObject } from '@panzoom/panzoom'
  import { AxiosError } from 'axios'
  import 'echarts'
  import { EChartsOption } from 'echarts'
  import FileSaver from 'file-saver'
  import JSZip from 'jszip'
  import { storeToRefs } from 'pinia'
  import { computed, nextTick, onMounted, Ref, ref } from 'vue'
  import VChart from 'vue-echarts'

  const chartStore = useChartStore()
  const dataStore = useDataStore()
  const { renderModel } = storeToRefs(dataStore)

  const option: Ref<EChartsOption> = ref({})
  const updateOptions = ref({
    notMerge: true,
  })
  const isRendering = ref(false)
  const chart: Ref<typeof VChart | null> = ref(null)

  const style = computed(() => {
    return {
      width: `${chartStore.width}px`,
      height: `${chartStore.height}px`,
      backgroundColor: `${chartStore.backgroundColor}`,
    }
  })

  function update() {
    dataStore.update(chartStore.interval)
  }

  chartStore.$subscribe(() => {
    update()
  })

  dataStore.$onAction(({ name, after, onError }) => {
    if (name === 'update') {
      // Rerender chart configuration after data update.
      isRendering.value = true

      after(async () => {
        option.value = renderToECharts(renderModel.value)
        isRendering.value = false
      })

      onError((e) => {
        const error = e as AxiosError
        let msg = `Error occurred while updating the chart`

        if (error.response) {
          msg += ` (${error.response.status})`
        } else if (error.request) {
          msg += ` (ERR_CLIENT)`
        } else {
          msg += ` (ERR_REQUEST)`
        }

        errorMessage.value = msg

        snackbar.value = true
        isRendering.value = false
      })
    }
  })

  function handleExportToImage() {
    if (chart.value) {
      const currentTime = Date.now().toFixed(0)
      const fileNameWithTimestamp = `chart-${currentTime}`
      const dataURL = chart.value.getDataURL(getDataURLOptions)
      FileSaver.saveAs(
        dataURL,
        `${chartStore.title || fileNameWithTimestamp}.png`
      )
    }
  }

  function handleDownload() {
    const currentTime = Date.now().toFixed(0)
    const fileNameWithTimestamp = `export-${currentTime}.zip`
    const zip = new JSZip()
    zip.file(
      `export-${currentTime}.json`,
      JSON.stringify(exportToFile(renderModel.value), null, 2)
    )
    zip.generateAsync({ type: 'blob' }).then((content) => {
      FileSaver.saveAs(content, fileNameWithTimestamp)
    })
  }

  onMounted(() => {
    update()
  })

  const snackbar = ref(false)
  const errorMessage = ref('')

  function handleTryAgain() {
    snackbar.value = false
    update()
  }

  let zoomScale = 1
  let elem: HTMLElement | null = null
  let panzoom: PanzoomObject | null = null

  nextTick(() => {
    elem = document.getElementById('printable-build') as HTMLElement
    panzoom = Panzoom(elem, { maxScale: MAX_ZOOM_SCALE })
  })

  function zoomIn() {
    if (zoomScale + ZOOM_DELTA < MAX_ZOOM_SCALE) {
      zoomScale += ZOOM_DELTA
    }
    if (panzoom) {
      panzoom.zoom(zoomScale, { animate: true })
    }
  }

  function zoomOut() {
    if (zoomScale - ZOOM_DELTA > MIN_ZOOM_SCALE) {
      zoomScale -= ZOOM_DELTA
    }
    if (panzoom) {
      panzoom.zoom(zoomScale, { animate: true })
    }
  }
</script>
