import { ResourceNameEnum } from "./enums"
import fetcher from "./fetcher"

interface AvailableQuery { }

export const fetchDataDetail = async (
  resourceName: ResourceNameEnum,
  resourceUuid: string,
  query?: AvailableQuery,
) => {
  const path = `/${resourceName}/${resourceUuid}`

  const res = await fetcher(path, query || {})
  if (res.ok === false) {
    throw new Error(`Failed to fetch ${path}: ${res.statusText}`)
  }

  return await res.json()
}

export const fetchEventDetail = async (uuid: string, query?: AvailableQuery,): Promise<EMEvent> => {
  return await fetchDataDetail(ResourceNameEnum.EVENTS, uuid, query,)
}

export const fetchPlayerDetail = async (uuid: string, query?: AvailableQuery,): Promise<EMPlayer> => {
  return await fetchDataDetail(ResourceNameEnum.PLAYERS, uuid, query,)
}

export const fetchRoundDetail = async (uuid: string, query?: AvailableQuery,): Promise<EMRound> => {
  return await fetchDataDetail(ResourceNameEnum.ROUNDS, uuid, query,)
}

export const fetchWinnerDetail = async (uuid: string, query?: AvailableQuery,): Promise<EMWinner> => {
  return await fetchDataDetail(ResourceNameEnum.WINNERS, uuid, query,)
}

export const fetchResultDetail = async (uuid: string, query?: AvailableQuery,): Promise<EMResult> => {
  return await fetchDataDetail(ResourceNameEnum.RESULTS, uuid, query,)
}
