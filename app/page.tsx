import { fetchEventAll } from "@/hooks/fetchDataAll"
import Link from "next/link"

const HomePage = async () => {
  const events = await fetchEventAll()

  return (
    <main>
      <div className="flex flex-col gap-1">
        {events.map((event) => {
          const eventPath = `/events/${event.uuid}`

          return (
            <Link className="text-blue-500 underline" href={eventPath} key={event.uuid}>
              {event.name}
            </Link>
          )
        })}
      </div>
    </main>
  )
}

export default HomePage
