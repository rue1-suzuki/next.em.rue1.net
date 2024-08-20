import fetcher from "./fetcher"
import { defaultRevalidate, ResourceNameEnum } from "./settings"

const fetchDataDetail = async (
  resourceName: ResourceNameEnum,
  resourceUuid: string,
  revalidate: number,
) => {
  const path = `/${resourceName}/${resourceUuid}/`

  console.log("fetch %s: %s", resourceName, resourceUuid)
  const res = await fetcher(path, {}, revalidate)
  if (res.ok === false) {
    throw new Error(`Failed to fetch ${path}: ${res.statusText}`)
  }

  return await res.json()
}

export const fetchEventDetail = async (
  uuid: string,
  revalidate = defaultRevalidate,
): Promise<EMEvent> => {
  return await fetchDataDetail(ResourceNameEnum.EVENTS, uuid, revalidate)
}

export const fetchPlayerDetail = async (
  uuid: string,
  revalidate = defaultRevalidate,
): Promise<EMPlayer> => {
  return await fetchDataDetail(ResourceNameEnum.PLAYERS, uuid, revalidate)
}

export const fetchRoundDetail = async (
  uuid: string,
  revalidate = defaultRevalidate,
): Promise<EMRound> => {
  return await fetchDataDetail(ResourceNameEnum.ROUNDS, uuid, revalidate)
}

export const fetchWinnerDetail = async (
  uuid: string,
  revalidate = defaultRevalidate,
): Promise<EMWinner> => {
  return await fetchDataDetail(ResourceNameEnum.WINNERS, uuid, revalidate)
}

export const fetchResultDetail = async (
  uuid: string,
  revalidate = defaultRevalidate,
): Promise<EMResult> => {
  return await fetchDataDetail(ResourceNameEnum.RESULTS, uuid, revalidate)
}
