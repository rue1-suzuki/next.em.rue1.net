interface EMResult extends EMBase {
  json: {
    rank: number | null
    player: string
    win: number
    lose: number
    details: number[]
  }[]
}
