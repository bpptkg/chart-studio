import {
  DataType,
  DoasScanConfig,
  ParameterConfigType,
  RainfallDailyConfig,
} from './types'

/**
 * Create default series configuration entry for certain data type.
 *
 * If dataType is undefined, it will throw an error.
 */
export function createSeriesConfig<T extends DataType = DataType>(
  dataType: T | undefined
): ParameterConfigType {
  switch (dataType) {
    case 'Seismicity':
      return {
        eventType: 'VTA',
      }

    case 'Edm':
      return {
        benchmark: 'BAB0',
        reflector: 'RB1',
        type: 'slope',
      }

    case 'SeismicEnergy':
      return {
        type: 'total',
        aggregate: 'daily',
      }

    case 'RfapEnergy':
      return {
        field: 'count',
      }

    case 'RsamSeismic':
      return {
        station: 'pasarbubar',
        band: 'band0',
        field: 'value',
      }

    case 'GpsBaseline':
      return {
        station1: 'klatakan',
        station2: 'plawangan',
      }

    case 'GpsCoordinate':
      return {
        station: 'pasarbubar',
        field: 'east',
      }

    case 'Tiltmeter':
      return {
        type: 'platform',
        station: 'babadan',
        field: 'x',
      }

    case 'VogamosEmission':
      return {
        field: 'co2_avg',
      }

    case 'VogamosTemperature':
      return {
        field: 'temperature1',
      }

    case 'Doas':
      return {
        station: 'babadan',
      }

    case 'LavaDomes':
      return {
        location: 'BARAT DAYA',
        field: 'volume',
      }

    case 'WeatherPasarbubar':
      return {
        field: 'cumulative_rainfall',
      }

    case 'WeatherBabadan':
      return {
        field: 'cumulative_rainfall',
      }

    case 'WeatherJurangJero':
      return {
        field: 'cumulative_rainfall',
      }

    case 'RfapDistance':
      return {
        field: 'rf-count',
      }

    case 'RfapDirection':
      return {
        field: 'count',
      }

    case 'RfapType':
      return {
        type: 'all',
        field: 'count',
      }

    case 'Magnetic':
      return {
        station: 'imogiri',
        field: 'x',
      }

    case 'Thermal':
      return {
        station: 'babadan',
        area: 'baba-kubah-bd',
        field: 'temperature',
      }

    case 'GBInsarPoint':
      return {
        field: 'rb1',
        sampling: 'hour',
      }

    case 'GBInsarArea':
      return {
        field: 'kubahlava',
        sampling: 'hour',
      }

    case 'ThermalAxisKaliurang':
      return {
        area: 'kubah-bd',
        sampling: 'hour',
        useSkyFilter: false,
        fieldType: 'max_temp',
        aggregate: 'avg',
        skyFilterAggregate: 'avg',
      }

    case 'ThermalAxisDeles':
      return {
        area: 'Asap',
        sampling: 'hour',
        fieldType: 'max_temp',
        aggregate: 'avg',
      }

    case 'ThermalAxisBabadan':
      return {
        area: 'Asap',
        sampling: 'hour',
        fieldType: 'max_temp',
        aggregate: 'avg',
      }

    case 'ThermalAxisJurangJero':
      return {
        area: 'Asap',
        sampling: 'hour',
        fieldType: 'max_temp',
        aggregate: 'avg',
      }

    case 'RainfallDaily': {
      const options: RainfallDailyConfig = {
        station: 'pasarbubar',
        sampling: 'day',
      }
      return options
    }

    case 'DoasScan': {
      const options: DoasScanConfig = {
        station: 'babadan1',
        fieldType: 'flux',
      }
      return options
    }

    default:
      throw new Error(`Unsupported data type: ${dataType}`)
  }
}
