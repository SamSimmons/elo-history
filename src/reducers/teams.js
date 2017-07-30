//@flow

import type { State } from '../types/reducers'
import type { Action } from '../types/actions'
import { getTeamNames, calculateELO } from '../utils/matches'

export default function (state: State = {list: []}, action: Action) {
  switch (action.type) {
    case 'LOAD_MATCHES': {
      const teams = getTeamNames(action.matches)
      const elo = calculateELO(action.matches, teams)
      console.log("elo", elo)
      return {
        ...state,
        list: teams
      }
    }
    default: {
      return state
    }
  }
}
