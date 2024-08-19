import LinkList from "@/components/LinkList"
import { fetchResultAll, fetchRoundAll } from "@/hooks/fetchDataAll"

interface EventContentLinksProps {
  event: EMEvent
}

const EventContentLinkList = async (props: EventContentLinksProps) => {
  const { event } = props

  const linkListItems = [{
    href: `/events/${event.uuid}/players`,
    children: <> 参加者一覧 </>,
  }]

  if (event.is_active === true) {
    linkListItems.push({
      href: `/events/${event.uuid}/decks`,
      children: <> デッキ登録 </>,
    })
  }
  else if (event.is_active === false) {
    const setRoundLink = async () => {
      const rounds = await fetchRoundAll({ event: event.uuid })
      if (rounds.length > 0) {
        linkListItems.push({
          href: `/events/${event.uuid}/rounds/`,
          children: <> 対戦表 / 第{rounds.length}回戦 </>,
        })
      }
    }

    const setResultLink = async () => {
      const results = await fetchResultAll({ event: event.uuid })
      if (results.length > 0) {
        linkListItems.push({
          href: `/events/${event.uuid}/results/`,
          children: <> 成績表 </>,
        })
      }
    }

    await Promise.all([
      setRoundLink(),
      setResultLink(),
    ])
  }

  return (<LinkList items={linkListItems} />)
}

export default EventContentLinkList
