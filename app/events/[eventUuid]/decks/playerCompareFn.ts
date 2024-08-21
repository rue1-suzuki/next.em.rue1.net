const playerCompareFn = (a: EMPlayer, b: EMPlayer) => {
  // デッキ登録状況 降順 (未登録が上)
  if (a.deck && b.deck === null) return -1
  if (a.deck === null && b.deck) return 1

  // プレイヤー番号 昇順
  if (a.number < b.number) return -1
  if (a.number > b.number) return 1

  return 0
}

export default playerCompareFn
