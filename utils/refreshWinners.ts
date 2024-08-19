import { fetchWinnerAll } from "@/hooks/fetchDataAll"

export const refreshWinners = async (eventUuid: string) => {
  await fetchWinnerAll({ event: eventUuid }, 0)
}
