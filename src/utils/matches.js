import { flatten, uniq, map, forEach, includes, filter, has } from 'lodash'

export function getTeamNames(matches) {
  const teams = map(flatten(matches), 'team')
  return uniq(teams).sort()
}

export function getElo (matches) {
  const ratings = {}
  return map(matches, (match) => {
    forEach(match, (inn) => {
      const { team, opposition, result } = inn
      if (!has(ratings, team)) {
        ratings[team] = 1500
      }
      if (!has(ratings, opposition)) {
        ratings[opposition] = 1500
      }
      ratings[team] = calcRating(ratings[team], ratings[opposition], result)
    })
    return {
      date: new Date(match[0].date),
      innings: match,
      elo: {...ratings}
    }
  })
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
