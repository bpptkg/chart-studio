import {
  SeriesConfig,
  WeatherPasarbubarConfig,
  WeatherPasarbubarData,
} from '@/model/types'
import { objectParse, objectStringify } from '@/shared/util'
import { SeriesOption, LineSeriesOption } from 'echarts'
import { CallbackDataParams, YAXisOption } from 'echarts/types/dist/shared'
import moment from 'moment'
import { CallbackDataParamsCasted, NO_DATA } from './shared'
import { circle, toMilliseconds } from './util'

export interface WeatherPasarbubarSeriesOptions {
  xAxisIndex?: number
  yAxisIndex?: number
}

export function createWeatherPasarbubarSeries(
  data: WeatherPasarbubarData[],
  config: WeatherPasarbubarConfig,
  options: WeatherPasarbubarSeriesOptions = {}
): SeriesOption {
  const { xAxisIndex = 0, yAxisIndex = 0 } = options
  const seriesConfig: SeriesConfig = {
    dataType: 'WeatherPasarbubar',
    config,
  }

  let seriesData = []

  if (config.field === 'air_pressure') {
    seriesData = data.map((item) => [
      toMilliseconds(item.timestamp),
      item[config.field] * 10, // Convert kPa to hPa.
    ])
  } else {
    seriesData = data.map((item) => [
      toMilliseconds(item.timestamp),
      item[config.field],
    ])
  }

  let seriesType = 'line'
  if (config.field === 'wind_direction') {
    seriesType = 'scatter'
  }

  let symbol = 'none'
  if (config.field === 'wind_direction') {
    symbol = 'circle'
  }

  const option: LineSeriesOption = {
    data: seriesData,
    name: objectStringify(seriesConfig),
    type: seriesType,
    symbol,
    xAxisIndex,
    yAxisIndex,
  } as LineSeriesOption

  if (config.field === 'cumulative_rainfall') {
    option.areaStyle = {}
  }

  return option
}

export function createWeatherPasarbubarSeriesTooltip(
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
  ) as SeriesConfig<'WeatherPasarbubar'>
  const config = seriesConfig.config

  let name = ''
  let unit = ''
  let fractionDigits = 2

  switch (config.field) {
    case 'air_humidity':
      name = 'Humidity'
      unit = '%'
      break

    case 'air_pressure':
      name = 'Pressure'
      unit = 'hPa'
      break

    case 'air_temperature':
      name = 'Temperature'
      unit = '\u00B0C'
      break

    case 'wind_direction':
      name = 'Wind Direction'
      unit = '\u00B0'
      fractionDigits = 0
      break

    case 'wind_speed':
      name = 'Wind Speed'
      unit = 'km/h'
      break

    case 'cumulative_rainfall':
      name = 'Rainfall'
      unit = 'mm'
      break

    case 'rate':
      name = 'Rate'
      unit = 'mm/h'
      break
  }

  tooltip.push(
    `<div>
    ${circle(color)}
    ${name}: ${value[1] ? value[1].toFixed(fractionDigits) : NO_DATA} ${unit}
    </div>`
  )

  return tooltip.join('')
}

export function createWeatherPasarbubarYAxisOption(
  config: WeatherPasarbubarConfig
): YAXisOption {
  switch (config.field) {
    case 'air_humidity':
      return {
        name: 'Humidity (%)',
      }
    case 'air_pressure':
      return {
        name: 'Pressure (hPa)',
      }
    case 'air_temperature':
      return {
        name: 'Temperature (\u00B0C)',
      }
    case 'wind_direction':
      return {
        name: 'Wind Direction (\u00B0)',
      }
    case 'wind_speed':
      return {
        name: 'Wind Speed (km/h)',
      }
    case 'cumulative_rainfall':
      return {
        name: 'Rainfall (mm)',
      }
    case 'rate':
      return {
        name: 'Rate (mm/h)',
      }
    default:
      return {}
  }
}
