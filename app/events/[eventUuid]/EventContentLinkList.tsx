import LinkList from "@/components/LinkList"
import { fetchPlayerAll, fetchResultAll, fetchRoundAll } from "@/fetchs/fetchDataAll"

interface EventContentLinksProps {
  event: EMEvent
}

const EventContentLinkList = async (props: EventContentLinksProps) => {
  const { event } = props

  const [players] = await Promise.all([
    await fetchPlayerAll({ event: event.uuid }),
  ])

  const linkListItems = [{
    href: `/events/${event.uuid}/players`,
    children: <> 参加者一覧 ({players.length}名) </>,
  }]

  if (event.is_active === true) {
    linkListItems.push({
      href: `/events/${event.uuid}/decks`,
      children: <> デッキ登録 (未{players.filter((player) => player.deck === null).length}名) </>,
    })
  }
  else if (event.is_active === false) {
    const [rounds, results,] = await Promise.all([
      await fetchRoundAll({ event: event.uuid }),
      await fetchResultAll({ event: event.uuid }),
    ])

    if (rounds.length > 0) {
      linkListItems.push({
        href: `/events/${event.uuid}/rounds/`,
        children: <> 対戦表一覧 ({rounds.length}件) </>,
      })
    }

    if (results.length > 0) {
      linkListItems.push({
        href: `/events/${event.uuid}/results/`,
        children: <> 成績表一覧 ({results.length}件) </>,
      })
    }
  }

  return (<LinkList items={linkListItems} />)
}

export default EventContentLinkList
