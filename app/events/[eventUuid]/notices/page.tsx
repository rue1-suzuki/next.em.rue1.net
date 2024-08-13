import { fetchEventDetail } from "@/hooks/fetchDataDetail"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "お知らせ",
}

interface EventNoticePageProps {
  params: {
    eventUuid: string
  }
}

const EventNoticePage = async (props: EventNoticePageProps) => {
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

export default EventNoticePage
