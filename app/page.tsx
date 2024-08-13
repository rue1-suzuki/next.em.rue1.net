import LinkList from "@/components/LinkList"
import { fetchEventAll } from "@/hooks/fetchDataAll"
import Link from "next/link"

const HomePage = async () => {
  try {
    const events = await fetchEventAll()

    const linkItems = events.map((event) => {
      return {
        href: `/events/${event.uuid}`,
        children: <> {event.name} </>,
      }
    })

    return (
      <>
        <header>
          <div className="bg-black py-2 text-center">
            <h1 className="text-lg font-bold text-white truncate">
              <Link href="/">
                EM -EventManager-
              </Link>
            </h1>
          </div>
        </header>
        <main className="text-center py-3" style={{ minHeight: "100vh" }}>
          <LinkList items={linkItems} />
        </main>
        <footer>
          <div className="bg-gray-500 py-2 text-center">
            <p className="text-sm font-bold text-white">
              開発: <Link className="underline" href="https://twitter.com/Rue1DM"> ルゥ/Rue1DM </Link>
            </p>
          </div>
        </footer>
      </>
    )
  } catch (error) {
    console.error(error)
    return (
      <main>
        <p>Failed to load data</p>
      </main>
    )
  }
}

export default HomePage
