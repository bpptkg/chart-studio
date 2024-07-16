import { areaOptions } from '@/components/options/thermalAxisKaliurang'
import {
  SeriesConfig,
  ThermalAxisKaliurangConfig,
  ThermalAxisKaliurangData,
} from '@/model/types'
import { objectParse, objectStringify } from '@/shared/util'
import { SeriesOption } from 'echarts'
import { CallbackDataParams, YAXisOption } from 'echarts/types/dist/shared'
import moment from 'moment'
import { CallbackDataParamsCasted, NO_DATA } from './shared'
import { circle, toMilliseconds } from './util'

export interface ThermalAxisKaliurangSeriesOptions {
  xAxisIndex?: number
  yAxisIndex?: number
}

export function createThermalAxisKaliurangSeries(
  data: ThermalAxisKaliurangData[],
  config: ThermalAxisKaliurangConfig,
  options: ThermalAxisKaliurangSeriesOptions = {}
): SeriesOption {
  const { xAxisIndex = 0, yAxisIndex = 0 } = options
  const seriesConfig: SeriesConfig = {
    dataType: 'ThermalAxisKaliurang',
    config,
  }
  return {
    data: data.map((item) => [toMilliseconds(item.timestamp), item.temp]),
    name: objectStringify(seriesConfig),
    type: 'line',
    xAxisIndex,
    yAxisIndex,
  }
}

export function createThermalAxisKaliurangSeriesTooltip(
  params: CallbackDataParams,
  index = 0
): string {
  const tooltip: string[] = []
  const { seriesName, value, color } = params as CallbackDataParamsCasted
  if (index === 0) {
    tooltip.push(`<div>${moment(value[0]).format('YYYY-MM-DD HH:mm:ss')}</div>`)
  }
  const seriesConfig = objectParse(
    seriesName
  ) as SeriesConfig<'ThermalAxisKaliurang'>
  const config = seriesConfig.config
  const name =
    areaOptions.find((field) => field.value === config.area)?.title || ''

  tooltip.push(
    `<div>
    ${circle(color)}
    ${name}: ${value[1] ? value[1].toFixed(3) : NO_DATA} \u00B0C
    </div>
    `
  )

  return tooltip.join('')
}

export function createThermalAxisKaliurangYAxisOption(
  config: ThermalAxisKaliurangConfig
): YAXisOption {
  const name =
    areaOptions.find((field) => field.value === config.area)?.title || ''
  return {
    name,
    nameLocation: 'middle',
    nameGap: 35,
  }
}
