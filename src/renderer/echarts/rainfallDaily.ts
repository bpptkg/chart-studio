import {
  RainfallDailyConfig,
  RainfallDailyData,
  SeriesConfig,
} from '@/model/types'
import { circle, toMilliseconds } from './util'
import { objectParse, objectStringify } from '@/shared/util'
import { SeriesOption } from 'echarts'
import { CallbackDataParams, YAXisOption } from 'echarts/types/dist/shared'
import { CallbackDataParamsCasted } from './shared'
import moment from 'moment'

export interface RainfallDailySeriesOptions {
  xAxisIndex?: number
  yAxisIndex?: number
}

/**
 * Create rainfall daily series.
 */
export function createRainfallDailySeries(
  data: RainfallDailyData[],
  config: RainfallDailyConfig,
  options: RainfallDailySeriesOptions = {}
): SeriesOption {
  const { xAxisIndex = 0, yAxisIndex = 0 } = options
  const { barWidth = 80, barGap = 5 } = config
  const seriesConfig: SeriesConfig = {
    dataType: 'RainfallDaily',
    config,
  }
  return {
    data: data.map((item) => [toMilliseconds(item.timestamp), item.rain_acc]),
    name: objectStringify(seriesConfig),
    type: 'bar',
    barGap: `${barGap}%`,
    barWidth: `${barWidth}%`,
    barCategoryGap: '0%',
    xAxisIndex,
    yAxisIndex,
  }
}

export function createRainfallDailySeriesTooltip(
  params: CallbackDataParams,
  index = 0
): string {
  const template: string[] = []
  const { seriesName, value, color } = params as CallbackDataParamsCasted
  const seriesConfig = objectParse(seriesName) as SeriesConfig<'RainfallDaily'>
  if (index === 0) {
    const format =
      seriesConfig.config.sampling === 'day' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm'
    template.push(`<div>${moment(value[0]).format(format)}</div>`)
  }
  template.push(
    `<div>${circle(color)} ${seriesConfig.config.station} : ${Number.isFinite(value[1]) ? value[1].toFixed(2) : '-'} mm</div>`
  )

  return template.join('')
}

export function createRainfallDailyYAxisOption(
  config: RainfallDailyConfig
): YAXisOption {
  return { name: `${config.station} (mm)` }
}
