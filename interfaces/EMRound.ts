interface EMRound extends EMBase {
  number: number
  json: {
    table: number | null
    player: string
    current_win: number
  }[]
}
