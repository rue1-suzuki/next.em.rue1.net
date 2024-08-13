import LinkList from "@/components/LinkList"
import { fetchResultAll, fetchRoundAll } from "@/hooks/fetchDataAll"
import { fetchEventDetail } from "@/hooks/fetchDataDetail"
import EventLayout from "../../../components/EventLayout"
import { Metadata } from "next"

export const metadata: Metadata = {}

interface EventPageProps {
  params: {
    eventUuid: string
  }
}

const EventPage = async (props: EventPageProps) => {
  const { params } = props

  try {
    const [event, rounds, results,] = await Promise.all([
      fetchEventDetail(params.eventUuid),
      fetchRoundAll({ event: params.eventUuid }),
      fetchResultAll({ event: params.eventUuid }),
    ])

    const linkListItems = [
      {
        href: `/events/${event.uuid}/players`,
        children: <> 参加者一覧 </>,
      },
      ...rounds.map((round) => {
        return {
          href: `/events/${event.uuid}/rounds/`,
          children: <> 対戦表/第{round.number}回戦 </>,
        }
      }),
      ...results.map((result) => {
        return {
          href: `/events/${event.uuid}/results/`,
          children: <> 成績表 </>,
        }
      }),
    ]

    return (
      <EventLayout event={event} metadata={metadata}>
        <LinkList items={linkListItems} />
      </EventLayout>
    )
  } catch (error) {
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

export default EventPage
