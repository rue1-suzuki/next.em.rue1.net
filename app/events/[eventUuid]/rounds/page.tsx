import CheckinForm from "@/components/CheckinForm"
import CheckoutForm from "@/components/CheckoutForm"
import { fetchPlayerAll, fetchRoundAll, fetchWinnerAll } from "@/hooks/fetchDataAll"
import { fetchEventDetail } from "@/hooks/fetchDataDetail"
import getCookiePlayerOrUndefined from "@/utils/getCookiePlayer"
import { Metadata } from "next"
import { Fragment } from "react"
import PlayerRound from "./PlayerRound"
import RoundTable from "./RoundTable"

export const metadata: Metadata = {
  title: "対戦表",
}

interface EventRoundPageProps {
  params: {
    eventUuid: string
  }
}

const roundCompareFn = (a: EMRound, b: EMRound) => {
  if (a.number > b.number) return -1
  if (a.number < b.number) return 1

  return 0
}

const EventRoundPage = async (props: EventRoundPageProps) => {
  const { params } = props

  try {
    const [event] = await Promise.all([
      fetchEventDetail(params.eventUuid),
    ])

    const [players, rounds, winners,] = await Promise.all([
      fetchPlayerAll({ event: params.eventUuid }),
      fetchRoundAll({ event: params.eventUuid }),
      fetchWinnerAll({ event: params.eventUuid }),
    ])

    const latestRound = rounds.length > 0 ? rounds[rounds.length - 1] : undefined

    const player = getCookiePlayerOrUndefined(players)

    return (
      <>
        {player === undefined &&
          <div className="mb-3">
            <div className="m-1 p-1">
              <CheckinForm
                eventUuid={params.eventUuid}
                players={players}
              />
            </div>
          </div>
        }

        {latestRound && player &&
          <div className="mb-3">
            <div className="m-1 p-1">
              <h2 className="text-xl font-bold">
                あなたの対戦
              </h2>
            </div>
            <div className="m-1 p-1">
              <PlayerRound
                event={event}
                round={latestRound}
                players={players}
                winners={winners}
                player={player}
              />
            </div>
          </div>
        }

        {rounds.sort(roundCompareFn).map((round) => {
          return (
            <Fragment key={round.uuid}>
              <div className="mb-3">
                <div className="m-1 p-1">
                  <h2 className="text-xl font-bold">
                    対戦表 / 第{round.number}回戦
                  </h2>
                </div>
                <div className="m-1 p-1">
                  <RoundTable
                    round={round}
                    players={players}
                    winners={winners}
                  />
                </div>
              </div>
            </Fragment>
          )
        })}

        {player &&
          <div className="mb-3">
            <div className="m-1 p-1">
              <CheckoutForm />
            </div>
          </div>
        }
      </>
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

export default EventRoundPage
