import { AvailableQuery } from "./settings"

const fetcher = (
  path: string,
  query: AvailableQuery,
  revalidate: number,
) => {
  if (process.env.NEXT_API_ORIGIN === undefined) {
    throw new Error('NEXT_API_ORIGIN is not defined')
  }

  const url = new URL(path, process.env.NEXT_API_ORIGIN)
  query.event && url.searchParams.append("event", query.event)

  const nowStr = new Date().toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })

  return fetch(url, {
    next: {
      tags: [nowStr],
    }
  })
}

export default fetcher
