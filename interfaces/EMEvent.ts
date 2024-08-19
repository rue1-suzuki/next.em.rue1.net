interface EMEvent extends EMBase {
  name: string
  is_active: boolean
  held_date: string
  link: string | null
  plan: {
    uuid: string
    name: string
    price: number
    max_players: number
  }
  organizer: {
    uuid: string
    username: string
    link: string | null
  }
  player_set: EMPlayer[]
}
