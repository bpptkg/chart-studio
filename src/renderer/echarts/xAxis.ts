import { DateInterval, SubplotConfig } from '@/model/types'
import { XAXisOption } from 'echarts/types/dist/shared'
import { toMilliseconds } from './util'

/**
 * Render subplots config to ECharts X axis option. Each subplot axis will be
 * fitted to the interval value.
 */
export function renderXAxis(
  subplots: SubplotConfig[],
  interval: DateInterval
): XAXisOption[] {
  return subplots.map((_subplot, index) => {
    return {
      axisLabel: {
        show: index === subplots.length - 1 ? true : false,
      },
      gridIndex: index,
      position: 'bottom',
      min: toMilliseconds(interval.start),
      max: toMilliseconds(interval.end),
      splitLine: { show: false },
      type: 'time',
    }
  })
}
