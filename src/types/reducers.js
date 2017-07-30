import type { Action } from './actions'

export type Reducer<T> = (T, Action) => T;
