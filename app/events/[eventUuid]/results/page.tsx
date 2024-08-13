import { fetchEventDetail } from "@/hooks/fetchDataDetail"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "成績表",
}

interface EventResultPageProps {
  params: {
    eventUuid: string
  }
}

const EventResultPage = async (props: EventResultPageProps) => {
  const { params } = props

  try {
    const [event] = await Promise.all([
      fetchEventDetail(params.eventUuid),
    ])

    return (
      <p> Not yet implemented. </p>
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

export default EventResultPage
