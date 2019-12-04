import { map, upperFirst } from 'lodash'

// const apps = ['users', 'tasks', 'subTasks']

// const setData = (app, data) => {
//   return {
//     type: `set${upperFirst(app)}`,
//     payload: data
//   }
// }

export const ultimateMapDispatchToProps = (dispatch) => (
  {
    setData: (app, data) => (dispatch({
      type: `set${upperFirst(app)}`,
      payload: data
    }))
  }
  // const dispatchers = {}
  // // iterate over apps
  // map(apps, (app) => {
  //   dispatchers[`dispatch_set${upperFirst(app)}`] = (data) => { dispatch(setData(app, data)) }
  // })
  // return dispatchers
)
