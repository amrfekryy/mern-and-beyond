import React, { Component } from 'react'
import { connect } from 'react-redux'
import { get, map, filter, cloneDeep, isUndefined } from 'lodash'

class DataList extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  toggleIDinState = (elementID) => {
    // console.log(elementID)
    this.setState({[elementID]: !this.state[elementID]})

    // equivalent to:
    // if ( isUndefined(this.state[elementID]) ) {
    //   this.setState({[elementID]: true})
    //   console.log('added key to state')
    // } else {
    //   this.setState({[elementID]: !this.state[elementID]})
    //   console.log('toggled key in state')
    // }
  }

  render () {
    // console.log('Component State: ' , this.state)
    const { reduxState, plan, parentID } = this.props
    
    // get list items from redux according to plan.path
    let children = get(reduxState, plan.path, {})
    // filter list items if a parentID is passed in recursion
    if (parentID) {
      children = filter(children, { [plan.filterKey]: parentID })
    }

    return (
      <ul>
        { // iterate over list items
          map(children, child =>
            <>
              {/* show item (id is added to state and set to true/false when item is toggled) */}
              <a onClick={() => this.toggleIDinState(child.id)}>
                <li key={child.id}>{child.title}</li>
              </a>

              {/* recurse if (item is in users/tasks level) and (item is toggled to true) */}
              { plan.then && 
                this.state[child.id] && 
                <DataList reduxState={reduxState} plan={plan.then} parentID={child.id} />}
            </>
          )
        }
      </ul>
    )
  }
}

const mapStateToProps = state => ({
  reduxState: cloneDeep(state)
})

export default connect(mapStateToProps)(DataList)
