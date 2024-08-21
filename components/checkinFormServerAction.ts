"use server"
import { fetchPlayerAll } from "@/fetchs/fetchDataAll"
import { AvailableKeys, setCookieValue } from "@/utils/getCookieValue"

const checkinFormServerAction = async (formData: FormData) => {
  const eventUuid = formData.get("eventUuid")?.toString() as string
  const players = await fetchPlayerAll({ event: eventUuid })

  // UUIDで指定 外部IDが未指定のプレイヤーのみ
  const playerUuid = formData.get("playerUuid")?.toString()
  if (playerUuid) {
    const player = players.find((player) => {
      return player.uuid === playerUuid
    })

    if (player && player.external_id === null) {
      setCookieValue(AvailableKeys.PLAYER_UUID, player.uuid)
      return {
        playerUuid: player.uuid,
      }
    }
  }

  // 外部IDで指定
  const playerExternalId = formData.get("playerExternalId")?.toString()
  if (playerExternalId) {
    const player = players.find((player) => {
      return player.external_id === Number(playerExternalId)
    })
    if (player) {
      setCookieValue(AvailableKeys.PLAYER_UUID, player.uuid)
      return {
        playerUuid: player.uuid,
      }
    }
  }

  throw new Error("プレイヤーが見つかりませんでした")
}

export default checkinFormServerAction
