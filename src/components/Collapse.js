import React, { Component } from 'react'
import { connect } from 'react-redux'
import { map } from 'lodash'
import { apply } from '../helpers/functions/index'
import { funcSettings } from '../helpers/functions/funcSettings'

class Collapse extends Component {
  render () {
    return (
      <>
        <ul>
          { 
            map(this.props.users, (userData) => {
              return (
                <>
                  
                  <li key={userData.id}> {userData.title}</li>
                  <ul>
                    {
                      map(this.props.tasks, (taskData) => {
                        if (taskData.userID === userData.id) {
                          return (
                            <>
                              
                              <li key={taskData.id}> {taskData.title} <strong>{apply(funcSettings(taskData.id))}</strong></li>
                              <ul>
                                {
                                  map(this.props.subTasks, (subTaskData) => {
                                    if (subTaskData.taskID === taskData.id) {
                                      return <li key={subTaskData.id}>{subTaskData.subtask}</li>
                                    }
                                  })
                                }
                              </ul>
                          
                            </>
                          )
                        }
                      })
                    }
                  </ul>
                
                </>
              )
            })
          }
        </ul>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.usersReducer.data,
    tasks: state.tasksReducer.data,
    subTasks: state.subTasksReducer.data
  }
}

export default connect(mapStateToProps)(Collapse)
