import { cache } from "react"
import { ResourceNameEnum } from "./enums"
import fetcher from "./fetcher"

interface AvailableQuery {
  event?: string
}

export const fetchDataAll = async (resourceName: ResourceNameEnum, query?: AvailableQuery,) => {
  const path = `/${resourceName}`

  const res = await fetcher(path, query || {})
  if (res.ok === false) {
    throw new Error(`Failed to fetch ${path}: ${res.statusText}`)
  }

  return await res.json()
}

export const fetchEventAll = cache(async (query?: AvailableQuery): Promise<EMEvent[]> => {
  return await fetchDataAll(ResourceNameEnum.EVENTS, query)
})

export const fetchPlayerAll = async (query?: AvailableQuery): Promise<EMPlayer[]> => {
  return await fetchDataAll(ResourceNameEnum.PLAYERS, query)
}

export const fetchRoundAll = async (query?: AvailableQuery): Promise<EMRound[]> => {
  return await fetchDataAll(ResourceNameEnum.ROUNDS, query)
}

export const fetchWinnerAll = async (query?: AvailableQuery): Promise<EMWinner[]> => {
  return await fetchDataAll(ResourceNameEnum.WINNERS, query)
}

export const fetchResultAll = async (query?: AvailableQuery): Promise<EMResult[]> => {
  return await fetchDataAll(ResourceNameEnum.RESULTS, query)
}
