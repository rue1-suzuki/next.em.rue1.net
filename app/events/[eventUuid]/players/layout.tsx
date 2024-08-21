import { H2 } from "@/components/MyHeaders"
import { fetchPlayerAll } from "@/fetchs/fetchDataAll"
import { ReactNode } from "react"

interface EventPlayerLayoutProps {
  params: {
    eventUuid: string
  },
  children: ReactNode
}

const EventPlayerLayout = async (props: EventPlayerLayoutProps) => {
  const { params, children, } = props

  const [players] = await Promise.all([
    fetchPlayerAll({ event: params.eventUuid }),
  ])

  return (
    <>
      {children}

      <div className="mb-3">
        <H2> 参加者一覧 </H2>
      </div>

      <div className="mb-3">
        <table className="w-full text-center">
          <thead className="bg-gray-100">
            <tr className="border-y">
              <th className="w-1/2 px-4 py-2"> ハンドルネーム </th>
              <th className="w-1/2 px-4 py-2"> 状態 </th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr className={`border-y ${player.is_active ? "" : "text-red-500"}`} key={player.uuid}>
                <td className="px-4 py-2"> {player.name} </td>
                <td className="px-4 py-2"> {player.is_active ? <> 参加中 </> : <> ドロップ済 </>} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default EventPlayerLayout
