import {
  YAxisOption as CSYAxisOption,
  DoasScanConfig,
  EdmConfig,
  GBInsarAreaConfig,
  GBInsarPointConfig,
  GpsBaselineConfig,
  GpsCoordinateConfig,
  LavaDomesConfig,
  MagneticConfig,
  RainfallDailyConfig,
  RfapDirectionConfig,
  RfapDistanceConfig,
  RfapEnergyConfig,
  RfapTypeConfig,
  RsamSeismicConfig,
  SeismicEnergyConfig,
  SeismicityConfig,
  SeriesConfig,
  SubplotConfig,
  ThermalAxisKaliurangConfig,
  ThermalConfig,
  TiltmeterConfig,
  VogamosEmissionConfig,
  VogamosTemperatureConfig,
  WeatherBabadanConfig,
  WeatherJurangJeroConfig,
  WeatherPasarbubarConfig,
} from '@/model/types'
import { YAXisOption } from 'echarts/types/dist/shared'

import { createDoasScanYAxisOption } from './doasScan'
import { createEdmYAxisOption } from './edm'
import { createGBInsarAreaYAxisOption } from './gbInsarArea'
import { createGBInsarPointYAxisOption } from './gbinsarPoint'
import { createGpsBaselineYAxisOption } from './gpsBaseline'
import { createGpsCoordinateYAxisOption } from './gpsCoordinate'
import { createLavaDomesYAxisOption } from './lavaDomes'
import { createMagneticYAxisOption } from './magnetic'
import { createRainfallDailyYAxisOption } from './rainfallDaily'
import { createRfapDirectionYAxisOption } from './rfapDirection'
import { createRfapDistanceYAxisOption } from './rfapDistance'
import { createRfapEnergyYAxisOption } from './rfapEnergy'
import { createRfapTypeYAxisOption } from './rfapType'
import { createRsamSeismicYAxisOption } from './rsamSeismic'
import { createSeismicEnergyYAxisOption } from './seismicEnergy'
import { createSeismicityYAxisOption } from './seismicity'
import { createThermalYAxisOption } from './thermal'
import { createThermalAxisKaliurangYAxisOption } from './thermalAxisKaliurang'
import { createTiltmeterYAxisOption } from './tiltmeter'
import { createVogamosEmissionYAxisOption } from './vogamosEmission'
import { createVogamosTemperatureYAxisOption } from './vogamosTemperature'
import { createWeatherBabadanYAxisOption } from './weatherBabadan'
import { createWeatherJurangJeroYAxisOption } from './weatherJurangJero'
import { createWeatherPasarbubarYAxisOption } from './weatherPasarbubar'

export function getLeftYAxisSeries(subplot: SubplotConfig): SeriesConfig[] {
  return subplot.series.filter((series) => {
    return series.config.yAxis?.position
      ? series.config.yAxis?.position !== 'right'
      : true
  })
}

export function getRightYAxisSeries(subplot: SubplotConfig): SeriesConfig[] {
  return subplot.series.filter((series) => {
    return series.config.yAxis?.position === 'right'
  })
}

export function getYAxisOption(series: SeriesConfig[]): YAXisOption[] {
  return series.map(({ dataType, config }) => {
    switch (dataType) {
      case 'Edm':
        return createEdmYAxisOption(config as EdmConfig)
      case 'GpsBaseline':
        return createGpsBaselineYAxisOption(config as GpsBaselineConfig)
      case 'GpsCoordinate':
        return createGpsCoordinateYAxisOption(config as GpsCoordinateConfig)
      case 'LavaDomes':
        return createLavaDomesYAxisOption(config as LavaDomesConfig)
      case 'Magnetic':
        return createMagneticYAxisOption(config as MagneticConfig)
      case 'RfapDirection':
        return createRfapDirectionYAxisOption(config as RfapDirectionConfig)
      case 'RfapDistance':
        return createRfapDistanceYAxisOption(config as RfapDistanceConfig)
      case 'RfapEnergy':
        return createRfapEnergyYAxisOption(config as RfapEnergyConfig)
      case 'RfapType':
        return createRfapTypeYAxisOption(config as RfapTypeConfig)
      case 'RsamSeismic':
        return createRsamSeismicYAxisOption(config as RsamSeismicConfig)
      case 'SeismicEnergy':
        return createSeismicEnergyYAxisOption(config as SeismicEnergyConfig)
      case 'Seismicity':
        return createSeismicityYAxisOption(config as SeismicityConfig)
      case 'Thermal':
        return createThermalYAxisOption(config as ThermalConfig)
      case 'Tiltmeter':
        return createTiltmeterYAxisOption(config as TiltmeterConfig)
      case 'VogamosEmission':
        return createVogamosEmissionYAxisOption(config as VogamosEmissionConfig)
      case 'VogamosTemperature':
        return createVogamosTemperatureYAxisOption(
          config as VogamosTemperatureConfig
        )
      case 'WeatherBabadan':
        return createWeatherBabadanYAxisOption(config as WeatherBabadanConfig)
      case 'WeatherPasarbubar':
        return createWeatherPasarbubarYAxisOption(
          config as WeatherPasarbubarConfig
        )
      case 'WeatherJurangJero':
        return createWeatherJurangJeroYAxisOption(
          config as WeatherJurangJeroConfig
        )
      case 'GBInsarArea':
        return createGBInsarAreaYAxisOption(config as GBInsarAreaConfig)
      case 'GBInsarPoint':
        return createGBInsarPointYAxisOption(config as GBInsarPointConfig)
      case 'ThermalAxisKaliurang':
        return createThermalAxisKaliurangYAxisOption(
          config as ThermalAxisKaliurangConfig
        )
      case 'RainfallDaily':
        return createRainfallDailyYAxisOption(config as RainfallDailyConfig)
      case 'DoasScan':
        return createDoasScanYAxisOption(config as DoasScanConfig)
      default:
        return {}
    }
  })
}

export function deduceYAxisOption(
  subplot: SubplotConfig,
  position: CSYAxisOption['position']
): YAXisOption {
  const leftSeries = getLeftYAxisSeries(subplot)
  const rightSeries = getRightYAxisSeries(subplot)
  const options =
    position === 'left'
      ? getYAxisOption(leftSeries)
      : getYAxisOption(rightSeries)
  return options.length ? options[0] : {}
}
