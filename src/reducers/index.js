import { combineReducers } from 'redux'
// import { uuidv4 } from '../helpers'
import { map, upperFirst, cloneDeep, get } from 'lodash'

// create a list with reducers names
const reducerNames = ['users', 'tasks', 'subTasks']

const setData = (state, action) => {
  /* common logic between actions that sets data for 'users', 'tasks', 'subTasks' */

  // copy current state
  const newState = cloneDeep(state)
  // add a new property (uuid: { ...data, id: uuid})
  newState.data[action.payload.id] = { ...action.payload }
  return newState
}

const buildReducers = () => {
  const reducers = {}
  map(reducerNames, (reducerName) => {
    const handlers = {
      [`set${upperFirst(reducerName)}`]: setData
    }
    reducers[`${reducerName}Reducer`] = (state = { data: {} }, action) => (
      get(handlers, action.type, state => state)(state, action)
    )
  })
  return reducers
}

const myReducers = buildReducers()
// console.log('All reducers: ', myReducers)

const allReducers = combineReducers(myReducers)

export default allReducers

/* -----------------------------(Old Dynamic Code)------------------------------- */

// // create object of general handlers
// const generalHandlers = {
//   set__REDUCER__
// }
// console.log('General handlers: ', generalHandlers)

// const handlersCreator = () => {
//   // returns an object populated with copies of general handlers for each reducer
//   // with '__REDUCER__' replaced with reducer name
//   const handlers = {}
//   map(reducerNames, (reducerName) => {
//     handlers[reducerName] = {}
//     map(generalHandlers, (value, key) => { 
//       const newKey = key.replace('__REDUCER__', upperFirst(reducerName))
//       handlers[reducerName][newKey] = value
//     })
//   })
//   return handlers
// }

// // get cusomized handlers
// const allHandlers = handlersCreator()
// console.log('All handlers: ', allHandlers)

// const buildReducers = () => {
//   const reducers = {}
//   map(reducerNames, (reducerName) => {
//     reducers[`${reducerName}Reducer`] = (state = { data: {} }, action) => {
//       return allHandlers[reducerName][action.type] ? allHandlers[reducerName][action.type](state, action) : state
//     }
//   })
//   return reducers
// }

// const myReducers = buildReducers()
// console.log('All reducers: ', myReducers)

// const allReducers = combineReducers(myReducers)

// export default allReducers

/* -----------------------------(Static Code)------------------------------- */

// // create users object
// const usersData = createUsers()

// const usersReducer = (state = { data: usersData }, action) => {
//   return state
// }

// const tasksReducer = (state = { data: {} }, action) => {
//   // spread state
//   const newState = {
//     ...state
//   }
//   // get uuid
//   const newUUID = uuidv4()

//   switch (action.type) {
//     case 'ADD_TASK':
//       newState.data[newUUID] = { ...action.payload, id: newUUID }
//       return newState
//     default:
//       return state
//   }
// }

// const subTasksReducer = (state = {}, action) => {
//   return state
// }

// const allReducers = combineReducers({
//   usersReducer,
//   tasksReducer,
//   subTasksReducer
// })

// export default allReducers
