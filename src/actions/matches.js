export function loadMatches(matches) {
  return {
    type: 'LOAD_MATCHES',
    matches
  }
}

export function loadTournaments(tournaments) {
  return {
    type: 'LOAD_TOURNAMENTS',
    tournaments
  }
}
