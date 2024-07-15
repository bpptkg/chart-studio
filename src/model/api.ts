import axios, { AxiosInstance } from 'axios'

export const cendanaURL = import.meta.env.VITE_CENDANA_URL
export const bmaURL = import.meta.env.VITE_BMA_URL
export const bmaAPIKey = import.meta.env.VITE_BMA_API_KEY
export const plotrequestURL = import.meta.env.VITE_PLOTREQUEST_URL
export const plotrequestAPIKey = import.meta.env.VITE_PLOTREQUEST_API_KEY

export const api: AxiosInstance = axios.create({
  baseURL: `${bmaURL}/api/v1/`,
  headers: {
    Authorization: `Api-Key ${bmaAPIKey}`,
  },
})
