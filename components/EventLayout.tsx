import EventFooter from "@/components/EventFooter"
import EventHeader from "@/components/EventHeader"
import { Metadata } from "next"
import { ReactNode } from "react"

interface EventLayoutProps {
  event: EMEvent
  metadata: Metadata
  children: ReactNode
}

const EventLayout = async (props: EventLayoutProps) => {
  const { event, metadata, children, } = props

  metadata.title = `EM | ${event.name}`
  metadata.twitter = {
    title: metadata.title,
    description: metadata.description || undefined,
  }

  return (
    <>
      <header>
        <EventHeader event={event} />
      </header>
      <main className="text-center py-3" style={{ minHeight: "100vh" }}>
        {children}
      </main>
      <footer>
        <EventFooter event={event} />
      </footer>
    </>
  )
}

export default EventLayout
