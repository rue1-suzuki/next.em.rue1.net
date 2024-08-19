import { fetchEventDetail } from "@/hooks/fetchDataDetail"
import EventData from "./EventData"

interface EventPageProps {
  params: {
    eventUuid: string
  }
}

const EventPage = async (props: EventPageProps) => {
  const { params } = props

  try {
    const event = await fetchEventDetail(params.eventUuid)

    return (
      <div className="mb-3">
        <EventData event={event} />
      </div>
    )
  } catch (error) {
    console.error(error)
  }

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

export default EventPage
