import './App.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setUsers, setTasks } from './actions'
import { createUsers } from './helpers'
import { Formik, Form } from 'formik'
import { map } from 'lodash'
// import * as Yup from 'yup'
import * as taskFormJSON from './taskForm.json'
import MiddleComponent from './components/MiddleComponent'
import AddSubtaskModal from './components/addSubtaskModal'
import DataList from './components/RecursiveListComponent'
import { Button } from 'antd'
import { ultimateMapDispatchToProps } from './helpers/map_dispatch'

import { apply } from './helpers/functions/index'

import { gun, addToGun, syncFromGunToRedux } from './gunHandlers'


class App extends Component {
  constructor (props) {
    super(props)

    // add users data to gun for the first time only and sync to redux
    gun.get('users').once(obj => {
      if (!obj) {
        const usersNames = ['Amr', 'Fekry', 'Ali']
        map(usersNames, (title) => {
            addToGun('users', {title})
        })
      }
      syncFromGunToRedux('users', props.setData)
    })

    // or:
    // props.setData('users', {title: 'Amr', id: 'aaaaaaaaaaa'})
    // props.setData('users', {title: 'Fekry', id: 'bbbbbbbbbbb'})
    // props.setData('users', {title: 'Ali', id: 'ccccccccccc'})


    syncFromGunToRedux('tasks', props.setData)

  }


  stateDataNested = () => {
    
    const data = []
  
    map(this.props.users, (userData) => {
      
      const user = { ...userData, children: [] }
      data.push(user)
      
      const relatedTasks = apply({
        key: 'filtering',
        path: 'tasksReducer.data',
        params: { userID: userData.id }
      })
  
      map(relatedTasks, (taskData) => {
        const relatedSubTasks = apply({
          key: 'filtering',
          path: 'subTasksReducer.data',
          params: { taskID: taskData.id }
        })
  
        const task = { ...taskData, children: relatedSubTasks }
        user.children.push(task)
      
      })
    })
    return data
  }
  
  recursiveDisplayPlan = () => ({
    whichData: 'users',
    children: {
      whichData: 'tasks',
      children: {
        whichData: 'subTasks'
      }
    }
  })


  onFormSubmit = (values) => {
    // console.log('Values submitted from tasks form: ', values)
    // // dispatch 'setTask' action
    // this.props.setData('tasks', {...values})
    
    addToGun('tasks', {...values})
  
  }

  renderForm = (FormikProps) => {
    // console.log('FormikProps: ', FormikProps)
    console.log(this.stateDataNested())
    return (
      <>
        <Form>
          <br />

          { // create form dynamically using fileds.json and MiddleComponent
            map(taskFormJSON.default, (fieldSettingsFromJSON, index) => {
              return (
                <>
                  <MiddleComponent key={index} 
                    // optionsFor='users'
                    selectOptions={this.props.users} 
                    fieldSettingsFromJSON={{...fieldSettingsFromJSON}} 
                  /><br /><br />
                </>
              )
            })
          }
          {/* <Field type="checkbox" name="active" value="true" checked /> */}
          <button type='submit'>Add Task</button>
        </Form>
        <AddSubtaskModal />
      </>
    )
  }

  render () {
    
    // gunExample()
    return (
      <>

        {/* <pre>{JSON.stringify(fieldsJSON, null, 2)}</pre> */}

        <Formik
          initialValues={{
            title: '',
            description: '',
            userID: '',
            active: true
          }}
          onSubmit={this.onFormSubmit}
        >
          {this.renderForm}
        </Formik>
        <br/><br/>
        <DataList children={this.stateDataNested()} />
        {/* <MapPresentation /> */}
      </>
    )
  }
}

// map props to data from redux state
const mapStateToProps = (state) => {
  return {
    users: state.usersReducer.data,
    tasks: state.tasksReducer.data,
    subTasks: state.subTasksReducer.data
  }
}

/*
// map props to action-dispatching functions
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch_setUsers: (data) => dispatch(setUsers(data)),
    dispatch_setTasks: (data) => dispatch(setTasks(data))
  }
}
*/

// pass mapped props to App upon export
export default connect(
  mapStateToProps,
  ultimateMapDispatchToProps
)(App)
