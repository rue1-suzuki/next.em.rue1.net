interface EMEvent extends EMBase {
  name: string
  is_active: boolean
  organizer: {
    uuid: string
    username: string
    link: string | null
  }
}
