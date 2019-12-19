import React, { Component } from 'react'

export class textarea extends Component {
  render () {
    return (
      <div className='textarea'>
        <textarea
          {...this.props.fieldSettingsFromJSON}
          {...this.props.formikFieldProps}
        />
      </div>
    )
  }
}
