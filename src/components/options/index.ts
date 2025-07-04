import { DataType } from '@/model/types'
import DoasOptions from './DoasOptions.vue'
import DoasScanOptions from './DoasScanOptions.vue'
import EdmOptions from './EdmOptions.vue'
import GBInsarAreaOptions from './GBInsarAreaOptions.vue'
import GBInsarPointOptions from './GBInsarPointOptions.vue'
import GpsBaselineOptions from './GpsBaselineOptions.vue'
import GpsCoordinateOptions from './GpsCoordinateOptions.vue'
import LavaDomesOptions from './LavaDomesOptions.vue'
import MagneticOptions from './MagneticOptions.vue'
import RainfallDailyOptions from './RainfallDailyOptions.vue'
import RfapDirectionOptions from './RfapDirectionOptions.vue'
import RfapDistanceOptions from './RfapDistanceOptions.vue'
import RfapEnergyOptions from './RfapEnergyOptions.vue'
import RfapTypeOptions from './RfapTypeOptions.vue'
import RsamSeismicOptions from './RsamSeismicOptions.vue'
import SeismicEnergyOptions from './SeismicEnergyOptions.vue'
import SeismicityOptions from './SeismicityOptions.vue'
import ThermalAxisBabadanOptions from './ThermalAxisBabadanOptions.vue'
import ThermalAxisDelesOptions from './ThermalAxisDelesOptions.vue'
import ThermalAxisJurangJeroOptions from './ThermalAxisJurangJeroOptions.vue'
import ThermalAxisKaliurangOptions from './ThermalAxisKaliurangOptions.vue'
import ThermalOptions from './ThermalOptions.vue'
import TiltmeterOptions from './TiltmeterOptions.vue'
import VogamosEmissionOptions from './VogamosEmissionOptions.vue'
import VogamosTemperatureOptions from './VogamosTemperatureOptions.vue'
import WeatherBabadanOptions from './WeatherBabadanOptions.vue'
import WeatherJurangJeroOptions from './WeatherJurangJeroOptions.vue'
import WeatherPasarbubarOptions from './WeatherPasarbubarOptions.vue'

export type ComponentOptions =
  | typeof DoasOptions
  | typeof EdmOptions
  | typeof GpsBaselineOptions
  | typeof GpsCoordinateOptions
  | typeof LavaDomesOptions
  | typeof MagneticOptions
  | typeof RfapDirectionOptions
  | typeof RfapDistanceOptions
  | typeof RfapEnergyOptions
  | typeof RfapTypeOptions
  | typeof RsamSeismicOptions
  | typeof SeismicEnergyOptions
  | typeof SeismicityOptions
  | typeof ThermalOptions
  | typeof TiltmeterOptions
  | typeof VogamosEmissionOptions
  | typeof VogamosTemperatureOptions
  | typeof WeatherBabadanOptions
  | typeof WeatherPasarbubarOptions
  | typeof WeatherJurangJeroOptions
  | typeof GBInsarAreaOptions
  | typeof GBInsarPointOptions
  | typeof ThermalAxisKaliurangOptions
  | typeof ThermalAxisDelesOptions
  | typeof ThermalAxisBabadanOptions
  | typeof ThermalAxisJurangJeroOptions
  | typeof DoasScanOptions
  | typeof RainfallDailyOptions

export type ComponentOptionsMapInternal = { [k in DataType]: ComponentOptions }

export const ComponentOptionsMap: ComponentOptionsMapInternal = {
  Doas: DoasOptions,
  Edm: EdmOptions,
  GpsBaseline: GpsBaselineOptions,
  GpsCoordinate: GpsCoordinateOptions,
  LavaDomes: LavaDomesOptions,
  Magnetic: MagneticOptions,
  RfapDirection: RfapDirectionOptions,
  RfapDistance: RfapDistanceOptions,
  RfapEnergy: RfapEnergyOptions,
  RfapType: RfapTypeOptions,
  RsamSeismic: RsamSeismicOptions,
  SeismicEnergy: SeismicEnergyOptions,
  Seismicity: SeismicityOptions,
  Thermal: ThermalOptions,
  Tiltmeter: TiltmeterOptions,
  VogamosEmission: VogamosEmissionOptions,
  VogamosTemperature: VogamosTemperatureOptions,
  WeatherBabadan: WeatherBabadanOptions,
  WeatherPasarbubar: WeatherPasarbubarOptions,
  WeatherJurangJero: WeatherJurangJeroOptions,
  GBInsarArea: GBInsarAreaOptions,
  GBInsarPoint: GBInsarPointOptions,
  ThermalAxisKaliurang: ThermalAxisKaliurangOptions,
  ThermalAxisDeles: ThermalAxisDelesOptions,
  ThermalAxisBabadan: ThermalAxisBabadanOptions,
  ThermalAxisJurangJero: ThermalAxisJurangJeroOptions,
  RainfallDaily: RainfallDailyOptions,
  DoasScan: DoasScanOptions,
}
