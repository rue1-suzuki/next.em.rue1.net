export interface AvailableQuery {
  event?: string
}

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

  return fetch(url, {
    next: {
      revalidate: revalidate,
    }
  })
}

export default fetcher
