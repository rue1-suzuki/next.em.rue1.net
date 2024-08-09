import { ResourceNameEnum } from "./enums"
import fetcher from "./fetcher"

export const fetchDataDetail = async (resourceName: ResourceNameEnum, resourceUuid: string, query?: Record<string, any>,) => {
  const path = `/${resourceName}/${resourceUuid}`

  const res = await fetcher(path, query || {})
  if (res.ok === false) {
    throw new Error(`Failed to fetch ${path}: ${res.statusText}`)
  }

  return await res.json()
}

export const fetchEventDetail = async (uuid: string): Promise<EMEvent> => {
  return await fetchDataDetail(ResourceNameEnum.EVENTS, uuid)
}

export const fetchPlayerDetail = async (uuid: string): Promise<EMPlayer> => {
  return await fetchDataDetail(ResourceNameEnum.PLAYERS, uuid)
}

export const fetchRoundDetail = async (uuid: string): Promise<EMRound> => {
  return await fetchDataDetail(ResourceNameEnum.ROUNDS, uuid)
}

export const fetchWinnerDetail = async (uuid: string): Promise<EMWinner> => {
  return await fetchDataDetail(ResourceNameEnum.WINNERS, uuid)
}

export const fetchResultDetail = async (uuid: string): Promise<EMResult> => {
  return await fetchDataDetail(ResourceNameEnum.RESULTS, uuid)
}
