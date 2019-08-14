export const calculateScore = (players, nagari) => {
  var nagari = false;

  const winnerIndex = players.findIndex(p => p.winner);
  if (winnerIndex < 0) {
    return players;
  }

  const winner = players[winnerIndex];
  const ws = winner.score.trim() !== '' ? parseInt(winner.score) : 0;

  const dokbak = players.some(p => p.gobak);

  const go = parseInt(winner.go);
  let addScore = go;
  let multiply = go >= 3 ? Math.pow(2, go - 2) : 1;

  if (winner.shake) {
    multiply *= 2;
  }

  if (nagari) {
    multiply *= 2;
  }

  const winnerScore = (ws + addScore) * multiply;

  const _players = players.map((p, i) => {
    if (i === winnerIndex) {
      p.calculatedScore = winnerScore;
    } else {
      let m = 1;
      if (p.pbak) {
        m *= 2;
      }
      if (p.gbak) {
        m *= 2;
      }
      if (p.gobak) {
        m *= 2;
      }
      p.calculatedScore = -(winnerScore * m);
    }
    return p;
  });

  if (dokbak) {
    const p = _players.find(p => p.gobak);
    const op = _players.find(p => !p.gobak && !p.winner);

    p.calculatedScore += op.calculatedScore;
    op.calculatedScore = 0;
  }

  return _players;
}