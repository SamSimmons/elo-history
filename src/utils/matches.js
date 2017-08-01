import { flatten, uniq, map, forEach, reduce, includes, filter, orderBy } from 'lodash'
import { timeMonth } from 'd3'

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

export function filterTeams(matches) {
  const whiteList = [
    "Australia",
    "Bangladesh",
    "England",
    "India",
    "New Zealand",
    "Pakistan",
    "South Africa",
    "Sri Lanka",
    "West Indies",
    "Zimbabwe"
  ]
  return filter(matches, (match) => {
    const [ first, second ] = map(match, (inn) => inn.team)
    return (includes(whiteList, first) && includes(whiteList, second))
  })
}

export function binMatchesByDate(matches) {
  const inOrder = orderBy(matches, (m) => new Date(m[0].date))
  const months = timeMonth.range(new Date(inOrder[0][0].date), new Date(inOrder[inOrder.length - 1][0].date))
  const bins = map(months, (month) => {
    return {
      matches: filter(inOrder, (match) => (new Date(match[0].date) < month)),
      date: month
    }
  })
  return bins
}
