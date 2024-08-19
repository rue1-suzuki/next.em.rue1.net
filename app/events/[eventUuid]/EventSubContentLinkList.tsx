import LinkList from "@/components/LinkList"

interface EventSubContentLinkListProps {
  event: EMEvent
}

const EventSubContentLinkList = async (props: EventSubContentLinkListProps) => {
  const { event } = props

  const linkListItems = [{
    href: `/events/${event.uuid}/reports`,
    children: <> 参加者を通報 </>,
  }]

  return (<LinkList items={linkListItems} />)
}

export default EventSubContentLinkList
