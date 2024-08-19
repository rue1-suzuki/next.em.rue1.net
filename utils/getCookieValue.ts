import { cookies } from "next/headers"

export enum AvailableKeys {
  PLAYER_UUID = "playerUuid"
}

export const setCookieValue = (key: AvailableKeys, value: string) => {
  cookies().set(key, value)
}

export const getCookieValue = (key: AvailableKeys) => {
  const cookie = cookies().get(key)
  return cookie ? cookie.value : undefined
}

export const deleteCookieValue = (key: AvailableKeys) => {
  cookies().delete(key)
}
