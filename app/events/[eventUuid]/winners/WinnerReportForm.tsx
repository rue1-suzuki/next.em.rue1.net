import clientAction from "./WinnerReportFormClientAction"

interface WinnerReportFormProps {
  eventUuid: string
  roundUuid: string
  playerUuid: string
}

const WinnerReportForm = async (props: WinnerReportFormProps) => {
  const { eventUuid, roundUuid, playerUuid, } = props

  return (
    <form className="flex flex-col gap-1" action={clientAction}>
      <input className="flex-auto text-center" name="eventUuid" value={eventUuid} readOnly hidden />
      <input className="flex-auto text-center" name="roundUuid" value={roundUuid} readOnly hidden />
      <input className="flex-auto text-center" name="playerUuid" value={playerUuid} readOnly hidden />
      <div className="flex-auto">
        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded" type="submit">
          勝利報告
        </button>
      </div>
    </form>
  )
}

export default WinnerReportForm
