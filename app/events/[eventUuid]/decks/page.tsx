import { H2 } from "@/components/MyHeaders"
import { fetchPlayerAll } from "@/fetchs/fetchDataAll"
import { Metadata } from "next"
import playerCompareFn from "./playerCompareFn"

export const metadata: Metadata = {
  title: "デッキ登録",
}

interface EventNoticePageProps {
  params: {
    eventUuid: string
  }
}

const EventNoticePage = async (props: EventNoticePageProps) => {
  const { params } = props

  try {
    const [players] = await Promise.all([
      fetchPlayerAll({ event: params.eventUuid }),
    ])

    return (
      <>
        <div className="mb-3">
          <H2> デッキ登録状況 </H2>
        </div>

        <div className="mb-3">
          <table className="w-full text-center">
            <thead className="bg-gray-100">
              <tr className="border-y">
                <th className="w-2/3 px-4 py-2"> プレイヤー </th>
                <th className="w-1/3 px-4 py-2"> デッキ </th>
              </tr>
            </thead>
            <tbody>
              {players.sort(playerCompareFn).map((player) => {
                return (
                  <tr className={`border-y ${player.deck ? "text-blue-500" : "text-red-500"}`} key={player.uuid}>
                    <td className="px-4 py-2"> {player.name} </td>
                    <td className="px-4 py-2"> {player.deck ? <> 登録済 </> : <> 未登録 </>} </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
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

export default EventNoticePage
