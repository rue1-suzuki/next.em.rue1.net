import { fetchPlayerAll, fetchRoundAll, fetchWinnerAll } from "@/fetchs/fetchDataAll"
import getCookiePlayerOrUndefined from "@/utils/getCookiePlayer"
import { Metadata } from "next"
import Link from "next/link"
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
    const [rounds, players, winners,] = await Promise.all([
      fetchRoundAll({ event: params.eventUuid }),
      fetchPlayerAll({ event: params.eventUuid }),
      fetchWinnerAll({ event: params.eventUuid }),
    ])

    if (rounds.length === 0) {
      return (
        <p> 勝利報告する回戦がありません </p>
      )
    }

    const player = getCookiePlayerOrUndefined(players)
    if (player === undefined) {
      return (
        <Link className="text-blue-500 underline" href={`/events/${params.eventUuid}/players`}>
          チェックインして勝利報告
        </Link>
      )
    }

    const latestRound = rounds[rounds.length - 1]

    const alreadyReported = winners.some((winner) => {
      if (winner.round === latestRound.uuid) {
        if (winner.player === player.uuid) {
          return true
        }
      }
      return false
    })

    if (alreadyReported) {
      return (
        <p> 結果報告済み </p>
      )
    }

    return (
      <WinnerReportForm
        round={latestRound}
        player={player}
      />
    )
  }
  catch (error) {
    console.error(error)
    return (
      <p className="text-red-500 font-bold">
        データの取得に失敗しました
      </p>
    )
  }
}

export default EventWinnerPage
