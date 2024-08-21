interface EventDataProps {
  event: EMEvent
}

const EventData = (props: EventDataProps) => {
  const { event } = props

  const eventHeldDate = new Date(event.held_date).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const items = [
    {
      title: <> 開催日 </>,
      contents: [
        <> {eventHeldDate} </>,
      ],
    },
    {
      title: <> プラン </>,
      contents: [
        <> {event.plan.name} </>,
        <> 最大{event.plan.max_players}名 </>,
      ],
    },
    {
      title: <> 運営 </>,
      contents: [
        <> {event.organizer.username} </>,
      ],
    },
    {
      title: <> 定員 </>,
      contents: [
        <> {64}名 </>,
      ],
    },
    {
      title: <> 予選通過者数 </>,
      contents: [
        <> {8}名 </>,
      ],
    },
  ]

  if (event.link) {
    items.push({
      title: <> 関連リンク </>,
      contents: [
        <a className="text-blue-500 underline" href={event.link} key={event.link}>
          関連リンク その1
        </a>,
        <a className="text-blue-500 underline" href={event.link} key={event.link}>
          関連リンク その2
        </a>,
        <a className="text-blue-500 underline" href={event.link} key={event.link}>
          関連リンク その3
        </a>,
      ]
    })
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, itemIndex) => {
        return (
          <div className="flex-auto" key={itemIndex}>
            <p className="text-sm">
              {item.title}
            </p>
            {item.contents.map((content, contentIndex) => {
              return (
                <p key={contentIndex}>
                  {content}
                </p>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default EventData
