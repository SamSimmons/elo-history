import { flatten, uniq, map, forEach, reduce } from 'lodash'

export function getTeamNames(matches) {
  const teams = map(flatten(matches), 'team')
  return uniq(teams).sort()
}

export function calculateELO(matches, teams) {
  const initialRatings = initializeTeams(matches, teams)
  let initialElo = {}
  forEach(initialRatings, (team) => {
    initialElo[team.name] = team.rating
  })
  const elo = reduce(matches, (elo, match) => {
    return handleMatch(match, elo)
  }, initialElo)
  return elo
}

export function initializeTeams(matches, teams) {
  return map(teams, (team) => {
    return {
      name: team,
      rating: 1500
    }
  })
}

export function handleMatch (match, elo) {
  let nextElo = {...elo}
  match.forEach((innings) => {
    nextElo[innings.team] = calcRating(elo[innings.team], elo[innings.opposition], innings.result)
  })
  return nextElo
}

function mapResult(resultStr) {
  switch (resultStr) {
    case "won": { return 1 }
    case "lost": { return 0 }
    case "draw": { return .5 }
    default: { return -1 }
  }
}

function calcRating(teamRating, opponentRating, resultStr) {
  const result = mapResult(resultStr)
  if (result === -1) { return teamRating }
  const chanceToWin = 1 / (1 + Math.pow(10, (opponentRating - teamRating) / 400))
  const ratingDelta = Math.round(32 * (result - chanceToWin))
  return teamRating + ratingDelta
}
