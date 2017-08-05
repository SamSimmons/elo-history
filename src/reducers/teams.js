//@flow

import type { State } from '../types/reducers'
import type { Action } from '../types/actions'
import { getTeamNames, getElo, filterTeams,  } from '../utils/matches'

export default function (state: State = {list: [], elo: {}, tournaments: []}, action: Action) {
  switch (action.type) {
    case 'LOAD_MATCHES': {
      const validMatches = filterTeams(action.matches)
      const ratings = getElo(validMatches)
      const teams = getTeamNames(validMatches)
      return {
        ...state,
        list: teams,
        ratings
      }
    }
    case 'LOAD_TOURNAMENTS': {
      const { tournaments } = action
      return {
        ...state,
        tournaments
      }
    }
    default: {
      return state
    }
  }
}
