import { gbInsarPointFields } from '@/components/options/gbInsar'
import {
  GBInsarPointConfig,
  GBInsarPointData,
  SeriesConfig,
} from '@/model/types'
import { objectParse, objectStringify } from '@/shared/util'
import { SeriesOption } from 'echarts'
import { CallbackDataParams, YAXisOption } from 'echarts/types/dist/shared'
import moment from 'moment'
import { CallbackDataParamsCasted, NO_DATA } from './shared'
import { circle, toMilliseconds } from './util'

export interface GBInsarPointSeriesOptions {
  xAxisIndex?: number
  yAxisIndex?: number
}

export function createGBInsarPointSeries(
  data: GBInsarPointData[],
  config: GBInsarPointConfig,
  options: GBInsarPointSeriesOptions = {}
): SeriesOption {
  const { xAxisIndex = 0, yAxisIndex = 0 } = options
  const seriesConfig: SeriesConfig = {
    dataType: 'GBInsarPoint',
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

export function createGBInsarPointSeriesTooltip(
  params: CallbackDataParams,
  index = 0
): string {
  const tooltip: string[] = []
  const { seriesName, value, color } = params as CallbackDataParamsCasted
  if (index === 0) {
    tooltip.push(`<div>${moment(value[0]).format('YYYY-MM-DD HH:mm:ss')}</div>`)
  }
  const seriesConfig = objectParse(seriesName) as SeriesConfig<'GBInsarPoint'>
  const config = seriesConfig.config
  const name =
    gbInsarPointFields.find((field) => field.value === config.field)?.title ||
    ''

  tooltip.push(
    `<div>
    ${circle(color)}
    ${name}: ${value[1] ? value[1].toFixed(3) : NO_DATA} m
    </div>
    `
  )

  return tooltip.join('')
}

export function createGBInsarPointYAxisOption(
  config: GBInsarPointConfig
): YAXisOption {
  const name =
    gbInsarPointFields.find((field) => field.value === config.field)?.title ||
    ''
  return {
    name,
    nameLocation: 'middle',
    nameGap: 35,
  }
}
