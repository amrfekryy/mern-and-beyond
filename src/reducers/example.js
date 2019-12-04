import { map, set, upperFirst, omit, pick, get, cloneDeep } from 'lodash'

// create a list with the reducers names
const reducersList = ['user', 'wizard', 'selectors', 'mainApp']

// separate common actions logic into functions (setData__REDUCER__ in our case)
const set__REDUCER__ = (state, payload) => {
  if (!payload.path) {
    return { ...payload.data }
  }
  let newState = cloneDeep(state)
  set(newState, payload.path, payload.data)
  return newState
}
// const remove__REDUCER__ = (state, payload) => {
//   return omit(state, payload.path);
// }
// const reset__REDUCER__ = (state, payload) => {
//   return pick(state, payload.path);
// }

// create object of handlers (or: export * as handlers from 'a different file')
const handlers = {
  set__REDUCER__
  // remove__REDUCER__,
  // reset__REDUCER__
}

// create buildReducer function
const createReducer = reducerName => {
  const functions = {}
  // copy 'handlers' into 'functions' with replacing '___REDUCER__' with reducerName
  map(handlers, (v, k) => { functions[k.replace('__REDUCER__', upperFirst(reducerName))] = v })
  // return reducer function
  return (
    (state = {}, action) => {
      return functions[action.type] ? functions[action.type](state, action) : state
    }
  )
}

const reducers = {}
reducersList.map(reducerName =>
  set(reducers, reducerName, createReducer(reducerName))
)

export default reducers
