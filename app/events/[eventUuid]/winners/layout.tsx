import { H2 } from "@/components/MyHeaders"
import { fetchPlayerAll, fetchRoundAll, fetchWinnerAll } from "@/fetchs/fetchDataAll"
import { ReactNode } from "react"
import winnerCompareFn from "./winnerCompareFn"

interface WinnerPageLayoutProps {
  params: {
    eventUuid: string,
  },
  children: ReactNode,
}

const WinnerPageLayout = async (props: WinnerPageLayoutProps) => {
  const { params, children, } = props

  const [rounds, players, winners,] = await Promise.all([
    fetchRoundAll({ event: params.eventUuid }),
    fetchPlayerAll({ event: params.eventUuid }),
    fetchWinnerAll({ event: params.eventUuid }),
  ])

  return (
    <>
      <div className="mb-3">
        <H2> 勝利報告 </H2>
      </div>

      <div className="mb-3">
        {children}
      </div>

      <div className="mb-3">
        <H2> 勝利報告一覧 </H2>
      </div>

      <div className="mb-3">
        <table className="w-full text-center">
          <thead className="bg-gray-100">
            <tr className="border-y">
              <th className="w-1/4 px-4 py-2"> 回戦 </th>
              <th className="w-2/4 px-4 py-2"> プレイヤー </th>
              <th className="w-1/4 px-4 py-2"> 勝敗 </th>
            </tr>
          </thead>
          <tbody>
            {winners.sort(winnerCompareFn).map((winner) => {
              const round = rounds.find((round) => round.uuid === winner.round)
              const player = players.find((player) => player.uuid === winner.player)

              return (
                <tr className={`border-y ${winner.is_win ? "bg-blue-50 text-blue-500" : "bg-red-50 text-red-500"}`} key={winner.uuid}>
                  <td className="px-4 py-2"> 第{round && round.number}回戦 </td>
                  <td className="px-4 py-2"> {player && player.name} </td>
                  <td className="px-4 py-2"> {winner.is_win ? <> 勝ち </> : <> 負け </>} </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default WinnerPageLayout
