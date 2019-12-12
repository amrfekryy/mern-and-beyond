import React, { Component } from 'react'
import { connect } from 'react-redux'
import { get, map, filter, cloneDeep } from 'lodash'

class DataList extends Component {
  render () {
    const { state, plan, parentID } = this.props
    let children = get(state, plan.path, {})
    if (parentID) {
      children = filter(children, { [plan.filterKey]: parentID })
    }
    // console.log('Plan: ', plan)
    // console.log('State: ', state)
    // console.log('parentID: ', parentID)
    // console.log('Children: ', children)
    return (
      <ul>
        {map(children, child => (
          <>
            <li key={child.id}>{child.title}</li>
            {plan.then &&
              <DataList state={state} plan={plan.then} parentID={child.id} />}
          </>
        ))}
      </ul>
    )
  }
}

const mapStateToProps = state => ({
  state: cloneDeep(state)
})

export default connect(mapStateToProps)(DataList)

// class MapPresentation extends Component {
//   render () {
//     return (
//       <>
//         <ul>
//           { 
//             map(this.props.users, (userData) => {
//               return (
//                 <>

//                   <li key={userData.id}> {userData.title}</li>
//                   <ul>
//                     {
//                       map(this.props.tasks, (taskData) => {
//                         if (taskData.userID === userData.id) {
//                           const subTasksCountPlan = {
//                             key: 'filtering',
//                             path: 'subTasksReducer.data',
//                             params: { taskID: taskData.id },
//                             then: { key: 'counting' }
//                           }
//                           return (
//                             <>

//                               <li key={taskData.id}> {taskData.title} <strong>{apply(subTasksCountPlan)}</strong></li>
//                               <ul>
//                                 {
//                                   map(this.props.subTasks, (subTaskData) => {
//                                     if (subTaskData.taskID === taskData.id) {
//                                       return <li key={subTaskData.id}>{subTaskData.title}</li>
//                                     }
//                                   })
//                                 }
//                               </ul>

//                             </>
//                           )
//                         }
//                       })
//                     }
//                   </ul>

//                 </>
//               )
//             })
//           }
//         </ul>
//       </>
//     )
//   }
// }
