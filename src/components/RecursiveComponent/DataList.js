import React, { Component } from 'react'
import { map } from 'lodash'
import { apply } from '../../helpers/functions/index'
import ListItem from './ListItem'

const jsonPlan = () => ({
  path: 'usersReducer.data',
  children: {
    path: 'tasksReducer.data',
    filterKey: 'userID',
    children: {
      path: 'subTasksReducer.data',
      filterKey: 'taskID'
    }
  }
})

export default class DataList extends Component {
  render () {
    // get plan through the function for the first time, then through props
    const plan = this.props.plan ? this.props.plan : jsonPlan()
    // get data using the apply funciton
    const listItems = apply({ key: 'filtering', ...plan })

    return (
      <ul>
        { // render ListItems as ListItem components
          map(listItems, item => <ListItem key={item.id} item={item} plan={plan} />)
        }
      </ul>
    )
  }
}
