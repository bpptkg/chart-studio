import { DataType } from '@/model/types'
import { objectParse } from '@/shared/util'
import { TooltipComponentOption } from 'echarts'
import {
  CallbackDataParams,
  TopLevelFormatterParams,
} from 'echarts/types/dist/shared'

import { createDoasSeriesTooltip } from './doas'
import { createDoasScanSeriesTooltip } from './doasScan'
import { createEdmSeriesTooltip } from './edm'
import { createGBInsarAreaSeriesTooltip } from './gbInsarArea'
import { createGBInsarPointSeriesTooltip } from './gbinsarPoint'
import { createGpsBaselineSeriesTooltip } from './gpsBaseline'
import { createGpsCoordinateSeriesTooltip } from './gpsCoordinate'
import { createLavaDomesSeriesTooltip } from './lavaDomes'
import { createMagneticSeriesTooltip } from './magnetic'
import { createRainfallDailySeriesTooltip } from './rainfallDaily'
import { createRfapDirectionSeriesTooltip } from './rfapDirection'
import { createRfapDistanceSeriesTooltip } from './rfapDistance'
import { createRfapEnergySeriesTooltip } from './rfapEnergy'
import { createRfapTypeSeriesTooltip } from './rfapType'
import { createRsamSeismicSeriesTooltip } from './rsamSeismic'
import { createSeismicEnergySeriesTooltip } from './seismicEnergy'
import { createSeismicitySeriesTooltip } from './seismicity'
import { createThermalSeriesTooltip } from './thermal'
import { createThermalAxisKaliurangSeriesTooltip } from './thermalAxisKaliurang'
import { createTiltmeterSeriesTooltip } from './tiltmeter'
import { createVogamosEmissionSeriesTooltip } from './vogamosEmission'
import { createVogamosTemperatureSeriesTooltip } from './vogamosTemperature'
import { createWeatherBabadanSeriesTooltip } from './weatherBabadan'
import { createWeatherJurangJeroSeriesTooltip } from './weatherJurangJero'
import { createWeatherPasarbubarSeriesTooltip } from './weatherPasarbubar'
import { createThermalAxisDelesSeriesTooltip } from './thermalAxisDeles'

export function tooltipFormatter(formatterParams: TopLevelFormatterParams) {
  const tooltip: string[] = []
  const seriesParams = formatterParams as CallbackDataParams[]

  seriesParams.forEach((params, index) => {
    const { seriesName } = params as { seriesName: string }

    try {
      const { dataType } = objectParse(seriesName) as { dataType: DataType }
      switch (dataType) {
        case 'Doas':
          tooltip.push(createDoasSeriesTooltip(params, index))
          break
        case 'Edm':
          tooltip.push(createEdmSeriesTooltip(params, index))
          break
        case 'GpsBaseline':
          tooltip.push(createGpsBaselineSeriesTooltip(params, index))
          break
        case 'GpsCoordinate':
          tooltip.push(createGpsCoordinateSeriesTooltip(params, index))
          break
        case 'LavaDomes':
          tooltip.push(createLavaDomesSeriesTooltip(params, index))
          break
        case 'Magnetic':
          tooltip.push(createMagneticSeriesTooltip(params, index))
          break
        case 'RfapDirection':
          tooltip.push(createRfapDirectionSeriesTooltip(params, index))
          break
        case 'RfapDistance':
          tooltip.push(createRfapDistanceSeriesTooltip(params, index))
          break
        case 'RfapEnergy':
          tooltip.push(createRfapEnergySeriesTooltip(params, index))
          break
        case 'RfapType':
          tooltip.push(createRfapTypeSeriesTooltip(params, index))
          break
        case 'RsamSeismic':
          tooltip.push(createRsamSeismicSeriesTooltip(params, index))
          break
        case 'SeismicEnergy':
          tooltip.push(createSeismicEnergySeriesTooltip(params, index))
          break
        case 'Seismicity':
          tooltip.push(createSeismicitySeriesTooltip(params, index))
          break
        case 'Thermal':
          tooltip.push(createThermalSeriesTooltip(params, index))
          break
        case 'Tiltmeter':
          tooltip.push(createTiltmeterSeriesTooltip(params, index))
          break
        case 'VogamosEmission':
          tooltip.push(createVogamosEmissionSeriesTooltip(params, index))
          break
        case 'VogamosTemperature':
          tooltip.push(createVogamosTemperatureSeriesTooltip(params, index))
          break
        case 'WeatherBabadan':
          tooltip.push(createWeatherBabadanSeriesTooltip(params, index))
          break
        case 'WeatherPasarbubar':
          tooltip.push(createWeatherPasarbubarSeriesTooltip(params, index))
          break
        case 'WeatherJurangJero':
          tooltip.push(createWeatherJurangJeroSeriesTooltip(params, index))
          break
        case 'GBInsarArea':
          tooltip.push(createGBInsarAreaSeriesTooltip(params, index))
          break
        case 'GBInsarPoint':
          tooltip.push(createGBInsarPointSeriesTooltip(params, index))
          break
        case 'ThermalAxisKaliurang':
          tooltip.push(createThermalAxisKaliurangSeriesTooltip(params, index))
          break
        case 'ThermalAxisDeles':
          tooltip.push(createThermalAxisDelesSeriesTooltip(params, index))
          break
        case 'RainfallDaily':
          tooltip.push(createRainfallDailySeriesTooltip(params, index))
          break
        case 'DoasScan':
          tooltip.push(createDoasScanSeriesTooltip(params, index))
          break
      }
    } catch (error) {
      // Ignore the error because we didn't explicitly stringify series config
      // in the ECharts series name property.
    }
  })

  return tooltip.join('')
}

/**
 * Render Chart Studio chart model to ECharts tooltip.
 */
export function renderTooltip(): TooltipComponentOption {
  return {
    trigger: 'axis',
    formatter: tooltipFormatter,
  }
}
