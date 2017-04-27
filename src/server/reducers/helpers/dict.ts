import { Reducer } from '../../../core'

interface State {
  [key: string]: any
}

/**
 * Factory to create a dict reducer that stores sub-states by key,
 * and updates those sub-states using the provided reducer
 */
export default function dictReducer (
  reducer: Reducer,
  passActions: Array<string>,
  removeAction: string
): Reducer {
  return (state: State, action: any = {}): State => {
    switch (action.type) {
      case undefined:
        return {}

      case removeAction:
        const key = action.key
        return {...state, [key]: null}

      default:
        if (passActions.indexOf(action.type) >= 0) {
          const key = action.key
          const value = state[key]
          return {
            ...state,
            [key]: reducer(value, action)
          }
        }
        return state
    }
  }
}