import { fetchEventDetail } from "@/fetchs/fetchDataDetail"
import EventData from "./EventData"
import MyPage from "./MyPage"

interface EventPageProps {
  params: {
    eventUuid: string
  }
}

const EventPage = async (props: EventPageProps) => {
  const { params } = props

  try {
    const [event] = await Promise.all([
      fetchEventDetail(params.eventUuid),
    ])

    return (
      <>
        <div className="mb-3">
          <MyPage event={event} />
        </div>

        <div className="mb-3">
          <EventData event={event} />
        </div>
      </>
    )
  } catch (error) {
    console.error(error)
  }

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

export default EventPage
