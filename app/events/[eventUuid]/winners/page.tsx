import CheckinForm from "@/components/CheckinForm"
import { fetchPlayerAll, fetchRoundAll, fetchWinnerAll } from "@/hooks/fetchDataAll"
import { AvailableKeys, getCookieValue } from "@/utils/getCookieValue"
import { Metadata } from "next"
import WinnerReportForm from "./WinnerReportForm"

export const metadata: Metadata = {
  title: "勝利報告",
}

interface EventWinnerPageProps {
  params: {
    eventUuid: string
  },
}

const EventWinnerPage = async (props: EventWinnerPageProps) => {
  const { params } = props

  try {
    const [rounds] = await Promise.all([
      fetchRoundAll({ event: params.eventUuid }),
    ])

    if (rounds.length === 0) {
      return (
        <>
          <div className="mb-3">
            <div className="m-1 p-1">
              <h2 className="text-xl font-bold">
                勝利報告
              </h2>
            </div>
            <div className="m-1 p-1">
              <p>
                勝利報告する回戦がありません
              </p>
            </div>
          </div>
        </>
      )
    }

    const [players] = await Promise.all([
      fetchPlayerAll({ event: params.eventUuid }),
    ])

    const playerUuid = getCookieValue(AvailableKeys.PLAYER_UUID)
    const player = players.find((player) => player.uuid === playerUuid)

    if (player === undefined) {
      return (
        <>
          <div className="mb-3">
            <div className="m-1 p-1">
              <h2 className="text-xl font-bold">
                勝利報告
              </h2>
            </div>
            <div className="m-1 p-1">
              <CheckinForm
                eventUuid={params.eventUuid}
                players={players}
              />
            </div>
          </div>
        </>
      )
    }

    const latestRound = rounds[rounds.length - 1]

    const [winners] = await Promise.all([
      fetchWinnerAll({ event: params.eventUuid })
    ])

    const currentWinner = winners.find((winner) => {
      if (winner.round === latestRound.uuid) {
        if (winner.player === player.uuid) {
          return true
        }
      }
      return false
    })

    if (currentWinner === undefined) {
      return (
        <>
          <div className="mb-3">
            <div className="m-1 p-1">
              <h2 className="text-xl font-bold">
                勝利報告 / 第{latestRound.number}回戦
              </h2>
            </div>
            <div className="m-1 p-1">
              <WinnerReportForm
                eventUuid={params.eventUuid}
                roundUuid={latestRound.uuid}
                playerUuid={player.uuid}
              />
            </div>
          </div>
        </>
      )
    }

    return (
      <div className="mb-3">
        <div className="m-1 p-1">
          <h2 className="text-xl font-bold">
            勝利報告 / 第{latestRound.number}回戦
          </h2>
        </div>
        <div className="m-1 p-1">
          <p> 勝利報告済み </p>
        </div>
      </div>
    )
  }
  catch (error) {
    console.error(error)
    return (
      <main className="text-center py-3">
        <p className="text-red-500 font-bold">
          データの取得に失敗しました
        </p>
        <p className="text-red-500 font-bold">
          event: {params.eventUuid}
        </p>
      </main>
    )
  }
}

export default EventWinnerPage
