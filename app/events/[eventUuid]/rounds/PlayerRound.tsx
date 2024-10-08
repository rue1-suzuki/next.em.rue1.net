interface PlayerRoundProps {
  event: EMEvent
  round: EMRound
  players: EMPlayer[]
  winners: EMWinner[]
  player: EMPlayer
}

const PlayerRound = (props: PlayerRoundProps) => {
  const { event, round, players, winners, player, } = props

  const playerMatch = round.json.find((match) => match.player === player.uuid)
  if (playerMatch === undefined) {
    return (
      <>
        <div className="mb-1">
          <p className="text-sm"> 対戦 </p>
          <p className="text-2xl font-bold"> 第{round.number}回戦 </p>
        </div>
        <div className="mb-1">
          <p className="text-sm font-bold"> 対戦卓 </p>
          <p className="text-2xl font-bold"> - </p>
        </div>
        <div className="mb-1">
          <p className="text-sm font-bold"> 対戦相手 </p>
          <p className="text-2xl font-bold"> 対戦なし </p>
        </div>
      </>
    )
  }

  const currentPlayerWinner = winners.find((winner) => {
    if (winner.round === round.uuid)
      if (winner.player === player.uuid)
        return true
    return false
  })

  if (playerMatch.table === null) {
    return (
      <>
        <div className="mb-1">
          <p className="text-sm"> 対戦 </p>
          <p className="text-2xl font-bold"> 第{round.number}回戦 </p>
        </div>
        <div className="mb-1">
          <p className="text-sm font-bold"> 対戦卓 </p>
          <p className="text-2xl font-bold"> - </p>
        </div>
        <div className="mb-1">
          <p className="text-sm font-bold"> 対戦相手 </p>
          <p className="text-2xl font-bold"> 不戦勝 </p>
        </div>
        {currentPlayerWinner &&
          <div className="mb-1">
            <p className="text-sm font-bold"> 対戦結果 </p>
            <p className="text-2xl font-bold">
              {currentPlayerWinner.is_win ? <> あなたの勝ち </> : <> あなたの負け </>}
            </p>
          </div>
        }
      </>
    )
  }

  const opponentPlayers = round.json.filter((match) => {
    // 同卓かつ自身ではない
    if (match.table === playerMatch.table)
      if (match.player !== player.uuid)
        return true
    return false
  }).map((opponentMatch) => players.filter((player) => player.uuid === opponentMatch.player)).flat()

  return (
    <div className={currentPlayerWinner ? currentPlayerWinner.is_win ? "text-blue-500" : "text-red-500" : undefined}>
      <div className="mb-1">
        <p className="text-sm"> 回戦 </p>
        <p className="text-2xl font-bold"> 第{round.number}回戦 </p>
      </div>
      <div className="mb-1">
        <p className="text-sm"> 対戦卓 </p>
        <p className="text-2xl font-bold"> 第{playerMatch.table}卓 </p>
      </div>
      <div className="mb-1">
        <p className="text-sm"> 対戦相手 </p>
        {opponentPlayers.map((opponentPlayer) => {
          return (
            <p className="text-2xl font-bold" key={opponentPlayer.uuid}>
              {opponentPlayer.name}
            </p>
          )
        })}
      </div>
      <div className="mb-1">
        <p className="text-sm"> 対戦結果 </p>
        {currentPlayerWinner === undefined &&
          <p className="text-2xl font-bold">
            <a className="text-blue-500 underline" href={`/events/${event.uuid}/winners`}>
              勝利報告
            </a>
          </p>
        }
        {currentPlayerWinner &&
          <p className="text-2xl font-bold">
            {currentPlayerWinner.is_win ? <> あなたの勝ち </> : <> あなたの負け </>}
          </p>
        }
      </div>
    </div>
  )
}

export default PlayerRound
