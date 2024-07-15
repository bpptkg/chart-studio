import { RsamSeismicConfig } from '@/model/types'

export default [
  { value: 'band0', title: 'RSAM' },
  { value: 'band1', title: 'Band 1 (0.5 - 2.5 Hz)' },
  { value: 'band2', title: 'Band 2 (2.5 - 4.5 Hz)' },
  { value: 'band3', title: 'Band 3 (4.5 - 6.5 Hz)' },
  { value: 'band4', title: 'Band 4 (6.5 - 8.5 Hz)' },
  { value: 'band5', title: 'Band 5 (8.5 - 10.5 Hz)' },
  { value: 'band6', title: 'Band 6 (10.5 - 12.5 Hz)' },
  { value: 'band7', title: 'Band 7 (12.5 - 14.5 Hz)' },
  { value: 'band8', title: 'Band 8 (14.5 - 16.5 Hz)' },
  { value: 'band9', title: 'Band 9 (16.5 - 18.5 Hz)' },
  { value: 'band10', title: 'Band 10 (18.5 - 20.5 Hz)' },
  { value: 'band11', title: 'Band 11 (20.5 - 22.5 Hz)' },
  { value: 'band12', title: 'Band 12 (22.5 - 24.5 Hz)' },
  { value: 'band13', title: 'Band 13 (24.5 - 26.5 Hz)' },
] as {
  value: RsamSeismicConfig['band']
  title: string
}[]
