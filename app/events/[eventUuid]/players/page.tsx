import CheckinForm from "@/components/CheckinForm"
import CheckoutForm from "@/components/CheckoutForm"
import { H2 } from "@/components/MyHeaders"
import { fetchPlayerAll } from "@/fetchs/fetchDataAll"
import getCookiePlayerOrUndefined from "@/utils/getCookiePlayer"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "参加者一覧",
}

interface EventPlayerPageProps {
  params: {
    eventUuid: string
  }
}

const EventPlayerPage = async (props: EventPlayerPageProps) => {
  const { params } = props

  try {
    const [players] = await Promise.all([
      fetchPlayerAll({ event: params.eventUuid }),
    ])

    if (players.length === 0) {
      return (
        <>
          <div className="mb-3">
            <H2> プレイヤーチェックイン </H2>
          </div>

          <div className="mb-3">
            <p> チェックインできるプレイヤーがいません </p>
          </div>
        </>
      )
    }

    const player = getCookiePlayerOrUndefined(players)

    if (player) {
      return (
        <>
          <div className="mb-3">
            <H2> チェックアウト </H2>
          </div>

          <div className="mb-3">
            <CheckoutForm />
          </div>

          <div className="mb-3">
            <p className="text-sm">
              チェックイン中
            </p>
            <p className="text-lg font-bold">
              {player.name}
            </p>
          </div>
        </>
      )
    }

    // 外部IDがあるプレイヤー -> 外部IDを入力してチェックイン
    const externalIdPlayers = players.filter((player) => {
      return typeof player.external_id === "number"
    })

    // 外部IDがnullのプレイヤー -> プレイヤーを選択してチェックイン
    const nullExternalIdPlayers = players.filter((player) => {
      return player.external_id === null
    })

    return (
      <>
        {externalIdPlayers.length > 0 &&
          <>
            <div className="mb-3">
              <H2> 外部IDでチェックイン </H2>
            </div>

            <div className="mb-3">
              <CheckinForm
                eventUuid={params.eventUuid}
                players={externalIdPlayers}
              />
            </div>
          </>
        }

        {nullExternalIdPlayers.length > 0 &&
          <>
            <div className="mb-3">
              <H2> プレイヤーを選択してチェックイン </H2>
            </div>

            <div className="mb-3">
              <CheckinForm
                eventUuid={params.eventUuid}
                players={nullExternalIdPlayers}
              />
            </div>
          </>
        }
      </>
    )
  }
  catch (error) {
    console.error(error)
    return (
      <div className="mb-3">
        <p className="text-red-500 font-bold">
          データの取得に失敗しました
        </p>
        <p className="text-red-500 font-bold">
          event: {params.eventUuid}
        </p>
      </div>
    )
  }
}

export default EventPlayerPage
