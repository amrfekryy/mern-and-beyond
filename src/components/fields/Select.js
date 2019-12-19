import React, { Component } from 'react'
import { map } from 'lodash'

export class select extends Component {
  render () {
    return (
      <div className='select'>
        <label>{this.props.fieldSettingsFromJSON.label} </label>
        <select
          {...this.props.fieldSettingsFromJSON}
          {...this.props.formikFieldProps}
        >
          { // create options based on users data
            map(this.props.selectOptions, (value, key) => {
              return <option key={key} value={key}>{value.title}</option>
            })
          }
        </select>
      </div>
    )
  }
}
