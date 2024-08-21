interface RoundTableProps {
  round: EMRound
  players: EMPlayer[]
  winners: EMWinner[]
}

const RoundTable = (props: RoundTableProps) => {
  const { round, players, winners, } = props

  return (
    <table className="w-full text-center">
      <thead className="bg-gray-100">
        <tr className="border-y">
          <th className="w-1/4 px-4 py-2"> 卓 </th>
          <th className="w-2/4 px-4 py-2"> 参加者 </th>
          <th className="w-1/4 px-4 py-2"> 結果 </th>
        </tr>
      </thead>
      <tbody className="bg-white">
        {round.json.map((match) => {
          const player = players.find((player) => player.uuid === match.player)
          const winner = winners.find((winner) => winner.round === round.uuid && winner.player === match.player)
          return (
            <tr className={`border-y ${winner ? winner.is_win ? "text-blue-500" : "text-red-500" : "text-gray-500"}`} key={match.player}>
              <td className="px-4 py-2"> {match.table ? <> 第{match.table}卓 </> : <> 不戦勝 </>} </td>
              <td className="px-4 py-2">
                <p> {player ? player.name : <>  </>} </p>
                <p className="text-xs"> {match.current_win}勝 </p>
              </td>
              <td className="px-4 py-2"> {winner ? winner.is_win ? <> WIN </> : <> LOSE </> : <> 対戦中 </>} </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default RoundTable
