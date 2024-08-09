import { ResourceNameEnum } from "./enums"
import fetcher from "./fetcher"

export const fetchDataAll = async (resourceName: ResourceNameEnum, query?: Record<string, any>,) => {
  const path = `/${resourceName}`

  const res = await fetcher(path, query || {})
  if (res.ok === false) {
    throw new Error(`Failed to fetch ${path}: ${res.statusText}`)
  }

  return await res.json()
}

export const fetchEventAll = async (): Promise<EMEvent[]> => {
  return await fetchDataAll(ResourceNameEnum.EVENTS)
}

export const fetchPlayerAll = async (): Promise<EMPlayer[]> => {
  return await fetchDataAll(ResourceNameEnum.PLAYERS)
}

export const fetchRoundAll = async (): Promise<EMRound[]> => {
  return await fetchDataAll(ResourceNameEnum.ROUNDS)
}

export const fetchWinnerAll = async (): Promise<EMWinner[]> => {
  return await fetchDataAll(ResourceNameEnum.WINNERS)
}

export const fetchResultAll = async (): Promise<EMResult[]> => {
  return await fetchDataAll(ResourceNameEnum.RESULTS)
}
