import winnerReportFormServerAction from "./winnerReportFormServerAction"
import WinnerReportFormSubmitButton from "./WinnerReportFormSubmitButton"

interface WinnerReportFormProps {
  round: EMRound
  player: EMPlayer
}

const WinnerReportForm = (props: WinnerReportFormProps) => {
  const { round, player, } = props

  const playerMatchs = round.json.filter((match) => {
    return match.player === player.uuid
  })

  const opponentMatchs = playerMatchs.map((playerMatch) => {
    return round.json.filter((match) => {
      if (match.table === playerMatch.table)
        if (match.player !== player.uuid)
          return true
      return false
    })
  }).flat()

  return (
    <form className="flex flex-col gap-1" action={winnerReportFormServerAction}>
      <input
        className="flex-auto border rounded px-4 py-2 text-center"
        type="text"
        name="roundUuid"
        value={round.uuid}
        readOnly
        hidden
      />
      <input
        className="flex-auto border rounded px-4 py-2 text-center"
        type="text"
        name="playerUuid"
        value={player.uuid}
        readOnly
        hidden
      />
      <div className="flex-auto">
        <p className="text-blue-500 text-sm">
          回戦
        </p>
        <p className="text-blue-500 text-lg font-bold">
          第{round.number}回戦
        </p>
      </div>
      <div className="flex-auto">
        <p className="text-blue-500 text-sm">
          WIN
        </p>
        <p className="text-blue-500 text-lg font-bold">
          {player.name}
        </p>
      </div>
      <div className="flex-auto">
        <WinnerReportFormSubmitButton />
      </div>
      <div className="flex-auto">
        <p className="text-red-500 text-sm">
          勝利プレイヤーのみ登録してください
        </p>
      </div>
    </form>
  )
}

export default WinnerReportForm
