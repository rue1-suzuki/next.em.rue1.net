"use server"
import { fetchRoundDetail } from "@/hooks/fetchDataDetail"
import { refreshWinners } from "@/utils/refreshWinners"
import { redirect } from "next/navigation"

const winnerReportFormAction = async (formData: FormData) => {
  if (process.env.NEXT_API_ORIGIN === undefined) {
    throw new Error('NEXT_API_ORIGIN is not defined')
  }

  const roundUuid = formData.get("roundUuid")?.toString() as string
  const playerUuid = formData.get("playerUuid")?.toString() as string

  const [round] = await Promise.all([
    fetchRoundDetail(roundUuid),
  ])

  const playerMatchs = round.json.filter((match) => {
    return match.player === playerUuid
  })

  const opponentMatchs = playerMatchs.map((playerMatch) => {
    return round.json.filter((match) => {
      if (match.table === playerMatch.table) {
        if (match.player !== playerMatch.player) {
          return true
        }
      }
      return false
    })
  }).flat()

  const winnerReportUrl = new URL("/bulk/winners/", process.env.NEXT_API_ORIGIN)

  const res = await fetch(winnerReportUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify([
      ...playerMatchs.map((match) => {
        return {
          round: roundUuid,
          player: match.player,
          is_win: true,
        }
      }),
      ...opponentMatchs.map((match) => {
        return {
          round: roundUuid,
          player: match.player,
          is_win: false,
        }
      })
    ]),
  })

  // winnersをリフレッシュ
  const eventUuid = formData.get("eventUuid")?.toString()
  if (eventUuid) {
    await refreshWinners(eventUuid)
    if (res.ok) {
      redirect(`/events/${eventUuid}/rounds`)
    }
  }
}

export default winnerReportFormAction
