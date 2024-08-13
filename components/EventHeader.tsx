import Link from "next/link"

interface EventHeaderProps {
  event: EMEvent
}

const EventHeader = (props: EventHeaderProps) => {
  const { event } = props

  const href = `/events/${event.uuid}`

  return (
    <div className="bg-blue-500 py-2 text-center">
      <h1 className="text-lg font-bold text-white truncate">
        <Link href={href}>
          {event.name}
        </Link>
      </h1>
    </div>
  )
}

export default EventHeader
