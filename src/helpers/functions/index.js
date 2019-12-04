import * as myFunctions from './main'
import { get } from 'lodash'
import { store } from '../../index'

export const apply = (settings, data = {}, state = store.getState(), props = {}) => {
  // get data from state according to 'settings.path' if any. else, get {}
  const dataFromState = get(state, settings.path, data)
  // get function from myFunctions according to 'settings.key' if any. else, get d=>d
  let chosenFunction = get(myFunctions, settings.key, d => d)
  // run the function and get the results
  let chosenFunctionResult = chosenFunction(settings, dataFromState, state, { ...props, apply: apply })
  // recursively run apply on 'settings.then' if any, as the new settings
  if (settings.then)
    return apply(settings.then, chosenFunctionResult, state, props)
  return chosenFunctionResult
}
