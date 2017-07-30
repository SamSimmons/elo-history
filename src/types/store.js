// @flow
import type {
  Store as ReduxStore,
  Dispatch as ReduxDispatch,
  GetState as ReduxGetState,
} from 'redux '
import type { Action as ActionsRef } from './actions'
import type { State as StateRef } from './reducers'

// Re-export these here so they are easily available from wherever and avoids
// circular dependencies.
export type Action = ActionsRef
export type State = StateRef

export type GetState = ReduxGetState<State>
export type Store = ReduxStore<State, Action>
export type Dispatch = ReduxDispatch<State, Action>
