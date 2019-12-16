import React, { Component } from 'react'
import DataList from './DataList'

export default class ListItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      clicked: false
    }
  }

  render () {
    // get item data and current plan from props
    const { item, plan } = this.props
    return (
      <>
        {/* render list item (local state is changed (true/false) on toggle) */}
        <a
          onClick={() => this.setState({ clicked: !this.state.clicked })}
          style={{ color: this.state.clicked ? 'red' : 'teal' }}
        >
          <li key={item.id}>{item.title}</li>
        </a>

        {/* recurse if (item is in users/tasks level) and (item is toggled to true) */}
        {plan.children && this.state.clicked &&
          <DataList plan={{ ...plan.children, params: { [plan.children.filterKey]: item.id } }} />}
      </>
    )
  }
}
