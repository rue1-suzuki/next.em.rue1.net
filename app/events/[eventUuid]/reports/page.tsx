import EventLayout from "@/components/EventLayout"
import { fetchEventDetail } from "@/hooks/fetchDataDetail"
import { Metadata } from "next"

export const metadata: Metadata = {}

interface EventReportPageProps {
  params: {
    eventUuid: string
  }
}

const EventReportPage = async (props: EventReportPageProps) => {
  const { params } = props

  try {
    const [event] = await Promise.all([
      fetchEventDetail(params.eventUuid),
    ])

    return (
      <EventLayout event={event} metadata={metadata}>
        Not yet implemented.
      </EventLayout>
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

export default EventReportPage
