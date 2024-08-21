import { H2 } from "@/components/MyHeaders"
import { fetchPlayerAll } from "@/fetchs/fetchDataAll"
import { Metadata } from "next"
import ReportForm from "./ReportForm"

export const metadata: Metadata = {
  title: "通報",
}

interface EventReportPageProps {
  params: {
    eventUuid: string
  }
}

const EventReportPage = async (props: EventReportPageProps) => {
  const { params } = props

  try {
    const [players] = await Promise.all([
      fetchPlayerAll({ event: params.eventUuid }),
    ])

    return (
      <>
        <div className="mb-3">
          <H2> 通報フォーム </H2>
        </div>

        <div className="mb-3">
          <ReportForm players={players} />
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

export default EventReportPage
