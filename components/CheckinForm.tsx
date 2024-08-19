import checkinFormClientAction from "./checkinFormClientAction"

interface PlayerCookieSetFormProps {
  eventUuid: string
  players: EMPlayer[]
}

const CheckinForm = (props: PlayerCookieSetFormProps) => {
  const { eventUuid, players, } = props

  const idPlayers = players.filter((player) => typeof player.external_id === "number")
  const notIdPlayers = players.filter((player) => player.external_id === null)

  return (
    <>
      {notIdPlayers.length > 0 &&
        <form className="flex flex-col gap-1" action={checkinFormClientAction}>
          <input
            className="flex-auto border rounded px-4 py-2 text-center"
            name="eventUuid"
            value={eventUuid}
            readOnly
            hidden
          />
          <select className="flex-auto border rounded px-4 py-2 text-center" name="playerUuid" required>
            <option value=""> プレイヤーを選択 </option>
            {notIdPlayers.filter((player) => player.external_id === null).map((player) => {
              return (
                <option value={player.uuid} key={player.uuid}>
                  [{player.number}] {player.name}
                </option>
              )
            })}
          </select>
          <div className="flex-auto">
            <button className="bg-blue-500 rounded px-4 py-2 text-lg font-bold text-white" type="submit">
              チェックイン
            </button>
          </div>
        </form>
      }
      {idPlayers.length > 0 &&
        <form className="flex flex-col gap-1" action={checkinFormClientAction}>
          <input
            className="flex-auto border rounded px-4 py-2 text-center"
            name="eventUuid"
            value={eventUuid}
            readOnly
            hidden
          />
          <input
            className="flex-auto border rounded px-4 py-2 text-center"
            type="text"
            name="playerExternalId"
            placeholder="外部IDを入力"
            required
          />
          <div className="flex-auto">
            <button className="bg-blue-500 rounded px-4 py-2 text-lg font-bold text-white" type="submit">
              チェックイン
            </button>
          </div>
        </form>
      }
    </>
  )
}

export default CheckinForm
