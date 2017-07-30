import { Match } from './matches'

type TeamAction =
  | { type: 'LOAD_MATCHES', matches: Match[] }

export type Action =
  | TeamAction
