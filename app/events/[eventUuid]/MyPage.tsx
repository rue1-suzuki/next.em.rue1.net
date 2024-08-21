import { fetchPlayerAll, fetchResultAll, fetchRoundAll, fetchWinnerAll } from "@/fetchs/fetchDataAll"
import getCookiePlayerOrUndefined from "@/utils/getCookiePlayer"

interface MyPageProps {
  event: EMEvent
}

const MyPage = async (props: MyPageProps) => {
  const { event } = props

  // event.is_active===null
  if (event.is_active === null) {
    return (
      <div className="mb-3">
        <p> 準備中です </p>
      </div>
    )
  }

  if (event.is_active === true) {
    const [players] = await Promise.all([
      fetchPlayerAll({ event: event.uuid }),
    ])

    // event.is_active===true チェックイン前
    const player = getCookiePlayerOrUndefined(players)
    if (player === undefined) {
      return (
        <div className="mb-3">
        </div>
      )
    }

    // event.is_active===true デッキ登録前
    if (player.deck) {
      return (
        <div className="mb-3">
          <p> デッキ登録受付中 </p>
        </div>
      )
    }

    // event.is_active===true デッキ登録後
    return (
      <div className="mb-3">
        <p> デッキ登録済み </p>
        <p> イベント開始までしばらくお待ちください </p>
      </div>
    )
  }

  if (event.is_active === false) {
    const [players, rounds, winners, results,] = await Promise.all([
      fetchPlayerAll({ event: event.uuid }),
      fetchRoundAll({ event: event.uuid }),
      fetchWinnerAll({ event: event.uuid }),
      fetchResultAll({ event: event.uuid }),
    ])

    // event.is_active===false チェックイン前
    const player = getCookiePlayerOrUndefined(players)
    if (player === undefined) {
      return (
        <div className="mb-3">
        </div>
      )
    }

    // event.is_active===false 成績表公開後
    if (results.length > 0) {
      return (
        <div className="mb-3">
        </div>
      )
    }

    const latestRound = rounds.length > 0 ? rounds[rounds.length - 1] : undefined

    // event.is_active===false 成績表公開前 対戦表公開前
    if (latestRound === undefined) {
      return (
        <div className="mb-3">
          <p> まもなくイベントが開始します。 </p>
        </div>
      )
    }

    const currentWinner = winners.find((winner) => {
      if (winner.round === latestRound.uuid)
        if (winner.player === player.uuid)
          return true
      return false
    })

    // event.is_active===false 成績表公開前 対戦表公開後 勝利報告前
    if (currentWinner === undefined) {
      return (
        <div className="mb-3">
          <p> 勝利報告受付中 </p>
        </div>
      )
    }

    // event.is_active===false 成績表公開前 対戦表公開後 勝利報告後
    return (
      <div className="mb-3">
        <p> 勝利報告済み </p>
        <p> 次回戦までしばらくお待ちください </p>
      </div>
    )
  }
}

export default MyPage
