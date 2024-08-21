import checkinFormServerAction from "./checkinFormServerAction"
import CheckinFormSubmitButton from "./CheckinFormSubmitButton"

interface PlayerCookieSetFormProps {
  eventUuid: string
  players: EMPlayer[]
}

const CheckinForm = (props: PlayerCookieSetFormProps) => {
  const { eventUuid, players, } = props

  // 外部IDがあるプレイヤー -> 外部IDを入力してチェックイン
  const externalIdPlayers = players.filter((player) => {
    return typeof player.external_id === "number"
  })

  // 外部IDがnullのプレイヤー -> プレイヤーを選択してチェックイン
  const nullExternalIdPlayers = players.filter((player) => {
    return player.external_id === null
  })

  return (
    <>
      <form className="flex flex-col gap-1" action={checkinFormServerAction}>
        <input
          className="flex-auto border rounded px-4 py-2 text-center"
          name="eventUuid"
          value={eventUuid}
          readOnly
          hidden
        />
        {externalIdPlayers.length > 0 && nullExternalIdPlayers.length === 0 &&
          <input
            className="flex-auto border rounded px-4 py-2 text-center"
            type="text"
            name="playerExternalId"
            placeholder="外部IDを入力"
            required
          />
        }
        {nullExternalIdPlayers.length > 0 && externalIdPlayers.length === 0 &&
          <select className="flex-auto border rounded px-4 py-2 text-center" name="playerUuid" required>
            <option value=""> プレイヤーを選択 </option>
            {nullExternalIdPlayers.map((player) => {
              return (
                <option value={player.uuid} key={player.uuid}>
                  [{player.number}] {player.name}
                </option>
              )
            })}
          </select>
        }
        <div className="flex-auto">
          <CheckinFormSubmitButton />
        </div>
      </form>
    </>
  )
}

export default CheckinForm
