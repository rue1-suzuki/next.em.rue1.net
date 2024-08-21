import { H2 } from "@/components/MyHeaders"
import { fetchPlayerAll, fetchRoundAll, fetchWinnerAll } from "@/fetchs/fetchDataAll"
import { Metadata } from "next"
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
    const [players, rounds, winners,] = await Promise.all([
      fetchPlayerAll({ event: params.eventUuid }),
      fetchRoundAll({ event: params.eventUuid }),
      fetchWinnerAll({ event: params.eventUuid }),
    ])

    return (
      <>
        <div className="flex flex-col gap-3">
          {rounds.sort(roundCompareFn).map((round) => {
            const roundWinners = winners.filter((winner) => {
              return winner.round === round.uuid
            })

            const remains = round.json.filter((match) => {
              return roundWinners.every((winner) => {
                return winner.player !== match.player
              })
            }).length / 2

            return (
              <div className="flex-auto" key={round.uuid}>
                <div className="mb-3">
                  <H2> 対戦表 / 第{round.number}回戦 </H2>
                </div>

                {remains > 0 &&
                  <div className="mb-3">
                    <p className="text-lg font-bold text-red-500">
                      残り{remains}卓
                    </p>
                  </div>
                }

                {remains === 0 &&
                  <div className="mb-3">
                    <p className="text-lg font-bold text-blue-500">
                      全卓終了
                    </p>
                  </div>
                }

                <div className="mb-3">
                  <RoundTable
                    round={round}
                    players={players}
                    winners={winners}
                  />
                </div>
              </div>
            )
          })}
        </div>
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

export default EventRoundPage
