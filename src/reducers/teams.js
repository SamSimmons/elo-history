//@flow

import type { State } from '../types/reducers'
import type { Action } from '../types/actions'
import { getTeamNames, calculateELO, filterTeams, binMatchesByDate } from '../utils/matches'
import { map } from 'lodash'

export default function (state: State = {list: [], elo: {}}, action: Action) {
  switch (action.type) {
    case 'LOAD_MATCHES': {
      const validMatches = filterTeams(action.matches)
      const chunks = binMatchesByDate(validMatches)
      const teams = getTeamNames(validMatches)
      const chartData = map(chunks, ({matches, date}) => {
        return {
          date,
          ratings: calculateELO(matches, teams)
        }
      })
      return {
        ...state,
        list: teams,
        chartData
      }
    }
    default: {
      return state
    }
  }
}
