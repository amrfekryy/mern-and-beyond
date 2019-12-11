import React, { Component } from 'react'
import { connect } from 'react-redux'
import { map } from 'lodash'
import { apply } from '../helpers/functions/index'

class DataList extends Component {
  render () {
    // const { children } = this.props
    return (
      <ul>
        {map(this.props.children, item => (
          <>
            <li key={item.id}>{item.title}</li>
            {item.children && <DataList children={item.children} />}
          </>
        ))}
      </ul>
    )
  }
}

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

const mapStateToProps = (state) => {
  return {
    users: state.usersReducer.data,
    tasks: state.tasksReducer.data,
    subTasks: state.subTasksReducer.data
  }
}

export default connect(mapStateToProps)(DataList)
