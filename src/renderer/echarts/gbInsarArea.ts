import { gbInsarAreaFields } from '@/components/options/gbInsar'
import { GBInsarAreaConfig, GBInsarAreaData, SeriesConfig } from '@/model/types'
import { objectParse, objectStringify } from '@/shared/util'
import { SeriesOption } from 'echarts'
import { CallbackDataParams, YAXisOption } from 'echarts/types/dist/shared'
import moment from 'moment'
import { CallbackDataParamsCasted, NO_DATA } from './shared'
import { circle, toMilliseconds } from './util'

export interface GBInsarAreaSeriesOptions {
  xAxisIndex?: number
  yAxisIndex?: number
}

export function createGBInsarAreaSeries(
  data: GBInsarAreaData[],
  config: GBInsarAreaConfig,
  options: GBInsarAreaSeriesOptions = {}
): SeriesOption {
  const { xAxisIndex = 0, yAxisIndex = 0 } = options
  const seriesConfig: SeriesConfig = {
    dataType: 'GBInsarArea',
    config,
  }
  return {
    data: data.map((item) => [
      toMilliseconds(item.timestamp),
      item[config.field],
    ]),
    name: objectStringify(seriesConfig),
    type: 'line',
    xAxisIndex,
    yAxisIndex,
  }
}

export function createGBInsarAreaSeriesTooltip(
  params: CallbackDataParams,
  index = 0
): string {
  const tooltip: string[] = []
  const { seriesName, value, color } = params as CallbackDataParamsCasted
  if (index === 0) {
    tooltip.push(`<div>${moment(value[0]).format('YYYY-MM-DD HH:mm:ss')}</div>`)
  }
  const seriesConfig = objectParse(seriesName) as SeriesConfig<'GBInsarArea'>
  const config = seriesConfig.config
  const name =
    gbInsarAreaFields.find((field) => field.value === config.field)?.title || ''

  tooltip.push(
    `<div>
    ${circle(color)}
    ${name}: ${value[1] ? value[1].toFixed(3) : NO_DATA} m
    </div>
    `
  )

  return tooltip.join('')
}

export function createGBInsarAreaYAxisOption(
  config: GBInsarAreaConfig
): YAXisOption {
  const name =
    gbInsarAreaFields.find((field) => field.value === config.field)?.title || ''
  return {
    name,
    nameGap: 35,
    type: 'value',
  }
}
