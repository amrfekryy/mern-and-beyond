import * as myFunctions from './main'
import { get } from 'lodash'
import { store } from '../../index'

export const apply = (plan, data = {}, state = store.getState(), props = {}) => {
  // get data from state according to 'plan.path' if any. else, get {}
  const dataFromState = get(state, plan.path, data)
  // get function from myFunctions according to 'plan.key' if any. else, get d=>d
  let chosenFunction = get(myFunctions, plan.key, d => d)
  // run the function and get the results
  let chosenFunctionResult = chosenFunction(plan, dataFromState, state, { ...props, apply: apply })
  // recursively run apply on 'plan.then' if any, as the new plan
  if (plan.then)
    return apply(plan.then, chosenFunctionResult, state, props)
  return chosenFunctionResult
}
