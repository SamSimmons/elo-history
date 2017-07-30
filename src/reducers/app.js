//@flow

import type { State } from '../types/reducers'
import type { Action } from '../types/actions'

export default function (state: State = {selectedTeam: ""}, action: Action) {
  switch (action.type) {
    case 'CHANGE_SELECTED_TEAM': {
      return {
        ...state,
        selectedTeam: action.nextTeam
      }
    }
    default: {
      return state
    }
  }
}
