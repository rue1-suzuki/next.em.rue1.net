const fetcher = (path: string, query: Record<string, any>,) => {
  if (process.env.NEXT_API_ORIGIN === undefined) {
    throw new Error('NEXT_API_ORIGIN is not defined')
  }

  const url = new URL(path, process.env.NEXT_API_ORIGIN)
  Object.keys(query).forEach((key) => {
    url.searchParams.append(key, query[key])
  })

  return fetch(url, {
    next: {
      revalidate: 60,
    }
  })
}

export default fetcher
