import { DoasScanConfig, DoasScanData, SeriesConfig } from '@/model/types'
import { objectParse, objectStringify } from '@/shared/util'
import { SeriesOption } from 'echarts'
import { CallbackDataParams, YAXisOption } from 'echarts/types/dist/shared'
import moment from 'moment'
import { CallbackDataParamsCasted } from './shared'
import { circle, toMilliseconds } from './util'

export interface DoasScanSeriesOptions {
  xAxisIndex?: number
  yAxisIndex?: number
}

/**
 * Create DOAS scan series.
 */
export function createDoasScanSeries(
  data: DoasScanData[],
  config: DoasScanConfig,
  options: DoasScanSeriesOptions = {}
): SeriesOption {
  const { xAxisIndex = 0, yAxisIndex = 0 } = options
  const seriesConfig: SeriesConfig = {
    dataType: 'DoasScan',
    config,
  }
  const fieldType = config.fieldType
  return {
    data: data.map((item) => [toMilliseconds(item.timestamp), item[fieldType]]),
    name: objectStringify(seriesConfig),
    type: 'scatter',
    symbol: 'circle',
    symbolSize: 7,
    xAxisIndex,
    yAxisIndex,
  }
}

export function createDoasScanSeriesTooltip(
  params: CallbackDataParams,
  index = 0
): string {
  const template: string[] = []
  const { seriesName, value, color } = params as CallbackDataParamsCasted
  const seriesConfig = objectParse(seriesName) as SeriesConfig<'DoasScan'>
  const config = seriesConfig.config
  if (index === 0) {
    template.push(
      `<div>${moment(value[0]).format('YYYY-MM-DD HH:mm:ss')}</div>`
    )
  }

  switch (config.fieldType) {
    case 'flux':
      template.push(
        `<div>${circle(color)} Flux: ${value[1] ? `${value[1].toFixed(2)} ton/day` : '-'}</div>`
      )
      break
    case 'plumecompleteness':
      template.push(
        `<div>${circle(color)} Plume Completeness: ${value[1] ? `${value[1].toFixed(1)} %` : '-'}</div>`
      )
      break
  }

  return template.join('')
}

export function createDoasScanYAxisOption(config: DoasScanConfig): YAXisOption {
  switch (config.fieldType) {
    case 'flux':
      return { name: 'Flux (ton/day)', nameGap: 40 }
    case 'plumecompleteness':
      return { name: 'Plume Completeness (%)', nameGap: 40 }
    default:
      return {}
  }
}
