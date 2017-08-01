//@flow
import type { State } from '../types/reducers'
import type { Action } from '../types/actions'
import { getTeamNames, filterTeams } from '../utils/matches'

export default function (state: State = {selectedTeam: ""}, action: Action) {
  switch (action.type) {
    case 'CHANGE_SELECTED_TEAM': {
      return {
        ...state,
        selectedTeam: action.nextTeam
      }
    }
    case 'LOAD_MATCHES': {
      const teams = getTeamNames(filterTeams(action.matches))
      return {
        ...state,
        selectedTeam: teams[0]
      }
    }
    default: {
      return state
    }
  }
}
