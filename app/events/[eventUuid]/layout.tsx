import { fetchEventDetail } from "@/hooks/fetchDataDetail"
import { Metadata } from "next"
import Link from "next/link"
import { ReactNode } from "react"
import EventContentLinkList from "./EventContentLinkList"
import EventSubContentLinkList from "./EventSubContentLinkList"

interface EventLayoutProps {
  params: {
    eventUuid: string
  }
  children: ReactNode
}

export const generateMetadata = async (props: EventLayoutProps) => {
  const { params } = props

  const event = await fetchEventDetail(params.eventUuid)

  return {
    title: {
      default: `EM | ${event.name}`,
      template: `EM | ${event.name} | %s`,
    },
    twitter: {
      title: {
        default: `EM | ${event.name}`,
        template: `EM | ${event.name} | %s`,
      },
    },
    openGraph: {
      title: {
        default: `EM | ${event.name}`,
        template: `EM | ${event.name} | %s`,
      },
    },
    robots: {
      index: false,
      follow: false,
    },
  } satisfies Metadata
}

const EventLayout = async (props: EventLayoutProps) => {
  const { params, children, } = props

  const event = await fetchEventDetail(params.eventUuid)

  return (
    <>
      <header className="bg-blue-500 py-2 text-center">
        <h1 className="text-lg font-bold text-white truncate">
          <Link href={`/events/${event.uuid}`}>
            {event.name}
          </Link>
        </h1>
      </header>
      <main className="py-2 text-center px-2">
        <div style={{ minHeight: "100vh" }}>
          <div className="mb-3">
            <EventContentLinkList event={event} />
          </div>
          <div className="mb-3">
            {children}
          </div>
        </div>
        <div className="mb-3">
          <EventSubContentLinkList event={event} />
        </div>
      </main>
      <footer className="bg-blue-900 py-2 text-center">
        <p className="text-sm font-bold text-white">
          EM -EventManager-
        </p>
      </footer>
    </>
  )
}

export default EventLayout
