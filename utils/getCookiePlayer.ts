import { AvailableKeys, getCookieValue } from "./getCookieValue"

const getCookiePlayerOrUndefined = (players: EMPlayer[]) => {
  const playerUuid = getCookieValue(AvailableKeys.PLAYER_UUID)
  return playerUuid ? players.find((player) => player.uuid === playerUuid) : undefined
}

export default getCookiePlayerOrUndefined
