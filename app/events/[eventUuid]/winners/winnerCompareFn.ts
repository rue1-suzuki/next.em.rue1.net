const winnerCompareFn = (a: EMWinner, b: EMWinner) => {
  if (a.is_win === true && b.is_win === false) return -1
  if (a.is_win === false && b.is_win === true) return 1

  return 0
}

export default winnerCompareFn
