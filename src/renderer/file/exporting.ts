import { RenderModel, SeriesConfig, SeriesDataKey } from '@/model/types'
import objectHash from 'object-hash'

export interface ExportedFieldData {
  subplotIndex: number
  dataType: string
  series: SeriesConfig
  data: any
}

export function exportToFile(model: RenderModel): ExportedFieldData[] {
  const exportedData: ExportedFieldData[] = []
  const { subplots, interval, dataRepository } = model

  subplots.forEach((subplotConfig, index) => {
    subplotConfig.series.forEach((seriesConfig) => {
      const dataKey: SeriesDataKey = {
        interval,
        series: seriesConfig,
      }
      const key: string = objectHash.sha1(dataKey)
      if (key in dataRepository) {
        const seriesData = dataRepository[key]
        const exportedFieldData: ExportedFieldData = {
          dataType: subplotConfig.dataType,
          series: seriesConfig,
          subplotIndex: index,
          data: seriesData,
        }
        exportedData.push(exportedFieldData)
      }
    })
  })

  return exportedData
}
