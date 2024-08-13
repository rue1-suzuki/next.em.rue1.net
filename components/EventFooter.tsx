interface EventFooterProps {
  event: EMEvent
}

const EventFooter = (props: EventFooterProps) => {
  const { event } = props

  return (
    <div className="bg-gray-500 py-2 text-center">
      <p className="text-sm font-bold text-white">
        運営: {event.organizer.username}
      </p>
    </div>
  )
}

export default EventFooter
