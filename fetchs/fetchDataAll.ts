import fetcher from "./fetcher"
import { AvailableQuery, defaultRevalidate, ResourceNameEnum } from "./settings"

const fetchDataAll = async (
  resourceName: ResourceNameEnum,
  query: AvailableQuery,
  revalidate: number,
) => {
  const path = `/${resourceName}/`

  console.log("fetch %s", resourceName)
  const res = await fetcher(path, query, revalidate)
  if (res.ok === false) {
    throw new Error(`Failed to fetch ${path}: ${res.statusText}`)
  }

  return await res.json()
}

export const fetchEventAll = async (
  query: AvailableQuery = {},
  revalidate: number = defaultRevalidate,
): Promise<EMEvent[]> => {
  return await fetchDataAll(ResourceNameEnum.EVENTS, query, revalidate)
}

export const fetchPlayerAll = async (
  query: AvailableQuery = {},
  revalidate: number = defaultRevalidate,
): Promise<EMPlayer[]> => {
  return await fetchDataAll(ResourceNameEnum.PLAYERS, query, revalidate)
}

export const fetchRoundAll = async (
  query: AvailableQuery = {},
  revalidate: number = defaultRevalidate,
): Promise<EMRound[]> => {
  return await fetchDataAll(ResourceNameEnum.ROUNDS, query, revalidate)
}

export const fetchWinnerAll = async (
  query: AvailableQuery = {},
  revalidate: number = defaultRevalidate,
): Promise<EMWinner[]> => {
  return await fetchDataAll(ResourceNameEnum.WINNERS, query, revalidate)
}

export const fetchResultAll = async (
  query: AvailableQuery = {},
  revalidate: number = defaultRevalidate,
): Promise<EMResult[]> => {
  return await fetchDataAll(ResourceNameEnum.RESULTS, query, revalidate)
}
